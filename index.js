// Create two objects for positioning the player
let currentPlayerPos = { x: 0, y: 0 };
let nextPlayerPos = { x: 0, y: 0 };


function checkOriginalTileClass(currentPlayerPos)
{
    let originalTileClass = tileMap01.mapGrid[currentPlayerPos.y] [currentPlayerPos.x];
    console.log("Original");
    console.log(originalTileClass);
}

function movePlayer(currentPlayerPos,  nextPlayerPos)
{
    console.log("movePlayer started");
    checkOriginalTileClass(currentPlayerPos);

    // Update current player position - image
    let currentPlayerPosTag = document.getElementsByClassName("entity-player")[0];
    
    let currentPlayerImgTag = currentPlayerPosTag.childNodes[0];

    currentPlayerPosTag.removeChild(currentPlayerImgTag);

    // Update current player position - class tags
    currentPlayerPosTag.classList.remove("entity-player");
    currentPlayerPosTag.classList.add("tile-space");
    

    // Update next player position - image
    let nextPlayerPosTag = document.getElementById("x" + nextPlayerPos.x + "y" + nextPlayerPos.y);

    // Going down in the tree ...
    let nextPlayerStringTag = nextPlayerPosTag.childNodes[0];

    //Removing the "empty space" for the nextPlayerPosTag
    nextPlayerPosTag.removeChild(nextPlayerStringTag);

    //Remove the class name for the nextPlayerPos Tag
    nextPlayerPosTag.classList.remove("tile-space");

    //Adding the image to the nextPlayerPos
    nextPlayerPosTag.appendChild(currentPlayerImgTag);

    //Adding the "empty space" for space-tile to the tag we left
    let spaceArea = document.createTextNode(" ");
    currentPlayerPosTag.appendChild(spaceArea);
   
    // Update next player position - class tags
    nextPlayerPosTag.classList.add("entity-player");
    console.log(nextPlayerPosTag);
    
    //Update the new current position for player. 
    currentPlayerPos.x = nextPlayerPos.x;
    currentPlayerPos.y = nextPlayerPos.y;
}


function movePlayerIfGoal(currentPlayerPos, nextPlayerPos)
{
    console.log("movePlayerIfGoal started");
    let originTileClass = checkOriginalTileClass(currentPlayerPos); 
    // Update current player position - image
    let currentPlayerPosTag = document.getElementsByClassName("entity-player")[0];
    
    let currentPlayerImgTag = currentPlayerPosTag.childNodes[0];

    currentPlayerPosTag.removeChild(currentPlayerImgTag);

    // Update current player position - class tags
    currentPlayerPosTag.classList.remove("entity-player");
    currentPlayerPosTag.classList.add("tile-space");
    

    // Update next player position - image
    let nextPlayerPosTag = document.getElementById("x" + nextPlayerPos.x + "y" + nextPlayerPos.y);

    // Going down in the tree to the next node
    let nextPlayerStringTag = nextPlayerPosTag.childNodes[0];

    //Removing the "empty space" for the nextPlayerPosTag
    nextPlayerPosTag.removeChild(nextPlayerStringTag);

    //Remove the class name for the nextPlayerPos Tag
    nextPlayerPosTag.classList.remove("tile-goal");

    //Adding the image to the nextPlayerPos
    nextPlayerPosTag.appendChild(currentPlayerImgTag);

    //Adding the "empty space" for space-tile to the tag we left
    currentPlayerPosTag.appendChild(nextPlayerStringTag);
    
    // Update next player position - class tags
    nextPlayerPosTag.classList.add("entity-player");
    console.log(nextPlayerPosTag);
    
    //Update the new current position for player. 
    currentPlayerPos.x = nextPlayerPos.x;
    currentPlayerPos.y = nextPlayerPos.y;
}

// Check if next move is a wall or not
function movePlayerIfPossible(currentPlayerPos, nextPlayerPos)
{
    let nextPlayerPosTag = document.getElementById("x" + nextPlayerPos.x + "y" + nextPlayerPos.y);
    let tileClassName = nextPlayerPosTag.classList[1];
   
    switch (tileClassName)
    {
        case "tile-wall":
            // Do nothing. Same position for player
            break;
        case "tile-space":
            movePlayer(currentPlayerPos, nextPlayerPos);
            break;
        case "tile-goal":
            movePlayerIfGoal(currentPlayerPos, nextPlayerPos);
            break;    
        default:
            break;
    }
}



