import axios from "axios";

const BASE_URL = "/api";

export const ResponseType = {
  MOVE: "move",
  COMMAND: "command",
  ERROR: "error",
  CONFIRM: "confirm"
};

const transcribeAudio = async (byteArray) => {
  try {
    const url = `${BASE_URL}/speech-to-text`;
    const response = await axios.post(url, { data: byteArray });

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

export default transcribeAudio;
