import { createTheme } from "@mui/material/styles";

const typography = { fontFamily: "Poppins" };
const MuiCard = {
  defaultProps: {
    elevation: 4,
    style: { borderRadius: "0.5rem" }
  }
};

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#2e3f5a",
      light: "#3d5270"
    },
    secondary: { main: "#5b7398" },
    neutral: {
      light: "#212121",
      main: "#333333",
      darker: "#515151",
      darkest: "#646464"
    },
    neutralButton: {
      main: "#646464"
    }
  },
  typography,
  components: { MuiCard }
});

const lightTheme = createTheme({
  palette: {
    primary: {
      main: "#1B2B42",
      light: "#899cbd"
    },
    secondary: { main: "#1B2B42" },
    neutral: {
      light: "#FAFAFA",
      main: "#F5F5F5",
      darker: "#E0E0E0",
      darkest: "#BDBDBD"
    },
    neutralButton: {
      main: "#BDBDBD"
    }
  },
  typography,
  components: { MuiCard }
});

export { lightTheme, darkTheme };
