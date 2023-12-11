import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

// TODO: Get this value from Marp later
const isDarkMode = false;

const markdownItTaskLists = (md: MarkdownIt) => {
    const original =
        md.renderer.rules.text ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.text = (
        tokens: Token[],
        idx: number,
        options: MarkdownIt.Options,
        env: any,
        self: Renderer
    ) => {
        const token = tokens[idx];
        if (!token) {
            return original(tokens, idx, options, env, self);
        }

        const content = token.content.trim();

        if (content.startsWith('[ ] ')) {
            return `
                <input type="checkbox" style="width: 20px; height: 20px;">
                    ${content.split('[ ]')[1]}
                </input>
            `;
        } else if (content.startsWith('[x] ')) {
            return `
                <input type="checkbox" checked style="width: 20px; height: 20px;">
                    ${content.split('[x]')[1]}
                </input>
            `;
        }

        return original(tokens, idx, options, env, self);
    };
};

export default markdownItTaskLists;
