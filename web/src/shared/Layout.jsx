import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
export default (props) => {
    return (
        <>
        <Header />
        <main className="mx-auto">
            { props.children}
        </main>

        <Footer />

        </>
    )
}