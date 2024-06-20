import styled, { type CSSProperties } from 'styled-components';

const Wrapper = styled.div.attrs<CSSProperties>((props) => ({
    style: {
        ...props,
    },
}))<CSSProperties>`
    width: 100%;
    height: 8px;
    border-radius: 4px;
    background-color: #eeeeee;
`;

const Bar = styled.div<{ width: string }>`
    width: ${({ width }) => width};
    height: inherit;
    border-radius: 4px;
    background-color: #9d00ea;
`;

interface ProgressProps extends CSSProperties {
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    value: number;
}

export function Progress(props: ProgressProps) {
    const { value, ...others } = props;

    return (
        <Wrapper {...others}>
            <Bar width={`${value}%`} />
        </Wrapper>
    );
}
