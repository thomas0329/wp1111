import { Router } from "express";
import ScoreCard from '../models/ScoreCard';
import bodyParser from 'body-parser';

// 怎麼從前端連過來？
const router = Router();
router.use(bodyParser.json());
router.delete("/cards", async (req, res) => {
    try {
        await ScoreCard.deleteMany({});
        res.json({ message: 'Database cleared' });
        
    } catch (e) { throw new Error("Database deletion failed"); }
});
router.post("/card", async (req, res) => {
    // console.log(req.body);   // { name: 'd', subject: 'math', score: '10' }
    try{
        const existing = await ScoreCard.findOne({name: req.body.name, subject: req.body.subject});
        if (existing){
            res.json({ message: `Updating {name: ${req.body.name}, subject: ${req.body.subject},
                score: ${req.body.score}} `});
            return ScoreCard.findOneAndUpdate({name: req.body.name, subject: req.body.subject},
                 {score: req.body.score});
        }
        else{
            const newScoreCard = new ScoreCard({ name: req.body.name,
                subject: req.body.subject, score: req.body.score });
            console.log("Created scorecard", newScoreCard);
            res.json({ message: `Adding {name: ${req.body.name}, subject: ${req.body.subject}, score: ${req.body.score}} `});
            return newScoreCard.save();
        }
    }
    catch (e) { throw new Error("ScoreCard creation error: " + e); }
});

export default router;
 