var app = angular.module('githubsearch', []);
app.controller('SearchController', function SearchController($scope,GitHub) {
    $scope.executeSearch = function executeSearch() {
        GitHub.searchRepos($scope.query, function (error, data){
            if (!error) {
                $scope.repos = data.items;
            }
        });
        $scope.sortType     = 'name'; 
        $scope.sortReverse  = false;  
        $scope.searchFish   = '';     
    };
        $scope.openRepo = function openRepo(name) {
        GitHub.getRepo(name, function (error, data) {
        if (!error) {
        $scope.activeRepo = data;
        }
    });
}; 
}); 
  app.factory('GitHub', function GitHub($http) {
    return {
        searchRepos: function searchRepos(query, callback) {
            $http.get('https://api.github.com/search/repositories', { params: { q: query } })
            .success(function (data) {
                callback(null, data);
            })
            .error(function (e) {
                callback(e);
            });
        },
    };
});
  
