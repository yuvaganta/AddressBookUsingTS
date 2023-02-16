import { contactList } from "./data";
import { Guid } from "guid-typescript";
export class ContactServices {
    addContact(tempContact) {
        tempContact.id = Guid.create().toString();
        contactList.push(tempContact);
    }
    deleteContact(contactIndex) {
        contactList.splice(contactIndex, 1);
    }
    updateContact(contactIndex, tempContact) {
        contactList[contactIndex].name = tempContact.name;
        contactList[contactIndex].email = tempContact.email;
        contactList[contactIndex].address = tempContact.address;
        contactList[contactIndex].mobile = tempContact.mobile;
        contactList[contactIndex].website = tempContact.website;
        contactList[contactIndex].landline = tempContact.landline;
    }
    getContactById(contactId) {
        var contact;
        contact = contactList.find(x => x.id === contactId);
        return contact;
    }
}
