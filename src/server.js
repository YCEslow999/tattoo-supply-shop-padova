import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import products from './models/products.js';
import brands from './models/brands.js';

const app = express();
const PORT = 5000;
import Stripe from 'stripe';
import dotenv from 'dotenv';

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



app.use(cors());
app.use(express.json());






// Connessione al database
mongoose.connect(
  "mongodb://localhost:27017/tattoo_supply"
)
  .then(() => {

    console.log("MongoDB connesso");
    app.listen(PORT, () => {
      console.log(`Server avviato sulla porta ${PORT}`);
    })

  })
  .catch(err => console.log("Connessione a MongoDB fallita", err));







//PAGINA INCHIOSTRO
app.get("/api/products/ink_products", async (req, res) => {
  try {
    const inkProducts = await products.find({ category: "Inchiostro" });
    res.json(inkProducts);
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }

});


//PAGINA MACCHINETTE
app.get("/api/products/machine_products", async (req, res) => {
  try {
    const machineProducts = await products.find({ category: "Macchinette" });
    res.json(machineProducts);
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }

});

//GET ALL PRODUCTS (per il carrello)
app.get("/api/products/all", async (req, res) => {
  try {
    const allProducts = await products.find({});
    res.json(allProducts);
  } catch (err) {
    res.status(500).json({ error: "Errore nel recupero dei dati" });
  }
});


//STRIPE
app.post("/api/checkout", async (req, res) => {
  try {
    const { items } = req.body;
    // items = [{ productId, variantId?, quantity }]

    const productIds = items.map(i => i.productId);

    const dbProducts = await products.find({
      _id: { $in: productIds }
    });

    const lineItems = items.map(item => {
      const product = dbProducts.find(
        p => p._id.toString() === item.productId
      );
      if (!product) throw new Error("Prodotto non trovato");

      let price, name;

      if (item.variantId && product.variants?.length > 0) {
        // caso con variante
        const variant = product.variants.id(item.variantId);
        if (!variant) throw new Error("Variante non trovata");
        if (variant.stock < item.quantity)
          throw new Error(`Stock insufficiente per ${product.name}`);

        price = variant.price;
        name = `${product.name} - ${variant.size_ml}ml`;
      } else {
        // caso senza varianti
        if (product.stock < item.quantity)
          throw new Error(`Stock insufficiente per ${product.name}`);

        price = product.price;
        name = product.name;
      }

      return {
        price_data: {
          currency: "eur",
          product_data: {
            name,
            images: [product.image_url],
          },
          unit_amount: Math.round(price * 100), // centesimi
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: lineItems,
      success_url: "http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: "http://localhost:3000/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err.message);
    res.status(400).json({ error: err.message });
  }
});


//ENDPOINT PER HEADER
app.get("/api/brands/:category", async (req, res) => {
  try {
    const { category } = req.params;


    const brandsVar = await brands.find(
      { category },
      { name: 1, image_url: 1, _id: 0 }
    );


    res.json(brandsVar);

  } catch (err) {
    res.status(500).json({ error: "Errore recupero brands" });
  }
});