import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { GoogleLogin } from 'react-google-login';
import { gql } from 'apollo-boost';
import { useLocation, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setAuth } from '../store/actions';

const LOGIN = gql`
  mutation LoginMutation($email: String!, $name: String!, $token: String!) {
    customerLogin(email: $email, name: $name, token: $token)
  }
`

function Login(props) {
    const [login] = useMutation(LOGIN);
    const location = useLocation();
    const history = useHistory();
    const dispatch = useDispatch();
    const { from } = location.state || { from: { pathname: "/" } };
    const onLogin = rsp => {
        let { email, givenName: name } = rsp.profileObj;
        login({
            variables: { token: rsp.tokenId, email, name }
        }).then(rsp => {
            localStorage.setItem('token', rsp.data.customerLogin);
            // localStorage.setItem('username', email);
            // props.onLogin(true);
            dispatch(setAuth(true));
            history.replace(from);
        })
    }
    const handleLoginFailure = (err) => {
        console.log(err)
    }
    return <div className="lg-c">
        <div className="lg-a">
            <div className="lg-t">Telyshopper</div>
            <GoogleLogin
                clientId={'370868874003-92rm2j8u3sftuio1ptod99b2tfkp6jh0'}
                buttonText="Sign in with Google"
                style={{ borderRadius: 20, color: '#fff' }}
                onSuccess={onLogin}
                onFailure={handleLoginFailure}
                cookiePolicy={'single_host_origin'}
                responseType='code,token'
                // isSignedIn={true}
                />
        </div>
    </div>
}

export default Login;