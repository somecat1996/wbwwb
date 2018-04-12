Game.addToManifest({
    hatguy: "sprites/peeps/hatguy.json"
});

/****

JUST WADDLE BACK & FORTH

****/

function HatPeep(scene){

	var self = this;
	Peep.apply(self, [scene]);
    self._CLASS_ = "HatPeep";

	// Add the body & face sprites
    self.bodyMC = self.addMovieClip("hatguy");
    self.bodyMC.gotoAndStop(0);

    self.callbacks.update = function(){

        // stay within game frame
        self.stayWithinRect({
            l:100*Game.width/960, r:860*Game.width/960, t:100*Game.width/960, b:480*Game.width/960
        },0.05);

    };

    // WEIRD WALK
    self.walkAnim = function(){

        // Hop & flip
        self.hop += self.speed/40;
        if(self.hop>1) self.hop--;
        self.flip = (self.vel.x<0) ? -1 : 1;

        // Hop up & down
        var t = self.hop*Math.TAU;
        var g = self.graphics;
        g.rotation = Math.sin(t)*0.2;
        g.pivot.y = Math.abs(Math.sin(t))*7;

    };

}