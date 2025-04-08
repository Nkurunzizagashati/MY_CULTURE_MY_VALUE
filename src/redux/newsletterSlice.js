import { backendUrl } from '../config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${backendUrl}/newsletter`;

// Async action for fetching newsletters
export const fetchNewsletters = createAsyncThunk(
	'newsletters/fetchNewsletters',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(API_URL);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error fetching newsletters'
			);
		}
	}
);

// Async action for sending a newsletter
export const sendNewsletter = createAsyncThunk(
	'newsletters/sendNewsletter',
	async (formData, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to send a newsletter.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.post(API_URL, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`,
				},
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error sending newsletter'
			);
		}
	}
);

const newsletterSlice = createSlice({
	name: 'newsletters',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchNewsletters.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchNewsletters.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchNewsletters.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(sendNewsletter.fulfilled, (state, action) => {
				state.items.push(action.payload);
			});
	},
});

export default newsletterSlice.reducer;
