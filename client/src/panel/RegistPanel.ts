/**
 * @author svenballet 
 * @date 2017-08-18
 */

class RegistPanel extends BasePanel {
    public nameEdit:eui.EditableText;
    public nickNameEdit:eui.EditableText;
    public passEdit:eui.EditableText;
    public registBtn:eui.Button;
    public backBtn:eui.Button;

    public constructor() {
        super();
        this.skinName = "RegistPanelSkin";
	}

    public onEnable() {
        this.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegist, this);
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
    }

    public onRemove() {
        this.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegist, this);
        this.backBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);

        this.nameEdit.text = null;
        this.nickNameEdit.text = null;
        this.passEdit.text = null;
    }

    private onRegist() {
        SoundManager.Instance.playEffect(SoundEffect.BiuDu);

        if (!this.nameEdit.text || !this.passEdit.text || !this.nickNameEdit.text) {
            Tips.show("账号、昵称或密码不能为空");
        }
        else {
            LoginLogic.Instance.regist(this.nameEdit.text, this.passEdit.text);
        }
    }

    public clearInput() {
        this.nameEdit.text = null;
        this.passEdit.text = null;
        this.nickNameEdit.text = null;
    }

    private onBack() {
        SoundManager.Instance.playEffect(SoundEffect.BiuDu);

        this.hide();
        PanelManager.Instance.show(PanelConst.LoginPanel);
    }
}