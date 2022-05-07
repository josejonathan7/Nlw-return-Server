import express from 'express';
import cors from 'cors';
import { logger } from './config/logger';
import { routes } from './routes';


const app = express();

app.use(express.json());
app.use(cors());

app.use(routes);



app.listen(process.env.PORT ||  3333, () => logger.info('HTTP server runing'));
