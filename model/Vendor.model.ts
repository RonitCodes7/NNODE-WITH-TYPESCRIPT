import mongoose, { Model, Schema, Document } from "mongoose";

interface VendorDoc extends Document {
  name: string;
  ownerName: string;
  foodType: [string];
  pincode: number;
  address: string;
  phone: string;
  email: string;
  password: string;
  salt: string;
  serviceAvailable: boolean;
  coverImage: [string];
  rating: number;
  foods: any;
}

const VendorSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    pincode: {
      type: Number,
      required: true,
    },
    foodType: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    serviceAvailable: {
      type: Boolean,
      default: false,
    },
    coverImage: [
      {
        type: String,
      },
    ],
    rating: {
      type: Number,
      default: 0,
    },
    // foods: {
    //     type: [Schema.Types.ObjectId],
    //     ref: 'Food'
    // }
  },
  {
    toJSON: {
      transform(doc, ref) {
        delete ref.password;
        delete ref.salt, delete ref.createdAt, delete ref.updatedAt;
      },
    },
    timestamps: true,
  }
);

const Vendor = mongoose.model<VendorDoc>("vendor", VendorSchema);

export default Vendor;
