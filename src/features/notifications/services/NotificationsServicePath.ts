// List All Notifications Service Path => See Swagger for more details
export default {
  FETCH_NOTIFICATIONS: `notifications/api/{target}/{userId}`,
  DISMISS_NOTIFICATIONS: `notifications/api/{notificationId}/dismiss`,
  DISMISS_ALL_NOTIFICATIONS: `notifications/api/dismiss/all`,
  READ_NOTIFICATIONS: `notifications/api/{notificationId}/read`,
  COUNT_NOTIFICATIONS: `notifications/api/{target}/{userId}/count`
};
