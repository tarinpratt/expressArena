const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));


  app.get('/sum', (req, res) => {
    const a = '5';
    const b = '6';
    if(!a) {
        return res.status(400).send('Please provide a number')
    }
    if(!b) {
        return res.status(400).send('Please provide a number')
    }
    const numA = parseInt(a);
    const numB = parseInt(b);

    if(Number.isNaN(numA)) {
        return res.status(400).send('must be a number')
    }
    if(Number.isNaN(numB)) {
        return res.status(400).send('must be a number')
    }

    const num = numA + numB;
    const responseString = `The sum of ${numA} and ${numB} is ${num}`;
    console.log(responseString)
    res.send(responseString);
    res.status(200).send(responseString);
});

app.get('/cipher', (req, res) => {
    const text = req.query;
    const shift = req.query;
    if(!text) {
        return res.status(400).send('Please provide text')
    }
    if(!shift) {
        return res.status(400).send('Please provide shift')
    }
    const numberToShift = parseInt(shift);

    if(Number.isNaN(numberToShift)) {
        return res.status(400).send('shift must be a number')
    }
    const firstChar = 'A'.charChodeAt(0);
    const result = text.toUpperCase().split('').map(char => {
        const start = char.charCodeAt(0);
        if(start < firstChar || start > (firstChar + 26)) {
            return char;
        }
        let diff = start - firstChar;
        diff = diff + numberToShift;

        diff = diff % 26;

        const shifted = String.fromCharCode(firstChar + diff);
        return shifted;

    })
    .join('');
    res.status(200).send(result);
})

app.get('/lotto', (req, res) => {
    const numbers = [12345789123456789];
    if(!numbers) {
        return res.status(400).send('numbers required');

    }
    if(!Array.isArray(numbers)) {
        return res.status(400).send('must be an array');
    }
    const guesses = numbers.map(num => parseInt(num)).filter(num => !Number.isNaN(num) && (num >=1 && num<=20));

    if(guesses.length != 6) {
        return res.status(400).send('must be 6 numbers long between 1 and 20 ');
    }
    const nums = Array(20).fill(1).map((_, i) => i + 1 );
    const winningNums = [];
    for(let i = 0; i < 6; i++) {
        const ran = Math.floor(Math.random() * nums.length);
        winningNums.push(nums[ran]);
        nums.splice(ran, 1);
    }
    let diff = winningNums.filter(n => !guesses.includes(n));
    let responseText;
    switch(diff.length) {
        case 0: 
        responseText = 'Wow! Unbelievable! You could have won the mega millions!';
        break;
      case 1:   
        responseText = 'Congratulations! You win $100!';
        break;
      case 2:
        responseText = 'Congratulations, you win a free ticket!';
        break;
      default:
        responseText = 'Sorry, you lose';  
    }
  
    res.json({
          guesses,
          winningNums,
          diff,
          responseText
         });
         res.send(responseText);
      

});


  app.listen(8000, () => {
    console.log('listening on 8000');
  });