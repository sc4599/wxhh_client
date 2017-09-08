/**
 * @author svenballet 
 * @date 2017-08-18
 */

class GameSceneJd extends BaseScene {
    public cardMod:CardMod;
    public timeMod:TimeMod;
    public recordMod:RecordList;
    public betMod:BetBtn;
    public betLabMod:BetLab;
    public backBtn:eui.Button;
    public setBtn:eui.Button;
    public changeBtn:eui.Button;
    public continueBtn:eui.Button;
    public betLevelLab:eui.BitmapLabel;
    public starImg:eui.Image;
    public goldLab:eui.BitmapLabel;
    public diamondLab:eui.BitmapLabel;

    private starMovie:BitmapMovie;

    public constructor() {
        super();
        this.skinName = "GameSceneJdSkin";
	}

    public get logic():GameLogicJd {
        return GameLogicJd.Instance;       
    }

    protected childrenCreated() {
        this.logic;
        this.betMod.listener = (msg)=>{
            this.onTouchBet(msg);
        };
        this.initStarMovie();
        this.initCardMode();
        this.initTimeMode();
    }

    protected onEnable() {
        SoundManager.Instance.playBGM(SoundBgm.GameSceneJd);

        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);

        this.init();
        this.playStarMovie();
    }

    /**退出时需要清除的东西 */
    protected onRemove() {
        this.starMovie.stop();
    }

    private initStarMovie() {
        this.starImg.visible = false;
        this.starMovie = new BitmapMovie();
        this.starMovie.setImgBuffer("star",1,52);
        this.starMovie.frameTime = 59;
        this.starMovie.x = 584;
        this.starMovie.y = 500;
    }

    private playStarMovie() {
        this.addChild(this.starMovie);
        this.starMovie.gotoAndPlay(1,-1);
    }

    /**初始化界面 */
    public backInit(data) {
        if (data.bet_info) {
            if (data.bet_info.bet_static[0] || data.bet_info.bet_static[0] == 0) {
                this.betLabMod.refreshAllLab(data.bet_info.bet_static);
            }
            else {
                this.betLabMod.refreshAllLab([0,0,0,0,0]);
                console.error("bet_static error");
            }
            
            if (data.bet_info.own_bet.club) {
                this.betLabMod.refreshInLab(data.bet_info.own_bet);
            }
            else {
                this.betLabMod.refreshInLab([0,0,0,0,0]);
                console.error("own_bet error");
            }
        }

        if (data.last_records) {
            var list = [];
            if (data.last_records.length >= 48) {
                for (var i = 0;i < 20;i++) {
                    list.push(data.last_records[data.last_records.length-i-1]);
                }
            }
            else {
                list = data.last_records;
            }
            this.recordMod.showList(list);
        }

         this.refreshGold(data.gold);
    }

    private init() {
        this.betMod.setBtnEnabled(false);
        this.refreshBetLab(BetLevel.small);
        this.refreshGold(UserInfo.Instance.gold);
        this.refreshDiamondLab(0);
    }

    private onTouchBet(msg: BetMessage) {
        var cardType:number = msg;
        this.logic.bet(cardType);
    }

    private onBack() {
        SoundManager.Instance.playEffect(SoundEffect.BiuDu);

        this.logic.back();
    }

    private onChange() {
        SoundManager.Instance.playEffect(SoundEffect.ChangeChip);

        this.logic.nextBetLevel();
    }

    private onContinue() {
        SoundManager.Instance.playEffect(SoundEffect.ContinueBet);

        this.logic.continueBet();
    }

    public refreshBetLab(num: number) {
        num = num || 0;
        this.betLevelLab.text = num + "";
    }

    public refreshGold(num: number) {
        num = num || 0;
        UserInfo.Instance.gold = num;
        this.goldLab.text = num + "";
    }

    public refreshDiamondLab(num: number) {
        num = num || 0;
        this.diamondLab.text = num + "";
    }

    public refreshAllLab(data) {
        this.betLabMod.refreshAllLab(data);
    }

    public refreshInLab(data) {
        this.betLabMod.refreshInLab(data);
    }

    private initTimeMode() {
        this.timeMod.initShow();
    }

    private initCardMode() {
        this.cardMod.initGirlFlag();
    }

    /**
     * 旋转卡牌
     * 开奖时
     */
    public resultTimeOver(girl: boolean) {
        this.cardMod.girl = girl;
        this.cardMod.revolveCard();
    }

    public backToHall() {
        SceneManager.Instance.show(SceneConst.HallScene);
    }

    /**
     * 当前轮开始
     */
    public showRoundStart() {
        if (!this.cardMod.girl) {
            this.cardMod.girl = false;
            this.cardMod.revolveCard();
        }
        this.timeMod.showRestTime();
        this.betMod.setBtnEnabled(true);
        this.betLabMod.refreshInLab([0,0,0,0,0]);
        this.betLabMod.refreshAllLab([0,0,0,0,0]);
    }

    /**
     * 开奖   
     */
    public showResult(data:any) {
        this.cardMod.refreshCardValue(data.card[0], data.card[1]);
        if (this.cardMod.girl) {
            this.cardMod.girl = true;
            this.cardMod.revolveCard();
        }
        this.timeMod.showResultTime();
        this.betMod.setBtnEnabled(false);
        this.recordMod.addToList(data.card);
    }
}