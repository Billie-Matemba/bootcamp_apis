import express from 'express';
import cors from 'cors';
import { findLongestWord, findShortestWord, calculateWordLengths } from './wordGame.js';
import { totalPhoneBill } from './totalPhoneBill.js';
import { enoughAirtime } from './enoughAirtime.js';
const app = express();
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static('public'));
app.use(cors());
app.get ('/api/wordGame', function(req, res){
  const sentence = req.query.sentence;
  const longestWord = findLongestWord(sentence);
  const shortestWord = findShortestWord(sentence);
  const totalLength = calculateWordLengths(sentence);
  res.json({
    longestWord,
    shortestWord,
    totalLength,
  });
});

app.post ('/api/phonebill/total', function(req, res) {
  const {bill} = req.body;
  const total = totalPhoneBill(bill);
  res.json ({
    total: total
  });
});

app.get('/api/phonebill/prices', function(req, res) {
  const prices = {
      call: 2.75,
      sms: 0.65
  };
  res.json(prices); 
});

app.post('/api/phonebill/price', function(req, res) {
  const { type, price } = req.body;

  if (type === 'call') {
      callPrice = price;
      res.json({
          status: 'success',
          message: `The call price was set to ${price}`
      });
  } else if (type === 'sms') {
      smsPrice = price;
      res.json({
          status: 'success',
          message: `The sms price was set to ${price}`
      });
  } else {
      res.status(400).json({
          status: 'error',
          message: 'Invalid type. Must be either call or sms.'
      });
  }
});

app.post('/api/enough', function(req, res) {
  const { usage, available } = req.body;

  if (typeof usage !== 'string' || typeof available !== 'number') {
    return res.status(400).json({
      status: 'error',
      message: 'Invalid input. `usage` should be a string and `available` should be a number.'
    });
  }

  const result = enoughAirtime(usage, available);

  res.json({
    result: parseFloat(result.slice(1)), 
  });
});



let PORT = process.env.PORT || 3007;
app.listen(PORT, function(){
    console.log('App starting on port', PORT);
  });