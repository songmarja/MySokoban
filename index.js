// Create two objects for positioning the player
let currentPlayerPos = { x: 0, y: 0 };
let nextPlayerPos = { x: 0, y: 0 };

//Create three objects for positioning a block
let currentBlockPos = { x: 0, y: 0 };
let nextBlockPos = { x: 0, y: 0 };
let relativeBlockPos = { x: 0, y: 0 };

function checkIfOriginalTileClassIsGoal(currentPlayerPos)
{
    let originalTileClass = tileMap01.mapGrid[currentPlayerPos.y] [currentPlayerPos.x];
    console.log("Original");
    console.log(originalTileClass);
    if (originalTileClass == "G")
    {
        return true;
    }
    else
    {
        return false;
    }
}

function movePlayer(currentPlayerPos,  nextPlayerPos)
{
    console.log("movePlayer started");
    let originalTileClassIsGforCurrentPos = checkIfOriginalTileClassIsGoal(currentPlayerPos);
    let originalTileClassIsGforNextPos  = checkIfOriginalTileClassIsGoal(nextPlayerPos);
    
    // Update current player position - from image to string
    let currentPlayerPosTag = document.getElementById("x" + currentPlayerPos.x + "y" + currentPlayerPos.y);
    let currentPlayerImgTag = currentPlayerPosTag.childNodes[0];
    currentPlayerPosTag.removeChild(currentPlayerImgTag);
    // console.log(tileClassIsG);

    // Tile class is "G"
    if (originalTileClassIsGforCurrentPos) 
    {
        let goalArea = document.createTextNode("G");
        currentPlayerPosTag.appendChild(goalArea);
        
    } else // Tile class is " "
    {
        let spaceArea = document.createTextNode(" ");
        currentPlayerPosTag.appendChild(spaceArea);
    }

     // Update current player position - class tags
     currentPlayerPosTag.classList.remove("entity-player");
     if (originalTileClassIsGforCurrentPos) // Tile class is "G"
     {
         currentPlayerPosTag.classList.add("tile-goal");
     }
     else // Tile class is " "
     {
         currentPlayerPosTag.classList.add("tile-space");
     }

    /*****************************      Next position updates         ********************/
    // Update next player position - image
    let nextPlayerPosTag = document.getElementById("x" + nextPlayerPos.x + "y" + nextPlayerPos.y);

    // Going down in the tree ...
    let nextPlayerStringTag = nextPlayerPosTag.childNodes[0];
    // Update current player position - class tags

    // let currentPlayerPosTag = document.getElementsByClassName("entity-player");
    // let currentPlayerImgTag = currentPlayerPosTag.childNodes[0];

    nextPlayerPosTag.removeChild(nextPlayerStringTag);
    nextPlayerPosTag.appendChild(currentPlayerImgTag);

     // Update next player position - class tags
     if (originalTileClassIsGforNextPos) // Tile class is "G"
     {
         nextPlayerPosTag.classList.remove("tile-goal");
     }
     else // Tile class is " "
     {
         nextPlayerPosTag.classList.remove("tile-space");
     }
     nextPlayerPosTag.classList.add("entity-player");

    //Update the new current position for player. 
    currentPlayerPos.x = nextPlayerPos.x;
    currentPlayerPos.y = nextPlayerPos.y;
   
    

    

    // //Removing the "empty space" for the nextPlayerPosTag
    // nextPlayerPosTag.removeChild(nextPlayerStringTag);

    

    // //Adding the image to the nextPlayerPos
    // nextPlayerPosTag.appendChild(currentPlayerImgTag);

    //Adding the "empty space" for space-tile to the tag we left

    // HSHS
    // if (currTileClassIsG)
    // {
    //     let goalArea = document.createTextNode("G");
    //     currentPlayerPosTag.appendChild(goalArea);
        
    // } else // Tile class is " "
    // {
    //     let spaceArea = document.createTextNode(" ");
    //     currentPlayerPosTag.appendChild(spaceArea);
    // }
    
   
    // // Update next player position - class tags
    // nextPlayerPosTag.classList.add("entity-player");
    // console.log(nextPlayerPosTag);
    
    // //Update the new current position for player. 
    // currentPlayerPos.x = nextPlayerPos.x;
    // currentPlayerPos.y = nextPlayerPos.y;
}
// Manage the moves on the block
function moveBlock(currentBlockPos,  nextBlockPos)
{
    console.log("moveBlock: started");
    console.log("moveBlock: currentBlockPos = " + currentBlockPos);
    console.log("moveBlock: nextBlockPos = " + nextBlockPos);
    let originalTileClassIsGforCurrentPos = checkIfOriginalTileClassIsGoal(currentBlockPos);
    let originalTileClassIsGforNextPos = checkIfOriginalTileClassIsGoal(nextBlockPos);
    // console.log("moveBlock: originalTileClassIsGforCurrentPos = " + originalTileClassIsGforCurrentPos);
    // console.log("moveBlock: originalTileClassIsGforNextPos = " + originalTileClassIsGforNextPos);

    // ************************* Current Position updates **********************************

    // Update current block position - from image to string
    let currentBlockPosTag = document.getElementById("x" + currentBlockPos.x + "y" + currentBlockPos.y);
    let currentBlockImgTag = currentBlockPosTag.childNodes[0];
    currentBlockPosTag.removeChild(currentBlockImgTag);

    if (originalTileClassIsGforCurrentPos) // Tile class is "G"
    {
        let goalArea = document.createTextNode("G");
        currentBlockPosTag.appendChild(goalArea);
        
    } else // Tile class is " "
    {
        let spaceArea = document.createTextNode(" ");
        currentBlockPosTag.appendChild(spaceArea);
    }

    // Update current block position - class tags
    currentBlockPosTag.classList.remove("entity-block");
    if (originalTileClassIsGforCurrentPos) // Tile class is "G"
    {
        currentBlockPosTag.classList.add("tile-goal");
    }
    else // Tile class is " "
    {
        currentBlockPosTag.classList.add("tile-space");
    }
    
    // ************************* Next Position updates **********************************

    // Update next block position - from string to image
    let nextBlockPosTag = document.getElementById("x" + nextBlockPos.x + "y" + nextBlockPos.y);
    let nextBlockStringTag = nextBlockPosTag.childNodes[0];
    nextBlockPosTag.removeChild(nextBlockStringTag);
    nextBlockPosTag.appendChild(currentBlockImgTag);

    console.log("nextBlockPosTag:");
    console.log(nextBlockPosTag);
    console.log("nextBlockStringTag:");
    console.log(nextBlockStringTag);
    
    // Update next block position - class tags
    if (originalTileClassIsGforNextPos) // Tile class is "G"
    {
        console.log("Removing tile-goal");
        nextBlockPosTag.classList.remove("tile-goal");
    }
    else // Tile class is " "
    {
        nextBlockPosTag.classList.remove("tile-space");
        console.log("Removing tile-space");
    }   
    nextBlockPosTag.classList.add("entity-block");
    
    //Update the new current position for player. 
    currentBlockPos.x = nextBlockPos.x;
    currentBlockPos.y = nextBlockPos.y;
}

