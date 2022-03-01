import axios from "axios";

const openUrl = (url) => {
  window.open(url, "_self");
};

const signIn = async () => {
  try {
    // let url = "/api/apps";
    const url = "/login-the-chess";
    // harusnya post ???
    const response = await axios.get(url);

    if (response.status === 200) openUrl(response.data);

    return { status: response.status };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

export default signIn;
