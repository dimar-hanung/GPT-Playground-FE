<template>
  <div class="blob-container" ref="blobContainer" :class="[isShow ? 'block' : 'hidden']">
    <!-- <nav>
      <input type="range" min="0.05" max="2" step="0.05" name="vertixCountFactor" />
      <button expand="full" @click="generateBlob('linear')">Generate Linear Shape</button>
      <button expand="full" @click="generateBlob('curvy')">Generate Curvy Shape</button>
      <button expand="full" @click="generateBlob('random')">Randomize Style</button>
    </nav> -->
    <div class="w-96 h-[500px]">
      <svg
        width="500"
        height="500"
        viewBox="0 0 480 480"
        xmlns="http://www.w3.org/2000/svg"
        ref="blobSvg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        style="contain: strict; stroke-width: 0px"
      >
        <defs>
          <linearGradient
            :id="`gradient-fill-${id}`"
            x1="0"
            y1="0"
            x2="800"
            y2="0"
            gradientUnits="userSpaceOnUse"
          >
            <stop offset="0" :stop-color="gradientColor.color1" />

            <stop offset="1" :stop-color="gradientColor.color2" />
          </linearGradient>
        </defs>
        <path class="path drop-shadow-2xl" d="" :fill="`url(#gradient-fill-${id})`"></path>
      </svg>
    </div>

    <!-- <div v-html="svg"></div> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
export interface Props {
  showDelay: number
}
const isShow = ref(false)
const blobContainer = ref<HTMLDivElement>()
const blobAnimationClass = ref('')

const props = withDefaults(defineProps<Props>(), {
  showDelay: 0
})

const blobSvg = ref<SVGElement>()
// create unique id for this component
const id = ref(Math.random().toString(36).slice(2, 9))

class Blob {
  element: Element
  path: Element
  pathD: string
  pathCoordinates: { x: number; y: number }[]

  radius: number
  angle: number
  centerX: number
  centerY: number

  vertixCountFactor: number
  pathStyle: {
    border: string
    fill: string
    stroke: string
    strokeWidth: number
    strokeDasharray: string
  }

  constructor(element: SVGElement) {
    this.element = element
    this.path = this.element.querySelector('path')!
    this.pathD = ''
    this.pathCoordinates = []

    this.radius = 150
    this.angle = 0
    this.centerX = 240
    this.centerY = 240

    this.vertixCountFactor =
      parseFloat((document.querySelector('[name=vertixCountFactor]') as HTMLInputElement)?.value) ||
      1.05
    this.pathStyle = {
      border: 'none',
      fill: 'transparent',
      stroke: 'grey',
      strokeWidth: 2,
      strokeDasharray: 'none'
    }
  }

  generateCoords() {
    for (let i = 0; i < 2 * Math.PI; i += this.vertixCountFactor) {
      let x = this.radius * Math.cos(i) + this.centerX + this.getRandomRadiusModifier()
      let y = this.radius * Math.sin(i) + this.centerY + this.getRandomRadiusModifier()
      this.pathCoordinates.push({ x, y })
      if (i + this.vertixCountFactor >= 2 * Math.PI) {
        this.pathCoordinates.push(this.pathCoordinates[0])
      }
    }
  }

  getRandomRadiusModifier() {
    let num = Math.floor(Math.random() * 50) + 1
    num *= Math.floor(Math.random() * 2) == 1 ? 1 : -1
    return num
  }

  drawLinearShape() {
    this.pathD = 'M'
    this.pathCoordinates.forEach((coord) => {
      this.pathD += `${coord.x},${coord.y} `
    })
    this.path.setAttribute('d', this.pathD)
  }

  generateLinearShape() {
    this.resetPathData()
    this.generateCoords()
    this.drawLinearShape()
  }

  resetPathData() {
    this.pathD = ''
    this.pathCoordinates = []
  }

