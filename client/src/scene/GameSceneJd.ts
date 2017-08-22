/**
 * @author svenballet 
 * @date 2017-08-18
 */

class GameSceneJd extends BaseScene {
    public constructor() {
        super();
        this.skinName = "GameSceneJdSkin";
	}

    public onEnable() {
        var movie = new BitmapMovie();
        movie.setImgBuffer("cardBg",1,50);
        movie.play(1);
        this.addChild(movie);

        var movieL = new BitmapMovie();
        movieL.setImgBuffer("joker",14,44);
        movieL.speed = 2;
        movieL.play(99);
        this.addChild(movieL);
    }

    public onRemove() {
        
    }
}