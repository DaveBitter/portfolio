// Libs
import React from 'react';

// Utils
import { WorkExperienceInterface } from '../../../static/js/utils/Interfaces/Interfaces'
import { getDictionary } from '../../../static/js/utils/getContent';
import formatDate from '../../../static/js/utils/formatDate';
import compileMarkdownToJSX from '../../../static/js/utils/compileMarkdownToJSX';

// Resources
import ExternalIcon from '../../../static/img/icons/external.svg';

// Components

// Interface
interface IProps {
    workExperience: WorkExperienceInterface[]
}

// Component
const ResumeWorkExperience = ({ workExperience = [], ...attributes }: IProps) => {
    const dictionary = getDictionary();

    return <ul className='resume-work-experience' {...attributes}>
        {workExperience.map(({ company, companyWebsite, role, startDate, endDate, present, city, countryCode, body }: WorkExperienceInterface) => <li className='resume-work-experience__item' key={`${company}-${startDate}`}>
            <h3 className='resume-work-experience__item-heading h4' data-reveal-in-view>
                <a href={companyWebsite} target='_blank' rel='noopener noreferrer'>{company} <ExternalIcon /></a> <span className='resume-work-experience__item-role h6'>| {role}</span>
            </h3>
            <div data-reveal-in-view>
                <time className='resume-work-experience__item-date' dateTime={`${startDate}`}>{formatDate(`${startDate}`, { month: 'long', year: 'numeric' })} - </time>
                <time className='resume-work-experience__item-date' dateTime={`${endDate}`} data-is-present={present}>{present ? dictionary.present : formatDate(`${endDate}`, { month: 'long', year: 'numeric' })}</time>
                <span className='resume-work-experience__item-location'> | {city}, {countryCode}</span>
            </div>
            <div className='resume-work-experience__item-body' dangerouslySetInnerHTML={{ __html: compileMarkdownToJSX(body) }} data-reveal-in-view />
        </li>)}
    </ul>;
};

// Props
ResumeWorkExperience.defaultProps = {};

export default ResumeWorkExperience;
