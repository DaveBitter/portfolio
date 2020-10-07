// Libs
import React from 'react';
import Tag from './Tag';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<Tag {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<Tag />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
