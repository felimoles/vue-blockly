'use strict'

import variables from './var'

var Mazee = { variables }
var Maze = Mazee.variables
let imgs = []
Maze.setDirection = function (level) {
  switch (parseInt(level)) {
    case 1:
      Maze.DIRECTION = Maze.directionType.EAST
      break
    case 2:
      Maze.DIRECTION = Maze.directionType.NORTH
      console.log('level2')
      break
    case 3:
      Maze.DIRECTION = Maze.directionType.EAST
      console.log('level2')
      break
    default:
      Maze.DIRECTION = Maze.directionType.EAST
      console.log('Level is undefined.')
  }
}

Maze.setNum = function () {
  switch (1) {
    case 1:

    case 2:
      break
    case 3:
      break
    case 4:
      NUM = 0
      break
    case 5:
      NUM = 4
      break
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
      NUM = 0
      break
    default:
      console.log('Level is undefined.')
  }
}

Maze.init = function (level) {
  level = 1
  console.log('init', level)
  console.log(Maze.map)
  Maze.map = Maze.map[level]
  Maze.BGSRC = '../img/level' + level + '.png'
  var visilization = document.getElementById('maze')

  var text = document.createElement('div')
  text.innerHTML = 'capacity'
  var canvas = document.createElement('canvas')
  canvas.id = 'canvas'
  canvas.className = 'canvas'
  visilization.appendChild(canvas)
  Maze.context = canvas.getContext('2d')

  canvas.width = Maze.WIDTH
  canvas.height = Maze.HEIGHT
  // Preparatory works.
  //Game.initToolbox(Maze);
  //Game.initWorkspace(Maze.maxBlocks);

  Maze.setDirection(level)
  // Maze.setNum();
  for (var i = 0, j = 0; i < Maze.ROWS; ++i) {
    for (j = 0; j < Maze.COLS; ++j) {
      if (Maze.map[i][j] == Maze.pathType.START) {
        console.log('start ')
        Maze.start = {
          x: j * Maze.SQUARE,
          y: i * Maze.SQUARE,
        }
      } else if (Maze.map[i][j] == Maze.pathType.FINISH) {
        Maze.finish = {
          x: j * Maze.SQUARE,
          y: i * Maze.SQUARE,
        }
      }
    }
  }

  Maze.loadImages(Maze.src, Maze.initImages)
  window.onresize = Maze.onresize
}

Maze.loadImages = function (src, onComplete) {
  var num = 0

  for (var i in src) {
    ;(function (i) {
      imgs[i] = new Image()
      imgs[i].src = src[i]

      imgs[i].onload = function () {
        num++

        if (num >= Object.keys(src).length) {
          console.log('completes')
          onComplete()
        }
      }
    })(i)
  }
}

Maze.initImages = function () {
  Maze.idle = imgs[Maze.src.indexOf(Maze.IDLESRC)]
  Maze.frontJump = imgs[Maze.src.indexOf(Maze.FRONT_JUMPSRC)]
  Maze.backJump = imgs[Maze.src.indexOf(Maze.BACK_JUMPSRC)]
  Maze.rightJump = imgs[Maze.src.indexOf(Maze.RIGHT_JUMPSRC)]
  Maze.leftJump = imgs[Maze.src.indexOf(Maze.LEFT_JUMPSRC)]
  Maze.turn = imgs[Maze.src.indexOf(Maze.TRUNSRC)]
  Maze.bg = imgs[Maze.src.indexOf(Maze.BGSRC)]
  Maze.carrot = imgs[Maze.src.indexOf(Maze.COLLECTIONSRC)]

  Maze.initScene()
}

Maze.initScene = function () {
  Maze.drawScene(Maze.initRole)
}

Maze.initRole = function () {
  console.log(Maze.DIRECTION)
  Maze.role = {}
  Maze.role.img = Maze.idle
  Maze.role.position = {
    x: Maze.start.x,
    y: Maze.start.y,
  }
  switch (Maze.DIRECTION) {
    case Maze.directionType.NORTH:
      Maze.role.sx = 0
      break
    case Maze.directionType.EAST:
      Maze.role.sx = Maze.SPRITEWIDTH
      break
    case Maze.directionType.SOUTH:
      Maze.role.sx = 2 * Maze.SPRITEWIDTH
      break
    case Maze.directionType.WEST:
      Maze.role.sx = 3 * Maze.SPRITEWIDTH
      break
    default:
      console.log('direction is undefined.')
  }
  Maze.context.globalCompositeOperation = 'source-over'
  Maze.role.sy = 0
  Maze.drawRoleIdle(Maze.start.x, Maze.start.y)
  //Maze.drawRoleIdle(0, 0);
}

