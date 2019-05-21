/// FIX

// This is a JavaScript file


        
        
app.controller('SettingPushCtrl', function($scope) {
        $scope.data ="NONE";      

        document.addEventListener("deviceready", onDeviceReady, false);
        
        function onDeviceReady() {
            console.log("deviceready");
            var notificationOpenedCallback = function(jsonData) {
                console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
                var tmp_data = JSON.stringify(jsonData.notification.payload.additionalData);
                $scope.data = tmp_data;
                window.myTabbar.setActiveTab(4);
            };
        
            window.plugins.OneSignal
                .startInit("66eafad3-15c9-4299-a36b-c4209607f532")
                .handleNotificationOpened(notificationOpenedCallback)
                .endInit();
        }
});


// app.controller('SettingPushCtrl', ['$scope', '$q', 'JsService', function($scope, $q, JsService){
//    $scope.groups = [];
//     var num_id = 0;
//     var category_name_list = ['全て受け取る','注目選挙','政治','社会・国際'];
//     var category_field_list = ['category_all','category_elections','category_politics','category_social'];
//     var intervalFunc;
//     var data ="NONE";
    

//       // new
//     document.addEventListener("deviceready", onDeviceReady, false);
        
//         function onDeviceReady() {
//             console.log("deviceready");
//             var notificationOpenedCallback = function(jsonData) {
//                 console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
//                 var tmp_data = JSON.stringify(jsonData.notification.payload.additionalData);
//                 $scope.data = tmp_data;
//                 window.myTabbar.setActiveTab(5);
//             };
        
//             window.plugins.OneSignal
//                 .startInit("66eafad3-15c9-4299-a36b-c4209607f532")
//                 .handleNotificationOpened(notificationOpenedCallback)
//                 .endInit();
//         }

//         // new above

//     $scope.setKaihyouData = function(kaihyouList){
//         intervalFunc = setInterval(function() {
//                 if(localStorage.getItem('isSetFirstData') !== null){
//                     var item = JSON.parse(localStorage.getItem('installation'));
//                     accessNCMBData(kaihyouList, item.id);
//                     clearInterval(intervalFunc);
//                 }
//             },1000);
//     }
    
    
//     //設定画面の表示設定通信で取得したタグリストから作成
//     function accessNCMBData(kaihyouList,id){
//         var promise = ncmb.Installation.fetchById(id);
//         promise = promise.then(function(data){
//             // 取得後の処理
//             var prom = new Promise(function(resolve,reject){
//                 var result = dataMake(kaihyouList,data);
//                 if(result.length > 0){
//                     resolve(result);
//                 }else{
//                     reject(0);
//                 }
//             });
//             $scope.test_atai = true;
//             return prom;
//         })
//         .catch(function(err){
//             // エラー処理
//             service.alertMake('エラー','通信に失敗しました。');
//         });
        
//         promise.then(function onFulfilled(response){
//                 setCategory(response[0],response[1],response[2],response[3]);
//             },
//             function onRejected(reason){
//                 // 失敗時に呼び出される
//                 service.alertMake('エラー','画面の設定に失敗しました。');
//         });
        
//     }
    
//     function dataMake(kaihyouList,data){
//         var list_size = [category_name_list.length,kaihyouList.length];
//         var category_checks = [];
//         var senkyo_checks = [];
//         var senkyoList = [];
//         var result = [];
//         var push_check = false;
//         if(typeof data !== "undefined"){
//             (typeof data.get('push') === "undefined") ? push_check = false : push_check = data.get('push');
//             for(var i = 0; i < list_size[0];i++){
//                 (typeof data.get(category_field_list[i]) === "undefined") ? category_checks.push(false) : category_checks.push(data.get(category_field_list[i]));
//             }
//             (typeof data.get('senkyoALLPush') === "undefined") ? senkyo_checks.push(false) : senkyo_checks.push(data.get('senkyoALLPush'));
            
//             var isGetSenkyoList = false;
//             (typeof data.get('senkyoList') === "undefined") ? isGetSenkyoList = false : isGetSenkyoList = true;
//             senkyoList = data.get('senkyoList');
//             for(var i = 1; i < list_size[1]; i++){
//                 if(!isGetSenkyoList){
//                     senkyo_checks.push(false);
//                 }else if(senkyoList.indexOf(kaihyouList[i].id) >= 0){
//                     senkyo_checks.push(true);
//                 }else{
//                     senkyo_checks.push(false);
//                 }
//             }
//             result.push(push_check);
//             result.push(kaihyouList);
//             result.push(category_checks);
//             result.push(senkyo_checks);
//         }
//         return result;
//     }
    
//     function setCategory(push_check,kaihyouList,category_checks,senkyo_checks){
//         $scope.push_checked = push_check;
//         var list_size = [category_name_list.length,kaihyouList.length];
//         for (var i = 0; i < 2; i++) {
//             if(i==0){
//                 title = 'カテゴリー';
//             }else{
//                 title = '開票速報';
//             }
//             $scope.groups[i] = {
//                 title: title,
//                 items: []
//             };
//             for (var j = 0; j < list_size[i]; j++) {
//                 if(i == 0){
//                     item_name = category_name_list[j];
//                     listId = num_id;
//                     num_id++;
//                     item_checked = category_checks[j];
//                 }else{
//                     item_name = kaihyouList[j].title;
//                     listId = kaihyouList[j].id;
//                     item_checked = senkyo_checks[j];
//                 }
//                 $scope.groups[i].items[j] = {
//                     name: item_name,
//                     id: listId,
//                     checked: item_checked
//                 };
//             }
//         }
//         if($scope.push_checked){
//             $scope.push_text = 'ON';
//         }else{
//             $scope.push_text = 'OFF';
//         }
//         $scope.success = true;
//         $scope.$apply();
//     }
    
//    $scope.onSwitchChange = function(push){
       
//         if(push){
//             $scope.push_text = 'ON';
//         }else{
//             $scope.push_text = 'OFF';
//         }
//    }
   
//     $scope.toggleGroup = function(group) {
//         if ($scope.isGroupShown(group)) {
//             $scope.shownGroup = null;
//         } else {
//             $scope.shownGroup = group;
//         }
//     };
  
//     $scope.isGroupShown = function(group) {
//         return $scope.shownGroup === group;
//     };
    
//     //設定画面の「SAVE」ボタンが押された時の処理
//     //NCMBのinstallationクラスに設定内容を保存する
//     $scope.onSaveSetting = function(){
//         setModal.show();
//         var item = JSON.parse(localStorage.getItem('installation'));
//         ncmb.Installation.fetchById(item.id)
//         .then(function(data){
//             data.set('push',$scope.push_checked);
//             for(var i = 0;i < $scope.groups[0].items.length;i++){
//                 data.set(category_field_list[i],$scope.groups[0].items[i].checked);
//             }
//             var senkyoCheckList = [];
//             data.set('senkyoALLPush',($scope.groups[1].items[0].checked));
//             for(var i = 1;i < $scope.groups[1].items.length;i++){
//                 if($scope.groups[1].items[i].checked){
//                     senkyoCheckList.push($scope.groups[1].items[i].id);
//                 }
//             }
//             data.set('senkyoList',senkyoCheckList);
//             return data.update();
//         })
//         .then(function(installation){
//             // 更新後の処理
//             setModal.hide();
//             JsService.alertMake('更新成功','設定の更新に成功しました。');
//         })
//         .catch(function(err){
//             // エラー処理
//             setModal.hide();
//             JsService.alertMake('更新失敗','設定の更新に失敗しました。');
//         });
//     }
    
//     JsService.getJsonSenkyoList($scope);
// }]);
