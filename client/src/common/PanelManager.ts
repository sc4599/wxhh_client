/**
 * @author svenballet 
 * @date 2017-08-15
 */
enum PanelConst {
	
}

class PanelManager{
	private panelConfig = [
		
	]
    private panelList = {};
    private panelClassList = {};

    public static _instance: PanelManager;
    public static get Instance():PanelManager {
        if (!PanelManager._instance) {
            PanelManager._instance = new PanelManager;
			PanelManager._instance.init();
        }
        return PanelManager._instance;
    }
	
	/**
     * init panel config
     */ 
    public init(){
		for(var i = 0;i < this.panelConfig.length;i ++) {
			this.panelClassList[PanelConst[i]] = this.panelConfig[i];
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