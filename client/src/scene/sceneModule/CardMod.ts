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

    public constructor() {
        super();
        this.skinName = "CardModSkin";
	}

    protected childrenCreated() {
        this.colorList = ["spade", "heart", "club", "diamond"];
        this.strList = ["A","2","3","4","5","6","7","8","9","T","J","Q","K"]

        this.girlFlag = true;
        this.showCard();
    }

    protected onEnable() {
        this.frameBlink();
    }

    protected onRemove() {
        this.removeBlink();
    }

    public refreshCardValue(color:number, num:number) {
        if (color == 5) {
            this.cardTopLab.text = this.cardBotLab.text = null;
            return;
        }
        this.cardTopLab.font = this.cardBotLab.font = "card_"+this.colorList[color]+"_num_fnt";
        this.cardTopLab.text = this.cardBotLab.text = this.strList[num];
    }

    public revolveCard() {
        this.showCard();

        if (this.girlFlag) {
            egret.Tween.get(this.girlImg)
            .to({scaleX: 0},500)
            .call(()=>{
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

    public showCard() {
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