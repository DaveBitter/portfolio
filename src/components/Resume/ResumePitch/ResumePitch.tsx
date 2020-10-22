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

    return <div className='resume-pitch'>
        <div className='resume-pitch__copy'>
            <p className='h4' data-reveal-in-view>{copy.elevatorPitch}</p>
            {hasResumeLink && <Link href='/resume#elevator-pitch'>
                <a className='button-link' data-reveal-in-view>{dictionary.viewResume}</a>
            </Link>}
        </div>
        <div className='resume-pitch__chart'><ResumeProfileChart /></div>
    </div>
};

// Props
ResumePitch.defaultProps = {
    hasResumeLink: true
};

export default ResumePitch;
