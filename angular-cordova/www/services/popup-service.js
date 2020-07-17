app.factory('popupService', [
    '$timeout',
    '$rootScope',
    function (
        $timeout,
        $rootScope
    ) {
        function onCancel() {
            $rootScope.homeState = {
                cancel: false,
                open: true
            }
        }

        function onOpen() {

            $timeout(function () {
                $rootScope.homeState = {
                    cancel: true,
                    open: false
                }
            })
        }

        return {
            onCancel,
            onOpen
        }
    }
])

