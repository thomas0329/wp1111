/****************************************************************************
  FileName      [ CurRow.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the CurRow. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import "./css/Row.css";
import React from 'react';


const CurRow = ({ curGuess, rowIdx }) => {
    if(curGuess == undefined){
        return (
            <div className='Row-wrapper current'>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
            </div> 
        )
    }
    let letters = curGuess.split('');   // undefined!!

    return (
        <div className='Row-container'>
            {/* TODO 3: Row Implementation -- CurRow */}
            {curGuess.map((wordbox, colIdx) => {
                if(colIdx <= curGuess.length - 1){
                    return <div id={rowIdx+'-'+colIdx} key={rowIdx+'-'+colIdx} 
                        className={'Row-wordbox filled'}></div>
                }
                else{
                    return <div id={rowIdx+'-'+colIdx} key={rowIdx+'-'+colIdx} 
                        className={'Row-wordbox'}></div>
                }
            }
                
            )}
            {/* ↓ Default row, you should modify it. ↓ */}
            {/* <div className='Row-wrapper current'>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
                <div className='Row-wordbox'></div>
            </div> */}
            {/* ↑ Default row, you should modify it. ↑ */}
        </div>
    )
}

export default CurRow;
