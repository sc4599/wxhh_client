/**
 * @author svenballet 
 * @date 2017-08-19
 */

class LoginLogic {

    private static _zInstance: LoginLogic;
    public static get Instance():LoginLogic {
        if (!LoginLogic._zInstance) {
            LoginLogic._zInstance = new LoginLogic;
        }
        return LoginLogic._zInstance;
    }

    /**游戏socket唯一实例 */
    public get socket() {
        return RunConfig.Instance.webSocket;
    }

    public constructor() {
        EventMananger.Instance.addEvent(EventConst.SocketConnect, this.onServer, this);
        EventMananger.Instance.addEvent(EventConst.SocketIOError, this.onServerFail, this);

        this.registSocket();
    }

    private registSocket() {
        this.socket.register(NetHead.head_5000, this.onLogin, this);
        this.socket.register(NetHead.head_5001, this.onRegist, this);
    }

    /**连接服务器 */
    public connectServer() {
        RunConfig.Instance.webSocket.startConnect(StaticConfig.Instance.wsUrl);
    }

    /**连接成功 */
    private onServer() {
        if(SceneManager.Instance.getCurScene() == SceneManager.Instance.getScene(SceneConst.LoginScene)) {
            PanelManager.Instance.show(PanelConst.LoginPanel);
        }
    }

    /**连接失败 */
    private onServerFail() {
        Tips.show("网络连接错误");
    }

    /**登录请求 */
    public login(name:string = StaticConfig.Instance.testName, pswd:string = StaticConfig.Instance.testPassword) {
        var data = NetSend.S_5000;
        data = {
            user_name: name,
            passwd: pswd
        }
        this.socket.send(NetHead.head_5000, data);
    }

    /**登录返回 */
    private onLogin(data) {
        if (data.code != 1) {
            var desc = "登录失败";
            if (data.info && data.info.desc) {
                desc = data.info.desc;
            }
            Tips.show(desc);
            return;
        }

        SceneManager.Instance.show(SceneConst.HallScene);
    }

    /**注册请求 */
    public regist(name:string, pswd:string) {
        var data = NetSend.S_5001;
        data = {
            user_name: name,
            passwd: pswd
        }
        this.socket.send(NetHead.head_5001, data);
    }

    /**注册返回 */
    private onRegist(data) {
        console.log("onRegist:",data);
        if (data.code != 1) {
            var desc = "注册失败";
            if (data.info && data.info.desc) {
                desc = data.info.desc;
            }
            Tips.show(desc);

            var panel:RegistPanel = PanelManager.Instance.get(PanelConst.RegistPanel);
            if (panel) {
                panel.clearInput();
            }
            return;
        }

        PanelManager.Instance.hide(PanelConst.RegistPanel);
        PanelManager.Instance.show(PanelConst.LoginPanel);
    }
}