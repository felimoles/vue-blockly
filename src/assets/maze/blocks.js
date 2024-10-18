import * as Blockly from 'blockly/core'
import { javascriptGenerator } from 'blockly/javascript'

Blockly.Blocks['action_forward'] = {
  init: function () {
    this.appendEndRowInput().appendField('avanzar')
    //.appendField(new Blockly.FieldVariable());
    this.setOutput(null)
    this.setColour('#EC6043')
    this.setNextStatement(true, null)
    this.setPreviousStatement(true, null)
    this.setTooltip('Returns number of letters in the provided text.', false)
  },
}

javascriptGenerator.forBlock['action_forward'] = function (block) {
  return "moveforward('block_id_" + block.id + "');\n"
}

Blockly.Blocks['action_turnright'] = {
  init: function () {
    this.appendEndRowInput().appendField('Girar a la derecha')
    //.appendField(new Blockly.FieldVariable());
    this.setOutput(null)
    this.setColour('#F3D00C')
    this.setNextStatement(true, null)
    this.setPreviousStatement(true, null)
    this.setTooltip('Returns number of letters in the provided text.', false)
  },
}

javascriptGenerator.forBlock['action_turnright'] = function (block) {
  return "turnright('block_id_" + block.id + "');\n"
}
Blockly.Blocks['action_turnleft'] = {
  init: function () {
    this.appendEndRowInput().appendField('Girar a la izquierda')
    //.appendField(new Blockly.FieldVariable());
    this.setOutput(null)
    this.setColour('#75D14A')
    this.setNextStatement(true, null)
    this.setPreviousStatement(true, null)
    this.setTooltip('Returns number of letters in the provided text.', false)
  },
}
javascriptGenerator.forBlock['action_turnleft'] = function (block) {
  return "turnleft('block_id_" + block.id + "');\n"
}

Blockly.Blocks['controls_repeat'] = {
  init: function () {
    this.appendEndRowInput()
      .appendField('Repetir')
      .appendField(new Blockly.FieldTextInput('10'), 'TIMES')
    this.appendStatementInput('DO').appendField('')
    this.setOutput(null)
    this.setColour('#EC6043')
    this.setTooltip('Returns number of letters in the provided text.', false)
  },
}
