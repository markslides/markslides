'use client';

import { useState } from 'react';
import SlideListItem from '@/components/pages/SlideListPage/SlideListItem';
import { slides } from '@/lib/constants/mockData';

function SlideListPage() {
    const [count, setCount] = useState(0);

    return (
        <div
            style={{
                backgroundColor: 'white',
            }}>
            <div
                style={{
                    height: '56px',
                    padding: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    right: 0,
                    backgroundColor: '#777777',
                }}>
                <button
                    onClick={() => {
                        setCount((count) => count + 1);
                    }}>
                    {`Re-render: ${count}`}
                </button>
            </div>

            <div
                style={{
                    padding: '72px 16px 16px 16px',
                    display: 'grid',
                    gridTemplateColumns:
                        'repeat(auto-fill, minmax(240px, 1fr))',
                    rowGap: '16px',
                    columnGap: '16px',
                }}>
                {slides.map((slide, index) => {
                    return (
                        <SlideListItem
                            key={index}
                            id={`slide-${index}`}
                            config={slide.config}
                            content={slide.content}
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default SlideListPage;
