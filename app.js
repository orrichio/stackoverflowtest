/**
 * Created by Steve on 6/1/2015.
 */

angular.module('WashingtonPost', ['ngRoute','ngSanitize'])

.config(function($routeProvider,$locationProvider){
        $routeProvider
            .when('/',{
                templateUrl: 'partials/home.html',
                controller: 'HomeCtrl'
            })
            .when('/results',{
                templateUrl: 'partials/results.html',
                controller: 'HomeCtrl'
            })
            .otherwise({
                redirectTo: '/'
            })

    })
.controller('HomeCtrl',['$scope','StackRequest', function($scope,StackRequest,$routeParams){
        $scope.search = function (tag) {
            StackRequest.questions(tag).then(function(arrItems){
                $scope.data = arrItems;
            });
        }

        $scope.openQuestion = function(question){

            window.localStorage.setItem('question',JSON.stringify(question));

        }
        $scope.questionData =  JSON.parse(window.localStorage.getItem('question'));
        if($scope.questionData) {
            StackRequest.answer($scope.questionData.question_id).then(function (arrItems) {
                $scope.answer = arrItems;
                console.log($scope.answer);
            });
        }

    }])
.controller('ResultsCtrl',['$scope','$http','StackRequest', function($http,$scope,StackRequest){
        $scope.questionData =  window.localStorage.getItem('question');
}])
.factory('StackRequest',['$http', function($http){
    var factory = {};
    factory.questions = function(tag){
        return $http.get('https://api.stackexchange.com/2.2/questions?order=desc&sort=activity&tagged='+ tag +'&site=stackoverflow&key=hUS1Z0Xps*TioEKzAu2png((',{'Access-Control-Allow-Origin': 'localhost:*'}).
            then(function(response) {
                console.log(response); //I get the correct items, all seems ok here
                return (response.data.items);
            });
    }
        factory.returnQuestion = function(id){
            return $http.get('https://api.stackexchange.com/2.2/questions/'+ id +'?&site=stackoverflow&key=hUS1Z0Xps*TioEKzAu2png((',{'Access-Control-Allow-Origin': 'localhost:*'}).
                then(function(response) {
                    console.log(response); //I get the correct items, all seems ok here
                    return (response.data.items);
                });
        }
        factory.answer = function(id){
            return $http.get('http://api.stackexchange.com/2.2/questions/'+ id + '/answers?site=stackoverflow&filter=withbody&key=hUS1Z0Xps*TioEKzAu2png((',{'Access-Control-Allow-Origin': 'localhost:*'}).
                then(function(response) {
                    console.log(response); //I get the correct items, all seems ok here
                    return (response.data.items);
                });
        }
    return factory;
}])
