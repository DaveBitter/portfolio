// Libs
import React from 'react';
import { storiesOf } from '@storybook/react';

// Components
import SiteFooter from './SiteFooter';
import SiteNav from '../SiteNav/SiteNav';

// Story
storiesOf('Site', module)
    .add('SiteFooter', () => <SiteFooter>
        <SiteNav />
    </SiteFooter>);
