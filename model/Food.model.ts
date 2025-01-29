import mongoose, { Model, Schema, Document } from "mongoose";

interface FoodDoc extends Document {
    name: string;
    description: string;
    category: string;
    foodType: [ string ];
    readyTime: number;
    price: number;
    rating: number
}

const FoodSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    foodType: [
      {
        type: String,
      },
    ],
    readyTime: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
   rating: Number,
   vendorId: {
      type: String,
      required: true,
    },
  images: [{
      type: String,
      required: true,
    }]
  },
  {
    toJSON: {
      transform(doc, ref) {
        delete ref._v;
        delete ref.createdAt, delete ref.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Vendor = mongoose.model<FoodDoc>("food", FoodSchema);

export default Vendor;
