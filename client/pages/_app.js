// add global css
import 'bootstrap/dist/css/bootstrap.css';
import buildClient from '../api/build-client';
import Header from '../components/header';

// define custom app component wrapper for nextjs
const AppComponent = ({ Component, pageProps, currentUser }) => {
    return (
    <div>
        <Header currentUser={currentUser} />
        <div className="container">
            <Component currentUser={currentUser} {...pageProps} />
        </div>
    </div>
    );
};

// information fetching for entire app
AppComponent.getInitialProps = async appContext => {
    const client = buildClient(appContext.ctx);
    const { data } = await client.get('/api/users/currentuser');

    let pageProps = {};
    if (appContext.Component.getInitialProps) {
        pageProps = await appContext.Component.getInitialProps(appContext.ctx, client, data.currentUser);

    }
    
    return {
        pageProps,
        ...data
    }
     
};

export default AppComponent;