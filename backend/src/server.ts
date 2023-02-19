import express from 'express';
import tempsAndEngergyRoutes from './routes/tempsAndEnergy';
import cors from 'cors';

const app = express();
const port = 8080;

app.use(cors())

app.use('/tempsAndEnergy', tempsAndEngergyRoutes);

app.listen(port, () => {
  console.log(`App set up listening on http://localhost:${port}`)
});