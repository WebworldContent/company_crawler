import express, {Express, Request, Response, NextFunction} from 'express';
import dotenv from 'dotenv';
import clientRoute from './route/companies';
import cors from "cors";

dotenv.config();

const app: Express = express();
const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());

app.get('/', async (req: Request, res: Response, next: NextFunction) => {
    res.send('Welcome Home!!');
});

app.use(clientRoute);

app.listen(PORT, () => console.log(`Running on PORT: ${PORT}`));
