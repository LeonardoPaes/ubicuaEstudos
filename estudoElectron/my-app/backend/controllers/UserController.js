const axios = require('axios');
const User = require('../models/User');

module.exports ={
    async consultarUsers(req, res){
        const users = await User.find();
        return res.json(users)
    },

    async consultarUser(req, res){
        const { _id } = req.body;

        let user = User.findOne({_id});

        return res.json(user)
    },

    async cadastrarUser(req, res){
        const { _id, nome, nacionalidade, pontos } = req.body;

        let user = await User.findOne({_id});

        if (!user) {
            user = await User.create({
                _id,
                nome,
                nacionalidade,
                pontos,
            });
        }

        return res.json(user);
    }
}