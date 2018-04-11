export default class Tools{

  static muteOrPlay(audiosprite, bool){
      if(!audiosprite) return;
      for (let key in audiosprite.sounds){
        audiosprite.sounds[key].mute = bool;
      }
  }

  static playSound(sfx,soundarray){
    //with blocking function
    if(sfx==undefined||soundarray==undefined||soundarray.length<0)return;
    let canPlay = true;
    soundarray.forEach((sound)=>{
      if(sfx.sounds[sound].isPlaying){
        canPlay = false;
        return;
      }
    });
    if(canPlay) sfx.play(sfx.game.rnd.pick(soundarray));
  }

  static storeEp(whichEp){
    if(typeof(Storage)!=="undefined"){
      let epArray = localStorage.getItem("played_ep");
      if(epArray){
        let data = JSON.parse(epArray);
        data.push(whichEp);
        localStorage.setItem("played_ep",JSON.stringify(Array.from(new Set(data))));//Set is only unique items
      }else{
        localStorage.setItem("played_ep",JSON.stringify([whichEp]));
      }

      localStorage.setItem("current_ep",whichEp);

    }else{
      console.log("Warning: no local storage");
    }
  }

  static getEp(){
    if(typeof(Storage)!=="undefined"){
      return localStorage.getItem("current_ep");
    }else{
      console.log("Warning: no local storage");
    }
  }

  static storeTotalScore(ep, score){
    if(typeof(Storage)!=="undefined"){
      let scArray = localStorage.getItem("total_score");
      if(scArray){
        let data = JSON.parse(scArray);
        data[ep-1] = score;
        localStorage.setItem("total_score",JSON.stringify(data));
      }else{
        let newData = new Array();
        newData[ep-1] = score;
        localStorage.setItem("total_score",JSON.stringify(newData));
      }
    }else{
      console.log("Warning: no local storage");
    }
  }

  static getTotalScore(){
    if(typeof(Storage)!=="undefined"){
      let scArray = localStorage.getItem("total_score");
      let highScore = localStorage.getItem("high_score");
      if(scArray){
        let data = JSON.parse(scArray);
        let totalScore = 0;
        data.forEach((s)=>{totalScore+=s;});
        if(highScore){
          if(highScore<totalScore)localStorage.setItem("high_score",totalScore);
        }else localStorage.setItem("high_score",totalScore);
        return totalScore;
      }else console.log("No idea: no data");
    }else{
      console.log("Warning: no local storage");
    }
  }

  static storeData(target,data){
    if(typeof(Storage)!=="undefined"){
      localStorage.setItem(target,JSON.stringify(data));
    }else{
      console.log("Warning: no local storage");
    }
  }

  static getData(target){
    if(typeof(Storage)!=="undefined"){
      return JSON.parse(localStorage.getItem(target));
    }else{
      console.log("Warning: no local storage");
    }
  }


  static convertTileCoorToP2(x,y,width,height,P2Body){
    let returnCoor = new Phaser.Point(x+width/2,y-height/2);
    P2Body.x = returnCoor.x;P2Body.y=returnCoor.y;

    return returnCoor;
  }

  static findObjectInLayer(map,layer){
    //modified it to search only for unique GID
    let result = new Array();
    map.objects[layer].forEach(function(element){
      //element.y -= element.height;
      result.push(element);
    });
    return result;
  }

  static findUniqueGIDInLayer(map,layer){
    //modified it to search only for unique GID
    let result = new Array();
    let gid = new Array();
    map.objects[layer].forEach(function(element){
      //element.y -= element.height;
      if(gid.length>0&&gid.indexOf(element.gid)!=-1)return;
      result.push(element);
      gid.push(element.gid);
    });
    return result;
  }

  static checkIfOnFloor(game,player) {

    var yAxis = p2.vec2.fromValues(0, 1);
    var result = false;

    for (var i=0; i < game.physics.p2.world.narrowphase.contactEquations.length; i++)
    {
        var c = game.physics.p2.world.narrowphase.contactEquations[i];

        if (c.bodyA === player.body.data || c.bodyB === player.body.data)
        {
            var d = p2.vec2.dot(c.normalA, yAxis);

            if (c.bodyA === player.body.data)
            {
                d *= -1;
            }

            if (d > 0.5)
            {
                result = true;
            }
        }
    }

    return result;

  }
}
