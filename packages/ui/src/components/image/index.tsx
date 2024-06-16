import { ImgHTMLAttributes } from 'react';

export interface ImageProps extends ImgHTMLAttributes<HTMLImageElement> {}

export function Image(props: ImageProps): JSX.Element {
    return <img {...props} />;
}

Image.displayName = 'Image';
