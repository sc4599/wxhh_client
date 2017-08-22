/**
 * @author svenballet 
 * @date 2017-08-22
 */

class RecordList extends BaseUI {
    public recordGro:eui.Group;
    public movieGro:eui.Group;

    public curentList: Array<Array<number>>;

    public constructor() {
        super();
        this.skinName = "RecordListSkin";
        this.curentList = [];
	}

    protected childrenCreated() {
        this.recordGro.removeChildren();
    }

    private addCard(color:number, num: number) {
        if (color < 1 || color > 5 || num < 1 || num > 13 || (color == 5 && num > 2)) {
            console.error("card value error");
            return;
        }
        var card = new eui.Image()
        card.source = "Card_"+1+"_"+2+"_png"
        this.recordGro.addChild(card);
    }

    private removeAllCard() {
        this.curentList = [];
        this.recordGro.removeChildren();
    }

    public showList(list:Array<Array<number>>) {
        if (!list) {
            console.error("record list error");
            return;
        }
        var len = list.length;
        if (len < 1 || len > 48) {
            this.removeAllCard();
        }
        else {
            if (len - 1 == this.curentList.length) {
                var item: Array<number> = list[len-1];
                this.addCard(item[0], item[1]);
                this.showAnima(len-1);
            }
            else {
                for (var i = 0;i < len-1;i ++) {
                    var item: Array<number> = list[i];
                    this.addCard(item[0], item[1]);
                }
            }
        }

        this.curentList = list;
    }

    private showAnima(index: number) {
        
    }
}