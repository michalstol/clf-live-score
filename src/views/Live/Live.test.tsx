import { render, screen } from '@testing-library/react';

import Live, { testId } from './Live';

test('view - Live - exist', () => {
    render(<Live />);

    const $live = screen.getByTestId(testId);

    expect($live).toBeInTheDocument();
});
