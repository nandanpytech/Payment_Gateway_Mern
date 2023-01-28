const express=require("express")
const cors=require("cors")
const stripe=require ("stripe")("sk_test_51MUuBZSGIUsypozAOjxbsp8T319jPH3Qac0IFiiNHLUGfalUgelkjSHmWu00LPmkoZuo2Uzy9WoopURMDWGHKmRX00qi8FGjeE");
const uuid=require("uuid")
const app=express()

//middleware
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("hii")
})

app.post("/payment",(req,res)=>{
    stripe.setPublishableKey('pk_test_51MUuBZSGIUsypozABaJlDxn3OyTDGrybo8sz8lPutbbHtPGGhhSBMC2Hz8PESl5pB8Oxlm43LTb2O13oTGoISdac00TRb7cdC4');
    const {product,token}=req.body
    const idempontencykey=uuid()

    return stripe.customers.create({
        email:token.email,
        source:token.id
    }).then(customer=>{
        stripe.charges.create({
            amount:product.price*100,
            currency:'usd',
            customer:customer.id,
            receipt_email:token.email,
            description:`purchases ${product.name}`,
            shipping:{
                name:token.card.name,
                address:{
                    country:token.card.address_country
                }
            }

        },{idempontencykey})
    })
    .then(res=>res.status(200).json(result))
    .catch(err=>console.log(err))
})


//listening
app.listen(8000,(req,res)=>{
    console.log("listening")
})