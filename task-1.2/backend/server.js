const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(bodyParser.json());
app.use(cors({ origin: true }));

const formData = [];

app.post('/submit', (req, res) => {
  const { firstname, lastname, email, password } = req.body;

  // Server-side validation
  if (!firstname || !lastname || !email || !password) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  if (!/^[a-zA-Z]+$/.test(firstname) || !/^[a-zA-Z]+$/.test(lastname)) {
    return res.status(400).json({ error: 'Firstname and Lastname must only contain letters' });
  }

  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  if (password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }

  // Store validated data in temporary server-side storage
  formData.push({ firstname, lastname, email, password });
  console.log(req.body);

  res.status(200).json({ message: 'Form submitted successfully..'});
  
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});