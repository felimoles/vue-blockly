<script setup>
/**
 * @license
 * Copyright 2022 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @fileoverview Main Vue component that includes the Blockly component.
 * @author dcoodien@google.com (Dylan Coodien)
 */
import { ref, shallowRef, onMounted, computed, reactive } from 'vue'
import '../assets/maze/blocks.js'
import * as Blockly from 'blockly'
import Interpreter from 'js-interpreter'
import Maze from '../assets/maze/maze.js'
import { javascriptGenerator } from 'blockly/javascript'

var dialog = ref(false)
var helper = ref(true)
const isRunning = ref(false)
var foo = ref()
var result = ref()
const code = ref()
const blockly2 = ref()
const interval = ref()
var progress = ref(0)
var workspace = shallowRef()
const maxblock = {
  ONE: 11,
  TWO: 18,
  THREE: 13,
}

const options = {
  media: 'media/',
  maxBlocks: maxblock.THREE,
  grid: {
    spacing: 25,
    length: 3,
    colour: '#ccc',
    snap: true,
  },
  toolbox: {
    // There are two kinds of toolboxes. The simpler one is a flyout toolbox.
    kind: 'flyoutToolbox',
    // The contents is the blocks and other items that exist in your toolbox.
    contents: [
      {
        kind: 'block',
        type: 'action_turnright',
      },
      {
        kind: 'block',
        type: 'action_forward',
      },
      {
        kind: 'block',
        type: 'action_turnleft',
      },
      /*{
        kind:"block",
        type:"controls_repeat",
        disabled: true

      }*/
    ],
  },
}

defineExpose({ workspace })

const runCode = async () => {
  isRunning.value = true
  reset()

  //javascriptGenerator.STATEMENT_PREFIX = 'moveForward(%1);\n';
  //javascriptGenerator.addReservedWords('moveForwardf');
  console.log(workspace.value.blockDB.size)
  let time = workspace.value.blockDB.size * 3200
  var code = javascriptGenerator.workspaceToCode(workspace.value)
  var interpreter = new Interpreter(code, Maze.initApi)

  try {
    await Maze.excute(interpreter)
  } catch (e) {
    console.log(e)
  } finally {
    console.log('done')
  }
  interval.value = setInterval(() => {
    progress.value += 10
    console.log(progress.value)
  }, time / 10)

  window.setTimeout(async function () {
    result.value = Maze.result
    dialog.value = true
    if (Maze.result === 2) {
      console.log(Maze.result)
      foo.value = 'Success'
      interval.value = clearInterval(interval.value)
    } else {
      console.log('Failure')
      foo.value = 'Failure'
      interval.value = clearInterval(interval.value)
    }
    //Blockly.serialization.workspaces.clear();
    isRunning.value = false
    interval.value = progress.value = 0
  }, time)
}
const _helper = () => {
  helper.value = !helper.value
}
const reset = () => {
  Maze.reset(1)
  result.value = null
}

onMounted(() => {
  //Maze.init(2)
  workspace.value = Blockly.inject(blockly2.value, options)
  //Blockly.serialization.workspaces.load(startBlocks, workspace.value);
})
</script>

<template>
  <div class="pa-2 bg-green text-center">
    <h2>Ayuda al personaje a llegar del punto A al punto B.</h2>
  </div>
  <div class="d-flex mb-6">
    <div id="maze"></div>
    <div
      style="height: 500px; width: 100%; margin-left: 20px"
      id="blockly2"
      ref="blockly2"
    ></div>
  </div>
  <v-progress-linear
    color="yellow-darken-2"
    indeterminate
    v-if="isRunning"
  ></v-progress-linear>
  <div class="d-flex justify-left mb-6">
    <v-btn
      variant="outlined"
      class="ma-2 bg-green"
      :disabled="isRunning"
      v-on:click="runCode()"
      >Iniciar</v-btn
    >

    <v-btn
      variant="outlined"
      class="ma-2 bg-green"
      :disabled="isRunning"
      v-on:click="_helper()"
      >Ayuda</v-btn
    >
  </div>

  <pre v-html="code"></pre>
  <v-dialog v-model="dialog" max-width="400" persistent>
    <v-card>
      <div class="text-center ma-10">
        <h2>{{ result == 2 ? 'Muy bien' : 'Fallaste' }}</h2>
      </div>
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="dialog = false"> Continuar </v-btn>
      </template>
    </v-card>
  </v-dialog>

  <v-dialog v-model="helper" max-width="500" persistent>
    <v-card prepend-icon="mdi-help-circle-outline" title="Ayuda">
      <v-card-text>
        <h3>¿Como usar el editor de piezas?</h3>
        <p>
          El editor usa piezas de un rompecabezas como bloques para representar
          conceptos de código como variables, expresiones lógicas, bucles y
          mucho más. Permite que los usuarios programen sin tener que
          preocuparse por la sintaxis o la intimidación de la línea de comandos.
        </p>
        <p><br /></p>
        <h2>¿Que es la programación en bloque?</h2>
        <p>
          La codificación basada en bloques permite a los usuarios aplicar
          principios de programación sin tener que preocuparse por la sintaxis o
          la intimidación de un cursor intermitente en la línea de comandos, lo
          que facilita la curva de aprendizaje de los aspirantes a
          programadores. Gracias a que reduce la necesidad de aprender sintaxis,
          la programación basada en bloques permite que los usuarios se enfoquen
          por completo en la lógica detrás de los condicionales, los bucles, las
          variables y otros conceptos básicos sin tener que preocuparse por el
          paréntesis desequilibrado ni la falta del punto y coma.
        </p>
        <br />
      </v-card-text>
      <template v-slot:actions>
        <v-spacer></v-spacer>

        <v-btn @click="helper = false"> Cerrar </v-btn>
      </template>
    </v-card>
  </v-dialog>
</template>

<style>
html,
body {
  margin: 0;
}

#code {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 50%;
  height: 50%;
  margin: 0;
  background-color: beige;
}
</style>
