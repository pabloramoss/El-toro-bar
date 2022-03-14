import {extendTheme} from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: "#32a850",
  },
  styles: {
    global: {
      body: {
        backgroundColor: "primary.50"
      }
    }
  },
});