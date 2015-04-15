angular.module('starter.controllers', [])

.controller('RoomsCtrl', function ($scope, Rooms, Chats, $state) {
    //console.log("Rooms Controller initialized");
    $scope.rooms = Rooms.all();

    $scope.openChatRoom = function (roomId) {
        $state.go('tab.chat', {
            roomId: roomId
        });
    }
})


.controller('ChatCtrl', function ($scope, Chats, $state, $ionicModal) {
    //console.log("Chat Controller initialized");
    $ionicModal.fromTemplateUrl('templates/fillname.html', {
		scope: $scope
	}).then(function (modal){
		$scope.modal = modal;
	});

    $scope.IM = {
        textMessage: ""
    };

    Chats.selectRoom($state.params.roomId);

    var roomName = Chats.getSelectedRoomName();

    // Fetching Chat Records only if a Room is Selected
    if (roomName) {
        $scope.roomName = " - " + roomName;
        $scope.chats = Chats.all();
         console.log($scope.chats);
    }

    $scope.sendMessage = function (msg) {
    	console.log($scope.displayName);
    	if($scope.displayName){
    		console.log(msg);
        	Chats.send($scope.displayName, msg);
        	$scope.IM.textMessage = "";
    	}else{
    		$scope.modal.show();
    	}       
    }

    $scope.fillName = function (user){
    	$scope.displayName = user.name;
    	$scope.modal.hide();
    }

    $scope.remove = function (chat) {
        Chats.remove(chat);
    }
})



.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
