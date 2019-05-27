<template>
  <div class="introduction">
    <div class="info">
      <div class="name">{{ intro.name }}</div>
      <div class="first-name">{{ intro.name.substring(0, 1) }}</div>
      <div class="other-info">
        <p v-for="(oneLine, oIdx) in intro.info" :key="oIdx">{{ oneLine }}</p>
      </div>
    </div>
    <div class="avatar">
      <img v-if="hasSizes"
           src="../assets/bg3.jpg"
           sizes="(max-aspect-ratio: 1/1) calc(35vh * 700 / 906), 25vw"
           alt="我的照片"
           class="phoneImage"
      />
      <img v-if="!hasSizes"
           :class="{ 'size-control': !hasSizes }"
           src="../assets/bg3.jpg"
           alt="我的照片"
           class="phoneImage"
      />
    </div>
    <scroll-down></scroll-down>
  </div>
</template>

<script>
import scrollDown from '@/components/scrollDown'

export default {
  name: 'Introduction',
  props: {
    intro: {
      type: Object
    },
    hasSizes: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      imgPath:"../assets/bg3.jpg"
    }
  },
  components: {
    'scroll-down': scrollDown
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.introduction
  position: absolute
  left: 0
  top: 0
  width: 100%
  height: 100vh
  .info, .avatar
    display: inline-block
    width: 50vw
    height: 100%
    vertical-align: top
  .info
    .name
      position: absolute
      left: calc(50% - 18px)
      top: 25vh
      width: 10px
      font-size: 35px
      line-height: 100px
      font-family: '华文中宋', '华文宋体'
      color: #444
    .first-name
      position: absolute
      z-index: -1
      left: calc(30vw - 12vw)
      top: calc(45vh - 12vw)
      font-size: 24vw
      font-family: '华文宋体'
      color: #fafafa
    .other-info
      height: auto
      width: 24vw
      margin: calc(45vh - 12vw + 10vh) auto 0 calc(30vw - 12vw)
      font-size: 13px
      line-height: 20px
      letter-spacing: 2px
      color: #999
  .avatar
    background-color: #f0f0f0
    line-height: 100vh

    .phoneImage{
      width 15rem


    }
    img
      vertical-align: middle
      &.size-control
        width: 25vw
        height: calc(25vw * 906 / 700)

@media only screen and (max-aspect-ratio: 1/1)
  .introduction
    background-color: #f0f0f0
    .info, .avatar
      display: block
      width: 64vw
      height: 35vh
      margin: 0 auto
    .info
      position: relative
      margin-top: 15vh
      .name
        position: relative
        left: 0
        top: 0
        width: auto
        font-size: 20px
        line-height: 10vh
      .first-name
        display: none
      .other-info
        position: relative
        top: 35vh
        height: auto
        width: 64vw
        margin: 3vh 0 0
    .avatar
      margin-top: -25vh
      background: none
      line-height: 35vh
      img
        &.size-control
          width: calc(35vh * 700 / 906)
          height: 35vh
</style>
