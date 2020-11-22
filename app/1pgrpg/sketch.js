let cardFrame;
let pDiceImg;
let mDiceImg;
let hDiceImg;
let card;
let ACTION_COUNT = 24;
let ACTION_IDX = 0;
let actionNames = [
 "ATTACK(M)",
 "ATTACK(R)",
 "BLOCK",
 "BULL RUSH",
 "DISTRACT",
 "DODGE",
 "EXERT",
 "FEINT",
 "FOCUS",
 "GET UP",
 "GRAPPLE",
 "IDENTIFY WEAKNESS",
 "JUMP/CLIMB",
 "MOVE",
 "OUTWIT",
 "PARRY",
 "PLAN",
 "RECOVER",
 "SNEAK",
 "SPOT",
 "TARGET",
 "TAUNT",
 "TEAM UP",
 "VIGILANCE"
];
let actionImgPaths = [
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/ATTACK(M).png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/ATTACK(R).png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/BLOCK.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/BULL_RUSH.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/DISTRACT.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/DODGE.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/EXERT.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/FEINT.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/FOCUS.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/GET_UP.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/GRAPPLE.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/IDENTIFY_WEAKNESS.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/JUMP_CLIMB.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/MOVE.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/OUTWIT.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/PARRY.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/PLAN.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/RECOVER.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/SNEAK.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/SPOT.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/TARGET.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/TAUNT.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/TEAM_UP.png",
  "https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionThumbnails/VIGILANCE.png"
];
actionPCosts = [
  1,1,1,2,0,1,1,1,0,1,
  1,0,1,1,0,1,0,2,0,0,
  0,0,0,0
];
actionMCosts = [
  0,0,0,0,1,0,0,0,1,0,
  0,1,0,0,1,0,1,0,0,1,
  1,1,1,1
];

actionHCosts = [
  0,0,0,0,0,0,0,0,0,0,
  0,0,0,0,0,0,0,0,1,0,
  0,0,0,0
];


