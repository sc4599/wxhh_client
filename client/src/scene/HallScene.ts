/**
 * @author svenballet 
 * @date 2017-08-18
 */

class HallScene extends BaseScene {
    public wxhhBtn:eui.Button;
    public qysBtn:eui.Button;
    public rightGro:eui.Group;
    public jdBtn:eui.Button;
    public djBtn:eui.Button;
    public cxBtn:eui.Button;
    public qysRoomBtn:eui.Button;

    public constructor() {
        super();
        this.skinName = "HallSceneSkin";
	}

    protected childrenCreated() {
        this.initUI();
    }

    protected onEnable() {
        this.wxhhBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onWxhh, this);
        this.qysBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onQys, this);
        this.jdBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
        this.djBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
        this.cxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
        this.qysRoomBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
    }

    protected onRemove() {
       this.wxhhBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onWxhh, this);
       this.qysBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onQys, this);
       this.jdBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
       this.djBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
       this.cxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
       this.qysRoomBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRoom, this);
    }

    private initUI() {
        this.rightGro.getChildAt(0).visible = true;
        this.rightGro.getChildAt(1).visible = false;
    }

    private onWxhh() {
        this.rightGro.getChildAt(0).visible = true;
        this.rightGro.getChildAt(1).visible = false;
    }

    private onQys() {
        this.rightGro.getChildAt(0).visible = false;
        this.rightGro.getChildAt(1).visible = true;
    }

    private onRoom(e: egret.Event) {
        var target = e.target;
        switch (target) {
            case this.jdBtn:
                // SceneManager.Instance.show(SceneConst.GameSceneJd);
                HallLogic.Instance.enterJd();
                break;
            default:
                Tips.show("敬请期待");
        }
    }
}