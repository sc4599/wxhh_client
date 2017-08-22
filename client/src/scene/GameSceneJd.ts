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
        movie.play(9999);
        this.addChild(movie);

        var movieL = new BitmapMovie();
        movieL.setImgBuffer("joker",1,44);
        movieL.speed = 1;
        movieL.play();
        this.addChild(movieL);

        var movieM = new BitmapMovie();
        movieM.setImgBuffer("star",1,52);
        movieM.speed = 2;
        movieM.play(99);
        movieM.x = 400;
        this.addChild(movieM);
    }

    public onRemove() {
        
    }
}