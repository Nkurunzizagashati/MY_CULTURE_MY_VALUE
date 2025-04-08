import { backendUrl } from '../config';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = `${backendUrl}/reviews`;

// Async action for fetching ratings
export const fetchRatings = createAsyncThunk(
	'ratings/fetchRatings',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(API_URL);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error fetching ratings'
			);
		}
	}
);

// Async action for adding a rating
export const addRating = createAsyncThunk(
	'ratings/addRating',
	async ({ artifactId, ratingData }, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to add a rating.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.post(
				`${API_URL}/${artifactId}`,
				ratingData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error adding rating'
			);
		}
	}
);

// Async action for updating a rating
export const updateRating = createAsyncThunk(
	'ratings/updateRating',
	async ({ ratingId, updatedData }, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to update a rating.'
				);
			}

			const token = loggedInUser.accessToken;
			const response = await axios.patch(
				`${API_URL}/${ratingId}`,
				updatedData,
				{
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
				}
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Error updating rating'
			);
		}
	}
);

const ratingSlice = createSlice({
	name: 'ratings',
	initialState: {
		items: [],
		status: 'idle',
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchRatings.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchRatings.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchRatings.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(addRating.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(updateRating.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(item) => item.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload;
				}
			});
	},
});

export default ratingSlice.reducer;
