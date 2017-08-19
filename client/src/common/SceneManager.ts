/**
 * @author svenballet 
 * @date 2017-08-16
 */
enum SceneConst {
    /**login */
	LoginScene,
    /**hall */
    HallScene,
    /**gameJd */
    GameSceneJd
}

class SceneManager {

    private sceneString = [
        "LoginScene",
        "HallScene",
        "GameSceneJd"
    ]
    private sceneConfig = [
		LoginScene,
        HallScene,
        GameSceneJd
	];
    private curScene: BaseScene;
    public sceneList = {};
    private sceneClassList = {};

    private static _instance: SceneManager;
    public static get Instance():SceneManager {
        if (!SceneManager._instance) {
            SceneManager._instance = new SceneManager;
        }
        return SceneManager._instance;
    }

    public constructor() {
        this.init()
    }
    
    /**
     * init scene config
     */ 
    public init(){
		for(var i = 0;i < this.sceneConfig.length;i ++) {
			this.sceneClassList[SceneConst[this.sceneString[i]]] = this.sceneConfig[i];
		}
 	}
  
    /**
     * show scene
     */ 
    public show(sceneID:number){
        if(this.curScene) {
            LayerManager.Instance.sceneLayer.removeChild(this.curScene);
        }
        
        var nextScene: BaseScene = this.sceneList[sceneID];
        if(nextScene == null){
            var clz = this.sceneClassList[sceneID];
            if(clz != null){
                nextScene = new clz();
                this.sceneList[sceneID] = nextScene;
            }else{
                console.error("scene not exist:",sceneID);
                return null;
            }
        }
        this.curScene = nextScene;
        PanelManager.Instance.hideAll();      
        LayerManager.Instance.sceneLayer.addChild(this.curScene);
        return this.curScene;
    }
    
    public getScene(sceneID:number){
        if (!this.sceneList[sceneID]) {
			console.error("scene not exist");
		}
        return this.sceneList[sceneID];
    }
    
    public getCurScene(){
        return this.curScene;
    }
}