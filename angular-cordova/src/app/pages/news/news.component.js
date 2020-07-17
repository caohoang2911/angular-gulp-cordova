newsModule.component('newsComponent', {
    templateUrl: '/pages/news/news.template.html',
    controller: newsController,
    controllerAs: 'newsCtrl'
})
newsController.$inject = [
    '$scope',
    '$rootScope',
    'popupService'
]

function newsController(
    $scope,
    $rootScope,
    popupService
) {
    $scope.openModal = function () {
        popupService.onOpen()
    }
    $scope.onHandleCancel = function () {
        popupService.onCancel()

    }
}
