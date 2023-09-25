import storage from 'redux-persist/lib/storage';

const authPersistConfig = {
    key: 'token',
    storage,
    whitelist: ['token'],
};

export default authPersistConfig;