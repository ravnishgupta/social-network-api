const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3001;

const { User, Thought, Reaction } = require('./models');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('./routes'))
app.listen(PORT, () => console.log(`🌍 Connected on localhost:${PORT}`));

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/socialNetworkDB',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

mongoose.set('debug', true);
