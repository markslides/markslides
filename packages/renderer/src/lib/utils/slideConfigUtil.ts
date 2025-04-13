import type { SlideConfigState } from '@/lib/types/common';

// headingDivider: 1
// _header: ''
// _footer: ''
// _paginate: false

// https://marpit.marp.app/directives?id=local-directives-1
const slideConfigUtil = {
    generateMarpConfigFromSlideConfigState: (configState: SlideConfigState) => {
        return `
marp: true
header: ${configState.header}
footer: ${configState.footer}
paginate: ${configState.paginate}
class: ${configState.class}
theme: ${configState.theme}
size: ${configState.size}
style: |
  pre {
    overflow: auto;
  }
`.trim();
    },
    generateSlideConfigStateFromMarpConfig: (marpConfig: string) => {
        let slideConfigState: SlideConfigState = {
            header: '',
            footer: '![height:40px](https://www.markslides.ai/image/credit.png)',
            paginate: false,
            theme: 'default',
            class: 'normal',
            size: '16:9',
        };
        marpConfig.split('\n').forEach((part) => {
            const separatorIndex = part.indexOf(':');
            const key = part.substring(0, separatorIndex);
            const value = part.substring(separatorIndex + 1).trim();

            // @ts-ignore
            if (slideConfigState[key] !== undefined) {
                // @ts-ignore
                slideConfigState[key] = value.trim();
            }
        });

        return slideConfigState;
    },
};

export default slideConfigUtil;
