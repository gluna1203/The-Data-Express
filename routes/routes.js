const { MongoClient, ObjectId } = require('mongodb')

const url = 'mongodb+srv://Joey:SirPentious@cluster0.dps0f.mongodb.net/myData?retryWrites=true&w=majority'; // Using ATLAS
const client = new MongoClient(url);

const dbName = 'myData';
const db = client.db(dbName);
const collection = db.collection('Users');

exports.index = (req, res) => {
    res.render('login')
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Add Person'
    });
};

exports.createPerson = async (req, res) => {
    await client.connect();
    let person = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        age: req.body.age,
        question1: req.body.question1,
        question2: req.body.question2,
        question3: req.body.question3
    };
    const insertResult = await collection.insertOne(person);
    client.close();
    res.redirect('/');
};