import { all } from 'redux-saga/effects';

/* ------------- Sagas ------------- */
import commonSaga from '../common/sagas';
import notificationsSaga from '../features/notifications/sagas';
import authenticationSaga from '../features/authentication/sagas';
import usersSaga from '../features/users/sagas';
import playersSaga from '../features/players/sagas';
import settingsSaga from '../features/settings/sagas';
import customersSaga from '../features/customers/sagas';
import eventsSaga from '../features/events/sagas';
import cashGamesSaga from '../features/cashgames/sagas';
import messagesSaga from '../features/messages/sagas';
import casinosSaga from '../features/casinos/sagas';

/* ------------- Connect Types To Sagas ------------- */

// Export Default
export default function* root() {
  yield all([...commonSaga]);
  yield all([...notificationsSaga]);
  yield all([...authenticationSaga]);
  yield all([...usersSaga]);
  yield all([...playersSaga]);
  yield all([...settingsSaga]);
  yield all([...customersSaga]);
  yield all([...eventsSaga]);
  yield all([...cashGamesSaga]);
  yield all([...messagesSaga]);
  yield all([...casinosSaga]);
}
