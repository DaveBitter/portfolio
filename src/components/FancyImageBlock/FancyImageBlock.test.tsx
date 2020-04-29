// Libs
import React from 'react';
import FancyImageBlock from './FancyImageBlock';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<FancyImageBlock {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<FancyImageBlock />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
