import express from 'express';
import tempsAndEngergyRoutes from './routes/tempsAndEnergy';

const app = express();
const port = 3000;

app.use('/tempsAndEnergy', tempsAndEngergyRoutes);

app.listen(port, () => {
  console.log(`App set up listening on http://localhost:${port}`)
});