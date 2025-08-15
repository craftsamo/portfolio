import { render, screen, act } from '../jest.setup';
import '@testing-library/jest-dom';
import LandingPage from '../../app/(lp)/page';

describe('LandingPage', () => {
  it('renders the LandingPage correctly', async function () {
    await act(async () => {
      render(await LandingPage());
    });
  });
});
