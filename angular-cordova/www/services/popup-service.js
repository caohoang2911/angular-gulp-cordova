app.factory('popupService', [
    '$timeout',
    '$rootScope',
    function (
        $timeout,
        $rootScope
    ) {
        $rootScope.popup={}
        showPopupSelect = (config) => {
            const defaultConfig = {
              itemLabel: '',
              popupTitle: '',
              selectedItems: '',
              listItems: '',
              closePopup: hidePopupSelect,
              placeholder: '',
              isParentSearch: false,
              isMultiSelect: false,
              hasChild: false,
              hasBack: true,
              hasAllItem: false,
              onParentSearch: () => { },
              onSelectedItem: () => { },
              onBackToParent: null,
              isSearchbar: true
            };
            $timeout(function(){
                $rootScope.popupSelectConfig = { ...defaultConfig, ...config };
            })
            openPopup('select');
          }
          hidePopupSelect = () => {
            // $('popup-select .popup-select--contain').addClass('slideOutDown');
            // $timeout(() => {
              closePopup('select');
            // }, 300);
          }
         openPopup=(prop)=>{
             $rootScope.popup[prop]=true;   
         }
         closePopup=(prop)=>{
             
             $rootScope.popup[prop]=false;
         }
        return {
            showPopupSelect,
            hidePopupSelect
        }
    },

])

