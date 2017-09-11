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
    /**押注池推送 */
    public static head_10101 = "10101";
    /**广播游戏开始 */
    public static head_10100 = "10100";
    /**获取历史记录 */
    public static head_10003 = "10003";
    /**开奖推送 */
    public static head_10102 = "10102";
    /**续压 */
    public static head_10005 = "10005";
    /**被抢登 */
    public static head_5002 = "5002";
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

    /**续压 */
    public static S_10005 = {
        user_id: 0,
        bet_list: [0,0,0,0,0]
    }

    /**进入 */
    public static S_10000 = {
        user_id: 0
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

    /**下注 */
    public static R_10002 = {
        command: 5000,
        code: 1,
        info: {
            club: 0,
            diamond: 0,
            heart: 0,
            joker: 0,
            spade: 0
        }
    }

    /**押注池 */
    public static P_10101 = {
        club: 0,
        diamond: 0,
        heart: 0,
        joker: 0,
        spade: 0
    }

    /**游戏开始 */
    public static P_10100 = {
        cur_award_pool_gold: 0,
        round_id: 0
    }

    /**续压 */
    public static R_10005 = {
        command: 5000,
        code: 1,
        info: {
            club: 0,
            diamond: 0,
            heart: 0,
            joker: 0,
            spade: 0
        }
    }
}