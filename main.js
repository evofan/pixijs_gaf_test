// init
let app = new PIXI.Application({
  width: 1280,
  height: 720,
  forceCanvas: false,
  transparent: true
});
document.body.appendChild(app.view);
app.renderer.backgroundColor = "#3366cc";
app.stage.interactive = true;

let xPos = [0, 0, 400];
let yPos = [0, -10, 200];

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

function onConverted(id = 0) {
  return function(pEvent) {
    console.log(pEvent);

    let name = pEvent.target.gafBundle.name;
    let gafBundle = pEvent.target.gafBundle;
    let gafTimeline = gafBundle.getGAFTimeline(name, "rootTimeline");
    let gafMovieClip = new GAF.GAFMovieClip(gafTimeline);
    gafMovieClip.x = xPos[id];
    gafMovieClip.y = yPos[id];
    gafMovieClip.play();
    app.stage.addChild(gafMovieClip);
  };
}
