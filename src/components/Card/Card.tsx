// Libs
import React from 'react';

// Utils

// Resources

// Components

// Interface
interface IProps {
    children: any
}

// Component
const Card = ({ children, ...attributes }: IProps) => {
    return <div className='card' {...attributes}>
        {children}
    </div>;
};

// Props
Card.defaultProps = {};

export default Card;
