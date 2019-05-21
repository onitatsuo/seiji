/// ALLL GOOD


// This is a JavaScript file

//タブに表示される各カテゴリーページのコントローラー。
//各カテゴリーのURL・タイトル・サブタイトルを保持する。
//アイコンも何とかしたい。

//->各コントローラーに保存してみた。
//次は表示タブの選定ができるように。
//というか各$scpoe.itemをJsServiceに格納しちゃおう。

app.controller('Page1Ctrl', ['$scope', '$q', 'JsService', function($scope, $q, JsService){
  var category_url = "https://www.seijipress.jp/";//ALL
  $scope.item = {main_title : "最新ニュース", sub_title : "News Flash", icon : "ion-ios-monitor-outline"};
  JsService.get_data($scope,category_url);
  // JsService.get_tag($scope);
}]);


app.controller('Page2Ctrl', ['$scope', '$q', 'JsService', function($scope, $q, JsService){
  var category_url = "https://www.seijipress.jp/category/elections/";//category/%E6%B3%A8%E7%9B%AE%E9%81%B8%E6%8C%99/";///注目選挙
  $scope.item = {main_title : "注目選挙", sub_title : "Elections", icon : "ion-asterisk"};
  JsService.get_data($scope,category_url);  
}]);


app.controller('Page3Ctrl', ['$scope', '$q', 'JsService', function($scope, $q, JsService){
  var category_url = "https://www.seijipress.jp/category/politics/";//category/%E6%94%BF%E6%B2%BB%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9/";///政治ニュース
  $scope.item = {main_title : "政治ニュース", sub_title : "Politics", icon : "ion-android-people"};
  JsService.get_data($scope,category_url);  
}]);


app.controller('Page4Ctrl', ['$scope', '$q', 'JsService', function($scope, $q, JsService){
  var category_url = "https://www.seijipress.jp/category/social/";//category/%E7%A4%BE%E4%BC%9A%E3%83%8B%E3%83%A5%E3%83%BC%E3%82%B9/";///社会・国際
  $scope.item = {main_title : "社会・国際ニュース", sub_title : "Social&World News", icon : "ion-paper-airplane"};
  JsService.get_data($scope,category_url);  
}]);
