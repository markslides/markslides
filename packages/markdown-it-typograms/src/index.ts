import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';
import typograms from '../typograms';

const renderTypograms = (source: string) => {
    try {
        const svg = typograms(source, 0.5, false);

        return `<div class="typograms">${svg.outerHTML}</div>`;
    } catch ({ str, hash }: any) {
        return `<pre>${str}</pre>`;
    }
};

// TODO: Inject this value from outside
const isDarkMode = false;

const markdownItTypograms = (md: MarkdownIt) => {
    // @ts-ignore
    md.typograms = typograms;

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
        const source = token.content.trim();

        if (token.info === 'typograms') {
            return renderTypograms(source);
        }

        return original(tokens, idx, options, env, self);
    };
};

export default markdownItTypograms;
