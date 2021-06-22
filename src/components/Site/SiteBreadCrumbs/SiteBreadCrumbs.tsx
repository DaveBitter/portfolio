// Libs
import React from 'react';
import { NextRouter, useRouter } from 'next/router';
import Link from 'next/link';

// Utils
import { getArticles, getDictionary, getFridayTips, getQuickBits, getTags } from '../../../static/js/utils/getContent';

// Resources
import Logo from '../../../static/img/logo.svg'

// Components

// Interface
interface IProps { }

// Component
const dictionary = getDictionary();
const articles = getArticles();
const quickBits = getQuickBits();
const fridayTips = getFridayTips();
const tags = getTags();
const getLabelFromParam = (value: string, subPath: string) => {
    switch (subPath) {
        case 'quick-bits':
            return dictionary.quickBits
        case 'friday-tips':
            return dictionary.fridayTips
        case '[tag]':
            return tags[value] || value;
        case '[slug]':
            return ([...articles, ...quickBits, ...fridayTips].find(({ slug }) => slug === value) || {}).title || value;
        case '_error':
            return dictionary.error;
        default:
            return dictionary[subPath] || subPath;
    }
}

const getBreadCrumbs = (router: NextRouter) => {
    const { route, query } = router;
    // @ts-ignore
    let [_, ...subPaths] = route.split('/');

    return subPaths.map((subPath: string) => {
        const isParam = subPath[0] === '[' && subPath.slice(-1) === ']'
        const formattedParam = subPath.substring(1).slice(0, -1);

        const breadCrumb = {
            // @ts-ignore
            label: getLabelFromParam((isParam ? query[formattedParam] : subPath), subPath),
            href: router.pathname.split(subPath)[0] + (isParam ? query[formattedParam] : subPath)
        }
        return isParam ? breadCrumb : breadCrumb;
    }).filter(breadCrumb => !!breadCrumb.label.length)
}
const SiteBreadCrumbs = ({ ...attributes }: IProps) => {
    const router = useRouter();
    const breadCrumbs = getBreadCrumbs(router);

    return <>
        <nav className='site-bread-crumbs' data-reveal-in-view data-reveal-animation='fade-down' {...attributes} >
            <span className='site-bread-crumbs__logo'>
                <Logo />
                <Link href='/'><a>{dictionary.home}</a></Link>
            </span>
            <ul className='site-bread-crumbs__items'>
                {!!breadCrumbs.length && breadCrumbs.map(({ label, href }: { label: string, href: string }, index: number) => <li className='site-bread-crumbs__item' key={index}>
                    <Link href={href}><a className='site-bread-crumbs__link'>{label}</a></Link>
                </li>)}
            </ul>
        </nav>
    </>;
};

// Props
SiteBreadCrumbs.defaultProps = {};

export default SiteBreadCrumbs;
