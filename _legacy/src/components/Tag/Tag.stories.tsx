// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import Tag from './Tag';

// Story
storiesOf('General', module)
    .add('Tag', () => <Tag>I am some content</Tag>);
