app.component('newsComponent', {
    templateUrl: '/pages/news/news.template.html',
    controller: newsController,
    controllerAs: 'newsCtrl'
})
newsController.$inject = [
    '$scope',
    '$rootScope',
    '$timeout',
    'popupService'
]

function newsController(
    $scope,
    $rootScope,
    $timeout,
    popupService
) {
    $scope.jsonFake = [
        {
            id: 'category',
            name: 'Category'
        },
        {
            id: 'price',
            name: 'Price'
        },
        {
            id: 'area',
            name: 'Area'
        },
        {
            id: 'Orientation',
            name: 'orientation'
        },

        {
            id: 'construcion',
            name: 'Construction'
        },
        {
            id: 'project',
            name: 'Project'
        },
    ]
    $scope.openModal = function () {
        const config={
            listItems:$scope.jsonFake
        }
        popupService.showPopupSelect(config) 
    }
    $scope.onHandleCancel = function () {
        popupService.onCancel()

    }
    
    this.onClickChip = (id)=>{
        popupService.onOpen()
    }
}
function filterAction(jsonFake, id) {
    return jsonFake.filter((jsonF) => {
        
        console.log(jsonF, 'jsonF')
        return jsonF.id != id;
    })
}