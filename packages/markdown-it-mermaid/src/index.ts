import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';
import mermaid from 'mermaid';

const mermaidChart = (code: string) => {
    try {
        mermaid.parse(code);
        return `<div class="mermaid">${code}</div>`;
    } catch ({ str, hash }: any) {
        return `<pre>${str}</pre>`;
    }
};

// TODO: Inject this value from outside
const isDarkMode = false;

const markdownItMermaid = (md: MarkdownIt) => {
    mermaid.initialize({
        theme: isDarkMode ? 'default' : 'dark',
        darkMode: isDarkMode,
        fontFamily: 'ui-monospace',
        altFontFamily: 'monospace',
        startOnLoad: true,
    });

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
