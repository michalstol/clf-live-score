import React, { useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import styled from 'styled-components';

import { auth } from '../../app/firebase';
import { useAppDispatch } from '../../app/hooks';
import useAuth from '../../hooks/useAuth';

import {
    changeUser,
    changeConnection,
} from '../../redux/slices/authorizedSlice';

interface AuthWatcherProps {
    showState?: boolean;
}

export const testId = 'auth-watcher';

let singletonInstance = false;

export default function AuthWatcher({
    showState = false,
}: AuthWatcherProps): JSX.Element {
    const dispatch = useAppDispatch();
    const { connected, logged } = useAuth();

    useEffect(() => {
        // Auth watcher
        const unsubscribe = onAuthStateChanged(auth, fUser => {
            if (!singletonInstance) {
                singletonInstance = true;
                dispatch(changeConnection(true));
            }

            if (!!fUser) {
                const { displayName, photoURL, uid } = fUser;

                // Build an user object
                const newUser = {
                    uid,
                    displayName,
                    photoURL,
                };

                // Dispatch changeUser action
                dispatch(changeUser(newUser));
            } else {
                // Dispatch changeUser action
                dispatch(changeUser(null));
            }
        });

        // Unsubscribe auth watcher
        return unsubscribe;
    }, [dispatch]);

    return (
        <>
            {showState && (
                <Status data-testid={testId}>
                    <ul>
                        <li>
                            <strong>connected</strong>: {connected.toString()}
                        </li>
                        <li>
                            <strong>sign in</strong>: {logged.toString()}
                        </li>
                        <li>
                            <button onClick={signOut.bind(undefined, auth)}>
                                signOut
                            </button>
                        </li>
                    </ul>
                </Status>
            )}
        </>
    );
}

const Status = styled.aside`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    font-size: 0.8em;
    opacity: 0.3;

    &:hover {
        opacity: 1;
    }

    ul {
        margin: 0;
        padding: 5px;
        list-style: none;
        display: flex;
        justify-content: space-between;
    }

    li {
        text-align: center;
        flex: 1 1 auto;
    }
`;
