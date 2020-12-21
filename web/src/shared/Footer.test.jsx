import React from 'react';
import { render } from '@testing-library/react';
import Footer from './Footer';

it('renders footer', () => {
  render(<Footer />);
  const elem = document.getElementsByTagName('footer')
  expect(elem.length).toBe(1)
  expect(elem[0].textContent).toContain('Project Explorer')
});
