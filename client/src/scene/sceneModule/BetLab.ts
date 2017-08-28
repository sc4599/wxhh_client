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

    public initList() {
        this.inList = [];
        this.allList = [];
        for(var i = 0;i < 5;i ++) {
            this.inList.push(<eui.BitmapLabel>(<eui.Group>this.inGro.getChildAt(i)).getChildAt(0));
            this.allList.push(<eui.BitmapLabel>(<eui.Group>this.allGro.getChildAt(i)).getChildAt(0));
        }
    }

    public refreshInLab(data: any) {
        var list = [];
        if (data[0] || data[0] == 0) {
            list = data;
        }
        else {
            list.push(data.spade);
            list.push(data.heart);
            list.push(data.club);
            list.push(data.diamond);
            list.push(data.joker);
        }
        for (var i = 0;i < 5;i ++) {
            this.inList[i].text = list[i] + "";
        }
    }

    public refreshAllLab(data: any) {
        var list = [];
        if (data[0] || data[0] == 0) {
            list = data;
        }
        else {
            list.push(data.spade);
            list.push(data.heart);
            list.push(data.club);
            list.push(data.diamond);
            list.push(data.joker);
        }
        for (var i = 0;i < 5;i ++) {
            this.allList[i].text = list[i] + "";
        }
    }
}