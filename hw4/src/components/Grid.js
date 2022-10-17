import Cell from './Cell'

export default function Grid({board, boardSize, updateFlag, revealCell}){
    return (
        board.map((row,row_idx) => // board undefined!
        <div id={'row'+row_idx} style={{display: 'flex'}}>
            {row.map((element, col_idx) => <Cell rowIdx={row_idx} colIdx={col_idx} detail={element} 
            updateFlag={updateFlag} revealCell={revealCell}></Cell>)}
        </div>)
    );
    
}