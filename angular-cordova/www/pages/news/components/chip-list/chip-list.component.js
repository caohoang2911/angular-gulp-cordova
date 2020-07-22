app.component('chipList', {
    template: `
        <ul  class='chip-filter'>
            <li ng-repeat='chip in chipListCtr.dtChip'>
                <chip 
                    value='chip' 
                    on-click='chipListCtr.onClick({id})'
                    is-close='false'
                ></chip>
            </li>
        </ul>
    `,
    bindings: {
        dtChip: '<',
        onClick:'&',
    },
    controller: ['$scope','$rootScope', function ($scope,$rootScope) {
        const vm = this;
        let sub=null;
            
        vm.$onInit = function () {
            console.log(vm.dtChip)
            sub=team();
        }
        const team = function () {
            return $rootScope.$watch('$root.ok', function (newValue, oldValue) {
                console.log(newValue, oldValue, 'okd')
            })
        }

        $rootScope.$watch('dtChip', function (newValue, oldValue) {
            console.log(newValue, oldValue, 'okd')
        })
        vm.$onChanges = function (changes) {
            console.log(changes)
        }
        vm.$onDestroy = function () {
            sub();
        }
    }],
    controllerAs: 'chipListCtr'
})