// Libs
import React from 'react';
import ResumeEducation from './ResumeEducation';
import { mount } from 'enzyme';
import { getEducation } from '../../../static/js/utils/getContent';

// Test constants
const mockEducation = getEducation()

// Component test setup
const setup = (props: any) => {
    const _props = {
        education: mockEducation,
        ...props
    };

    const wrapper = mount(<ResumeEducation {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<ResumeEducation />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
