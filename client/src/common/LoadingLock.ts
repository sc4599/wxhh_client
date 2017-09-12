/**
 * @author svenballet 
 * @date 2017-09-12
 */
class LoadingLock {
    private lockNum:number;
    private circle:eui.Image;
    private descLab:eui.Label;

    private static _instance: LoadingLock;
    public static get Instance():LoadingLock {
        if (!LoadingLock._instance) {
            LoadingLock._instance = new LoadingLock;
        }
        return LoadingLock._instance;
    }

    constructor() {
        this.lockNum = 0;
        this.circle = new eui.Image();
        this.circle.source = "clockCircle_png";
        this.circle.anchorOffsetX = this.circle.width/2;
        this.circle.anchorOffsetY = this.circle.height/2;
        this.circle.verticalCenter = 0;
        this.circle.horizontalCenter = 0;

        this.descLab = new eui.Label();
        this.descLab.verticalCenter = 50;
        this.descLab.horizontalCenter = 0;
        this.descLab.textColor = 0x000000;
        this.descLab.text = "";
        this.descLab.fontFamily="Microsoft YaHei";
    }

    public addLock(desc:string = "") {
        if (this.lockNum < 0) {
            this.lockNum = 0;
        }
        this.lockNum ++;
        egret.Tween.removeTweens(this.circle);
        this.descLab.text = desc;
        egret.Tween.get(this.circle, {loop: true}).to({rotation: 360}, 1000)
        LayerManager.Instance.lockLayer.addChild(this.circle);
        LayerManager.Instance.lockLayer.addChild(this.descLab);
    }

    public minusLock() {
        this.lockNum --;
        if (this.lockNum <= 0 && this.circle && this.circle.parent) {
            egret.Tween.removeTweens(this.circle);
            LayerManager.Instance.lockLayer.removeChild(this.circle);
            LayerManager.Instance.lockLayer.removeChild(this.descLab);
        }
    }
}