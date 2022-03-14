/* eslint-disable import/no-unresolved */
import * as React from "react";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";

import { setBoardSet, setPieceSet } from "store/reducers/boardSlice";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      borderRadius="1rem"
      boxShadow="3"
      sx={{
        fontSize: "1rem",
        fontWeight: "1rem",
        ...sx
      }}
      {...other}
    />
  );
}

function SettingsPageDialog() {
  const [value, setValue] = React.useState(30);
  const pieceSet = useSelector((state) => state.board.pieceSet);
  const boardSet = useSelector((state) => state.board.boardSet);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [chooseTile, setTile] = React.useState("");

  const handleChangeTile = (event) => {
    setTile(event.target.value);
  };
  const [expanded, setExpanded] = React.useState(false);
  const dispatch = useDispatch();
  const handleChangeAcor = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handlePieceSetChange = (_, variable) => dispatch(setPieceSet(variable));
  const handleBoardSetChange = (_, boardVar) => dispatch(setBoardSet(boardVar));
  return (
    <Container>
      <Box
        marginBottom="5%"
        justifyContent="center"
        sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)" }}
      >
        <Item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography fontSize="1000">Board Theme</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {/* 1 */}
              <ToggleButtonGroup
                value={boardSet}
                exclusive
                onChange={handleBoardSetChange}
                sx={{ border: 0 }}
              >
                <ToggleButton
                  value="tile1"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /chooseTile/tile1.jpg)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 2 */}
                <ToggleButton
                  value="tile2"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /chooseTile/tile2.jpg)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 3 */}
                <ToggleButton
                  value="tile3"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /chooseTile/tile3.jpg)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 4 */}
                <ToggleButton
                  value="tile4"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /chooseTile/tile4.jpg)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 5 */}
                <ToggleButton
                  value="tile5"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundRepeat: "no-repeat",
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /chooseTile/tile5.jpg)`,
                    backgroundSize: "100%"
                  }}
                />
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>
        </Item>
        <Item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Piece Set</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ToggleButtonGroup
                value={pieceSet}
                exclusive
                onChange={handlePieceSetChange}
                sx={{ border: 0 }}
              >
                {/* 1 */}
                <ToggleButton
                  value="ver1"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /ver1/bn.png)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 2 */}
                <ToggleButton
                  value="ver2"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /ver2/bn.png)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 3 */}
                <ToggleButton
                  value="ver3"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /ver3/bn.png)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 4 */}
                <ToggleButton
                  value="ver4"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /ver4/bn.png)`,
                    backgroundSize: "100%"
                  }}
                />
                {/* 5 */}
                <ToggleButton
                  value="ver5"
                  disableFocusRipple
                  disableRipple
                  sx={{
                    height: "4.5rem",
                    width: "4.5rem",
                    border: 1,
                    backgroundImage: `url(${process.env.PUBLIC_URL}
                  /ver5/bn.png)`,
                    backgroundSize: "100%"
                  }}
                />
              </ToggleButtonGroup>
            </AccordionDetails>
          </Accordion>
        </Item>
        <Item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sound</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack
                //   spacing={0}
                direction="row"
                //   sx={{ mb: 5 }}
                alignItems="center"
              >
                <VolumeDown />
                <Slider
                  aria-label="Volume"
                  value={value}
                  onChange={handleChange}
                />
                <VolumeUp />
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Item>
        <Item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Voice Control</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                elevation={10}
                border="1px solid"
                borderRadius="1rem"
                boxShadow="3"
                marginLeft="30%"
                marginRight="30%"
                justifyContent="center"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)"
                }}
              >
                <Button sx={{ width: "100%", height: "100%" }}>On</Button>
                <Button sx={{ width: "100%", height: "100%" }}>Off</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Item>
        <Item>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Blind Control</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box
                elevation={10}
                border="1px solid"
                borderRadius="1rem"
                boxShadow="3"
                marginLeft="30%"
                marginRight="30%"
                justifyContent="center"
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)"
                }}
              >
                <Button sx={{ width: "100%", height: "100%" }}>On</Button>
                <Button sx={{ width: "100%", height: "100%" }}>Off</Button>
              </Box>
            </AccordionDetails>
          </Accordion>
        </Item>
        {/* <Slider disabled defaultValue={30} aria-label="Disabled slider" /> */}
      </Box>
    </Container>
  );
}

export default SettingsPageDialog;
