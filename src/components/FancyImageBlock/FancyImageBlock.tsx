// Libs
import React from 'react';

// Utils

// Resources

// Components

// Interface
interface IProps {
    src: string,
    alt: string
}

// Component
const FancyImageBlock = ({ src, alt, ...attributes }: IProps) => {
    return <div className='fancy-image-block' {...attributes}>
        <div className='fancy-image-block__image-wrapper'>
            <img className='fancy-image-block__image' src={src} alt={alt} />
        </div>
        <div className='fancy-image-block__image-wrapper fancy-image-block__image-wrapper--presentational'>
            <img className='fancy-image-block__image' src={src} alt={alt} role='presentation' />
        </div>
        <div className='fancy-image-block__image-wrapper fancy-image-block__image-wrapper--presentational'>
            <img className='fancy-image-block__image' src={src} alt={alt} role='presentation' />
        </div>
    </div>;
};

// Props
FancyImageBlock.defaultProps = {};

export default FancyImageBlock;
