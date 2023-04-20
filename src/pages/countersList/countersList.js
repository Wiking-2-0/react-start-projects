import React, { useState } from "react";
import Counter from "./counter";
import "./counters-list.scss";

const CountersList = () => {
    const initialState = [
        { id: 0, value: 0, name: "Ненужная вещь", price: "200" },
        { id: 1, value: 4, name: "Ложка" },
        { id: 2, value: 0, name: "Вилка" },
        { id: 3, value: 0, name: "Тарелка" },
        { id: 4, value: 0, name: "Набор минималиста" },
    ];

    const [counters, setCounters] = useState(initialState);
    const handleDelete = (id) => {
        const newCounters = counters.filter((c) => c.id !== id);
        setCounters(newCounters);
    };
    const handleReset = () => {
        setCounters(initialState);
    };
    const handleIncrement = (id) => {
        const elementIndex = counters.findIndex((c) => c.id === id);
        const newCounters = [...counters];
        newCounters[elementIndex].value++;
        setCounters(newCounters);
    };
    const handleDecrement = (id) => {
        const elementIndex = counters.findIndex((c) => c.id === id);
        const newCounters = [...counters];
        if (newCounters[elementIndex].value !== 0) {
            newCounters[elementIndex].value--;
            setCounters(newCounters);
        }
    };

    return (
        <div className='counters-list-wrapper'>
            <div className='counters-list'>
                <table>
                    <tbody>
                    {counters.map((count) => (
                        <Counter
                            key={count.id}
                            onDelete={handleDelete}
                            onIncrement={handleIncrement}
                            onDecrement={handleDecrement}
                            {...count}
                        />
                    ))}
                    </tbody>
                </table>
                <button
                    className='btn btn-primary btn-sm m-2'
                    onClick={handleReset}
                >
                    Reset
                </button>
            </div>
        </div>
    );
};
export default CountersList;
