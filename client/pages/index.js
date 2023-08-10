import axios from 'axios';

const Landing = ({ currentUser }) => {
    
    // axios.get('/api/users/currentuser').catch((err) => {
    //     console.log(err.message);
    // });
    console.log(currentUser);

    return <h1>Landing Page</h1>;
};

// get extra data before rendering up webpage - used when SSR
Landing.getInitialProps = async ({ req }) => {
   if (typeof window === 'undefined') {
        // we are on the server!
        // requests should be made to cross namespace ingress-nginx-ctrlr domain
        // http://SERVICENAME.NAMESPACE.svc.cluster.local
        const { data } = await axios.get(
            'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser', 
            {
                headers: req.headers
            }
        );

        return data;
   } else {
        // we are on the browser!
        // requests can be made with a base url of ''
        const { data } = await axios.get('/api/users/currentuser');

        return data;
   }

   return {};
};

export default Landing;