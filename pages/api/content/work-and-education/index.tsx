// Utils
import { getWorkExperience, getEducation } from '../../../../src/static/js/utils/getContent';

export default async (req, res) => {
    const workExperience = getWorkExperience();
    const education = getEducation();

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ workExperience, education }));
};
