import React from 'react';
import Head from 'next/head';
import {Container} from 'semantic-ui-react';
import Header from './Header';

// if we place any tag inside the Head component tag, it will be moved to the head of html
const LayoutComponent = (props) => {
    return (
        <Container>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
                />
            </Head>

            <Header />
            {props.children}
        </Container>
    );
}
export default LayoutComponent;