import { createSlice } from '@reduxjs/toolkit';

const changeOccurSlice = createSlice({
	name: 'change_occur',
	initialState: { value: true },
	reducers: {
		triggerChange: (state) => {
			state.value = true;
		},
		resetChange: (state) => {
			state.value = false;
		},
	},
});

export const { triggerChange, resetChange } = changeOccurSlice.actions;
export default changeOccurSlice.reducer;
