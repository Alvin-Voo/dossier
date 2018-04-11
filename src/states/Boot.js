export default class Boot {

  preload() {

    //preload for menu screen
    this.load.image('splashscreen','assets/menu/splashscreenbare.png');
    this.load.image('animeffect','assets/menu/animeffect.png');
    this.load.image('start','assets/menu/startselect.png');
    this.load.image('continue','assets/menu/continueselect.png');
    this.load.image('options','assets/menu/optionsselect.png');
    this.load.image('wordings','assets/menu/wordings.png');
    this.load.image('popup','assets/menu/popuppanel.png')

    //load SFX first in boot
    this.load.audioSprite('sfx',['assets/audio/sfx/sfx.ogg','assets/audio/sfx/sfx.mp3','assets/audio/sfx/sfx.m4a','assets/audio/sfx/sfx.mc3'],'assets/audio/sfx/sfx.json');
    //standard configuration settings.. popups, tips, dialouges etc
    this.load.json('config','assets/config/Config.json');

    this.stage.backgroundColor = "#22226a";
    //need a loading bar
    this.load.image('preloader', 'assets/menu/loadingbar.png');

  }

  create() {
    this.input.maxPointers = 1;
    this.input.mspointer.capture = false;
    this.state.start('menu');
  }

}
