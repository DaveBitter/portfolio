// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import ArticleTypeBadge from './ArticleTypeBadge';

// Story
storiesOf('General', module)
    .add('ArticleTypeBadge', () => <ArticleTypeBadge contentType={'articles'} />);
