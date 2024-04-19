# tictactoe

Goal: have as little global code as possible - use factories. 
If you only need a single instance of something, wrap the factory inside an IIFE so it cannot be reused to create additional instances. 
Each piece of functionality should be able to fit in the game, player, or gameboard objects.

check for wins:  
- rows:  
[0][0] == [0][1] == [0][2]  
[1][0] == [1][1] == [1][2]  
[2][0] == [2][1] == [2][2]  
- columns:  
[0][0] == [1][0] == [2][0]  
[0][1] == [1][1] == [2][1]  
[0][2] == [1][2] == [2][2]  
- diagonals:  
[0][0] == [1][1] == [2][2]  
[0][2] == [1][1] == [2][0]  

- tie: if all spots are full and there are no wins

This project was completed as an assignment from The Odin Project.  
Date completed: 04/19/24