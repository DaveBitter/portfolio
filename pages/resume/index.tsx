// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import query from '../../src/static/js/utils/api/query';

// Resources

// Components
import Resume from '../../src/components/Resume/Resume';
import ResumePitch from 'components/Resume/ResumePitch/ResumePitch';
import { ContentObjectInterface, EducationInterface, WorkExperienceInterface } from '../../src/static/js/utils/Interfaces/Interfaces';

// Interface
interface IProps {
    headings: ContentObjectInterface,
    workExperience: WorkExperienceInterface[],
    education: EducationInterface[]
}

// Component
const ResumePage = ({ headings, workExperience, education }: IProps) => {
    return <>
        <div className='grid'>
            <div id='elevator-pitch' className='g4'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.elevatorPitch}</h2>
                <ResumePitch hasResumeLink={false} />
            </div>

            <div className='g6'>
                <Resume workExperience={workExperience} education={education} />
            </div>

            <div className='g6'>
            </div>
        </div>
    </>;
};

export const getStaticProps: GetStaticProps = async () => {
    const { copy, headings } = await query('/content/ui');
    const { workExperience, education } = await query('/content/work-and-education');

    return {
        props: {
            pageTitle: headings.greeting || null,
            pageCopy: copy.greetingIntro || null,
            pageDescription: copy.pageDescription || null,
            pageImage: '/img/dave.jpg',
            src: '/img/dave-flipped.jpg',
            copy,
            headings,
            workExperience,
            education
        }
    };
};

// Props
ResumePage.defaultProps = {};

export default ResumePage;
