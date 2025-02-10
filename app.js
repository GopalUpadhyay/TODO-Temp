const express = require('express');
const bodyParser = require('body-parser');
const db = require('./DataBase');
// Using the date.js modulegit 
const date = require(__dirname + '/date.js');


const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Handling the static added folder within the publuc folder.
// Because the server can't access the files within another folder directly.
app.use(express.static('public'));


// Setting EJS.
// (EJS) are known as (templates) which we can create and (use/Change) according to our need.
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.redirect('/home');
})

app.get('/:route', async (req, res) => {
    const route = req.params.route;
    let temp = await db.find({ route: route }, { item: 1, _id: 1 });

    res.render("lists", { listTitle: route, NewItems: temp })
})

app.post('/:route', async (req, res) => {
    const route = req.params.route;
    let item = await db.find({ item: req.body.NewItem }, { route: 1, _id: 0 });

    let check = false;
    for (let i = 0; i < item.length; i++) {
        if (item[i].route == route) check = true;
    }

    if ((item.length === 0 || check === false) && req.body.NewItem != '') {
        await db.create({
            item: req.body.NewItem,
            route: route
        })
    }
    else {
        console.log('Repeated item, Plese Change Your Item.');
    }

    res.redirect('/' + route);
})


app.get('/update/:id', async (req, res) => {
    let id = req.params.id;
    let temp = await db.find({ _id: id });
    temp = 'update/' + temp[0].id;
    res.render('lists', { listTitle: temp, NewItems: '' });
})

app.post('/update/:id', async (req, res) => {
    let temp = req.body.NewItem;
    let id = req.params.id;
    let returnRoute = await db.find({ _id: id });
    returnRoute = returnRoute[0].route;
    await db.findOneAndUpdate({ _id: id }, { item: temp }, { new: true });
    res.redirect('/' + returnRoute);
})


app.get('/delete/:id', async (req, res) => {
    let id = req.params.id;
    let temp = await db.findOneAndDelete({ _id: id });
    res.redirect('/' + temp.route);
})



// Server Port: 3000.
app.listen(3000, (req, res) => {
    console.log("Server is running on port 3000" + '\n');
})