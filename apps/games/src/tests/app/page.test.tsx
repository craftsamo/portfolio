import { render, screen, act } from '../jest.setup';
import '@testing-library/jest-dom';
import Games from '../../app/page';

describe('Games', () => {
  it('renders the games correctly', async function () {
    await act(async () => {
      render(await Games());
    });
  });
});
