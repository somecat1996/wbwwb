Game.addToManifest({
    bg_shade: "sprites/bg_shade.png",
    bg_nighttime: "sounds/bg_nighttime.mp3"
});

/************************************

THE GAME SCENE. THE BIG 'UN.

ACT I - Teaching controls, showing main feedback loop
ACT II - Crazy, Nervous, Snobby, Angry escalation...
ACT III - Protest! (what gameplay here???)
ACT IV - MURDER AND VIOLENCE AND AHHHHHH. #BeScaredBeAngry

(different scene...)
ACT V - Post-credits peace

*************************************/

function Scene_Post_Credits(){

	var self = this;
	Scene.call(self);

    // HACK: Background Ambience
    /*var ambience = Game.sounds.bg_nighttime;
    ambience.loop(true);
    ambience.play();*/

	////////////
	// SET UP //
	////////////

    // Graphics!
    var g = new PIXI.Container();
    self.graphics = g;
    Game.stage.addChild(g);

	// Set Up Everything
    self.world = new World(self,{
        bg: "bg_dark"
    });
	var bg_shade = MakeSprite("bg_shade");
	bg_shade.x = Game.width;
    bg_shade.y = Game.height;
    self.world.layers.bg.addChild(bg_shade);
    self.camera = new Camera(self,{
        noIntro: true,
        streaming: true,
        onTakePhoto: function(){
            //if(self.camera.isOverTV()){
            Game.sounds.bg_nighttime.stop();
            // tmp = document.querySelector("#stage").childNodes[0];
            // document.querySelector("#stage").removeChild(tmp);
            // Game.init();
            // Game.sceneManager.gotoScene("Preloader");
            Game.sceneManager.gotoScene("Quote");
            //}
        }
    });
    self.camera.x = Game.width;
    self.camera.y = Game.height;

    // Put a SPRITE RIGHT IN THE BG
    self.stream = new PIXI.Sprite();
    self.stream.width = Game.width/9.5;
    self.stream.height = Game.height/9.5;
    self.stream.anchor.x = self.stream.anchor.y = 0.5;
    self.stream.x = Game.width/2 - 1*Game.width/960; // hack
    self.stream.y = Game.height/2 + 1*Game.width/960; // hack
    self.world.layers.bg.addChild(self.stream);

    // UPDATE
    self.update = function(){

        self.world.update();
        self.camera.update();

        // THE STREAM
        self.stream.texture = self.camera.getTexture();

    };

    //////////////////////
    // EVEN MORE SET UP //
    //////////////////////

    // Candlelights
    var candlePositions =[
        [-90,-82],
        [-35,-77],
        [27,-77],
        [81,-81],
        [-178,-60],
        [-132,-55],
        [-75,-53],
        [65,-55],
        [122,-52],
        [171,-58],
        [-235,-20],
        [-200,-5],
        [-152,5],
        [-95,9],
        [97,10],
        [156,5],
        [199,-3],
        [240,-22]
    ];
    for(var i=0;i<candlePositions.length;i++){
        var pos = candlePositions[i];
        // pos[0] = 480;
        // pos[1] = 270;
        pos[0] *= Game.width/960;
        pos[1] *= Game.width/960;
        pos[0] += Game.width/2;
        pos[1] += Game.height/2;
        var candle = new Candlelight(pos);
        self.world.addBG(candle);
    }

    // The lovers
    self.world.addProp(new LoversWatching("circle"));
    self.world.addProp(new LoversWatching("square"));

    // The 3 crickets
    var cricketPositions = [
        [400, 353],
        [420, 370],
        [450, 380]
    ];
    for(var i=0;i<cricketPositions.length;i++){
        var pos = cricketPositions[i];
        var cricket = new Cricket(self);
        cricket.x = pos[0]*Game.width/960;
        cricket.y = pos[1]*Game.width/960;
        cricket.mc.gotoAndStop(1);
        self.world.addProp(cricket);
    }

    /////////////
    // FADE IN //
    /////////////

    var blackout = MakeSprite("blackout");
    blackout.scale.x = blackout.scale.y = Game.width/960;
    Game.stage.addChild(blackout);
    Tween_get(blackout).to({alpha:0}, _s(BEAT), Ease.quadInOut).call(function(){
        Game.stage.removeChild(blackout);
    });

}