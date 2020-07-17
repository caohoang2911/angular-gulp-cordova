popupModule.component('popup', {
    templateUrl: '/components/popup/popup.template.html',
    bindings: {
        onCancel: '&',
    },
    controller:popupController,
    controllerAs: 'popCtrl'
})
popupController.$inject = [
    '$rootScope'
]

function popupController(
) {

    const vm = this;
    vm.handleCancel = function () {
        vm.onCancel();
    }
}
