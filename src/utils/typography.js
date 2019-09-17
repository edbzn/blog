import Typography from "typography"

const typography = new Typography({
  baseFontSize: "18px",
  headerFontFamily: [
    "IBM Plex Sans",
    "sans-serif",
  ],
  bodyFontFamily: ["IBM Plex Serif", "serif"],
  bodyColor: '#222',
  headerColor: '#222',
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
