import { Marp } from '@marp-team/marp-core';
import { Element as MarpitElement } from '@marp-team/marpit';
import markdownItMermaid from '@markslides/markdown-it-mermaid';
import markdownItTypograms from '@markslides/markdown-it-typograms';
import markdownItTaskLists from '@/lib/marp/plugins/taskLists';
// import markdownItTaskLists from './plugins/taskLists';
// import themes from '@/lib/marp/themes';
import themes from './themes';

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
        });
        // marp.themeSet.default = marp.themeSet.add(themeVscode);

        // Set plugins
        marp.use(markdownItTaskLists);
        marp.use(markdownItMermaid);
        marp.use(markdownItTypograms);

        themes.forEach((theme) => {
            marp.themeSet.add(theme.css);
        });

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
