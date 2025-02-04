# 2025-group-23
2025 COMSM0166 group 23

# Week 1: Game Selection Phase 1

During this week, our game selection process began. Our goal is to create a game that calls back to classic games in the past but brings another level of fun, freshness and challenges. Therefore, it was important for each member in the group to bring together 2 already existing games each, with their added twist to them. In our meeting, it was our responsibility to discuss potential development challenges we, as developers, could face during production. A summary of some of our game ideas are listed below with their brief description. 

| Game          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
|---------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Tetris        | Tetris begins with an empty screen, and requires the player to fit falling blocks together. <br> **- Twist:** there will be two players competing against each other, player 1 will have the ability to change the shape of the blocks falling in player 2's screen, vice versa. <br> **- Development Challenges:** server creation; check matching and deletion of blocks.                                                                                                                                                                                                                            |
| Bounce        | The original bounce game is a platform game revolving around the player controlling a red ball and navigating through levels and obstacles.. <br> **- Twist:** Imagine a new bounce game where the maps includes different terrain such as water, wind, and ice. <br> **- Development Challenge:** hard coding multiple maps of the game with different game objects and their properties.                                                                                                                                                                                                             |
| Flappy Bird   | The premise of Flappy Bird's endless runner game is simple: tap the screen to navigate a bird character object through the gaps between pipes without hitting them. <br> **- Twist:** the addition of different weather and terrain can add combinations of wind, rain, obstacles and power ups, affecting the birds movement. <br> **- Development Challenges:** developing different movement mechanics according to different weather types.                                                                                                                                                        |
| Snake Game    | In the game of Snake, the player usually use the arrow keys to move a "snake" around the board. As the snake finds food, it eats the food, and thereby grows larger. The game ends when the snake either moves off the screen or moves into itself. <br> **- Twist:** Imagine a board where every 30 seconds, sections of the floor fall and the snake has to traverse the map without falling. <br> **- Development Challenges:** random map generator for map generation; adding new parts of the snake at the tail.                                                                                 |
| Doodle Jump   | In the classic Doodle Jump game, player must guide a creature up an endless series of platforms without falling out of the screen. <br> **- Twist:** Imagine a doodle jump game where there is a color instruction that you must follow for the platform you must land next. <br> **- Development Challenge:** generating new platforms at random location at specific distance from each other at the top of the screen, at the same time being in-synced with the color instruction.                                                                                                                 |
| Cat vs Dog    | This game is an entertaining game in which these two characters, a cat and a dog, they will face each other in a battle throwing things at each other. <br> **- Twist:** characters randomly shrink every set amount of time, making it harder to target accurately. <br> **- Development Challenge:** programming the character being paused when it is hit; character shrinking mechanics.                                                                                                                                                                                                           |
| Temple Run    | In Temple Run, the player steers the explorer across a maze, avoiding obstacles while also collecting coins, the longer the explorer survives the higher the score. <br> **- Twist:** during gameplay the direction of the run go reverse mode. <br> **- Development Challenges:** 3D modelling of the map; storing data for game objects to allow reverse mode.                                                                                                                                                                                                                                       |
| Breakeout     | The classic Breakout Video Game uses a single ball where the player must knock own as many bricks as possible by using the walls and/or the paddle below to hit the ball against the bricks and eliminate them. <br> **- Twist:** add treasures within the blocks that once knock down, they can be used for power ups. <br> **- Development Challenge:** ball mechanics and collision handling for multiple balls.                                                                                                                                                                                    |
| Crossy Road   | Crossy Road has been one of the more recent fan favourite arcade hopper. The chicken collect custom characters to be used and navigate freeways, railroads, rivers while avoiding cars. <br> **- Twist:** Imagine, a crossy road game where you not only cross the road from one to the next but also move along into the direction of where the car is moving towards, pushing you to new environments. <br> **- Development Challenges:** frontend constraints for designing objects; programming a large amount of game object mechanics, generating adaptive environments for different obstacles. |
| Tower Defence | The goal of tower defence is to defend a player's territories or possessions by obstructing the enemy attackers or by stopping enemies from reaching the exit by placing defensive structures along their path of attack. <br> **- Twist:** Imagine each tower has no weapons of its own, but it granted unique abilities by adding gems to the tower, allowing to give it a different power depending upon which combination you use. <br> **- Development Challenge:** generating wave function for enemies and how they interact with different tower abilities.                                    | 