// Check if next move is possible


// Check if next move is a wall or not
function movePlayerIfPossible(currentPlayerPos, nextPlayerPos)
{
    function movePlayerIfPossible(currentPlayerPos, nextPlayerPos)
    {}
    console.log("movePlayerIfPossible started");
    let nextPlayerPosTag = document.getElementById("x" + nextPlayerPos.x + "y" + nextPlayerPos.y);
    let tileClassName = nextPlayerPosTag.classList[1];
    let blockWasPossibleToMove = false;

    switch (tileClassName)
    {
        case "tile-wall":
            // Do nothing. Same position for player
            break;
        case "tile-space":
            console.log("movePlayerIfPossible - moving to space");
            movePlayer(currentPlayerPos, nextPlayerPos);
            break;
        case "tile-goal":
            console.log("movePlayerIfPossible - moving to goal");
            movePlayer(currentPlayerPos, nextPlayerPos);
            break;  
        case "entity-player":
            // Do nothing. The player cannot move to player position
            break;
        case "entity-block":
            //Positions for attempted move
            currentBlockPos.x = nextPlayerPos.x;
            currentBlockPos.y = nextPlayerPos.y;
            nextBlockPos.x = currentBlockPos.x + relativeBlockPos.x;
            nextBlockPos.y = currentBlockPos.y + relativeBlockPos.y;
            //Check if possible to move block
            blockWasPossibleToMove = moveBlockIfPossible(currentBlockPos, nextBlockPos);

            if (blockWasPossibleToMove)
            {
                console.log("movePlayerIfPossible - block was possible to move");
                movePlayer(currentPlayerPos, nextPlayerPos);
            }
            else
            {
                //Not possible. Do nothing
                console.log("movePlayerIfPossible - block was NOT possible to move");
            }
            break;      
        default:
            console.log("movePlayerIfPossible - something is wrong!");
            break;
    }
}

function moveBlockIfPossible(currentBlockPos, nextBlockPos)
{
    // console.log("moveBlockIfPossible started")
    // console.log(currentBlockPos);
    // console.log(nextBlockPos);
    let nextBlockPosTag = document.getElementById("x" + nextBlockPos.x + "y" + nextBlockPos.y);
    let tileClassName = nextBlockPosTag.classList[1];
    let blockWasPossibleToMove = false;
   
    switch (tileClassName)
    {
        case "tile-wall":
            // console.log("moveBlockIfPossible - moving to wall (not possible)");
            // Do nothing. The block cannot be moved through a wall
            blockWasPossibleToMove = false
            break;
        case "tile-space":
            console.log("moveBlockIfPossible - moving to space");
            moveBlock(currentBlockPos, nextBlockPos);
            blockWasPossibleToMove = true;
            break;
        case "tile-goal":
            console.log("moveBlockIfPossible - moving to goal");
            moveBlock(currentBlockPos, nextBlockPos);
            blockWasPossibleToMove = true;
            break;  
        case "entity-player":
            console.log("moveBlockIfPossible - moving to player (not possible)");
            // Do nothing. The block cannot move to the player's position
            blockWasPossibleToMove = false
            break;
        case "entity-block":
            console.log("moveBlockIfPossible - moving to block (not possible)");
            // Do nothing. The block cannot push another block
            blockWasPossibleToMove = false
            break;    
        default:
            break;
    }
    return blockWasPossibleToMove;
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
            relativeBlockPos.x = 0;
            relativeBlockPos.y = -1;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        
        case "ArrowRight":
            console.log("right arrow pressed"); 
            nextPlayerPos.x = currentPlayerPos.x + 1;
            nextPlayerPos.y = currentPlayerPos.y;
            relativeBlockPos.x = 1;
            relativeBlockPos.y = 0;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        
        case "ArrowDown":
            console.log("down arrow pressed"); 
            nextPlayerPos.x = currentPlayerPos.x;
            nextPlayerPos.y = currentPlayerPos.y + 1;
            relativeBlockPos.x = 0;
            relativeBlockPos.y = 1;
            movePlayerIfPossible(currentPlayerPos, nextPlayerPos);
            break;
        case "ArrowLeft":
            console.log("left arrow pressed"); 
            nextPlayerPos.x = currentPlayerPos.x - 1;
            nextPlayerPos.y = currentPlayerPos.y;
            relativeBlockPos.x = -1;
            relativeBlockPos.y = 0;
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


