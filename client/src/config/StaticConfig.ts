/**
 * @author svenballet 
 * @date 2017-08-19
 */

class StaticConfig {
    /**直接跳转到游戏界面 */
    public skipToGame:boolean;
    /**是否用默认账号登录 */
    public testLogin:boolean;
    private testServer:boolean;

    private static _zInstance: StaticConfig;
    public static get Instance():StaticConfig {
        if (!StaticConfig._zInstance) {
            StaticConfig._zInstance = new StaticConfig;
        }
        return StaticConfig._zInstance;
    }

    public constructor() {
        this.testLogin = true;
        this.skipToGame = false;
        this.testServer = false;
    }

    /**
     * websocket地址
     */
    public get wsUrl() {
        var address = "www.shiqiuping.win:10000";
        if (this.testServer) {
            address = "192.168.1.135:10000"
        }
        return "ws://"+address;
    }
    
    /**
     * 测试账号
     */
    public get testName() {
        return "test1"
    }

    /**
     * 测试密码
     */
    public get testPassword() {
        return "8222b2020c704671b9c51d6fdcfe776c"
    }
}