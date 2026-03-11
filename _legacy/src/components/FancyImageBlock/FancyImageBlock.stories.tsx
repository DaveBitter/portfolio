// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import FancyImageBlock from './FancyImageBlock';

// Story
storiesOf('General', module)
    .add('FancyImageBlock', () => <FancyImageBlock src='https://via.placeholder.com/800' alt='placeholder image' />);
