import { render, screen, getByRole, within } from '@testing-library/react'
import Home from '@/pages/index'

test('Home renders a heading', () => {
  render(<Home />)

  screen.getByRole('heading', {
    name: "Filter List",
  })
});

test('Home renders a heading nested',() => {
  render(<Home/>);
  
  const main = screen.getByRole('main');
  
  getByRole(main, 'heading', {
    name: "Filter List"
  });

  // or

  within(main).getByRole('heading', {
    name: "Filter List"
  });

});
