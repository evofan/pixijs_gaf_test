// init
let app = new PIXI.Application({
  width: 720,
  height: 360,
  forceCanvas: false,
  transparent: true
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = "#3366cc";
app.stage.interactive = true;

let x_pos = [0, 0, 200, 400];
let y_pos = [0, -100, 100, 100];
let mc_max = 3;

// load gaf

// 1
let FILE_NAME1 = "fish_move_04";
let converter1 = new GAF.ZipToGAFAssetConverter();
converter1.once(GAF.GAFEvent.COMPLETE, onConverted(1));
converter1.convert(FILE_NAME1 + "/" + FILE_NAME1 + ".gaf");

// 2
let FILE_NAME2 = "chara_walk_04_gaf";
let converter2 = new GAF.ZipToGAFAssetConverter();
converter2.once(GAF.GAFEvent.COMPLETE, onConverted(2));
converter2.convert(FILE_NAME2 + "/" + FILE_NAME2 + ".gaf");

// 3
let FILE_NAME3 = "chara_walk_06_gaf";
let converter3 = new GAF.ZipToGAFAssetConverter();
converter3.once(GAF.GAFEvent.COMPLETE, onConverted(3));
converter3.convert(FILE_NAME3 + "/" + FILE_NAME3 + ".gaf");

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
    gafMovieClip.play();
    app.stage.addChild(gafMovieClip);
  };
}

/**
 * change animation for man
 * @param { string } anim_name label name in .swf(.gaf)
 * @param { string } mc_name movie clip name
 */
function changeAnimation(anim_name, mc_name) {
  let mc_ary = app.stage.children;
  let mc = mc_ary.filter(mc_ary => {
    return mc_ary.name === mc_name;
  });
  console.log("mc: ", mc);
  if (mc[0]) {
    mc[0].gotoAndPlay(anim_name);
  }
}
