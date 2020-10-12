// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getEducation, getWorkExperience } from '../../static/js/utils/getContent';

// Components
import Resume from './Resume';

// Story
storiesOf('General', module)
    .add('Resume', () => <Resume education={getEducation()} workExperience={getWorkExperience()} />);
