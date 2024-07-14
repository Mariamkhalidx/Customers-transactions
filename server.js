
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

const data = {
    customers: [
      { id: 1, name: "Ahmed Ali" },
      { id: 2, name: "Aya Elsayed" },
      { id: 3, name: "Mina Adel" },
      { id: 4, name: "Sarah Reda" },
      { id: 5, name: "Mohamed Sayed" }
    ],
    transactions: [
      { id: 1, customerId: 1, amount: 1000, date: "2022-01-01" },
      { id: 2, customerId: 1, amount: 2000, date: "2022-01-02" },
      { id: 3, customerId: 2, amount: 550, date: "2022-01-01" },
      { id: 4, customerId: 3, amount: 500, date: "2022-01-01" },
      { id: 5, customerId: 2, amount: 1300, date: "2022-01-02" },
      { id: 6, customerId: 4, amount: 750, date: "2022-01-01" },
      { id: 7, customerId: 3, amount: 1250, date: "2022-01-02" },
      { id: 8, customerId: 5, amount: 2500, date: "2022-01-01" },
      { id: 9, customerId: 5, amount: 875, date: "2022-01-02" }
    ]
  };


app.get('/api/data', (req, res) => {
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
