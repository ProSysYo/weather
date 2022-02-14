import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../api/api";
import json from "../../common/russia.json";

interface IWeather {
    city: string;
    country: string;
    temperature: number;
    feelsLike: number;
    humidity: number;
    pressure: number;
    windSpeed: number;
    visibility: number;
    description: string;
    icon: string;
    alt: string;
}

interface weatherState {
    status: "idle" | "loading" | "failed";
    city: string | null;
    cities: any[];
    filteredCities: any[];
    weather: IWeather | null;
}

const initialState: weatherState = {
    status: "loading",
    city: null,
    cities: json.map((city) => ({
        label: city.city,
        value: city.city,
    })),
    filteredCities: [],
    weather: null
};

export const getWetherByCityName = createAsyncThunk("weather/getWetherByCityName", async (query: string, { rejectWithValue }) => {
    try {
        const response = await api.getWetherByCityName(query);
        return {
            data: response,
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
                state.filteredCities = state.cities.filter(item =>
                    item.value.toLowerCase().indexOf(action.payload!.toLowerCase()) >= 0
                );
            }
        },
        abortData: (state) => {
            state.city = null
            state.weather = null
            state.filteredCities = []
        }
    },
    extraReducers: (bilder) => {
        bilder
            .addCase(getWetherByCityName.pending, (state) => {
                state.status = "loading"                
            })
            .addCase(getWetherByCityName.fulfilled, (state, action) => {
                const weather = {
                    city: action.payload.data.name,
                    country: action.payload.data.sys.country,
                    temperature: action.payload.data.main.temp,
                    feelsLike: action.payload.data.main.feels_like,
                    humidity: action.payload.data.main.humidity,
                    pressure: action.payload.data.main.pressure,
                    windSpeed: action.payload.data.wind.speed,
                    visibility: action.payload.data.visibility,
                    description: action.payload.data.weather[0].description,
                    icon: action.payload.data.weather[0].icon,
                    alt: action.payload.data.weather[0].main                    
                }
                state.weather = weather;
                state.status = "idle";
            })
            .addCase(getWetherByCityName.rejected, (state) => {
                state.status = "failed"
            })
    },
});

export const weatherActions = weatherSlice.actions;

export default weatherSlice.reducer;
