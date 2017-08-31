/**
 * @author svenballet 
 * @date 2017-08-24
 */

class CardMod extends BaseUI {
    public bgGro:eui.Group;
    public locationBg:eui.Image;
    public girlImg:eui.Image;
    public cardGro:eui.Group;
    public valueGro:eui.Group;
    public cardTopLab:eui.BitmapLabel;
    public cardBotLab:eui.BitmapLabel;
    public framGro:eui.Group;

    private colorList:Array<string>;
    private strList:Array<string>;
    private girlFlag:boolean;
    private girlNum:number;

    private cardBgMovie:BitmapMovie;
    private colorMovie:BitmapMovie;

    public constructor() {
        super();
        this.skinName = "CardModSkin";

        this.colorList = ["spade", "heart", "club", "diamond", "joker"];
        this.strList = ["A","2","3","4","5","6","7","8","9","T","J","Q","K"]
        this.girlFlag = true;
	}

    protected childrenCreated() {
        this.initCardBgMovie();
        this.initColorMovie();
        this.refreshGirlCard();
    }

    protected onEnable() {
        this.showCard();
        this.frameBlink();
        this.playCardMovie();
        // this.addEventListener(egret.TouchEvent.TOUCH_TAP, ()=>{
        //     this.revolveCard();
        // },this)
    }

    protected onRemove() {
        this.removeBlink();
        this.cardBgMovie.stop();
    }

    private initCardBgMovie() {
        this.cardBgMovie = new BitmapMovie();
        this.cardBgMovie.setImgBuffer("cardBg",1,50);
        this.cardBgMovie.frameTime = 59;
        this.cardBgMovie.x = 0;
        this.cardBgMovie.y = 0;
    }

    private playCardMovie() {
        this.bgGro.addChild(this.cardBgMovie);
        this.cardBgMovie.gotoAndPlay(1, -1);
    }

    private initColorMovie() {
        this.colorMovie = new BitmapMovie();
        this.colorMovie.setImgBuffer("club",1,30);
        this.colorMovie.frameTime = 33;
    }

    private playColorMovie() {
        this.cardGro.addChild(this.colorMovie);
        this.colorMovie.gotoAndPlay(1, 1);
    }

    private refreshColor(color:number) {
        this.colorMovie.setImgBuffer(this.colorList[color],1,30);
    }

    public initGirlFlag() {
        this.girlFlag = true;
        this.showCard();
    }

    public refreshCardValue(color:number, num:number) {
        this.refreshColor(color);
        if (color == 4) {
            this.cardTopLab.text = this.cardBotLab.text = null;
            return;
        }
        this.cardTopLab.font = this.cardBotLab.font = "card_"+this.colorList[color]+"_num_fnt";
        this.cardTopLab.text = this.cardBotLab.text = this.strList[num-1];
    }

    public set girl(girl) {
        this.girlFlag = girl;
    }

    public get girl() {
        return this.girlFlag;
    }

    public revolveCard() {
        this.showCard();

        if (this.girlFlag) {
            egret.Tween.get(this.girlImg)
            .to({scaleX: 0},500)
            .call(()=>{
                this.playColorMovie();
                this.refreshGirlCard();
                egret.Tween.get(this.cardGro)
                .to({scaleX: -1},500)
                this.girlFlag = !this.girlFlag;
            })
        }
        else {
            egret.Tween.get(this.cardGro)
            .to({scaleX: 0},500)
            .call(()=>{
                egret.Tween.get(this.girlImg)
                .to({scaleX: 1},500)
                this.girlFlag = !this.girlFlag;
            })
        }
    }

    private showCard() {
        if (this.girlFlag) {
            this.girlImg.scaleX = 1;
            this.cardGro.scaleX = 0;
        }
        else {
            this.girlImg.scaleX = 0;
            this.cardGro.scaleX = -1;
        }
    }

    private frameBlink() {
        var redImg:eui.Image = this.framGro.getChildAt(0) as eui.Image;
        var greenImg:eui.Image = this.framGro.getChildAt(1) as eui.Image;
        
        redImg.visible = true;
        greenImg.visible = true;
        redImg.alpha = 0;
        greenImg.alpha = 0;
        egret.Tween.get(redImg, {loop: true}).set({alpha: 0}).to({alpha: 1}, 300).to({alpha: 0}, 300).wait(300)
        egret.Tween.get(greenImg, {loop: true}).wait(300).set({alpha: 0}).to({alpha: 1}, 300).to({alpha: 0},300);
    }

    private removeBlink() {
        var redImg:eui.Image = this.framGro.getChildAt(0) as eui.Image;
        var greenImg:eui.Image = this.framGro.getChildAt(1) as eui.Image;

        egret.Tween.removeTweens(redImg);
        egret.Tween.removeTweens(greenImg);
    }

    private refreshGirlCard() {
        var num = (Math.round(Math.random()*(48-1)) + 1);
        var numStr = num + "";
        if (num < 10 ) {
            numStr = "00" + numStr;
        }
        else if (num >= 10) {
            numStr = "0" + numStr;
        }
        this.girlImg.source = "girl_" + numStr + "_png"
    }
}