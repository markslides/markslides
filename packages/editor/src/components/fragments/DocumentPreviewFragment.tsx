import styled from 'styled-components';
import { useMarkedRender } from '@markslides/renderer';

const Wrapper = styled.div`
    height: 100%;
    background-color: #eeeeee;
`;

interface DocumentPreviewFragmentProps {
    content?: string;
}

function DocumentPreviewFragment(props: DocumentPreviewFragmentProps) {
    const { content } = props;

    const { renderedContent } = useMarkedRender(content ?? '');

    return (
        <Wrapper>
            <div
                dangerouslySetInnerHTML={{
                    __html: renderedContent,
                }}
            />
        </Wrapper>
    );
}

export default DocumentPreviewFragment;
