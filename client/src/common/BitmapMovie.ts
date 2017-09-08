/**
 * 自定义位图影片动画
 * 从配置文件中获取序列图，使用Timer计时播放
 * @author chenkai
 * @date 2016/8/4
 * 
 * @author svenballet
 * @date 2017-08-22
 */
class BitmapMovie extends egret.Bitmap {
	private bmdList = [];         //bitmapdata图片列表
	private curFrame: number = 0;  //当前帧 第一帧从0开始
	private totalFrame: number = 0;//总帧数
	public delay: number = 33;     //播放间隔 ms
	private animTimer: egret.Timer;//动画计时器
	private loop: number = 1;      //循环次数
	private start: number = 1;
	private _listener: Function;

	private _frameCallback: Function;

	public constructor() {
		super();
	}

	/**传入值越大，播放越慢，帧数越少 */
	public set speed(speed: number) {
		this.delay = this.delay * speed;
	}

	public set frameCallback(callback: Function) {
		this._frameCallback = callback;
	}

	/**
	 * 资源配置表从获取序列帧动画图片，并保存
	 * @imgName 图片名称
	 * @startIndex 起始索引
	 * @endIndex 结束索引
	 */
	public setImgBuffer(imgName: string, startIndex: number, endIndex: number) {
		this.bmdList = [];
		this.start = startIndex;
		var len = endIndex - startIndex;
		for (var i = 1; i < this.start; i++) {
			this.bmdList.push(null);
		}
		for (var i = this.start; i <= len + this.start; i++) {
			// console.log("RES==", RES.getRes(imgName + "_" +i + "_png"));
			this.bmdList.push(RES.getRes(imgName + "_" + i + "_png"));
		}
		this.curFrame = startIndex;
		this.bitmapData = this.bmdList[this.curFrame];
		this.totalFrame = this.bmdList.length;
	}

	/**
	 * 播放动画
	 * @loop 循环次数(默认1)
	 */
	public play(loop: number = 1) {
		this.loop = loop;
		this.startTimer();
	}

	/**
	 * 跳转并播放
	 * @frame 跳转到的帧
	 * @loop 循环次数(默认1)
	 */
	public gotoAndPlay(frame: number, loop: number = 1) {
		this.curFrame = frame;
		this.bitmapData = this.bmdList[this.curFrame];
		this.play(loop);
	}

	/**
	 * 停止动画
	 */
	public stop() {
		this.stopTimer();
	}

	/**开始计时*/
	private startTimer() {
		this.animTimer || (this.animTimer = new egret.Timer(this.delay));
		this.animTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
		this.animTimer.delay = this.delay;
		this.animTimer.reset();
		this.animTimer.start();
	}

	/**
	 * 处理函数
	 */
	private onTimer() {
		if (this.curFrame == this.totalFrame) {
			this.loop--;
			if (this.loop > 0 || this.loop < 0) {
				this.gotoAndPlay(this.start, this.loop);
			} else {
				this.stopTimer();
				this._listener && this._listener();
				return;
			}

		}
		this.bitmapData = this.bmdList[this.curFrame];
		this.curFrame++;
		this._frameCallback && this._frameCallback();
	}

	/**
	 * 停止计时
	 */
	private stopTimer() {
		if (this.animTimer) {
			this.animTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this.animTimer.stop();
		}
	}

	public set completeListener(listener: Function) {
		this._listener = listener;
	}

	public set frameTime(time: number) {
		this.delay = time;
	}
}