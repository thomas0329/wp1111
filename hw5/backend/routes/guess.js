import express from 'express';
import {getNumber, genNumber} from '../core/getNumber';

const router = express.Router();

router.post('/start', (_, result) => {
    genNumber(); // 用亂數產生一個猜數字的 number，存在 memory DB
    result.json({ msg: 'The game has started.' });  // 回傳給 frontend
});

router.get('/guess', (req, result) => {
    // 去 (memory) DB 拿答案的數字
    var correctNumber = getNumber();
    // 用 req.query.number 拿到前端輸入的數字   // req.query: { number: '12' }

    var guessedNumber = Number(req.query.number);
    // check if NOT a num or not in range [1,100]
    if( !Number.isInteger(guessedNumber) || guessedNumber < 1 || guessedNumber > 100 ){
        // 如果有問題 =>
        result.status(406).send({ msg: 'Error: ' + req.query.number + ' is not a valid integer (1 - 100)' });
    }
    else{
        // 如果沒有問題，回傳 status
        if(correctNumber === guessedNumber)
            result.json({ msg: 'Equal' });
        else if(correctNumber > guessedNumber)
            result.json({ msg: 'Bigger' });
        else if(correctNumber < guessedNumber)
            result.json({ msg: 'Smaller' });
    }
    
});
router.post('/restart', (_, result) => {
    genNumber();
    result.json({ msg: 'The game has restarted.' });  // 回傳給 frontend
})
export default router
