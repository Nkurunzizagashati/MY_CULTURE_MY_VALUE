// import { backendUrl } from '../config';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = `${backendUrl}/subscriber`;

// // Async action for fetching subscribers
// export const fetchSubscribers = createAsyncThunk(
// 	'subscribers/fetchSubscribers',
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			const storedUser = localStorage.getItem('user');
// 			const loggedInUser = storedUser
// 				? JSON.parse(storedUser)
// 				: null;

// 			if (!loggedInUser || !loggedInUser.accessToken) {
// 				return rejectWithValue(
// 					'You must be logged in to subscribe.'
// 				);
// 			}

// 			const token = loggedInUser.accessToken;
// 			const response = await axios.get(API_URL, {
// 				headers: {
// 					'Content-Type': 'application/json',
// 					Authorization: `Bearer ${token}`,
// 				},
// 			});
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(
// 				error.response?.data || 'Error fetching subscribers'
// 			);
// 		}
// 	}
// );

// // Async action for adding a subscriber
// export const addSubscriber = createAsyncThunk(
// 	'subscribers/addSubscriber',
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			const storedUser = localStorage.getItem('user');
// 			const loggedInUser = storedUser
// 				? JSON.parse(storedUser)
// 				: null;

// 			if (!loggedInUser || !loggedInUser.accessToken) {
// 				return rejectWithValue(
// 					'You must be logged in to subscribe.'
// 				);
// 			}

// 			console.log("IT DIDN'T RETURN");

// 			const token = loggedInUser.accessToken;
// 			console.log(token);
// 			const response = await axios.post(
// 				API_URL,
// 				{},
// 				{
// 					headers: {
// 						'Content-Type': 'application/json',
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);
// 			return response.data;
// 		} catch (error) {
// 			console.error('Subscription error:', error);
// 			return rejectWithValue(
// 				error.response?.data || 'Error adding subscriber'
// 			);
// 		}
// 	}
// );

// // Async action for unsubscribing
// export const unsubscribe = createAsyncThunk(
// 	'subscribers/unsubscribe',
// 	async (subscriberId, { rejectWithValue }) => {
// 		try {
// 			const storedUser = localStorage.getItem('user');
// 			const loggedInUser = storedUser
// 				? JSON.parse(storedUser)
// 				: null;

// 			if (!loggedInUser || !loggedInUser.accessToken) {
// 				return rejectWithValue(
// 					'You must be logged in to unsubscribe.'
// 				);
// 			}

// 			const token = loggedInUser.accessToken;
// 			const response = await axios.delete(
// 				`${API_URL}/${subscriberId}`,
// 				{
// 					headers: {
// 						Authorization: `Bearer ${token}`,
// 					},
// 				}
// 			);
// 			return response;
// 		} catch (error) {
// 			return rejectWithValue(
// 				error.response?.data || 'Error unsubscribing'
// 			);
// 		}
// 	}
// );

// const subscriberSlice = createSlice({
// 	name: 'subscribers',
// 	initialState: {
// 		items: [],
// 		status: 'idle',
// 		error: null,
// 	},
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(fetchSubscribers.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(fetchSubscribers.fulfilled, (state, action) => {
// 				state.status = 'succeeded';
// 				state.items = action.payload;
// 			})
// 			.addCase(fetchSubscribers.rejected, (state, action) => {
// 				state.status = 'failed';
// 				state.error = action.payload;
// 			})
// 			.addCase(addSubscriber.fulfilled, (state, action) => {
// 				state.items.push(action.payload);
// 			})
// 			.addCase(unsubscribe.fulfilled, (state, action) => {
// 				state.items = state.items.filter(
// 					(item) => item.id !== action.payload
// 				);
// 			});
// 	},
// });

// export default subscriberSlice.reducer;

import { backendUrl } from '../config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${backendUrl}/subscriber`;

// ✅ Check if user is subscribed
export const checkSubscriptionStatus = createAsyncThunk(
	'subscribers/checkSubscriptionStatus',
	async (_, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to check subscription status.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.get(`${API_URL}/status`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data; // Expected to return `{ isSubscribed: true/false }`
		} catch (error) {
			return rejectWithValue(
				error.response?.data ||
					'Error checking subscription status'
			);
		}
	}
);

// ✅ Fetch all subscribers
export const fetchSubscribers = createAsyncThunk(
	'subscribers/fetchSubscribers',
	async (_, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to subscribe.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.get(API_URL, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error fetching subscribers'
			);
		}
	}
);

// ✅ Add a subscriber
export const addSubscriber = createAsyncThunk(
	'subscribers/addSubscriber',
	async (_, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to subscribe.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.post(
				API_URL,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error adding subscriber'
			);
		}
	}
);

// ✅ Unsubscribe
export const unsubscribeSlice = createAsyncThunk(
	'subscribers/unsubscribe',
	async (subscriberId, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to unsubscribe.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.delete(`${API_URL}`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error unsubscribing'
			);
		}
	}
);

const subscriberSlice = createSlice({
	name: 'subscribers',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
		isSubscribed: false, // ✅ New state for subscription status
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchSubscribers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchSubscribers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchSubscribers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(addSubscriber.fulfilled, (state, action) => {
				state.items.push(action.payload);
				state.isSubscribed = true; // ✅ Update subscription status
			})
			.addCase(unsubscribeSlice.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(item) => item.id !== action.payload
				);
				state.isSubscribed = false; // ✅ Update subscription status
			})
			.addCase(
				checkSubscriptionStatus.fulfilled,
				(state, action) => {
					state.isSubscribed = action.payload.isSubscribed;
				}
			)
			.addCase(checkSubscriptionStatus.rejected, (state) => {
				state.isSubscribed = false;
			});
	},
});

export default subscriberSlice.reducer;
