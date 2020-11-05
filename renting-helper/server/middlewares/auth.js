const jwt = require('jsonwebtoken')
const User = require('../models/User')

module.exports = async function auth(req, res, next) {
    
    const bearer = req.headers['authorization']
    if(!bearer) return res.status(401).json({ message: "Não autenticado. Por favor faça o login"})
        
    try {
        const token = bearer.split(' ')[1]
        var decoded = jwt.verify(token, process.env.TOKEN_SECRET)
    } catch(err) {
        res.status(400).json({ message: "Token de autenticação inválido."})
    }

    const user = await User.findById(decoded._id)
    if(!user) return res.status(400).json({ message: "Usuário do token inexistente"})
    
    req.user = user
    
    next()
}