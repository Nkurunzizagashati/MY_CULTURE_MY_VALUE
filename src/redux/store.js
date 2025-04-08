import { configureStore } from '@reduxjs/toolkit';
import artifactReducer from './artifactSlice';
import userReducer from './userSlice';
import changeOccurReducer from './changeOccurSlice';
import ratingReducer from './ratingSlice';
import subscriberReducer from './subscriberSlice';
import newsletterReducer from './newsletterSlice';

const store = configureStore({
	reducer: {
		artifacts: artifactReducer,
		users: userReducer,
		change_occur: changeOccurReducer,
		ratings: ratingReducer,
		subscribers: subscriberReducer,
		newsletters: newsletterReducer,
	},
});

export default store;
