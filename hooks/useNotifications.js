import { useEffect } from "react";

// will need this for when backend is complete
import expoPushTokensAPI from "../api/expoPushTokens";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import Constants from "expo-constants";

export default useNotifications = (listener) => {
  async function schedulePushNotification(categoryIdentifier) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Let us know how you're feeling.",
        body: "neother should this",
        categoryIdentifier: categoryIdentifier[0],
      },
      trigger: { seconds: 15 },
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "How are you feeling today?",
        body: "this one shouldnt ",
        data: { data: "goes here" },
        categoryIdentifier: categoryIdentifier[1],
      },
      trigger: { seconds: 10 },
    });
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "How are you feeling today?",
        body: "this should open app to noti screen",
      },
      trigger: { seconds: 1 },
    });
  }
  async function sendPushNotification(expoPushToken) {
    console.log(expoPushToken);
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "How are you feeling?",
      body: "Let us know!",
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

  useEffect(() => {
    registerForPushNotifications();

    schedulePushNotification(["happy_sad", "feeling_today"]);

    Notifications.addNotificationResponseReceivedListener(listener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
      console.log(token);
      // return token;
      await sendPushNotification(token);
      //for when backend is complete
      // expoPushTokensAPI.register(token);
    } catch (error) {
      console.log("Error getting token", error);
    }
  };
};
