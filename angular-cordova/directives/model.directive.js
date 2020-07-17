app.directive('contentModal', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: `
            <div class="modal-content">
                <ng-transclude></ng-transclude>
            </div>`,
        link: CLazyImageController
    }
}])

function CLazyImageController(scope, element, attribute) {

}
