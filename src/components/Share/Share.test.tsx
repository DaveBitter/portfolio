// Libs
import React from 'react';
import Share from './Share';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<Share {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<Share />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
