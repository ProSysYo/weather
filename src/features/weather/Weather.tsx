import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { weatherActions } from "./weatherSlice";
import { MySelect } from "../../components/Select";
import "./Weather.scss";

export const Weather = () => {
    const weather = useAppSelector((state) => state.weather);
    const dispatch = useAppDispatch();

    const onChange = (value: any) => {
        dispatch(weatherActions.setCity(value));
    };

    const onInputChange = (value: any) => {
        console.log(value);
        
        dispatch(weatherActions.filterCities(value));
    };

    return (
        <div className="weather">
            <div className="search">
                <MySelect
                    value={weather.city}
                    placeholder="Выберите город"
                    options={weather.filteredCities}                    
                    onChange={onChange}
                    onInputChange={onInputChange}
                />
            </div>

            <div className="board">
                <div className="left-board">
                    <h1>17°</h1>
                    <p>17:31:12</p>
                    <h3>Moskow, RU</h3>
                </div>
                <div className="right-board">fff</div>
            </div>
        </div>
    );
};
