import Select, { GroupBase, Props } from 'react-select';


export function MySelect<Option, IsMulti extends boolean = false, Group extends GroupBase<Option> = GroupBase<Option>>(
    props: Props<Option, IsMulti, Group>
) {
    const colourStyles = {
        control: (styles: any) => ({
            ...styles,            
            color: "#000",
            width: "100%",
            minWidth: "250px",
            height: "50px",
            border: "none",
            borderRadius: "5px",
            zIndex: 100,
        }),
        singleValue: (styles: any) => ({
            ...styles,
            color: "#000",
        }),
    };
    return <Select {...props} styles={colourStyles} />;
}
