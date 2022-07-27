var Userdb = require('../model/model')

// create and save user

exports.create= (req,res) => {
    // validate a request
    // if the body is empty
    if (!req.body)
    {
        res.status(400).send({message: "Content can not be empty"});
        return ;
    }
// question for tomorow whe i used body it show me that there is no data in name or email but when i change to query it worck good
    // nex user

    const user = new Userdb (
        {
            name: req.body.name,
            email:req.body.email,
            gender: req.body.gender,
            status: req.body.status
        }
    )
        /// save user in the database
        user.save(user).then(data => {
            //res.send(data);
            res.redirect('/')
        }).catch(err => {
            res.status(500).send({message: err.message || "Some error occurred while creating a create operation"})
        })
}


exports.find= (req,res) => {
    const id = req.query.id;
    if (id) {
        Userdb.findById(id)
        .then(data =>{
            if (!data)
            {
                res.status(404).send({message: "not found user with id " + id})
            }
            else {
                res.send(data);
            }
        })
        .catch(err => {
            res.status(500).send({message: 'error retrieving user with id ' + id})
        })
    }
    else
    {
        Userdb.find()
        .then(user =>{
            res.send(user)
        })
        .catch(err => {
            res.status(500).send({message: err.message || "Error Occurred while retriving user information"})
        })
    }
}

exports.update= (req,res) => {
    if(!req.body) {
        return res.status(400).send({message: "Data to update can not be empty"})
    }

    const id = req.params.id;
    Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
    .then(data =>
        {
            if(!data){
                res.status(404).send({message:`Cannot Update user with${id} Maybe user not found`})
            } else {
                res.send(data);
            }
        })
        .catch(err =>{
            res.status(400).send({message: 'update not done ..'})
        })

}

exports.delete= (req,res) => {
    const id = req.params.id;

    Userdb.findOneAndDelete(id)
    .then(data => {
        if (!data)
        {
            res.status(404).send({message:`Cannot delete user with${id} Maybe user not found`})
        } else {
            res.send({message: 'user was deleted successfully!'})
        }
    })
    .catch(err => {
        res.status(500).send({message: 'delete not done ..'})
    })
}