/*
Here can be add "Framer - AnimatePresence" to create transition between pages
*/

import React from 'react';
import { Switch, useLocation } from 'react-router-dom';

interface SwitchGroupProps {
    children: React.ReactNode;
}

export const testId = 'switch-group';

export default function SwitchGroup({
    children,
}: SwitchGroupProps): JSX.Element {
    const location = useLocation();

    return (
        <Switch
            location={location}
            key={location.pathname}
            data-testid={testId}
        >
            {children}
        </Switch>
    );
}
