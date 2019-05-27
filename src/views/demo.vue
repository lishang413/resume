<template>
  <div class="demo">
    <div class="experience-content"
         ref="exContent"
         @touchstart.stop="touchStart"
         @touchend="touchEnd">
      <div class="experience-item"
           v-for="(exp, index) in experiences"
           :key="index"
      >
        <!--<div class="item-index">00{{ index + 1}}/002</div>-->
        <div class="item-content">
          <div class="date">{{ exp.dateFrom }}{{ exp.dateTo }}</div>
          <!--<div class="title">{{ exp.title }}</div>-->
          <div class="date">{{ exp.desc4 }}</div>
          <div class="date">{{ exp.desc }}</div>
          <div class="date">{{ exp.desc1 }}</div>
          <div class="date">{{ exp.desc2 }}</div>
          <div class="date">{{ exp.desc3 }}</div>
        </div>
      </div>
    </div>
    <scroll-down></scroll-down>
  </div>
</template>

<script>
  import scrollDown from '@/components/scrollDown'

  export default {
    name: 'Demo',
    props: {
      experiences: {
        type: Array
      }
    },
    components: {
      'scroll-down': scrollDown
    },
    data () {
      return {
        resizeTimer: false,
        contentScrollTop: 0,
        touchY: 0
      }
    },
    mounted () {
      this.$nextTick(() => {

        this.checkContentHeight()

        window.onresize = () => {
          if (!this.resizeTimer) {
            this.resizeTimer = true

            this.checkContentHeight()

            setTimeout(() => {
              this.resizeTimer = false
            }, 500)
          }
        }

        this.$refs.exContent.addEventListener('scroll', this.checkScrollEnd, true)
      })
    },
    methods: {
      // 检测内容是否超过容器的高度
      checkContentHeight () {
        const content = document.getElementsByClassName('experience-content')[0]
        this.$emit('overheight', content.scrollHeight > content.clientHeight)
      },
      checkScrollEnd (e) {

        const el = e.target

        if (el.scrollTop + el.clientHeight + 10 < el.scrollHeight) return

        // 交互友好：滚动到底部后，不立刻滚动到下一页
        setTimeout(() => {
          this.$emit('overheight', false)
        }, 1000)
      },
      /* 移动端滚动 */
      touchStart (evt) {
        this.touchY = evt.changedTouches[0].pageY
      },
      touchEnd (evt) {
        const distanceY = evt.changedTouches[0].pageY - this.touchY
        evt.target.scrollTop = evt.target.scrollTop - distanceY
      }
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .demo
    position: absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    width: 100%
    height: 85vh
    margin-top: 15vh
    background-color: #333
    .experience-content
      height: calc(85vh - 100px - 8vh)
      overflow-y: auto
      margin: 4vh 0
      .experience-item
        margin: 0 auto
        padding: 4vh 0 4vh 5vw
        width: 70vw
        .item-index
          display: inline-block
          vertical-align: middle
          width: 100px
          font-size: 10px
          font-family: 'Times New Roman'
          font-weight: 700
          line-height: 30px
          letter-spacing: 4px
          color: #bbb
          text-align: right
        .item-content
          display: inline-block
          vertical-align: middle
          width: calc(70vw - 130px)
          margin-left: 30px
          text-align: left
          .date
            margin-top 10px
            font-size: 18px
            line-height: 20px
            letter-spacing: 1px
            color: #ccc
          .title
            display: inline-block
            margin-left: 20px
            font-size: 14px
            line-height: 25px
            font-weight: bold
            letter-spacing: 3px
            color: #eee
          .desc
            margin-top: 10px
            font-size: 13px
            line-height: 30px
            letter-spacing: 3px
            color: #aaa

  @media only screen and (max-width: 640px) and (max-aspect-ratio: 1/1)
    .demo
      height: 89vh
      margin-top: 11vh
      .experience-content
        height: calc(89vh - 100px - 8vh)
        .experience-item
          padding: 4vh 0 4vh 8vw
          .item-index
            display: block
            width: 64vw
            text-align: center
          .item-content
            display: block
            width: 64vw
            margin-left: 0
            text-align: left
            .title
              margin-left: 10px
</style>
