/**
 * @author svenballet 
 * @date 2017-08-17
 */

class LoginPanel extends BasePanel {
    public nameEdit:eui.EditableText;
    public passEdit:eui.EditableText;
    public loginBtn:eui.Button;
    public registBtn:eui.Button;

    public constructor() {
        super();
        this.skinName = "LoginPanelSkin";
	}

    public onEnable() {
        this.loginBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.registBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegist, this);
    }

    public onRemove() {
        this.loginBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLogin, this);
        this.registBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRegist, this);

        this.nameEdit.text = null;
        this.passEdit.text = null;
    }

    private onLogin() {
        if (!this.nameEdit.text || !this.passEdit.text) {
            Tips.show("账号或密码不能为空");
        }
        else {
            //login logic
            SceneManager.Instance.show(SceneConst.HallScene);
        }
    }

    private onRegist() {
        this.hide();
        PanelManager.Instance.show(PanelConst.RegistPanel);
    }
}