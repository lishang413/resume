<template>
  <transition name="pop-out">
    <div class="project-detail" v-if="isProjectShowed" @click.self="close" @wheel="changePic">
      <div class="close" @click="close">
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <div class="gallery" @click.self="close" v-if="projects[projectIndex]">
        <div class="title">{{ projects[projectIndex].title }}</div>
        <div class="gallery-content">
          <div class="pic-nav">
            <span class="mobile"
                  :class="{'hover': isMobilePicShowing}"
                  v-if="hasMobilePic"
                  @click="showMobile(true)"
            >移动端样式</span>
            <span class="slash" v-if="hasMobilePic && hasPcPic">/</span>
            <span class="pc"
                  :class="{'hover': !isMobilePicShowing}"
                  v-if="hasPcPic"
                  @click="showMobile(false)"
            >客户端样式</span>
          </div>
          <transition-group class="display-mobile display"
                            name="change-pic"
                            tag="div"
                            v-if="isMobilePicShowing"
          >
            <a class="display-item"
               v-for="pic in galleryPics(picTypes.MOBILE).filter((v, i) => i === showedItemIdx)"
               :key="pic.id"
               :href="imgPath + pic.pic + '_938.jpg'"
               target="_blank"
            >
              <img v-if="hasSizes"
                   :src="imgPath + pic.pic + '_480.jpg'"
                   :srcset="imgPath + pic.pic + '_480.jpg 480w,'
                          + imgPath + pic.pic + '_640.jpg 640w,'
                          + imgPath + pic.pic + '_720.jpg 720w,'
                          + imgPath + pic.pic + '_938.jpg 938w'"
                   sizes="calc(70vh * 375 / 667 - 2px)"
                   :alt="projects[projectIndex].title + '移动端图片'"
              />
              <img  v-if="!hasSizes"
                    :src="imgPath + pic.pic + '_480.jpg'"
                    :class="{ 'size-control': !hasSizes }"
                    :alt="projects[projectIndex].title + '移动端图片'"
              />
            </a>
          </transition-group>
          <transition-group class="display-pc display"
                            name="change-pic"
                            tag="div"
                            v-else
          >
            <a class="display-item"
               v-for="pic in galleryPics(picTypes.PC).filter((v, i) => i === showedItemIdx)"
               :key="pic.id"
               :href="imgPath + pic.pic + '_1920.jpg'"
               target="_blank"
            >
              <img v-if="hasSizes"
                   :src="imgPath + pic.pic + '_480.jpg'"
                   :srcset="imgPath + pic.pic + '_480.jpg 480w,'
                          + imgPath + pic.pic + '_720.jpg 720w,'
                          + imgPath + pic.pic + '_960.jpg 960w,'
                          + imgPath + pic.pic + '_1280.jpg 1280w,'
                          + imgPath + pic.pic + '_1536.jpg 1536w,'
                          + imgPath + pic.pic + '_1728.jpg 1728w,'
                          + imgPath + pic.pic + '_1920.jpg 1920w'"
                   sizes="(max-aspect-ratio: 1/1) calc(100vw - 2px),
                          (min-aspect-ratio: 8/5) calc(60vw - 2px),
                          (min-aspect-ratio: 12/5) calc(45vw - 2px),
                          calc(70vw - 2px)"
                   :alt="projects[projectIndex].title + 'PC端图片'"
              />
              <img  v-if="!hasSizes"
                    :src="imgPath + pic.pic + '_720.jpg'"
                    :class="{ 'size-control': !hasSizes }"
                    :alt="projects[projectIndex].title + 'PC端图片'"
              />
            </a>
          </transition-group>
          <div class="controls" :class="{'pc-pic':!isMobilePicShowing}">
            <span class="prev" @click="prev">PREV</span>
            <span class="slash">/</span>
            <span class="next" @click="next">NEXT</span>
          </div>
        </div>
        <ul class="tab">
          <li class="item"
              v-for="i in galleryPics(picType).length"
              :key="i"
              :class="{ chosen: i - 1 === showedItemIdx }"
              @click="showItem(i)"
          ></li>
        </ul>
        <div class="info">
          <a :href="infos.demo" target="_blank">DEMO</a>
          <a :href="infos.github" target="_blank">GITHUB</a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Project',
  props: {
    projectIndex: {
      type: Number,
      default: -1
    },
    isProjectShowed: {
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
      showedItemIdx: 0,
      hasMobilePic: true,
      hasPcPic: false,
      isMobilePicShowing: true,
      picTypes: {
        MOBILE: 'mobile',
        PC: 'pc'
      },
      imgPath: (process.env.NODE_ENV === 'production'
          ? '/resume/'
          : '/')
      + 'static/img/'
    }
  },
  computed: {
    infos () {
      return this.projects[this.projectIndex].info
    },
    pics () {
      return this.projects[this.projectIndex].pics
    },
    picType () {
      return this.isMobilePicShowing ? this.picTypes.MOBILE : this.picTypes.PC
    }
  },
  watch: {
    // 显示project时，初始化显示设置
    isProjectShowed (val) {
      if (!val) return
      this.hasMobilePic = !!this.pics.mobile
      this.hasPcPic = !!this.pics.pc
      this.isMobilePicShowing = this.hasMobilePic
    }
  },
  methods: {
    galleryPics (type) {
      return this.pics[type] ? this.pics[type] : []
    },
    close () {
      this.$emit('hide-project')
      this.showedItemIdx = 0
    },
    showItem (itemIdx) {
      this.showedItemIdx = itemIdx - 1
    },
    prev () {
      const len = this.pics[this.picType].length
      this.showedItemIdx = (this.showedItemIdx + len - 1) % len
    },
    next () {
      const len = this.pics[this.picType].length
      this.showedItemIdx = (this.showedItemIdx + 1) % len
    },
    changePic (e) {
      if (e.wheelDelta > 0) {
        this.prev()
      } else {
        this.next()
      }
    },
    showMobile (isMobiePic) {
      this.isMobilePicShowing = isMobiePic
    }
  }
}
</script>