Maze.onresize = function () {
  // Blockly.svgResize(Game.workspace);
}

Maze.updateCapacity = function () {
  var cap = Game.workspace.remainingCapacity()
  var capacity = document.getElementById('capacity')
  var p = document.getElementById('capacityNum')
  p.textContent = Number(cap)
  if (cap != Infinity) {
    capacity.style.display = 'block'
  }
  if (cap == 0) {
    console.log('积木块已用完')
  }
}

Maze.initApi = function (interpreter, scope) {
  var wrapper = function (id) {
    id = id ? id.toString() : ''
    Maze.moveforward(id)
  }
  interpreter.setProperty(
    scope,
    'moveforward',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    id = id ? id.toString() : ''
    Maze.turnleft(id)
  }
  interpreter.setProperty(
    scope,
    'turnleft',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    id = id ? id.toString() : ''
    Maze.turnright(id)
  }
  interpreter.setProperty(
    scope,
    'turnright',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    id = id ? id.toString() : ''
    Maze.collect(id)
  }
  interpreter.setProperty(
    scope,
    'collect',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    return interpreter.createPrimitive(Maze.isPath(0, id.toString()))
  }
  interpreter.setProperty(
    scope,
    'isPathForward',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    return interpreter.createPrimitive(Maze.isPath(1, id.toString()))
  }
  interpreter.setProperty(
    scope,
    'isPathRight',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    return interpreter.createPrimitive(Maze.isPath(2, id.toString()))
  }
  interpreter.setProperty(
    scope,
    'isPathBackward',
    interpreter.createNativeFunction(wrapper),
  )

  wrapper = function (id) {
    return interpreter.createPrimitive(Maze.isPath(3, id.toString()))
  }
  interpreter.setProperty(
    scope,
    'isPathLeft',
    interpreter.createNativeFunction(wrapper),
  )
}

Maze.excute = async function (interpreter) {
  if (interpreter.step()) {
    window.setTimeout(async function () {
      Maze.excute(interpreter)
    }, 300)
  } else {
    if (Maze.result == Maze.resultType.UNSET) {
      Maze.checkResult(Maze.role.position.x, Maze.role.position.y)
    }
  }
}
Maze.checkResult = function (x, y) {
  var i = Math.floor(y / Maze.SQUARE)
  var j = Math.floor(x / Maze.SQUARE)

  console.log(i)
  console.log(j)
  console.log(Maze.map[i][j])
  if (Maze.map[i][j] === Maze.pathType.FINISH && Maze.count === Maze.NUM) {
    console.log('Success!!!!')
    Maze.result = Maze.resultType.SUCCESS

    //alert('success')
  } else {
    console.log('Failure!!!!')

    Maze.result = Maze.resultType.FAILURE
    //alert('failure!')
  }

  Maze.displayResult()
}

Maze.play = function () {
  var code = Blockly.JavaScript.workspaceToCode(Game.workspace)
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null
  var interpreter = new Interpreter(code, Maze.initApi)
  try {
    Maze.excute(interpreter)
  } catch (e) {
    alert(MSG['badCode'].replace('%1', e))
  }

  document.getElementById('resetBtn').style.visibility = 'visible'
  document.getElementById('playBtn').style.visibility = 'hidden'
}

Maze.reset = function (level) {
  Maze.context.canvas.width = Maze.context.canvas.width
  Maze.initScene()

  Maze.setDirection(level)
  Maze.setNum()
  Maze.count = 0

  Maze.result = Maze.resultType.UNSET

  //document.getElementById('playBtn').style.visibility = 'visible';
  //document.getElementById('resetBtn').style.visibility = 'hidden';
}

Maze.drawScene = function (drawRole) {
  Maze.drawBg()
  //Maze.drawNum();
  Maze.drawCollection().then(drawRole)
}

/**
 * @param {Number} x. X coordinates of role position.
 * @param {Number} y. Y coordinates of role position.
 */
