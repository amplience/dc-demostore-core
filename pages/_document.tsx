import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    {/* jquery */}
                    <script
                        src="https://code.jquery.com/jquery-3.6.0.js"
                        integrity="sha256-H+K7U5CnXl1h5ywQfKtSj8PCmoN9aaq30gDh27Xc0jk="
                        crossOrigin="anonymous"
                        defer
                    />

                    <script
                        src="https://code.jquery.com/ui/1.13.1/jquery-ui.js"
                        integrity="sha256-6XMVI0zB8cRzfZjqKcD01PBsAy3FlDASrlC8SxCpInY="
                        crossOrigin="anonymous"
                        defer
                    />
                    {/* end jquery */}

                    {/* lory slider */}
                    <script
                        src="https://cdnjs.cloudflare.com/ajax/libs/lory.js/2.5.3/lory.js"
                        integrity="sha512-XHHcz861fbc19dEMa8oNdyb2QNFaPLJAwnhdDUPs8Wl/52PR+JFGtaUK4eWO+ELhRWP1dKWpPFT6cC6Yi98XKA=="
                        crossOrigin="anonymous"
                        defer
                    />

                    <script src="/js/sliderHelper.js" defer />
                    {/* end lory slider */}

                    {/* google fonts */}
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css?family=Roboto|Roboto+Condensed:200,300,400,500,700&display=swap"
                    />
                    <link
                        rel="stylesheet"
                        href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400&display=swap"
                    />
                    {/* end google fonts */}

                    {/* bootstrap */}
                    <script
                        src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"
                        integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl"
                        crossOrigin="anonymous"
                        defer
                    />
                    {/* end bootstrap */}

                    <script src="/js/shoppableVideo.js" defer />
                    <script src="/js/af-modal.js" defer />
                    <script src="/js/af-debug.js" defer />
                    <script src="/js/amp-hotspot-lib.js" defer />

                    {/* amplience viewerkit */}
                    <script src="/js/viewer/viewer.min.js" defer />
                    <link rel="stylesheet" href="/css/viewer/viewer.css" />
                    {/* end amplience viewerkit */}

                    {/* algolia instantsearch */}
                    <script
                        src="https://cdn.jsdelivr.net/npm/algoliasearch@4.5.1/dist/algoliasearch-lite.umd.js"
                        integrity="sha256-EXPXz4W6pQgfYY3yTpnDa3OH8/EPn16ciVsPQ/ypsjk="
                        crossOrigin="anonymous"
                        defer
                    />

                    <script
                        src="https://cdn.jsdelivr.net/npm/instantsearch.js@4.8.3/dist/instantsearch.production.min.js"
                        integrity="sha256-LAGhRRdtVoD6RLo2qDQsU2mp+XVSciKRC8XPOBWmofM="
                        crossOrigin="anonymous"
                        defer
                    />

                    <link
                        rel="stylesheet"
                        href="https://cdn.jsdelivr.net/npm/instantsearch.css@7.3.1/themes/reset-min.css"
                        integrity="sha256-t2ATOGCtAIZNnzER679jwcFcKYfLlw01gli6F6oszk8="
                        crossOrigin="anonymous"
                    />
                    {/* end algolia instantsearch */}
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
    // Resolution order

    // Render app and page and get the context of the page with collected side effects.
    // const sheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    ctx.renderPage = () =>
        originalRenderPage({
            // enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
        });

    const initialProps = await Document.getInitialProps(ctx);

    return {
        ...initialProps,
        // Styles fragment is rendered after the app and page rendering finish.
        // styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
};
