import { Avatar, Icon, List, Tag } from 'antd';
import React, { Fragment, ReactNode } from 'react';
import { useSelector } from 'react-redux';
import ReactCountryFlag from 'react-country-flag';
import DefaultProfileImage from '../../../assets/images/default_profile_picture.png';
import { IRootState } from '../../../common/models/StateModel';
import { playerFromListSelector } from '../redux/PlayersRedux';
import RenderCount from '../../../common/performance/RenderCount';
import './PlayerItem.scss';

//* ******************** */
// COMPONENTS PROPS */
//* ******************** */
type Props = {
  player: GamesApiDefinitions.PlayerDTO;
  avatarSize?: number;
  inline?: boolean;
  noBorder?: boolean;
  showDistance?: boolean;
  rightTitle?: (playerId: number) => ReactNode;
};

/**
 * Format Distance Value
 * @param distanceValue
 */
const formatDistanceValue = (distanceValue: number) => {
  if (distanceValue > 100) {
    return '> 100';
  } else if (distanceValue < 1) {
    return '< 1';
  }
  return Math.floor(distanceValue);
};

const convertDistanceUnit = (distanceUnit: 'KILOMETERS' | 'FEET') => {
  if (distanceUnit === 'KILOMETERS') {
    return 'km';
  } else if (distanceUnit === 'FEET') {
    return 'ft';
  }
  return distanceUnit;
};

const PlayerItem = (props: Props) => {
  const {
    player,
    avatarSize,
    inline,
    noBorder,
    showDistance,
    rightTitle
  } = props;

  const item = useSelector(
    (state: IRootState) =>
      player.flopId && playerFromListSelector(state, player.flopId)
  );
  return (
    <List.Item className={`player-item ${noBorder && 'border-0'}`}>
      <RenderCount
        componentName={`playerItem-${player.flopId || player.name}`}
      />
      <List.Item.Meta
        className="d-flex flex-row justify-content-start align-items-center"
        avatar={
          <div className="position-relative">
            <Avatar
              src={
                player.flopId
                  ? item.profilePicture || DefaultProfileImage
                  : DefaultProfileImage
              }
              size={avatarSize || 64}
            />
            {showDistance && item && item.position && (
              <Tag className="position-absolute distance-tag text-center">
                {formatDistanceValue(item.position.value)}{' '}
                {convertDistanceUnit(item.position.metric)}
              </Tag>
            )}
          </div>
        }
        title={
          <Fragment>
            <span>
              {player.flopId
                ? item.data && `${item.data.firstName} ${item.data.lastName}`
                : player.name}
            </span>
            {rightTitle && rightTitle(player.flopId)}
          </Fragment>
        }
        description={
          !inline &&
          player.flopId &&
          item.data && (
            <div>
              {item.data.countryCode ? (
                <ReactCountryFlag
                  className="country-flag"
                  code={item.data.countryCode}
                  svg
                />
              ) : (
                <Icon type="flag" theme="filled" />
              )}
              <span className="ml-2">{item.data.country}</span>
            </div>
          )
        }
      />
    </List.Item>
  );
};

export default React.memo(PlayerItem);
