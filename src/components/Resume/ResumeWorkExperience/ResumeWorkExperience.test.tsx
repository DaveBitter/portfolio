// Libs
import React from 'react';
import ResumeWorkExperience from './ResumeWorkExperience';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<ResumeWorkExperience {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<ResumeWorkExperience />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
