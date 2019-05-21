// // This is a JavaScript file
    
    
    //全コントローラーで使用できる関数・値を置いておけるファクトリー。
    //sessionStorageに近い？そんなことない？
    // app.factory('JsService', ['$q', '$http', function($q, $http) {
    app.factory('JsService', ['$q', '$http', function($q, $http) {
    var service = {};

    //cetegory_urlからのJSONデータの取得。戻り値：promiseオブジェクト。
    function jsdata(category_url){
      //リクエスト内容
      var req = {
        method: 'GET',
        url: category_url + '?json=get_recent_posts',
        responseType: 'json',
        timeout: 10000
      };  
      //プロミスオブジェクトを返す
      return $http(req);
    }
    
    //配列内のkeyが含まれているかのサーチ。有ればtrue,なければfalse
    function contains(array, searchKey){
        contain = false;
        for(var key in array){
            if(key === searchKey){
                contain = true;
                break;
            }
        }
        return contain;
    }
    
    //JSONデータを取得する関数。
    service.get_data = function($scope,category_url){
        $scope.data = [];
        promise  = jsdata(category_url);
        
        promise.then(
            
            function onFulfilled(strs){
                console.log('通信が成功しました' + strs.data.posts.length);
                // 成功時に呼び出される
                //サイトでno-img画像を使用されるとエラー->thumbnail_imagesがなくなるため、
                //containsで判定->ture=元画像、false=アプリ内no_img
                if(strs.data.posts.length > 0){
                    var img_medium=[];
                    var img_thumbnail=[];
                    for(var i=0;i<10;i++){


                        // 修正開始

                        // if(contains(strs.data.posts[i], "thumbnail_images")){
                        if(contains(strs.data.posts[i], "thumbnail_images") && strs.data.posts[i].thumbnail_images.length > 0){

                        // 修正終了

                            img_medium.push(strs.data.posts[i].thumbnail_images.medium.url);
                        }//  else {
                       //     img_medium.push("images/no_img.png");
                       // }
                        
                        if(contains(strs.data.posts[i], "thumbnail")){
                            img_thumbnail.push(strs.data.posts[i].thumbnail);
                        }else {
                          img_thumbnail.push("images/no_img.png");
                       }
                   }
                    // //成功時
                    // console.log(strs);
                    // $scope.status = strs.status;

                    //ID、タイトル、画像(サムネ)、日付、抜粋、対象URL、画像(medium)が入っている。
                    //JSONデータ最大数の10件を取得。
                    for(var i in strs.data.posts){
                    $scope.data.push({
                        id : i, title : strs.data.posts[i].title,
                        thumbnail : img_thumbnail[i],
                        date : strs.data.posts[i].date,
                        excerpt : strs.data.posts[i].excerpt,
                        url : strs.data.posts[i].url,
                        medium : img_medium[i]
                        });
                    }
                    $scope.success = true;
                }else{
                    service.alertMake('エラー','情報の取得に失敗しました。');
                }
            },
            function onRejected(reason){
                // 失敗時に呼び出される
                if(reason.status == 0 || reason.status == 408){
                    var networkState = navigator.connection.type;
                    if(networkState == Connection.NONE){
                        service.alertMake('エラー','通信に失敗しました。<br>通信環境が良好な場所で再度お試しください。');
                        console.log('通信に失敗しました');
                    }else{
                        service.alertMake('エラー','通信がタイムアウトしました。<br>時間をおいて再度お試しください。');
                        console.log('通信がタイムアウトしました');
                    }
                }else{
                    service.alertMake('エラー','情報の取得に失敗しました。');
                    console.log('情報の取得に失敗しました');
            }
    });
  };
  
    // now = new Date();
    // d : 0 = Sunday, 1 = Monday, ...
    //$scope.getNextWeekDay = function(now,d)
    
    function getNextWeekDay(now,d){
        var x;
        if(d > now.getDay()){
            x = d - now.getDay();
        }else{
            x = (( 7 + d ) - now.getDay());
        }
        now.setDate( now.getDate() + x );
        return now;
    };
    
    //次の日曜日の年月日（例：20160609）を返す
    //取得日が日曜ならその日を返す
    function getNextSunDay(){
        var now = new Date();
        var x;
        if(now.getDay() == 0){
            x = 0;
        }else{
            x = ( 7 - now.getDay() );
        }
        now.setDate( now.getDate() + x );
        
        var day = now.getFullYear() + '年' + (now.getMonth() + 1) + '月' + now.getDate() + '日';
        return day;
    };

    //指定したタグのリストを取得し、設定画面に渡す関数。
    //呼び出しも設定画面で行われる。
    service.getJsonSenkyoList = function($scope){
        var sunDay = getNextSunDay();
        var req = {
            method: 'GET',
            url: 'http://www.seijipress.jp/?json=get_tag_posts&count=-1&tag_slug=' + sunDay,
            responseType: 'json',
            timeout: 10000
        };
        var res = $http(req);
        var success = false;
        res.then(
            // 成功時に呼び出される
            function onFulfilled(response){
                var titleArray = [];
                titleArray.push({
                            title:'全て受け取る',
                            id: 0
                        });
                for(var i = 0; i < response.data.posts.length ;i++){
                    if(response.data.posts[i].title.indexOf('開票速報')!=-1&&response.data.posts[i].title.indexOf('当選落選結果')!=-1){
                        titleArray.push({
                            title: response.data.posts[i].title.split('開票速報')[0],
                            id: response.data.posts[i].id
                        });
                    }
                }
                $scope.setKaihyouData(titleArray);
            },
            // 失敗時に呼び出される
            function onRejected(reason){
                if(reason.status == 0 || reason.status == 408){
                    var networkState = navigator.connection.type;
                    if(networkState == Connection.NONE){
                        service.alertMake('エラー','通信に失敗しました。<br>通信環境が良好な場所で再度お試しください。');
                        console.log('通信に失敗しました');
                    }else{
                        service.alertMake('エラー','通信がタイムアウトしました。<br>時間をおいて再度お試しください。');
                        console.log('通信がタイムアウトしました');
                    }
                }else{
                    service.alertMake('エラー','情報の取得に失敗しました。');
                    console.log('情報の取得に失敗しました');
                }
        });
    }
    
    service.alertMake = function(a_title,a_message){
        ons.notification.alert({
                title: a_title,
                messageHTML: a_message
            });
    }
    
    return service;
}]);
