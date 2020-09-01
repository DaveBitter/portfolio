// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getArticles } from '../../static/js/utils/getContent';

// Components
import Article from './Article';

// Story
storiesOf('Article', module)
    .add('Article', () => <Article {...getArticles()[0]} />);
