import { render, screen, queryAllByRole, getByText } from '@testing-library/react'
import {FilterListPure} from '@/components/FilterList'
import {planets} from '../api'  

describe('FilterList', () => {
  describe('rendering', () => {

    it('should render a filter input', () => {
      renderPlanets();

      screen.getByPlaceholderText(/Filter/i);
    });

    it('should render planets', () => {
      renderPlanets();

      for (let planet of planets) {
        screen.getByText(planet);
      }
      expect(screen.queryByText('Pluto')).toBeNull();
    });

    describe('filtered', () => {

      it("should render no items when filter is `xqz`", () => {
        const props = {
          ...defaultProps,
          items: planets,
          filter: 'xqz',
        }
        render(<FilterListPure { ...props } />)

        const list = screen.getByRole('list', {name: /Filtered list/i});
        const listItems = queryAllByRole(list, 'listitem');
        expect(listItems).toHaveLength(0);;
      });

      it("should render 'Earth' and 'Mars' when filtered with 'ar'", () => {
        const props = {
          ...defaultProps,
          items: planets,
          filter: 'ar',
        }
        render(<FilterListPure {...props} />)
  
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const listItems = queryAllByRole(list, 'listitem');
        expect(listItems).toHaveLength(2);
        expect(getByText(list, /earth/i));
        expect(getByText(list, /mars/i));
      });
    })

    describe('selection', () => {

      it("should render list items without the 'selected' class", () => {
        renderPlanets();
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const listItems = queryAllByRole(list, 'listitem');
        for (let listitem of listItems) {
          expect(listitem.className).not.toMatch(/selected/);
        }
      })

      it("should render 'Earth' with 'selected' class when 'Earth' is selected", () => {
        const props = {
          ...defaultProps,
          items: planets,
          selectedItems: ['Earth']
        };
        render(<FilterListPure {...props} />)
        
        const list = screen.getByRole('list', {name: /Filtered list/i});
        const listItems = queryAllByRole(list, 'listitem');
        for (let listitem of listItems) {
          if (/earth/i.test(listitem.textContent || '')) {
            expect(listitem).toHaveClass('selected');
          } else {
            expect(listitem).not.toHaveClass('selected');
          }
        }
      })

    })

  });
});

export const defaultProps = {
  filter: '',
  selectedItems: [],
  onFilterChange: ()=>{},
  onItemSelection: ()=>{},
};

export function renderPlanets() {  
    render(<FilterListPure items={planets} {...defaultProps} />);
}
