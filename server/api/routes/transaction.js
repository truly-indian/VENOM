const Transaction = require('../../models/transaction')
const mongoose = require('mongoose')
module.exports = (router)=> {
router.get('/transaction/:year/:month' , (req,res)=> {
    const userId = req.get('userId')
    const month = req.params.month - 1
    const year = req.params.year
    const startDt = new Date(Date.UTC(year,month,1,0,0,0))
    const endDt = new Date(Date.UTC(year,month+1,1,0,0,0))
    const qry = {
        userId:userId,
        transactionDate:{
           $gte:startDt,
           $lt:endDt
        }
    }
    Transaction.find(qry).sort({'transactionDate':1}).exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err=> {
        res.status(500).json({
            message: ' user not found',
            error: err
        })
    })
})

//transaction running balance for specific user
router.get('/transaction/balance/:year/:month' , (req,res)=> {
    const userId = req.get('userId')
    const month = req.params.month - 1
    const year = req.params.year
    const endDt = new Date(Date.UTC(year,month+1,1,0,0,0))
    const pipeline = [
        {
            $match:{
                userId:mongoose.Types.ObjectId(userId),
               
            },
            $match:{
                
                transactionDate: {$lt:endDt}
            }
        },
        {
            $group: {
                _id:null,
                charges: {$um:'$charge'},
                deposits: {$sum:'$deposit'}
            }
        }
    ]
    Transaction.aggregate(pipeline).exec()
    .then(docs => {
        res.status(200).json(docs)
    })
    .catch(err=> {
        res.status(500).json({
            message: ' user not found',
            error: err
        })
    })
})

//create a new transaction document

router.post('/transaction', (req,res)=> {
 let transaction = new Transaction(req.body)
 transaction.save((err,user)=> {
  if(err) return console.log(err)
  res.status(200).json(user)
 })
})

}