# Week 2: Paint Prototype

## Your Game

Link to your game [PLAY HERE](https://peteinfo.github.io/COMSM0166-project-template/)

Your game lives in the [/docs](/docs) folder, and is published using Github pages to the link above.

Include a demo video of your game here (you don't have to wait until the end, you can insert a work in progress video)

## Two Prototype Ideas
* Take Aim:
Take Aim is a dynamic 1-2 player action game that emphasizes precise movement and strategic combat. Players compete to be the first to reduce their opponent’s Health to 0%, requiring quick reflexes and tactical decision-making. The game features character and map selection, allowing for varied playstyles and environments. At the start of each match, weapons drop from above within the first three seconds, setting the stage for intense battles. Players navigate the map using fluid movement—running, jumping (Up), and shooting (Space)—while avoiding hazards like moving walls. More mechanics and features were under discussion.

# Table of Contents
* [1. Development Team](#1-development-team)
* [2. Introduction](#2-introduction)
* [3. Requirements](#3-requirements)
* [4. Design](#4-design)
* [5. Implementation](#5-implementation)
* [6. Evaluation](#6-evaluation)
* [7. Process](#7-process)
* [8. Conclusion](#8-conclusion)
* [9. References](#9-references)

# 1. Development Team!


**Figure 1** <br>
*Team 
Photo Week 1 and Team Roles* <br>

![group-photo](https://github.com/user-attachments/assets/79a87075-6bd9-479d-9a72-46a2aba1fafd)<br>
<br>

**Table 1** <br>
*Team member roles, from Left to Right in Figure 1* 


| MEMBER | NAME | EMAIL | ROLE | 
|--------|----------------|------------------------|------| 
|    1   | Ching-Yueh Lin     | xs24198@bristol.ac.uk | Frontend Developer |
|    2   | Yu-Hsin Chang      | mh24718@bristol.ac.uk | Frontend Developer |
|    3   | Gioven Posa        | kw24347@bristol.ac.uk | Backend Developer |
|    4   | Tzu-Wei Lee        | jj24506@bristol.ac.uk | Backend Developer |
|    5   | Kotzamanidis Nikos | yy24148@bristol.ac.uk | Dev Ops Lead |
|    6   | Shabarish Menon    | xh24681@bristol.ac.uk | Scrum Master |


## Project Report

# 2. Introduction

- 5% ~250 words 
- Describe your game, what is based on, what makes it novel? 

# 3. Requirements 

- 15% ~750 words
- Use case diagrams, user stories. Early stages design. Ideation process. How did you decide as a team what to develop? 

# 4. Design

- 15% ~750 words 
- System architecture. Class diagrams, behavioural diagrams. 

# 5. Implementation

- 15% ~750 words

- Describe implementation of your game, in particular highlighting the three areas of challenge in developing your game. 

# 6. Evaluation

- 15% ~750 words

- One qualitative evaluation (your choice) 

- One quantitative evaluation (of your choice) 

- Description of how code was tested. 

# 7. Process 

- 15% ~750 words

- Teamwork. How did you work together, what tools did you use. Did you have team roles? Reflection on how you worked together. 

# 8. Conclusion

- 10% ~500 words

- Reflect on project as a whole. Lessons learned. Reflect on challenges. Future work.

# 9. References  

### Contribution Statement

- Provide a table of everyone's contribution, which may be used to weight individual grades. We expect that the contribution will be split evenly across team-members in most cases. Let us know as soon as possible if there are any issues with teamwork as soon as they are apparent. 

### Additional Marks

You can delete this section in your own repo, it's just here for information. in addition to the marks above, we will be marking you on the following two points:

- **Quality** of report writing, presentation, use of figures and visual material (5%) 
  - Please write in a clear concise manner suitable for an interested layperson. Write as if this repo was publicly available.

- **Documentation** of code (5%)

  - Is your repo clearly organised? 
  - Is code well commented throughout?
