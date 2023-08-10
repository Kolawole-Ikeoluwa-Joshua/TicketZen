import buildClient from "../api/build-client";

const Landing = ({ currentUser }) => {
    
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // });
    console.log(currentUser);

    return <h1>Landing Page</h1>;
};

// get extra data before rendering up webpage - used when SSR
Landing.getInitialProps = async (context) => {
    const client = buildClient(context);

    const { data } = await client.get('/api/users/currentuser');

    return data;
};

export default Landing;