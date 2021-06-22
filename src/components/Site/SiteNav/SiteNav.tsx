// Libs
import React from 'react';
import Link from 'next/link';
import { useRouter } from "next/router";

// Utils
import { ContentObjectInterface } from '../../../static/js/utils/Interfaces/Interfaces';

// Content
import { getDictionary } from '../../../static/js/utils/getContent';

// Resources
import ArticlesIcon from '../../../static/img/icons/news.svg';
import HomeIcon from '../../../static/img/icons/home.svg';
import QuickBitsIcon from '../../../static/img/icons/bolt.svg';
import ResumeIcon from '../../../static/img/icons/resume.svg';
import VideoIcon from '../../../static/img/icons/video.svg';

// Components

// Interface
interface IProps { }

// Helpers
const getNavigationItems = (dictionary: ContentObjectInterface) => [
    { label: dictionary.articles, href: '/articles', Icon: ArticlesIcon },
    { label: dictionary.quickBits, href: '/quick-bits', Icon: QuickBitsIcon },
    { label: dictionary.home, href: '/', Icon: HomeIcon },
    { label: dictionary.fridayTips, href: '/friday-tips', Icon: VideoIcon },
    { label: dictionary.resume, href: '/resume', Icon: ResumeIcon },
];

// Component
const SiteNav = ({ ...attributes }: IProps) => {
    const dictionary = getDictionary();
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
