/**
 * @author svenballet 
 * @date 2017-08-22
 */

class RecordList extends BaseUI {
    public recordGro: eui.Group;
    public movieGro: eui.Group;

    public curentList: Array<Array<number>>;

    public constructor() {
        super();
        this.skinName = "RecordListSkin";
        this.curentList = [];
    }

    protected childrenCreated() {
    }

    protected onEnable() {
        this.curentList = [];
    }

    protected onRemove() {
        this.removeAllCard();
    }

    private addCard(color: number, num: number): eui.Image {
        if (color < 0 || color > 4 || num < 1 || num > 13 || (color == 4 && num > 2)) {
            console.error("card value error");
            return;
        }
        var card = new eui.Image();
        var numStr = num + "";
        if (num < 10) {
            numStr = "0" + num;
        }
        card.source = "Card_" + (color + 1) + "_" + numStr + "_png";
        this.recordGro.addChild(card);
        return
    }

    private removeAllCard() {
        this.curentList = [];
        this.recordGro.removeChildren();
    }

    public addToList(card: Array<number>) {
        setTimeout(() => {
            if (card && card.length == 2) {
                var list = Utils.deepCopy(this.curentList);
                list.push(card);
                this.showList(list);
            }
            else {
                console.error("add to list error");
            }
        }, 1000);
    }

    public showList(list: Array<Array<number>>) {
        if (!list) {
            console.error("record list error");
            return;
        }
        var len = list.length;
        if (len < 1 || len > 52) {
            this.curentList = [];
            this.removeAllCard();
            return;
        }
        else {
            if (len - 1 == this.curentList.length) {
                var item: Array<number> = list[len - 1];
                this.addCard(item[0], item[1]);
                this.showAnima(len - 1);
            }
            else {
                for (var i = 0; i < len; i++) {
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