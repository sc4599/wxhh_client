/**
 * @author svenballet 
 * @date 2017-08-16
 */

class LayerManager {
    /**根容器*/
    private rootLayer: eui.UILayer;
    /**场景层*/
    public sceneLayer: eui.UILayer;
    /**弹框层*/
    public popLayer: eui.UILayer;
    /**消息层*/
    public msgLayer:eui.UILayer;
    /**锁定动画层*/
    public lockLayer:eui.UILayer;
    /**提示语层*/
    public tipLayer:eui.UILayer;

    public static _instance: LayerManager;
    public static get Instance():LayerManager {
        if (!LayerManager._instance) {
            LayerManager._instance = new LayerManager;
        }
        return LayerManager._instance;
    }
   
    public constructor() {
        this.rootLayer = new eui.UILayer();
        this.rootLayer.percentWidth = 100;
        this.rootLayer.percentHeight = 100;
        this.rootLayer.touchEnabled = false;
        egret.MainContext.instance.stage.addChild(this.rootLayer);

        this.sceneLayer = new eui.UILayer();
        this.sceneLayer.touchEnabled = false;
        this.rootLayer.addChild(this.sceneLayer);
        
        this.popLayer = new eui.UILayer();
        this.popLayer.touchEnabled = false;
        this.rootLayer.addChild(this.popLayer);
        
        this.lockLayer = new eui.UILayer();
        this.lockLayer.touchEnabled = false;
        this.rootLayer.addChild(this.lockLayer);

        this.msgLayer = new eui.UILayer();
        this.msgLayer.touchEnabled = false;
        this.rootLayer.addChild(this.msgLayer);
        
        this.tipLayer = new eui.UILayer();
        this.tipLayer.touchEnabled = false;
        this.rootLayer.addChild(this.tipLayer); 
    }
} 