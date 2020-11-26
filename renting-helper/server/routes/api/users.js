const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router();


// Import middleware
const auth = require('../../middlewares/auth')


// Import database schemas
const User = require('../../models/User')
const UserContratado = require('../../models/UserContratado')
const UserContratante = require('../../models/UserContratante')

// Import validation schemas
const UserValidation = require('../../utils/validation')
//const CreateUserValidation = UserValidation.options({presence: 'required'})
//const UpdateUserValidation = UserValidation.options({presence: 'optional'})

// Whitelist for filtering user data
const whitelist = require('../../utils/whitelists').user

/**
 * @routes /api/users/debug
 * @desc Route for returning info about all users 
 * @access Public (Temporary, for debug purposes only)
 */

router.get('/debug', async (req, res) => {

    const users = await User.find();
    if (users.length <= 0) return res.status(404).send({
        message: `Nenhum usuário encontrado`
    })

    res.status(200).send(users)
})

/**
 * @routes /api/users
 * @desc Route for returning info about all users
 * @access Private (Authenticated only)
 */

router.get('/', auth, async (req, res) => {

    const users = await User.find({}, whitelist);
    if (users.length <= 0) return res.status(404).send({
        message: `Nenhum usuário encontrado`
    })

    res.status(200).send(users)
})

/**
 * @routes /api/users
 * @desc Route for search users
 * @access Private (Authenticated only)
 */

router.post('/search', auth, async (req, res) => {

    const { 
        service
    } = req.body

    const {
        state 
    } =  req.user

    const users = await User.find({state: state, services: service}, whitelist);
    if (users.length <= 0) return res.status(404).send({
        message: "Não existem prestadores em sua região para esse serviço."
    })

    res.status(200).send(users)
})


/**
 * @route   GET /api/users/:id
 * @desc    Return data from the user on the URL
 * @access  Private (Authenticated only)
 */

router.get('/:id', auth, async (req, res) => {

    // Find the user on db with ID
    const user = await User.findById(req.params.id, whitelist)
    if (!user) return res.status(404).json({
        message: "Usuário não encontrado"
    })

    res.status(200).send(user)

})

/**
 * @route   PUT api/users/:id
 * @desc    Update existent user
 * @access  Private (Authenticated only)
 */

router.put('/:id', auth, async (req, res) => {

    // Find the user on db with email
    const user = await User.findById(req.params.id)
    if (!user) return res.status(400).json({
        message: "Usuário não encontrado."
    })

    if(req.body.newPassword){
        // XOR hash and input password to validate 
        const oldPassword = await bcrypt.compare(req.body.oldPassword, user.password)
        if (!oldPassword) return res.status(404).json({
            message: "Senha antiga incorreta."
        })

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.newPassword, salt)

        delete req.body['oldPassword'];
        delete req.body['newPassword'];

        req.body.password = hashedPassword
    } else {
        delete req.body['password'];
        delete req.body['newPassword'];
        delete req.body['oldPassword'];
    }

    //const {
    //    error
   // } = await UpdateUserValidation.validate(req.body)
 //   if (error) return res.status(400).json({
  //      message: error.details[0].message
//})

    try {
        let savedUser = null

        switch (req.body.type) {
            case 'contratante':
                savedUser = await UserContratante.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
                break;
            case 'contratado':
                savedUser = await UserContratado.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
                break;
            default:
                savedUser = await User.findByIdAndUpdate(req.params.id, req.body, {useFindAndModify: false});
                break;
        }
        
        res.status(200).json({
            message: `Usuário ${savedUser.email} atualizado com sucesso!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Não foi possível atualizar o usuário. ${error.message}`
        })
    }

})

/**
 * @route   POST api/users/register
 * @desc    Register new user
 * @access  Public
 */

router.post('/register', async (req, res) => {

    //const {
     //   error
   // } = await CreateUserValidation.validate(req.body)
    //if (error) return res.status(400).json({
    //    message: error.details[0].message
    //})

    // Find the user on db with email
    const emailExists = await User.findOne({
        email: req.body.email
    })
    if (emailExists) return res.status(400).json({
        message: "Cadastro já existente. Entre em sua conta."
    })


    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    // Creating new user
    const user = new User({

        // Generic data for all users
        type: req.body.type,
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        birthday: req.body.birthday,
        state: req.body.state,

        // mongoose.discriminator = type | only if is 'contratado' type
        services: req.body.services

    })

    try {
        const savedUser = await user.save();
        res.status(200).json({
            message: `Usuário ${savedUser.email} criado com sucesso!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Não foi possível cadastrar o usuário. ${error.message}`
        })
    }

})


/**
 * @route   POST api/users/login
 * @desc    Login user
 * @access  Public 
 */

router.post('/login', async (req, res) => {

    // Find the user on db with email
    const user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(404).json({
        message: "Usuário não encontrado."
    })

    // XOR hash and input password to validate 
    const pass = await bcrypt.compare(req.body.password, user.password)
    if (!pass) return res.status(400).json({
        message: "Senha incorreta."
    })

    try {
        
        const options = {
            issuer: 'https://openbook.now.sh'
        };

        const payload = {_id: user._id}

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, options);

        res.status(200).json({
            userId: user._id,
            token: token
        })
    } catch (error) {
        res.status(500).json({
            message: "Falha na autenticação."
        })
    }
})

module.exports = router;