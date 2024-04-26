import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

const urlRegExp =
    /^(https?:\/\/)?([\w\.-]+(?:\:[\w\.]*)?@)?([\w\.-]+\.[a-z\.]{2,6})(\:\d{1,5})?(\/[\/\w \.-]*)*(\?[&\w\.-=]*)?(#[\w\-]*)?$/;

const markdownItLink = (md: MarkdownIt) => {
    var defaultRender =
        md.renderer.rules.link_open ||
        function (tokens, idx, options, env, self) {
            return self.renderToken(tokens, idx, options);
        };

    md.renderer.rules.link_open = function (
        tokens: Token[],
        idx: number,
        options: MarkdownIt.Options,
        env: any,
        self: Renderer
    ) {
        const href = tokens[idx].attrGet('href');
        if (href && urlRegExp.test(href)) {
            tokens[idx].attrSet('target', '_blank');
        }

        return defaultRender(tokens, idx, options, env, self);
    };
};

export default markdownItLink;
