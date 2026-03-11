// Libs
import React from 'react';
import SiteFooter from './SiteFooter';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<SiteFooter {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<SiteFooter />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
