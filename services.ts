import { IContact } from "./models";
import { contactList } from "./data";
import {Guid} from "guid-typescript";

export class ContactServices{

addContact(tempContact:IContact){
  tempContact.id=Guid.create().toString();
contactList.push(tempContact);

}
deleteContact(contactIndex:number){
contactList.splice(contactIndex,1);
  
}
 updateContact(contactIndex:number,tempContact:IContact){
contactList[contactIndex].name=tempContact.name;
contactList[contactIndex].email=tempContact.email;
contactList[contactIndex].address=tempContact.address;
contactList[contactIndex].mobile=tempContact.mobile;
contactList[contactIndex].website=tempContact.website;
contactList[contactIndex].landline=tempContact.landline;  

 }
 getContactById( contactId:string){
  var contact:IContact;
  contact=contactList.find(x => x.id === contactId) as IContact;
  return contact;
}
}