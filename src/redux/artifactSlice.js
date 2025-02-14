import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const API_URL = 'http://localhost:3002/api/artifacts';

// Async action for fetching artifacts
export const fetchArtifacts = createAsyncThunk(
	'artifacts/fetchArtifacts',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axios.get(API_URL);

			const data = JSON.stringify(response.data);

			console.log(`RESPONSE: ${response.data}`);
			console.log(`DATA: ${data}`);
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
			const response = await axios.post(API_URL, artifactData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			});
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response.data);
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
			});
	},
});

export default artifactSlice.reducer;
