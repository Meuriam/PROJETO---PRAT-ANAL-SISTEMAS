const router = require('express').Router();
// Import middleware
const auth = require('../../middlewares/auth')

const Budget = require('../../models/Budget')

/**
 * @route   POST api/budgets
 * @desc    Request new budgets
 * @access  Public
 */

router.post('/', auth, async (req, res) => {
    console.log(req.user)
    //Creating new user
     const budget = new Budget({
       contratado: req.body.id,
       contratante: req.user._id,
       status: 0,
       service: req.body.selectedServices
     })

    try {
         const savedBudget = await budget.save();
         res.status(200).json({
             message: `Orçamento ${savedBudget.service} criado com sucesso!`
         })
     } catch (error) {
         res.status(500).json({
            message: `Não foi possível solicitar o Orçamento. ${error.message}`
        })
     }

})

/**
 * @route   GET api/budgets:userId
 * @desc    Returns the budgets from the user
 * @access  Public
 */

router.get('/:userId', auth, async (req, res) => {

    // Find the user on db with ID
    const posts = await Post.find({contratante: req.params.userId})
        .populate('contratado')
        .populate('contratante');
    
    if (posts.length <= 0) return res.status(404).json({
        message: "Nenhum post encontrado"
    })

    res.status(200).send({posts: posts})

})

module.exports = router;