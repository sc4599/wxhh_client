/**
 * @author svenballet 
 * @date 2017-08-19
 */

class RunConfig {
    private _zWebSocket:ClientSocket;
    public betStatus:boolean;

    private static _zInstance: RunConfig;
    public static get Instance():RunConfig {
        if (!RunConfig._zInstance) {
            RunConfig._zInstance = new RunConfig;
        }
        return RunConfig._zInstance;
    }

    /**socket唯一实例 */
    public get webSocket() {
        if(!this._zWebSocket) {
            this._zWebSocket = new ClientSocket();
        }
        return this._zWebSocket;
    }
}