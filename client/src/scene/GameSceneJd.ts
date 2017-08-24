/**
 * @author svenballet 
 * @date 2017-08-18
 */

class GameSceneJd extends BaseScene {
    public cardMod:CardMod;
    public recordMod:RecordList;
    public betMod:BetBtn;
    public backBtn:eui.Button;
    public setBtn:eui.Button;
    public changeBtn:eui.Button;
    public continueBtn:eui.Button;
    public betLevelLab:eui.BitmapLabel;
    public goldLab:eui.BitmapLabel;
    public diamondLab:eui.BitmapLabel;

    private starMovie: BitmapMovie;

    public constructor() {
        super();
        this.skinName = "GameSceneJdSkin";
	}

    public get logic():GameLogicJd {
        return GameLogicJd.Instance;
    }

    protected childrenCreated() {
        this.betMod.listener = (msg)=>{
            this.onTouchBet(msg);
        };
    }

    public onEnable() {
        this.backBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBack, this);
        this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChange, this);
        this.continueBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onContinue, this);

        this.init();
    }

    public onRemove() {
        
    }

    public backInit(data) {
        
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
        // this.cardMod.revolveCard();
    }

    private onBack() {
        
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
}