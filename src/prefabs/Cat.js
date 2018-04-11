import Tools from "../components/Tools.js";

export default class Cat extends Phaser.Sprite{
  constructor(game,x,y,key,frame){
    super(game,x,y,key,frame);
    this.animations.add('fly',Phaser.Animation.generateFrameNames('frame', 0, 3, '', 0),6,false,false);
    this.speed = 200;//need to flip the images

    game.physics.p2.enable(this,false);//debug is true
    this.body.data.gravityScale = -0.1;//no gravity to this guy
    this.body.clearShapes();

    this.body.setRectangle(this.width*0.5,Math.round(this.height*0.9),0,0);//setRectange will apply the shape with anchor to middle
    //reset the body location after setShapes method.. //if I dont want the hassle of setting offsets
    Tools.convertTileCoorToP2(x,y,this.width,this.height,this.body);
    this.anchor.setTo(0.7,0.55);//it is better to adjust by anchor rather than using offset above coz the body will sink
    this.body.fixedRotation = true;
    this.body.damping = 0.2;

    //add a timer to check whether its blocked upon an obstacle
    this.lastPositionX = this.x;
    this.heartBeatInterval = 1200;
    this.heartBeatChecker = this.game.time.create(false);
    this.heartBeatChecker.loop(this.heartBeatInterval, this.heartBeatCheck,this);
    this.heartBeatChecker.start();
    this.reverseNow = false;

    this.animations.play('fly',null,true);

    //set health-internal built in params
    this.damageTimer = 0;
    this.setHealth(56);//default maxHealth is 100

    //create 8 balls - 2 of each color

    this.balls = game.add.group(game.world,'balls',false,true,1);
    this.balls.createMultiple(2,'objects3',['ball_green','ball_red','ball_yellow','ball_blue']);

    this.balls.forEach((ball)=>{
      ball.body.clearShapes();
      ball.body.setCircle(ball.width/2);
      //ball.body.debug=true;
    },game.world);

    this.ballticker = 0;

    //console.log("are their children "+this.children.length);
    //damage animation
    this.flashRedEffect = this.game.add.tween(this) //blink blink when hit
        .to({tint:0xFF0000},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFB8989},50,Phaser.Easing.Bounce.out)
        .to({tint:0xFFFFFF},150,Phaser.Easing.Circular.out);
  }

  heartBeatCheck(){
    //check for position
    if(Math.abs(this.x-this.lastPositionX)>20){
      this.lastPositionX = this.x;
    }else{
      this.reverseNow = true;
    }

    //4 ticks then fire one ball
    if(this.ballticker>2){
      let ball = this.balls.getRandom();
      if(ball&&!ball.alive){
        ball.lifespan = 5200;
        //ball.body.debug=true;
        ball.reset(this.x,this.y-50);
        if(this.scale.x<0)ball.body.applyForce([800, 1000], this.body.x+5, this.body.y+5);//from right -> shoot left
        else ball.body.applyForce([-800, 1000], this.body.x-5, this.body.y+5);//-> shoot right
      }
      this.ballticker = 0;
    }

    this.ballticker++;
  }

  damageCat(amt,interval){
      if(this.health<=0.5)return;

      if(this.game.time.now>this.damageTimer){//player cannot keep taking damage every tick!
        this.damage(amt);//use interal function, which will activate the kill if health = 0;
        console.log("cat health "+this.health);

        if(!this.flashRedEffect.isRunning)this.flashRedEffect.start();

        this.damageTimer = this.game.time.now + interval;
      }
  }

  update(){
    this.body.velocity.x = this.speed;

    //if stumbled upon an obstacle
    if(this.reverseNow){
      this.speed *= -1;
      this.scale.x = (this.speed>0)?1:-1;
      this.reverseNow = false;
    }

    this.scale.x = (this.speed>0)?1:-1;
  }

}
