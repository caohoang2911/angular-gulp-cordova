app.directive('defaultLayout', [function () {
    return {
        restrict: 'AE',
        replace: true,
        transclude: true,
        template: `
            <div class="swapper">
                <header></header>
                    <ng-transclude></ng-transclude>
                <footer></footer>
            </div>`,
        link: DefaultLayoutController
    }
}])
function DefaultLayoutController() {

}