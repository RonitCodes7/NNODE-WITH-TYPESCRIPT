import { Request, Response, NextFunction } from "express";
import { CreateVendorInput } from "../dto";
import Vendor from "../model/Vendor.model";
import { generatePassword, generateSalt } from "../utility";

export const createVendor = async ( req: Request, res: Response, next: NextFunction) => {
  const { name, address, pincode, ownerName, foodType, phone,password, email} = <CreateVendorInput>req.body
  const existingUser = await Vendor.findOne({
    name, email, phone
  })
  if( existingUser){
    return res.json({ message: "already Existing user"});
  }
  const saltNumber = await generateSalt()
  const userPassword = await generatePassword(password, saltNumber)
  const vendor = await Vendor.create({
    name, address, pincode, ownerName, foodType, phone, password: userPassword, email, salt: saltNumber, rating: 0, serviceAvailable: false, coverImage: []
  })
  return res.json(vendor)
}
export const getVendors = async ( req: Request, res: Response, next: NextFunction) => {
    const vendors = await Vendor.find({})
    return res.json(vendors)
}
export const getVendorById = async ( req: Request, res: Response, next: NextFunction) => {
    
}