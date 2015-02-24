define(['util/messagingClient', 'logging'],
  function(client, logging) {




  var log = new logging(true, 'popupctrl', client);

  return ['$scope', '$location', '$http', function($scope, $location, $http) {
    log.debug('popupctrl started');

    // some variable for check if angular works ok
    $scope.popup_page = 'Tomas Cook Extension';

    $scope.loadPaxInfo = function()
    {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {method: "fillContactDetails"}, function(response) {
          if(response.method=="fillContactDetails"){
             alltext = response.data;
          }
        });
      });
    }

    $scope.loadPassengerInfo = function()
    {
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {method: "fillPassengerDetails"}, function(response) {
          if(response.method=="fillPassengerDetails"){
             alltext = response.data;
          }
        });
      });
    }

    $scope.getTab = function(){
      chrome.tabs.getSelected(null, function(tab) {
        chrome.tabs.sendRequest(tab.id, {method: "getText"}, function(response) {
          if(response.method=="getText"){
             alltext = response.data;
          }
      });
      });
  }

    // because this has happened asynchronously we've missed
    // Angular's initial call to $apply after the controller has been loaded
    // hence we need to explicitly call it at the end of our Controller constructor
    $scope.$apply();
  }];
});