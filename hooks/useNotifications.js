import { useEffect } from "react";

// will need this for when backend is complete
import expoPushTokensAPI from "../api/expoPushTokens";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default useNotifications = (listener) => {
  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Original Title",
      body: "And here is the body!",
      data: { data: "goes here" },
    };

    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
  }

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    }),
  });

  Notifications.setNotificationCategoryAsync("happy_sad", [
    {
      actionId: "happy",
      buttonTitle: "Happy",
    },
    {
      actionId: "sad",
      buttonTitle: "Sad",
    },
  ]);

  useEffect(() => {
    const token = registerForPushNotifications();
    sendPushNotification(token);

    Notifications.addNotificationResponseReceivedListener(listener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      // await sendPushNotification(token.data);
      //for when backend is complete
      // expoPushTokensAPI.register(token);
    } catch (error) {
      console.log("Error getting token", error);
    }
  };
};
