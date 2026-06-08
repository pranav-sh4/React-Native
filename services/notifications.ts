import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export const requestNotificationPermissions = async () => {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== 'granted') {
    await Notifications.requestPermissionsAsync();
  }
};

export const sendProductSavedNotification = async (title: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Product Saved! ",
      body: `${title} was successfully added to your scan history.`,
    },
    trigger: null,
  });
};