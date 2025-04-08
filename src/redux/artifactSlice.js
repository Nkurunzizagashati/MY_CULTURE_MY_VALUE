import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendUrl } from '../config';

const API_URL = `${backendUrl}/artifacts`;

// Async action for fetching artifacts
export const fetchArtifacts = createAsyncThunk(
	'artifacts/fetchArtifacts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(API_URL);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
		}
	}
);

// Async action for adding an artifact
export const addArtifact = createAsyncThunk(
	'artifacts/addArtifact',
	async (artifactData, { rejectWithValue }) => {
		try {
			// Get the logged-in user's token from localStorage
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to add an artifact.'
				);
			}

			// Get the token
			const token = loggedInUser.accessToken;

			// Send the POST request with the token in the Authorization header
			const response = await axios.post(API_URL, artifactData, {
				headers: {
					'Content-Type': 'multipart/form-data',
					Authorization: `Bearer ${token}`, // Include the token
				},
			});

			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data ||
					'An error occurred while adding the artifact.'
			);
		}
	}
);

// Async action for updating an artifact
export const updateArtifact = createAsyncThunk(
	'artifacts/updateArtifact',
	async ({ id, data }, { rejectWithValue }) => {
		try {
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to perform this action.'
				);
			}

			const token = loggedInUser.accessToken;

			const response = await axios.patch(
				`${API_URL}/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data ||
					'An error occurred while updating the artifact.'
			);
		}
	}
);

// Async action for deleting an artifact
export const deleteArtifact = createAsyncThunk(
	'artifacts/deleteArtifact',
	async (id, { rejectWithValue }) => {
		try {
			// Safely get the logged-in user from localStorage
			const storedUser = localStorage.getItem('user');
			const loggedInUser = storedUser
				? JSON.parse(storedUser)
				: null;

			if (!loggedInUser || !loggedInUser.accessToken) {
				return rejectWithValue(
					'You must be logged in to perform this action.'
				);
			}

			const token = loggedInUser.accessToken;

			// Send DELETE request with Authorization header
			await axios.delete(`${API_URL}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json',
				},
			});

			return id; // Return the ID of the deleted artifact
		} catch (error) {
			return rejectWithValue(
				error.response?.data ||
					'An error occurred while deleting the artifact.'
			);
		}
	}
);

const artifactSlice = createSlice({
	name: 'artifacts',
	initialState: {
		items: [],
		status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchArtifacts.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchArtifacts.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.items = action.payload;
			})
			.addCase(fetchArtifacts.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(addArtifact.fulfilled, (state, action) => {
				state.items.push(action.payload);
			})
			.addCase(updateArtifact.fulfilled, (state, action) => {
				const index = state.items.findIndex(
					(item) => item.id === action.payload.id
				);
				if (index !== -1) {
					state.items[index] = action.payload; // Update the artifact in the state
				}
			})
			.addCase(deleteArtifact.fulfilled, (state, action) => {
				state.items = state.items.filter(
					(item) => item.id !== action.payload
				);
			});
	},
});

export default artifactSlice.reducer;
