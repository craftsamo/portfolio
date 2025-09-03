import '@testing-library/jest-dom';
import { render, screen, waitFor } from '../jest.setup';
import { AboutSection } from '../../app/sections/About';

describe('AboutSection', () => {
  it('renders About heading and personal info', async () => {
    render(<AboutSection />);
    await waitFor(() => {
      const aboutHeading = screen.getByText(/about/i);
      expect(aboutHeading).toBeInTheDocument();
      expect(aboutHeading.textContent?.toLowerCase()).toContain('about');
      expect(screen.getByText(/Rui Ito/i)).toBeInTheDocument();
      expect(screen.getByText(/fullstack developer/i)).toBeInTheDocument();
      const profileImage = screen.getByAltText('Rui Ito Avatar');
      expect(profileImage).toBeInTheDocument();
      expect(profileImage.getAttribute('src')).toContain('avatars.githubusercontent.com');
      expect(profileImage).toHaveAttribute('loading', 'lazy');
    });
  });
});
