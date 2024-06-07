import styled from 'styled-components';
import { useMarkedRender } from '@markslides/renderer';
import themes from '@markslides/themes';

const Wrapper = styled.div`
    height: 100%;
    background-color: #eeeeee;
`;

const StyledSection = styled.section`
    width: 100%;
    height: max-content;
    padding: 32px;

    font-size: 16px;

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        font-size: 2em;
        padding-bottom: 0;
        text-align: left;
        color: #333333 !important;
        border-bottom: none;
    }

    img {
        max-width: 100%;
        max-height: 120px;
    }

    hr {
        height: 0.05px;
    }
`;

interface DocumentPreviewFragmentProps {
    content?: string;
}

function DocumentPreviewFragment(props: DocumentPreviewFragmentProps) {
    const { content } = props;

    const { renderedContent } = useMarkedRender(content ?? '');

    return (
        <Wrapper>
            <style>{themes[0]!.css}</style>
            <StyledSection
                // className='invert'
                dangerouslySetInnerHTML={{
                    __html: renderedContent,
                }}
            />
        </Wrapper>
    );
}

export default DocumentPreviewFragment;
