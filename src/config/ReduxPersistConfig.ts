import ImmutablePersistenceTransform from '../services/ImmutablePersistenceTransform';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web and AsyncStorage for react-native

const reducerVersion = '0.2';

// Redux Persist Config
export const persistConfig = {
  reducerVersion,
  key: 'root',
  storage,
  whitelist: ['authentication'],
  transforms: [ImmutablePersistenceTransform]
};

// Redux No Persist Config In case Remember not Select
export const NoPersistConfig = {
  reducerVersion,
  key: 'root',
  storage,
  whitelist: [],
  transforms: [ImmutablePersistenceTransform]
};
