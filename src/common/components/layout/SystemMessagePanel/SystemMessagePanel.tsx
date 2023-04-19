import { message } from 'antd';
import React from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { IMessageState, IRootState } from '../../../models/StateModel';
import MessageActions, {
  messagesWithDisplayMode
} from '../../../redux/SystemMessagesRedux';

message.config({
  top: 60,
  duration: 3,
  maxCount: 3
});

//* ******************** */
// REDUX PROPS */
//* ******************** */
type ReduxStateProps = {
  messagesAlert: IMessageState[];
};

//* ******************** */
// REDUX DISPATCH PROPS */
//* ******************** */
type ReduxDispatchProps = {
  removeMessage: (messageId: string) => void; // Remove Message
};

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type MessagePanelProps = {};

//* ******************** */
// COMPONENTS STATE */
//* ******************** */
type MessagePanelState = {};

type GlobalProps = MessagePanelProps & ReduxStateProps & ReduxDispatchProps;

/**
 * Main Side Bar Component
 */
class MessagePanelComponent extends React.PureComponent<
  GlobalProps,
  MessagePanelState
> {
  static defaultProps = {
    hideLogoText: false
  };

  componentDidMount() {
    this.props.messagesAlert.forEach(m => {
      this.showAlert(m);
    });
  }

  componentWillReceiveProps(newProps: GlobalProps) {
    const newMessageAlert = newProps.messagesAlert.filter(
      m =>
        this.props.messagesAlert.findIndex(
          oldMessage => oldMessage.id === m.id
        ) === -1
    );
    newMessageAlert.forEach(m => {
      this.showAlert(m);
    });
  }

  //* ******************** */
  // USER ACTIONS */
  //* ******************** */

  /**
   * Get Alert theme depends of gravity
   */
  showAlert = (messageToDisplay: IMessageState) => {
    if (messageToDisplay.gravity === 'ERROR') {
      message.error(messageToDisplay.text);
    } else if (messageToDisplay.gravity === 'WARNING') {
      message.info(messageToDisplay.text);
    } else if (messageToDisplay.gravity === 'INFO') {
      message.info(messageToDisplay.text);
    } else if (messageToDisplay.gravity === 'SUCCESS') {
      message.success(messageToDisplay.text);
    }
    return this.props.removeMessage(messageToDisplay.id);
  };

  //* ******************** */
  // RENDER */
  //* ******************** */
  render() {
    return <div />;
  }
}

//* ******************** */
// MAP STATE TO PROPS */
//* ******************** */
const mapStateToProps = (
  state: IRootState,
  ownProps: MessagePanelProps
): ReduxStateProps => ({
  messagesAlert: messagesWithDisplayMode(state, 'PANEL')
});

//* ******************** */
// MAP DISPATCH TO PROPS */
//* ******************** */
const mapDispatchToProps: any = (
  dispatch: Dispatch,
  ownProps: MessagePanelProps
): ReduxDispatchProps => ({
  removeMessage: (messageId: string) =>
    dispatch(MessageActions.removeMessage(messageId))
});

// Connect Component
const MessagePanel = connect<
  ReduxStateProps,
  ReduxDispatchProps,
  MessagePanelProps,
  IRootState
>(
  mapStateToProps,
  mapDispatchToProps
)(MessagePanelComponent);

// Export Default
export default MessagePanel;
