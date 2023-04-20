import React from "react";

const Counter = (props) => {
    const { value } = props;

    const formatValue = () => {
        return value === 0 ? "empty" : value;
    };

    const getBadgeClasses = () => {
        let classes = "badge m-2 ";
        classes += value === 0 ? "bg-warning" : "bg-primary";
        return classes;
    };

    const handleIncrement = () => {
        props.onIncrement(props.id);
    };

    const handleDecrement = () => {
        props.onDecrement(props.id);
    };

    return (
        <tr>
            <td> {props.name}</td>
            <td className={getBadgeClasses()}>{formatValue()}</td>
            <td>
                <button
                    className='btn btn-primary btn-sm m-2'
                    onClick={handleIncrement}
                >
                    +
                </button>
            </td>
            <td>
                <button
                    className='btn btn-primary btn-sm m-2'
                    onClick={handleDecrement}
                >
                    -
                </button>
            </td>
            <td>
                <button
                    className='btn btn-danger btn-sm m-2'
                    onClick={() => props.onDelete(props.id)}
                >
                    Delete
                </button>
            </td>
        </tr>
    );
};

export default Counter;