Maze.drawRoleIdle = function (x, y) {
  Maze.context.globalCompositeOperation = 'source-over'
  Maze.context.drawImage(
    Maze.role.img,
    Maze.role.sx,
    Maze.role.sy,
    150,
    210,
    x,
    y - 70 + Maze.SQUARE,
    Maze.SQUARE,
    70,
  )
}

Maze.drawRoleJump = function (x, y) {
  Maze.context.globalCompositeOperation = 'source-over'
  Maze.context.drawImage(
    Maze.role.img,
    Maze.role.sx,
    Maze.role.sy,
    150,
    320,
    x,
    y - 105 + Maze.SQUARE,
    Maze.SQUARE,
    105,
  )
}

Maze.drawRoleTurn = function (x, y) {
  Maze.context.globalCompositeOperation = 'source-over'
  Maze.context.drawImage(
    Maze.role.img,
    Maze.role.sx,
    Maze.role.sy,
    150,
    210,
    x,
    y - 70 + Maze.SQUARE,
    Maze.SQUARE,
    70,
  )
}

Maze.drawBg = function () {
  Maze.context.drawImage(Maze.bg, 0, 0, Maze.WIDTH, Maze.HEIGHT)

  return new Promise((resolve, reject) => {
    resolve()
  })
}

Maze.drawCollection = function () {
  var i,
    j,
    k = 0
  for (i = 0; i < Maze.ROWS; ++i) {
    for (j = 0; j < Maze.COLS; ++j) {
      if (Maze.map[i][j] === Maze.pathType.PICK) {
        k++
        if (k > Maze.count) {
          Maze.context.globalCompositeOperation = 'source-over'
          Maze.context.drawImage(
            Maze.carrot,
            j * Maze.SQUARE,
            i * Maze.SQUARE,
            Maze.SQUARE,
            Maze.SQUARE,
          )
        }
      }
    }
  }

  return new Promise((resolve, reject) => {
    resolve()
  })
}

Maze.drawNum = function () {
  Maze.context.globalCompositeOperation = 'source-over'
  Maze.context.drawImage(Maze.number[Maze.count], 385, 16, 11, 21)
}
//core

Maze.moveforward = function (id) {
  console.log('moveforward' + Maze.DIRECTION)

  if (!Maze.checkWall(Maze.role.position.x, Maze.role.position.y, 0)) {
    Maze.displayResult()
    return
  }

  //Game.highlight(id);

  Maze.role.sx = 0
  Maze.role.sy = 0
  Maze.animationState = Maze.animationStateType.MOVEFORWARD
  Maze.startAnimation(8)
}
Maze.turnright = function (id) {
  console.log('turnright')

  //Game.highlight(id);

  switch (Maze.DIRECTION) {
    case Maze.directionType.NORTH:
      Maze.role.sx = 4 * Maze.SPRITEWIDTH
      break
    case Maze.directionType.EAST:
      Maze.role.sx = 2 * Maze.SPRITEWIDTH
      break
    case Maze.directionType.SOUTH:
      Maze.role.sx = 8 * Maze.SPRITEWIDTH
      break
    case Maze.directionType.WEST:
      Maze.role.sx = 6 * Maze.SPRITEWIDTH
      break
    default:
      console.log(Maze.DIRECTION)
      console.error('direction is wrong.')
  }
  Maze.role.sy = 0
  Maze.role.img = Maze.turn
  Maze.animationState = Maze.animationStateType.TURNRIGHT
  Maze.startAnimation(3)

  // Set current direction.
  // direction 0 ~ 3.
  Maze.DIRECTION = (Maze.DIRECTION + 1) % 4
}

Maze.turnleft = function (id) {
  console.log('turnleft')
  //Game.highlight(id);

  switch (Maze.DIRECTION) {
    case Maze.directionType.NORTH:
      Maze.role.sx = 4 * Maze.SPRITEWIDTH
      break
    case Maze.directionType.EAST:
      Maze.role.sx = 2 * Maze.SPRITEWIDTH
      break
    case Maze.directionType.SOUTH:
      Maze.role.sx = 0
      break
    case Maze.directionType.WEST:
      Maze.role.sx = 6 * Maze.SPRITEWIDTH
      break
    default:
      console.log(Maze.DIRECTION)
      console.error('direction is wrong.')
  }
  Maze.role.sy = 0
  Maze.role.img = Maze.turn
  Maze.animationState = Maze.animationStateType.TURNLEFT
  Maze.startAnimation(3)

  // Set current direction.
  // direction 0 ~ 3.
  Maze.DIRECTION = (Maze.DIRECTION + 3) % 4
}
/**
 * @param {Number} fps. Frames per second.
 * @param {Canvas2DContext} ctx.
 * @param {Number} sx.
 * @param {Function} draw.
 */