  catmullRom2bezier() {
    let d = ''
    this.pathCoordinates.forEach((coord, index, array) => {
      let p: { x: number; y: number }[] = []
      const s = 6
      if (index === 0) {
        d += `M${coord.x},${coord.y} `
        p.push(array[array.length - 3])
        p.push(array[index])
        p.push(array[index + 1])
        p.push(array[index + 2])
      } else if (index === array.length - 2) {
        p.push(array[index - 1])
        p.push(array[index])
        p.push(array[index + 1])
        p.push(array[0])
      } else if (index === array.length - 1) {
        return
      } else {
        p.push(array[index - 1])
        p.push(array[index])
        p.push(array[index + 1])
        p.push(array[index + 2])
      }
      let bp: { x: number; y: number }[] = []
      bp.push({ x: p[1].x, y: p[1].y })
      bp.push({
        x: (-p[0].x + s * p[1].x + p[2].x) / s,
        y: (-p[0].y + s * p[1].y + p[2].y) / s
      })
      bp.push({
        x: (p[1].x + s * p[2].x - p[3].x) / s,
        y: (p[1].y + s * p[2].y - p[3].y) / s
      })
      bp.push({ x: p[2].x, y: p[2].y })
      d += `C${bp[1].x},${bp[1].y} ${bp[2].x},${bp[2].y} ${bp[3].x},${bp[3].y} `
    })
    return d
  }

  drawCurvyShape() {
    this.pathD = this.catmullRom2bezier()
    this.path.setAttribute('d', this.pathD)
  }

  generateCurvyShape() {
    this.resetPathData()
    this.generateCoords()
    this.drawCurvyShape()
  }

  randomizeStyle() {
    this.pathStyle = {
      border: 'none',
      fill: this.randomColor(),
      stroke: this.randomColor(),
      strokeWidth: this.randomWidth(),
      strokeDasharray: `${this.randomWidth()} ${this.randomWidth()}`
    }
    Object.assign((this.path as any).style, this.pathStyle)
  }

  randomColor() {
    const randomInt = (min: number, max: number) => {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
    var h = randomInt(0, 360)
    var s = randomInt(42, 98)
    var l = randomInt(40, 90)
    return `hsl(${h},${s}%,${l}%)`
  }

  randomWidth() {
    return Math.floor(Math.random() * Math.floor(50))
  }
}
const generateBlob = (style: any) => {
  if (blobSvg.value == null) return
  var b = new Blob(blobSvg.value)
  switch (style) {
    case 'linear':
      b.generateLinearShape()
      break
    case 'curvy':
      b.generateCurvyShape()
      break
    case 'random':
      b.randomizeStyle()
      break
  }
}

// rgba random color with light brightness
const randomColor = () => {
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const h = randomInt(0, 360)
  const s = randomInt(42, 98)
  const l = randomInt(70, 90)
  return `hsl(${h},${s}%,${l}%)`
}

const gradientColor = reactive({
  color1: randomColor(),
  color2: randomColor()
})

/**
 * method to create infinite random animation transform from blobContainer ref
 */
const randomAnimation = () => {
  const randomInt = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1)) + min
  }
  const randomAnimation2 = () => {
    const randomX = randomInt(-100, 100)
    const randomY = randomInt(-100, 100)
    const randomScale = randomInt(1, 3)
    const randomRotate = randomInt(0, 360)
    const randomDuration = randomInt(1, 5)
    const randomDelay = randomInt(0, 5)
    const randomEasing = 'ease'
    const randomTransform = `translate(${randomX}px, ${randomY}px) scale(${randomScale}) rotate(${randomRotate}deg)`
    if (blobContainer.value) {
      blobContainer.value.style.transform = randomTransform
      blobContainer.value.style.transition = `all ${randomDuration}s ${randomEasing} ${randomDelay}s`
    }
  }
  const animation = setInterval(() => {
    randomAnimation2()
  }, 1000)
}

onMounted(() => {
  generateBlob('curvy')
  const w = setTimeout(() => {
    if (blobContainer.value) {
      blobAnimationClass.value = 'blob-animation'
      isShow.value = true
      /**
       * TODO: Atkifkan animasi
       */
      // randomAnimation()
    }
  }, props.showDelay)
})
</script>
<style scoped>
path {
  transition: all ease 0.5s;
}

/* 
 * CSS scale show animation
 */
@keyframes scaleShow {
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
}

/**
 * CSS smooth rotation animation
 */
@keyframes rotate {
  0% {
    transform: rotate(0deg);
    transform-origin: center;
  }
  100% {
    transform: rotate(360deg);
    transform-origin: center;
  }
}
.blob-container {
  /* position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center; */
  animation: scaleShow 0.5s ease;
}
.blob-animation {
  animation: scaleShow 0.5s ease, rotate 5s linear infinite;
}
</style>
