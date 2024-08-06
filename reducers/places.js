import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: [],
};

export const placesSlice = createSlice({
    name: 'places',

    initialState,
    reducers: {
        addPlace: (state, action) => {
            state.value.push(action.payload);
        },
        importPlaces: (state, action) => {
            state.value = [];
            for (const element of action.payload) {
                state.value.push(element);
            }
        },
    },
});

export const { addPlace, importPlaces } = placesSlice.actions;
export default placesSlice.reducer;