/**
 * @author svenballet 
 * @date 2017-08-15
 */
class BaseUI extends eui.Component{
	public constructor() {
      super();
      this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onEnable,this);
      this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
      this.addEventListener(egret.TouchEvent.TOUCH_TAP,(e:egret.TouchEvent)=>{
          if(e.target instanceof eui.Button){
              //play btn voice
          }
      },this)
	}
	
    /**created*/
    protected childrenCreated() {
        
    }

    /**add to show list*/
    protected onEnable() {
        
    }

    /**remove from show list*/
    protected onRemove() {

    }

    /**remove from parent*/
    public onHide() {
        this.parent && this.parent.removeChild(this);
    }
}
