const variables = {
    IDLESRC: '../img/idle.png',
    FRONT_JUMPSRC: '../img/front_jump.png',
    BACK_JUMPSRC: '../img/back_jump.png',
    RIGHT_JUMPSRC: '../img/right_jump.png',
    LEFT_JUMPSRC: '../img/left_jump.png',
    TRUNSRC: '../img/turn.png',
    BGSRC: '../img/level1.png',
    COLLECTIONSRC: '../img/carrot.png',
  
    src: [
      '../img/idle.png',
      '../img/front_jump.png',
      '../img/back_jump.png',
      '../img/right_jump.png',
      '../img/left_jump.png',
      '../img/turn.png',
      '../img/level1.png',
      '../img/level2.png',
      '../img/level3.png',
      '../img/carrot.png',
    ],
  
    blocks: [
      ['action_forward'],
      ['action_forward', 'action_turnright'],
      ['action_forward', 'action_turnright', 'action_collect'],
      ['action_forward', 'action_turnright', 'action_collect', 'controls_repeat'],
      ['action_forward', 'action_turnright', 'action_turnleft', 'action_collect', 'controls_repeat'],
      ['action_forward', 'controls_repeat', 'action_if', 'action_turnleft'],
      ['action_forward', 'controls_repeat', 'action_if', 'action_turnright'],
      ['action_forward', 'controls_repeat', 'action_if', 'action_turnright', 'action_turnleft'],
      ['action_forward', 'controls_repeat', 'action_if', 'action_ifElse', 'action_turnright', 'action_turnleft'],
      ['action_forward', 'controls_repeat', 'action_if', 'action_ifElse', 'action_turnright', 'action_turnleft'],
    ],
  
    maxBlocks: [undefined, Infinity, Infinity, Infinity, 6, Infinity, 4, 4, 6, 4, Infinity][1],
  /**
 * 1 --- path; 0 --- wall; 2 --- start; 3 --- finish.
 */
    map: [
      undefined,
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 2, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 0, 0, 1, 0, 0, 0],
        [0, 0, 0, 2, 0, 0, 3, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ],
      [
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 3, 0, 0],
        [0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 2, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ]
    ],
  
    WIDTH: 500,
    HEIGHT: 500,
  
    COLS: 10,
    ROWS: 10,
  
    SQUARE: 500 / 10,
    start: {

    },
    SPRITEWIDTH: 150,
  
    pathType: {
      WALL: 0,
      PATH: 1,
      START: 2,
      FINISH: 3,
      PICK: 4,
    },
  
    directionType: {
      NORTH: 0,
      EAST: 1,
      SOUTH: 2,
      WEST: 3,
    },
  
    resultType: {
      UNSET: 0,
      FAILURE: 1,
      SUCCESS: 2,
      CRASH: 3,
    },
  
    result: 0,
  
    animationState: 0,
  
    animationStateType: {
      UNSET: 0,
      MOVEFORWARD: 1,
      TURNRIGHT: 2,
      TURNLEFT: 3,
    },
  
    NUM: 0,
    count: 0,
  };
  
  export default variables;