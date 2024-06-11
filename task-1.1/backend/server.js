const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors({ origin: true }));
app.use(bodyParser.json());

app.post('/submit', (req, res) => {
    try {
      const { formData} = req.body;
      console.log('Received form data:', req.body);
      res.json({ message: 'Form data received successfully', data: req.body });
    } catch (err) {
      console.error(err);
      res.status(400).json({ message: 'Error parsing request body' });
    }
  });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
