const cors = require('cors');
const express = require('express');
const helmet = require('helmet');
const mongoApi = require('./MongoApi')

const PORT = 8092;

const app = express();

module.exports = app;

app.use(require('body-parser').json());
app.use(cors());
app.use(helmet());

app.options('*', cors());

app.get('/', (request, response) => {
  response.send({'ack': true});
});

app.listen(PORT);

console.log(`📡 Running on port ${PORT}`);
app.get('/products/search', async (request, response) => {
  param = request.query
  console.log('oui')
  console.log(param)
  answer = await mongoApi.search(param)
  response.send(answer);
});
app.get('/products/:id', async (request, response) => {
  param = request.params
  console.log('ouiID')
  answer = await mongoApi.findId(param)
  response.send(answer);
});


