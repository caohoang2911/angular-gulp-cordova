console.log(app, 'app ')
app.directive('contentModal', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {
            onOpen: '&',
            isOpen: '<'
        },
        template: `
            <div class="modal-content">
                <ng-transclude></ng-transclude>
            </div>`,
        link: ProcessModal
    }
}])

function ProcessModal(scope, element, attribute) {
    alert(3)
}
