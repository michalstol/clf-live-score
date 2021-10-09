import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import styled from 'styled-components';

import useAuth from '../../hooks/useAuth';

import LocationState from '../../types/locationState';

export const testId = 'view--connection';

export default function Connection(): JSX.Element {
    const { connected, logged } = useAuth();
    const history = useHistory();
    const location = useLocation<LocationState>();

    const defaultFrom = { pathname: 'feed' };
    const { from } = location.state || { from: { pathname: null } };
    const redirectPath =
        !from.pathname || (from.pathname === '/feed' && logged)
            ? defaultFrom
            : from || defaultFrom;

    useEffect(() => {
        if (connected) {
            history.replace(redirectPath);
        }
    }, [connected, history, redirectPath]);

    return <Container data-testid={testId}>Loading</Container>;
}

const Container = styled.div`
    min-height: 100vh;
`;
