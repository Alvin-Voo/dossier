import Tools from "../components/Tools.js"

export default class Popup extends Phaser.Image{
  constructor(game,x,y,paneltype){//full content height = 460
    super(game,x,y,'popup');

    this.name = 'popup';

    this.titleStyle = {
      font:'bold 40px Century',fill:'#d9d21a'
    }

    this.defaultStyle = {
      font:'bold 26px Century',fill:'#131a55'
    }

    this.optionStyle = {
      font:'bold 22px Century',fill:'#131a55'
    }

    this.descriptionStyle = {
      font:'bold 15px Century',fill:'#131a55'
    }

    this.highlightStyle = {
      font:'bold 26px Century',fill:'#cde16d'
    }
    this.paneltype = paneltype;
    //paneltype: 1 - menuscreen, 2 - ingame pause, 3 - description
    this.sfx = this.game.add.audioSprite('sfx');
    switch(paneltype){
      case 1:
        this.title = new Phaser.Text(game,512,188,'Options',this.titleStyle);
        this.title.anchor.setTo(0.5,0.5);
        this.title.setShadow(2,2);

        if(Tools.getData('mutetheme')) this.music = new Phaser.Text(game,340,245,'Play Music',this.defaultStyle);
        else this.music = new Phaser.Text(game,340,245,'Mute Music',this.defaultStyle);
        if(Tools.getData('mutesound')) this.sound = new Phaser.Text(game,340,305,'Play Sound',this.defaultStyle);
        else this.sound = new Phaser.Text(game,340,305,'Mute Sound',this.defaultStyle);

        this.instructions = new Phaser.Text(game,340,365,'Instructions',this.defaultStyle);
        this.credits = new Phaser.Text(game,340,425,'Credits',this.defaultStyle);
        this.back = new Phaser.Text(game,340,485,'Back',this.defaultStyle);

        this.addChild(this.title);
        this.addChild(this.music);
        this.addChild(this.sound);
        this.addChild(this.instructions);
        this.addChild(this.credits);
        this.addChild(this.back);

        this.highlight(this.music);
      break;
      case 2:
        this.title = new Phaser.Text(game,512,188,'Paused',this.titleStyle);
        this.title.anchor.setTo(0.5,0.5);
        this.title.setShadow(2,2);
        this.resume = new Phaser.Text(game,340,245,'Resume Game',this.defaultStyle);
        this.restart = new Phaser.Text(game,340,305,'Restart Episode',this.defaultStyle);
        if(Tools.getData('mutetheme')) this.music = new Phaser.Text(game,340,365,'Play Music',this.defaultStyle);
        else this.music = new Phaser.Text(game,340,365,'Mute Music',this.defaultStyle);
        if(Tools.getData('mutesound')) this.sound = new Phaser.Text(game,340,425,'Play Sound',this.defaultStyle);
        else this.sound = new Phaser.Text(game,340,425,'Mute Sound',this.defaultStyle);
        this.instructions = new Phaser.Text(game,340,485,'Instructions',this.defaultStyle);
        this.quit = new Phaser.Text(game,340,545,'Quit to Main Menu',this.defaultStyle);

        this.addChild(this.title);
        this.addChild(this.resume);
        this.addChild(this.restart);
        this.addChild(this.music);
        this.addChild(this.sound);
        this.addChild(this.instructions);
        this.addChild(this.quit);

        this.highlight(this.resume);

      break;
      case 3://used in instructions, credits & in-game tips
        this.title = new Phaser.Text(game,512,188,'Title',this.titleStyle);
        this.title.anchor.setTo(0.5,0.5);
        this.title.setShadow(2,2);

        this.description = new Phaser.Text(game,332,245,'Description',this.descriptionStyle);
        this.back = new Phaser.Text(game,340,560,'Got it!',this.defaultStyle);
        this.addChild(this.title);
        this.addChild(this.description);
        this.addChild(this.back);

        this.highlight(this.back);
      break;
      case 4://used in Continue menu option
        this.title = new Phaser.Text(game,512,188,'Choose Episode',this.titleStyle);
        this.title.anchor.setTo(0.5,0.5);
        this.title.setShadow(2,2);

        this.addChild(this.title);

        let epArray = Tools.getData('played_ep');
        if(epArray){
          for(let k=0,ypos=240; k<epArray.length; k++,ypos+=52){
            let epdesc = this.game.cache.getJSON('config').popup.episodes[epArray[k]];
            console.log("ya "+epdesc);
            let datatxt = new Phaser.Text(game,340,ypos,epArray[k]+'. '+epdesc,this.defaultStyle);
            this.addChild(datatxt);
          }

        }else{//still show ep1
          //show nothing
          //let epdesc = this.game.cache.getJSON('config').popup.episodes.ep1;
          //let datatxt = new Phaser.Text(game,340,245,'ep1. '+epdesc,this.defaultStyle);
          //this.addChild(datatxt);
        }

        let back = new Phaser.Text(game,340,560,'Back',this.defaultStyle);

        this.addChild(back);

      break;
    }
    this.selectionArray = new Array();
    for(let i=1; i<this.children.length; i++) this.selectionArray.push(this.children[i]);

    if(this.paneltype=='4'){//quick hack to make the selection correct for 'continue'
      this.cursorMoved(Phaser.KeyCode.UP);
      this.cursorMoved(Phaser.KeyCode.UP);
    }

    //this.selectionArray = new Array(this.music,this.sound,this.keyboard,this.credits,this.back);
    //select first element

    //menu sound effect
    this.sfx = this.game.add.audioSprite('sfx');

  }

  setTitle(title){
    this.title.setText(title);
  }

  setDescription(text,y_offset){
    this.description.setText(text);
    this.description.y += y_offset;
  }

  addImage(image){
    this.addChild(image);
  }

  cursorMoved(key){
    if(key===Phaser.KeyCode.UP){
      //pop then unshift
      this.selectionArray.unshift(this.selectionArray.pop());
      this.select(this.selectionArray[0]);

    }else if(key===Phaser.KeyCode.DOWN){
      //shift then push
      this.selectionArray.push(this.selectionArray.shift());
      this.select(this.selectionArray[0]);
    }
    this.sfx.play('menuselect');

  }

  optionEntered(){
    let selectedtext = this.selectionArray[0].text
    switch(selectedtext){
      case 'Mute Music':
        this.selectionArray[0].setText('Play Music');
      break;
      case 'Mute Sound':
        this.selectionArray[0].setText('Play Sound');
      break;
      case 'Play Music':
        this.selectionArray[0].setText('Mute Music');
      break;
      case 'Play Sound':
        this.selectionArray[0].setText('Mute Sound');
      break;
    }
    if (this.paneltype==3) return 'Got it!';
    else return selectedtext;
  }

  select(textObj){
    //reset everything
    this.selectionArray.forEach((textObj)=>{
      this.reset(textObj);
    });
    this.highlight(textObj);
  }

  highlight(textObj){
    textObj.setStyle(this.highlightStyle);
    textObj.setShadow(2,2,'#9a753a',0.5);
  }

  reset(textObj){
    textObj.setStyle(this.defaultStyle);
    textObj.setShadow();
  }

}
