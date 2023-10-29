import React from "react";

import Button from "@mui/material/Button";

function NavBarButton({ text, onClick }) {
  return (
    <Button
      variant="link"
      p="0.5rem"
      m="0.5rem"
      onClick={onClick}
      sx={{ display: "block", color: "white" }}
    >
      {text}
    </Button>
  );
}

export default NavBarButton;
