import jQuery from "jquery";
import $ from "jquery";
import { IContact } from "./models";
import { ContactServices } from "./services";
import { contactList } from "./data";
import {Guid} from "guid-typescript";
let contactServices:ContactServices=new ContactServices();
$(document).on("ready",(function () {
  $(".displayDetails").css("display", "none");
  $(".addingDetails").css("display", "none");
  for (let i = 0; i < contactList.length; i++) {
    displayList(contactList[i],contactList[i].id );
  }
  
  $("#addlink").on("click",(function () {
    addForm();
  }));

  let selected:IContact = contactList[0];
  $("#editlink").on("click",(function (e) {
    e.preventDefault();

    editDetails();
  }));
  $("#deletelink").on("click",(function (e) {
    e.preventDefault();
    console.log("removelink" + selected);
    removeDetails();
  }));
  $("#addButton").on("click",(function (e) {
    e.preventDefault();
    if (validate()) {
      submitingForm();
    }
  }));
  $("#cancelButton").on("click",(function () {
    display( selected.id);
  }));

function editDetails() {
    $(".addingDetails").css("display", "block");
    $(".displayDetails").css("display", "none");
    $("#editButton").css("display", "block");
    $("#addButton").css("display", "none");
    $("#addName").val(selected.name);
    $("#addEmail").val(selected.email);
    $("#addMobile").val(selected.mobile);
    $("#addLandline").val(selected.landline);
    $("#addWebsite").val(selected.website);
    $("#addAddress").val(selected.address);
    $("#editButton").on("click",(function (e) {
      e.preventDefault();
      if (
        confirm(
          "Are you sure you want to edit " +
            selected.name +
            "'s details"
        )
      ) {
        editedDetailsAdding();
      }
    }));
  }
  //----
  function editedDetailsAdding() {
    let tempContact:IContact=selected;
    tempContact.email = $("#addEmail").val() as string;
    tempContact.name = $("#addName").val()as string;
    tempContact.mobile = $("#addMobile").val()as number;
    tempContact.landline = $("#addLandline").val()as string;
    tempContact.website = $("#addWebsite").val()as string;
    tempContact.address = $("#addAddress").val()as string;
    var index:number=getIndexById(selected.id);
    contactServices.updateContact(index,tempContact)
    display(selected.id);
    displayEditedDetailsInList(selected, selected.id);
  }
//----
function displayEditedDetailsInList(contact:IContact, contactId:string) {
    $("#" + contactId).html(
      "<p class='Name'>" +
        contact.name +
        "</p><p class='email'>" +
        contact.email +
        "</p><p class='mobile'>" +
        contact.mobile +
        "</p>"
    );
  }
function displayList(contact:IContact, contactId:string) {
    
    $("#contactBook").append("<li class='eachContact' ></li>");
    $("#contactBook").children().last().attr("id", contactId);
    $(".eachContact")
      .last()
      .on("click" ,(function () {
        display(contactId);
      }));
    $(".eachContact")
      .last()
      .html(
        "<p class='Name'>" +
          contact.name +
          "</p><p class='email'>" +
          contact.email +
          "</p><p class='mobile'>" +
          contact.mobile +
          "</p>"
      );
  }
  function display(contactId:string) {
    //var j = i;
    $(".displayDetails").css("display", "block");
    $(".addingDetails").css("display", "none");
    var contact:IContact;
    contact=contactServices.getContactById(contactId);
    $("#addressOfContact").text(contact.address);
    $("#emailOfContact").text(contact.email);
    $("#mobileOfContact").text(contact.mobile);
    $("#landlineOfContact").text(contact.landline);
    $("#websiteOfContact").text(contact.website);
    $("#nameOfContact").text(contact.name);
    var index:number=getIndexById(contact.id);
    selected = contactList[index];
    $(".eachContact").css("background-color", "white");
    $("#" + contactId).css("background-color", "rgb(206,231,242)");
  }

  $("#addName").on("change",(function (e) {
    e.preventDefault();
    validate();
  }));
  $("#addEmail").on("change",(function (e) {
    e.preventDefault();
    validate();
  }));
  $("#addMobile").on("keyup",(function (e) {
    e.preventDefault();
    validate();
  }));

  function validate() {
    var nameBox = $("#addName").val() as string;
    var emailBox = $("#addEmail").val() as string;
    var mobileBox = $("#addMobile").val() as string;
    var flag = 0;
    if (nameBox == "") {
      $("#nameWarning").text("Enter your name");
      console.log(nameBox);
    } else {
      $("#nameWarning").text("");
      flag += 1;
    }
    if (mobileBox == "" || mobileBox.length != 10) {
      $("#mobileWarning").text("Enter Mobile number");
    } else {
      $("#mobileWarning").text("");
      flag += 1;
    }
    if (emailBox == "") {
      $("#emailWarning").text("");
      flag += 1;
    } else {
      var emalRef = /^([a-zA-Z0-9\._]+)@([a-zA-Z0-9])+\.([a-z]+)(.[a-z]+)?$/;
      if (emalRef.test(emailBox)) {
        $("#emailWarning").text("");
        flag += 1;
      } else {
        $("#emailWarning").text("Please enter a valid EmailID");
      }
    }
    if (flag == 3) {
      return true;
    } else {
      return false;
    }
  }


  function submitingForm() {
    var dummyLandline = "Not Provided";
    var dummyWebsite = "Not Provided";
    var dummyAddress = "Not Provided";
    var dummyEmail = "not provided";
    if ($("#addLandline").val() != "") {
      dummyLandline = $("#addLandline").val() as string;
    }
    if ($("#addAddress").val() != "") {
      dummyAddress = $("#addAddress").val() as string;
    }
    if ($("#addWebsite").val() != "") {
      dummyWebsite = $("#addWebsite").val() as string;
    }
    if ($("#addEmail").val() != "") {
      dummyEmail = $("#addEmail").val() as string;
    }
    let tempContact:IContact={id:"",name:"",mobile:0,address:"",website:"",email:"",landline:""};
      tempContact.name= $("#addName").val() as string;
      tempContact.mobile= $("#addMobile").val() as number;
      tempContact.email= dummyEmail;
      tempContact.website= dummyWebsite;
      tempContact.landline= dummyLandline;
      tempContact.address= dummyAddress;
    contactServices.addContact(tempContact);
    console.log(contactList);
    displayList(contactList[contactList.length - 1],contactList[contactList.length - 1].id );
    display( contactList[contactList.length - 1].id);
    ($("#addingDetailsForm")[0]as HTMLFormElement).reset();
  }
function getIndexById(contactId:string){
    var index:number=0;
    for(var i=0;i<contactList.length;i++){
        if(contactList[i].id==contactId){
            index=i;
        }
    }
    return index;
}
  function addForm() {
    $(".displayDetails").css("display", "none");
    $(".addingDetails").css("display", "block");
    $("#editButton").css("display", "none");
    $("#addButton").css("display", "block");
    ($("#addingDetailsForm")[0]as HTMLFormElement).reset();
    $(".eachContact").css("background-color", "white");
    $("#addingDetailsForm").on("change",(function (e) {
      e.preventDefault();
      validate();
    }));
  }

  function removeDetails() {
    let nameField = $("#nameOfContact").text();
    if (
      confirm("Are you sure you want to delete " + nameField + "'s details") ==
      true
    ) {
      for (let i = 0; i < contactList.length; i++) {
        if (contactList[i].name == nameField) {
          $("#" + contactList[i].id).remove();
          contactServices.deleteContact(i);
          $(".displayDetails").css("display", "none");
          $(".addingDetails").css("display", "none");
        }
      }
    }
  }
}));
