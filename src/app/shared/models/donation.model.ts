export class DonationModel {

    constructor(
        _id:string,
        donorName:string,
        email:string,
        phone:any,
        paymentId:string,
        status:string,
        amount:number,
        order:any,
        payment_method:any,
        coin:string,
        description:string,
        createdAt:any,
        updatedAt:any
    ){
        this._id = _id;
        this.donorName = donorName;
        this.email = email;
        this.phone = phone;
        this.paymentId = paymentId;
        this.status = status;
        this.amount = amount;
        this.order = order;
        this.payment_method = payment_method;
        this.coin = coin;
        this.description = description;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    _id!:string;
    donorName!:string;
    email!:string;
    phone:any;
    paymentId!:string;
    status!:string;
    amount!:number;
    order:any;
    payment_method:any;
    coin!:string;
    description!:string;
    createdAt:any;
    updatedAt:any;

}