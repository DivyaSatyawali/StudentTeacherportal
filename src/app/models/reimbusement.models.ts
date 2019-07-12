export class REIMBURSEMENT
{
    name:String;
    event_name:String;
    amount:String;
    imgUrl:String; 
    description:String;
    bill_image:Array<File> = [];
    bills:string[]=[];
    message:string;
}