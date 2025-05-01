import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

const SHOW_LINE_NUMBERS = 'showLineNumbers';
const regExpLineNumbers = /{([\d,-]*)}/;

const generateFenceStyles = (digits: number): string => `
    <style>
        pre, pre[class*="language-"] {
            padding: 0.75rem 1rem !important;
            white-space: pre-wrap;
            word-break: break-word;
            line-height: 1rem;
            overflow: auto;
        }
        .line-number {
            margin-right: ${digits * 1.4}rem;
            color: var(--color-fg-default);
        }
        .highlighted-line {
            display: block;
            background-color: var(--color-neutral-muted);
            padding: 0.1rem 12px;
            margin-left: -16px;
            margin-right: -16px;
            border-left: 4px solid var(--color-accent-fg);
        }
    </style>
`;

const markdownItFenceCodeBlockEnhancer = (md: MarkdownIt) => {
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
        if (!token || !token.info) {
            return original(tokens, idx, options, env, self);
        }

        const tokenParts = token.info.split(' ').filter(Boolean);
        const langName = tokenParts[0];
        if (!langName) {
            return original(tokens, idx, options, env, self);
        }

        const isShowLineNumber = tokenParts.includes(SHOW_LINE_NUMBERS);

        let lineNumbers: number[][] = [];
        const match = regExpLineNumbers.exec(token.info);
        if (match && match[1]) {
            lineNumbers = match[1]
                .split(',')
                .map((v) => v.split('-').map((v) => parseInt(v, 10)))
                .filter((range) => range.every((num) => !isNaN(num)));
        }

        const content = token.content;
        const code = options.highlight
            ? options.highlight(content, langName, '').trim()
            : content.trim();
        const totalLines = code.split('\n').length;
        const digits = Math.max(1, Math.floor(Math.log10(totalLines)) + 1);

        const lines = code.split('\n').map((line, index) => {
            const lineNumber = index + 1;
            const isInRange = lineNumbers.some(([start, end]) => {
                if (start && end) {
                    return (
                        lineNumber >= start &&
                        lineNumber <= end &&
                        start <= totalLines &&
                        end <= totalLines
                    );
                }
                return lineNumber === start && start <= totalLines;
            });

            const lineNumberStr = isShowLineNumber
                ? lineNumber.toString().padStart(digits, ' ')
                : '';
            const lineContent = `${
                isShowLineNumber
                    ? `<span class="line-number">${lineNumberStr}</span>`
                    : ''
            }${line}`;

            return {
                content: isInRange
                    ? `<span class="highlighted-line">${lineContent}</span>`
                    : lineContent,
                isHighlighted: isInRange,
            };
        });

        const highlightedCode = lines
            .map((line) =>
                line.isHighlighted ? line.content : `${line.content}\n`
            )
            .join('');

        token.attrSet('class', langName ? `language-${langName}` : '');
        const attrs = self.renderAttrs(token);
        const styles = generateFenceStyles(digits);
        return `${styles}<pre${attrs}><code${attrs}>${highlightedCode.trim()}</code></pre>`;
    };
};

export default markdownItFenceCodeBlockEnhancer;
