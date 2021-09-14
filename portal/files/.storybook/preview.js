import {themes} from '@storybook/theming';

const customViewports = {
  xs: {
    name: 'xs',
    styles: {
      width: '320px',
      height: '480px',
    },
  },
  sm: {
    name: 'sm',
    styles: {
      width: '640px',
      height: '960px',
    },
  },
  md: {
    name: 'md',
    styles: {
      width: '768px',
      height: '1152px',
    },
  },
  lg: {
    name: 'lg',
    styles: {
      width: '1024px',
      height: '680px',
    },
  },

  xl: {
    name: 'xl',
    styles: {
      width: '1280px',
      height: '720px',
    },
  },
  '2xl': {
    name: '2xl',
    styles: {
      width: '1536px',
      height: '864px',
    },
  },
  full: {
    name: 'full',
    styles: {
      width: '100%',
      height: '100%',
    },
  },
};

export const parameters = {
  docs: {
    // theme: themes.dark,
  },
  actions: {argTypesRegex: '^on[A-Z].*'},
  controls: {
    expanded: true,
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  layout: 'fullscreen',
  viewport: {
    viewports: customViewports, // newViewports would be an ViewportMap. (see below for examples)
    // defaultViewport: 'responsive',
  },
  darkMode: {
    darkClass: 'dark',
    lightClass: 'light',
    stylePreview: true,

    // Override the default dark theme
    dark: {...themes.dark, appContentBg: '#031717'},
    // Override the default light theme
    light: {...themes.light, appContentBg: '#EEF8F8'},
  },
  backgrounds: {
    default: 'transparent',
    values: [
      {
        name: 'transparent',
        value: 'transparent',
      },
      {
        name: 'light',
        value: '#EEF8F8',
      },
      {
        name: 'dark',
        value: '#102424',
      },
      {
        name: 'white',
        value: '#FFF',
      },
      {
        name: 'black',
        value: '#000',
      },
    ],
    grid: {
      cellSize: 16,
      opacity: 0.2,
      cellAmount: 5,
      offsetX: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
      offsetY: 16, // default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
    },
  },
};
