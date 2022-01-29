import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        p: "0.5rem",
        py: "0.5rem",
        m: "0.5rem"
      }
    }
  }
});

export default theme;
