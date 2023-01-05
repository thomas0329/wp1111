// copied from https://www.howtographql.com/react-apollo/5-authentication/
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, gql } from '@apollo/client';
import { useComic } from '../containers/hooks/useComic';
import Title from '../components/Title';
import { LOGIN_MUTATION, SIGNUP_MUTATION } from '../graphql';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
	justify-content: center;
`

const LoginBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  // justify-content: center;
  border-radius: 10px;
  padding: 10px;

  h2, h3{
    // width: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
  }

  h2{
    position: relative;
  }
  h3{
    margin-left: 5px
  }
`

const Login = () => {
  const navigate = useNavigate();
  const { setUser } = useComic();
  const [formState, setFormState] = useState({
    login: true,
    email: '',
    password: '',
    name: ''
  });

  // set me with the resolver return value
  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      // localStorage.setItem(AUTH_TOKEN, login.token);
      console.log('data.login: ', data.login);
      setUser({ name: data.login.name, email: data.login.email });
      console.log(data.login.name);
      console.log(data.login.email);
      navigate('/template');
    }
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: formState.name,
      email: formState.email,
      password: formState.password
    },
    onCompleted: (data) => {
      // localStorage.setItem(AUTH_TOKEN, signup.token);
      setUser({ name: data.signup.name, email: data.signup.email });
      navigate('/template');
    }
  });

  return (<>
    <Title style = {{ top: '50px'}}/>
    <Wrapper style={{ height: '100%', width: '60%' }} >
      <LoginBox style={{backgroundColor: '#D6E6ED', height: '50%'}}>
        <h2 className="mv3" style={{ color: '#50545D' }}>
          {formState.login ? 'Login' : 'Sign Up'}
        </h2>

        <div className="flex flex-column" style={{width: '100%'}}>
          {!formState.login && (
            <>
            <h3 style={{width:'90%'}}>Name</h3>
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
            </>
          )}

          <h3>Email</h3>
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

          <h3>Password</h3>
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
      </LoginBox>
    </Wrapper>
    </>
  );
};

export default Login;