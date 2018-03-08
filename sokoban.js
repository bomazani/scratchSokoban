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
let i;
let j;
var moveDirection = (((i) + horizontalMove), ((j) + verticalMove));


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
                // case " " || "S":
                //     cellClass = "empty";
                //     break;
                case "X":
                    cellClass = "fullTarget";
                    break;

                // case "S":
                //     cellClass = "empty";
                //     player = document.createElement("div");
                //     player.setAttribute("class","player") ;
                //     mapColumn.appendChild(player); 
                //     break;
            }
            mapColumn.setAttribute("class", cellClass);
            mapRow.appendChild(mapColumn);
        }

        grid.appendChild(mapRow);
    }
}

function movePlayer(event) {
    direction = "event.key";
    return direction;
    horizontalMove = 0;
    verticalMove = 0;

    switch (event.key) {
        case "arrowUp":
            verticalMove = verticalMove - 1;
            break;

        case "arrowDown":
            verticalMove = verticalMove + 1;
            break;

        case "arrowLeft":
            horizontalMove = horizontalMove - 1;
            break;

        case "arrowRight":
            horizontalMove = horizontalMove + 1;
            break;
    }
}
