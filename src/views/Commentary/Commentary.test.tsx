import { render, screen } from '@testing-library/react';

import Commentary, { testId } from './Commentary';

test('view - Commentary - exist', () => {
    render(<Commentary />);

    const $commentary = screen.getByTestId(testId);

    expect($commentary).toBeInTheDocument();
});
