import { render, screen, act } from '../jest.setup';
import '@testing-library/jest-dom';
import Dashboard from '../../app/page';

describe('Dashboard', () => {
  it('renders the Dashboard correctly', async function () {
    await act(async () => {
      render(await Dashboard());
    });
  });
});
