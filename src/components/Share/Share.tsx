// Libs
import React, { useRef } from 'react';

// Utils
import { getCopy, getDictionary } from 'static/js/utils/getContent';
import useScrollDirection from 'static/js/utils/hooks/useScrollDirection';

// Resources
import ShareIcon from '../../static/img/icons/share.svg';
import CopyIcon from '../../static/img/icons/copy.svg';

// Components

// Interface
interface IProps { }

// Component
const triggerCopyToClipboard = (feedbackElement: HTMLHtmlElement | null) => {
    const placeholder = document.createElement('input');

    document.body.appendChild(placeholder);
    placeholder.setAttribute('value', window.location.href);
    placeholder.select();

    document.execCommand('copy');

    document.body.removeChild(placeholder);

    if (feedbackElement) {
        feedbackElement.dataset.active = 'true';

        setTimeout(() => feedbackElement.dataset.active = 'false', 2000);
    }
};

const triggerNativeShare = () => {
    window.navigator['share']({
        url: window.location.href
    });
};

const getContent = (type: 'share' | 'copy') => {
    switch (type) {
        case 'share':
            return {
                label: getDictionary().share,
                icon: <ShareIcon />,
                handler: triggerNativeShare
            }
        case 'copy':
            return {
                label: getDictionary().share,
                icon: <CopyIcon />,
                handler: triggerCopyToClipboard
            }
        default:
            return {};
    }
}


const Share = ({ ...attributes }: IProps) => {
    const type = typeof window !== 'undefined' && window.navigator['share'] ? 'share' : 'copy';
    const { label, icon, handler } = getContent(type)

    const copiedFeedbackRef = useRef<HTMLHtmlElement>(null)
    const scrollDirection = useScrollDirection()

    return <div className='share' data-is-active={scrollDirection === 'up'}>
        <button className='share__trigger' onClick={() => handler && handler(type === 'share' ? null : copiedFeedbackRef.current)} {...attributes}>
            {label}
            {icon}
        </button>
        <span className='share__copied-feedback' ref={copiedFeedbackRef}>{getCopy().copiedToClipboard}</span>
    </div>;
};

// Props
Share.defaultProps = {};

export default Share;
