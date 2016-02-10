var contacts = null;

function loadUserData() {
  $.getJSON('/contacts', function(contact_json){
    contacts = contact_json;
    //contact_data = {id, name, email}
    $(".contact-select").empty();
    $.each(contacts, function(i, obj) {
      $(".contact-select").append(
      $('<option>').text(obj.name).attr('value', obj.id));
    });
  });  
}

function contactSelected(id) {
  for (var i=0; i < contacts.length; i++) {
    if (contacts[i].id == id) {
      $(".contact-info").empty();
      var title = contacts[i].name;
      $("<h1>").text(title).appendTo(".contact-info");

      var email = contacts[i].email;
      $("<p>").text("Email: " + email).appendTo(".contact-info");

      var phone = "PHONE PLACE HOLDER";
      $("<p>").text("Phone: " + phone).appendTo(".contact-info");

      $("<h3>").text("Bio:").appendTo(".contact-info");

      var bio = "BIO PLACEHOLDER";
      $("<p>").text(bio).appendTo(".contact-info");
    }
  }
}

function clearAddParams() {
  $(".add-name").val("");
  $(".add-email").val("");
  $("#collapse_two").removeClass("in");
  $("#collapse_two").addClass("collapse");
}

function clearSearchParams() {
  $(".find-term").val("");
  $("#collapse_one").removeClass("in");
  $("#collapse_one").addClass("collapse");
}

$(function() {
  // Load all contacts into the select element.
  loadUserData();

  //When contact is selected from the contact list, display the information in the information box.
  $(".contact-select").on('click', 'option', function() {
    var opt = $(this);
    contactSelected(opt.val());
  });

  //Adds a new contact to the database.
  $(".add-contact").on('submit', function() {
    var addName = $(".add-name").val();
    var addEmail = $(".add-email").val();

    $.post('/contacts/new', {name: addName, email: addEmail}, function(data) {
      if (data.status == "success") {
        window.alert("Contact added.");
      } else {
        window.alert("Error occurred.");
      }
      loadUserData();

      clearAddParams();
    }, 'json');
    return false;
  });

  //Search for a contact.
  $(".find-contact").on('submit', function() {
    var findTerm = $(".find-term").val();
    $.getJSON('/contacts/search', 
    {
      search: findTerm
    },
    function(data) {
      $(".contact-info").empty();

      $("<h1>").text("Search Results:").appendTo(".contact-info");

      $.each(data, function(i, item) {
        var title = item.name;
        $("<h1>").text(title).appendTo(".contact-info");

        var email = item.email;
        $("<p>").text("Email: " + email).appendTo(".contact-info");

        var phone = "PHONE PLACE HOLDER";
        $("<p>").text("Phone: " + phone).appendTo(".contact-info");

        $("<h3>").text("Bio:").appendTo(".contact-info");

        var bio = "BIO PLACEHOLDER";
        $("<p>").text(bio).appendTo(".contact-info");
      });
      // clearSearchParams();
    }); 
    return false;
  });
});


