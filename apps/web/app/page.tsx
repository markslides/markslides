'use client';

import { useState } from 'react';
import MarkSlidesEditor from '@markslides/editor';

function Page(): JSX.Element {
    const [value, setValue] = useState('');

    return (
        <MarkSlidesEditor
            config={{
                header: 'MarkSlides',
                footer: 'Soaple',
                paginate: true,
                theme: 'default',
                class: 'invert',
                size: '16:9',
            }}
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
        />
    );
}

export default Page;
