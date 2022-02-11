import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import json from "../../common/russia.json";

interface weatherState {
    status: "idle" | "loading" | "failed";
    city: string | null;
    cities: any[];
    filteredCities: any[];
}

const initialState: weatherState = {
    status: "idle",
    city: null,
    cities: json.map((city) => ({
        label: city.city,
        value: city.city,
    })),
    filteredCities: [],
};

export const getCities = createAsyncThunk("barcode/markDate", async (query: string, { rejectWithValue }) => {
    try {
        const response = await api.fetchCityes(query);
        return {
            data: response.data,
        };
    } catch (error: any) {
        if (!error.isAxiosError) {
            throw error;
        }
        return rejectWithValue(error.response.data);
    }
});

export const weatherSlice = createSlice({
    name: "weather",
    initialState,
    reducers: {
        setCity: (state, action: PayloadAction<string | null>) => {
            state.city = action.payload;
        },
        filterCities: (state, action: PayloadAction<string | null>) => {
            if (action.payload!.length > 1) {
                state.filteredCities = state.cities.filter((item) => item.value.includes(action.payload));
            } 
        },
    },
    extraReducers: (bilder) => {
        bilder.addCase(getCities.fulfilled, (state, action) => {
            state.cities = action.payload.data.result;
            state.status = "idle";
        });
    },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
