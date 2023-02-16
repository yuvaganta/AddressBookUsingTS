"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jquery_1 = __importDefault(require("jquery"));
const services_1 = require("./services");
let contactServices = new services_1.ContactServices();
(0, jquery_1.default)(document).ready(function () {
    var contactList;
    contactList = [];
    contactList.push({
        id: 'id' + (new Date()).getTime(),
        name: "Chandramani Arora",
        mobile: 9242652301,
        email: "chandermani@technovert.com",
        website: "www.technovert.com",
        landline: "040 30 123 1211",
        address: "123 now here\nSome street\nMadhapur, Hyderabad 500033",
    });
    contactList.push({
        id: 'id' + (new Date()).getTime(),
        name: "Shashi Pagadala",
        mobile: 9242652355,
        email: "shashi@technovert.com",
        website: "www.technovert.com",
        landline: "040 30 123 1211",
        address: "123 now here\nSome street\nMadhapur, Hyderabad 500033",
    });
    contactList.push({
        id: 'id' + (new Date()).getTime(),
        name: "Praveen Battula",
        mobile: 9245122301,
        email: "praveen@technovert.com",
        website: "www.technovert.com",
        landline: "040 30 123 1211",
        address: "123 now here\nSome street\nMadhapur, Hyderabad 500033",
    });
    contactList.push({
        id: 'id' + (new Date()).getTime(),
        name: "Vijay Yalamanchali",
        mobile: 9246112301,
        email: "vijay@technovert.com",
        website: "www.technovert.com",
        landline: "040 30 123 1211",
        address: "123 now here\nSome street\nMadhapur, Hyderabad 500033",
    });
    for (let i = 0; i < contactList.length; i++) {
        displayList(contactList, contactList[i], contactList[i].id);
    }
    (0, jquery_1.default)(".displayDetails").css("display", "none");
    (0, jquery_1.default)(".addingDetails").css("display", "none");
    (0, jquery_1.default)("#addlink").on("click", (function () {
        addForm();
    }));
    let selected = contactList[0];
    (0, jquery_1.default)("#editlink").on("click", (function (e) {
        e.preventDefault();
        //console.log("editlink" + i);
        editDetails();
    }));
    (0, jquery_1.default)("#deletelink").on("click", (function (e) {
        e.preventDefault();
        console.log("removelink" + selected);
        removeDetails();
    }));
    (0, jquery_1.default)("#addButton").on("click", (function (e) {
        e.preventDefault();
        if (validate()) {
            submitingForm();
        }
    }));
    (0, jquery_1.default)("#cancelButton").on("click", (function () {
        display(contactList, selected.id);
    }));
    function displayList(contactList, contact, contactId) {
        (0, jquery_1.default)("#contactBook").append("<li class='eachContact' ></li>");
        (0, jquery_1.default)("#contactBook").children().last().attr("id", contactId);
        (0, jquery_1.default)(".eachContact")
            .last()
            .on("click", (function () {
            display(contactList, contactId);
        }));
        (0, jquery_1.default)(".eachContact")
            .last()
            .html("<p class='Name'>" +
            contact.name +
            "</p><p class='email'>" +
            contact.email +
            "</p><p class='mobile'>" +
            contact.mobile +
            "</p>");
    }
    function display(contactList, contactId) {
        //var j = i;
        (0, jquery_1.default)(".displayDetails").css("display", "block");
        (0, jquery_1.default)(".addingDetails").css("display", "none");
        var contact;
        contact = contactServices.getContactById(contactList, contactId);
        (0, jquery_1.default)("#addressOfContact").text(contact.address);
        (0, jquery_1.default)("#emailOfContact").text(contact.email);
        (0, jquery_1.default)("#mobileOfContact").text(contact.mobile);
        (0, jquery_1.default)("#landlineOfContact").text(contact.landline);
        (0, jquery_1.default)("#websiteOfContact").text(contact.website);
        (0, jquery_1.default)("#nameOfContact").text(contact.name);
        //selected = j;
        (0, jquery_1.default)(".eachContact").css("background-color", "white");
        (0, jquery_1.default)("#" + contactId).css("background-color", "rgb(206,231,242)");
    }
});
