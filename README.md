# matrix-test

What is this repo for?
-----------

The purpose of this test is to cover general practices, design and structure as well as
algorithmic solutions for a smaller project.  

The task is to accept a set of commands and then simulate whether an object can move
according to these commands without falling off the table it stands on


How do you test the repo?
-----------

Assumptions: You have the latest node downloaded and installed on your pc/laptop.  

1. Download the repository onto your local machine.  
2. Open a CMD window with admin rights.  
3. Enter the rootfolder of the downloaded repository.  
4. Write the command 'node app' without any citationmarks.  
5. The commandline will then prompt the user for 3 inputs.  
6. Enter x and y for the size of the table as two integers [width, height].  
7. Enter the objects starting position as two integers [x, y].  
8. Enter an arbitrarily long stream of commands of integers(ranging between 1 through 4).  


What are the functions in the app.js?
-----------

Main function at the top for initiating all the functions below.

changeDirection
    Changes the direction on the board depending on the next input

validateDirection
    Validates that the direction is one of the four available

processCommands
    Goes through commands given and validates for every given command.

checkCurrentPosition
    Keeps track of outofbounds.

moveOnMatrix
    Moves the object on the board backwards and forwards depending on the input.

assert
    small function for testing expected results against testing results. Throws errors.

testCases
    Tests all different functions and some of their edgecases.