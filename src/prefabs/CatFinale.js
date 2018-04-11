import Tools from "../components/Tools.js";

export default class Cat extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.animations.add('fly',Phaser.Animation.generateFrameNames('catf', 1, 4, '', 0),6,false,false);
    this.speed = 150;
    this.paused = true;

    let rope = game.add.graphics(this.x,this.y);//belongs to world
    rope.clear();
    rope.beginFill(0x524539);
    rope.drawRect(0,-200,2,400);
    rope.endFill();
    rope.name = 'rope';

    this.marina = game.add.sprite(this.x,this.y,'objects5','marina_captured');
    this.marina.name = 'marina';

    game.physics.p2.enable([this,rope,this.marina],false);

    this.body.data.gravityScale = -0.6;//no gravity to this guy

    /*
    this.body.clearShapes();
    this.body.setRectangle(this.width*0.5,this.height,0,0);//setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    this.anchor.setTo(0.5,0.5);//it is better to adjust by anchor rather than using offset above coz the body will sink
    */

    this.body.fixedRotation = true;
    this.body.damping = 0.2;


    rope.body.data.gravityScale = 0.4;
    //rope.body.fixedRotation = true;

    this.marina.body.data.gravityScale = 0.6;
    this.marina.anchor.setTo(1,0.5);
    //this.marina.body.fixedRotation = true;

    game.physics.p2.createRevoluteConstraint(this, [ 80, -62 ], rope, [1, -200],1000);
    game.physics.p2.createRevoluteConstraint(rope,[1,200],this.marina,[0,0],1000);

    this.marinatext = game.add.text(this.x,this.y," ",{
      font:'15px Century',fill:'#ffffff'
    });
    this.marinatext.anchor.setTo(0.5,0.5);
    this.marinatext.kill();


    this.animations.play('fly',null,true);

    this.fadesout = new Array();

    this.fadesout[0] = this.game.add.tween(this).to({ alpha: 0.0 }, 4000, Phaser.Easing.Quadratic.Out);
    this.fadesout[1] = this.game.add.tween(rope).to({ alpha: 0.0 }, 4000, Phaser.Easing.Quadratic.Out);
    this.fadesout[2] = this.game.add.tween(this.marina).to({ alpha: 0.0 }, 4000, Phaser.Easing.Quadratic.Out);

  }

  say(speech){

      this.marinatext.setText(speech);
      this.marinatext.reset(this.marina.x-this.marina.width/2,this.marina.y-140);
      this.marinatext.lifespan = 3000;
      //console.log('text location ' + this.bosstext.x + ' '+ this.bosstext.y + ' '+ this.x + ' ' + this.y);
  }

  fadeout(){
    this.fadesout[0].start();
    this.fadesout[1].start();
    this.fadesout[2].start();
  }

  update(){
    this.body.velocity.y = -this.speed;

    if(!this.paused){
      this.body.velocity.x = this.speed;
    }

  }

}
