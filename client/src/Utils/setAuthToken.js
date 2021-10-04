import axios from "axios";

const setAuthToken = (token) => {
    if(token) {
        axios.defaults.headers.common['x-auth-token'] = token; // If token is passed in, set the token with the headers' 'x-auth-token key
    } else {
        delete axios.defaults.headers.common('x-auth-token'); // Otherwise, delete the token passed in
    }
}
export default setAuthToken;