import express, {Express, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import { crawler } from './crawler/main';

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    await crawler();
    res.send('Hello World');
});

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));
