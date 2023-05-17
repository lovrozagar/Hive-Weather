// color design tokens export
export const colorTokens = {
  primary: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    350: '#70acf5d2',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
    1000: '#172554',
  },
  tone: {
    0: '#FFFFFF',
    10: '#F6F6F6',
    50: '#F0F0F0',
    100: '#E0E0E0',
    200: '#C2C2C2',
    250: '#BBBBBB',
    300: '#A3A3A3',
    400: '#858585',
    500: '#666666',
    600: '#5D5D5D',
    700: '#333333',
    750: '#2F2F2F',
    800: '#1A1A1A',
    900: '#0A0A0A',
    1000: '#000000',
  },
}

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === 'dark'
        ? {
            // palette values for dark mode
            primary: {
              dark: colorTokens.primary[200],
              transparent: colorTokens.primary[350],
              main: colorTokens.primary[400],
              medium: colorTokens.primary[500],
              light: colorTokens.primary[800],
            },
            tone: {
              main: colorTokens.tone[50],
              light: colorTokens.tone[50],
              lightLow: colorTokens.tone[100],
              lightNormal: colorTokens.tone[250],
              lightMedium: colorTokens.tone[300],
              middle: colorTokens.tone[500],
              dark: colorTokens.tone[900],
              darkMedium: colorTokens.tone[800],
              darkNormal: colorTokens.tone[750],
              darkLow: colorTokens.tone[700],
            },
            background: {
              default: colorTokens.tone[900],
              alt: colorTokens.tone[800],
            },
            navbar: {
              dark: colorTokens.tone[50],
              main: colorTokens.tone[900],
              light: colorTokens.tone[900],
            },
            lightPreserved: {
              main: colorTokens.tone[0],
              lightGray: colorTokens.tone[50],
              mediumGray: colorTokens.tone[100],
            },
            red: {
              main: '#dc2626',
            },
            orange: {
              main: '#f59e0b',
            },
          }
        : {
            // palette values for light mode
            primary: {
              dark: colorTokens.primary[700],
              main: colorTokens.primary[600],
              light: colorTokens.primary[50],
            },
            tone: {
              main: colorTokens.tone[900],
              light: colorTokens.tone[900],
              lightLow: colorTokens.tone[500],
              lightMedium: colorTokens.tone[300],
              middle: colorTokens.tone[500],
              dark: colorTokens.tone[50],
              darkMedium: colorTokens.tone[50],
              darkNormal: colorTokens.tone[50],
              darkLow: colorTokens.tone[100],
            },
            background: {
              default: colorTokens.tone[10],
              alt: colorTokens.tone[0],
            },
            navbar: {
              dark: colorTokens.tone[900],
              main: colorTokens.tone[50],
              light: colorTokens.tone[50],
            },
            constant: {
              white: colorTokens.tone[0],
              lightGray: colorTokens.tone[50],
              mediumGray: colorTokens.tone[200],
            },
            lightPreserved: {
              main: colorTokens.tone[0],
              lightGray: colorTokens.tone[50],
              mediumGray: colorTokens.tone[100],
            },
            red: {
              main: '#dc2626',
            },
            orange: {
              main: '#f59e0b',
            },
          }),
    },
    typography: {
      fontFamily: ['Poppins', 'sans-serif'].join(','),
      fontSize: 12,
      h1: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 40,
      },
      h2: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 32,
      },
      h3: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 24,
      },
      h4: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 20,
      },
      h5: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 16,
      },
      h6: {
        fontFamily: ['Poppins', 'sans-serif'].join(','),
        fontSize: 14,
      },
    },
  }
}
