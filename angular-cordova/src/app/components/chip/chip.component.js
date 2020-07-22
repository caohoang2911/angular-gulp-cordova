app.component('chip', {
    templateUrl: '/components/chip/chip.template.html',
    bindings: {
        onRemove: '&',
        style: '<',
        value: '<',
        className: '@',
        isClose:'<',
        onClick: '&'
    },
    controller: chipController,
    controllerAs: 'chipCtrl'
})
function chipController() {
    this.$onChanges = changes => {
        console.log(changes.onRemove);
    }
}