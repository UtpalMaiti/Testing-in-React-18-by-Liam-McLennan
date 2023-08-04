import { render, screen, queryAllByRole, getByText, fireEvent, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import FilterList from '@/components/FilterList';
import * as api from '../api';

const listOfExoplanets = ['Kepler-22b', 'Kepler-452b', 'TrES-2b', 'Gliese 504 b'];

jest.mock('../api');
api.getPlanets.mockResolvedValue(listOfExoplanets);

describe('FilterList', () => {

  describe('interaction - user-events', () => {
    
    describe('filtering', () => {

      it('should filter by parts of words', async () => {
        const user = userEvent.setup();
        render(<FilterList onChange={ ()=>{} }/>);

        const filterInput = screen.getByPlaceholderText(/Filter/i);
        await user.type(filterInput, '5');
        expectOnlyItems([/Kepler-452b/i, /Gliese 504 b/i]);
      });
    });

    describe('selection', () => {

      it('should select unselected items that are clicked', async () => {
        const user = userEvent.setup();
        render(<FilterList onChange={ ()=>{} }/>);

        const list = screen.getByRole('list', {name: /Filtered list/i});
        const tres = await within(list).findByText(/TrES/i); 
        await user.click(tres);
        expect(tres).toHaveClass('selected');
      });

      it('should unselect selected items that are clicked', async () => {
        const user = userEvent.setup();
        render(<FilterList onChange={ ()=>{} }/>);

        const list = screen.getByRole('list', {name: /Filtered list/i});
        const tres = await within(list).findByText(/TrES/i);
        
        // select TrES-2b
        await user.click(tres);

        // unselect TrES-2b
        await user.click(tres);

        expect(tres).not.toHaveClass('selected');
      });

    });


  });

  describe('interaction - fireEvent', () => {
    
    describe('filtering', () => {

      it('should filter by parts of words', async () => {
        render(<FilterList onChange={ ()=>{} }/>);
        const list = screen.getByRole('list', {name: /Filtered list/i});
        await within(list).findAllByRole('listitem');
        
        const filterInput = screen.getByPlaceholderText(/Filter/i);
        fireEvent.change(filterInput, {target: {value: '5'}});
        
        expectOnlyItems([/Kepler-452b/i, /Gliese 504 b/i]);
      });
    });

    describe('selection', () => {

      it('should select unselected items that are clicked', async () => {
        render(<FilterList onChange={ ()=>{} }/>);

        const list = screen.getByRole('list', {name: /Filtered list/i});
        const tres = await within(list).findByText(/TrES/i);
        fireEvent.click(tres);
        expect(tres).toHaveClass('selected');
      });

      it('should unselect selected items that are clicked', async () => {
        render(<FilterList onChange={ ()=>{} }/>);

        const list = screen.getByRole('list', {name: /Filtered list/i});
        const tres = await within(list).findByText(/TrES/i);
        
        // select TrES-2b
        fireEvent.click(tres);

        // unselect TrES-2b
        fireEvent.click(tres);

        expect(tres).not.toHaveClass('selected');
      });
    });

  });
});

function expectOnlyItems(textMatches) {
  const list = screen.getByRole('list', {name: /Filtered list/i});
  const listItems = queryAllByRole(list, 'listitem');
  expect(listItems.length).toBe(textMatches.length);
  for (const tm of textMatches) {
    getByText(list, tm);
  }
}