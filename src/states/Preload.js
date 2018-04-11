export default class Preload {

  init(whichEp){
      console.log("init "+whichEp);
      //check the args for which episodes and get the settings from config
      this.whichEp = whichEp;
  }

  constructor() {

  }

  preload() {
    //all preloads are in boot state

    //background for game
    //this.add.sprite(0,0, "loadingbg");
    let loadingLabel = this.add.text(this.game.width/2,this.game.height*0.45,'loading...',{font:'40px Arial',fill:'#ffffff'});
    loadingLabel.anchor.setTo(0.5,0.5);

    let preloadBar = this.add.sprite(this.game.width/2,this.game.height*0.55, 'preloader');
    preloadBar.anchor.setTo(0.5, 0.5);

    this.load.setPreloadSprite(preloadBar);

    //do all your loading here
    this.load.pack(this.whichEp,'assets/config/AssetPack.json');
  }


  create() {
    this.state.start('game',true,false,this.whichEp);//this.state =stateManager. used to control different states, start stop pause
  }

  update() {

  }

}
