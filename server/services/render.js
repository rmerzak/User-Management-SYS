const axios = require('axios');
const { param } = require('../routes/router');

exports.homeRoutes = (req, res) => {
    axios.get('http://localhost:3000/api/users')
    .then(function(responce) {
        console.log(responce.data);
        res.render('index',{users: responce.data});
    })
    .catch (err => {
        res.send(err);
    })
}

exports.add_user = (req, res) => {
    res.render('add_user');
}
exports.update_user = (req, res) =>{
    axios.get('http://localhost:3000/api/users', { params : { id : req.query.id }})
        .then(function(userdata){
            console.log(userdata);
            res.render('update_user', { user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
}