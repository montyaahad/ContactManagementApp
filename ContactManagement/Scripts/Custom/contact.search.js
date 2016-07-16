var service = null;
var uiutil = null;

function Service() {

}
function UIUtilities() {
    this.contactsData = null;
    this.count = 0;
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

Service.prototype.searchContact = function (text) {
    $.ajax({
        type: 'GET',
        url: '/Home/SearchContact',
        dataType: 'json',
        data: { searchtext: text },
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

UIUtilities.prototype.prepareContactList = function (list) {
    var contactListId = document.getElementById('idContactList');
    contactListId.innerHTML = '';

    var contactHtml = '';
    for (i = 0; i < list.length; i++) {
        contactHtml += '<a href="#" class="list-group-item">';
        contactHtml += '<h4 class="list-group-item-heading ellipsis">' + list[i].Name + '</h4>';
        contactHtml += '<p class="list-group-item-text text-muted ellipsis">' + list[i].Phone + '</p>';
        contactHtml += '</a>';
    }

    contactListId.innerHTML = contactHtml;
}

$(document).ready(function () {
    init();

    $('#btnSearch').click(function () {
        //idSearchText
        var searchText = $('#idSearchText').val();
        service.searchContact(searchText);
    });
});