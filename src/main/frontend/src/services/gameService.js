import axios from "axios";
import { useSelector } from "react-redux";

const getOnGoingGames = async () => {
  const accessToken = useSelector((state) => state.session.accessToken);
  const headerConfig = {
    headers: {
      oauth: accessToken
    }
  };

  try {
    const url = "/api/ongoing-games";
    const response = await axios.get(url, headerConfig);

    return { status: response.status, data: response.data };
  } catch (err) {
    return { status: err.response.status, statusText: err.response.statusText };
  }
};

export default getOnGoingGames;