<style  lang="stylus" rel="stylesheet/stylus">
.project-detail
  position: fixed
  z-index: 2
  left: 0
  right: 0
  top: 0
  bottom: 0
  background-color: rgba(0, 0, 0, 0.85)
  .close
    position: absolute
    z-index: 10
    right: 5vh
    top: 5vh
    padding: 30px 20px
    cursor: pointer
    &:hover
      .line
        transition: all 0.5s
        box-shadow: 0 0 10px 1px rgba(255, 255, 255, 0.5)
    .line
      width: 26px
      height: 0
      border-top: 1px solid #aaa
      transform: rotate(45deg)
      transition: all 0.5s
      &:last-child
        margin-top: -1px
        transform: rotate(-45deg)
  .gallery
    position: fixed
    left: 0
    right: 0
    top: 0
    bottom: 0
    .title
      width: 100vw
      height: 10vh
      text-align: center
      font-size: 14px
      line-height: 10vh
      letter-spacing: 3px
      color: #888
    .gallery-content
      position: relative
      height: calc(100vh - 15vh - 53px)
      /* 移动端项目图尺寸 */
      mh = 70vh
      mw = mh * (375 / 667)
      /* PC端项目图尺寸 */
      pw = 70vw
      ph = pw * (720 / 1536)
      .pic-nav
        position: relative
        margin-top: -3vh
        height: 3vh
        .mobile, .pc, .slash
          display: inline-block
          font-size: 12px
          color: #888
          letter-spacing: 2px
          transform: scaleY(0.8)
        .mobile, .pc
          position: relative
          padding: 8px
          cursor: pointer
          transition: all 0.5s
          &:hover, &.hover
            color: #ccc
            transition: all 0.5s
      .display
        position: relative
        top: 50%
        margin: 0 auto
        &.display-mobile
          width: mw
          height: mh
          margin-top: (- mh / 2)
          .display-item
            img
              &.size-control
                width: "calc(%s - 2px)" % mw
                height: "calc(%s - 2px)" % mh
        &.display-pc
          width: pw
          height: ph
          margin-top: (- ph / 2)
          .display-item
            img
              &.size-control
                width: "calc(%s - 2px)" % pw
                height: "calc(%s - 2px)" % ph
        .display-item
          position: absolute
          left: 0
          top: 0
          width: calc(100% - 2px)
          cursor: zoom-in
          border: 1px solid #aaa
          img
            display: block
          &.change-pic-enter
            opacity: 0
            top: 20vh
          &.change-pic-leave-to
            opacity: 0
            top: -20vh
          &.change-pic-enter-to, &.change-pic-leave
            opacity: 1
            top: 0
          &.change-pic-enter-active, &.change-pic-leave-active
            transition: all 0.7s
      .controls
        position: absolute
        left: "calc(50% + %s / 2 + 20px)" % mw
        top: "calc(50% + %s / 2 - 113px)" % mh /* 长度113px */
        width: 120px /* 比实际大小大一些 */
        transform: rotate(90deg)
        transform-origin: 0 50%
        user-select: none
        .prev, .next, .slash
          display: inline-block
          font-size: 12px
          color: #888
          letter-spacing: 2px
          transform: scaleY(0.7)
        .prev, .next
          position: relative
          padding: 8px
          cursor: pointer
          transition: all 0.5s
          &:hover
            color: #ccc
            transition: all 0.5s
        &.pc-pic
          left: calc(50% - 113px / 2)
          top: "calc(50% + %s / 2 + 30px)" % ph /* 高度20px */
          transform: none
    .tab
      position: absolute
      bottom: 10vh
      margin: 3vh auto 0
      width: 100vw
      .item
        display: inline-block
        margin: 0 10px
        width: 20px
        height: 20px
        border-radius: 10px
        background-color: #585858
        cursor: pointer
        &.chosen
          background-color: #999
    .info
      position: absolute
      left: calc(50vw - 150px)
      bottom: 3vh
      width: 300px
      a
        position: relative
        display: inline-block
        padding: 10px 20px
        font-size: 13px
        color: #aaa
        transition: all 0.5s
        &:after
          position: absolute
          left: 50%
          display: block
          content: ' '
          margin-top: 4px
          width: 0
          height: 0
          border-top: 1px solid #aaa
          transition: all 0.5s
        &:hover
          color: #ccc
          transition: all 0.5s
          &:after
            left: 20px
            width: calc(100% - 40px)
            box-shadow: 0 0 10px 0 #fff
            transition: all 0.5s
  &.pop-out-enter
    left: 50vw
    right: 50vw
    opacity: 0
    .close
      opacity: 0
    .gallery
      top: 100vh
      opacity: 0
  &.pop-out-enter-to, &.pop-out-leave
    left: 0
    right: 0
    opacity: 1
    .close
      opacity: 1
    .gallery
      top: 0
      opacity: 1
  &.pop-out-leave-to
    opacity: 0
    .close
      opacity: 0
    .gallery
      top: -100vh
      opacity: 0
  &.pop-out-enter-active
    transition: all 0.6s ease-out
    .close
      transition: all 0.6s ease-out
    .gallery
      transition: all 0.6s ease-out
  &.pop-out-leave-active
    transition: all 0.4s ease-out
    .close
      transition: all 0.2s ease-out
    .gallery
      transition: all 0.3s ease-out

