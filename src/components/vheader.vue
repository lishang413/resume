<template>
  <div class="c-header">
    <div class="title">
      <h1 :class="{extend: state}">我的简历</h1>
      <p>MY RESUME</p>
    </div>
    <div class="menu-button"
         :class="{show: isMenuShowed}"
         @click="toggleMenu"
    >
      <span class="line"></span>
      <span class="line"></span>
      <span class="text">Menu</span>
    </div>
    <transition name="pull-in">
      <div class="menu-wrapper" v-show="isMenuShowed">
        <ul class="menu">
          <li class="item"
              v-for="(item, index) in menu"
              :key="index"
              @click="goToPage(index)"
          >
            <transition name="zoom-right">
              <div class="eng" v-show="isMenuShowed">
                <div class="text">{{ item.eng }}</div>
                <div class="cover"></div>
              </div>
            </transition>
            <transition name="chi-fade">
              <div class="chi" v-show="isMenuShowed">{{ item.chi }}</div>
            </transition>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'vheader',
  props: {
    state: {
      type: Boolean,
      default: false
    },
    menu: {
      type: Array
    }
  },
  data () {
    return {
      isMenuShowed: false
    }
  },
  methods: {
    toggleMenu () {
      this.isMenuShowed = !this.isMenuShowed
    },
    goToPage (index) {
      this.isMenuShowed = false
      this.$emit('go-to-page', index)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.c-header
  position: fixed
  z-index: 1
  padding-top: 6vh
  width: 100vw
  height: 9vh
  color: #333333
  text-align: center
  .title
    h1
      font-size: 16px
      letter-spacing: 10px
      position: relative
      z-index: -1
      &:after, &:before
        position: absolute
        top: 16px
        display: inline-block
        content: ''
        width: 0
        height: 0
        border-top: 1px solid #555
        transition: width 1s
      &:before
        right: calc(50% + 60px)
      &:after
        left: calc(50% + 50px)
      &.extend
        &:after, &:before
          width: 100px
          transition: width 1s
    p
      margin-top: 4px
      font-size: 12px
      letter-spacing: 8px
      transform: scale(0.583)
  .menu-button
    position: absolute
    z-index: 10
    left: 10vw
    top: 6vh
    padding: 2px 10px 10px
    width: 26px
    height: 26px
    cursor: pointer
    .line
      display: block
      margin-top: 8px
      height: 0
      width: 100%
      border-top: 1px solid #555
      transition: all 0.5s
    .text
      position: absolute
      display: inline-block
      left: (26 + 10 * 2 + 2)px
      top: 9px
      width: 38px
      overflow: hidden
      font-size: 13px
      text-align: left
      color: #888
      transition: width 0.5s, opacity 0.5s 0.1s
    &.show
      .line
        transition: all 1s
        border-top-color: #bbb
        &:first-child
          transform: rotate(45deg)
          transform-origin: 27% 27%
        &:nth-child(2)
          transform: rotate(-45deg)
          transform-origin: 27% 27%
      .text
        opacity: 0
        width: 0
        transition: opacity 0.5s, width 0.5s 0.5s
  .menu-wrapper
    position: fixed
    left: 0
    top: 0
    right: 0
    bottom: 0
    width: 100%
    height: 100%
    background-color: #1b1a18
    overflow: hidden
    transform: translateZ(0)
    .menu
      margin: 10vh auto
      width: 94vw
      max-width: calc(112vh + 6vw)
      text-align: left
      .item
        display: inline-block
        position: relative
        margin-left: 2vw
        width: 22vw
        max-width: 28vh
        height: 8vh
        cursor: pointer
        &:first-child
          margin-left: 0
        for n in 1 2 3 4
          &:nth-child({n})
            top: (16 * n - 3)vh
        .eng
          display: inline-block
          position: relative
          .text
            display: inline-block
            position: relative
            font-size: 28px
            letter-spacing: 3px
            color: #ddd
          .cover
            display: inline-block
            position: absolute
            left: -80%
            top:0
            width: 300%
            height: 35px
            background: linear-gradient(to right, #1b1a18, rgba(27,26,24,0) 40%, rgba(27,26,24,0) 60%, #1b1a18)
        .zoom-right-enter
          .text
            left: 20px
            transform: scaleX(1.5)
            transform-origin: 0 0
            letter-spacing: 8px
            transition: all 1s cubic-bezier(0.4, 0, 1, 1)
        .zoom-right-enter-to, .zoom-right-leave
          .text
            left: 0
            transform: scaleX(1)
            transform-origin: 0 0
            letter-spacing: 3px
            transition: all 1s cubic-bezier(0.4, 0, 1, 1)
        .zoom-right-leave-to
          .text
            left: -30px
            transform: scaleX(1.5)
            transform-origin: 100% 0
            letter-spacing: 8px
            transition: all 1s cubic-bezier(0.4, 0, 1, 1)
        .zoom-right-enter-active, .zoom-right-leave-active
          transition: all 1s
        .chi
          margin-top: 10px
          font-size: 14px
          color: #666
        .chi-fade-enter, .chi-fade-leave-to
          opacity: 0
        .chi-fade-enter-to, .chi-fade-leave
          opacity: 1
        .chi-fade-enter-active, .chi-fade-leave-active
          transition: all 1s
  .pull-in-enter, .pull-in-leave-to
    height: 0
  .pull-in-enter-to, .pull-in-leave
    height: 100%
  .pull-in-enter-active
    transition: all 1s
  .pull-in-leave-active
    transition: all 1s 0.3s

@media only screen and (max-width: 640px) and (max-aspect-ratio: 1/1)
  .c-header
    padding-top: 2vh
    .menu-button
      top: 2vh
      .text
        display: none

@media only screen and (max-width: 640px)
  .c-header
    .title
      h1
        &:before, &:after
          display: none
    .menu-wrapper
      .menu
        margin: 20vh auto
        .item
          display: block
          margin-top: 2vh
          height: 15vh
          &:nth-child(n)
            top: 0
            margin-left: 15vw
          .eng
            .text
              font-size: 18px
            .cover
              height: 20px

@media only screen and (max-width: 320px)
  .c-header
    .title
      h1
        font-size: 14px
      p
        transform: scale(0.54)
</style>
