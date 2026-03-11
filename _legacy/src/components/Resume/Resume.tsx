// Libs
import React from 'react';

// Utils
import { getHeadings } from '../../static/js/utils/getContent';
import { EducationInterface, WorkExperienceInterface } from '../../static/js/utils/Interfaces/Interfaces';
import ResumeEducation from './ResumeEducation/ResumeEducation';
import ResumeWorkExperience from './ResumeWorkExperience/ResumeWorkExperience';

// Resources

// Components

// Interface
interface IProps {
    workExperience: WorkExperienceInterface[]
    education: EducationInterface[]
}

// Component
const Resume = ({ workExperience, education, ...attributes }: IProps) => {
    const headings = getHeadings();

    return <div className='resume' {...attributes}>
        <div id='work-experience' className='resume__section'>
            <h2 data-reveal-in-view>{headings.workExperience}</h2>
            <ResumeWorkExperience workExperience={workExperience} />
        </div>

        <div id='work-education' className='resume__section'>
            <h2 data-reveal-in-view>{headings.education}</h2>
            <ResumeEducation education={education} />
        </div>
    </div>;
};

// Props
Resume.defaultProps = {};

export default Resume;
