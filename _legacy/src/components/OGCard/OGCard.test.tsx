// Libs
import React from 'react';
import OGCard from './OGCard';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<OGCard {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<OGCard />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