var myDiv = "";
var tileMap = document.getElementById("tileMap");

function addAllTileElements()
{
    for (var i = 0; i < tileMap01.mapGrid.length; i++)
    {
        for (var j = 0; j < tileMap01.mapGrid[i].length; j++)
        {

            if (tileMap01.mapGrid[i][j] == "B")
            {
                var block = document.createElement("div");
                block.classList.add("tile-element","entity-block");
                block.id = "x" + j + "y" + i;
                tileMap.appendChild(block);
                let boxImg = document.createElement("img");
                boxImg.setAttribute("src", "css/brownBox.jpg");
                boxImg.className = "box-img";
                block.appendChild(boxImg);

            }
            if (tileMap01.mapGrid[i][j] == " ")
            {
                //Creating Space elements
                var space = document.createElement("div");
                space.classList.add("tile-element", "tile-space");
                space.id = "x" + j + "y" + i;
                tileMap.appendChild(space);
                var spaceArea = document.createTextNode(tileMap01.mapGrid[i][j]);
                space.appendChild(spaceArea);
            }
            if (tileMap01.mapGrid[i][j] == "W")
            {
                //Creating Wall elements
                var wall = document.createElement("div");
                wall.classList.add("tile-element", "tile-wall");
                wall.id = "x" + j + "y" + i;
                tileMap.appendChild(wall);
                var texture = document.createElement("img");
                texture.setAttribute("src", "css/bribrickwall.jpg");
                texture.className = "wall-img";
                wall.appendChild(texture);
            }
            if (tileMap01.mapGrid[i][j] == "G")
            {
                //Creating Goal elements
                var goal = document.createElement("div");
                goal.classList.add("tile-element", "tile-goal");
                goal.id = "x" + j + "y" + i;
                tileMap.appendChild(goal);
                var goalArea = document.createTextNode(tileMap01.mapGrid[i][j]);
                console.log(goal.id);
                goal.appendChild(goalArea);
            }

            if (tileMap01.mapGrid[i][j] == "P")
            {
                //Creating Player element
                let player = document.createElement("div");
                player.classList.add("tile-element", "entity-player");
                player.id = "x" + j + "y" + i;
                tileMap.appendChild(player);
                var characterTexture = document.createElement("img");
                characterTexture.setAttribute("src", "css/pippi.jpg");
                characterTexture.className = "player-img";
                let character = document.createTextNode(tileMap01.mapGrid[i][j]);
                player.appendChild(characterTexture);
            }
        }
    }
}

function arrowKeys(e)
{
    e.preventDefault;
    console.log(e);
    switch (e.key)
    {
        case "ArrowUp":
            console.log("up arrow pressed");
            nextPlayerPos.x = currentPlayerPos.x;
            nextPlayerPos.y = currentPlayerPos.y - 1;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        
        case "ArrowRight":
            console.log("right arrow pressed"); 
            nextPlayerPos.x = currentPlayerPos.x + 1;
            nextPlayerPos.y = currentPlayerPos.y;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        
        case "ArrowDown":
            console.log("down arrow pressed"); 
            nextPlayerPos.x = currentPlayerPos.x;
            nextPlayerPos.y = currentPlayerPos.y + 1;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        case "ArrowLeft":
            console.log("left arrow pressed"); 
            nextPlayerPos.x = currentPlayerPos.x - 1;
            nextPlayerPos.y = currentPlayerPos.y;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        default:
            alert("Only arrow keys are allowed!");
            
    }
}
function getPlayerCoordinates()
{
    for (var i = 0; i < tileMap01.mapGrid.length; i++) 
    {
        for (var j = 0; j < tileMap01.mapGrid[i].length; j++)
        {
            if (tileMap01.mapGrid[i][j] == "P")
            {
                currentPlayerPos.x = j;
                currentPlayerPos.y = i;
                console.log(currentPlayerPos.x, currentPlayerPos.y);
            }
        }
    }
}


//Here starts the program by adding the tileMap from array (in SokobanBase.js)
addAllTileElements();
getPlayerCoordinates();

//Create EventListener for user action
document.addEventListener('keydown', arrowKeys);


