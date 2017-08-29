/**
 * @author svenballet 
 * @date 2017-08-17
 */

class MessageBoxPanel extends BasePanel {
    public singleOkBtn:eui.Button;
    public cancleGro:eui.Group;
    public okBtn:eui.Button;
    public cancleBtn:eui.Button;
    public msgLabel:eui.Label;

    private okCallback:Function;
    private cancleCallback:Function;
    private thisObject:any;

    public constructor() {
        super();
        this.skinName = "MessageBoxSkin";
	}

    protected onEnable() {
        this.singleOkBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
        this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSure, this);
        this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancle, this);
    }

    public showMsg(msg:string, okCallback:Function = null, thisObj:any = null, cancleCallback:Function = null) {
        this.okCallback = okCallback;
        this.thisObject = thisObj;
        this.cancleCallback = cancleCallback;

        if (this.cancleCallback) {
            this.singleOkBtn.visible = false;
            this.cancleGro.visible = true;
        }
        else {
            this.singleOkBtn.visible = true;
            this.cancleGro.visible = false;
        }

        this.msgLabel.text = msg;
    }

    private onSure() {
        this.hide();
        this.okCallback && this.okCallback.call(this.thisObject);
    }

    private onCancle() {
        this.hide();
        this.cancleCallback && this.cancleCallback.call(this.thisObject);
    }
}