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
import { SlideConfigState } from '@/lib/types/common';

const appMarp = (function () {
    let instance: Marp;
    let _slideConfigState: SlideConfigState;

    function createInstance(
        slideConfigState?: SlideConfigState,
        containerClassName?: string
    ) {
        if (slideConfigState) {
            _slideConfigState = slideConfigState;
        }

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
        marp.use((md) => {
            const isDarkMode = slideConfigState?.class === 'invert';
            return markdownItMermaid(md, {
                theme: isDarkMode ? 'dark' : 'default',
                darkMode: isDarkMode,
            });
        });
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
        getDefaultInstance: function (slideConfigState?: SlideConfigState) {
            if (
                !instance ||
                (slideConfigState &&
                    !Object.is(_slideConfigState, slideConfigState))
            ) {
                instance = createInstance(slideConfigState);
            }
            return instance;
        },
    };
})();

export default appMarp;
