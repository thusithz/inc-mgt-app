/* eslint-disable import/no-extraneous-dependencies */
import '@testing-library/jest-dom';

const eventsOn = jest.fn();
const eventsOff = jest.fn();

// Default mock router
jest.mock('next/router', () => ({
  Router: {
    events: {
      on: eventsOn,
      off: eventsOff,
    },
  },
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: jest.fn(),
      events: {
        on: eventsOn,
        off: eventsOff,
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
      replace: jest.fn(),
    };
  },
}));

// https://github.com/mui/material-ui-pickers/issues/2073
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string): MediaQueryList => ({
    media: query,
    // this is the media query that @material-ui/pickers uses to determine if a device is a desktop device
    matches: query === '(pointer: fine)',
    onchange: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    addListener: () => {},
    removeListener: () => {},
    dispatchEvent: () => false,
  }),
});
