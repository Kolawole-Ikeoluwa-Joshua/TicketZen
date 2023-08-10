import axios from 'axios';

const Landing = ({ currentUser }) => {
    // console.log(currentUser);
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // });

    return <h1>Landing Page</h1>;
};

// get extra data before rendering up webpage - used when SSR
Landing.getInitialProps = async () => {
   if (typeof window === 'undefined') {
        // we are on the server!
        // requests should be made to cross namespace ingress-nginx-ctrlr domain
   } else {
        // we are on the browser!
        // requests can be made with a base url of ''
   }

   return {};
};

export default Landing;