Just a weekend project to warm up in webdev


How the AI part works?

My hands are off the keyboard... so who’s playing? 🤖🎮

Recently posted that I just recreated Tetris, being an AI & DS student I wondered what addon I can do. Ended up "Why not make computer play Tetris itself?"

score = 0.6*variance (ie, variance in height) - 300*linesCleared + 120*holes + 140*maxheight

just minimize score

Watching this single line of code mimic intelligence is crazy.

Spending hours to choosing these set of features and their corresponding weights, manually tweaking everything taught me how better heuristics can significantly improve its intelligence.

When a block spawns, it bruteforces all the rotations and moves and sends all the resulting world configurations to a flask backend where the optimal configuration is chosen using the equation shown above. Then the controls to achieve this configuration are applied.

It is not perfect though. It scores around 90 ~ 120 pts To put that in a perspective, if the blocks fall random we will get around 20 ~ 30 pts,So it nearly performs just 4x better than random falling blocks.