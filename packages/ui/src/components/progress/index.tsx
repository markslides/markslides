import * as ProgressPrimitive from '@radix-ui/react-progress';
import styled from 'styled-components';

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

const ProgressRoot = styled(ProgressPrimitive.Root)<{ size: Size }>`
    width: 100%;
    height: ${({ size }) => {
        switch (size) {
            case 'xs':
                return '2px';
            case 'sm':
                return '4px';
            case 'md':
                return '8px';
            case 'lg':
                return '12px';
            case 'xl':
                return '16px';
        }
    }};
    position: relative;
    overflow: hidden;
    background-color: #eeeeee;
    border-radius: 99999px;

    /* Fix overflow clipping in Safari */
    /* https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0 */
    transform: translateZ(0);
`;

const ProgressIndicator = styled(ProgressPrimitive.Indicator)`
    background-color: #9d00ea;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    transition: transform 660ms cubic-bezier(0.65, 0, 0.35, 1);
`;

interface ProgressProps {
    size: Size;
    value: number;
}

export function Progress(props: ProgressProps) {
    const { size, value } = props;

    return (
        <ProgressRoot
            size={size}
            value={value}>
            <ProgressIndicator
                style={{ transform: `translateX(-${100 - value}%)` }}
            />
        </ProgressRoot>
    );
}
