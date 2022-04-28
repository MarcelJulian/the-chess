/* eslint-disable no-await-in-loop */
import axios from "axios";
import ndjsonStream from "can-ndjson-stream";

const BASE_URL = "https://lichess.org/api";
const API_ACCESS_TOKEN = "lip_89LObPpHHeUz7PW2cBWK";

const createASeek = async (accessToken, bodyParams) => {
  const { time, increment } = bodyParams;

  // using string for this body
  // application/x-www-form-urlencoded
  const requestBody = `time=${time}&increment=${increment}&variant=standard`;

  const headerConfig = {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/x-www-form-urlencoded"
    }
  };

  try {
    const url = `${BASE_URL}/board/seek`;
    const response = await axios.post(url, requestBody, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

const streamIncomingEvents = async (accessToken, bodyParams) => {
  const headerConfig = { headers: { Authorization: `Bearer ${accessToken}` } };

  const url = `${BASE_URL}/stream/event`;
  const response = await fetch(url, headerConfig);

  const exampleReader = ndjsonStream(response.body).getReader();

  const seekResponse = await createASeek(accessToken, bodyParams);

  if (seekResponse.status === 200) {
    let result;
    while (!result || !result.done) {
      result = await exampleReader.read();
      if (result.value.type === "gameStart") break;
    }
    return { status: response.status, data: result.value.gameId };
  }
  return seekResponse;
};

const findMatchHandler = async (accessToken, bodyParams) => {
  const token = accessToken ?? API_ACCESS_TOKEN;

  try {
    const streamResponse = await streamIncomingEvents(token, bodyParams);

    return { status: streamResponse.status, data: streamResponse.data };
  } catch (err) {
    return err;
  }
};

const streamBoardGameState = async (
  accessToken,
  gameId,
  initializeGameHandler,
  setGameStateHandler
) => {
  const token = accessToken ?? API_ACCESS_TOKEN;
  const headerConfig = { headers: { Authorization: `Bearer ${token}` } };

  const url = `${BASE_URL}/board/game/stream/${gameId}`;
  const response = await fetch(url, headerConfig);

  const exampleReader = ndjsonStream(response.body).getReader();

  let result;
  while (!result || !result.done) {
    result = await exampleReader.read();
    console.log(
      "🚀 ~ file: gameStreamService.js ~ line 82 ~ result",
      result.value
    );

    if (result.value !== undefined)
      if (result.value.type === "gameFull") initializeGameHandler(result.value);
      else if (result.value.type === "gameState")
        setGameStateHandler(result.value);
  }
  return { status: response.status, data: result.value };
};

export { streamBoardGameState, findMatchHandler };
