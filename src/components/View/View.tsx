/*
Here can be add "Framer" animation to create transition between pages
*/

import React from 'react';
import styled from 'styled-components';

interface ViewProps {
    children: React.ReactNode;
}

export const testId = 'view';

export default function View({ children }: ViewProps): JSX.Element {
    return <Container data-testid={testId}>{children}</Container>;
}

const Container = styled.main`
    position: relative;
    min-height: 100%;
`;
