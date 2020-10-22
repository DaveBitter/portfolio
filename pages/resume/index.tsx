// Libs
import React from 'react';
import { GetStaticProps } from 'next';

// Utils
import { getHeadings, getCopy, getWorkExperience, getEducation } from '../../src/static/js/utils/getContent';

// Resources

// Components
import Resume from '../../src/components/Resume/Resume'
import ResumePitch from 'components/Resume/ResumePitch/ResumePitch';

// Interface
interface IProps { }

// Component
const ResumePage = ({ }: IProps) => {
    const headings = getHeadings();
    const workExperience = getWorkExperience();
    const education = getEducation();

    return <>
        <div className='grid'>
            <div id='elevator-pitch' className='g4'>
                <h2 className='text-colored h1' data-reveal-in-view>{headings.elevatorPitch}</h2>
                <ResumePitch />
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
    const headings = getHeadings();
    const copy = getCopy();

    return {
        props: {
            title: headings.greeting || null,
            copy: copy.greetingIntro || null,
            pageDescription: copy.pageDescription || null,
            pageImage: '/img/dave.jpg',
            src: '/img/dave-flipped.jpg'
        }
    }
}
// Props
ResumePage.defaultProps = {};

export default ResumePage;
