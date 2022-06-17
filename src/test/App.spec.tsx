import React from 'react';
import {
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';

test('should render app without crashing', async () => {
  // eslint-disable-next-line testing-library/no-unnecessary-act
  await act(async () => {
    render(<App />);
  });

  await waitFor(async () => {
    expect(
      screen.getByText('News App')
    ).toBeInTheDocument();
  });
});
