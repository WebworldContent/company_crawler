import { Client } from '@elastic/elasticsearch';
import dotenv from 'dotenv';
dotenv.config();

const ES_PORT = process.env.ES_PORT;

const esClient = new Client({ node: `http://localhost:${ES_PORT}` });

export default esClient;