var service = null;
var uiutil = null;

function Service() {

}
function UIUtilities() {
    this.contactsData = null;
    this.selectedId = 0;
    this.selectedContact = null;
    //this.totalcount = 0;
    this.skip = 0;
    this.take = 5;
}

function init() {
    service = new Service();
    uiutil = new UIUtilities();
}

Service.prototype.getAllContact = function () {
    $.ajax({
        type: 'GET',
        url: '/Home/GetAll',
        dataType: 'json',
        success: function (data, status) {
            if (data['list'] != undefined && data['list'] != null) {
                uiutil.prepareContactList(data['list']);
            }
        },
        error: function (request, status, error) {
            console.log("There is error of getting data.");
        }
    });
}

Service.prototype.getContact = function () {
    $.ajax({
        type: 'GET',
        url: '/Home/GetContacts',
        dataType: 'json',
        data: { take: uiutil.take, skip: uiutil.skip },
        success: function (data, status) {
            if (data['list'] != undefined && data['list'] != null) {
                uiutil.skip = uiutil.skip + data['list'].length;

                if (data['list'].length == 0) {
                    alert("No more data!");
                }
                else {
                    uiutil.prepareContactList(data['list']);
                }
            }
        },
        error: function (request, status, error) {
            console.log("There is error of getting data.");
        }
    });
}

Service.prototype.addContact = function () {
    if (uiutil.validateContactObjectBeforeAdding()) {
        $.ajax({
            type: 'POST',
            url: '/Home/AddOrEditContact',
            dataType: 'json',
            data: { contact: uiutil.getContactObject() },
            //async: false,
            success: function (data, status) {
                if (data['result'] != undefined && data['result'] != null) {

                    uiutil.clearFields();

                    // change view - mockup
                    changeClasses();
                    toggleClass();

                    // load data again
                    service.getAllContact();
                }
            },
            error: function (request, status, error) {
                console.log("There is error of adding quote.");
            }
        });
    }
    else {
        alert("Please fill input fields (Name, Phone)!");
    }
}

Service.prototype.deleteContact = function () {
        $.ajax({
            type: 'POST',
            url: '/Home/DeleteContact',
            dataType: 'json',
            data: { id: uiutil.selectedId },
            //async: false,
            success: function (data, status) {
                if (data['result'] != undefined && data['result'] != null) {

                    uiutil.clearFields();

                    // change view - mockup
                    changeClasses();

                    // load data again
                    service.getAllContact();
                }
            },
            error: function (request, status, error) {
                console.log("There is error of adding quote.");
            }
        });
}

Service.prototype.getContactsByFirstLetter = function (text) {
    $.ajax({
        type: 'GET',
        url: '/Home/GetContactsByFirstLetter',
        dataType: 'json',
        data: { letter: text },
        success: function (data, status) {
            if (data['list'] != undefined && data['list'] != null) {
                uiutil.prepareContactList(data['list']);
            }
        },
        error: function (request, status, error) {
            console.log("There is error of getting data.");
        }
    });
}

Service.prototype.getContactsById = function () {
    $.ajax({
        type: 'GET',
        url: '/Home/GetContactsById',
        dataType: 'json',
        data: { id: uiutil.selectedId },
        success: function (data, status) {
            if (data['data'] != undefined) {
                uiutil.selectedContact = data['data'];
                uiutil.showContactEdit();
            }
        },
        error: function (request, status, error) {
            console.log("There is error of getting data.");
        }
    });
}

UIUtilities.prototype.getContactObject = function () {
    var contact = {};
    contact.Id = uiutil.selectedId;
    contact.Name = $('#idName').val();
    contact.Phone = $('#idPhone').val();
    contact.Email = $('#idEmail').val();
    contact.Organization = $('#idOrganization').val();
    contact.Address = $('#idAddress').val();

    return contact;
}

UIUtilities.prototype.validateContactObjectBeforeAdding = function () {
    var name = $('#idName').val();
    if (name.trim() == '') {
        $('#idName').focus();
        //$('#addError').show();
        return false;
    }

    var phone = $('#idPhone').val();
    if (phone.trim() == '') {
        $('#idPhone').focus();
        //$('#addError').show();
        return false;
    }

    return true;
}

UIUtilities.prototype.clearFields = function () {
    $('#idName').val('');
    $('#idPhone').val('');
    $('#idEmail').val('');
    $('#idOrganization').val('');
    $('#idAddress').val('');

    uiutil.selectedContact = null;
    uiutil.selectedId = 0;
}

UIUtilities.prototype.prepareContactList = function (list) {
    var contactListId = document.getElementById('idContactList');
    contactListId.innerHTML = '';

    var contactHtml = '';
    for (i = 0; i < list.length; i++) {
        var cont = list[i];
        contactHtml += '<a href="javascript:void(0);" class="list-group-item" onclick="uiutil.showFullContact(\'' + cont.Name + '\',\'' + cont.Phone + '\',\'' + cont.Email + '\',\'' + cont.Address + '\',\'' + cont.Organization + '\',\'' + cont.Id + '\');">';
        contactHtml += '<h4 class="list-group-item-heading ellipsis">'+list[i].Name+'</h4>';
        contactHtml += '<p class="list-group-item-text text-muted ellipsis">' + list[i].Phone + '</p>';
        contactHtml += '</a>';
    }

    contactListId.innerHTML = contactHtml;
}

UIUtilities.prototype.showFullContact = function (name, phone, email, org, add, Id) {
    
    $('#idTitle').html(name);
    $('#readName').text(name);
    $('#readPhone').text(phone);
    $('#readEmail').text(email);
    $('#readOrganization').text(org);
    $('#readAddress').text(add);

    uiutil.selectedId = Id;

    console.log(uiutil.selectedContact);
    changeClasses();
}

UIUtilities.prototype.showContactEdit = function () {

    $('#idName').val(uiutil.selectedContact.Name);
    $('#idPhone').val(uiutil.selectedContact.Phone);
    $('#idEmail').val(uiutil.selectedContact.Email);
    $('#idOrganization').val(uiutil.selectedContact.Organization);
    $('#idAddress').val(uiutil.selectedContact.Address);

    toggleClass();
}

UIUtilities.prototype.showFullContact = function (name, phone, email, org, add, Id) {

    //alert(contact.Name);
    $('#idTitle').html(name);
    $('#readName').html(name);
    $('#readPhone').html(phone);
    $('#ireadEmail').html(email);
    $('#readOrganization').val(org);
    $('#readAddress').val(add);

    uiutil.selectedId = Id;

    changeClasses();
}

$(document).ready(function () {
    init();

    service.getContact();

    // Conatct Index - first letter
    $("#idUlLetters li").click(function () {
        var letter = $(this).find('a:first').text();
        if (letter == '#') {
            service.getAllContact();
        }
        else {
            service.getContactsByFirstLetter(letter);
        }
    });



    $("#idPrev").click(function () {
        uiutil.skip = uiutil.skip - uiutil.take;
        service.getContact();
    });

    $("#idNext").click(function () {
        service.getContact();
    });
});