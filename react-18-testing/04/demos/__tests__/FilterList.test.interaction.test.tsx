import { render, screen, queryAllByRole, getByText, logRoles, waitFor, fireEvent, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '@/pages/index'

describe('FilterList', () => {

  describe('interaction - user-events', () => {
    
    describe('filtering', () => {

      it('should filter by parts of words', async () => {
        const user = userEvent.setup();
        render(<Home/>);
        const filterInput = screen.getByPlaceholderText(/Filter/i);
        await user.type(filterInput, 'mi');
        expectOnlyItems([/Aluminium/i, /Chromium/i]);
      });
    });

    describe('selection', () => {

      it('should select unselected items that are clicked', async () => {
        const user = userEvent.setup();
        render(<Home/>);
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const potassium = within(list).getByText(/Potassium/i);
        await user.click(potassium);
        expect(potassium).toHaveClass('selected');
      });

      it('should unselect selected items that are clicked', async () => {
        const user = userEvent.setup();
        render(<Home/>);
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const beryllium = within(list).getByText(/Beryllium/i);
        
        // select Beryllium
        await user.click(beryllium);

        // unselect Beryllium
        await user.click(beryllium);

        expect(beryllium).not.toHaveClass('selected');
      });

    });


  });

  describe('interaction - fireEvent', () => {
    
    describe('filtering', () => {

      it('should filter by parts of words', () => {
        render(<Home/>);
        const filterInput = screen.getByPlaceholderText(/Filter/i);
        fireEvent.change(filterInput, {target: {value: 'mi'}});
        expectOnlyItems([/Aluminium/i, /Chromium/i]);
      });
    });

    describe('selection', () => {

      it('should select unselected items that are clicked', () => {
        render(<Home/>);
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const potassium = within(list).getByText(/Potassium/i);
        fireEvent.click(potassium);
        expect(potassium).toHaveClass('selected');
      });

      it('should unselect selected items that are clicked', () => {
        render(<Home/>);
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const beryllium = within(list).getByText(/Beryllium/i);
        
        // select Beryllium
        fireEvent.click(beryllium);

        // unselect Beryllium
        fireEvent.click(beryllium);

        expect(beryllium).not.toHaveClass('selected');
      });

    });

  });
});

const planets = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune']
const defaultProps = {
  filter: '',
  selectedItems: [],
  onFilterChange: ()=>{},
  onItemSelection: ()=>{},
};

function expectOnlyItems(textMatches) {
  const list = screen.getByRole('list', {name: /Filtered list/i});
  const listItems = queryAllByRole(list, 'listitem');
  expect(listItems.length).toBe(textMatches.length);
  for (const tm of textMatches) {
    getByText(list, tm);
  }
}