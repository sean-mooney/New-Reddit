var newReddit = angular.module('newReddit', ['angularMoment']);

newReddit.controller('mainController', function($scope, $http) {
  $scope.formData = {};

  //home page retrieve posts
  $http.get('/posts')
    .success(function(data) {
      $scope.posts = data;
      console.log(data);
    })
    .error(function(data) {
      console.log('Error: ' + data);
    });

  //when submitting a new post
  $scope.createPost = function() {
    $http.post('/posts', $scope.formData)
      .success(function(data) {
        $scope.formData = {}; //clear the form
        $scope.posts = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
  }

  //delete a post
  $scope.deletePost = function(id) {
    $http.delete('/posts/' + id)
      .success(function(data) {
        $scope.posts = data;
        console.log(data);
      })
      .error(function(data) {
        console.log('Error: ' + data);
      });
    }
});
