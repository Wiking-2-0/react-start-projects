import React, { useState, useEffect } from 'react';
import Symbol from './symbol';

const symbolList = [{id: 'bg-ace'},
    {id: 'bg-crab'},
    {id: 'bg-dolph'},
    {id: 'bg-fish'},
    {id: 'bg-jack'},
    {id: 'bg-king'},
    {id: 'bg-lionfish'},
    {id: 'bg-nine'},
    {id: 'bg-octo'},
    {id: 'bg-pearl'},
    {id: 'bg-queen'},
    {id: 'bg-seahorse'},
    {id: 'bg-ten'}];
const symbolHeight = 100;
const spinDuration = 3000;
const symbolsCount = 3;

const Reel = ({reelIndex, isSpinning, resolveEndSpin}) => {
    const [symbols, setSymbols] = useState([]);
    const [isReelSpinning, setIsReelSpinning] = useState(false);
    const reelStyle = { transform: `translateY(calc(100% - ${symbolHeight * 3}px))` };

    const generateSymbol = () => {
        return symbolList[Math.floor(Math.random() * symbolList.length)].id
    }

    // Initial prepare and render reel
    useEffect(() => {
        let createSymbols = [];

        for (let i = 0; i < symbolsCount; i++) {
            const newSymbol = <Symbol key={`symbol-${i}`} id={generateSymbol()} />;
            createSymbols.push(newSymbol);
        }

        setSymbols(createSymbols)
    }, []);

    // Generate symbols for spin and start spin
    useEffect(() => {
        if (!isSpinning) return;

        const newSymbolsCount = 13 + (4 * reelIndex);
        let createSymbols = [];

        for (let i = 0; i < newSymbolsCount; i++) {
            const newSymbol = <Symbol key={`symbol-${i}-${Math.random()}`} id={generateSymbol()} />;
            createSymbols.push(newSymbol);
        }

        setSymbols(prevSymbols => {
            const newSymbols = [...createSymbols, ...prevSymbols]

            return newSymbols;
        })

        setTimeout(() => {
            setIsReelSpinning(true)
        }, 500 * reelIndex)
    }, [isSpinning]);

    // Stop spin and make after spin changes
    useEffect(() => {
        if (!isReelSpinning) return;

        setTimeout(() => {
            setSymbols(prevSymbols => {
                return prevSymbols.slice(0, 3);
            });
            setIsReelSpinning(prevState => !prevState)

            resolveEndSpin(reelIndex);
        }, spinDuration)

    }, [isReelSpinning]);

    return (
        <div className="reel-container">
            <div className="reel"
                 style={isReelSpinning ? reelStyle : {}}
            >
                {
                    symbols
                }
            </div>
        </div>
    );
};

export default Reel;
