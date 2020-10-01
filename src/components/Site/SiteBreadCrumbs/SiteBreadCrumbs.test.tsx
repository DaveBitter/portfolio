// Libs
import React from 'react';
import SiteBreadCrumbs from './SiteBreadCrumbs';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<SiteBreadCrumbs {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<SiteBreadCrumbs />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
