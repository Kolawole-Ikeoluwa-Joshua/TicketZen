import { useState } from 'react'; // hooks to track state
import useRequest from '../../hooks/use-request'; //custom hook helper function


// signup component
export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { doRequest , errors } = useRequest({
        url: '/api/users/signup',
        method: 'post',
        body: {
            email, password
        }
    });


    const onSubmit = async (event) => {
        event.preventDefault();

        doRequest();

    };

    // event handlers & helper function
    return (

        <form onSubmit={onSubmit}> 
            <h1>Sign Up</h1>
            <div className="form-group">
                <label>Email Address</label>
                <input
                    value={email}
                    onChange={e => setEmail(e.target.value)} 
                    className="form-control" 
                />
            </div>
            <div className="form-group">
                <label>Password</label>
                <input
                    value={password}
                    onChange={e => setPassword(e.target.value)} 
                    type="password" 
                    className="form-control" 
                />
            </div>
            {errors}      
            <button className="btn btn-primary">Sign Up</button>
        </form>
    );
};