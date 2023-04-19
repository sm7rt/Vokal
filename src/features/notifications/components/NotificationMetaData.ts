import NotificationGameSubmittedImage from '../../../assets/images/notifications/notif-game-submitted.png';
import NotificationGameMessageImage from '../../../assets/images/notifications/notif-game-message.png';
import NotificationSeatRequestImage from '../../../assets/images/notifications/notif-seat-request.png';
import NotificationConstants from '../constants/NotificationConstants';

/**
 * Notification MetaData List
 */
const NotificationMetData = [
  {
    type: NotificationConstants.NEW_GAME_REQUEST,
    title: 'A new game has been submitted',
    image: NotificationGameSubmittedImage
  },
  {
    type: NotificationConstants.GAME_NEW_MESSAGE_FROM_PLAYER,
    title: 'You have a new player’s message',
    image: NotificationGameMessageImage
  },
  {
    type: NotificationConstants.GAME_REQUEST_SENT,
    title: 'Seat Request',
    image: NotificationSeatRequestImage
  }
];

export default NotificationMetData;
