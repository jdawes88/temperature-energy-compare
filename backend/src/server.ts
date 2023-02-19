import express from 'express';
const app = express();
const port = 3000;

app.get('/data', (req, res) => {
  res.json("App set up")
});

app.listen(port, () => {
  console.log(`App set up listening on http://localhost:${port}`)
});