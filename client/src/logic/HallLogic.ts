/**
 * @author svenballet 
 * @date 2017-08-19
 */

class HallLogic {

    private static _zInstance: HallLogic;
    public static get Instance():HallLogic {
        if (!HallLogic._zInstance) {
            HallLogic._zInstance = new HallLogic;
        }
        return HallLogic._zInstance;
    }
    public destroy() {
        HallLogic._zInstance = null;
    }

    /**游戏socket唯一实例 */
    public get socket() {
        return RunConfig.Instance.webSocket;
    }

    public constructor() {
        this.registSocket();
    }

    private registSocket() {
        this.socket.register(NetHead.head_10000, this.onEnterJd, this);
        this.socket.register(NetHead.head_5002, (data)=>{
            Utils.kickOff(data);
        }, this);
    }

    /**进入经典模式 */
    public enterJd() {
        var data = NetSend.S_10000;
        data.user_id = UserInfo.Instance.userId;
        this.socket.send(NetHead.head_10000, data);
    }

    /**进入经典模式返回 */
    private onEnterJd(data) {
        if (data.code != 1) {
            var desc = "进入房间失败";
            if (data.info && data.info.desc) {
                desc = data.info.desc;
            }
            Tips.show(desc);
            return;
        }

        var scene = SceneManager.Instance.show(SceneConst.GameSceneJd) as GameSceneJd;
        scene.backInit(data.info);
    }
}