// Initial start-up & reset map //
const originalMap = [
    "  WWWWW ",
    "WWW   W ",
    "WOS B W ",
    "WWW BOW ",
    "WOWWB W ",
    "W W O WW",
    "WB XBBOW",
    "W   O  W",
    "WWWWWWWW"
];

const map=[];

for(let i=0; i<originalMap.length; i++){
    map.push(originalMap[i].split(""));
}


// test map //
// const map = [
//     "WWWWWWWW",
//     "WWWWWWWW",
//     "WWW   WW",
//     "W S   WW",
//     "WWW   WW",
//     "W WW  WW",
//     "W W   WW",
//     "W      W",
//     "W      W",
//     "WWWWWWWW",
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
let boxPositionX;
let boxPositionY;
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
                   
                    cellClass = "empty";
                    boxPositionX = i;
                    boxPositionY = j;
                    boxTopPadding = ( boxPositionX * 50 );
                    boxLeftPadding = ( boxPositionY * 50 );
                    newBox = document.createElement( "div" );
                    newBox.setAttribute( "id", "" + boxPositionY + boxPositionX);
                    newBox.setAttribute( "class", "box" );
                    newBox.setAttribute( "style", "top:" + boxTopPadding + "px; left:" + boxLeftPadding + "px" );


                    sokobanGrid.appendChild(newBox);

                    // console.log("box" + boxCount + " top: " + boxTopPadding + " / " + "left: " + boxLeftPadding);
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
                    playerTopPadding = (playerPosX * 50);
                    playerLeftPadding = (playerPosY * 50);
                    document.getElementById("player").style.top = (playerTopPadding) + "px";
                    document.getElementById("player").style.left = (playerLeftPadding) + "px";
                    // console.log("player left: " + playerLeftPadding + " / player top: " + playerTopPadding);

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
    horizontalMove = 0;
    currentPlayerPosX = playerLeftPadding / 50;
    startingCurrentPlayerPosX = currentPlayerPosX;
    currentPlayerPosY = playerTopPadding / 50;
    startingCurrentPlayerPosY = currentPlayerPosY;
    // console.log("playerLeftPadding = " + playerLeftPadding);
    // console.log("playerTopPadding = " + playerTopPadding);
    // console.log("currentPlayerPosX = " + currentPlayerPosX);
    // console.log("currentPlayerPosY = " + currentPlayerPosY);
    // console.log("startingCurrentPlayerPosX = " + currentPlayerPosX);
    // console.log("startingCurrentPlayerPosY = " + currentPlayerPosY);


    switch (event.key) {
        case "ArrowUp":
            verticalMove = verticalMove - 1;
            break;

        case "ArrowDown":
            verticalMove = verticalMove + 1;
            break;

        case "ArrowLeft":
            horizontalMove = horizontalMove - 1;
            break;

        case "ArrowRight":
            horizontalMove = horizontalMove + 1;
            break;
    }
    // console.log(horizontalMove + ":" + verticalMove);
    let previousPosX = playerPosX;
    let previousPosY = playerPosY;
    let newPosX = (playerPosX + horizontalMove);
    let newPosY = (playerPosY + verticalMove);
    let nextPosX = (newPosX + horizontalMove);
    let nextPosY = (newPosY + verticalMove);
    playerPosX = newPosX;
    playerPosY = newPosY;
    // convert X & Y to Row & Column to compensate for direction of map //
    let currentMapPosY = currentPlayerPosX;
    let currentMapPosX = currentPlayerPosY;
    let newMapY = newPosX;
    let newMapX = newPosY;
    let nextMapY = nextPosX;
    let nextMapX = nextPosY;

    console.log("startPosX: " + currentPlayerPosX + " / startPosY: " + currentPlayerPosY);
    console.log("newPosX: " + newPosX + " / newPosY: " + newPosY);
    console.log("nextPosX: " + nextPosX + " / nextPosY: " + nextPosY);
    console.log(map[currentMapPosX][currentMapPosY]);
    // console.log(map[newMapX][newMapY]);
    // console.log(map[nextMapX][nextMapY]);



    if (map[newMapX][newMapY] === "W") {
        console.log("Wall preventing move.");
        playerPosX = previousPosX;
        playerPosY = previousPosY;
        console.log("reset playerPosX/Y to: " + playerPosX + "/" + playerPosY);
        console.log("*************************");
        return;

    } else if (map[newMapX][newMapY] === "B" && map[nextMapX][nextMapY] === "B") {
        console.log("Two cratess preventing move.");
        playerPosX = previousPosX;
        playerPosY = previousPosY;
        console.log("reset playerPosX/Y to: " + playerPosX + "/" + playerPosY);
        console.log("*************************");
        return;

    } else if (map[newMapX][newMapY] === "X" && map[nextMapX][nextMapY] === "B") {
        console.log("Two cratess preventing move.");
        playerPosX = previousPosX;
        playerPosY = previousPosY;
        console.log("reset playerPosX/Y to: " + playerPosX + "/" + playerPosY);
        console.log("*************************");
        return;

    } else if (map[newMapX][newMapY] === "B" && map[nextMapX][nextMapY] === "W") {
        console.log("Crate & wall preventing move.");
        playerPosX = previousPosX;
        playerPosY = previousPosY;
        console.log("reset playerPosX/Y to: " + playerPosX + "/" + playerPosY);
        console.log("*************************");
        return;

        // *** need to move the box to the next available space & move 'B' to the corresponding space on map // 
    } else if (map[newMapX][newMapY] === "B" && map[nextMapX][nextMapY] === " ") {
        let boxToMoveX = newMapX.toString();
        console.log("boxToMoveX: " + boxToMoveX);
        

        let boxToMoveY = newMapY.toString();
        console.log("boxToMoveY: " + boxToMoveY);
        let boxToMoveId = boxToMoveY + boxToMoveX;
        console.log("boxToMoveId = " + boxToMoveId);
        let test = document.getElementById(boxToMoveId);
        console.log("test= " + test);

        let crateTopPadding = (boxToMoveX * 50) + (verticalMove * 50);
        let crateLeftPadding = (boxToMoveY * 50) + (horizontalMove * 50);
        document.getElementById(boxToMoveId).style.top = (crateTopPadding) + "px";
        document.getElementById(boxToMoveId).style.left = (crateLeftPadding) + "px";
        map[boxToMoveX,boxToMoveY] = " ";
        map[boxToMoveX + verticalMove , boxToMoveY + horizontalMove] = "B";


        
        
        
        playerTopPadding = playerTopPadding + (verticalMove * 50);
        playerLeftPadding = playerLeftPadding + (horizontalMove * 50);
        document.getElementById("player").style.top = (playerTopPadding) + "px";
        document.getElementById("player").style.left = (playerLeftPadding) + "px";
        
        
        


        // *** need to place box onto target, change class, remove 'B' & change 'O' to 'X' on map //
        // }else if (map[newMapX][newMapY] === "B" && map[nextMapX][nextMapY] === "O"){


        // *** need to move box off of target, change class, add 'B' & change 'X' to 'O' on map //
        // }else if (map[newMapX][newMapY] === "B" && map[nextMapX][nextMapY] === "O"){


    } else {
        playerTopPadding = playerTopPadding + (verticalMove * 50);
        playerLeftPadding = playerLeftPadding + (horizontalMove * 50);
        document.getElementById("player").style.top = (playerTopPadding) + "px";
        document.getElementById("player").style.left = (playerLeftPadding) + "px";

    }

    // *** need to declare winner //
}












        // console.log("playerLeftPadding: " + playerLeftPadding + " / playerTopPadding: " + playerTopPadding);
        // console.log("horizontalMove: " + horizontalMove + " / verticalMove:" + verticalMove);
        // console.log("player left: " + playerPosX + " / player down: " + playerPosY);
        // console.log("*******************************");

// playerTopPadding = playerTopPadding + (verticalMove * 50);
// playerLeftPadding = playerLeftPadding + (horizontalMove * 50);
// document.getElementById("player").style.top = (playerTopPadding) + "px";
// document.getElementById("player").style.left = (playerLeftPadding) + "px";

