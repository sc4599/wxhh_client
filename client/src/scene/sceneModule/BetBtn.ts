/**
 * @author svenballet 
 * @date 2017-08-22
 */

enum BetMessage {
    spade,
    heart,
    club,
    diamond,
    joker
}

class BetBtn extends BaseUI {
    public betBtnGro:eui.Group;

    public listener: Function;

    public constructor() {
        super();
        this.skinName = "BetBtnSkin";
	}

    protected onEnable() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
    }

    private onTouch(e: egret.TouchEvent) {
        if (!this.listener) {
            console.error("bet btn do not set listener");
            return;
        }
        var target = e.target;
        var message;
        switch (target) {
            case this.betBtnGro.getChildAt(0):
                message = BetMessage.spade;
                break;
            case this.betBtnGro.getChildAt(1):
                message = BetMessage.heart;
                break;
            case this.betBtnGro.getChildAt(2):
                message = BetMessage.club;
                break;
            case this.betBtnGro.getChildAt(3):
                message = BetMessage.diamond;
                break;
            case this.betBtnGro.getChildAt(4):
                message = BetMessage.joker;
                break;
            default:
                break;
        }
        if (message || message == 0) {
            this.listener(message);
        }
    }

    public setBtnEnabled(flag: boolean) {
        for (var i = 0;i < 5;i ++) {
            (<eui.Button>this.betBtnGro.getChildAt(i)).enabled = flag;
        }
    }
}