//
// content script based on angular application
//
// Some div /html/content.html injects to content page,
// and application will be bootstrapped in the injected div.
//

requirejs.config(requireConfig);

requirejs([ 'jquery',
            'util/messaging',
            'util/messagingClient',
            'logging',
            'angular',
            'content/contentApp'],
function(   $,
            messaging,
            client,
            logging,
            angular,
            contentApp) {

  // uncomment the following line if content should be handling some requests
  // sent from background (when appropriate handler is implemented in
  // contentHandlers.js

  function getText(){
      return document.body.innerText
  }
  function getHTML(){
      return document.body.outerHTML
  }

function loadUkPaxInfo()
{
          document.getElementById("title").value = "1";
          document.getElementById("name").value = "Ernesto";     
          document.getElementById("surname").value = "Moretti";          
          document.getElementById("email").value = "ernesto_moretti@hotmail.com";
          document.getElementById("leadPassengerConfirmEmail").value = "ernesto_moretti@hotmail.com";
          document.getElementById("postCode").value = "NW10AR";
          document.getElementById("houseNumber").value = "456";
          document.getElementById("street").value = "Lyme St";
          document.getElementById("city").value = "London";
          document.getElementById("day").value = "1";
          document.getElementById("month").value = "6";
          document.getElementById("year").value = "15";
          document.getElementById("contactNumber").value = "542615613788";
          document.getElementById("postCode").click();
}

function fillUkPassagerInfo()
{
    var numberOfOcupant = $('div[id^=room-occupant]').length;
    fillLead();
    for (var i = 1; i < numberOfOcupant; i++) { fillPassengerDetails(i)}
}

function fillLead()
{
     var leadRadio = $('div[id^=room-occupant] :radio')[0];
     leadRadio.value = 1;
     var title = $('div[id^=room-occupant] select[id^=title]')[0];
     title.value = "1";
     var name = $('div[id^=room-occupant] input[id^=name]')[0];
     name.value = 'Ernesto'; 
     var surname = $('div[id^=room-occupant] input[id^=surname]')[0]
     surname.value = 'Moretti';
     var day = $('div[id^=room-occupant] select[id^=day')[0];
     day.value =  '1';
     var month = $('div[id^=room-occupant] select[id^=month')[0]
     month.value =  '6';
     var year = $('div[id^=room-occupant] select[id^=year')[0]
     year.value =  '15';
}


function fillPassengerDetails(index)
{
 var title = $('div[id^=room-occupant] select[id^=title]')[index];
     title.value = "1";
     var name = $('div[id^=room-occupant] input[id^=name]')[index];
     name.value = 'Passenger Name' + index; 
     var surname = $('div[id^=room-occupant] input[id^=surname]')[index]
     surname.value = 'Passenger Surname'+ index; 
     var day = $('div[id^=room-occupant] select[id^=day')[index];
     day.value =  '1';
     var month = $('div[id^=room-occupant] select[id^=month')[index]
     month.value =  '6';
     var year = $('div[id^=room-occupant] select[id^=year')[index]
     year.value =  '15';
}


chrome.extension.onRequest.addListener(
    function(request, sender, sendResponse) {

      if(request.method == "fillContactDetails")
      {
          loadUkPaxInfo();
          sendResponse({data: "ok", method: "fillContactDetails"});         
      }
      else if (request.method == "fillPassengerDetails")
      {
          fillUkPassagerInfo();
          sendResponse({data: "ok", method: "fillPassengerDetails"}); 
      }
      else if(request.method == "getText"){
        document.title = "entro bien";
        sendResponse({data: getHTML(), method: "getText"}); //same as innerText 
      }  
    }
);

messaging.contentInitialize();
  var log = new logging(true, 'content', client);
  log.debug('content started');
});
