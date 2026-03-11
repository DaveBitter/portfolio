// Libs
import React from 'react';
import SiteHeader from './SiteHeader';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<SiteHeader {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<SiteHeader />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
