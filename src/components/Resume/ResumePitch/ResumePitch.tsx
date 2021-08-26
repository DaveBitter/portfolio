// Libs
import Link from 'next/link';
import React from 'react';

// Utils
import { getCopy, getDictionary } from '../../../static/js/utils/getContent';
import compileMarkdownToJSX from '../../../static/js/utils/compileMarkdownToJSX';

// Resources

// Components
import ResumeProfileChart from '../ResumeProfileChart/ResumeProfileChart';

// Interface
interface IProps {
    hasResumeLink: boolean
}

// Component
const ResumePitch = ({ hasResumeLink, ...attributes }: IProps) => {
    const copy = getCopy();
    const dictionary = getDictionary();

    return <>
        <div className='resume-pitch' {...attributes}>
            <div className='resume-pitch__copy'>
                <div className='resume-pitch__intro-wrapper' data-reveal-in-view>
                    <video className='resume-pitch__intro' src='/video/dave-bitter-intro.mp4' poster='/img/dave-bitter-intro.jpg' controls />
                </div>
                <div className='h5' dangerouslySetInnerHTML={{ __html: compileMarkdownToJSX(copy.elevatorPitch) }} data-reveal-in-view />
            </div>
            <div className='resume-pitch__chart'><ResumeProfileChart /></div>
        </div>
        {hasResumeLink && <Link href='/resume#elevator-pitch'>
            <a className='resume-pitch__link button-link' data-reveal-in-view>{dictionary.viewResume}</a>
        </Link>}
    </>;
};

// Props
ResumePitch.defaultProps = {
    hasResumeLink: true
};

export default ResumePitch;
