import express from 'express';
const bodyParser = require('body-parser');
import { calculateBmi } from './bmiCalculator';
import { exerciseCalculator } from './exerciseCalculator';
const app = express();
app.use(bodyParser.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    try {
        const { height, weight } = req.query;
        res.send(`You are ${calculateBmi(Number(height), Number(weight))}`);
    } catch (e: unknown) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }
});

app.post('/exercise', (req, res) => {
    console.log(req.body)
    try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const exerciseHours: any = req.body.daily_exercises;
        const target: any = req.body.target;
        if (!target || !exerciseHours) {
            res.status(400).json({
                error: "parameters missing"
            });
        }
        res.send(exerciseCalculator(exerciseHours, target));
    } catch (e: unknown) {
        res.status(400).json({
            error: "malformatted parameters"
        });
    }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});