console.log(app, 'app ')
app.directive('ngContentModal', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        scope: {
            isOpen: '<',
            onClose: '&'
        },
        template: `
                <div class="popup-content modal-content">
                    <span class="popup-close" ng-click="onClose()">X</span>
                    <ng-transclude></ng-transclude>
                </div>
           `,
        link: ProcessModal
    }
}])

function ProcessModal(scope, element, attribute) {

    scope.$watch('isOpen', function (newValue, oldValue) {
        const ele = element[0];
        if (scope.isOpen != undefined && scope.isOpen)
            angular.element(ele).addClass('show')
        else
            angular.element(ele).removeClass('show')
    })
}
