import { render, screen, getByRole, within } from '@testing-library/react'
import Home from '@/pages/index'
import { act } from 'react-dom/test-utils';

test('Home renders a heading', async () => {
  await act(async ()=>{
    render(<Home />)
  });

  screen.getByRole('heading', {
    name: "Filter List",
  })
});

test('Home renders a heading nested', async () => {
  await act(async ()=>{
    render(<Home />)
  });
  const main = screen.getByRole('main');
  
  getByRole(main, 'heading', {
    name: "Filter List"
  });

  // or

  within(main).getByRole('heading', {
    name: "Filter List"
  });

});
