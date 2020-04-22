// Libs
import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

// Utils
import { DictionaryInterface } from '../../../static/utils/Interfaces/Interfaces';

// Content
import { dictionary } from '../../../static/content/dictionary';

// Resources
// @ts-ignore
import ArticlesIcon from '../../../static/img/icons/news.svg';
// @ts-ignore
import HomeIcon from '../../../static/img/icons/home.svg';
// @ts-ignore
import QuickBitsIcon from '../../../static/img/icons/bolt.svg';

// Components

// Interface
interface IProps { }

// Helpers
const getNavigationItems = (dictionary: DictionaryInterface) => [
    { label: dictionary.articles, href: '/articles', Icon: ArticlesIcon },
    { label: dictionary.home, href: '/', Icon: HomeIcon },
    { label: dictionary.quickBits, href: '/quick-bits', Icon: QuickBitsIcon }
];

// Component
const SiteNav = ({ ...attributes }: IProps) => {
    const items = getNavigationItems(dictionary)
    const router = useRouter();

    return <nav className='site-nav' {...attributes}>
        <ul className='site-nav__items'>
            {items.map(({ label, href, Icon }, index) => <li key={index} className='site-nav__item' data-is-active={`${router && (router.asPath === href)}`}>
                <Link href={href}>
                    <a className='site-nav__link'>{label}</a>
                </Link>

                <Icon className='site-nav__icon' />
            </li>)}
        </ul>
    </nav>
};

// Props
SiteNav.defaultProps = {};

export default SiteNav;
