import { useEffect } from "react";

// will need this for when backend is complete
import expoPushTokensAPI from "../api/expoPushTokens";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";

export default useNotifications = (listener) => {
  useEffect(() => {
    sendNotification();
    Notifications.addNotificationResponseReceivedListener(listener);
  }, []);

  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true,
    }),
  });

  Notifications.setNotificationCategoryAsync("happy_sad", [
    {
      identifier: "happy",
      buttonTitle: "Happy",
      options: {
        opensAppToForeground: false,
      },
    },
    {
      identifier: "sad",
      buttonTitle: "Sad",
      options: {
        opensAppToForeground: false,
      },
    },
  ]);

  Notifications.setNotificationCategoryAsync("feeling_today", [
    {
      identifier: "1",
      buttonTitle: "1",
    },
    {
      identifier: "2",
      buttonTitle: "2",
    },
    {
      identifier: "3",
      buttonTitle: "3",
    },
    {
      identifier: "4",
      buttonTitle: "4",
    },
    {
      identifier: "5",
      buttonTitle: "5",
    },
  ]);

  async function sendPushNotification(expoPushToken) {
    const message = {
      to: expoPushToken,
      title: "How are you feeling today?",
      body: "happy or sad?",
      categoryIdentifier: "happy_sad",
      _category: "feeling_today",
    };

    // Calls expo push notification service, will call our backend later
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

  async function sendNotification() {
    const token = await registerForPushNotifications();

    await sendPushNotification(token.data);
  }

  async function registerForPushNotifications() {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      //for when backend is complete
      // expoPushTokensAPI.register(token);
      return token;
    } catch (error) {
      console.log("Error getting token", error);
    }
  }
};
