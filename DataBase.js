const { default: mongoose } = require('mongoose');
const db = require('mongoose');

// const url = 'mongodb://127.0.0.1:27017/todolistDB';

const url = 'mongodb+srv://admin-Gopal:Gopal2004@cluster0.dniqr.mongodb.net/todolistDB';
// const url = "mongodb+srv://admin-Gopal:<db_password>@cluster0.dniqr.mongodb.net/";


mongoose.connect(url, {
    useNewUrlParser: true
})
    .then(() => {
        console.log('DataBase Connected Succesfully.')
    })
    .catch((err) => {
        console.log('Connection to DataBase Failed: ' + err)
    })


const UserSchema = new mongoose.Schema({
    item: {
        type: String,
        require: [true, 'Invalid Entry, Enter the Data to ToDo List.']
    },
    route: String
})

module.exports = mongoose.model('list', UserSchema);