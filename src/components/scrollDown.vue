<template>
  <div class="scroll-down-icon">
    <div class="text">上下滚动切换页面</div>
    <div class="arrow">
      <img src="../assets/down.png" width="16" height="16" alt="下箭头" />
    </div>
    <div class="arrow">
      <img src="../assets/down.png" width="16" height="16" alt="下箭头" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'scrollDown'
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.scroll-down-icon
  position: absolute
  width: 100%
  height: 4vh
  bottom: 10vh
  left: 50vw
  cursor: default
  pointer-events: none
  .text
    width: 0
    margin: 0 0 7px -40px
    font-size: 10px
    color: #bbb
    text-align: center
    white-space: nowrap
    animation: fade-text 3s infinite
    @keyframes fade-text
      0%
        opacity: 0
      16%
        opacity: 1
      69%
        opacity: 1
      85%
        opacity: 0
      100%
        opacity: 0
  .arrow
    width: 16px
    height: 16px
    margin-left: -7px
    text-align: left
    animation: fade 3s infinite
    @keyframes fade
      0%
        opacity: 0
      24%
        opacity: 0
      40%
        opacity: 1
      79%
        opacity: 1
      95%
        opacity: 0
      100%
        opacity: 0
    &:last-child
      margin-top: -7px
      animation: fade-second 3s infinite
      @keyframes fade-second
        0%
          opacity: 0
        48%
          opacity: 0
        64%
          opacity: 1
        84%
          opacity: 1
        100%
          opacity: 0
</style>