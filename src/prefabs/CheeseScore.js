import Tools from "../components/Tools.js";

export default class CheeseScore extends Phaser.Group{
  constructor(game,xpos,ypos,totalcheese){
    super(game);

    this.style = {
      font:'bold 24px Century',fill:'#cde16d'
    }

    this.totalcheese = totalcheese;
    this.score = 0;
    this.holder = this.create(xpos,ypos,'objects1','cheese1');
    this.scoretext = this.add(new Phaser.Text(game,xpos+70,ypos+12,'x '+this.score+' / '+this.totalcheese,this.style));

    this.fixedToCamera = true;

  }

  increaseScore(val){
    this.score += val;
    this.scoretext.setText('x '+this.score+' / '+this.totalcheese);
  }

  addToTotalScore(ep){
    Tools.storeTotalScore(ep,this.score);
  }

}
