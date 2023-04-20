import React, { useEffect, useRef, useState } from 'react';
import { CurrencyBlock } from '../../components/currencyConverter/currencyBlock';
import './currency.scss';

function CurrencyConverter() {
    const [fromCurrency, setFromCurrency] = useState('UAH');
    const [fromPrice, setFromPrice] = useState(0);
    const [toCurrency, setToCurrency] = useState('USD');
    const [toPrice, setToPrice] = useState(1);
    const ratesRef = useRef([]);

    useEffect(() => {
        fetch('https://cdn.cur.su/api/latest.json')
            .then(response => response.json())
            .then(json => {
                ratesRef.current = json.rates;
                onChangeToPrice(1)
            })
            .catch(err => {
                console.error(err);
            })
    }, [])

    useEffect(() => {
        if (ratesRef.current.length !== 0)
            onChangeFromPrice(fromPrice)
    }, [fromCurrency])

    useEffect(() => {
        if (ratesRef.current.length !== 0)
            onChangeToPrice(toPrice)
    }, [toCurrency])

    const onChangeFromPrice = (value) => {
        const result = value / ratesRef.current[fromCurrency] * ratesRef.current[toCurrency];
        setToPrice(result.toFixed(3))
        setFromPrice(value)
    }

    const onChangeToPrice = (value) => {
        const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value;
        setFromPrice(result.toFixed(3))
        setToPrice(value)
    }

    return (
        <div className="currency-converter-wrapper">
            <div className="currency-converter">
                <CurrencyBlock
                    value={fromPrice}
                    currency={fromCurrency}
                    onChangeValue={onChangeFromPrice}
                    onChangeCurrency={setFromCurrency}
                />
                <CurrencyBlock
                    value={toPrice}
                    currency={toCurrency}
                    onChangeValue={onChangeToPrice}
                    onChangeCurrency={setToCurrency}
                />
            </div>
        </div>
    );
}

export default CurrencyConverter;
