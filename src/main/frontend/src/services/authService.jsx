import axios from "axios";

const signIn = async () => {
  try {
    // let url = "/api/apps";
    const url = "/login-the-chess";
    const response = await axios.post(url);

    return { status: response.OutputSchema.Status };
  } catch (err) {
    return { status: err.response.OutputSchema.Status };
  }
};

export default signIn;
