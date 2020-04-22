// Libs
import React from 'react';
import Head from "next/head"

// Utils
import { attributes, react as HomeContent } from '../content/home.md';

// Resources

// Components

// Interface
interface IProps { }

// Component
const Home = ({ }: IProps) => {
    let { title, cats } = attributes;

    return <>
        <Head>
            <script src="https://identity.netlify.com/v1/netlify-identity-widget.js"></script>
        </Head>
        <article>
            <h1>{title}</h1>
            <HomeContent />
            <ul>
                {cats.map((cat, k) => (
                    <li key={k}>
                        <h2>{cat.name}</h2>
                        <p>{cat.description}</p>
                    </li>
                ))}
            </ul>
        </article>
    </>

};

// Props
Home.defaultProps = {};

export default Home;
