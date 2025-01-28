export interface CreateVendorInput {
    name: string;
    ownerName: string;
    foodType: [ string ];
    pincode: number;
    address: string;
    phone: string;
    email: string;
    password: string;
}
export interface VendorLoginInputs {
    email: string;
    password: string;
}
export interface VendorProfile {
    _id: string;
    name: string;
    email: string;
    foodType: [ string ];
}