<template>
  <div class="projects">
    <ul class="project-overview" :class="{'slide-in': slideIn}">
      <li class="item"
          v-for="(project, pIdx) in projects"
          :key="pIdx"
          :class="[
            { hovering: pIdx===hoverItemIndex },
            {'slide-in': slideIn}
          ]"
          @mouseenter="hoverAbove(pIdx)"
          @mouseleave="hoverLeave"
          @click="showProject(pIdx)"
      >
        <div class="img">
          <img v-if="hasSizes"
               :src="imgPath + project.img + '_160.jpg'"
               :srcset="imgPath + project.img + '_160.jpg 160w,'
                      + imgPath + project.img + '_240.jpg 240w,'
                      + imgPath + project.img + '_360.jpg 360w,'
                      + imgPath + project.img + '_480.jpg 480w,'
                      + imgPath + project.img + '_640.jpg 640w'"
               sizes="(max-width: 640px) and (max-aspect-ratio: 1/1) 64vw,
                      (min-aspect-ratio: 12/5) calc(65vh * (375 / 667)),
                      16vw"
               :alt="project.title + '封面'"
          />
          <img v-if="!hasSizes"
               :class="{ 'size-control': !hasSizes }"
               :src="imgPath + project.img + '_360.jpg'"
               :alt="project.title + '封面'"
          />
        </div>
        <dl class="text">
          <dt class="no">0{{ pIdx + 1 }}</dt>
          <dd class="title">{{ project.title }}</dd>
        </dl>
      </li>
    </ul>
    <scroll-down></scroll-down>
  </div>
</template>

<script>
import scrollDown from '@/components/scrollDown'

export default {
  name: 'Projects',
  components: {
    'scroll-down': scrollDown
  },
  props: {
    slideIn: {
      type: Boolean,
      default: false
    },
    projects: {
      type: Array
    },
    hasSizes: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      hoverItemIndex: -1,
      i: -1,
      imgPath: (process.env.NODE_ENV === 'production'
          ? '/resume/'
          : '/')
      + 'static/img/'
    }
  },
  methods: {
    hoverAbove (projectIndex) {
      this.hoverItemIndex = projectIndex
    },
    hoverLeave () {
      this.hoverItemIndex = -1
    },
    showProject (projectIndex) {
      this.$emit('show-project', projectIndex)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.projects
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 85vh
  margin-top: 15vh
  .project-overview
    margin: 0 auto
    width: 64vw
    height: (85 - 14)vh
    text-align: left
    &.slide-in
      display: block
    .item
      position: relative
      top: 50%
      left: 0
      display: inline-block

      width: w = 16vw
      height: h = w * (667 / 375)
      margin: -(h/2) 0 0 8vw

      overflow: hidden
      font-size: 0
      cursor: pointer
      transition: all 0.5s
      &:first-child
        margin-left: 0
        text-align: right
      .img
        width: w
        height: "calc(%s - 48px)" % h
        overflow: hidden
        transition: all 0.5s
        img
          &.size-control
            width: w
            height: h
      .text
        margin-top: 8px
        height: 40px
        font-size: 18px
        text-align: center
        transition: all 0.5s
        .no
          font-family: 'Times New Roman'
          font-size: 18px
          font-weight: 700
          line-height: 20px
          color: #555
        .title
          font-size: 13px
          line-height: 20px
          color: #999
          letter-spacing: 5px
      &.slide-in
        animation: slide-in 2s
        @keyframes slide-in
          0%
            left: 0
            width: 0
            opacity: 0
          80%
            left: 0
            width: w
            opacity: 1
        &:nth-child(2)
          animation: slide-in-2 2s
          @keyframes slide-in-2
            0%
              left: -10vw
              width: 0
              opacity: 0
            10%
              left: -10vw
              width: 0
              opacity: 0
            90%
              left: 0
              width: w
              opacity: 1
        &:nth-child(3)
          animation: slide-in-3 2s
          @keyframes slide-in-3
            0%
              left: -20vw
              width: 0
              opacity: 0
            20%
              left: -20vw
              width: 0
              opacity: 0
            100%
              left: 0
              width: w
              opacity: 1
      &.hovering
        box-shadow: 0 0 100px 0 #999
        transition: all 0.5s
        .img
          height: h
          transition: all 0.5s
        .text
          height: 0
          overflow: hidden
          transition: all 0.5s

@media only screen and (max-width: 640px) and (max-aspect-ratio: 1/1)
  .projects
    .project-overview
      .item
        top: 0
        display: block
        width: mw = 64vw
        height: mh = 23vh
        margin: 0
        .img
          width: mw
          height: 10vh
          img
            &.size-control
              width: mw
              height: mh
        .text
          text-align: left
          .no
            display: inline-block
            margin-left: 10px
            font-size: 22px
            vertical-align: middle
          .title
            display: inline-block
            margin-left: 10px
            vertical-align: middle
        &.slide-in:nth-child(n)
          animation: none
        &.hovering
          box-shadow: none
          transition: none
          .img
            height: 10vh
          .text
            height: 10vh

@media only screen and (min-aspect-ratio: 12/5)
  .projects
    .project-overview
      ih = 65vh
      iw = ih * (375 / 667)
      width: "calc(%s * 3 + 8vw * 2)" % iw
      .item
        height: ih
        width: iw
        margin: -(ih/2) 0 0 8vw
        .img
          width: iw
          height: "calc(%s - 48px)" % ih
          img
            &.size-control
              width: iw
              height: ih
        &.slide-in
          animation: slide-in 2s
          @keyframes slide-in
            0%
              left: 0
              width: 0
              opacity: 0
            80%
              left: 0
              width: iw
              opacity: 1
          &:nth-child(2)
            animation: slide-in-2 2s
            @keyframes slide-in-2
              0%
                left: -10vw
                width: 0
                opacity: 0
              10%
                left: -10vw
                width: 0
                opacity: 0
              90%
                left: 0
                width: iw
                opacity: 1
          &:nth-child(3)
            animation: slide-in-3 2s
            @keyframes slide-in-3
              0%
                left: -20vw
                width: 0
                opacity: 0
              20%
                left: -20vw
                width: 0
                opacity: 0
              100%
                left: 0
                width: iw
                opacity: 1
        &.hovering
          .img
            height: ih

</style>