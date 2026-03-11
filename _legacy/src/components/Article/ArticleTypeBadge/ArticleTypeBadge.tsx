// Libs
import React from 'react';
// import PropTypes from 'prop-types';

// Utils
import { getDictionary } from '../../../static/js/utils/getContent';
import { ContentObjectInterface, ContentType } from '../../../static/js/utils/Interfaces/Interfaces';

// Components

// Interface
interface IProps {
    contentType: ContentType
}

// Component
const getMappedContentTypeLabels = (dictionary: ContentObjectInterface) => ({
    'articles': dictionary.article,
    'quick-bits': dictionary.quickBit,
    'talks': dictionary.talk,
    'friday-tips': dictionary.fridayTip
});

const ArticleTypeBadge = ({ contentType }: IProps) => {
    const dictionary = getDictionary();

    return <div className='article-type-badge' data-content-type={contentType}>
        {getMappedContentTypeLabels(dictionary)[contentType]}
    </div>;
};

// Props
ArticleTypeBadge.defaultProps = {
};

// const { } = PropTypes;

ArticleTypeBadge.propTypes = {
};

export default ArticleTypeBadge;