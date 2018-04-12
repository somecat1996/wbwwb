Game.addToManifest({

	candlelight: "sprites/misc/candlelight.json"

});

function Candlelight(position){

	var self = this;
	var mc = MakeMovieClip("candlelight");
	self.graphics = mc;

	mc.anchor.x = 0.5;
	mc.anchor.y = 0.5;
	// mc.x = position[0]-100; // HACK, LOL W/E
	// mc.y = position[1]-100; // HACK, LOL W/E
	mc.x = position[0]; // HACK, LOL W/E
	mc.y = position[1]; // HACK, LOL W/E
	mc.scale.x = mc.scale.y = Game.width/960;

	self.update = function(){
		if(Math.random()<0.2){
			var frame = Math.floor(Math.random()*mc.totalFrames);
			mc.gotoAndStop(frame);
		}
	};

}