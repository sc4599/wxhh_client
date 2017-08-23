/**
 * @author svenballet 
 * @date 2017-08-23
 */

enum BetLevel {
    small = 1000,
    middle = 10000,
    big = 100000
}

class GameLogicJd {

    public betNum: BetLevel = BetLevel.small;

    private static _zInstance: GameLogicJd;
    public static get Instance():GameLogicJd {
        if (!GameLogicJd._zInstance) {
            GameLogicJd._zInstance = new GameLogicJd;
        }
        return GameLogicJd._zInstance;
    }

    public constructor() {
        this.registSocket();
    }

    /**游戏socket唯一实例 */
    public get socket() {
        return RunConfig.Instance.webSocket;
    }

    public get scene():GameSceneJd {
        return SceneManager.Instance.getScene(SceneConst.GameSceneJd);
    }

    private registSocket() {
        this.socket.register(NetHead.head_10002, this.onBet, this);
    }

    public bet(type:number) {
        var data = NetSend.S_10002;
        data.card_type = type;
        data.num = this.betNum;
        data.user_id = UserInfo.Instance.userId;
        this.socket.send(NetHead.head_10002, data);
    }

    private onBet(data) {
        if (data.code != 1) {
            var desc = "押注失败";
            if (data.info && data.info.desc) {
                desc = data.info.desc;
            }
            Tips.show(desc);
            return;
        }
        //bet success logic
    }

    public nextBetLevel() {
        if (this.betNum == BetLevel.small) {
            this.betNum = BetLevel.middle;
        }
        else if (this.betNum == BetLevel.middle) {
            this.betNum = BetLevel.big;
        }
        else {
            this.betNum = BetLevel.small;
        }
        this.scene.refreshBetLab(this.betNum);
    }
}