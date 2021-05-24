import { District } from "./district.model";

export class Country{
    public id:any;
    public name:any;
    public code:any;
    public isActive:any;

    public district:Array<District>  = new Array<District>();

}