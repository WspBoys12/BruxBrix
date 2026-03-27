const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let player, blocks, score;

function startDodgeGame() {
  player={x:180,y:450,size:30}; blocks=[]; score=0;
  gameLoop();
}

function gameLoop(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(Math.random()<0.03) blocks.push({x:Math.random()*370,y:-30,size:30,speed:2+Math.random()*3});
  ctx.fillStyle="cyan"; ctx.fillRect(player.x,player.y,player.size,player.size);
  ctx.fillStyle="red";
  for(let i=blocks.length-1;i>=0;i--){
    let b=blocks[i]; b.y+=b.speed; ctx.fillRect(b.x,b.y,b.size,b.size);
    if(b.x<player.x+player.size && b.x+b.size>player.x && b.y<player.y+player.size && b.y+b.size>player.y){
      alert("Game Over! Score: "+score);
      return;
    }
    if(b.y>500) blocks.splice(i,1);
  }
  score++; ctx.fillStyle="white"; ctx.fillText("Score: "+score,10,20);
  gameLoopId = requestAnimationFrame(gameLoop);
}

document.addEventListener("keydown",e=>{
  if(!player) return;
  if(e.key==="ArrowLeft") player.x-=20;
  if(e.key==="ArrowRight") player.x+=20;
  if(player.x<0) player.x=0; if(player.x>370) player.x=370;
});
