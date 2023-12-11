'use client';

import { useState } from 'react';
import MarkSlidesEditor from '@repo/editor/MarkSlidesEditor';

function Page(): JSX.Element {
    const [value, setValue] = useState('');

    return (
        <MarkSlidesEditor
            value={value}
            onChange={(newValue) => {
                setValue(newValue);
            }}
        />
    );
}

export default Page;
