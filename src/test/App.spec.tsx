import React from 'react';
import {
  render,
  screen,
} from '@testing-library/react';
import App from '../App';
import { act } from 'react-dom/test-utils';

it('renders without crashing', async () => {
  await act(async () => {
    render(<App />);
  });
});
