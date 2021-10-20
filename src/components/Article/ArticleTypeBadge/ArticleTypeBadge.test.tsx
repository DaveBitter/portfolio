// Libs
import React from 'react';
import ArticleTypeBadge from './ArticleTypeBadge';
import { mount } from 'enzyme';

// Test constants

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<ArticleTypeBadge contentType={'articles'} {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<ArticleTypeBadge />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });
});
