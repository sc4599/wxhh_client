/**
 * @author svenballet 
 * @date 2017-08-16
 */

class LoginScene extends BaseScene {
    public constructor() {
        super();
        this.skinName = "LoginSceneSkin";
	}

    public onEnable() {
        PanelManager.Instance.show(PanelConst.LoginPanel);
    }

    public onRemove() {
        PanelManager.Instance.hide(PanelConst.LoginPanel);
    }
}