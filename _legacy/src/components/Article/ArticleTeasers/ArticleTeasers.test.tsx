// Libs
import React from 'react';
import ArticleTeasers from './ArticleTeasers';
import { mount } from 'enzyme';

// Components
import ArticleTeaser from '../ArticleTeaser/ArticleTeaser';
import { getArticles } from '../../../static/js/utils/getContent';

// Test constants
const mockArticles = getArticles()

// Component test setup
const setup = (props: any) => {
    const _props = {
        ...props
    };

    const wrapper = mount(<ArticleTeasers type='articles' tags={[]}  {..._props} />);

    return {
        _props,
        wrapper
    };
};

// Test scenarios
describe('<ArticleTeasers />', () => {
    it('should mount', () => {
        const { wrapper } = setup({
        });

        expect(wrapper.childAt(0).exists());
    });

    it('should render <ArticleTeaser /> nodes if passed articles', () => {
        const { wrapper } = setup({
            articles: mockArticles
        });

        expect(wrapper.containsMatchingElement(<ArticleTeaser {...mockArticles[0]} />)).toEqual(true);
    });
});
