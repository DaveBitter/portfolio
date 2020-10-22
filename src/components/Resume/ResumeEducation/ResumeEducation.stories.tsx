// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getEducation } from '../../../static/js/utils/getContent';

// Components
import ResumeEducation from './ResumeEducation';

// Story
storiesOf('Resume', module)
    .add('ResumeEducation', () => <ResumeEducation education={getEducation()[0]} />);
