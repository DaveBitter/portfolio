// Libs
import React from 'react';
import Article from './Article';
import { mount } from 'enzyme';
import { getArticles } from '../../static/js/utils/getContent';

// Test constants
const mockArticles = getArticles()

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<Article {..._props} articleType='articles' />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<Article />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
            ...mockArticles[0]
        });

        expect(wrapper.childAt(0).exists());
    });
});
