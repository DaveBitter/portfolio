// Libs
import React from 'react';
import ResumeProfileChart from './ResumeProfileChart';
import { mount } from 'enzyme';

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<ResumeProfileChart {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<ResumeProfileChart />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
