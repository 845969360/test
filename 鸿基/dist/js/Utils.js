var Utils=(function(){
    // SSS
    return {
        loadImage:function(imgSrcList,callBack){
            var img=new Image();
            img.handler=e=>{this.loadHandler(e)};
            img.imgSrcList=imgSrcList;
            img.list=[];
            img.n=0;
            img.callBack=callBack;
            img.addEventListener("load",img.handler);
            img.src=imgSrcList[img.n];
        },
        loadHandler:function(e){
            var img=e.currentTarget;
            img.list.push(img.cloneNode(false));
            img.n++;
            if(img.n>img.imgSrcList.length-1){
                img.removeEventListener("load",this.loadHandler);
                img.callBack(img.list);
                return;
            }
            img.src=img.imgSrcList[img.n];
        }
    }
})();