'use strict';

angular.module('confusionApp')

         .controller('MenuController',  ['$scope','menuFactory', function($scope,menuFactory) {
  $scope.tab = 1;
  $scope.filtText = '';

  $scope.showDetails = false;

  $scope.dishes= menuFactory.getDishes();

  $scope.toggleDetails = function(){
    $scope.showDetails = !$scope.showDetails;
  }

  $scope.select = function(setTab) {
    $scope.tab = setTab;
    
    if (setTab === 2) {
      $scope.filtText = "appetizer";
    } 
    else if (setTab === 3) {
      $scope.filtText = "mains";
    }
    else if (setTab === 4) {
      $scope.filtText = "dessert";
    }
    else {
      $scope.filtText = "";
    }
  };
  
  $scope.isSelected = function (checkTab) {
    return ($scope.tab === checkTab);
  };

}])


.controller('ContactController', ['$scope','menuFactory', function($scope,menuFactory) {

$scope.feedback = {mychannel:"", firstName:"", lastName:"",
        agree:false, email:"" };

var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
                        $scope.channels = channels;
            $scope.invalidChannelSelection = false;


  }])

.controller('FeedbackController', ['$scope','menuFactory', function($scope,menuFactory) {

$scope.sendFeedback = function() {
          console.log($scope.feedback);

    if ($scope.feedback.agree && ($scope.feedback.mychannel == ""))
                   { $scope.invalidChannelSelection = true;
                    console.log('incorrect');}
 else {
                    $scope.invalidChannelSelection = false;
                    $scope.feedback = {mychannel:"", firstName:"", lastName:"",
                                       agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }
            };

}])



  
 //.controller('DishDetailController',['$scope','menuFactory','$routeParams', function($scope,menuFactory,$routeParams) {
.controller('DishDetailController',['$scope','menuFactory','$stateParams', function($scope,menuFactory,$stateParams) {
         var dish= menuFactory.getDish(parseInt($stateParams.id,10));   
        $scope.dish= dish;

        }])


.controller('FeedbackController_menu', ['$scope','menuFactory', function($scope,menuFactory) {

   
    
   $scope.feedback_menu = {author:"", rating:"5",
        comment:"",date:""};
      
            $scope.sendFeedback_menu = function() {  
                
                console.log($scope.feedback_menu);
                $scope.feedback_menu.date=Date.now();
                 $scope.dish.comments.push($scope.feedback_menu);
                    $scope.feedback_menu = {author:"",comment:"", rating:"",date:""};
                    $scope.feedbackForm_menu.$setPristine();

                    
            };
     


  }])

;



 
   


        



