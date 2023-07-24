import React, { useState, useEffect, useRef } from 'react';
import './slot.scss';
import Reel from '../../components/slotMachine/reel';

const reelsCount = 5;

const SlotMachine = () => {
    const reelsPromises = useRef([]);
    const reelsResolves = useRef([]);
    const [isSpinning, setIsSpinning] = useState(false);

    // Trigger end of spin
    const resolveEndSpin = (reelIndex) => {
        reelsResolves.current[reelIndex - 1]();
    }

    // Initial prepare reels promises
    useEffect(() => {
        let newReelsPromises = [];
        let newReelsResolves = [];

        for (let i = 1; i < reelsCount + 1; i++) {
            const reelPromise = new Promise((resolve, reject) => {
                newReelsResolves.push(resolve)
            })
            newReelsPromises.push(reelPromise);
        }

        reelsPromises.current = newReelsPromises;
        reelsResolves.current = newReelsResolves;
    }, [])

    // Start spin button handler
    const spinReels = async () => {
        if (isSpinning) return;

        setIsSpinning(true);

        let allSpinsPromises = Promise.all(reelsPromises.current);

        try {
            await allSpinsPromises
            setIsSpinning(false);
        } catch (e) {
            console.error(e)
        }

        // this.checkWinningCombination();
    }

    return (
        <div className="slot-machine">
            <div className="reels">
                {
                    new Array(reelsCount).fill('').map((item, reelIndex) => {
                        return <Reel key={`reel-${reelIndex}`} reelIndex={reelIndex + 1} isSpinning={isSpinning} resolveEndSpin={resolveEndSpin} />;
                    })
                }
            </div>
            <button className="spin-button" onClick={spinReels}>SPIN</button>
        </div>
    );
};

export default SlotMachine;
