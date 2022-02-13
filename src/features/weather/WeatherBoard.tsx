import { FC, useRef } from "react"
import { CSSTransition } from "react-transition-group"


export const WeatherBoard: FC<any> = ({ weather, show }) => {
    const nodeRef = useRef(null)
    if (!weather) return <></>
    return (
        <CSSTransition
            in={show}
            timeout={1000}
            nodeRef={nodeRef}
            classNames="transition"
        >
            <div className="board" ref={nodeRef}>
                <div className="left-board">
                    <h1>{Math.floor(weather.temperature - 273.15)}°</h1>
                    <img className="city-icon"
                        src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                        alt={weather.alt}
                    />
                    <p>{weather.description}</p>
                    <h4>{weather.city}, {weather.country}</h4>
                </div>
                <div className="right-board">
                    <div className="board-row">
                        <div>По очущению</div>
                        <div>{Math.floor(weather.feelsLike - 273.15)}°</div>
                    </div>
                    <div className="board-row">
                        <div>Влажность</div>
                        <div>{weather.humidity} %</div>
                    </div>
                    <div className="board-row">
                        <div>Давление</div>
                        <div>{Math.floor(weather.pressure * 0.75)} мм. рт. ст.</div>
                    </div>
                    <div className="board-row">
                        <div>Скорость ветра</div>
                        <div>{Math.floor((weather.windSpeed * 18) / 5)} км/ч</div>
                    </div>
                    <div className="board-row">
                        <div>Видимость</div>
                        <div>{Math.floor((weather.visibility / 1000))} км</div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    )
}