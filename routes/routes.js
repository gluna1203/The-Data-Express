const { MongoClient, ObjectId }= require('mongodb')
const bcrypt = require('bcryptjs');

const url = 'mongodb+srv://Joey:SirPentious@cluster0.dps0f.mongodb.net/myData?retryWrites=true&w=majority'; // Using ATLAS
const client = new MongoClient(url);

const dbName = 'myData';
const db = client.db(dbName);
const collection = db.collection('Users');

exports.index = (req, res) => {
    res.render('login')
}

const makeHash = the_str => {
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(the_str, salt, (err, my_hash) => {
            return my_hash;
        });
    });
};

const hashComplete = (password, the_hash) => {
    bcrypt.compare(password, the_hash, (err, res) =>{
    })
}


exports.createPerson = async (req, res) => {
    await client.connect();
    if ((req.body.usernameCreate && req.body.passwordCreate) != undefined){
        
        let person = {
            username: req.body.usernameCreate,
            password: makeHash(req.body.passwordCreate)
        }
        const insertResult = await collection.insertOne(person);
        client.close();
        res.redirect('/')
    } else {

    }
}

exports.login = async (req, res) => {
    await client.connect();
    const findResult = await collection.find({username: req.body.username}).toArray();
    if (bcrypt.compare(req.body.password, findResult.password)){
        req.session.user = {
            isAuthenticated: true,
            username: findResult.username
        }
        res.redirect('/edit')
    } else {
        res.redirect('/')
    }
    client.close();
}

exports.edit = async (req, res) => {
    res.render('edit');
}