// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getArticles } from '../../../static/js/utils/getContent';

// Components
import ArticleTeaser from './ArticleTeaser';

// Story
storiesOf('Article', module)
    .add('ArticleTeaser', () => <ArticleTeaser {...getArticles().items[0]} />);
