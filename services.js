"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactServices = void 0;
class ContactServices {
    addContact(contactList, contact) {
        contactList.push(contact);
    }
    deleteContact() { }
    updateContact() { }
    getContactById(contactList, contactId) {
        var contact;
        contact = contactList.find(x => x.id === contactId);
        return contact;
    }
}
exports.ContactServices = ContactServices;
