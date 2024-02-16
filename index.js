const express = require("express");
const mongoose = require("mongoose");
const Product = require("./models/product.model");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/Crud-API")
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.send({ message: "we are good to go" });
});
app.post("/api/products", async (req, res) => {
  try {
    let product = await Product.create(req.body);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: err.message });
  }
});

// update product
app.put("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    const updated = await Product.findById(id);
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// for fetching all products
app.get("/api/products", async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "products not here" });
  }
});
// for fetching single products by their id
app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    res.status(200).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "products not here" });
  }
});

// delete product

app.delete("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (!product) {
      return res.json({ message: "product not found" });
    }
    res.status(200).json({ message: "product deleted successfully" });
  } catch (err) {
    console.log(err);
    res.send({ message: "some error" });
  }
});

app.listen(3000, () => {
  console.log("Server up and running");
});
