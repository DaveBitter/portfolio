// Libs
import React from 'react';

// Utils
import { getDictionary } from '../../static/js/utils/getContent';

// Resources
// @ts-ignore
import githubIcon from '../../static/img/icons/github.svg';
// @ts-ignore
import linkedinIcon from '../../static/img/icons/linkedin.svg';
// @ts-ignore
import twitterIcon from '../../static/img/icons/twitter.svg';
// @ts-ignore
import instagramIcon from '../../static/img/icons/instagram.svg';
// @ts-ignore
import emailIcon from '../../static/img/icons/email.svg';

// Components

// Interface
interface IProps {
    items: [{
        key: string,
        label?: string,
        icon: any,
        href: string
    }],
    theme: string
}

// Component
const Socials = ({ items, theme, ...attributes }: IProps) => {
    return <ul className='socials' data-theme={theme} {...attributes}>
        {items.map(({ key, label, icon, href }) => <li className='socials__item' key={key}>
            <a className='socials__link' href={href} target='_blank' rel='noopener noreferrer'>
                {label}
                {icon()}
            </a>
        </li>)}
    </ul>;
};

// Props
const dictionary = getDictionary();

Socials.defaultProps = {
    items: [
        { key: 'github', label: dictionary.github, icon: githubIcon, href: 'https://github.com/DaveBitter' },
        { key: 'linked-in', label: dictionary.linkedIn, icon: linkedinIcon, href: 'https://www.linkedin.com/in/davebitter/' },
        { key: 'twitter', label: dictionary.twitter, icon: twitterIcon, href: 'https://twitter.com/dave_bitter' },
        { key: 'instagram', label: dictionary.instagram, icon: instagramIcon, href: 'https://www.instagram.com/davebitter/' },
        { key: 'email', label: dictionary.email, icon: emailIcon, href: 'mailto:daveybitter@gmail.com' }
    ],
    theme: 'light'
};

export default Socials;
