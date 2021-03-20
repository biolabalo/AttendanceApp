module.exports = {
  purge: [
    './src/views/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/Layout/**/*.{js,ts,jsx,tsx}',
    './src/subViews/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xl: { max: '1280px' },
        // => @media (max-width: 1280px) { ... }

        lg: { max: '1024px' },
        // => @media (max-width: 1024px) { ... }

        md: { max: '768px' },
        // => @media (max-width: 768px) { ... }

        sm: { max: '640px' },
        // => @media (max-width: 640px) { ... }
      },
      padding: {
        '8/25': '32%',
        '49/100': '49%',
        full: '100%',
      },
      width: { '8/25': '32%', '49/100': '49%' },
      colors: {
        transparent: 'transparent',
        current: 'currentColor',
        primary: '#26A595',
        tomato: '#D12100',
        lateComer: 'rgb(255,144,133)',
        navBar: 'rgba(250, 250, 250, 1)',
        txt: '#606060',
        'txt-lit': '#8c8c8c',
        secondary: '#E89828',
        'primary-light': '#1BD5BD',
        'primary-medium': '#15C1AC',
        'secondary-medium': '#FF5A73',
        'secondary-ight': '#FE96A6',
        'nav-background': '#FAFAFA',
        'primary-fade': '#d7eeeb',
        fade: '#F9F9F9',
        tertiary: '#FF9085',
      },
      boxShadow: {
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        'inner-extra': 'inset 0 0 8px 0 rgba(0, 0, 0, 0.09)',
        green: '0px 0px 8px rgba(28, 72, 67, 0.08)',
        none: 'none',
      },
      animation: {
        'spin-fast': 'spin 0.5s linear infinite',
      },
      maxWidth: {
        '1/4': '25%',
        '1/2': '50%',
        '5/8': '62.5%',
        '3/4': '75%',
        'v-s': '12.5rem',
        vs: '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        unset: 'unset',
      },
      maxHeight: {
        '1/4': '25%',
        '5/8': '62.5%',
        '1/2': '50%',
        '3/4': '75%',
      },
      minWidth: {
        'v-s': '12.5rem',
        vs: '16rem',
        xs: '20rem',
        sm: '24rem',
        md: '28rem',
        lg: '32rem',
        xl: '36rem',
        '2xl': '42rem',
        '3xl': '48rem',
        '4xl': '56rem',
        '5xl': '64rem',
        '6xl': '72rem',
        '7xl': '80rem',
        'screen-sm': '640px',
        'screen-md': '768px',
        'screen-lg': '1024px',
        'screen-xl': '1280px',
        unset: 'unset',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
