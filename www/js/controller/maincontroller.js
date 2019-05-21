// This is a JavaScript file

    //index.html(page1.html)起動時に呼ばれるコントローラー。
    //オブジェクトIDと端末情報を更新してる。
    //前回起動時から6時間以内ならAPIリクエストは投げられない。
app.controller('MainCtrl',['$scope','$filter',function($scope,$filter){
    
    // var application_key = "89adba6321a77f44a003dc86a7539c069952c73000e4f7606346f1d4604356ac";//本番用"992d196eacd7d60ec3f35f1efd7f51842058c154510c9f4b55d737cde0cc95d0";//アプリケーションキー
    // var client_key = "d310b8b47a582483126b38350c9cb103f7c94930e90e3db494484742d00be2da";//本番用14b847a69ccd48495a1879520e5af5af5f6433e11252d8e5c04e4aef247ed7b3";//クライアントキー
    var sender_id = "526279944780";//プロジェクト番号
    var intervalID;

    //取得時間の比較。前回取得時間が現在と比べて18時間以内ならtrue、それ以上ならfalse。
    //undefineでもtrue。
    function isDateCount(){
        if(localStorage.getItem('installation') === null){
            return true;
        } else {
            var dateOld = JSON.parse(localStorage.getItem('installation')).date;
            var dateCount = new Date().getTime()/3600000 - dateOld;
            if(dateCount > 6) return true;
            else return false;
        }
    }
        
    //NCMBに登録したinstalltionのobjectIdと現在日時をlocalstorageに保存する。
    function setData(setFirstData) {
        window.NCMB.monaca.getInstallationId(function(id) {
            if(id != null){
                localStorage.setItem('installation' , JSON.stringify({
                    id : id ,
                    date : new Date().getTime()/3600000
                }));
                
                if(setFirstData){
                    var category_field_list = ['category_elections','category_politics','category_social'];
                    ncmb.Installation.fetchById(id)
                    .then(function(data){
                        data.set('push',true);
                        data.set('category_all',true);
                        for(var i = 0;i < category_field_list.length; i++){
                            data.set(category_field_list[i],false);
                        }
                        data.set('senkyoALLPush',true);
                        data.set('senkyoList',[]);
                        return data.update();
                    })
                    .then(function(installation){
                        // 更新後の処理
                        localStorage.setItem('isSetFirstData' , true);
                        clearInterval(intervalID);
                    })
                    .catch(function(err){
                        // エラー処理
                        clearInterval(intervalID);
                    });
                }
            }else{
                
            }
        });
    }
    
    //localstorageにidが無い or isDateCountがfalseを返した場合のみ、デバイストークンの登録作業を行なう。
  /*  document.addEventListener("deviceready", function(){
        // 開封通知登録の設定
        // trueを設定すると、開封通知を行う
        window.NCMB.monaca.setReceiptStatus(true);
        if(localStorage.getItem('isSetFirstData') === null){
            window.NCMB.monaca.setDeviceToken(application_key,client_key,sender_id);
            intervalID = setInterval(function() { setData(true); },1000);
        }else if(isDateCount()==true){
            // デバイストークンを取得してinstallation登録が行われます
            // ※ aplication_key,client_keyはニフティクラウドmobile backendから発行されたkeyに置き換えてください
            // ※ sender_idは【GCMとの連携に必要な準備】で作成したProjectのProject Numberを入力してください
            window.NCMB.monaca.setDeviceToken(application_key,client_key,sender_id);
            setData(false);
        }
    },false);
    */    
}]);


