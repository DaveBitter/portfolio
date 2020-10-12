/*** Interfaces ***/
export interface DictionaryInterface {
    [key: string]: string
}

export interface ArticleInterface {
    body: string,
    date: string,
    intro: string,
    tags: TagInterface[]
    slug: string,
    teaserCopy: string,
    teaserImage: string,
    title: string,
    as: string,
    href: string,
}

export interface WorkExperienceInterface {
    company: string
    companyWebsite: string
    role: string
    startDate: Date
    endDate: Date
    present: boolean
    city: string
    countryCode: string
    body: string
}

export interface TagInterface {
    key: string,
    value: string
}
