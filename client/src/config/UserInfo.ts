/**
 * @author svenballet 
 * @date 2017-08-23
 */

class UserInfo {
    private _userId: number;
    private _gold: number;
    private _name: string;
    private _nickName: string;

    private static _zInstance: UserInfo;
    public static get Instance():UserInfo {
        if (!UserInfo._zInstance) {
            UserInfo._zInstance = new UserInfo;
        }
        return UserInfo._zInstance;
    }

    public init(data: any) {
        this._userId = data.id || 0;
        this._gold = data.gold || 0;
        this._name = data.name || "无";
        this._nickName = data.nick_name || "无";
    }

    public updateGold(gold: number) {
        this._gold = gold;
    }

    public get userId() {
        return this._userId;
    }
}