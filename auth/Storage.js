import AsyncStorage from "@react-native-community/async-storage";

const storeUser = async (user) => {
  console.log(user);
  try {
    await AsyncStorage.setItem("userData", JSON.stringify(user));
  } catch (error) {
    console.log("Error storing user", error);
  }
};

const getUser = async () => {
  try {
    let userData = await AsyncStorage.getItem("userData");
    return JSON.parse(userData);
  } catch (error) {
    console.log("Error getting User", error);
  }
};

const removeUser = async () => {
  try {
    await AsyncStorage.removeItem("userData");
  } catch (e) {
    console.log("Error removing User", error);
  }
};

export default { storeUser, getUser, removeUser };
