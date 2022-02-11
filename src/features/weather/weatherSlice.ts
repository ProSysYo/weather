import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import a from '../../common/russia.json'

interface weatherState {    
    status: 'idle' | 'loading' | 'failed';
    city: string;
    cities: any[]
}

const initialState : weatherState = {
    status: "idle",
    city: "",
    cities: a
}

export const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string>) => {
            state.city = action.payload;
        }
    }
})

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;