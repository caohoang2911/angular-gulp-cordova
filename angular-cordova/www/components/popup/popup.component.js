popupModule.component('popup', {
    templateUrl: '/components/popup/popup.template.html',
    bindings: {

        onCancel: '&',
    },
    controller: ('popupController', popupController),
    controllerAs: 'popCtrl'
})
popupController.$inject = [
    '$scope',
    '$rootScope'
]

function popupController(
    $scope,
    $rootScope
) {

    const vm = this;
    vm.handleCancel = function () {
        vm.onCancel();
    }
}
