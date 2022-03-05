Huyen Tran
12/14/21
COMP320
Baymax in Winter Wonderland

Purpose:
Learning how to model something I find interesting (Baymax + Winter) using the concepts we learn in class like camera, texture mapping, geometrical functions, and colors. Additionally, finding a way to get keyboard inputs to interact with the objects in the scene (like moving Baymax). 

User Interaction:
This program intakes the arrow keys (left, right, up, down) to move the Baymax model. The keys functions are as followed: 
"left" : rotate left
"right": rotate right
"up": moves forward
"down": moves backward 

Techniques used:
1. Using Three.js built-in geometrical functions to create Christmas trees, snowman, Baymax, bench, and the ice skating rink. 
2. Using curved lines to add details Baymax (the smile) and also a little heart on top of his Christmas hat. I think it's just a cute little detail to make the model a bit more interesting to look at.
3. Using colors to make everything colorful and festive. Transparency is used for the ice rink to make it look icy.
4. Using transformation to scale trees (varying sizes) and scaling snowman, and moving them around the scene. Rotation is used for Baymax when user click either the left or right arrow key on the keyboard. 
5. Using cameras and light to set up the scene and make everything looks bright and presentable.
6. Using textures to map the walls and the ground of the scene with a winter theme image.
7. Using animation by having a user keyboard input (and moving Baymax around the scene).

Difficulties:
The biggest challenge would be finding a way to use methods/libraries that matches the version of three js that I have for this project. I think I used an older version so I was extremely frustrated that certain things were named differently in this version than the current one so I had to dig on the web to find what to use instead (like BoxGeometry is actually CubeGeometry). Also, I think this older version of three js doesn't have the support for some Bezier exercises we did like the tube one, which was really sad because I wanted to use that to make candy canes. 

Bugs:
No known bugs.

Resources:
I used Stemkoski's THREEx.KeyboardState to get the user keyboard input and also a chunk of his code on to rotate/translate model based on which key is clicked.

Class Projects page:
You can definitely post this on the class projects page. You don't have to post it anonymously. 


