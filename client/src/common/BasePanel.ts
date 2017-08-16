/**
 * @author svenballet 
 * @date 2017-08-16
 */

class BasePanel extends BaseUI{

    public constructor() {
        super();
    }

    public hide() {
        this.parent && this.parent.removeChild(this);
    }
}