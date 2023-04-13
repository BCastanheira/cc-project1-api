import express from 'express';
import { MongoClient } from 'mongodb';

console.log("test for terraform 2")

const app = express();
app.use(express.json())

const port = process.env.PORT || 3000;
var uri = process.env.DATABASE_URI;

if (process.env.ENVIRONMENT == 'local') {
    uri = `mongodb://${uri}:27017`
}

const client = new MongoClient(uri);
const messages_collection = client.db('cc-project1').collection('messages')

app.get('/messages', (req, res) => {
    (async() => {
        res.send(await messages_collection.find().toArray());
    })();
});

app.post('/messages', (req, res) => {
    messages_collection.insertOne(req.body);
    res.send(req.body);
});

app.delete('/messages', (req, res) => {
    messages_collection.deleteMany({});
    res.sendStatus(200);
});

app.listen(port, () => console.log(`App started on ${port}!`));