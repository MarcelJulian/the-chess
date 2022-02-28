import axios from "axios";

const openInNewTab = (url) => {
  const newWindow = window.open(url, "_blank", "noopener,noreferrer");
  if (newWindow) newWindow.opener = null;
};

const signIn = async () => {
  try {
    // let url = "/api/apps";
    const url = "/login-the-chess";
    // harusnya post ???
    const response = await axios.get(url);

    console.log(
      "🚀 ~ file: authService.js ~ line 9 ~ signIn ~ response",
      response
    );

    openInNewTab(response.data);

    return { status: response.Status };
  } catch (err) {
    return { status: err.response.OutputSchema.Status };
  }
};

export default signIn;
