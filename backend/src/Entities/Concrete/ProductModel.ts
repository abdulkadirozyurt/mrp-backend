import mongoose, { Schema } from "mongoose";
import IProductModel from "./../Abstract/IProductModel";

const productSchema = new Schema<IProductModel>({
  name: { type: String, required: true, unique: true, lowercase: true },
  description: { type: String },
  billOfMaterials: [
    {
      material: { type: mongoose.Schema.Types.ObjectId, ref: "Material" },
      quantity: { type: Number, required: true },
    },
  ],
}, { timestamps: true });

const ProductModel = mongoose.model<IProductModel>('Product', productSchema);
export default ProductModel;
