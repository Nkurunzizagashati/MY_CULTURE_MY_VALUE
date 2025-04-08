// import { backendUrl } from '../config';
// import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// import axios from 'axios';

// const API_URL = `${backendUrl}/users`;

// // Async action for user registration
// export const registerUser = createAsyncThunk(
// 	'users/registerUser',
// 	async (userData, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.post(
// 				`${API_URL}/register`,
// 				userData
// 			);
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

// // Async action for user login
// export const loginUser = createAsyncThunk(
// 	'users/loginUser',
// 	async (credentials, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.post(
// 				`${API_URL}/login`,
// 				credentials
// 			);

// 			response.data.accessToken &&
// 				localStorage.setItem(
// 					'user',
// 					JSON.stringify(response.data)
// 				);
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

// // Get initial user state from local storage
// const initialState = {
// 	user: JSON.parse(localStorage.getItem('user')) || null,
// 	status: 'idle',
// 	error: null,
// };

// // Async action for fetching user profile
// export const fetchUserProfile = createAsyncThunk(
// 	'users/fetchUserProfile',
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			const response = await axios.get(`${API_URL}/profile`, {
// 				withCredentials: true,
// 			});
// 			return response.data;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

// // Async action for logging out
// export const logoutUser = createAsyncThunk(
// 	'users/logoutUser',
// 	async (_, { rejectWithValue }) => {
// 		try {
// 			await axios.post(
// 				`${API_URL}/logout`,
// 				{},
// 				{ withCredentials: true }
// 			);
// 			return null;
// 		} catch (error) {
// 			return rejectWithValue(error.response.data);
// 		}
// 	}
// );

// const userSlice = createSlice({
// 	name: 'users',
// 	initialState: initialState,
// 	reducers: {},
// 	extraReducers: (builder) => {
// 		builder
// 			.addCase(registerUser.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(registerUser.fulfilled, (state, action) => {
// 				state.status = 'succeeded';
// 				state.user = action.payload;
// 			})
// 			.addCase(registerUser.rejected, (state, action) => {
// 				state.status = 'failed';
// 				state.error = action.payload;
// 			})
// 			.addCase(loginUser.pending, (state) => {
// 				state.status = 'loading';
// 			})
// 			.addCase(loginUser.fulfilled, (state, action) => {
// 				state.status = 'succeeded';
// 				state.user = action.payload;
// 			})
// 			.addCase(loginUser.rejected, (state, action) => {
// 				state.status = 'failed';
// 				state.error = action.payload;
// 			})
// 			.addCase(fetchUserProfile.fulfilled, (state, action) => {
// 				state.user = action.payload;
// 			})
// 			.addCase(logoutUser.fulfilled, (state) => {
// 				state.user = null;
// 			});
// 	},
// });

// export default userSlice.reducer;

import { backendUrl } from '../config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${backendUrl}/users`;

// Async action for user registration
export const registerUser = createAsyncThunk(
	'users/registerUser',
	async (userData, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/register`,
				userData
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Async action for user login
export const loginUser = createAsyncThunk(
	'users/loginUser',
	async (credentials, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				`${API_URL}/login`,
				credentials
			);

			response.data.accessToken &&
				localStorage.setItem(
					'user',
					JSON.stringify(response.data)
				);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Async action for fetching all users
export const fetchUsers = createAsyncThunk(
	'users/fetchUsers',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(API_URL);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Get initial user state from local storage
const initialState = {
	user: JSON.parse(localStorage.getItem('user')) || null,
	users: [],
	status: 'idle',
	error: null,
};

// Async action for fetching user profile
export const fetchUserProfile = createAsyncThunk(
	'users/fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(`${API_URL}/profile`, {
				withCredentials: true,
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Async action for logging out
export const logoutUser = createAsyncThunk(
	'users/logoutUser',
	async (_, { rejectWithValue }) => {
		try {
			await axios.post(
				`${API_URL}/logout`,
				{},
				{ withCredentials: true }
			);
			return null;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

const userSlice = createSlice({
	name: 'users',
	initialState: initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(loginUser.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state) => {
				state.user = null;
			})
			.addCase(fetchUsers.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchUsers.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.users = action.payload;
			})
			.addCase(fetchUsers.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export default userSlice.reducer;
