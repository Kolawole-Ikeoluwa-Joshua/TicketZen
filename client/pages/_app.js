// add global css
import 'bootstrap/dist/css/bootstrap.css';

// define custom app component wrapper for nextjs
export default ({ Component, pageProps }) => {
    return <Component {...pageProps} />
};