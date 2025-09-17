import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';
import mermaid, { type MermaidConfig } from 'mermaid';

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

const mermaidChart = (code: string) => {
    const codeHash = hashCode(code);
    const cachedResult = renderCache.get(codeHash);

    // Return cached result if available
    if (cachedResult) {
        return cachedResult;
    }

    // Use hash-based ID to ensure consistency across re-renders
    const id = `mermaid-${codeHash}`;
    const containerId = `${id}-container`;

    try {
        // Create a placeholder container that will be replaced with the rendered diagram
        const placeholder = `<div id="${containerId}" class="mermaid-container">
            <div class="mermaid-loading">Rendering diagram...</div>
        </div>`;

        // Use setTimeout to ensure the DOM is ready and process async operations
        setTimeout(async () => {
            // Check if element still exists and hasn't been replaced
            const containerElem = document.getElementById(containerId);
            if (!containerElem) return;

            try {
                // First, validate the syntax with parse
                await mermaid.parse(code, { suppressErrors: false });

                // If parse succeeds, proceed with rendering
                const { svg, bindFunctions } = await mermaid.render(
                    `${id}-${Date.now()}`,
                    code
                );

                // Double-check that container still exists
                const currentContainer = document.getElementById(containerId);
                if (currentContainer) {
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
                        // svgElement.style.cssText =
                        //     'max-width: 100%; height: auto; display: block;';
                        svgElement.setAttribute(
                            'preserveAspectRatio',
                            'xMidYMid meet'
                        );

                        // If no viewBox exists, create one from width and height
                        if (!svgElement.hasAttribute('viewBox')) {
                            const width =
                                svgElement.getAttribute('width') || '100%';
                            const height =
                                svgElement.getAttribute('height') || '100%';
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

                    currentContainer.innerHTML = '';
                    currentContainer.appendChild(svgWrapper);

                    // Bind any interactive functions if needed
                    if (bindFunctions) {
                        bindFunctions(currentContainer);
                    }

                    // Cache the final rendered result
                    const finalResult = currentContainer.outerHTML;
                    renderCache.set(codeHash, finalResult);
                }
            } catch (error: any) {
                console.error('Mermaid error:', error);
                const errorResult = `<pre class="mermaid-error">${
                    error.message?.includes('Syntax error')
                        ? `Syntax error: ${error.message}`
                        : error.message || 'Failed to render diagram'
                }</pre>`;

                const currentContainer = document.getElementById(containerId);
                if (currentContainer) {
                    currentContainer.innerHTML = errorResult;
                }

                // Cache the error result as well to avoid re-rendering failed diagrams
                renderCache.set(codeHash, errorResult);
            }
        }, 0);

        return placeholder;
    } catch (error: any) {
        console.error('Mermaid chart error:', error);
        const errorResult = `<pre class="mermaid-error">${
            error.message || 'Unknown error'
        }</pre>`;

        // Cache the error result
        renderCache.set(codeHash, errorResult);
        return errorResult;
    }
};

// TODO: Inject this value from outside
const isDarkMode = false;

const markdownItMermaid = (md: MarkdownIt, config?: MermaidConfig) => {
    mermaid.initialize({
        theme: isDarkMode ? 'dark' : 'default',
        darkMode: isDarkMode,
        fontFamily: 'Inconsolata, monospace !important',
        // fontFamily: 'ui-monospace',
        // altFontFamily: 'monospace',
        startOnLoad: false, // Set to false to prevent auto-initialization conflicts
        securityLevel: 'loose', // Allow more flexible parsing
        logLevel: 'error', // Reduce console noise
        ...config,
    });

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
    md.mermaid = mermaid;

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
        const code = token.content.trim();
        if (token.info === 'mermaid') {
            return mermaidChart(code);
        }

        return original(tokens, idx, options, env, self);
    };
};

export default markdownItMermaid;
