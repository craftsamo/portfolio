import { render, screen, act } from '../jest.setup';
import '@testing-library/jest-dom';
import Portfolio from '../../app/page';

describe('Portfolio Page', () => {
  it('renders the PortfolioPage correctly', async function () {
    await act(async () => {
      render(await Portfolio());
    });
  });
});
