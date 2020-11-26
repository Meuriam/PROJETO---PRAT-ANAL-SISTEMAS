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
    //Creating new user
     const budget = new Budget({
       contratado: req.body.id,
       contratante: req.user._id,
       date: req.body.selectedDate,
       status: 0,
       value: 0,
       service: req.body.selectedServices
     })

    try {
         const savedBudget = await budget.save();
         res.status(200).json({
             message: `Orçamento solicitado com sucesso!`
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
    var posts = []
    if (req.user.type == 'contratante'){
         posts = await Budget.find({contratante: req.params.userId})
        .populate('contratado')
        .populate('contratante');
    }

    else {
        posts = await Budget.find({contratado: req.params.userId})
        .populate('contratado')
        .populate('contratante'); 
    }

    if (posts.length <= 0) return res.status(404).json({
        message: "Nenhum orçamento encontrado"
    })

    res.status(200).send({posts: posts})

})

/**
 * @route   PUT api/budgets/:budgetId
 * @desc    Edit the budgets 
 * @access  Public
 */

router.put('/:budgetId', auth, async (req, res) => {
    // Find the user on db with ID
    try {
        const budget = await Budget.findByIdAndUpdate(req.params.budgetId, req.body, {useFindAndModify: false});
        
        res.status(200).json({
            message: `Orçamento atualizado com sucesso!`
        })
    } catch (error) {
        res.status(500).json({
            message: `Não foi possível atualizar o orçamento. ${error.message}`
        })
    }


})

module.exports = router;