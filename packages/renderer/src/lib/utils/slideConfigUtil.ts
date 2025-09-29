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
title: "${configState.title}"
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
            title: '',
            paginate: false,
            theme: 'default',
            class: 'normal',
            size: '16:9',
        };
        marpConfig
            .trim()
            .split('\n')
            .forEach((part) => {
                const separatorIndex = part.indexOf(':');
                const key = part.substring(
                    0,
                    separatorIndex
                ) as keyof SlideConfigState;
                const value = part.substring(separatorIndex + 1).trim();

                if (slideConfigState[key] !== undefined) {
                    if (
                        key === 'title' &&
                        value.startsWith('"') &&
                        value.endsWith('"')
                    ) {
                        // Remove surrounding quotes for title
                        slideConfigState[key] = value.substring(
                            1,
                            value.length - 1
                        );
                        return;
                    }

                    if (key === 'paginate') {
                        (slideConfigState as any)[key] =
                            value.trim() === 'true';
                        return;
                    }

                    (slideConfigState as any)[key] = value.trim();
                }
            });

        return slideConfigState;
    },
};

export default slideConfigUtil;
