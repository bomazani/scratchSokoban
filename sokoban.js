
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


var grid = document.getElementById("sokobanGrid");
var mapRow;
var cellClass;
var horizontalMove = 0;
var verticalMove = 0;
var boxCount = 0;
let playerPosX;
let playerPosY;
let playertopPadding;
let playerLeftPadding;

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
                    cellClass = "box";
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
                    console.log("top: " + playerTopPadding);
                    console.log("left: " + playerLeftPadding);
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

