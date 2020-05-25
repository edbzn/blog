import Typography from 'typography';
import wordpress2016 from 'typography-theme-wordpress-2016';

wordpress2016.overrideThemeStyles = () => {
  return {
    a: {
      boxShadow: 'none',
    },
    'a:hover': {
      boxShadow: 'none',
      textDecoration: 'underline',
    },
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    blockquote: {
      fontWeight: 100,
      color: `black`,
      fontSize: 16,
    },
  };
};

delete wordpress2016.googleFonts;

const typography = new Typography({
  ...wordpress2016,
  baseLineHeight: 1.666,
  boldWeight: 900,
});

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles();
}

export default typography;
export const rhythm = typography.rhythm;
export const scale = typography.scale;
