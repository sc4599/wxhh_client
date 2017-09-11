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

    export function kickOff(data) {
        var str = "用户在其他设备登录";
        if (data.desc) {
            str = data.desc;
        }
        Utils.showMsg(data.desc, ()=>{
            GameLogicJd.Instance.destroy();
            HallLogic.Instance.destroy();
            SceneManager.Instance.show(SceneConst.LoginScene);
            LoginLogic.Instance.connectServer();
        });
    }

    export function deepCopy(obj: any):any {
        var newObj;
        if (typeof obj == "object") {
            if (obj === null) {
                newObj = null;
            }
            else if (obj == undefined) {
                newObj = undefined;
            }
            else {
                if (obj instanceof Array) {
                    newObj = [];
                    for (var i = 0, len = obj.length; i < len; i++) {
                        newObj.push(Utils.deepCopy(obj[i]));
                    }
                } else {
                    newObj = {};
                    for (var k in obj) {
                        newObj[k] = Utils.deepCopy(obj[k]);
                    }
                }
            }
        } else {
            newObj = obj;
        }
        return newObj;
    }
}