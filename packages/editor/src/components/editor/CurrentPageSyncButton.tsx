import { memo } from 'react';
import styled from 'styled-components';
import { RefreshCwIcon, RefreshCwOffIcon } from 'lucide-react';

const CurrentPageSyncButtonContainer = styled.div`
    width: 40px;
    height: 40px;
    position: absolute;
    margin: auto;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #dddddd;
    border-radius: 100%;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    background-color: white;
    &:hover {
        background-color: #cccccc;
    }
`;

const StyledButton = styled.button`
    all: unset;
    width: 20px;
    height: 20px;
`;

interface CurrentPageSyncButtonProps {
    isSyncCurrentPage: boolean;
    onToggle: () => void;
}

function CurrentPageSyncButton(props: CurrentPageSyncButtonProps) {
    const { isSyncCurrentPage, onToggle } = props;

    return (
        <CurrentPageSyncButtonContainer onClick={onToggle}>
            <StyledButton>
                {isSyncCurrentPage ? (
                    <RefreshCwIcon
                        color='#333333'
                        size={20}
                    />
                ) : (
                    <RefreshCwOffIcon
                        color='#666666'
                        size={20}
                    />
                )}
            </StyledButton>
        </CurrentPageSyncButtonContainer>
    );
}

export default memo(CurrentPageSyncButton);
