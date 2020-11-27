import axios from "axios";

// Will use when deployed
import { apiConfig } from "../config/config";
import { HOST_WITH_PORT } from "../environment";

const register = async (pushToken, userId) => {
  axios.patch(
    `${HOST_WITH_PORT}users/${userId}/`,
    { notification_token: pushToken },
    {
      auth: apiConfig.auth,
    }
  );
};

export default {
  register,
};
