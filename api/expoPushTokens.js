import axios from "axios";

// Will use when deployed
import { apiConfig } from "../config/config";
import { HOST_WITH_PORT } from "../environment";

const register = (pushToken) => {
  axios.post(`${HOST_WITH_PORT}api/expo_push_token`, { token: pushToken });
};

export default {
  register,
};
