let express = require("express");
let dotenv = require("dotenv");
const { findUserAndUpdate } = require("./controller");
let imagesRouter = express.Router();
dotenv.config()
const stripe = require('stripe')(process.env.secret_key);

imagesRouter.get("/", async(req, res)=>{
    res.json({msg:"Welcome"});
})

imagesRouter.post("/booking/payment-page/user-pay/:id/:userId", async (req, res) => {
    try {
        let bike = req.body;
        // let {startDate, endDate, days, price} = req.body;
        let { id } = req.params;
        let {userId} = req.params;

        let lineItems = bike.map((prod) => ({
            price_data: {
                currency: "inr",
                product_data: {
                    name: prod.name
                },
                unit_amount: prod.priceDetail * 100
            },
            quantity: prod.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: lineItems,
            mode: "payment",
            success_url: `https://master--zippy-mermaid-f891a4.netlify.app/success?userId=${encodeURIComponent(userId)}`,
            cancel_url: "https://master--zippy-mermaid-f891a4.netlify.app/cancel"
        });

        return res.json({
            id: session.id
        });
    } catch (error) {
        console.error('Error creating checkout session:', error);
        return res.status(500).json({ status: 500, msg: "server error" });
    }
});

module.exports = imagesRouter;