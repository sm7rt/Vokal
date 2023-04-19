import { Avatar, Comment, List } from 'antd';
import moment from 'moment';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react';
import InfiniteScroll from 'react-infinite-scroller';
import { useDispatch, useSelector } from 'react-redux';
import DefaultProfileImage from '../../../assets/images/default_profile_picture.png';
import { LoadingContainer } from '../../../common/components/container';
import { IRootState } from '../../../common/models/StateModel';
import RenderCount from '../../../common/performance/RenderCount';
import { createLoadingSelector } from '../../../common/redux/LoadingRedux';
import { playerFromListSelector } from '../../players/redux/PlayersRedux';
import { useMessages } from '../hooks/MessagesHooks';
import { EntityType } from '../models/MessagesModel';
import MessagesActions from '../redux/MessagesRedux';
import './MessageList.scss';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  entityId: string;
  entityType: EntityType;
};

const MessageItemComp = (props: any) => {
  const { item, index } = props;

  const player = useSelector(
    (state: IRootState) =>
      item.authorId && playerFromListSelector(state, item.authorId)
  );

  return (
    <List.Item key={index}>
      <RenderCount componentName={`MessageItemComp-${item.id}`} />
      {item.content && (
        <Comment
          className={
            !item.authorRepresentativeId ? 'player-message' : 'casino-message'
          }
          authorId={
            !item.authorRepresentativeId &&
            player &&
            player.data &&
            `${player.data.firstName} ${player.data.lastName}`
          }
          avatar={
            !item.authorRepresentativeId &&
            player && (
              <Avatar
                src={player.profilePicture || DefaultProfileImage}
                alt="Han Solo"
              />
            )
          }
          content={
            <Fragment>
              <p>{item.content}</p>
              <span className="datetime">
                {moment(item.creationDate)
                  .parseZone()
                  .fromNow()}
              </span>
            </Fragment>
          }
        />
      )}
    </List.Item>
  );
};

const MessageItem = React.memo(MessageItemComp);

const DEFAULT_MESSAGE_SIZE = 20;

/**
 * Messages List
 */
const MessagesListComp = (props: Props) => {
  const dispatch = useDispatch();
  const scrollBottomRef = useRef(null);
  const { entityId, entityType } = props;
  const messageObj = useMessages(entityId, entityType);
  const [initMessage, setInitMessage] = useState();

  const isFetchingMessages = useSelector((state: IRootState) =>
    createLoadingSelector(['FETCH_MESSAGES'])(state.loading)
  );

  //* ******************** */
  // COMPONENT LIFECYCLE   */
  //* ******************** */
  useEffect(() => {
    dispatch(
      MessagesActions.fetchMessagesRequest(
        entityId,
        entityType,
        {},
        1,
        DEFAULT_MESSAGE_SIZE
      )
    );
  }, [dispatch, entityId, entityType]);

  // If It's the init we Scroll to Bottom
  const scrollToBottom = useCallback(() => {
    scrollBottomRef.current.scrollIntoView({
      block: 'end',
      behavior: 'smooth'
    });
  }, []);

  // Scroll To Bottom in init
  useEffect(() => {
    if (
      messageObj &&
      messageObj.page === 2 &&
      !isFetchingMessages &&
      scrollBottomRef.current
    ) {
      scrollToBottom();
    }
  }, [
    entityId,
    messageObj,
    isFetchingMessages,
    scrollBottomRef,
    scrollToBottom
  ]);

  // Hanle Infinite Load
  const handleInfiniteOnLoad = useCallback(() => {
    dispatch(
      MessagesActions.fetchMessagesRequest(
        entityId,
        entityType,
        {},
        messageObj.page,
        DEFAULT_MESSAGE_SIZE
      )
    );
  }, [dispatch, entityId, entityType, messageObj]);

  // Render Item
  const renderItem = useCallback(
    (item: any, index: number) => <MessageItem item={item} index={index} />,
    []
  );

  const handleScroll = (e: any) => {
    const element = e.target;
    // We activate infinite scrolling when we are at the end of scroll (for the init)
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      // do something at end of scroll
      setInitMessage(true);
    }
  };

  /**
   * Render
   */
  return (
    <div
      className="d-flex flex-column justify-content-start align-items-center w-100 modal-overflow"
      onScroll={handleScroll}
    >
      <InfiniteScroll
        className="w-100"
        initialLoad={false}
        pageStart={1}
        loadMore={initMessage && handleInfiniteOnLoad}
        hasMore={!isFetchingMessages && messageObj && !messageObj.last}
        useWindow={false}
        isReverse
        threshold={250}
      >
        <RenderCount componentName="MessageList" />
        <List
          dataSource={(messageObj && messageObj.list) || []}
          renderItem={renderItem}
          className="w-100 message-list"
          loading={isFetchingMessages}
        />
      </InfiniteScroll>
      <div ref={scrollBottomRef} />{' '}
      {/* Use To Scroll to the last item of the list */}
    </div>
  );
};

export default React.memo(LoadingContainer(['ADD_MESSAGE'])(MessagesListComp));
