app.component('itemSelect', {
    template: `<li 
                onSelect='itemSelectCtrl.onSelect({id:itemSelectCtrl.value.id})'
                class="item item--select">{{itemSelectCtrl.value.name}}</li>`,
    bindings: {
        value: '<',
        onSelect:'&'
    },
    controllerAs:'itemSelectCtrl',
})
