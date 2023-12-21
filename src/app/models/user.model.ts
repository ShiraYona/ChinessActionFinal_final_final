import { Gift } from "./gift.model";

export class User
{
    id!:number;
    userName!:string;
    password!:string;
    creditCard!:string;
    tickets!:Gift[];
    
}