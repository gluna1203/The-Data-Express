const express = require('express'),
    pug = require('pug'),
    path = require('path'),
    routes = require('./routes/routes.js'),
    expressSession = require('express-session');

const app = express();


app.set('view engine', 'pug');
app.set('views', __dirname + "/views");
app.use(express.static(path.join(__dirname, '/public')));

app.use(expressSession({
    secret: 'wh4t3v3r',
    saveUninitialized: true,
    resave: true
}));

const urlencodedParser = express.urlencoded({
    extended: false
})

const checkAuth = (req, res, next) => {
    if (req.session.user && req.session.user.isAuthenticated) {
        next();
    } else {
        res.redirect('/');
    }
}

app.get('/', routes.index)
app.post('/', urlencodedParser, routes.login)
// app.get('/edit', checkAuth, routes.edit)
app.get('/create', routes.create);
app.post('/create', urlencodedParser, routes.createPerson);
app.get('/edit/:id', checkAuth, routes.edit);
app.post('/edit/:id', checkAuth, urlencodedParser, routes.editPerson);


app.listen(3000);