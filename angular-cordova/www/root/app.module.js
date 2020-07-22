const modules = [
    'popup',
    'newsModule',
]//Module
const lib = [
    'ngRoute'
]


var app = angular.module('app', [...lib, ...modules])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/news', {
            template: `<news-component></news-component>`
        })
        .otherwise('/news')
}])
