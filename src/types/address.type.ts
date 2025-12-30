export type Address = {
    address_id: string;
    address_line1: string;
    address_line2: string;
    city: string;
    state: string;
    country: string;
    pincode: number;
};

export type AddAddress =  Omit<Address, 'address_id'>
export  type DeleteAddress = Pick <Address, 'address_id'>