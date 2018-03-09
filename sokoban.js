// production map //
const map = [
    "  WWWWW ",
    "WWW   W ",
    "WOSB  W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

// test map //
// const map = [
//     "  WWWWW ",
//     "WWW   W ",
//     "WOSB  W ",
//     "WWWB OW ",
//     "WOWW  W ",
//     "W W O WW",
//     "W  X  OW",
//     "W   O  W",
//     "WWWWWWWW"
// ];


var grid = document.getElementById("sokobanGrid");
var mapRow;
var cellClass;
var horizontalMove = 0;
var verticalMove = 0;

let playerPosX;
let playerPosY;
let playerTopPadding;
let playerLeftPadding;

var boxCount = 0;
let newBox;
let boxPosx;
let boxPosY;
let boxTopPadding;
let boxLeftPadding;

document.addEventListener("keydown", movePlayer);

drawMap();
function drawMap() {
    for (let i = 0; i < map.length; i++) {
        mapRow = document.createElement("div");
        mapRow.setAttribute("class", "mapRow");
        for (let j = 0; j < map[i].length; j++) {
            let mapColumn = document.createElement("div");

            switch (map[i][j]) {
                default:
                    cellClass = "empty";
                    break;

                case "W":
                    cellClass = "wall";
                    break;

                case "B":
                    // cellClass = "box";
                    // break;

                    // creating boxes with absolute positioning (like the player) //
                    boxCount = boxCount + 1;
                    cellClass = "empty";
                    boxPosX = i;
                    boxPosY = j;
                    boxTopPadding = (boxPosX*50);
                    boxLeftPadding = (boxPosY*50);
                    newBox = document.createElement("div");
                    newBox.setAttribute("id",boxCount);
                    newBox.setAttribute("class","box");
                    newBox.setAttribute("style","top:" + boxTopPadding + "px; left:" + boxLeftPadding + "px");
              
                    
                    sokobanGrid.appendChild(newBox);

                    console.log("box"+boxCount+" top: " + boxTopPadding + "/" + "left: " + boxLeftPadding);
                    break;

                case "O":
                    cellClass = "openTarget";
                    break;

                case "X":
                    cellClass = "fullTarget";
                    break;

                case "S":
                    cellClass = "empty";
                    playerPosX = i;
                    playerPosY = j;
                    playerTopPadding = (playerPosX*50);
                    playerLeftPadding = (playerPosY*50);
                    document.getElementById("player").style.top = (playerTopPadding)+"px";
                    document.getElementById("player").style.left = (playerLeftPadding)+ "px";
                    console.log("player top: " + playerTopPadding);
                    console.log("player left: " + playerLeftPadding);
                    break;
            }
            mapColumn.setAttribute("class", cellClass);
            mapRow.appendChild(mapColumn);
        }
        grid.appendChild(mapRow);
    }
}

function movePlayer(event) {
    direction = event.key;
    verticalMove = 0;
    horizontalMove = 0

    switch (event.key) {
        case "ArrowUp":
            verticalMove = verticalMove-1;
            break;

        case "ArrowDown":
            verticalMove = verticalMove+1;
            break;

        case "ArrowLeft":
            horizontalMove = horizontalMove-1;
            break;

        case "ArrowRight":
            horizontalMove = horizontalMove+1;
            break;
    }
    // console.log(horizontalMove + ":" + verticalMove);
    moveDirection = ((playerPosX + horizontalMove),(playerPosY + verticalMove));

    playerTopPadding = playerTopPadding + (verticalMove*50);
    playerLeftPadding = playerLeftPadding + (horizontalMove*50);
    // console.log(playerLeftPadding + ":" + playerTopPadding);

    document.getElementById("player").style.top = (playerTopPadding)+"px";
    document.getElementById("player").style.left = (playerLeftPadding)+ "px";
}

