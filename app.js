/**
 * Author: Kablai Tokhi
 * Date: 2021-03-14
 * 
 * Repository: Matrix-test
 */

const exit = '0', moveForward = '1', moveBackwards = '2', rotateCW = 3, rotateCounterCW = 4;
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// Main function
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  })
  
  readline.question(`Please state the size of the table separated by a comma: `, (tableSize) => {
    readline.question(`Please state the starting position separated by a comma: `, (startingPositions) => {
        readline.question(`Please state the commands separated by a comma: `, (commandsGiven) => {
            let tableSizeInts = tableSize.split(",");
            //console.log(`Size of the table will be:  x = ${tableSizeInts[0]} & y = ${tableSizeInts[1]}`);
            let startingPosition = startingPositions.split(",");
            //console.log(`Starting position will be:  x = ${startingPosition[0]} & y = ${startingPosition[1]}`);
            let currentX = startingPosition[0];
            let currentY = startingPosition[1];
            let currentDirection = 'north';
            testCases();
            let results = processCommands(commandsGiven.split(","), tableSizeInts[0], tableSizeInts[1], parseInt(currentX), parseInt(currentY), currentDirection);
            console.log(`Position x: ${results[0]}, y: ${results[1]}. Last known direction: ${results[2]}`);
        readline.close()
        })
  })
});
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function changeDirection(currentD, inputValue){
    switch(currentD) {
        case 'north':
          if(inputValue == rotateCW) {
            currentDirection = 'west';
          } else if (inputValue == rotateCounterCW){
            currentDirection = 'east';
          }
          break;
        case 'south':
            if(inputValue == rotateCW) {
                currentDirection = 'east';
              } else if (inputValue == rotateCounterCW){
                currentDirection = 'west';
              }
          break;
        case 'west':
            if(inputValue == rotateCW) {
                currentDirection = 'south';
              } else if (inputValue == rotateCounterCW){
                currentDirection = 'north';
              }
            break;
        case 'east':
            if(inputValue == rotateCW) {
                currentDirection = 'north';
              } else if (inputValue == rotateCounterCW){
                currentDirection = 'south';
              }
            break;
        default:
          console.log("The given inputValue is wrong")
          break;
      }
      //console.log(`new direction is: ${currentDirection}`);
      return currentDirection;

}

function validateDirection(cd){
    let validationFlag = false;
    if(cd == 'north' || cd == 'east' || cd == 'west' || cd == 'south' ){
        validationFlag = true;
    }
    return validationFlag;
}


function processCommands(matrixCommands, maxX, maxY, currentX, currentY, currentDirection){
    //console.log('entered process', matrixCommands)
    let tempPositionsArray = [];
    let outofboundsFlag = false;
    matrixCommands.forEach(element => {
        if(element == exit){
            //console.log("The command for exiting was given.")
            return 0;
        } else if(element == '1' || element == '2') {
            tempPositionsArray = moveOnMatrix(element, currentX, currentY, currentDirection);
            currentX = tempPositionsArray[0];
            currentY = tempPositionsArray[1];
            //console.log(`Your current position is x: ${tempPositionsArray[0]} , y: ${tempPositionsArray[1]}`)
            if(!checkCurrentPosition(maxX, maxY, currentX, currentY)){
                //console.log(`You have moved beyond the borders.`)
                outofboundsFlag = true;
                return 0;
            }

        } else if(element == '3' || element == '4' ) {
            currentDirection = changeDirection(currentDirection, element);
            if(!validateDirection(currentDirection)){
                //console.log(`The value for currentDirection: ${currentDirection} is faulty.`)
                return 0;
            }
        }
    });
    tempPositionsArray[0] = currentX;
    tempPositionsArray[1] = currentY;
    if(outofboundsFlag){
        tempPositionsArray[0] = -1;
        tempPositionsArray[1] = -1;
    }
    tempPositionsArray.push(currentDirection);
    return tempPositionsArray;
}

function checkCurrentPosition(maxX, maxY, currentX, currentY){
    let flag = false;
    if(currentX <= maxX && currentX >= 0){
        if(currentY <= maxY && currentY >= 0){
            flag = true;
        }
    }
    return flag;
}

function moveOnMatrix(element, currentX, currentY, currentDirection){
    let tempMovements = [];
    switch(currentDirection) {
        case 'north':
            if(element == moveForward) {
                currentY = currentY - 1;
            } else if(element == moveBackwards) {
                currentY = currentY + 1;
            }
            break;
        case 'south':
            if(element == moveForward) {
                currentY = currentY + 1;
            } else if(element ==moveBackwards) {
                currentY = currentY - 1;
            }
            break;
        case 'west':
            if(element == moveForward) {
                currentX = currentX + 1;
            } else if(element == moveBackwards) {
                currentX = currentX - 1;
            }
            break;
        case 'east':
            if(element == moveForward) {
                currentX = currentX - 1;
            } else if(element == moveBackwards) {
                currentX = currentX + 1;
            }
            break;
        default:
            //console.log("Direction Wrong, check input variables.");
            break;
    }   
        tempMovements.push(currentX)
        tempMovements.push(currentY)
    return tempMovements;
}

