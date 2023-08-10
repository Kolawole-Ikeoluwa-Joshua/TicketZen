// helper function for client
// logic to build an instance of axios that works on current environment
import axios from "axios";

export default ({ req }) => {
    if (typeof window === 'undefined') {
        // We are on the server
        // requests should be made to cross namespace ingress-nginx-ctrlr domain
        // http://SERVICENAME.NAMESPACE.svc.cluster.local

        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        // We must be on the browser
        // requests can be made with a base url of ''
        return axios.create({
            baseURL: '/'
        });
    }
};