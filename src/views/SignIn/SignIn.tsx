import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { signInWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../../app/firebase';

export const testId = 'view--sign-in';

export default function SignIn(): JSX.Element {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const setState = {
        email: (value: string) => {
            setEmail(value);
        },
        password: (value: string) => {
            setPassword(value);
        },
    };
    const changeHandler = ({
        currentTarget: { value, name },
    }: React.SyntheticEvent<HTMLInputElement>) => {
        setState[name as 'password' | 'email'].call(undefined, value);
    };
    // Method to sign in by Google provider
    const signIn = async () => {
        signInWithEmailAndPassword(auth, email, password)
            .then(result => {
                if (!result.user) return;

                history.replace({ pathname: '/feed' });
            })
            .catch(err => console.warn(err));
    };

    return (
        <Container data-testid={testId}>
            <input
                type="email"
                name="email"
                onChange={changeHandler}
                placeholder="E-mail"
                value={email}
            />
            <input
                type="password"
                name="password"
                onChange={changeHandler}
                placeholder="Password"
                value={password}
            />

            <button onClick={signIn} disabled={!email || !password}>
                Sign in with Google
            </button>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
`;
