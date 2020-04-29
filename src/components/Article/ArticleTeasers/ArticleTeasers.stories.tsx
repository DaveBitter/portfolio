// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getArticles } from '../../../static/utils/getContent';

// Components
import ArticleTeasers from './ArticleTeasers';

// Story
storiesOf('Article', module)
    .add('ArticleTeasers', () => <ArticleTeasers articles={getArticles().items} />);
