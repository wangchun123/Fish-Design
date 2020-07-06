const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('Hello World12312!');
});

app.listen(8080, () => {});
