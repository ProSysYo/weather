import { Select } from "../../components/Select/Select";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { weatherActions } from "./weatherSlice";

export const Weather = () => {
    const weather = useAppSelector((state) => state.weather);
    const dispatch = useAppDispatch();

    return (
        <div className="weather">
            <Select
                options={weather.cities}
                value={weather.city}
                onChange={(e) => dispatch(weatherActions.setCity(e.target.value))}
            />
        </div>
    );
};
