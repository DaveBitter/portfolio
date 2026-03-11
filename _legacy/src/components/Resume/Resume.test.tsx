// Libs
import React from 'react';
import Resume from './Resume';
import { mount } from 'enzyme';
import { getEducation, getWorkExperience } from '../../static/js/utils/getContent';

// Test constants
const mockWorkExperience = getWorkExperience()
const mockEducation = getEducation()

// Component test setup
const setup = (props: any) => {
    const _props = {
        workExperience: mockWorkExperience,
        education: mockEducation,
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
