// Libs
import React from 'react';
import Socials from './Socials';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<Socials {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<Socials />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
