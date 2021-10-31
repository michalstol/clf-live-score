import { render, screen } from '@testing-library/react';

import Feed, { testId } from './Feed';

test('view - Feed - exist', () => {
    render(<Feed />);

    const $feed = screen.getByTestId(testId);

    expect($feed).toBeInTheDocument();
});
