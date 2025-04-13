import MarkdownIt from 'markdown-it';
import Token from 'markdown-it/lib/token';
import Renderer from 'markdown-it/lib/renderer';

const markdownItCopyFenceContent = (md: MarkdownIt) => {
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
        if (!token) {
            return original(tokens, idx, options, env, self);
        }

        const content = token.content.trim();
        const escapedContent = md.utils.escapeHtml(content);

        return `
            <div style="position: relative; overflow: auto;">
                ${original(tokens, idx, options, env, self)}

                <style>
                    button.copy-fence-content {
                        width: 36px;
                        height: 36px;
                        position: absolute;
                        top: 8px;
                        right: 8px;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        cursor: pointer;
                        background-color: var(--color-neutral-muted);
                        color: var(--color-fg-default);
                        border: 1px solid var(--color-border-default);
                        border-radius: 4px;
                        transition: all 0.2s ease-in-out;
                    }
                    button.copy-fence-content:hover {
                        background-color: var(--color-fg-muted);
                        color: var(--color-canvas-default);
                    }

                    /* Inactive */
                    button.copy-fence-content .lucide-copy-icon {
                        display: block !important;
                    }
                    button.copy-fence-content .lucide-check-icon {
                        display: none !important;
                    }

                    /* Active */
                    button.copy-fence-content:hover.active {
                        color: var(--color-canvas-default);
                    }
                    button.copy-fence-content.active .lucide-copy-icon {
                        display: none !important;
                    }
                    button.copy-fence-content.active .lucide-check-icon {
                        display: block !important;
                    }
                </style>
                <button
                    class="copy-fence-content"
                    data-content="${escapedContent}">
                    <svg class="lucide-copy-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <rect
                            width="14"
                            height="14"
                            x="8"
                            y="8"
                            rx="2"
                            ry="2"
                        />
                        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                    </svg>
                    <svg class="lucide-check-icon"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </button>
            </div>
        `;
    };
};

export default markdownItCopyFenceContent;
