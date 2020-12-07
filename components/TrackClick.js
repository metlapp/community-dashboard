import axios from "axios";
import { apiConfig } from "../config/config";

export function trackClick(user, content, action, location) {
  let payload = {
    user: user,
    content: content,
    action: action,
    location: location,
  };
  axios
    .post(apiConfig.baseUrl + "clicks/", payload, {
      auth: apiConfig.auth,
    })
    .catch(console.error);
}
