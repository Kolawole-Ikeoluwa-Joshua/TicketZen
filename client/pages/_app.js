// add global css
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';

// define custom app component wrapper for nextjs
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
    <div>
        <h1>
            Header {currentUser ? currentUser.email: ""}       
        </h1>
        <Component {...pageProps} />
    </div>
    );
};

// information fetching for entire app
AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx);

    }
    
    return {
        pageProps,
        ...data
    }
     
};

export default AppComponent;