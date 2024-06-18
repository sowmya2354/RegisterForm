const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/employee', { useNewUrlParser: true, useUnifiedTopology: true });

const ListSchema = new mongoose.Schema({
    email: String,
    name: String,
    password: String
});

const ListModel = mongoose.model("list", ListSchema);

app.get('/getList', (req, res) => {
    ListModel.find({})
        .then(result => {
            console.log('Retrieved items:', result);
            res.json(result);
        })
        .catch(error => {
            console.error('Error fetching items:', error);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

app.listen(3001, () => {
    console.log("Server is running on http://localhost:3001");
});
