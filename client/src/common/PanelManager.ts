/**
 * @author svenballet 
 * @date 2017-08-15
 */
enum PanelConst {
	/**login */
	LoginPanel,
	/**regist */
	RegistPanel
}

class PanelManager{
	private panelString = [
        "LoginPanel",
		"RegistPanel"
    ]
	private panelConfig = [
		LoginPanel,
		RegistPanel	
	]
    private panelList = {};
    private panelClassList = {};

    private static _instance: PanelManager;
    public static get Instance():PanelManager {
        if (!PanelManager._instance) {
            PanelManager._instance = new PanelManager;
        }
        return PanelManager._instance;
    }

	public constructor() {
        this.init()
    }
	
	/**
     * init panel config
     */ 
    public init(){
		for(var i = 0;i < this.panelConfig.length;i ++) {
			this.panelClassList[PanelConst[this.panelString[i]]] = this.panelConfig[i];
		}
 	}
 	
 	/**
 	 * show panel
 	 */ 
    public show(panelID:number){
		console.log("open Panel=="+panelID);
     	var panel = this.panelList[panelID];
     	if(panel == null){
        	var clz = this.panelClassList[panelID];
        	if(clz != null){
				panel = new clz();
				this.panelList[panelID] = panel;
        	}
			else{
				console.error("no define panel")
        		return null; 
        	}
    	}
		LayerManager.Instance.popLayer.addChild(panel);
     	return panel;
 	}
 	
 	/**
 	 * hide panel
 	 */ 
 	public hide(panelID:number){
     	var panel = this.panelList[panelID];
     	if(panel != null){
        	LayerManager.Instance.popLayer.removeChild(panel);
     	}
     	return panel;
 	}
 	
 	/**
	  * get panel
 	 */ 
 	public get(panelID:number){
		if (!this.panelList[panelID]) {
			console.error("panel not exist");
		}
    	return this.panelList[panelID];
 	}
 	
 	/**
 	 * hide all panel
 	 */ 
 	public hideAll(){
		LayerManager.Instance.popLayer.removeChildren();
 	}
}