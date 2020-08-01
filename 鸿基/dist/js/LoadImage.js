export default class LoadImage{
    static srcList;
    static callback;
    static num=0;
    static list=[];
    static load(srcList,callback){
        LoadImage.num=0;
        LoadImage.list.length=0
        var img=new Image();
        LoadImage.srcList=srcList;
        LoadImage.callback=callback;
        img.addEventListener("load",LoadImage.loadHandler);
        img.src=srcList[0]
    }
    static loadHandler(e){
        var img=e.currentTarget;
        LoadImage.list.push(img.cloneNode(false));
        LoadImage.num++;
        if(LoadImage.num>LoadImage.srcList.length-1){
            img.removeEventListener("load",LoadImage.loadHandler);
            LoadImage.callback(LoadImage.list);
            return;
        }
        img.src=LoadImage.srcList[LoadImage.num];
    }
}