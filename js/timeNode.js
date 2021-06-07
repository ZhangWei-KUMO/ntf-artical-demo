$(".box").on("click",".fold",function(){
    var title = $(this);
    var hiden = $(this).next().is(":hidden");
    title.next().slideToggle();
    setTimeout(function(){
        console.log(hiden);
        if(hiden){
            title.next().find(".box-content").slideDown();
        }else{
           
            title.next().find(".box-content").slideUp();
        }
        
    },100);
});
var styleObj = new Object();
var conObj = new Object();
function settingOption(option){
   
    styleObj = eval('option.style');

    conObj = eval('option.content');
    // console.log(conObj);

    // 循环内容对象
    $.each(conObj,function(){
        // foldDivs 里面的主体内容
        var content = "";

        // 左边栏内容
        var contentLeft = "";
        // 右边栏内容
        var contentRight = "";
        // 获取当前集合
        var curist = $(this);
        // 遍历当前集合
        for(var i=0;i<curist.length;i++){
            // console.log(curist[i]);
            // 获取节点类型
            var nodeType = curist[i].type;
            
            if(nodeType == 'head' ){
                var nodeTitle = curist[i].title;
                $(
                    "<div class='title fold'>"+
                    nodeTitle +
                    "</div>"
                ).appendTo(".box");

            }else if(nodeType == 'body'){
                // 获取侧边栏标题
                var nodeTitle = curist[i].contentTitle;
                // 获取侧边栏内容
                var contentBody = curist[i].contentBody;
                // 获取显示的方向
                var showDirection = curist[i].showDirection;
               
                

                // 判断是否为左侧或者两侧都显示
                contentLeft = duagLeft(showDirection, nodeTitle, contentBody);

                // 判断是否为右侧或者两侧都显示
                contentRight = duagRight(showDirection, nodeTitle, contentBody);
                
                // 组合content内容
                var nowcontent = makeUpContent(contentLeft,contentRight);
                
                content = content + nowcontent;
                
            };

        }
        // 将当前的节点填充到foldDivs中
        fillInFoldDivs(content);
        
        
    });

    // 判断是否为左侧
    function duagLeft(showDirection, nodeTitle, contentBody) { 
        if(showDirection == "left"){
            // 左侧内容栏
            contentLeft = 
                            
            "<div class='content-left-box'>"+
                "<div class='box-title'>"+
                    "<div class='msg-right'></div>"+
                    nodeTitle +
                "</div>"+
                "<div class='box-content'>"+
                    contentBody +
                "</div>"+     
            "</div>";
            return contentLeft;
        }
        return "";
     }
    
    // 判断是否为右侧
    function duagRight(showDirection, nodeTitle, contentBody) { 
        if(showDirection == "right"){
            // 右侧内容栏
            contentRight = 
            
            "<div class='content-right-box'>"+
                " <div class='box-title'>"+
                    "<div class='msg-left'></div>"+
                    nodeTitle +
                "</div>"+
                "<div class='box-content'>"+
                    contentBody +
                "</div>"+
                
            "</div>";
            return contentRight;
        }
        return "";
        
     }
     
    // 组合content内容
     function makeUpContent(contentLeft,contentRight){
        let str = 
        "<div class='content'>"+
            "<div class='content-left'>"+
                contentLeft +
            "</div>"+
            "<div class='line'>"+
                "<div class='midden-line'>"+
                    "<div class='node'></div>"+
                "</div>"+
            "</div>"+
            "<div class='content-right'>"+
                contentRight +
            "</div>"+
        "</div>";
        contentLeft = "";
        contentRight = "";
        return str;
     }

    // 将当前的节点填充到foldDivs中
    function fillInFoldDivs(content){
        $(
            "<div class='foldDivs'>"+
                content +
            "</div>"
            ).appendTo(".box");
    }

}