const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');



const url = 'mongodb+srv://Joey:SirPentious@cluster0.dps0f.mongodb.net/myData?retryWrites=true&w=majority'; // Using ATLAS
const client = new MongoClient(url);

const dbName = 'myData';
const db = client.db(dbName);
const collection = db.collection('Users');

exports.index = (req, res) => {
    var now = new Date();
    let value;
    res.cookie("visited", now.toLocaleString(), { maxAge: 99999 })
    if (req.cookies.visited === undefined) {
        value = "First Time Here :)"
    } else {
        value = req.cookies.visited;
    }
    let cookieInfo = `Last Time Visited : ${value}`;
    res.render('login', {
        cookie: cookieInfo
    })
}

exports.login = async (req, res) => {
    await client.connect();
    const findResult = await collection.find({ username: req.body.username }).toArray();
    if (bcrypt.compareSync(req.body.password, findResult[0].password)) {
        req.session.user = {
            isAuthenticated: true,
            username: findResult[0].username
        }
        res.redirect('/edit/' + findResult[0]._id)
    } else {
        res.redirect('/')
    }
    client.close();
}

exports.create = (req, res) => {
    res.render('create', {
        title: 'Add Person'
    });
};

exports.createPerson = async (req, res) => {
    await client.connect();
    if ((req.body.username && req.body.password) != undefined) {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(req.body.password, salt);
        let person = {
            username: req.body.username,
            password: hash,
            email: req.body.email,
            age: req.body.age,
            question1: req.body.question1,
            question2: req.body.question2,
            question3: req.body.question3
        };
        const insertResult = await collection.insertOne(person);
        client.close();
        res.redirect('/');
    } else {
        res.redirect('/create')
    }

};

exports.edit = async (req, res) => {
    await client.connect();
    const filteredDocs = await collection.find(ObjectId(req.params.id)).toArray();
    client.close();
    res.render('edit', {
        title: 'Edit Person',
        person: filteredDocs[0]
    });
};

exports.editPerson = async (req, res) => {
    await client.connect();
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(req.body.password, salt);
    const updateResult = await collection.updateOne(
        { _id: ObjectId(req.params.id) },
        {
            $set: {
                username: req.body.username,
                password: hash,
                email: req.body.email,
                age: req.body.age,
                question1: req.body.question1,
                question2: req.body.question2,
                question3: req.body.question3
            }
        }
    );
    client.close();
    res.redirect('/');
};

exports.logout = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.log(err)
        } else {
            res.redirect('/');
        }
    })
}

exports.api = async (req, res) => {

}
