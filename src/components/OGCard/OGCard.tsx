// Libs
import React from 'react';
import formatDate from '../../static/js/utils/formatDate';
// import PropTypes from 'prop-types';

// Utils

// Components

// Interface
interface IProps {
    title?: string,
    date?: string,
    image?: string
}

// Component
const OGCard = ({ title, date, image }: IProps) => {
    return <div className='og-card'>
        <header className='og-card__header g0'>
            <h3 className='og-card__title h4'>{title}</h3>
            {date && <time className='og-card__date' dateTime={date}>{formatDate(date, { day: 'numeric', month: 'long', year: 'numeric' })}</time>}

            <div className='og-card__hero'>
                <img className='og-card__hero-image' src={image} alt={''} />
            </div>
        </header>
    </div>;
};

// Props
OGCard.defaultProps = {
    title: 'davebitter.com',
    image: '/img/dave.jpg'
};

// const { } = PropTypes;

OGCard.propTypes = {
};

export default OGCard;