import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';
import mermaid, { type MermaidConfig } from 'mermaid';

// Base64 encoding/decoding available in browser environment
const base64Encode = (str: string): string => {
    return btoa(unescape(encodeURIComponent(str)));
};

const base64Decode = (str: string): string => {
    return decodeURIComponent(escape(atob(str)));
};

// Default Mermaid configuration
let _config: MermaidConfig = {
    theme: 'default',
    fontFamily: 'Inconsolata, monospace !important',
    // fontFamily: 'ui-monospace',
    // altFontFamily: 'monospace',
    startOnLoad: false,
    logLevel: 'error', // Reduce console noise
    // NOTE: HTML tags in text are allowed and click functionality is enabled.
    // https://mermaid.js.org/config/usage.html#securitylevel
    securityLevel: 'loose',
};

// Cache for memoization
const renderCache = new Map<string, string>();

// Simple hash function for code content
const hashCode = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return hash.toString(36);
};

const getHashCodeId = (code: string): string => {
    const codeHash = hashCode(code);
    return `mermaid-${codeHash}`;
};

const renderAndCaching = async (id: string, code: string) => {
    // Check if element still exists and hasn't been replaced
    const containerElem = document.getElementById(id);
    if (!containerElem) return;

    try {
        // First, validate the syntax with parse
        await mermaid.parse(code, { suppressErrors: false });

        // If parse succeeds, proceed with rendering
        const { svg, bindFunctions } = await mermaid.render(
            `${id}-${Date.now()}`,
            code
        );

        // Create a wrapper for the SVG with responsive scaling
        const svgWrapper = document.createElement('div');
        svgWrapper.className = 'mermaid-svg-wrapper';
        svgWrapper.style.cssText =
            'width: 100%; height: auto; display: flex; justify-content: center; align-items: center;';

        // Parse and modify the SVG for responsive scaling
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svg, 'image/svg+xml');
        const svgElement = svgDoc.querySelector('svg');

        if (svgElement) {
            // Set responsive attributes
            svgElement.style.cssText =
                'max-width: 100%; max-height: 100%; margin: auto; display: block;';
            svgElement.setAttribute('preserveAspectRatio', 'xMidYMid meet');

            // If no viewBox exists, create one from width and height
            if (!svgElement.hasAttribute('viewBox')) {
                const width = svgElement.getAttribute('width') || '100%';
                const height = svgElement.getAttribute('height') || '100%';
                if (width !== '100%' && height !== '100%') {
                    svgElement.setAttribute(
                        'viewBox',
                        `0 0 ${width} ${height}`
                    );
                }
            }

            // Remove fixed width/height to make it responsive
            svgElement.removeAttribute('width');
            svgElement.removeAttribute('height');

            svgWrapper.appendChild(svgElement);
        } else {
            // Fallback: use the original SVG string
            svgWrapper.innerHTML = svg;
        }

        containerElem.innerHTML = '';
        containerElem.appendChild(svgWrapper);

        // Bind any interactive functions if needed
        // if (bindFunctions) {
        //     bindFunctions(containerElem);
        // }

        // Cache the final rendered result
        // renderCache.set(id, containerElem.outerHTML);
        renderCache.set(id, svgWrapper.getHTML());
    } catch (error: any) {
        console.error('Mermaid error:', error);
        const errorResult = `<p class="mermaid-error">${
            error.message?.includes('Syntax error')
                ? `Syntax error: ${error.message}`
                : error.message || 'Failed to render diagram'
        }</p>`;

        containerElem.innerHTML = errorResult;

        // Cache the error result as well to avoid re-rendering failed diagrams
        // renderCache.set(id, containerElem.outerHTML);
        renderCache.set(id, errorResult);
    }
};

const mermaidChart = (id: string, code: string) => {
    return `<pre id="${id}" class="mermaid" data-mermaid-code="${base64Encode(
        code
    )}"></pre>`;
};

const markdownItMermaid = (md: MarkdownIt, config?: MermaidConfig) => {
    if (config) {
        // Clear cache if config is changed to avoid stale renders
        if (!Object.is(_config, config)) {
            renderCache.clear();
        }

        // Merge user config with existing config
        _config = {
            ..._config,
            ...config,
        };
    }

    // Initialize Mermaid with the merged config
    mermaid.initialize(_config);

    // Register icon packs asynchronously
    mermaid.registerIconPacks([
        {
            name: 'logos',
            loader: () =>
                fetch(
                    'https://unpkg.com/@iconify-json/logos@1/icons.json'
                ).then((res) => res.json()),
        },
    ]);

    // @ts-ignore
    md.mermaid = {
        ...mermaid,
        renderAll: async () => {
            const mermaidElems = document.querySelectorAll(
                'pre.mermaid:not(:has(svg))'
            );
            for await (const [_, elem] of mermaidElems.entries()) {
                // Get the code from data attribute
                const id = elem.getAttribute('id');
                const code = elem.getAttribute('data-mermaid-code');
                if (!id || !code) {
                    continue;
                }

                // If already rendered and cached, use the cached version
                const cachedResult = renderCache.get(id);
                if (cachedResult) {
                    elem.innerHTML = cachedResult;
                    continue;
                }

                // If not cached, render and cache it
                await renderAndCaching(id, base64Decode(code));
                const newCachedResult = renderCache.get(id);
                if (newCachedResult) {
                    elem.innerHTML = newCachedResult;
                }
            }
        },
    };

    const original =
        md.renderer.rules.fence ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.fence = (
        tokens: Token[],
        idx: number,
        options: MarkdownIt.Options,
        env: any,
        self: Renderer
    ) => {
        const token = tokens[idx];
        if (token.info === 'mermaid') {
            const code = token.content.trim();
            const id = getHashCodeId(code);
            const cachedResult = renderCache.get(id);
            return mermaidChart(id, cachedResult ?? code);
        }

        return original(tokens, idx, options, env, self);
    };
};

export default markdownItMermaid;
