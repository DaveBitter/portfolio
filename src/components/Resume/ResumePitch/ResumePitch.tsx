// Libs
import Link from 'next/link';
import React from 'react';
import { getCopy, getDictionary } from '../../../static/js/utils/getContent';

// Utils

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
                <p className='h4' data-reveal-in-view>{copy.elevatorPitch}</p>
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
