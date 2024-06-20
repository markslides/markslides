'use client';

import { useMemo } from 'react';
import { NextPage } from 'next';
import dynamic from 'next/dynamic';
// import { CircularProgress } from '@chakra-ui/react';
import { Center } from '@markslides/ui/center';
import useAppSelector from '@/redux/hooks/useAppSelector';
import useAppDispatch from '@/redux/hooks/useAppDispatch';
import useRouterQuery from '@/hooks/router/useRouterQuery';
import slideConfigUtil from '@/lib/utils/slideConfigUtil';
import type { SlideShowMode } from '@/lib/types/common';
const SlideShowFragment = dynamic(
    () => import('@/components/fragments/SlideShowFragment'),
    {
        ssr: false,
        loading: () => (
            <Center
                width='100vw'
                height='100vh'
                backgroundColor='gray.900'>
                {/* <CircularProgress
                    isIndeterminate
                    size='72px'
                    color='primary.500'
                /> */}
            </Center>
        ),
    }
);

const SlideShowPage: NextPage = () => {
    const { mode = 'audience' } = useRouterQuery<{ mode: SlideShowMode }>();

    const slideConfigState = useAppSelector((state) => state.slideConfig);
    const markdownTitle = useAppSelector((state) => state.local.title);
    const markdownContent = useAppSelector((state) => state.local.content);
    const dispatch = useAppDispatch();

    const slideConfig = useMemo(() => {
        return slideConfigUtil.generateMarpConfigFromSlideConfigState(
            slideConfigState
        );
    }, [slideConfigState]);

    return (
        <SlideShowFragment
            mode={mode}
            content={markdownContent}
            config={slideConfig}
        />
    );
};

export default SlideShowPage;