@media only screen and (min-aspect-ratio: 8/5)
  .project-detail
    .gallery
      .gallery-content
        pw = 60vw
        ph = pw * (720 / 1536)
        .display
          &.display-pc
            width: pw
            height: ph
            margin-top: (- ph / 2)
            .display-item
              img
                &.size-control
                  width: "calc(%s - 2px)" % pw
                  height: "calc(%s - 2px)" % ph
        .controls
          &.pc-pic
            top: "calc(50% + %s / 2 + 20px)" % ph

@media only screen and (min-aspect-ratio: 12/5)
  .project-detail
    .gallery
      .gallery-content
        pw = 45vw
        ph = pw * (720 / 1536)
        .display
          &.display-pc
            width: pw
            height: ph
            margin-top: (- ph / 2)
            .display-item
              img
                &.size-control
                  width: "calc(%s - 2px)" % pw
                  height: "calc(%s - 2px)" % ph
        .controls
          &.pc-pic
            top: "calc(50% + %s / 2 + 15px)" % ph

@media only screen and (max-aspect-ratio: 1/1)
  .project-detail
    .gallery
      .gallery-content
        pw = 100vw
        ph = pw * (720 / 1536)
        .display
          &.display-pc
            width: pw
            height: ph
            margin-top: (- ph / 2)
            .display-item
              img
                &.size-control
                  width: "calc(%s - 2px)" % pw
                  height: "calc(%s - 2px)" % ph
        .controls
          &.pc-pic
            top: "calc(50% + %s / 2 + 30px)" % ph
</style>
