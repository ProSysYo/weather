import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getWetherByCityName, weatherActions } from "./weatherSlice";
import { MySelect } from "../../components/Select";
import { useEffect, useState } from "react";
import { WeatherBoard } from "./WeatherBoard";

import "./Weather.scss";

export const Weather = () => {
    const weather = useAppSelector((state) => state.weather);
    const dispatch = useAppDispatch();
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (weather.status === "idle" && weather.weather) {
            setShow(true)
        } else {
            setShow(false)
        }
    }, [weather.weather, weather.status])

    const onChange = (value: any) => {
        if (value) {
            dispatch(weatherActions.setCity(value));
            dispatch(getWetherByCityName(value.value));
        } else {
            dispatch(weatherActions.abortData())            
        }
    };

    const onInputChange = (value: any) => {
        if (value) dispatch(weatherActions.filterCities(value));
    };

    return (
        <div className="weather">
            <div className="search">
                <MySelect
                    value={weather.city}
                    placeholder="Введите название города"
                    options={weather.filteredCities}
                    onChange={onChange}
                    onInputChange={onInputChange}
                    isClearable
                />
            </div>
            {weather.status === "loading" && <p className="loader">Loading...</p>}

            <WeatherBoard
                show={show}
                weather={weather.weather}
            />
        </div>
    );
};
