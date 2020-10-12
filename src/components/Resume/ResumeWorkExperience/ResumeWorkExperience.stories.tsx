// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Utils
import { getWorkExperience } from '../../../static/js/utils/getContent';

// Components
import ResumeWorkExperience from './ResumeWorkExperience';

// Story
storiesOf('General', module)
    .add('ResumeWorkExperience', () => <ResumeWorkExperience workExperience={getWorkExperience()[0]} />);