Maze.startAnimation = function (fps) {
  Maze.fpsInterval = 1000 / fps
  Maze.totalTime = Maze.fpsInterval * fps
  Maze.then = Date.now()
  Maze.startTime = Maze.then
  Maze.animate()
}

Maze.animate = function () {
  // request another frame
  Maze.raf = requestAnimationFrame(Maze.animate)

  // calc elapsed time since last loop
  Maze.now = Date.now()
  Maze.elapsed = Maze.now - Maze.then

  // if enough time has elapsed, draw the next frame
  if (Maze.elapsed > Maze.fpsInterval) {
    // Get ready for next frame by setting then=now, but also adjust for your
    // specified fpsInterval not being a multiple of RAF's interval (16.7ms)
    Maze.then = Maze.now - (Maze.elapsed % Maze.fpsInterval)

    // Put your drawing code here
    if (Maze.now - Maze.startTime > Maze.totalTime) {
      Maze.stopAnimation()
    }

    if (Maze.animationState == Maze.animationStateType.MOVEFORWARD) {
      switch (Maze.DIRECTION) {
        case Maze.directionType.NORTH:
          Maze.role.position.y -= 6.25
          Maze.role.img = Maze.backJump
          break
        case Maze.directionType.EAST:
          Maze.role.position.x += 6.25
          Maze.role.img = Maze.rightJump
          break
        case Maze.directionType.SOUTH:
          Maze.role.position.y += 6.25
          Maze.role.img = Maze.frontJump
          break
        case Maze.directionType.WEST:
          Maze.role.position.x -= 6.25
          Maze.role.img = Maze.leftJump
          break
        default:
          console.log(Maze.DIRECTION)
          console.error('direction is wrong.')
      }
      // Draw game scene.
      Maze.drawScene(function () {
        Maze.drawRoleJump(Maze.role.position.x, Maze.role.position.y)
        Maze.role.sx += 150
      })
    } else if (Maze.animationState == Maze.animationStateType.TURNRIGHT) {
      // Draw game scene.
      Maze.drawScene(function () {
        Maze.drawRoleTurn(Maze.role.position.x, Maze.role.position.y)
        Maze.role.sx -= 150
      })
    } else if (Maze.animationState == Maze.animationStateType.TURNLEFT) {
      // Draw game scene.
      Maze.drawScene(function () {
        Maze.drawRoleTurn(Maze.role.position.x, Maze.role.position.y)
        Maze.role.sx += 150
      })
    }
    console.log('animate')
  }
}

Maze.stopAnimation = function () {
  cancelAnimationFrame(Maze.raf)
}

Maze.checkWall = function (x, y, direction) {
  var i, j
  var effectiveDirection = Maze.DIRECTION + direction
  effectiveDirection = effectiveDirection % 4
  if (effectiveDirection < 0) {
    effectiveDirection += 4
  }
  switch (effectiveDirection) {
    case Maze.directionType.NORTH:
      y -= Maze.SQUARE
      break
    case Maze.directionType.EAST:
      x += Maze.SQUARE
      break
    case Maze.directionType.SOUTH:
      y += Maze.SQUARE
      break
    case Maze.directionType.WEST:
      x -= Maze.SQUARE
      break
    default:
      console.log(Maze.DIRECTION)
      console.error('direction is wrong.')
  }

  i = y / Maze.SQUARE
  j = x / Maze.SQUARE

  if (Maze.map[i][j] === Maze.pathType.WALL) {
    Maze.result = Maze.resultType.CRASH
    //alert('Crash')
    return false
  } else {
    return true
  }
}

Maze.displayResult = function () {
  switch (Maze.result) {
    case Maze.resultType.CRASH:
      console.log('crash')
      break
    case Maze.resultType.FAILURE:
      console.log('Fail')
      break
    case Maze.resultType.SUCCESS:
      console.log('Success!!!!')
      break
  }
}
window.addEventListener('load', Maze.init, false)
export default Maze
