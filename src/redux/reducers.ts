import { connectRouter } from 'connected-react-router';
import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { reducer as LayoutReducer } from '../common/redux/LayoutRedux';
import { reducer as LoadingReducer } from '../common/redux/LoadingRedux';
import { reducer as GuardReducer } from '../common/redux/GuardRedux';
import { reducer as SystemMessagesReducer } from '../common/redux/SystemMessagesRedux';
import { reducer as NotificationsReducer } from '../features/notifications/redux/NotificationsRedux';
import { reducer as ParametersReducer } from '../common/redux/ParametersRedux';
import { reducer as AvailabilityReducer } from '../common/redux/AvailabilityRedux';
import { reducer as AuthReducer } from '../features/authentication/redux/AuthenticationRedux';
import { reducer as UsersReducer } from '../features/users/redux/UserRedux';
import { reducer as PlayersReducer } from '../features/players/redux/PlayersRedux';
import { reducer as SettingsReducer } from '../features/settings/redux/SettingsRedux';
import { reducer as CustomersReducer } from '../features/customers/redux/CustomersRedux';
import { reducer as EventsReducer } from '../features/events/redux/EventsRedux';
import { reducers as CashGamesReducer } from '../features/cashgames/redux/CashGamesRedux';
import { reducer as MessagesReducer } from '../features/messages/redux/MessagesRedux';
import { reducer as CasinosReducer } from '../features/casinos/redux/CasinosRedux';

/* ------------- Assemble The Reducers ------------- */
export default (history: any) =>
  combineReducers({
    router: connectRouter(history), // Contains all information on current route
    form: formReducer, // Form Reducer for Redux form use
    loading: LoadingReducer, // Contains all State of Request (pending / finished)
    guard: GuardReducer, // Contains all State of Right Access to screens (pending / granted / unauthorized)
    layout: LayoutReducer, // Contains metadata for layout
    'system-messages': SystemMessagesReducer, // Contains system messages to display to users
    notifications: NotificationsReducer, // Contains notifications to display to users
    parameters: ParametersReducer, // Contains parameters for App
    availability: AvailabilityReducer, // Contains all authentication logic
    authentication: AuthReducer, // Contains all authentication logic
    users: UsersReducer, // Contains all users information
    players: PlayersReducer, // Contains all players information
    customers: CustomersReducer, // Contains all customers information
    events: EventsReducer, // Contains all events information
    cashgames: CashGamesReducer, // Contains all events information
    messages: MessagesReducer, // Contains all messages information
    casinos: CasinosReducer, // Contains all casinos information
    settings: SettingsReducer // Contains all settings informations
  });
