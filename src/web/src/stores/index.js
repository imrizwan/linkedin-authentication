import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';
import authReducer from '../features/authSlice';

export default configureStore({
  reducer: {
    auth: authReducer
  },
  middleware: getDefaultMiddleware().concat(logger),
});
