import { Request, Response, NextFunction } from "express";
import { VendorLoginInputs } from "../dto";
import { findVendor } from "./Admins.controller";
import { generateSignature, validatePassword } from "../utility";
import Vendor from "../model/Vendor.model";
import Food from "../model/Food.model"

export const vendorLogin = async(req: Request, res:Response, next:NextFunction) =>{
  const { email, password } = <VendorLoginInputs>req.body
  const findSingleVendor = await findVendor('', email);
  if(findSingleVendor){
    const validationOfPassword = await validatePassword(password, findSingleVendor.password, findSingleVendor.salt);
    if(!validationOfPassword){
      return res.json({ message: "Wrong Paassword"})
    }
    const signature = generateSignature({
      name: findSingleVendor.name,
      _id: findSingleVendor.id,
      email: findSingleVendor.email,
      foodType: findSingleVendor.foodType
    })
    return res.json(signature)
  }
  return res.json({"message": "Email/Password is Wrong"})
}
export const getSingleVendorProfile = async(req:Request, res: Response, next: NextFunction) => {
  const { user } = req;
 if(user){
  const userProfile = await Vendor.findById({ _id: user._id})
  return res.json({ me: userProfile})
 }
 return res.json({ message: "No Profile Fetched "})
}

export const updateVendorService = async(req: Request, res:Response, next:NextFunction) => {
  const { user } = req;
  const updateVendorDetails = await Vendor.updateOne({ _id: user?._id}, { ...req.body })
  if( updateVendorDetails ){
    return res.json({ message: "Updated Successfully"});
  }
  return res.json({ message: "Updation failed updateVendorDetails"})
}

export const addFoodForSingleVendor = async(req: Request, res: Response, next: NextFunction) => {
  const { user } = req;
  const files = req.files as [Express.Multer.File]
  const images = files.map((file: Express.Multer.File) => file.filename)
  const food = await Food.create({ ...req.body, vendorId: user?._id, images: images})
  await Vendor.updateOne({_id: user?._id},{$push: { foods: food }})
  return res.json({ message: " Food Added Successfully "})
}