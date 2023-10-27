/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/js/*.js',
    './config/*.json',
    './layout/*.liquid',
    './assets/*.liquid',
    './sections/*.liquid',
    './snippets/*.liquid',
    './templates/*.liquid',
    './templates/*.json',
    './templates/customers/*.liquid'
  ],
  theme: {

    fontFamily: {
      sans: ['Tomato Grotesk', 'sans-serif'],
      sec: ['Hatton', 'serif']
    },

    extend: {
      colors: {
        'white': 'white',
        'black': 'black',
        'blue-1': '#2C3B96',
        'grey-1': '#F3F3F0',
        'grey-2': '#FBFBFA',
        'orange-1': '#FBB116'
      },

      boxShadow: {
        'drawer': '0px 4px 16px rgba(180, 180, 180, 0.25)',
        'megamenu': '0px 8px 32px rgba(94, 94, 94, 0.25)'
      },

      keyframes: {
        fadein: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },

        fadeinup: {
          '0%': { opacity: '0', transform: 'translateY(25%)' },
          '100%': { opacity: '1', transform: 'translateY(0%)' }
        },
        fadeupoffset: {
          '0%': { opacity: '0', transform: 'translateY(0%)' },
          '100%': { opacity: '1', transform: 'translateY(-100%)' }
        },
        upoffset: {
          '0%': { opacity: '0', transform: 'translateY(0%)' },
          '100%': { opacity: '1', transform: 'translateY(-100%)' }
        },
        fadedownoffset: {
          '0%': { opacity: '1', transform: 'translateY(-100%)' },
          '100%': { opacity: '0', transform: 'translateY(0%)' }
        },
        scalein: {
          '0%': { transform: 'scale(0)' },
          '50%': { transform: 'scale(1.25)' },
          '100%': { transform: 'scale(1)' }
        },

        shimmer: {
          '0%': { opacity: 0, transform: 'translateX(-75%)' },
          '50%': { opacity: 1, transform: 'translateX(0%)' },
          '100%': { opacity: 0, transform: 'translateX(75%)' },
        },


      },
      animation: {
        fadein: 'fadein 0.6s ease-in-out 1 both',
        fadeinup: 'fadeinup 0.6s ease-in-out 1 both',
        fadeupoffset: 'fadeupoffset 0.6s ease-in-out 1 both',
        upoffset: 'upoffset 0.6s ease-in-out 1 both',
        fadedownoffset: 'fadedownoffset 0.6s ease-in-out 1 both',
        scalein: 'scalein 0.6s ease-in-out 1 both',
      }
    },

    screens: {
      'mob': '380px',

      'sm': '640px',

      'md': '768px',

      'lg': '1024px',

      'xl': '1280px',

      '2xl': '1440px',

      'fullhd': '1920px',
    },

    container: {
      padding: {
        DEFAULT: '40px',
        md: '48px'
      },
      center: true
    }
  },
  plugins: [],
}

