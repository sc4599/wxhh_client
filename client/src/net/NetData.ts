/**
 * @author svenballet 
 * @date 2017-08-19
 */

class NetHead {
    /**登录 */
    public static head_5000 = "5000";
    /**注册 */
    public static head_5001 = "5001";
    /**退出 */
    public static head_10001 = "10001";
    /**进入 */
    public static head_10000 = "10000";
    /**下注 */
    public static head_10002 = "10002";
}

class NetSend {
    /**通用（空） */
    public static S_000 = {

    }

    /**登录 */
    public static S_5000 = {
        user_name: "",
	    passwd: ""
    }

    /**注册 */
    public static S_5001 = {
        user_name: "",
	    passwd: ""
    }

    /**下注 */
    public static S_10002 = {
        user_id: 0,
        num: 100,
        card_type: 0
    }
}

class NetRecv {
    /**通用 */
    public static R_000 = {
        command: 100,
        code: 1,
        info: {}
    }

    /**登录 */
    public static R_5000 = {
        command: 5000,
        code: 1,
        info: {}
    }

    /**注册 */
    public static R_5001 = {
        command: 5000,
        code: 1,
        info: {}
    }
}