let actionImages = [];
let actionTypes = [
  "ACTION/REACTION","ACTION","REACTION","ACTION","ACTION",
  "REACTION","ACTION","REACTION","ACTION","ACTION",
  "ACTION/REACTION","ACTION","ACTION","ACTION","REACTION",
  "REACTION","REACTION","ACTION","ACTION","ACTION/REACTION",
  "ACTION","ACTION","ACTION/REACTION","REACTION"
];
let actionInstructions = [
  "ACTION NAME:        ATTACK (MELEE)\nCOST:               1 (PHYS)\nTYPE:               ACTION/REACTION\nREACTION REQ:       GET UP\nREACTION REQ(T):    BLOCK, PARRY, DODGE, PLAN\n\nDESCRIPTION:\nAttack a target within melee range.\n\nSTEPS (ACTION):\n1. Declare an ATTTACK (MELEE) ACTION.\n2. Resolve Target's REACTION if any.\n3. Roll Attack (DC = 3 + DEF(T) - ATK)\n4. Success -> Roll Location and calculate damage.\n5. Target may attempt an ARMOR SAVE.\nSTEPS (REACTION): [GET UP]\n1.  Perform an ATTACK (MELEE) ACTION.\n\nCAVEATS:\nA. Valid target must be within melee range to perform REACTION.",
  "ACTION NAME:        ATTACK (R)\nCOST:               1 (PHYS)\nTYPE:               ACTION\nREACTION REQ(T):    BLOCK, DODGE, PLAN\n\nDESCRIPTION:\nAttack a target with a ranged weapon.\n\nSTEPS (ACTION):\n1. Declare an ATTACK (RANGED) ACTION.\n2. Resolve Target's REACTION if any.\n3. Roll Attack (DC = 3 + DEF(T) - ATK)\n4. Success -> Roll Location and calculate damage.\n5. Target may attempt an ARMOR SAVE.\n\nCAVEATS:\nA. This ACTION requires valid ammunition.\nB. If target is within 10ft of maximum range, DC is increased by 1.",
  "ACTION NAME:        BLOCK\nCOST:               1 (PHYS)\nTYPE:               REACTION\nREACTION REQ:       ATTACK (M), ATTACK (R)\nREACTION REQ(T):    PLAN, FEINT\n\nDESCRIPTION:\nBlock an incoming attack or projectile with held item.\n\nSTEPS (REACTION): [ATTACK (M), ATTACK (R)]\n1. Declare a BLOCK ACTION.\n2. Resolve Target's REACTION if any.\n3. You gain a +1 bonus on your next ARMOR SAVE.\n4. On a successful ARMOR SAVE, you may reduce the damage taken by the DR of the held item that performs the block.\n\nCAVEATS:\nA. If an enemy rolls a 6 on their attack roll, the held item that performs the block loses 1 durability.",
  "ACTION NAME:        BULL RUSH\nCOST:               2 (PHYS)\nTYPE:               ACTION\nREACTION REQ(T):    DODGE, GRAPPLE, PLAN\n\nDESCRIPTION:\nCharge into an enemy in an attempt to knock them down.\n\nSTEPS (ACTION):\n1. Move up to your speed toward an enemy.\n2. Resolve Target's REACTION if any.\n3. Roll BULL RUSH (DC = 3 + STR(T)/VIT(T) - STR/VIT)\n4. Target may make a REFLEX SAVE (DC = 3 + (AGL-3)), or a FORT SAVE (DC = 3 +(STR/VIT -3))\n5. SUCCESS-> You gain one physical die (commit to ACTION or reserve), and enemy is knocked prone if save is failed.",
  "ACTION NAME:        DISTRACT\nCOST:               1 (MNTL)\nTYPE:               ACTION\nREACTION REQ(T):    VIGILANCE, PLAN\n\nDESCRIPTION:\nQuick! Create a diversion. \n\nSTEPS (ACTION):\n1. Declare a DISTRACT ACTION. \n2. Resolve Target's REACTION if any.\n3. Roll DISTRACT (DC = 3 + WIS(T)/COM(T) - COM.\n4. SUCCESS-> Target gains the DISTRACTED condition (-1 MENTAL die/round).\n4. Target may make a CUNNING SAVE (DC = 3 + (COM-3)) at the end of each round to lose the DISTRACTED condition.",
  "ACTION NAME:        DODGE\nCOST:               1 (PHYS)\nTYPE:               REACTION\nREACTION REQ:       ATTACK (M), ATTACK (R), GRAPPLE, BULL RUSH\n\nDESCRIPTION:\nDodge an incoming threat.\n\nSTEPS (REACTION): [ATTACK (M), ATTACK (R), GRAPPLE, BULL RUSH]\n1. Roll DODGE (DC = 3 + ATK(T) - AGL)\n2. SUCCESS->DC of target's next physical ACTION is increased by 2.\n\nCAVEATS:\nA. If target rolls a 6 when performing their next physical ACTION against you, roll a D6. A Result of 1 or 2 causes you to fall prone.",
  "ACTION NAME:        EXERT\nCOST:               1 (PHYS)\nTYPE:               ACTION       \n\nDESCRIPTION:\nIt's do or die time, and you need to push yourself physically.\n\nSTEPS (ACTION):\n1. Inform the GM that you are performing an EXERT ACTION BEFORE all other ACTIONs are revealed.\n2. Roll EXERT (DC = 3 - STR/VIT).\n3. SUCCESS->You have two physical dice to assign. NOW HOP TO IT!\n4. FAILURE->You lose one physical die. If you don't have them, you become fatigued (-1 PHYSICAL die per round).\n\nCAVEATS:\nA. This ACTION can only be performed once every round, and dice generated in this way cannot be reserved.\nB. You cannot perform this ACTION if already fatigued.",
  "ACTION NAME:        FEINT\nCOST:               1 (PHYS)\nTYPE:               REACTION\nREACTION REQ:       BLOCK, PARRY\n\nDESCRIPTION:\nYou perform a false attack in order to fool your oponnent.\n\nSTEPS (REACTION): [BLOCK,PARRY]\n1. Negate Target's BLOCK or PARRY ACTION.",
  "ACTION NAME:        FOCUS\nCOST:               1 (MNTL)\nTYPE:               ACTION\n\nDESCRIPTION:\nYou try and concentrate, you need all your brain cells firing right now!\n\nSTEPS (ACTION):\n1. Inform the GM that you are performing a FOCUS ACTION BEFORE all other ACTIONs are revealed.\n2. Roll FOCUS (DC = 3 - INT/WIS).\n3. SUCCESS->You have two MENTAL dice to assign. NOW HOP TO IT!\n4. FAILURE->You lose one MENTAL die. If you don't have one to lose, you become Distracted (-1 mental die per round).\n\nCAVEATS:\nA. This ACTION can only be performed once every round, and dice generated in this way cannot be reserved.\nB. You cannot perform this ACTION if you are already Distracted.",
  "ACTION NAME:        GET UP\nCOST:               1 (PHYS)\nTYPE:               ACTION\nREACTION REQ(T):    GRAPPLE, ATTACK (M)\n\nDESCRIPTION:\nGet up from Prone.\n\nSTEPS (ACTION):\n1. Remove the prone condition. ",
  "ACTION NAME:        GRAPPLE\nCOST:               1 (PHYS)\nTYPE:               ACTION/REACTION\nREACTION REQ:       GET UP, GRAPPLE\nREACTION REQ(T):    GRAPPLE, DODGE, PLAN\n\nDESCRIPTION:        \nForcefully wrestle a target to the ground. \n\nSTEPS (ACTION):\n1. Declare a GRAPPLE ACTION.\n2. Resolve Target's REACTION if any.\n3. Roll GRAPPLE (DC = 3 + STR(T)/AGL(T) - STR/AGL)\n4. Target may make a REFLEX SAVE (DC = 3 + (AGL-3)), or a FORT SAVE (DC = 3 +(STR/VIT -3))\n5. If the REFLEX SAVE is successful, target does not fall prone. if the FORT SAVE is successful target does not take damage. Otherwise apply both to target.\n\nSTEPS (REACTION): [GET UP]\n1. Perform a GRAPPLE ACTION on adjacent target.\n\nSTEPS (REACTION): [GRAPPLE]\n1. Both grapplers roll off and add their best bonus to the roll. The loser is knocked prone and takes STR-3 Damage.\n2. If result is a tie, the GM and the player arm wrestle to determine the winner.",
  "ACTION NAME:        IDENTIFY WEAKNESS\nCOST:               1 (MNTL)\nTYPE:               ACTION\nREACTION REQ(T):    VIGILANCE\n\nDESCRIPTION:\nSize up the oponent, and strategize.\n\nSTEPS (ACTION):\n1. Declare IDENTIFY WEAKNESS ACTION.\n2. Resolve Target's REACTION if any.\n3. Roll IDENTIFY WEAKNESS (DC = 12 - (INT+WIS+AWR))\n4. SUCCESS-> DC of your ACTIONs taken against target are reduced by 1 for 1 round.\n\nCAVEATS:\nA. You may pay an upkeep of 1 mental die per round to extend DC reduction.",
  "ACTION NAME:        JUMP/CLIMB\nCOST:               1 (PHYS)\nTYPE:               ACTION\n\nDESCRIPTION:\nJump or climb an obstacle.\nSTEPS (ACTION):\n1. You may move up to half your speed during this ACTION. (AGL*5)\n2. Perform JUMP/CLIMB (DC = 3 + OBSTACLE DIFFICULTY(GM) - STR/AGL).\n3. SUCCESS-> You clear the obstacle, or climb to desired location.\n4. FAILURE-> Take Fall Damage (REFLEX/FORT Save for half (DC = OBSTACLE DIFFICULTY(GM)). REFLEX SAVE to not fall Prone (DC = OBSTACLE DIFFICULTY).",
  "ACTION NAME:        MOVE\nCOST:               1 (PHYS)\nTYPE:               ACTION\n\nDESCRIPTION:        \nYou know.. Move.\n\nSTEPS (ACTION):\n1. Move up to your speed (AGL*10).\n    OR\n2. Swap two item locations in your inventory.",
  "ACTION NAME:        OUTWIT\nCOST:               1 (MNTL)\nTYPE:               REACTION\nREACTION REQ:       VIGILANCE, PLAN\n\nDESCRIPTION:\nYou've made plans within plans.\n\nSTEPS (REACTION): [VIGILANCE, PLAN]\n1. Negate target's VIGILANCE or PLAN ACTION.",
  "ACTION NAME:        PARRY\nCOST:               1 (PHYS)\nTYPE:               REACTION\nREACTION REQ:       ATTACK (M)\nREACTION REQ(T):    FEINT, PLAN\n\nDESCRIPTION:\nDeflect an enemies attack with held item.\n\nSTEPS (REACTION): [ATTACK (M)]\n1. Declare PARRY ACTION.\n2. Resolve Target's REACTION if any.\n3. Roll PARRY (DC = 3 + ATK(T) -ATK).\n4. SUCCESS-> DC of target's next physical ACTION against you is increased by 2. \n\nCAVEATS:\nA. If target rolls a 6 on their next attack against you, roll a d6. A result of 1 or 2 causes your held item to move 10ft from your location.",
  "ACTION NAME:        PLAN\nCOST:               1 (MENTAL)\nTYPE:               REACTION\nREACTION REQ:       \n    ATTACK (M), ATTACK (R), BLOCK,\n    BULL RUSH, GET UP, GRAPPLE,\n    PARRY, DISTRACT, VIGILANCE,\n    TAUNT, TEAM UP\n    \nREACTION REQ(T): OUTWIT\n\nDESCRIPTION:\nSwitch out a prepared ACTION for another one. Choose QUICKLY!\n\nSTEPS (REACTION): [*see above(all)]\n1. Declare a PLAN ACTION.\n2. Resolve any REACTIONs as required.\n3. You may substitute 1 prepared ACTION of a given type (PHYS/MNTL) for another ACTION of the same type.\n\nCAVEATS:\nA. You may only use this ACTION once per round.",
  "ACTION NAME:        RECOVER\nCOST:               2 (PHYS)\nTYPE:               ACTION\n\nDESCRIPTION:\nTake the opportunity to heal yourself or an ally.\n\nSTEPS (ACTION):\n1. RECOVER 1 HP.\n    OR\n2. HEAL an ally for 1 HP. Can be combined with another adjacent ally's TEAM UP ACTION to increase the amount of HP restored by 1. ",
  "ACTION NAME:        SNEAK\nCOST:               1 (PHYS)/1 (MNTL)\nTYPE:               ACTION\nREACTION REQ(T):    SPOT\n\nDESCRIPTION:\nGain a tactical advantage by becoming undetected.\n\nSTEPS (ACTION): Requires use of an OBSTACLE\n1. Declare a SNEAK ACTION.\n2. Resolve REACTION's if any.\n3. You become undetected. Enemies must pass an AWARENESS CHECK (DC = 3 + AWR - STEALTH) to make a REACTION to an undetected foe.\n4. When undetected you cannot be the target of any ACTIONs.\n\nCAVEATS:\nA. STEALTH is your AGL + (bonuses/penalties to stealth from equipment).",
  "ACTION NAME:        SPOT\nCOST:               1 (MNTL)\nTYPE:               ACTION/REACTION\nREACTION REQ:       SNEAK\n\nDESCRIPTION:\nScan your surroundings for potential information.\n\nSTEPS (ACTION):\n1. Roll SPOT (DC = 3 + SPOT DIFFICULTY(GM) - AWR).\n2. GM Reveals relevant information if any, else player gets +1 on a roll of their choice next round.\n\nSTEPS (REACTION): [SNEAK]\n1. Target must make a REFLEX SAVE (DC = 3 + AWR - STEALTH(T)) or forefit their SNEAK ACTION. ",
  "ACTION NAME:        TARGET\nCOST:               1 (MNTL)\nTYPE:               ACTION\nDESCRIPTION:\nConcentrate on a specific body part in combat or improve your aim.\n\nSTEPS (ACTION):\nChoose one of the following:\n\n1. Rolls of 6 for ATTACK (M) against target disarm on a sequential d6 roll of 1 or 2.\n2. Choose the location of your next ATTACK (M) on target.\n3. Reduce the DC of next ATTACK (R) by 1 on target. ",
  "ACTION NAME:        TAUNT\nCOST:               1 (MNTL)\nTYPE:               ACTION\nREACTION REQ(T):    VIGILANCE, PLAN\n\nDESCRIPTION:\nEnrage an enemy. \n\nSTEPS (ACTION):\n1. Declare a TAUNT ACTION. \n2. Resolve Target's REACTION if any.\n3. Roll TAUNT (DC = 3 + COM(T)/WIS(T) - COM/WIS)\n4. SUCCESS-> Target must spend 2 physical ACTIONs next round choosing from ATTACK (M), ATTACK (R), or MOVE toward against you. They must become fatigued in order to obtain 2 physical ACTIONs if possible.\n5. Target may roll a WILL SAVE (DC = 3 + COM - WIS(T)) to ignore the taunt in qubsequent rounds.",
  "ACTION NAME:        TEAM UP\nCOST:               1 (MNTL)\nTYPE:               ACTION/REACTION\nREACTION REQ:       Party Member's MENTAL/PHYSICAL ACTION\n\nDESCRIPTION:\nOffer assistance to another party member. You can spend any prepared ACTION to benefit a party member. Be Creative!\n\nCAVEATS:\nA. If you're adjacent to a party member, you can react as if you were the target. eg (BLOCK).\nB. You can use TEAM UP to confer any information you've obtained. (EG. Identify Weakness). ",
  "ACTION NAME:        VIGILANCE\nCOST:               1 (MNTL)\nTYPE:               REACTION\nREACTION REQ:       DISTRACT, TAUNT, IDENTIFY WEAKNESS\nREACTION REQ(T):    OUTWIT\n\nDESCRIPTION:\nStay on the ball, and don't fall for their tricks.\n\nSTEPS (REACTION): [DISTRACT,TAUNT,IDENTIFY WEAKNESS]\n1. Declare a VIGILANCE.\n2. Resolve Target's REACTION.\n3. Roll VIGILANCE (DC = 3 + WIS(T)/INT(T)/COM(T) - AWR/INT/WIS) \n4. SUCCESS-> DC of target's next mental ACTION is increased by 2. "
];

