/**
 * @author svenballet 
 * @date 2017-08-24
 */

class TimeMod extends BaseUI {
    public restGro:eui.Group;
    public restTime:eui.BitmapLabel;
    public resultGro:eui.Group;
    public resultTime:eui.BitmapLabel;
    public animaGro:eui.Group;

    private animaTime:BitmapMovie;
    private restTimer:egret.Timer;
    private resultTimer:egret.Timer;

    public constructor() {
        super();
        this.skinName = "TimeModSkin";
	}

    protected childrenCreated() {
        this.initAnimaTime();
    }

    private initAnimaTime() {
        this.animaTime = new BitmapMovie();
        this.animaTime.setImgBuffer("time",1,51);
        this.animaGro.addChild(this.animaTime);
        this.animaTime.frameTime = 59;
        this.animaTime.x = -109;
        this.animaTime.y = -90;
        this.animaTime.completeListener = ()=>{
            this.openTimeOver();
        }
        this.animaGro.visible = false;
    }

    protected onEnable() {
        this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
            this.showRestTime();
        },this);
    }

    protected onRemove() {

    }

    private showAniTime() {
        this.animaGro.visible = true;
        this.animaTime.gotoAndPlay(1);
    }

    private openTimeOver() {
        this.animaGro.visible = false;

        SceneManager.Instance.getScene(SceneConst.GameSceneJd).openTimeOver();
    }

    public showRestTime(time:number = 20000) {
        this.restGro.visible = true;
        this.resultGro.visible = false;

        var count = Math.floor(time/1000);
        this.restTime.text = count + "";
        if (!this.restTimer) {
            this.restTimer = new egret.Timer(1000, count);
            this.restTimer.addEventListener(egret.TimerEvent.TIMER, this.onRestTimer, this);
            this.restTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onRestTimerOver, this);
        }
        this.restTimer.reset();
        this.restTimer.start();
    }

    private onRestTimer() {
        if (Number(this.restTime.text) < 0) {
            console.log("resultTime error");
            return;
        }
        this.restTime.text = (Number(this.restTime.text)-1) + "";
        if (this.restTimer.currentCount == 17) {
            this.showAniTime();
        }
    }

    private onRestTimerOver() {
        this.showResultTime();
    }

    public showResultTime(time: number = 10000) {
        this.restGro.visible = false;
        this.resultGro.visible = true;

        var count = Math.floor(time/1000);
        this.resultTime.text = count + "";
        if (!this.resultTimer) {
            this.resultTimer = new egret.Timer(1000, count);
            this.resultTimer.addEventListener(egret.TimerEvent.TIMER, this.onResultTimer, this);
            this.resultTimer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.onResultTimerOver, this);
        }
        this.resultTimer.reset();
        this.resultTimer.start();
    }

    private onResultTimer() {
        if (Number(this.resultTime.text) < 0) {
            console.log("resultTime error");
            return;
        }
        this.resultTime.text = (Number(this.resultTime.text)-1) + "";
    }

    private onResultTimerOver() {
        this.showRestTime();
        SceneManager.Instance.getScene(SceneConst.GameSceneJd).resultTimeOver();
    }
}