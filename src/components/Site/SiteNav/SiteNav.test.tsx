// Libs
import React from 'react';
import SiteNav from './SiteNav';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<SiteNav {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<SiteNav />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
