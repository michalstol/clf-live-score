import { render, screen } from '@testing-library/react';

import Connection, { testId } from './Connection';

test('view - Connection - exist', () => {
    render(<Connection />);

    const $connection = screen.getByTestId(testId);

    expect($connection).toBeInTheDocument();
});
