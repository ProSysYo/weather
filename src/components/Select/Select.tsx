import { FC, SelectHTMLAttributes } from "react";
import "./Select.scss";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    options: any []
}

export const Select: FC<SelectProps> = ({options, ...atrs}) => {
    return (
        <select className="select" {...atrs}>            
            {options.map((item, index) => {
                return <option key={index} value={item.value}>{item.city}</option>
            })}
        </select>
    );
};
