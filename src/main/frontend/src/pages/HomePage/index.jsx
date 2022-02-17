import React, { useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import { grey } from "@mui/material/colors";
import Container from "@mui/material/Container";
import { useSelector } from "react-redux";

import BotCardContent from "./BotCardContent";
import CardTitle from "./CardTitle";
import HumanCardContent from "./HumanCardContent";

function HomePage() {
  // replace with store
  const [isLogin, setIsLogin] = useState(false);
  const { botTimeControlMinute, botTimeControlIncrement } = useSelector(
    (state) => state.botForm
  );

  return (
    <Box sx={{ marginTop: "1rem" }}>
      <Container>
        <Box display="flex" justifyContent="space-between">
          <Card
            sx={{
              marginBottom: "1rem",
              borderRadius: "16px",
              width: "48%",
              paddingTop: "1rem",
              backgroundColor: grey[100]
            }}
          >
            <CardTitle label="Play with Bot" />
            <BotCardContent />
            <Box display="flex">
              <Button
                variant="contained"
                fullWidth
                disabled={
                  botTimeControlMinute === 0 && botTimeControlIncrement === 0
                }
              >
                Start
              </Button>
            </Box>
          </Card>
          <Card
            sx={{
              marginBottom: "1rem",
              borderRadius: "16px",
              width: "48%",
              backgroundColor: grey[100]
            }}
          >
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              sx={{ height: "100%", paddingTop: "1rem" }}
            >
              <CardTitle label="Play with Human" />
              <Box display="flex" alignItems="center" sx={{ height: "100%" }}>
                <HumanCardContent />
              </Box>
            </Box>
          </Card>
        </Box>
      </Container>
    </Box>
  );
}

export default HomePage;
