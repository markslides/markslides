import { Marp } from '@marp-team/marp-core';
import { Element as MarpitElement } from '@marp-team/marpit';
import markdownItContainer from 'markdown-it-container';
import markdownItLink from '@markslides/markdown-it-link';
import markdownItMermaid from '@markslides/markdown-it-mermaid';
import markdownItTypograms from '@markslides/markdown-it-typograms';
import themes from '@markslides/themes';
import markdownItTaskLists from '@/lib/marp/plugins/taskLists';
import markdownItCopyFenceContent from '@/lib/marp/plugins/copyFenceContent';
import markdownItFenceCodeBlockEnhancer from '@/lib/marp/plugins/fenceCodeBlockEnhancer';

const appMarp = (function () {
    let instance: Marp;

    function createInstance(containerClassName?: string) {
        // https://marpit-api.marp.app/marpit
        const marp = new Marp({
            container: [
                new MarpitElement('div', {
                    class: containerClassName ?? 'marpit',
                }),
            ],
            // slideContainer: new MarpitElement('div', {
            //     class: 'slide',
            // }),
            inlineSVG: true,
            html: true,
            markdown: {
                html: true,
                breaks: true,
            },
        });

        // Set plugins
        marp.use(markdownItContainer, 'columns-2', {});
        marp.use(markdownItContainer, 'columns-3', {});
        marp.use(markdownItContainer, 'columns-4', {});
        marp.use(markdownItContainer, 'columns-5', {});
        marp.use(markdownItContainer, 'columns-6', {});
        marp.use(markdownItLink);
        marp.use(markdownItTaskLists);
        marp.use(markdownItFenceCodeBlockEnhancer);
        marp.use(markdownItMermaid);
        marp.use(markdownItTypograms);
        marp.use(markdownItCopyFenceContent);

        // Set themes
        if (themes.length > 0) {
            marp.themeSet.default = marp.themeSet.add(themes[0]!.css);
            themes.forEach((theme) => {
                marp.themeSet.add(theme.css);
            });
        }

        return marp;
    }

    return {
        createInstance,
        getDefaultInstance: function () {
            if (!instance) {
                instance = createInstance();
            }
            return instance;
        },
    };
})();

export default appMarp;
