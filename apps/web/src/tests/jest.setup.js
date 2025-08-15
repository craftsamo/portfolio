/* eslint-disable no-undef */

import React from 'react';
import 'whatwg-fetch';
import '@testing-library/jest-dom';
import { render, act } from '@testing-library/react';
import { ThemeProvider, ReduxToolProvider } from '../components/Providers';

// Setup for React 18's concurrent features
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
global.React = React;

// Setup for matchMedia
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
      addEventListener: function () {},
      removeEventListener: function () {},
      dispatchEvent: function () {
        return true;
      },
    };
  };

// Mock ResizeObserver for recharts/ResponsiveContainer
if (typeof window.ResizeObserver === 'undefined') {
  class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  window.ResizeObserver = ResizeObserver;
  global.ResizeObserver = ResizeObserver;
}

// Mock getBoundingClientRect to return non-zero size for recharts ResponsiveContainer
if (!Element.prototype.getBoundingClientRect.__isMocked) {
  const originalGetBoundingClientRect = Element.prototype.getBoundingClientRect;
  Element.prototype.getBoundingClientRect = function () {
    return {
      width: 400,
      height: 400,
      top: 0,
      left: 0,
      bottom: 400,
      right: 400,
      x: 0,
      y: 0,
      toJSON: () => {},
    };
  };
  Element.prototype.getBoundingClientRect.__isMocked = true;
  Element.prototype._originalGetBoundingClientRect = originalGetBoundingClientRect;
}

/**
 * Custom render function with providers
 * @param {import('react').ReactElement} ui - The React component to render
 * @param {import('@testing-library/react').RenderOptions} [options={}] - Additional render options
 * @returns {import('@testing-library/react').RenderResult} The rendered component and helper methods
 */
const customRender = (ui, options = {}) => {
  const Wrapper = ({ children }) => (
    <ReduxToolProvider>
      <ThemeProvider defaultTheme='light' enableSystem={false}>
        {children}
      </ThemeProvider>
    </ReduxToolProvider>
  );

  return {
    ...render(ui, {
      wrapper: Wrapper,
      ...options,
    }),
  };
};

// Setup cleanup after each test
afterEach(() => {
  // Clean up any mounted components
  act(() => {
    // Cleanup any pending effects
  });
});

// Re-export everything
export * from '@testing-library/react';
export * from '@testing-library/user-event';

// Override render method
export { customRender as render };
