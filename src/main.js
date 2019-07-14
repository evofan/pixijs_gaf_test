// init
let app = new PIXI.Application({
	width: 720,
	height: 360,
	forceCanvas: false,
	transparent: true
});
let canvas1 = document.getElementById("canvas1");
canvas1.appendChild(app.view);
app.stage.interactive = true;

let app2 = new PIXI.Application({
	width: 240,
	height: 240,
	transparent: false
});
let canvas2 = document.getElementById("canvas2");
app2.renderer.backgroundColor = "#ffffff";
app2.stage.interactive = true;
canvas2.appendChild(app2.view);

let x_pos = [0, 0, 200, 400, 0];
let y_pos = [0, -100, 100, 100, 0];
let mc_max = 3;

// load gaf

// 1
let FILE_NAME1 = "fish_move_04";
let converter1 = new GAF.ZipToGAFAssetConverter();
converter1.once(GAF.GAFEvent.COMPLETE, onConverted(1));
converter1.convert("gaf/" + FILE_NAME1 + "/" + FILE_NAME1 + ".gaf");

// 2
let FILE_NAME2 = "chara_walk_04_gaf";
let converter2 = new GAF.ZipToGAFAssetConverter();
converter2.once(GAF.GAFEvent.COMPLETE, onConverted(2));
converter2.convert("gaf/" + FILE_NAME2 + "/" + FILE_NAME2 + ".gaf");

// 3
let FILE_NAME3 = "chara_walk_06_gaf";
let converter3 = new GAF.ZipToGAFAssetConverter();
converter3.once(GAF.GAFEvent.COMPLETE, onConverted(3));
converter3.convert("gaf/" + FILE_NAME3 + "/" + FILE_NAME3 + ".gaf");

// 4
let FILE_NAME4 = "omikuji_03";
let converter4 = new GAF.ZipToGAFAssetConverter();
converter4.once(GAF.GAFEvent.COMPLETE, onConverted(4));
converter4.convert("gaf/" + FILE_NAME4 + "/" + FILE_NAME4 + ".gaf");

/**
 * set gaf animation
 * @param { number } [id=0] generate a name for movie clip
 * @returns { function } onConverted()
 */
function onConverted(id = 0) {
	return function(pEvent) {
		console.log(pEvent);
		let name = pEvent.target.gafBundle.name;
		let gafBundle = pEvent.target.gafBundle;
		let gafTimeline = gafBundle.getGAFTimeline(name, "rootTimeline");
		let gafMovieClip = new GAF.GAFMovieClip(gafTimeline);
		gafMovieClip.name = `mc_${id}`;
		gafMovieClip.x = x_pos[id];
		gafMovieClip.y = y_pos[id];

		if (id === 4) {
			gafMovieClip.stop();
			app2.stage.addChild(gafMovieClip);
			gafMovieClip.on("getResult", getCallbackEvent);
		} else {
			gafMovieClip.play();
			app.stage.addChild(gafMovieClip);
		}
	};
}

/**
 * change animation for man
 * @param { string } anim_name label name in .swf(.gaf)
 * @param { string } mc_name movie clip name
 */
function changeAnimation(anim_name, mc_name) {
	let mc_ary = app.stage.children;
	let mc = mc_ary.filter((mc_ary) => {
		return mc_ary.name === mc_name;
	});
	console.log("mc: ", mc);
	if (mc[0]) {
		mc[0].gotoAndPlay(anim_name);
	}
}

/**
 * start animation to get callback
 */
function startAnimation() {
	let mc = app2.stage.children[0];
	console.log(mc);
	mc.gotoAndPlay("start_anime");
}

/**
 * get callback event from .gaf timeline
 * @param { object } pEvent .gaf event
 */
function getCallbackEvent(pEvent) {
	console.log("getCallbackEvent()", pEvent, pEvent.data);
	alert("get callback event from .gaf timeline");
}
