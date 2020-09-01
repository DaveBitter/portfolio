export interface DictionaryInterface {
    [key: string]: string
}

export interface ArticleInterface {
    body: string,
    date: string,
    intro: string,
    tags?: TagInterface[]
    slug: string,
    teaserCopy: string,
    teaserImage: string,
    title: string,
    as: string,
    href: string,
}

export interface TagInterface {
    key: string,
    value: string
}
