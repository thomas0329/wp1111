// copied from https://www.howtographql.com/react-apollo/5-authentication/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
// import { AUTH_TOKEN } from '../constants';
import { useComic } from '../containers/hooks/useComic';
import Title from '../components/Title';

const SIGNUP_MUTATION = gql`
  mutation SignupMutation(
    $email: String!
    $password: String!
    $name: String!
  ) {
    signup(
      email: $email
      password: $password
      name: $name
    ) {
      id
      name
      email
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation(
    $email: String!
    $password: String!
  ) {
    login(email: $email, password: $password) {
      id
      name
      email
    }
  }
`;


const Login = () => {
  const navigate = useNavigate();
  const { setMe } = useComic();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });
  
  // set me with the resolver return value
  const [login] = useMutation(LOGIN_MUTATION, {
    // update: (mutationResult) => {
    //   console.log('mutationResult: ', mutationResult.data.data["User:63abef14a72cf715bc75503f"].name);
    // },
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      // localStorage.setItem(AUTH_TOKEN, login.token);
      setMe(data.login.name);
      navigate('/template');
    }
  });

  // useEffect(() => {
  //   console.log('login_data');
  //   console.log(login_data);
  // }, [login_data]);
  
  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      // localStorage.setItem(AUTH_TOKEN, signup.token);
      setMe(data.signup.name);
      navigate('/template');
    }
  });

  // const handleLoginOrSignup = async () => {
  //   if (formState.login){
  //     let { data } = await login();
  //     // console.log(data.login.name);
      
  //   }
  //   else{
  //     let { data } = await signup();
  //     // console.log(data.signup.name);
  //   }
  // }

  return (
    <div>
      <Title />
      <h4 className="mv3">
        {formState.login ? 'Login' : 'Sign Up'}
      </h4>
      <div className="flex flex-column">
        {!formState.login && (
          <input
            value={formState.name}
            onChange={(e) => {
              setFormState({
                ...formState,
                name: e.target.value
              })
            }}
            type="text"
            placeholder="Your name"
          />
        )}
        <input
          value={formState.email}
          onChange={(e) => {
            setFormState({
              ...formState,
              email: e.target.value
            });
          }}
          type="text"
          placeholder="Your email address"
        />
        <input
          value={formState.password}
          onChange={(e) => {
            setFormState({
              ...formState,
              password: e.target.value
            });
          }}
          type="password"
          placeholder={formState.login ? "Your password" : "Choose a safe password"}
        />
      </div>
      <div className="flex mt3">
        <button
          className="pointer mr2 button"
          onClick={formState.login ? login : signup}
          // onClick={handleLoginOrSignup}
        >
          {formState.login ? 'login' : 'create account'}
        </button>
        <button
          className="pointer button"
          onClick={(e) =>
            setFormState({
              ...formState,
              login: !formState.login
            })
          }
        >
          {formState.login
            ? 'need to create an account?'
            : 'already have an account?'}
        </button>
      </div>
    </div>
  );
};

export default Login;