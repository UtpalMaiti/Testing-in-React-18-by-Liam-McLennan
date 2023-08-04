import { render, screen, waitFor } from '@testing-library/react'
import LazyContent from '@/components/LazyContent';

describe('LazyContent', () => {

    it('should render content... eventually', async () => {
        render(<LazyContent delay={500}>... or not to be</LazyContent>);
        
        // screen.getByText('... or not to be');
        // await screen.findByText('... or not to be');
        // await waitFor(() => { screen.getByText('... or not to be'); });
    });

});