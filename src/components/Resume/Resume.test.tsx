// Libs
import React from 'react';
import Resume from './Resume';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<Resume {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<Resume />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
