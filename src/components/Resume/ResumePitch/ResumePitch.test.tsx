// Libs
import React from 'react';
import ResumePitch from './ResumePitch';
import { mount } from 'enzyme';

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<ResumePitch {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<ResumePitch />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
