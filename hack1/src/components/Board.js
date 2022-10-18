/****************************************************************************
  FileName      [ Board.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu ]
  Synopsis      [ This file generates the Board. ]
  Copyright     [ 2022 10 ]
****************************************************************************/

import Row from "./Row";
import './css/Board.css';
import React from "react";
import CurRow from "./CurRow";

const Board = ({ turn, guesses, curGuess, usedChars }) => {

    return (
        <div className="Board-container">
            {/* TODO 2-2: show 6 rows (map function is recommended) and defined row's key.
                Hint: Use `CurRow` instead of `Row` when you are passing `curGuess` into it. */}
            {guesses.map((row, rowidx) =>{
                if(rowidx != turn){

                    return (
                    
                        <Row id={rowidx} key={rowidx} guess={guesses[rowidx]} rowIdx={rowidx} usedChars={usedChars}></Row>
                    )
                }
                else if(rowidx == turn){
                    // console.log('guesses[rowidx]');
                    // console.log(guesses[rowidx]);
                    console.log('return current row');
                    return (
                    
                        <CurRow id={rowidx} key={rowidx} curGuess={guesses[rowidx]}></CurRow>
                    )
                }
                
            })}
            
        </div>
    )
};
export default Board;