let cards = [];

class actionCard{
  constructor(name,actionImg,actionType,costP,costM,costH,instructionTxt){
    this.name = name; 
    this.actionImg = actionImg;
    this.actionType = actionType;
    this.instructionTxt = instructionTxt;   
    this.costP = costP;
    this.costM = costM;
    this.costH = costH;
    this.actionTypeTxt = "TYPE: \n\nCOST:";
  }
  show(){
    push();
    fill(255,255,255);
    stroke(0,0,0);
    
    rect(9,35,100,100);
    rect(9,9,263,17);
    rect(117,35,155,100);
    rect(9,143,263,240);
    
    image(this.actionImg,9,35,100,100);
    let pos = 0;
    for(let i = 0; i<this.costP;i++){
      image(pDiceImg,146+(60*pos),75,60,60);
      pos++;
    }
    for(let i = 0; i<this.costM;i++){
      image(mDiceImg,146+(60*pos),75,60,60);
      pos++;
    }
    for(let i = 0; i<this.costH;i++){
      image(hDiceImg,146+(60*pos),75,60,60);
      pos++;
    }
    
    
    fill(0,0,0);
    textFont('monospace');
    textSize(12);
    textAlign(CENTER,CENTER);
    text(this.name,9,9,263,17);   
    
    
    textAlign(LEFT,TOP);
    let pad = 9;
    text(this.actionTypeTxt,117+pad,35+pad,155-pad,100-pad);
    noStroke();
    text(this.actionType,165,35+pad);
    textSize(8);

    text(this.instructionTxt,9+pad,143+pad,263-pad,240-pad);
    pop();
  }
}

