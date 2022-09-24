import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {


    return (
        <Html lang="en-us" className="h-full bg-neutral" data-theme="night">
            <Head />
            <body className="h-full">
                <Main />
                <NextScript />
            </body>
        </Html>
    )


}