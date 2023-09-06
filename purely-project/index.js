let express = require(`express`);
let app = express();
let port = 3005;

app.listen(port, function () {
    console.log(`http://localhost:${port}`);
});

// Настройка CORS
let cors = require('cors');
app.use(cors({ origin: 'http://localhost:5173' }));

// Настройка POST-запроса — JSON
app.use(express.json());

// Настройка БД
let mongoose = require('mongoose');
const dayjs = require('dayjs');
mongoose.connect('mongodb://127.0.0.1:27017/purely-data');

const serviceSchema = new mongoose.Schema({
    image: String,
    title: String,
    description: String,
    price: Number
});

const Service = mongoose.model('services', serviceSchema);

const userSchema = mongoose.Schema({
    email: String,
    password: String,
    isRegistred: Boolean,
    products: Array
});

const User = mongoose.model('users', userSchema);

app.get('/services', async function (req, res) {
    const services = await Service.find();
    res.send(services);
});

app.get('/services/id', async function (req, res) {
    const { id } = req.query;
    const services = await Service.findOne({ _id: id });
    res.send(services);
});

app.get('/buy/id', async function (req, res) {
    const { id } = req.query;
    const buy = await Service.findOne({ _id: id });
    res.send(buy);
});

app.post('/registers', async function (req, res) {
    const { email } = req.body;
    const { password } = req.body;
    const { isRegistred } = req.body;
    const { products } = req.body;

    const users = new User({
        email: email,
        password: password,
        isRegistred: isRegistred,
        products: products
    });
    console.log(email, password, isRegistred, products);
    await users.save();

    res.send('ok');
});

app.post('/users', async function (req, res) {
    const { email } = req.body;
    const { password } = req.body;

    let users = await User.find();
    for (user of users) {
        if (email == user.email && password == user.password) {
            app.get('/users/account', async function (req, res) {
                let accountUsers = await User.findOne({ email });
                // console.log(accountUsers.products)
                app.post('/products/send', async function (req, res) {
                    const { title } = req.body;
                    const { price } = req.body;
                    const { date } = req.body;
                    const { timer } = req.body;

                    const products = {
                        "title": title,
                        "price": price,
                        "date": date,
                        "timer": timer
                    }
                    
                    accountUsers.products.push(products)
                    console.log(accountUsers.products)
                    await accountUsers.save()

                    res.send('ok');
                });
                res.send(accountUsers);
            });
        } else {
            res.status(401)
        }
    }
});

const registerSchema = mongoose.Schema({
    username: String,
    phone: Number
});

const Register = mongoose.model('register', registerSchema)

app.post('/register/phone', async function (req, res) {
    const {username} = req.body;
    const {phone} = req.body;

    const reg = new Register({
        username: username,
        phone: phone
    });

    await reg.save();

    res.send('ok')
});

