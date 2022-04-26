import axios from "axios";

const BASE_URL = "/api";

const getOnGoingGames = async (accessToken) => {
  const headerConfig = { headers: { oauth: accessToken } };

  try {
    const url = `${BASE_URL}/ongoing-games`;
    const response = await axios.get(url, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

const matchWithBot = async (accessToken, bodyParams) => {
  const headerConfig = { headers: { oauth: accessToken } };

  try {
    const url = `${BASE_URL}/play-with-bot`;
    const response = await axios.post(url, bodyParams, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

const abortGame = async (accessToken, gameId) => {
  const headerConfig = { headers: { oauth: accessToken } };

  try {
    const url = `${BASE_URL}/abort-game/${gameId}`;
    const response = await axios.post(url, {}, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

const resignGame = async (accessToken, gameId) => {
  const headerConfig = { headers: { oauth: accessToken } };

  try {
    const url = `${BASE_URL}/resign-game/${gameId}`;
    const response = await axios.post(url, {}, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

const handleDrawOffer = async (accessToken, gameId, accept) => {
  const headerConfig = { headers: { oauth: accessToken } };

  try {
    const url = `${BASE_URL}/handle-draw-offer/${gameId}/${accept}`;
    const response = await axios.post(url, {}, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

const movePiece = async (accessToken, gameId, move) => {
  const headerConfig = { headers: { oauth: accessToken } };

  try {
    const url = `${BASE_URL}/handle-draw-offer/${gameId}/${move}`;
    const response = await axios.post(url, {}, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

export {
  getOnGoingGames,
  matchWithBot,
  abortGame,
  resignGame,
  handleDrawOffer,
  movePiece
};
