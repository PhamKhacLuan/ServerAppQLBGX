const express = require('express')
const path = require('path')
const morgan = require('morgan')
const session = require('express-session');
const store = new session.MemoryStore();
// const middleware = require('./app/Middlewares/SortMiddlewares')
const app = express()

const dotenv = require('dotenv');

dotenv.config();

const port = process.env.PORT
const route = require('./routes')
const db = require('./config/db')
db.connect();


app.use(morgan('combined'))
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

//session
app.use(session({
    store,
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}))


route(app);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
