const express = require('express')
const Stripe = require('stripe')
const cors = require('cors')

const app = express()
const port = 3001

const stripe =  new Stripe('secret key') //Se le pasa la llave secreta en variables de entorno

app.use(cors({origin: 'http://localhost:3000'})) //antes de todo aceptar un origen 
app.use(express.json())
app.post('/api/checkout', async(req,res)=>{
  console.log(req.body)
  try {
    const {id, amount}= req.body
    const payment = await stripe.paymentIntents.create({
    amount,
    currency: 'GBP',
    description: 'Filmcoin',
    payment_method: id,
    confirm: true
  })

  console.log(payment)
  res.send('Payment successfull')
  } catch (error) {
    res.send(`Error in backend: ${error}`)
  }
  
})

app.listen(port,()=>{
  console.log('server on port: ', port
  )
})