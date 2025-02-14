import { configureStore } from '@reduxjs/toolkit';
import artifactReducer from './artifactSlice';
import userReducer from './userSlice';

const store = configureStore({
	reducer: {
		artifacts: artifactReducer,
		users: userReducer,
	},
});

export default store;
