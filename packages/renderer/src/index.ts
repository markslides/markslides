import appMarp from '@/lib/marp/appMarp';
import useMarkedRender from '@/hooks/useMarkedRender';
import useDefaultMarpRender from '@/hooks/useDefaultMarpRender';
import useIndependentMarpRender from '@/hooks/useIndependentMarpRender';
import slideConfigConst from '@/lib/constants/slideConfigConst';
import type {
    SlideTheme,
    SlideClass,
    SlideSize,
    SlideConfigState,
} from '@/lib/types/common';

export {
    useMarkedRender,
    appMarp,
    useDefaultMarpRender,
    useIndependentMarpRender,
    slideConfigConst,
};

export { SlideTheme, SlideClass, SlideSize, SlideConfigState };
