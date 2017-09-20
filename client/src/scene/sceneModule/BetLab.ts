/**
 * @author svenballet 
 * @date 2017-08-24
 */

class BetLab extends BaseUI {
    public inGro:eui.Group;
    public allGro:eui.Group;

    private inList:Array<eui.BitmapLabel>;
    private allList:Array<eui.BitmapLabel>;

    public constructor() {
        super();
        this.skinName = "BetLabSkin";

        this.initList();
	}

    private initList() {
        this.inList = [];
        this.allList = [];
        for(var i = 0;i < 5;i ++) {
            this.inList.push(<eui.BitmapLabel>(<eui.Group>this.inGro.getChildAt(i)).getChildAt(0));
            this.allList.push(<eui.BitmapLabel>(<eui.Group>this.allGro.getChildAt(i)).getChildAt(0));
        }
        this.refreshInLab([0,0,0,0,0]);
    }

    public refreshInLab(data: any, force:boolean=false) {
        var list = [];
        var reset:boolean = false;
        if (data[0] || data[0] == 0) {
            list = data;
            reset = true;
        }
        else {
            list.push(data.spade);
            list.push(data.heart);
            list.push(data.club);
            list.push(data.diamond);
            list.push(data.joker);
        }
        for (var i = 0;i < 5;i ++) {
            if (!reset) {
                if (Number(list[i]) > Number(this.inList[i].text) || force) {
                    this.inList[i].text = list[i] + "";
                }
            }
            else {
                this.inList[i].text = list[i] + "";
            }
        }
    }

    public refreshAllLab(data: any, force:boolean=false) {
        var list = [];
        var reset:boolean = false;
        if (data[0] || data[0] == 0) {
            list = data;
            reset = true;
        }
        else {
            list.push(data.spade);
            list.push(data.heart);
            list.push(data.club);
            list.push(data.diamond);
            list.push(data.joker);
        }
        for (var i = 0;i < 5;i ++) {
            if (!reset) {
                if (Number(list[i]) > Number(this.allList[i].text) || force) {
                    this.allList[i].text = list[i] + "";
                }
            }
            else {
                this.allList[i].text = list[i] + "";
            }
        }
    }

    public addInLab(type:number, level:number) {
        this.inList[type].text = Number(this.inList[type].text) + level + ""
    }

    public addAllLab(type:number, level:number) {
        this.allList[type].text = Number(this.allList[type].text) + level + ""
    }
}