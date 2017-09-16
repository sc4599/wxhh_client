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

    private lastList:Array<number>;

    private static _zInstance: GameLogicJd;
    public static get Instance():GameLogicJd {
        if (!GameLogicJd._zInstance) {
            GameLogicJd._zInstance = new GameLogicJd;
        }
        return GameLogicJd._zInstance;
    }
    public destroy() {
        GameLogicJd._zInstance = null;
    }

    public constructor() {
        this.registSocket();
        this.lastList = [0,0,0,0,0];
    }

    /**游戏socket唯一实例 */
    public get socket() {
        return RunConfig.Instance.webSocket;
    }

    public get scene():GameSceneJd {
        return SceneManager.Instance.getScene(SceneConst.GameSceneJd);
    }

    private registSocket() {
        this.socket.register(NetHead.head_10001, this.onBack, this);
        this.socket.register(NetHead.head_10002, this.onBet, this);
        this.socket.register(NetHead.head_10101, this.pullAllBet, this);
        this.socket.register(NetHead.head_10100, this.roundStart, this);
        this.socket.register(NetHead.head_10102, this.revAward, this);
        this.socket.register(NetHead.head_10005, this.onBet, this);
        this.socket.register(NetHead.head_5002, (data)=>{
            Utils.kickOff(data);
        }, this);
    }

    public bet(type:number) {
        if (!RunConfig.Instance.betStatus) {
            SoundManager.Instance.playEffect(SoundEffect.BetWarn);
            Tips.show("不在押注时间");
        }
        SoundManager.Instance.playEffect(SoundEffect.BetOrBegin);
        var data = NetSend.S_10002;
        data.card_type = type;
        data.num = this.betNum;
        data.user_id = UserInfo.Instance.userId;
        this.socket.send(NetHead.head_10002, data);
    }

    private onBet(data) {
        if (data.code != 1) {
            SoundManager.Instance.playEffect(SoundEffect.BetWarn);
            var desc = "押注失败";
            if (data.info && data.info.desc) {
                desc = data.info.desc;
            }
            Tips.show(desc);
            return;
        }
        else {
            this.scene.refreshInLab(data.info);
            this.scene.refreshGold(data.info.gold); 
        }
    }

    public continueBet() {
        if (!RunConfig.Instance.betStatus) {
            SoundManager.Instance.playEffect(SoundEffect.BetWarn);
            Tips.show("不在押注时间");
            return;
        }
        var continueFlag:boolean = false;
        for (var i = 0;i < this.lastList.length;i ++) {
            if (this.lastList[i]) {
                continueFlag = true;
                break;
            }
        }
        if (!continueFlag) {
            SoundManager.Instance.playEffect(SoundEffect.BetWarn);
            Tips.show("无押注记录");
            return;
        }
        SoundManager.Instance.playEffect(SoundEffect.ContinueBet);
        var data = NetSend.S_10005;
        data.user_id = UserInfo.Instance.userId;
        data.bet_list = this.lastList;
        this.socket.send(NetHead.head_10005, data);
    }

    private pullAllBet(data) {
        if (data) {
            this.scene.refreshAllLab(data);
        }
    }

    /**round begin */
    private roundStart(data) {
        console.log("round start:", data);
        
        RunConfig.Instance.betStatus = true;
        this.scene.showRoundStart();

        SoundManager.Instance.playEffect(SoundEffect.BetOrBegin);
    }

    /**give award */
    private revAward(data) {
        console.log("revAward::", data);
        this.lastList = [];
        var bet = data.bet_info;
        this.lastList.push(bet.spade || 0);
        this.lastList.push(bet.heart || 0);
        this.lastList.push(bet.club || 0);
        this.lastList.push(bet.diamond || 0);
        this.lastList.push(bet.joker || 0);

        RunConfig.Instance.betStatus = false;
        this.scene.showResult(data);
        this.scene.refreshGold(data.gold);

        SoundManager.Instance.playCardSound(data.card);
        if (data.award > 0) {
            setTimeout(function() {
                SoundManager.Instance.playEffect(SoundEffect.Win);
            }, 1000);
        }
    }

    public back() {
        this.socket.send(NetHead.head_10001, NetSend.S_000);
    }

    private onBack(data) {
        if (data.code != 1) {
            var desc = "退出失败";
            if (data.info && data.info.desc) {
                desc = data.info.desc;
            }
            Tips.show(desc);
            return;
        }
        else {
            this.scene.backToHall();
        }
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