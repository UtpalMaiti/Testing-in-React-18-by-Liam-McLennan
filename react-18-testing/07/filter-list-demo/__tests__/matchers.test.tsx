import { render, screen, getByRole } from '@testing-library/react'

test('toBeInTheDocument', () => {
    render(<p>test</p>);
    
    expect(screen.queryByText('test')).not.toBeNull();
    expect(screen.queryByText('test')).toBeInTheDocument();
});