// Libs
import React from 'react';

// Utils
import { EducationInterface } from '../../../static/js/utils/Interfaces/Interfaces'
import { getDictionary } from '../../../static/js/utils/getContent';
import formatDate from '../../../static/js/utils/formatDate';
import compileMarkdownToJSX from '../../../static/js/utils/compileMarkdownToJSX';

// Resources
import ExternalIcon from '../../../static/img/icons/external.svg';

// Components

// Interface
interface IProps {
    education: EducationInterface[]
}

// Component
const ResumeEducation = ({ education = [], ...attributes }: IProps) => {
    const dictionary = getDictionary();

    return <ul className='resume-education' {...attributes}>
        {education.map(({ institute, instituteWebsite, study, grade, startDate, endDate, present, city, countryCode, body }: EducationInterface) => <li className='resume-education__item' key={`${institute}-${startDate}`}>
            <h3 className='resume-education__item-heading h4' data-reveal-in-view>
                <a href={instituteWebsite} target='_blank' rel='noopener noreferrer'>{institute} <ExternalIcon /></a>
            </h3>
            <h4 className='resume-education__item-study h6' data-reveal-in-view>{study} {grade && <span>({grade})</span>}</h4>
            <div data-reveal-in-view>
                <time className='resume-education__item-date' dateTime={`${startDate}`}>{formatDate(`${startDate}`, { month: 'long', year: 'numeric' })} - </time>
                <time className='resume-education__item-date' dateTime={`${endDate}`} data-is-present={present}>{present ? dictionary.present : formatDate(`${endDate}`, { month: 'long', year: 'numeric' })}</time>
                <span className='resume-education__item-location'> | {city}, {countryCode}</span>
            </div>
            <div className='resume-education__item-body' dangerouslySetInnerHTML={{ __html: compileMarkdownToJSX(body) }} data-reveal-in-view />
        </li>)}
    </ul>;
};

// Props
ResumeEducation.defaultProps = {};

export default ResumeEducation;
