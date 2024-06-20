import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { type CSSProperties } from 'styled-components';

const container: Variants = {
    hidden: {
        opacity: 0,
    },
    show: {
        opacity: 1,
    },
};

interface SlideTransitionProps {
    children: JSX.Element;
    direction: 'left' | 'top' | 'right' | 'bottom';
    isOpen: boolean;
    style?: CSSProperties;
}

export function SlideTransition(props: SlideTransitionProps) {
    const { children, direction, isOpen, style } = props;

    return (
        <AnimatePresence>
            <motion.div
                variants={container}
                initial='hidden'
                animate={isOpen ? 'show' : 'hidden'}>
                {children}
            </motion.div>
        </AnimatePresence>
    );
}
