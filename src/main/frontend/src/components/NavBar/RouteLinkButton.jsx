import React from "react";

import Link from "@mui/material/Link";
import { Link as RouterLink } from "react-router-dom";

import NavBarButton from "./NavBarButton";

function RouteLinkButton({ to, text, onClick }) {
  return (
    <Link component={RouterLink} to={to}>
      <NavBarButton text={text} onClick={onClick} />
    </Link>
  );
}

export default RouteLinkButton;
