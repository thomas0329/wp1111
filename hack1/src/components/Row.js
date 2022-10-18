/****************************************************************************
  FileName      [ Row.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Row. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const Row = ({ guess, rowIdx, usedChars }) => {
    if(guess == undefined){
        return (
            <div className='Row-container'>
                <div className='Row-wrapper'>
                    <div className='Row-wordbox'></div>
                    <div className='Row-wordbox'></div>
                    <div className='Row-wordbox'></div>
                    <div className='Row-wordbox'></div>
                    <div className='Row-wordbox'></div>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className='Row-container'>
                {/* TODO 3: Row Implementation -- Row */}

                {/* ↓ Default row, you should modify it. ↓ */}
                {guess.map((wordbox, colIdx) => 
                    <div id={rowIdx+'-'+colIdx} key={rowIdx+'-'+colIdx} className={'Row-wordbox'}></div>)

                }

                {/* ↑ Default row, you should modify it. ↑ */}
            </div>
        )
    }
    
}

export default Row;