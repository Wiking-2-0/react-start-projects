import React, { useEffect, useRef, useState } from 'react';
import { CurrencyBlock } from '../../components/currencyConverter/currencyBlock';
import './currency.scss';

const defaultCurrency = 'USD';

function CurrencyConverter() {
    const [fromCurrency, setFromCurrency] = useState(defaultCurrency);
    const [fromPrice, setFromPrice] = useState(0);
    const [toCurrency, setToCurrency] = useState('UAH');
    const [toPrice, setToPrice] = useState(0);
    const ratesRef = useRef([]);

    useEffect(() => {
        fetch(`https://api.exchangerate.host/latest?base=${defaultCurrency}`)
            .then(response => response.json())
            .then(json => {
                ratesRef.current = json.rates;
                setFromPrice(1);
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        if (ratesRef.current.length !== 0) {
            const result = fromPrice / ratesRef.current[fromCurrency] * ratesRef.current[toCurrency];

            if (Number(result) !== Number(toPrice)) {
                setToPrice(result)
            }
        }
    }, [fromPrice, fromCurrency, toCurrency])

    const onChangeToPrice = (value) => {
        const result = value / ratesRef.current[toCurrency] * ratesRef.current[fromCurrency];
        setToPrice(value)
        setFromPrice(result)
    }

    return (
        <div className="currency-converter-wrapper">
            <div className="currency-converter">
                <CurrencyBlock
                    value={fromPrice}
                    currency={fromCurrency}
                    setNewValue={setFromPrice}
                    setNewCurrency={setFromCurrency}
                />
                <CurrencyBlock
                    value={toPrice}
                    currency={toCurrency}
                    setNewValue={onChangeToPrice}
                    setNewCurrency={setToCurrency}
                />
            </div>
        </div>
    );
}

export default CurrencyConverter;
