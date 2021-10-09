import { render, screen } from '@testing-library/react';

import Logged, { testId } from './Logged';

test('view - Logged - exist', () => {
    render(<Logged />);

    const $logged = screen.getByTestId(testId);

    expect($logged).toBeInTheDocument();
});
