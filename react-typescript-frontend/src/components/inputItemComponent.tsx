import {ChangeEventHandler} from "react";

function InputItemComponent(
    {
        value,
        labelText,
        rows,
        onChange
    }: {
        value: string,
        labelText: string,
        rows: number
        onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>
    }
) {

    return (
        <div className={"flex flex-column gap-2 justify-content-center align-items-start"}>
            <label htmlFor={labelText}>{labelText}</label>
            <textarea className="form-control form-control-lg"
                      style={{width: "350px"}}
                      rows={rows}
                      name={labelText}
                      value={value}
                      onChange={onChange}
            />
        </div>
    )
}

export default InputItemComponent;