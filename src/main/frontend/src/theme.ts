import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  components: {
    Button: {
      baseStyle: {
        padding: "1rem"
      }
    }
  }
});

export default theme;
