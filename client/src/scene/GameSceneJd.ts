/**
 * @author svenballet 
 * @date 2017-08-18
 */

class GameSceneJd extends BaseScene {
    public recordMod:RecordList;
    public betMod:BetBtn;
    public backBtn:eui.Button;
    public setBtn:eui.Button;
    public changeBtn:eui.Button;
    public continueBtn:eui.Button;
    public betLevelLab:eui.BitmapLabel;

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

    private init() {
        this.setBetBtn(false);
        this.refreshBetLab(BetLevel.small);
    }

    private onTouchBet(msg: BetMessage) {
        var cardType:number = msg;
        this.logic.bet(cardType);
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
        this.betLevelLab.text = num + "";
    }
}