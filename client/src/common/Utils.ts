/**
 * @author svenballet 
 * @date 2017-08-17
 */

module Utils {
    
    /**quick MessageBoxPanel */
    export function showMsg(msg:string, okCallback:Function = null, thisObj:any = null, cancleCallback:Function = null) {
        var messageBox:MessageBoxPanel = PanelManager.Instance.show(PanelConst.MessageBoxPanel);
        messageBox.showMsg(msg, okCallback, thisObj, cancleCallback);
    }
}