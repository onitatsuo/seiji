// This is a JavaScript file
app.controller('NewsCtrl',function($scope){
  var options = $scope.nav.getCurrentPage().options;
  $scope.data = options.data;
    $scope.push = function() {
        nav.pushPage($scope.data.url);
    };
    $scope.windowClick = function(){
        cordova.InAppBrowser.open($scope.data.url, '_system', 'location=yes');
    };
    $(".name").append($scope.data.excerpt);    
});

app.controller('NewsListCtrl', ['$scope', '$q', 'JsService', function($scope, $q, JsService){
    var tab_index = tabbar.getActiveTabIndex();
    switch(tab_index){
        case 0 :
          var category_url = "https://www.seijipress.jp/";//ALL
          $scope.item = {main_title : "最新ニュース", sub_title : "News Flash", icon : "ion-ios-monitor-outline"};
          JsService.get_data($scope,category_url);
          break;
        case 1 :
          var category_url = "https://www.seijipress.jp/category/elections/";//注目選挙
          $scope.item = {main_title : "注目選挙", sub_title : "Elections", icon : "ion-asterisk"};
          JsService.get_data($scope,category_url);  
          break;
        case 2 :
          var category_url = "https://www.seijipress.jp/category/politics/";//政治ニュース
          $scope.item = {main_title : "政治ニュース", sub_title : "Politics", icon : "ion-android-people"};
          JsService.get_data($scope,category_url);  
          break;
        case 3 :
          var category_url = "https://www.seijipress.jp/category/social/";//社会・国際
          $scope.item = {main_title : "社会・国際ニュース", sub_title : "Social&World News", icon : "ion-paper-airplane"};
          JsService.get_data($scope,category_url);  
          break;
    }
}]);
