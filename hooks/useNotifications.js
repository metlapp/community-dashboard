import { useEffect, useContext } from "react";

import AuthContext from "../auth/Context";
import authStorage from "../auth/Storage";
import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
// will need this for when backend is complete
import expoPushTokensAPI from "../api/expoPushTokens";

export default useNotifications = (listener) => {
  const authContext = useContext(AuthContext);
  useEffect(() => {
    registerForPushNotifications(authContext.user.id);
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

  async function registerForPushNotifications(userId) {
    const token = await Notifications.getExpoPushTokenAsync();
    if (
      !authContext.user.notification_token ||
      authContext.user.notification_token !== token
    ) {
      try {
        const permission = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (!permission.granted) return;

        //for when backend is complete
        await expoPushTokensAPI.register(token.data, userId);
        authContext.setUser({
          ...authContext.user,
          notification_token: token.data,
        });
        authStorage.storeUser({
          ...authContext.user,
          notification_token: token.data,
        });
      } catch (error) {
        console.log("Error getting token", error);
      }
    }
  }
};
