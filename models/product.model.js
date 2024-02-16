const mongoose = require("mongoose");
const productschema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is manadatory"],
    },
    quantity: {
      type: Number,
      required: true,
      dafault: 0,
    },
    price: {
      type: Number,
      required: true,
      dafault: 0,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("crudapis", productschema);
module.exports = Product;

// {
//     "name": "pizzaa",
//     "quantity": 18,
//     "price": 10

// }
