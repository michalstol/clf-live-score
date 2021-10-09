import React from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { auth } from '../../app/firebase';

export const testId = 'view--sign-in';

const providers = {
    google: new GoogleAuthProvider(),
};

export default function SignIn(): JSX.Element {
    const history = useHistory();

    // Method to sign in by Google provider
    const signIn = async () => {
        signInWithPopup(auth, providers.google)
            .then(result => {
                if (!result.user) return undefined;

                // Can be wrapped by setTimeout
                history.replace({ pathname: '/logged' });
            })
            .catch(err => console.warn(err));
    };

    return (
        <Container data-testid={testId}>
            <button onClick={signIn}>Sign in with Google</button>
        </Container>
    );
}

const Container = styled.div`
    min-height: 100vh;
`;
