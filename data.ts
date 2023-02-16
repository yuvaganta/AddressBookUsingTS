import { IContact } from "./models";
import {Guid} from "guid-typescript";
import { ContactServices } from "./services";
export var contactList : IContact[];
let contactServices:ContactServices=new ContactServices();
contactList=[];