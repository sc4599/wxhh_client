/**
 * 声音管理类
 * @author huanglong
 * @date 2017-09-08
 */
enum SoundBgm {
    "LoginScene",
    "HallScene",
    "GameSceneJd"
}

enum SoundEffect {
    "Biu",
    "BiuDu",
    "Dudu",
    "BetOrBegin",
    "BetWarn",
    "ContinueBet",
    "ChangeChip",
    "Clock",
    "Lose",
    "Win",
    "StopBet",
    "spade",
    "heart",
    "club",
    "diamond",
    "jokerS",
    "jokerB"
}

class SoundManager {
    private soundList = {};                    //声音列表
    private bgmChannel: egret.SoundChannel;    //背景音声道
    private _allowVoice: boolean;

    private BgmList = [
        "music_room_2_mp3",
        "music_room_mp3",
        "background2_mp3"
    ];
    private CommonList = [
        "MouseMove_mp3",
        "GameBtn_mp3",
        "room_btn_mp3",
        "AnteBegin_mp3",
        "AnteWarn_mp3",
        "AutoBet_mp3",
        "ChangeChip_mp3",
        "Clock_mp3",
        "Lose_mp3",
        "result_win_mp3",
        "stop_add_chip_mp3",
        "sound_poker_type_4_mp3",
        "sound_poker_type_3_mp3",
        "sound_poker_type_2_mp3",
        "sound_poker_type_1_mp3",
        "sound_poker_small_king_mp3",
        "sound_poker_big_king_mp3"
    ]

    private static _instance: SoundManager;
    public static get Instance(): SoundManager {
        if (!SoundManager._instance) {
            SoundManager._instance = new SoundManager;
        }
        return SoundManager._instance;
    }

    public constructor() {
        this._allowVoice = true;
    }

    public playCardSound(card:number[]) {
        var type = card[0];
        var soundConst = SoundEffect.spade;
        switch (type) {
            case 0:
                soundConst = SoundEffect.spade;
                break;
            case 1:
                soundConst = SoundEffect.heart;
                break;
            case 2:
                soundConst = SoundEffect.club;
                break;
            case 3:
                soundConst = SoundEffect.diamond;
                break;
            case 4:
                if (card[1] == 1) {
                    soundConst = SoundEffect.jokerB;
                }
                else {
                    soundConst = SoundEffect.jokerS;
                }
                break;
            default:
                break;
        }
        this.playEffect(soundConst);
    }

	/**
	 * 播放音效
	 * @param soundConst
	 * @param startTime 播放起始位置
	 * @param loops 循环次数
	 */
    public playEffect(soundConst: number, startTime: number = 0, loops: number = 1) {
        if (!this._allowVoice) {
            return;
        }
        var soundName = this.CommonList[soundConst];
        var sound: egret.Sound = this.soundList[soundName];
        if (sound == null) {
            sound = RES.getRes(soundName);
            if (sound != null) {
                this.soundList[soundName] = sound
            } else {
            }
        }
        if (sound) {
            sound.type = egret.Sound.EFFECT;
            var channel: egret.SoundChannel = sound.play(startTime, loops);
        }
    }

	/**
	 * 播放背景音乐
	 * @param soundConst
	 * @param startTime 播放起始位置
	 * @param loops 循环次数
	 */
    public playBGM(soundConst: number, startTime: number = 0, loops: number = Number.MAX_VALUE) {
        this.stopBGM();
        var soundName = this.BgmList[soundConst];
        var bgm: egret.Sound = this.soundList[soundName];
        if (bgm == null) {
            bgm = RES.getRes(soundName);
            bgm && (this.soundList[soundName] = bgm);
        }
        if (bgm) {
            bgm.type = egret.Sound.MUSIC;
            this.bgmChannel = bgm.play(startTime, loops);
            this.bgmChannel.volume = 0.5;
        }
    }

    /**停止背景音乐*/
    public stopBGM() {
        if (this.bgmChannel) {
            this.bgmChannel.stop();
            this.bgmChannel = null;
        }
    }
}
