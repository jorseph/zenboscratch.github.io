(function (ext) {

    var recursionFlag = true;

    var flagArray = {
        data:[]
    };
	
	diango_ip = "";
    port = ":8000";
	
    ext._shutdown = function () {
        console.log('Shutting down...');

    };

    ext._getStatus = function () {
        return {status: 2, msg: 'Ready'};
    };

    ext.Setting_targetIP = function (ip) {
        console.log("Setting_targetIP");
		diango_ip = ip;
      
    };

    ext.opencv_to_gray = function (p1) {
			
        console.log("opencv_to_gray");
        console.log(diango_ip);
        console.log(p1);
        $.ajax({
            url: 'http://' + diango_ip + port + '/opencv_to_gray/?' + 'p1=' + p1,
            dataType: 'image/png',
            crossDomain: true,
            async: true,
            success: function (data) {
                console.log("success handler");
                $('.div_imagetranscrits').html('<img src="data:image/png;base64,' + data + '">');

            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("error handler");
            }
        });
    };

	
    var TRANSLATIONS = {
        us: {
            Setting_targetIP: 'Set Zenbo IP: %s',
            opencv_to_gray: 'To Gray, read image url: %s',
           
        },
	tw: {
            Setting_targetIP: '設定Zenbo IP: %s',
            opencv_to_gray: '轉灰階, 讀取圖片位址: %s',
            		
        },  		
	cn: {
            Setting_targetIP: '设定Zenbo IP: %s',
            opencv_to_gray: '转灰阶, 读取圖像位址: %s',
           
        },
    }
	
	 function getTranslationForLang( lang ){
        switch (lang){
               case "en":
		    return TRANSLATIONS.us;
	       case "en-us":
		    return TRANSLATIONS.us; 			
               case "zh":
		    return TRANSLATIONS.tw; 	
               case "zh-tw":
		    return TRANSLATIONS.tw; 
               case "zh-cn":
                    return TRANSLATIONS.cn;
               default:
                    return TRANSLATIONS.us;
            
        }
    }
	
    // how which language translation is chosen (increasing priority):
    //   1 - explicit 'lang' parameter in the url (e.g: http://scratchx.org/?url=https://zenboscratch.github.io/extentions/scratch-tensorflow.js&lang=en#scratch)
    //   2 - browser first preferred language (navigator.languages[0])
    //   3 - default (en-us)
		
    var urlParams = new URLSearchParams(window.location.search);
    var lang = ( urlParams.get('lang') || navigator.browserLanguage || navigator.language ).toLowerCase();
    console.log("lang:" + lang);
	
    var translate = getTranslationForLang(lang);
	
	
    var descriptor = {
        blocks: [
            ['', translate.Setting_targetIP, 'Setting_targetIP', "10.193.114.59"],
            ['', translate.opencv_to_gray, 'opencv_to_gray', "https://3spxpi1radr22mzge33bla91-wpengine.netdna-ssl.com/wp-content/uploads/2017/04/iStock-180073266.jpg"],
           
        ],
        menus: {
            

        },
        url: 'https://scorpiosnow.github.io/' // Link to extension documentation, homepage, etc.
    };

    // Register the extension
    ScratchExtensions.register('scratch-tensorflow', descriptor, ext);
})({});
