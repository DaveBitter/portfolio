// Libs
import React from 'react';

// Utils
import { getHeadings } from '../../static/js/utils/getContent';
import { WorkExperienceInterface } from '../../static/js/utils/Interfaces/Interfaces';
import ResumeWorkExperience from './ResumeWorkExperience/ResumeWorkExperience';

// Resources

// Components

// Interface
interface IProps {
    workExperience: WorkExperienceInterface[]
}

// Component
const Resume = ({ workExperience, ...attributes }: IProps) => {
    const headings = getHeadings();

    return <div className='resume' {...attributes}>
        <div id='work-experience'>
            <h2 data-reveal-in-view>{headings.workExperience}</h2>
            <ResumeWorkExperience workExperience={workExperience} />
        </div>
    </div>;
};

// Props
Resume.defaultProps = {};

export default Resume;
