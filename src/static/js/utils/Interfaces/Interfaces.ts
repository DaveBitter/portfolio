/*** Interfaces ***/
export interface ContentObjectInterface {
    [key: string]: string
}

export interface ArticleInterface {
    body: string,
    date: string,
    intro: string,
    tags: TagInterface[],
    slug: string,
    teaserCopy: string,
    teaserImage: string,
    title: string,
    as: string,
    href: string,
}

export interface WorkExperienceInterface {
    company: string,
    companyWebsite: string,
    roles: { role: string, startDate: Date, endDate: Date, present: boolean }[],
    startDate: Date,
    endDate: Date,
    present: boolean,
    city: string,
    countryCode: string,
    body: string,
}

export interface EducationInterface {
    institute: string,
    instituteWebsite: string,
    study: string,
    grade?: string,
    startDate: Date,
    endDate: Date,
    present: boolean,
    city: string,
    countryCode: string,
    body: string
}

export interface TalkInterface {
    summary: string;
    title: string;
    teaserCopy: string,
    teaserImage: string,
    slug: string;
    tags: TagInterface[];
    eventVideo?: string;
    date: string;
    type: 'meetup' | 'conference';
    city: string;
    countryCode: string;
}

export interface TagInterface {
    key: string,
    value: string
}

export interface OGImageRequestInterface {
    title?: string | string[],
    date?: string | string[],
    image?: string | string[]
}