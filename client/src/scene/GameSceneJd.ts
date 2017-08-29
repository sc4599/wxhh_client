/**
 * @author svenballet 
 * @date 2017-08-18
 */

class GameSceneJd extends BaseScene {
    public cardMod:CardMod;
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
    }

    protected onEnable() {
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
            this.recordMod.showList(data.last_records);
        }
    }

    private init() {
        // this.setBetBtn(false);
        this.refreshBetLab(BetLevel.small);
        this.refreshGoldLab(UserInfo.Instance.gold);
        this.refreshDiamondLab(0);
    }

    private onTouchBet(msg: BetMessage) {
        var cardType:number = msg;
        this.logic.bet(cardType);
    }

    private onBack() {
        this.logic.back();
    }

    private onChange() {
        this.logic.nextBetLevel();
    }

    private onContinue() {
        
    }

    public setBetBtn(flag: boolean) {
        this.betMod.setBtnEnabled(flag);
    }

    public refreshBetLab(num: number) {
        num = num || 0;
        this.betLevelLab.text = num + "";
    }

    public refreshGoldLab(num: number) {
        num = num || 0;
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

    public openTimeOver() {
        this.cardMod.revolveCard();
    }

    public resultTimeOver() {
        this.cardMod.revolveCard();
    }

    public backToHall() {
        SceneManager.Instance.show(SceneConst.HallScene);
    }
}