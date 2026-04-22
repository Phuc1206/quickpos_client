

export interface ICustomerPayload {
    name: string;
    phoneNumber: string;
    address: string;
}

export interface ICustomerDetail extends ICustomerPayload {
    _id?: string;
    isDeleted?: boolean;
}

