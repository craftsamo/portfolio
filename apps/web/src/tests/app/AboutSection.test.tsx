import '@testing-library/jest-dom';
import { render, screen, waitFor } from '../jest.setup';
import { AboutSection } from '../../app/sections/About';

describe('AboutSection', () => {
  it('renders About heading and personal info', async () => {
    render(<AboutSection />);
    await waitFor(() => {
      const headings = Array.from(document.querySelectorAll('.text-6xl.font-bold'));
      const aboutHeading = headings.find((h) => h.textContent?.toLowerCase().includes('about'));
      expect(aboutHeading).toBeTruthy();
      expect(aboutHeading?.textContent?.toLowerCase()).toContain('about');
      expect(screen.getByText(/Rui Ito/i)).toBeInTheDocument();
      expect(screen.getByText(/fullstack developer/i)).toBeInTheDocument();
      const profileImage = screen.getByAltText('Rui Ito Avatar');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage.getAttribute('src')).toContain('avatars.githubusercontent.com');
      expect(profileImage).toHaveAttribute('loading', 'lazy');
    });
  });
});
