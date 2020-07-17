const components = [
    'popup',
    'newsComponent'
]
const lib = [
    'ngRoute'
]


var app = angular.module('app', [...lib,...components])

app.config(['$routeProvider', function ($routeProvider) {
    $routeProvider
        .when('/news', {
            template: '<h3>sss</h3>'
        })
        // .otherwise('/news')
}])
