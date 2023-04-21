import React from 'react';

const defaultCurrencies = ['UAH', 'USD', 'EUR', 'GBP'];

export const CurrencyBlock = ({ value, currency, setNewValue, setNewCurrency }) => (
    <div className="currency-block">
        <ul className="currencies">
            {defaultCurrencies.map((cur) => (
                <li
                    onClick={() => setNewCurrency(cur)}
                    className={currency === cur ? 'active' : ''}
                    key={cur}
                >
                    {cur}
                </li>
            ))}
            <li>
                <svg viewBox="0 0 50 50" width="50" height="50">
                    <rect fill="none" height="50" width="50" />
                    <polygon points="47.25,15 45.164,12.914 25,33.078 4.836,12.914 2.75,15 25,37.25 " />
                </svg>
            </li>
        </ul>
            <input
                onChange={(e) => setNewValue(e.target.value)}
                value={Number(value).toFixed(3)}
                type="number"
                placeholder={0}
                min={0}
            />
    </div>
);
