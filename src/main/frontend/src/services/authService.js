import axios from "axios";

const openUrl = (url) => {
  window.open(url, "_self");
};

const signInToLichess = async () => {
  try {
    const url = "/api/login-the-chess";
    const response = await axios.get(url);

    if (response.status === 200) openUrl(response.data);

    return { status: response.status };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

export default signInToLichess;
