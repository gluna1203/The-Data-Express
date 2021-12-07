const { MongoClient, ObjectId } = require('mongodb')
const bcrypt = require('bcryptjs');
var XMLHttpRequest = require('xhr2');
var xhr = new XMLHttpRequest();



const url = 'mongodb+srv://Joey:SirPentious@cluster0.dps0f.mongodb.net/myData?retryWrites=true&w=majority'; // Using ATLAS
const client = new MongoClient(url);

const dbName = 'myData';
const db = client.db(dbName);
const collection = db.collection('Users');

exports.index = (req, res) => {
    // const json = "http://localhost:3000/api";
    

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
        if (findResult[0].Admin == "True") {
            req.session.admin = {
                isAuthenticated: true,
                username: findResult[0].username
            }
            req.session.user = {
                isAuthenticated: true,
                username: findResult[0].username
            }
        } else {
            req.session.user = {
                isAuthenticated: true,
                username: findResult[0].username
            }
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

    if (req.body.password == '') {
        const findResult = await collection.find({ username: req.body.username }).toArray();
        const updateResult = await collection.updateOne(
            { _id: ObjectId(req.params.id) },
            {
                $set: {
                    username: req.body.username,
                    password: findResult[0].password,
                    email: req.body.email,
                    age: req.body.age,
                    question1: req.body.question1,
                    question2: req.body.question2,
                    question3: req.body.question3
                }
            }
        );
    } else {
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
    }


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

exports.account = (req, res) => {
    res.render('account')
}

exports.admin = async (req, res) => {
    await client.connect();
    if (req.body.Admin == "Yes") {
        const updateResult = await collection.updateOne({ username: req.body.username },
            {
                $set: {
                    Admin: "True"
                }
            }
        )
        res.redirect('/')
    } else if (req.body.delete == "Yes") {
        const deleteResult = await collection.deleteOne({ username: req.body.username })
        res.redirect('/')
    } else {
        res.redirect('/')
    }
    client.close();
}

exports.api = async (req, res) => {
    await client.connect();
    var tempArray = [];
    const questionOneA = await collection.find({ question1: "Yes"}).count();
    const questionOneB = await collection.find({ question1: "No"}).count();
    const questionOneC = await collection.find({ question1: "Possibly"}).count();
    const questionOneD = await collection.find({ question1: "Absolutely not"}).count();
    tempArray.push(questionOneA)
    tempArray.push(questionOneB)
    tempArray.push(questionOneC)
    tempArray.push(questionOneD)

    const questionTwoA = await collection.find({ question2: "Green"}).count();
    const questionTwoB = await collection.find({ question2: "It's Green!"}).count();
    const questionTwoC = await collection.find({ question2: "Definately not a color that isn't green"}).count();
    const questionTwoD = await collection.find({ question2: "I thought it was something different but it's green"}).count();
    tempArray.push(questionTwoA)
    tempArray.push(questionTwoB)
    tempArray.push(questionTwoC)
    tempArray.push(questionTwoD)

    const questionThreeA = await collection.find({ question3: "Yes"}).count();
    const questionThreeB = await collection.find({ question3: "No"}).count();
    const questionThreeC = await collection.find({ question3: "They are theft"}).count();
    const questionThreeD = await collection.find({ question3: "Do to the IRS, I am obligated to say no"}).count();
    tempArray.push(questionThreeA)
    tempArray.push(questionThreeB)
    tempArray.push(questionThreeC)
    tempArray.push(questionThreeD)

    res.json(tempArray)
    client.close();
}
