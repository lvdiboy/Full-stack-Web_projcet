'use strict';

angular.module('confusionApp')

        .controller('MenuController', ['$scope', 'menuFactory', function($scope, menuFactory) {
            
            $scope.tab = 1;
            $scope.filtText = '';
            $scope.showDetails = false;
             $scope.showMenu = false;
            $scope.message = "Loading ...";

           //   use $http   $scope.dishes= {};
              // menuFactory.getDishes()
                // .then(
                  //   function(response) {
                    //     $scope.dishes = response.data;
                      //     $scope.showMenu = true;
                    // },
                      //  function(response) {
                    //$scope.message = "Error: "+response.status + " " + response.statusText;
                    //}
                 //);

                 //use $resource
               //$scope.dishes = menuFactory.getDishes().query();

               //then add error notation;
                                menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showMenu = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });


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
    
            $scope.toggleDetails = function() {
                $scope.showDetails = !$scope.showDetails;
            };
        }])







        .controller('ContactController', ['$scope', function($scope) {

            $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
            
            var channels = [{value:"tel", label:"Tel."}, {value:"Email",label:"Email"}];
            
            $scope.channels = channels;
            $scope.invalidChannelSelection = false;
                        
        }])





        .controller('FeedbackController',  ['$scope', 'menuFactory', function($scope, menuFactory) {
            
           


            $scope.sendFeedback = function() {
                


                 menuFactory.getfeedback().query(
                function(response) {
                    $scope.feedback_server = response;
                });



                console.log($scope.feedback);
                
                if ($scope.feedback.agree && ($scope.feedback.mychannel === "")) {
                    $scope.invalidChannelSelection = true;
                    console.log('incorrect');
                }

                else {
                    $scope.invalidChannelSelection = false;

                      $scope.feedback_server.push($scope.feedback);

                 // update is used to change the data stored in the server
                 menuFactory.getfeedback().save($scope.feedback_server);

                    $scope.feedback = {mychannel:"", firstName:"", lastName:"", agree:false, email:"" };
                    $scope.feedback.mychannel="";

                    $scope.feedbackForm.$setPristine();
                    console.log($scope.feedback);
                }



               



            };
        }])






        .controller('DishDetailController', ['$scope', '$stateParams', 'menuFactory', function($scope, $stateParams, menuFactory) {
        
       

             //$scope.dish ={};
           // menuFactory.getDish(parseInt($stateParams.id,10))
           // .then(
               // function(response){
               //     $scope.dish= response.data;
                //    $scope.showDish = true;
               // },
                //  function(response) {
                //    $scope.message = "Error: "+response.status + " " + response.statusText;
              //  });        all these equal one line below with $resource method

               //use $resource method without error notation (need change the showDish to ture)
            // $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)});

              // with error notation
                        $scope.showDish = false;
            $scope.message="Loading ...";
                        $scope.dish = menuFactory.getDishes().get({id:parseInt($stateParams.id,10)})
            .$promise.then(
                            function(response){
                                $scope.dish = response;
                                $scope.showDish = true;
                            },
                            function(response) {
                                $scope.message = "Error: "+response.status + " " + response.statusText;
                            }
            );
            
        }])






        .controller('FeedbackController_menu', ['$scope', 'menuFactory', function($scope,menuFactory) {
            
            $scope.feedback_menu = {rating:5, comment:"", author:"", date:""};
            
            

           // when not use $http or $resource data server
             // $scope.submitComment = function () {
                
               // $scope.feedback_menu.date = new Date().toISOString();
                //console.log($scope.feedback_menu);
                
               // $scope.dish.comments.push($scope.feedback_menu);
                
               // $scope.feedbackForm_menu.$setPristine();
                
                //$scope.feedback_menu = {rating:5, comment:"", author:"", date:""};
            //};



                // when serve the data to a server with $resource method

           $scope.submitComment = function () {
                
                $scope.feedback_menu.date = new Date().toISOString();
                console.log($scope.feedback_menu);
            
            $scope.dish.comments.push($scope.feedback_menu);
                 // update is used to change the data stored in the server
                 menuFactory.getDishes().update({id:$scope.dish.id},$scope.dish);
               $scope.feedbackForm_menu.$setPristine();
                
                $scope.feedback_menu = {rating:5, comment:"", author:"", date:""};
            };





        }])






    .controller('IndexController', ['$scope', '$stateParams','menuFactory', 'corporateFactory', function($scope, $stateParams, menuFactory,corporateFactory) {

         
           
           // $scope.dishes= {};
            $scope.showDish = false;
            $scope.message="Loading ...";
        // menuFactory.getDishes()
            // .then(
               //function(response){
                 //   $scope.dishes = response.data;
              //   $scope.showDish = true;
              //  },
                         //   function(response) {
                           //     $scope.message = "Error: "+response.status + " " + response.statusText;
                          //  });
            //   $scope.dishes = menuFactory.getDishes().query();

               //if here is get dish the framework should be below
            // $scope.dish = menuFactory.getDishes().get({id:0});

             menuFactory.getDishes().query(
                function(response) {
                    $scope.dishes = response;
                    $scope.showDish = true;
                },
                function(response) {
                    $scope.message = "Error: "+response.status + " " + response.statusText;
                });

            // if here is get dish the framework should be below
          // $scope.dish = menuFactory.getDishes().get({id:0})
                       // .$promise.then(
                       //     function(response){
                        //        $scope.dish = response;
                        //        $scope.showDish = true;
                       //     },
                       //     function(response) {
                       //         $scope.message = "Error: "+response.status + " " + response.statusText;
                       //     }
                     //   );

            
              $scope.promotions= menuFactory.getPromotions();

             $scope.leader= corporateFactory.getLeader(3);
            
        }])
        // implement the IndexController and About Controller here






    .controller('AboutController', ['$scope', 'corporateFactory', function($scope, corporateFactory) {

         
           
             

             $scope.leaders= corporateFactory.getLeaders();
            
        }])

;
