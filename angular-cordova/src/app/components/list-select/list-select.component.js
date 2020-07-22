app.component('listSelect',{
    template:`
        <ul>
            <item-select 
                ng-repeat='item in lstSelectCtr.dataSelect'
                on-select='lstSelectCtr.onSelect({id})'
                value='item'
            ></item-select>
        </ul>
    `,
    bindings: {
        dataSelect: '<',
        onSelect:'&'
    },
    controllerAs: 'lstSelectCtr',
    controller: listSelectController
})
function listSelectController(){
    const vm=this;
    this.$onChanges=function(changes){
        console.log(changes,'changes')
    }
}