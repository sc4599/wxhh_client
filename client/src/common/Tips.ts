/**
 * @author svenballet 
 * @date 2017-08-17
 */

module Tips {
    export function show(str: string) {
        showMiddle(str);
    }

    function showMiddle(str:string) {
        var tipGro = new eui.Group();
        tipGro.width = 1280;
        tipGro.height = 50;
        tipGro.y = 720/2 - 25;
        tipGro.alpha = 0;

        var tipsBg = new eui.Image();
        tipsBg.texture = RES.getRes("tips_bg_png");
        tipsBg.horizontalCenter = 0;

        var showText = new eui.Label();
        showText.size = 30;
        showText.textColor = 0x0099cc;
        showText.text = str;
        showText.horizontalCenter = 0;
        showText.y = 10;

        tipGro.addChild(tipsBg);
        tipGro.addChild(showText);

        if (LayerManager.Instance.tipLayer.numChildren > 0) {
            egret.Tween.removeTweens(tipGro);
            LayerManager.Instance.tipLayer.removeChildren();
        }
        LayerManager.Instance.tipLayer.addChild(tipGro);

        var timeId = egret.setTimeout(()=>{
            if (tipGro && tipGro.parent) {
                LayerManager.Instance.tipLayer.removeChild(tipGro);
            }
        }, this, 4000);

        egret.Tween.get(tipGro)
        .to({alpha: 1}, 200)
        .wait(1300)
        .to({y: tipGro.y-720/4, alpha: 0}, 500)
        .call(()=>{
            egret.clearTimeout(timeId);
            egret.Tween.removeTweens(tipGro);
            if (tipGro && tipGro.parent) {
                LayerManager.Instance.tipLayer.removeChild(tipGro);
            }
        })
    }
}