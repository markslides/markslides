import { useMemo } from 'react';
import { slideConfigUtil } from '@markslides/renderer';

function useSlideRatio(slideConfigStr: string) {
    return useMemo(() => {
        const slideConfig =
            slideConfigUtil.generateSlideConfigStateFromMarpConfig(
                slideConfigStr
            );

        const [sizeWidth, sizeHeight] = slideConfig.size.split(':');
        const slideRatio = Number(sizeWidth) / Number(sizeHeight);

        return slideRatio;
    }, [slideConfigStr]);
}

export default useSlideRatio;
