import { render, screen, fireEvent, within } from '@testing-library/react';
import Metals from '@/pages/metals';

describe('Metals page', () => {
    it('should initially show no metals', () => {
        render(<Metals/>);

        const container = screen.getByRole('generic', { name: /Metals display/i });
        const metals = within(container).queryAllByRole('generic', { name: /Metal/i });
        expect(metals.length).toBe(0);
    });

    it('should show one selected metal', () => {
        render(<Metals/>);

        // select a metal
        const list = screen.getByRole('list', { name: /Filtered list/i });
        const potassium = within(list).getByText(/Potassium/i);
        fireEvent.click(potassium);

        const container = screen.getByRole('generic', { name: /Metals display/i });
        const metals = within(container).queryAllByRole('generic', { name: /Metal/i });
        expect(metals.length).toBe(1);
        within(container).getByText(/Potassium/i);
    });

    it('should show multiple selected metals', () => {
        const metalsToSelect = [/Beryllium/i, /Calcium/i, /Scandium/i, /Vanadium/i];
        render(<Metals/>);

        const list = screen.getByRole('list', {name: /Filtered list/i});
        for (const metal of metalsToSelect) {
            fireEvent.click(within(list).getByText(metal));
        }

        const container = screen.getByRole('generic', { name: /Metals display/i });
        const metals = within(container).queryAllByRole('generic', { name: /Metal/i });
        expect(metals.length).toBe(metalsToSelect.length);
        for (const metal of metalsToSelect) {
            within(container).getByText(metal);
        }
    });
});
