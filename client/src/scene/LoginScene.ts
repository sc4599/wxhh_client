/**
 * @author svenballet 
 * @date 2017-08-16
 */

class LoginScene extends BaseScene {
    public constructor() {
        super();
        this.skinName = "LoginSceneSkin";
        LoginLogic.Instance.connectServer();
	}

    public onEnable() {
        SoundManager.Instance.playBGM(SoundBgm.LoginScene);
    }

    public onRemove() {
    }
}