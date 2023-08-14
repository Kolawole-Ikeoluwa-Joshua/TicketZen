import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
    return currentUser ? (
        <h1>You are signed in</h1>
    ) : (
        <h1>You are NOT signed in</h1>
    );
};

// get extra data before rendering up webpage - used when SSR
// information fetching for individual pages
Landing.getInitialProps = async (context) => {
    console.log('LANDING PAGE!');
    const client = buildClient(context);
    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default Landing;