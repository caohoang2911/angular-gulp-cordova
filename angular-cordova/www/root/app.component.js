app.component('globalApp', {
    templateUrl: '/root/app.template.html',
    controller: appController,
    controllerAs: 'appCtrl',
})
appController.$inject = [
    '$scope',
    '$rootScope',
    'popupService'
]

function appController(
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
