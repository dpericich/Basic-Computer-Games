# Letters

Letters is a game that models with letters how a binary search work. The user will play against the computer in a game that consists of the computer randomly getting a letter for the user to guess. With each guess by the player, the computer will respond higher or lower until the player guesses the correct letter.

If played optimally, the user should never require more than 5 guesses to find the letter. Playing optimally models the behaviour of a binary search in which the first guest is exactly equal distance from the highest and lower value. This process repeats, closing the window of possible guesses by 1/2 every guess.

To determine the maximum number of quesses required to get the number we can use the following equation **2 ^ x - 1 = options** Here x is the maximum number of moves if the game is played optimally.  
