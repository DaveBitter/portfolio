// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import SiteHeader from './SiteHeader';
import SiteNav from '../SiteNav/SiteNav';

// Story
storiesOf('Site', module)
    .add('SiteHeader', () => <SiteHeader title={'Site Header'}>
        <SiteNav />
    </SiteHeader>);