function preload(){
  cardFrame = loadImage("https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionCardFrames/CARD_FRAME.png");
  for(let i = 0; i < ACTION_COUNT; i++){
    actionImages.push(loadImage(actionImgPaths[i]));
  }
  pDiceImg = loadImage("https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionCardIcons/physicalDie.png");
  mDiceImg = loadImage("https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionCardIcons/mentalDie.png");
    hDiceImg = loadImage("https://raw.githubusercontent.com/markdhooper/1pgrpg/master/assets/actionCardIcons/hybridDie.png");
}

function setup() {
  createCanvas(280,390);
  for(let i = 0; i < ACTION_COUNT;i++){
      cards.push(new actionCard(
    actionNames[i],
    actionImages[i],
    actionTypes[i],
    actionPCosts[i],
    actionMCosts[i],
    actionHCosts[i],
    actionInstructions[i]
  ));
  }

}

function draw() {
  background(220);
  image(cardFrame,0,0);
  cards[ACTION_IDX].show();
}

function keyTyped() {
  if (key === 'w') {
    ACTION_IDX = (ACTION_IDX + 1)%ACTION_COUNT;
  } else if (key === 's') {
    if(ACTION_IDX == 0){ACTION_IDX=ACTION_COUNT-1}
    else{ACTION_IDX = ACTION_IDX - 1}
  }
  // uncomment to prevent any default behavior
  // return false;
}