//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Assert
const assert = function(condition, message) {
    if (!condition)
        throw Error('Assert failed: ' + (message || ''));
};
//testcases

function testCases(){
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Testcase1: testcase for the matrix that was given
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let test1 = processCommands(['1','4','1','3','2','3','2','4','1','0'], 4, 4, 2, 2, 'north');
    assert(test1[0] === 0, 'Expected True');
    assert(test1[1] === 1, 'Expected True');
    assert(test1[2] === 'north', 'Expected True');
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    // Testcase2-5: Directiontests
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let test2 = processCommands([], 4, 4, 2, 2, 'north');
    assert(test2[0] === 2, 'Expected True');
    assert(test2[1] === 2, 'Expected True');
    assert(test2[2] === 'north', 'Expected True');

    let test3 = processCommands(['4'], 4, 4, 2, 2, 'north');
    assert(test3[0] === 2, 'Expected True');
    assert(test3[1] === 2, 'Expected True');
    assert(test3[2] === 'east', 'Expected True');

    let test4 = processCommands(['3'], 4, 4, 2, 2, 'north');
    assert(test4[0] === 2, 'Expected True');
    assert(test4[1] === 2, 'Expected True');
    assert(test4[2] === 'west', 'Expected True');

    let test5 = processCommands(['4','4'], 4, 4, 2, 2, 'north');
    assert(test5[0] === 2, 'Expected True');
    assert(test5[1] === 2, 'Expected True');
    assert(test5[2] === 'south', 'Expected True');
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //testcase6-9: Movementtests - Forward
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let test6 = processCommands(['1'], 4, 4, 2, 2, 'north');
    assert(test6[0] === 2, 'Expected True');
    assert(test6[1] === 1, 'Expected True');
    assert(test6[2] === 'north', 'Expected True');

    let test7 = processCommands(['4','1'], 4, 4, 2, 2, 'north');
    assert(test7[0] === 1, 'Expected True');
    assert(test7[1] === 2, 'Expected True');
    assert(test7[2] === 'east', 'Expected True');

    let test8 = processCommands(['3','1'], 4, 4, 2, 2, 'north');
    assert(test8[0] === 3, 'Expected True');
    assert(test8[1] === 2, 'Expected True');
    assert(test8[2] === 'west', 'Expected True');

    let test9 = processCommands(['4','4','1'], 4, 4, 2, 2, 'north');
    assert(test9[0] === 2, 'Expected True');
    assert(test9[1] === 3, 'Expected True');
    assert(test9[2] === 'south', 'Expected True');
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //testcase10-13: Movementtests -Backwards
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let test10 = processCommands(['2'], 4, 4, 2, 2, 'north');
    assert(test10[0] === 2, 'Expected True');
    assert(test10[1] === 3, 'Expected True');
    assert(test10[2] === 'north', 'Expected True');

    let test11 = processCommands(['4','2'], 4, 4, 2, 2, 'north');
    assert(test11[0] === 3, 'Expected True');
    assert(test11[1] === 2, 'Expected True');
    assert(test11[2] === 'east', 'Expected True');

    let test12 = processCommands(['3','2'], 4, 4, 2, 2, 'north');
    assert(test12[0] === 1, 'Expected True');
    assert(test12[1] === 2, 'Expected True');
    assert(test12[2] === 'west', 'Expected True');

    let test13 = processCommands(['4','4','2'], 4, 4, 2, 2, 'north');
    assert(test13[0] === 2, 'Expected True');
    assert(test13[1] === 1, 'Expected True');
    assert(test13[2] === 'south', 'Expected True');
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //Testcase14-17: Out of bounds
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    let test14 = processCommands(['2','2','2','2'], 4, 4, 2, 2, 'north');
    assert(test14[0] === -1, 'Expected True');
    assert(test14[1] === -1, 'Expected True');
    assert(test14[2] === 'north', 'Expected True');

    let test15 = processCommands(['4','2','2','2','2'], 4, 4, 2, 2, 'north');
    assert(test15[0] === -1, 'Expected True');
    assert(test15[1] === -1, 'Expected True');
    assert(test15[2] === 'east', 'Expected True');

    let test16 = processCommands(['3','2','2','2','2'], 4, 4, 2, 2, 'north');
    assert(test16[0] === -1, 'Expected True');
    assert(test16[1] === -1, 'Expected True');
    assert(test16[2] === 'west', 'Expected True');

    let test17 = processCommands(['4','4','2','2','2'], 4, 4, 2, 2, 'north');
    assert(test17[0] === -1, 'Expected True');
    assert(test17[1] === -1, 'Expected True');
    assert(test17[2] === 'south', 'Expected True');
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    //
    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------------
}