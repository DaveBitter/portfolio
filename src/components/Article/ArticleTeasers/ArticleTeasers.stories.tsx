// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getArticles } from '../../../../src/static/js/utils/getContent';

// Components
import ArticleTeasers from './ArticleTeasers';

// Story
storiesOf('Article', module)
    .add('ArticleTeasers', () => <ArticleTeasers type='articles' articles={getArticles().items} />);
