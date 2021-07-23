//Game Constants & variables
let inputDir = { x: 0, y: 0 };
const game_sound = new Audio("snake.mp3");
const eat_sound = new Audio("eating.wav");
const game_over = new Audio("gameover.wav");
let speed = 10;
let score = 0;
let last_Paint_Time = 0;
let snake_arr = [{ x: 13, y: 15 }];
food = { x: 6, y: 7 };




//Game Functions

function main(ctime) {
  window.requestAnimationFrame(main);
//   console.log(ctime);
  if ((ctime - last_Paint_Time) / 1000 < 1 / speed) {
    return;
  }
  last_Paint_Time = ctime;
  game_Engine();
}

function isCollide(snake){
    //If snake hits itself
    for(let i=1;i<snake_arr.length; i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
      }

      //If you bump into the wall
        if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
          return true;
        }
}

function game_Engine() {
  //Part-1 (Updating the snake variables)
  if(isCollide(snake_arr)){
    game_sound.pause();
    eat_sound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over!!!  Press any Key to Play Again");
    snake_arr = [{ x: 13, y: 15 }];
    game_over.play();
    score = 0;
  }

  //If snake had eaten the food , increment the Score and change food position
  if(snake_arr[0].y == food.y && snake_arr[0].x == food.x){
    eat_sound.play(); 
    score += 1;
    scoreBox.innerHTML = "Score : " + score;
    snake_arr.unshift({x : snake_arr[0].x + inputDir.x, y : snake_arr[0].y + inputDir.y});
     let a = 2;
     let b = 16;
     food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())};
  }

  //Moving the Snake
  for(let i=snake_arr.length - 2; i>=0; i--){
      snake_arr[i+1] = {...snake_arr[i]};
  }

  snake_arr[0].x += inputDir.x;
  snake_arr[0].y += inputDir.y;








  //Part-2 (Display the snake & Food)
  //Displaying the Snake
  board.innerHTML = "";
  snake_arr.forEach((e, index) => {
    snake_element = document.createElement("div");
    snake_element.style.gridRowStart = e.y;
    snake_element.style.gridColumnStart = e.x;

    if (index == 0) {
      snake_element.classList.add("head");
    } else {
      snake_element.classList.add("snake");
    }
    board.appendChild(snake_element);
  });

  //Displaying the Food
  food_element = document.createElement("div");
  food_element.style.gridRowStart = food.y;
  food_element.style.gridColumnStart = food.x;
  food_element.classList.add("food");
  board.appendChild(food_element);
}




//Main Logic Starts here
window.requestAnimationFrame(main);

window.addEventListener('keydown', e =>{
    inputDir = {x:0, y:1} //Start the Game
    game_sound.play();

    switch (e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        default:
            break;
    }
});



































































