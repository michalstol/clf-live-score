import { render, screen } from '@testing-library/react';

import CreateGame, { testId } from './CreateGame';

test('view - CreateGame - exist', () => {
    render(<CreateGame />);

    const $createGame = screen.getByTestId(testId);

    expect($createGame).toBeInTheDocument();
});
