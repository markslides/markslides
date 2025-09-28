import appMarp from '@/lib/marp/appMarp';
import useDefaultMarpRender from '@/hooks/useDefaultMarpRender';
import useIndependentMarpRender from '@/hooks/useIndependentMarpRender';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';
import slideConfigConst from '@/lib/constants/slideConfigConst';
import type {
    SlideTheme,
    SlideClass,
    SlideSize,
    SlideConfigState,
} from '@/lib/types/common';

export {
    appMarp,
    useDefaultMarpRender,
    useIndependentMarpRender,
    slideConfigUtil,
    slideConfigConst,
};

export { SlideTheme, SlideClass, SlideSize, SlideConfigState };
