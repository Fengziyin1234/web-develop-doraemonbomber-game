var app=angular.module('app',[]);

app.controller('myCtrl',function($scope,$interval,$timeout){
    $scope.doraemongameswitch1=true;
    $scope.doraemongameswitch2=false;

    $scope.switchdoraemongame=function(value){
        $scope.doraemongameswitch1=value;
        $scope.doraemongameswitch2=!value;
        doraemon.style.left="600px";
        doraemon.style.top="270px";
        box1.style.left="500px";
        box1.style.top="100px";
        bat1.style.left="700px";
        bat1.style.top="500px";
        bat2.style.left="1000px";
        bat2.style.top="700px";
        bat3.style.left="200px";
        bat3.style.top="200px";
    }

    //doraemon game app
    //get each charactor element
    var gameboard=document.getElementById('doraemongame_board');
    var doraemon=document.getElementById('doraemon');
    var nobita=document.getElementById('nobita');
    var box1=document.getElementById('box1');
    var bat1=document.getElementById('bat1');
    var bat2=document.getElementById('bat2');
    var bat3=document.getElementById('bat3');
    
    //start the game
    $scope.doraemongamestart=function(){
        doraemon.style.left="600px";
        doraemon.style.top="270px";
        doraemon.style.width="63px";
        doraemon.style.height="89px";
        doraemon.style.background="url(images/down1.png)";
        nobita.style.left="200px";
        nobita.style.top="350px";
        nobitamoving();
        bat1moving();
        bat2moving();
        bat3moving();
        window.addEventListener('keydown',gamepadder,false);

        for(var i=0;i<bombHurtArr.length;i++){
            bombHurtArr[i].style.display="block";
        }
    }

    function gamepadder(event){
       switch(event.which){
          case 87:
             upMoving(doraemon);
             break;
          case 83:
             downMoving(doraemon);
             break;
          case 65:
             leftMoving(doraemon);
             break;
          case 68:
             rightMoving(doraemon);
             break;
          case 84:
             Abutton();
             break;
          case 89:
             Bbutton();
             break;
          default:
             break;
       }
    }    
    /*the timer is to cancel the walking effect if charactor does not 
    finish one step walking while click again*/
    var downMovingtimer=0;
    var upMovingtimer=0;
    var leftMovingtimer=0;
    var rightMovingtimer=0;
    
    //change left foot and right foot flag
    //doraemon_direction shows which direction he current faces
    var downMovingStep=false;
    var upMovingStep=false;
    var leftMovingStep=false;
    var rightMovingStep=false;
    var doraemon_direction="";
    
    //If doraemon get items,these flags will be changed
    //If doraemon already took one item, he cannot take other items anymore
    var carryItem=false;
    var handEmpty=true;
        
    //nobita automatically moving, he will walking one step each 1100ms
    function nobitamoving(){
       var directionRandom=Math.ceil(Math.random()*4);
       switch(directionRandom){
          case 1:
            upMoving(nobita);
            break;
          case 2:
            downMoving(nobita);
            break;
          case 3:
            leftMoving(nobita);
             break;
          case 4:
            rightMoving(nobita);
            break;
          default:
            break;
       }
       $timeout(nobitamoving,900);
    }

    function bat1moving(){
       var directionRandom=Math.ceil(Math.random()*4);
       switch(directionRandom){
          case 1:
            upMoving(bat1);
            break;
          case 2:
            downMoving(bat1);
            break;
          case 3:
            leftMoving(bat1);
             break;
          case 4:
            rightMoving(bat1);
            break;
          default:
            break;
       }
       $timeout(bat1moving,900);
    }

    function bat2moving(){
       var directionRandom=Math.ceil(Math.random()*4);
       switch(directionRandom){
          case 1:
            upMoving(bat2);
            break;
          case 2:
            downMoving(bat2);
            break;
          case 3:
            leftMoving(bat2);
             break;
          case 4:
            rightMoving(bat2);
            break;
          default:
            break;
       }
       $timeout(bat2moving,900);
    }

    function bat3moving(){
       var directionRandom=Math.ceil(Math.random()*4);
       switch(directionRandom){
          case 1:
            upMoving(bat3);
            break;
          case 2:
            downMoving(bat3);
            break;
          case 3:
            leftMoving(bat3);
             break;
          case 4:
            rightMoving(bat3);
            break;
          default:
            break;
       }
       $timeout(bat3moving,900);
    }
    
    /*each direction's moving function,if doraemon calls it,doraemon_direction will be changed,
    left foot or right foot flag changes, then get the current position and let them plus or
    minus 15px to move,if doraemon calls,also need judge if he is carrying items. If so,items
    should also move together with him. As for up and down moving, after each step moving,
    charactor's z-index relationship need to be updated using judgeZindex function.(If one's
    top is larger than the other,its z-index should be also larger than other's)*/
    function downMoving(charactor){
        $timeout.cancel(downMovingtimer);
        if(charactor===doraemon){
            doraemon_direction="down"; 
        }
        downMovingStep=!downMovingStep;
        var tmp=charactor.style.top;
        var currentY=parseInt(tmp.substring(0,tmp.length-2));

        if(currentY<=795){
           if(downMovingStep){
              if(charactor===doraemon){
                   charactor.style.background="url(images/down2.png) no-repeat center";
              }else if(charactor===nobita){
                   charactor.style.background="url(images/nobita_down2.png) no-repeat center";
              }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                   charactor.style.background="url(images/bat_down2.png) no-repeat center";
              }
            }else{
                if(charactor===doraemon){
                    charactor.style.background="url(images/down3.png) no-repeat center";  
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_down3.png) no-repeat center";
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                   charactor.style.background="url(images/bat_down3.png) no-repeat center";
                }
            }
            charactor.style.transition="ease-in 0.3s";
            charactor.style.top=currentY+15+"px";
            if(carryItem&&charactor===doraemon){
                itemMoving(tmpBomb,doraemon_direction);
            }

            downMovingtimer=$timeout(function(){
                charactor.style.transition="ease-out 0.3s";
                tmp=charactor.style.top;
                currentY=parseInt(tmp.substring(0,tmp.length-2));
                if(charactor===doraemon){
                    charactor.style.background="url(images/down1.png) no-repeat center";   
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_down1.png) no-repeat center";                    
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                   charactor.style.background="url(images/bat_down1.png) no-repeat center";
                }
                charactor.style.top=currentY+15+"px";
                if(carryItem&&charactor===doraemon){
                    itemMoving(tmpBomb,doraemon_direction);
                }
                judgeZindex(charactor);
                // console.log("top: "+charactor.style.top);
            },310);
        }
    }

    function upMoving(charactor){
        $timeout.cancel(upMovingtimer);
        if(charactor===doraemon){
            doraemon_direction="up";
        }
        upMovingStep=!upMovingStep;
        var tmp=charactor.style.top;
        var currentY=parseInt(tmp.substring(0,tmp.length-2));

        if(upMovingStep){
            if(charactor===doraemon){
                charactor.style.background="url(images/up2.png) no-repeat center";
            }else if(charactor===nobita){
                charactor.style.background="url(images/nobita_up2.png) no-repeat center";
            }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                   charactor.style.background="url(images/bat_up2.png) no-repeat center";
            }
        }else{
            if(charactor===doraemon){
                charactor.style.background="url(images/up3.png) no-repeat center";
            }else if(charactor===nobita){
                charactor.style.background="url(images/nobita_up3.png) no-repeat center";
            }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                charactor.style.background="url(images/bat_up3.png) no-repeat center";
            }
        }
        charactor.style.transition="ease-in 0.3s";
        if(currentY>=100){
            charactor.style.top=currentY-15+"px";

            if(carryItem&&charactor===doraemon){
                 itemMoving(tmpBomb,doraemon_direction);
            }
        }

        upMovingtimer=$timeout(function(){
            charactor.style.transition="ease-out 0.3s";
            tmp=charactor.style.top;
            currentY=parseInt(tmp.substring(0,tmp.length-2));
            if(charactor===doraemon){
                charactor.style.background="url(images/up1.png) no-repeat center";
            }else if(charactor===nobita){
                charactor.style.background="url(images/nobita_up1.png) no-repeat center";
            }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                charactor.style.background="url(images/bat_up1.png) no-repeat center";
            }
            if(currentY>=320){
                charactor.style.top=currentY-15+"px";
                if(carryItem&&charactor===doraemon){
                     itemMoving(tmpBomb,doraemon_direction);
                }
                judgeZindex(charactor);
            }
            // console.log("top: "+charactor.style.top);
        },310);
    }

    function leftMoving(charactor){
        $timeout.cancel(leftMovingtimer);
        if(charactor===doraemon){
            doraemon_direction="left";     
        }
        leftMovingStep=!leftMovingStep;
        var tmp=charactor.style.left;
        var currentX=parseInt(tmp.substring(0,tmp.length-2));

        if(currentX>=80){
            if(leftMovingStep){
                if(charactor===doraemon){
                    charactor.style.background="url(images/left2.png) no-repeat center";       
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_left2.png) no-repeat center";         
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                   charactor.style.background="url(images/bat_left2.png) no-repeat center";
                }
            }else{
                if(charactor===doraemon){
                    charactor.style.background="url(images/left3.png) no-repeat center";
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_left3.png) no-repeat center";
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                    charactor.style.background="url(images/bat_left3.png) no-repeat center";
                }
            }
            charactor.style.transition="ease-in 0.3s";
            charactor.style.left=currentX-15+"px";

            if(carryItem&&charactor===doraemon){
                itemMoving(tmpBomb,doraemon_direction);
            }

            leftMovingtimer=$timeout(function(){
                charactor.style.transition="ease-out 0.3s";
                tmp=charactor.style.left;
                currentX=parseInt(tmp.substring(0,tmp.length-2));
                if(charactor===doraemon){
                    charactor.style.background="url(images/left1.png) no-repeat center";
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_left1.png) no-repeat center";
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                    charactor.style.background="url(images/bat_left1.png) no-repeat center";
                }
                charactor.style.left=currentX-15+"px";

                if(carryItem&&charactor===doraemon){
                     itemMoving(tmpBomb,doraemon_direction);
                }
                // console.log("left: "+charactor.style.left);
            },310);
        }
    }

    function rightMoving(charactor){
        $timeout.cancel(rightMovingtimer);
        if(charactor===doraemon){
            doraemon_direction="right";
        }
        rightMovingStep=!rightMovingStep;
        var tmp=charactor.style.left;
        var currentX=parseInt(tmp.substring(0,tmp.length-2));

        if(currentX<=1270){
            if(rightMovingStep){
                if(charactor===doraemon){
                    charactor.style.background="url(images/right2.png) no-repeat center";
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_right2.png) no-repeat center";
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                    charactor.style.background="url(images/bat_right2.png) no-repeat center";
                }
            }else{
                if(charactor===doraemon){
                   charactor.style.background="url(images/right3.png) no-repeat center";
                }else if(charactor===nobita){
                   charactor.style.background="url(images/nobita_right3.png) no-repeat center";
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                    charactor.style.background="url(images/bat_right3.png) no-repeat center";
                }
            }
            charactor.style.transition="ease-in 0.3s";
            charactor.style.left=currentX+15+"px";
            if(carryItem&&charactor===doraemon){
                 itemMoving(tmpBomb,doraemon_direction);
            }

            rightMovingtimer=$timeout(function(){
                charactor.style.transition="ease-out 0.3s";
                tmp=charactor.style.left;
                currentX=parseInt(tmp.substring(0,tmp.length-2));
                if(charactor===doraemon){
                    charactor.style.background="url(images/right1.png) no-repeat center";
                }else if(charactor===nobita){
                    charactor.style.background="url(images/nobita_right1.png) no-repeat center";
                }else if(charactor===bat1||charactor===bat2||charactor===bat3){
                    charactor.style.background="url(images/bat_right1.png) no-repeat center";
                }
                charactor.style.left=currentX+15+"px";
                if(carryItem&&charactor===doraemon){
                     itemMoving(tmpBomb,doraemon_direction);
                }
                // console.log("left: "+charactor.style.left);
            },310);
        }
    }
        
    //A button function, let doraemon take items if items nearby
    function Abutton(){
        var tmp1=doraemon.style.left;
        var tmp2=doraemon.style.top;
        var currentX1=parseInt(tmp1.substring(0,tmp1.length-2));
        var currentY1=parseInt(tmp2.substring(0,tmp2.length-2));

        var tmp3=tmpBomb.style.left;
        var tmp4=tmpBomb.style.top;
        var currentX2=parseInt(tmp3.substring(0,tmp3.length-2));
        var currentY2=parseInt(tmp4.substring(0,tmp4.length-2));
        
        if(currentX1>=(currentX2-70)&&currentX1<=(currentX2+70)&&currentY1>=(currentY2-70)&&currentY1<=(currentY2+70)){
            takeItem(tmpBomb,currentX1,currentY1);
            handEmpty=false;
        }
    }
    
    //decide which item will doraemon take
    function takeItem(item,currentX,currentY){
        item.style.transition="ease-in 0.3s";
        item.style.left=currentX+"px";
        item.style.top=currentY-15+"px";
        carryCabbage=true;
        carryItem=true;
    }
    
    //if doraemon carries item, item will also be moving
    function itemMoving(item,direction){
        item.style.transition="ease-in 0.3s";
        var tmpX=item.style.left;
        var tmpY=item.style.top;
        var currentX=parseInt(tmpX.substring(0,tmpY.length-2));       
        var currentY=parseInt(tmpY.substring(0,tmpY.length-2));

        switch(direction){
            case "up":
                item.style.top=currentY-15+"px";
                break;
            case "down":
                item.style.top=currentY+15+"px";
                break;
            case "left":
                item.style.left=currentX-15+"px";
                break;
            case "right":
                item.style.left=currentX+15+"px";
                break;
            default:
                break;
        }
    }
    
    var bombSet=false;
    var tmpBomb={};
    var bombX=0;
    var bombY=0;

    //B button function
    function Bbutton(){
        var tmp1=doraemon.style.left;
        var tmp2=doraemon.style.top;
        var currentX1=parseInt(tmp1.substring(0,tmp1.length-2));
        var currentY1=parseInt(tmp2.substring(0,tmp2.length-2));

        if(carryItem){            
            putoffItem(tmpBomb,currentX1,currentY1);
            carryItem=false;
            handEmpty=true;
        }
        //set a bomb if hand is empty
        else{
            if(!bombSet){
                bombSet=true;
                bombX=currentX1+40;
                console.log(bombX);
                bombY=currentY1+60;
                var bomb=document.createElement('div');
                bomb.setAttribute("style","position:absolute;left:"+bombX+"px;top:"+bombY+"px;width:45px;height:45px;z-index:2;background:url(images/bomb.png);");
                gameboard.appendChild(bomb);
                tmpBomb=bomb;
                bombtimer(bomb,bombX,bombY);
            }
        }
    }
    
    var canceltimer=0;

    function bombtimer(bomb,bombX,bombY){
        $timeout.cancel(canceltimer);
        canceltimer=$timeout(function(){
            bombSet=false;
            bomb.setAttribute("style","position:absolute;left:"+bombX+"px;top:"+(bombY-30)+"px;width:90px;height:127px;background:url(images/fire.gif);");
            bombBlow(bombX,bombY);
            $timeout(function(){
               gameboard.removeChild(bomb);
            },1100);
        },3000);
    }
    
    //put off items
    function putoffItem(bomb,currentX,currentY){
        bomb.style.transition="ease-in 0.5s";
        if(doraemon_direction=="right"){
            bomb.style.left=currentX+130+"px";
            bomb.style.top=currentY+50+"px";
            tmpBomb=bomb;
            bombtimer(bomb,currentX+130,currentY+50);
        }else if(doraemon_direction=="left"){
            bomb.style.left=currentX-130+"px";
            bomb.style.top=currentY+50+"px";
            tmpBomb=bomb;
            bombtimer(bomb,currentX-130,currentY+50);   
        }else if(doraemon_direction=="down"){
            bomb.style.left=currentX+20+"px";
            bomb.style.top=currentY+130+"px";
            tmpBomb=bomb;
            bombtimer(bomb,currentX+20,currentY+170); 
        }else if(doraemon_direction=="up"){
            bomb.style.left=currentX+20+"px";
            bomb.style.top=currentY-90+"px";
            tmpBomb=bomb;
            bombtimer(bomb,currentX+20,currentY-90); 
        }
    }
    
    //judge who will be hurt by bomb
    var bombHurtArr=[doraemon,nobita,bat1,bat2,bat3,box1];
    
    /*record the bomb position and compare it with all other people at that time
    and decide who will be hurt*/
    function bombBlow(bombX,bombY){
        for(var i=0,j=0;i<bombHurtArr.length;i++){
           var tmp1=bombHurtArr[i].style.left;
           var currentX=parseInt(tmp1.substring(0,tmp1.length-2)); 

           var tmp2=bombHurtArr[i].style.top;
           var currentY=parseInt(tmp2.substring(0,tmp1.length-2));
           console.log(bombHurtArr[i].style.left);

           if(Math.abs(bombX-currentX)<100&&Math.abs(bombY-currentY)<100){
               bombHurtArr[i].style.display="none";
               if(doraemon.style.display=="none"){
                  doraemon.style.display="block";
                  doraemon.style.width="100px";
                  doraemon.style.height="71px";
                  doraemon.style.background="url(images/doraemon_die.png) no-repeat center";
                  window.removeEventListener('keydown',gamepadder,false);
               }
           }
        }
    }

    //judge z-index relationship
    function judgeZindex(charactor){
        var tmp1=charactor.style.top;
        var currentY1=parseInt(tmp1.substring(0,tmp1.length-2));

        var tmp2=tmpBomb.style.top;
        var currentY2=parseInt(tmp2.substring(0,tmp2.length-2));
        
        if(carryItem){
                charactor.style.zIndex=10;
                tmpBomb.style.zIndex=10;
        }else{
            if(currentY1+40>currentY2){
                charactor.style.zIndex=12;
                tmpBomb.style.zIndex=10;
            }else{
                charactor.style.zIndex=10;
                tmpBomb.style.zIndex=12;
            }
        }
    }
})