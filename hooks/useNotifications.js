import { useEffect } from "react";
// will need this for when backend is complete
import expoPushTokensAPI from "../api/expoPushTokens";

import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default useNotifications = (listener) => {
  useEffect(() => {
    registerForPushNotifications();

    Notifications.addNotificationResponseReceivedListener(listener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      //for when backend is complete
      // expoPushTokensAPI.register(token);
    } catch (error) {
      console.log("Error getting token", error);
    }
  };
};
