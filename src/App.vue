<template>
  <div id="app"
       ref="app"
       @touchstart="touchStart"
       @touchend="touchEnd"
  >
    <transition-group :name="menuSlide" tag="div" class="main">
      <!--<projects :projects="resumeData.projects"-->
                <!--:has-sizes="hasSizes"-->
                <!--key="projects"-->
                <!--:slideIn="slideIn"-->
                <!--v-if="selectedMenu===0"-->
                <!--@show-project="showProject"-->
      <!--&gt;</projects>-->
      <demo :experiences="resumeData.demo"
            key="experience"
            v-if="selectedMenu===0"
            @overheight="overHeight"></demo>
      <introduction :intro="resumeData.intro"
                    :has-sizes="hasSizes"
                    key="introduction"
                    v-if="selectedMenu===1"
      ></introduction>
      <experience :experiences="resumeData.experiences"
                  key="experience"
                  v-if="selectedMenu===2"
                  @overheight="overHeight"
      ></experience>
      <contact :contacts="resumeData.contacts"
               key="contact"
               v-if="selectedMenu===3"
      ></contact>
    </transition-group>
    <div class="sidebar">
      <span class="text">{{ resumeData.menu[selectedMenu].eng.toUpperCase() }}</span>
    </div>
    <v-header :state="state"
              :menu="resumeData.menu"
              @go-to-page="goToPage"
    ></v-header>
    <project :projects="resumeData.projects"
             :has-sizes="hasSizes"
             :isProjectShowed="isProjectShowed"
             :project-index="projectIndex"
             @hide-project="hideProject"
    ></project>
  </div>
</template>

<script>
import vheader from '@/components/vheader'
import projects from '@/views/Projects'
import introduction from '@/views/Introduction'
import experience from '@/views/Experience'
import project from '@/views/Project'
import contact from '@/views/Contact'
import demo from '@/views/demo'

export default {
  name: 'app',
  data () {
    return {
      state: false,
      slideIn: false,
      selectedMenu: 0,
      isScrolled: false,
      isHeightOverflow: false,
      menuSlide: 'slide-up',
      isProjectShowed: false,
      projectIndex: -1,
      bodyHeight: document.body.clientHeight,
      resizeTimer: false,
      touchY: 0,
      resumeData: {
        menu: [
          {
            chi: '项目',
            eng: 'PROJECTS'
          },
          {
            chi: '介绍',
            eng: 'INTRODUCTION'
          },
          {
            chi: '经历',
            eng: 'EXPERIENCE'
          },
          {
            chi: '联系',
            eng: 'CONTACT'
          }
        ],
        projects: [
          {
            title: '项目一',
            img: 'cover1',
            pics: {
              mobile: [
                {
                  id: '8d12c0e8-e6ab-55ac-9692-a993757e63b7',
                  pic: 'rm0'
                },
                {
                  id: '9d12c0e8-e6ab-55ac-9692-a993757e63b7',
                  pic: 'rm1'
                },
                {
                  id: '1d12c0e8-e6ab-55ac-9692-a993757e63b7',
                  pic: 'rm0'
                },
                {
                  id: '5818d3be-49e4-5ff6-9b78-858d5cd267a6',
                  pic: 'rm1'
                },
                {
                  id: '909dd909-cc8b-50f3-815d-8c65b0f61fe4',
                  pic: 'rm0'
                },
                {
                  id: '909dd979-cc8b-50f3-815d-8c65b0f61fe4',
                  pic: 'rm1'
                }
              ],
              pc: [
                {
                  id: '3b35498f-f876-546a-a218-37080d25e611',
                  pic: 'r0'
                },
                {
                  id: '3b85498f-f876-546a-a218-37080d25e611',
                  pic: 'r1'
                },
                {
                  id: '4b35498f-f876-546a-a218-37080d25e611',
                  pic: 'r0'
                },
                {
                  id: '5b35498f-f876-546a-a218-37080d25e611',
                  pic: 'r1'
                },
                {
                  id: '6b35498f-f876-546a-a218-37080d25e611',
                  pic: 'r0'
                },
                {
                  id: '6b36498f-f876-546a-a218-37080d25e611',
                  pic: 'r1'
                }
              ]
            },
            info: {
              demo: 'http://eeewl1250.gitee.io/resume/',
              github: 'https://github.com/eeewl1250/resume'
            }
          },
          {
            title: '这是项目二二二二',
            img: 'cover2',
            pics: {
              pc: [
                {
                  id: '3b35498f-f876-546a-a218-37080d25e611',
                  pic: 'r0'
                },
                {
                  id: '0f20edd8-4776-5d33-8d1f-78b91b551e29',
                  pic: 'r1'
                },
                {
                  id: 'b6cd74b0-f1ee-53fa-a54f-be408ec6e7d3',
                  pic: 'r0'
                }
              ]
            },
            info: {
              demo: 'http://eeewl1250.gitee.io/resume/',
              github: 'https://github.com/eeewl1250/resume'
            }
          },
          {
            title: '项目三在此',
            img: 'cover3',
            pics: {
              mobile: [
                {
                  id: '8d12c0e8-e6ab-55ac-9692-a993757e63b7',
                  pic: 'rm0'
                },
                {
                  id: '5818d3be-49e4-5ff6-9b78-858d5cd267a6',
                  pic: 'rm1'
                },
                {
                  id: '909dd909-cc8b-50f3-815d-8c65b0f61fe4',
                  pic: 'rm0'
                },
                {
                  id: 'cfcd5e9a-d561-5cd5-a825-7380613dfbc4',
                  pic: 'rm1'
                }
              ]
            },
            info: {
              demo: 'http://eeewl1250.gitee.io/resume/',
              github: 'https://github.com/eeewl1250/resume'
            }
          }
        ],
        demo: [
          {
            dateFrom: '我叫胡涛,',
            dateTo: '是一名正在求职的前端开发者',
            desc: '熟悉前后端分离，移动端开发，小程序，APP开发',
            desc4:'掌握基础前端技能，html，css，JavaScript',
            desc1:'掌握的主流前端框架有，vue，angular',
            desc2:'掌握ionic，Cordova，typescript，mpvue，uin-app，能够独立开发APP与小程序应用',
            desc3:'正在学习flutter与dart'
          },


        ],
        intro: {
          name: '胡涛',
          info: [
            '我热衷于学习新的东西，求知欲强',
            '拥有良好的思维能力以及沟通能力  ',
            '喜欢看书，喝茶，煮咖啡...',
            '乐于去尝试新的东西，敢于接受挑战',
          ]
        },
        experiences: [
          {
            dateFrom: '2018-06',
            dateTo: '2018-10',
            title: '丽江云创（前端开发）',
            desc: '使用ionic，Cordova，angular，typescript进行可去考学车（教练）APP开发，在项目开发的前期阶段我负责可去考教练的开发，项目中后期我负责Android平台开发'
          },
          {
            dateFrom: '2018-11',
            dateTo: '2019-05',
            title: '云南旷视（前端开发）',
            desc: '负责公司外包项目开发，主要使用vue，Cordova来进行APP开发，使用mpvue，原生小程序来进行小程序开发'
          },

        ],
        contacts: {
          name: '胡涛',
          address: '云南省 昆明市 官渡区 ',
          mobile: '133-2041-7674',
          email: '690690413@qq.com',
          website: '690690413（QQ && 微信）'
        }
      },
      hasSizes: true
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.state = true
      this.slideIn = true
      setTimeout(() => {
        this.slideIn = false
      }, 2000)
      // 监听视口变化
      window.onresize = () => {
        if (!this.resizeTimer) {
          this.bodyHeight = document.body.clientHeight

          this.resizeTimer = true
          setTimeout(() => {
            this.resizeTimer = false
          }, 400)
        }
      }
      // 兼容不支持img的srcset和sizes属性的浏览器
      this.hasSizes = 'sizes' in document.createElement('img')
      // 监听滚轮事件
      this.$util.initWheelListener(window, document)
      window.addWheelListener(this.$refs.app, this.changeMenu)
    })
  },
  components: {
    'v-header': vheader,
    demo,
    introduction,
    experience,
    project,
    contact,

  },
  methods: {
    /* 移动端触摸事件 */
    touchStart (evt) {
      const changedTouch = evt.changedTouches[0]
      this.touchY = changedTouch.pageY
    },
    touchEnd (evt) {
      const changedTouch = evt.changedTouches[0]
      const distanceY = this.touchY - changedTouch.pageY
      if (Math.abs(distanceY) < 50) return
      this.changeMenu({ deltaY: distanceY })
    },
    changeMenu (e) {
      // project页面出现时，禁止底层滚动
      // 滚动切换project中的图片
      if (this.isProjectShowed) return

      // 页面内容超过窗口高度，滚动页面内容
      if (this.isHeightOverflow) return

      // 1s内滚动只生效一次
      if (this.isScrolled) return
      // 禁止projects的入场动画
      this.slideIn = false
      //  切换menu
      this.isScrolled = true
      const len = this.resumeData.menu.length
      this.selectedMenu = (this.selectedMenu + (e.deltaY < 0 ? -1 : 1) + len) % len
      this.menuSlide = e.deltaY < 0 ? 'slide-down' : 'slide-up'

      // 1s内滚动只生效一次
      setTimeout(() => {
        this.isScrolled = false
      }, 1000)
    },
    showProject (projectIndex) {
      this.isProjectShowed = true
      this.projectIndex = projectIndex
    },
    hideProject () {
      this.isProjectShowed = false
    },
    goToPage (index) {
      this.selectedMenu = index
      this.isHeightOverflow = false
    },
    overHeight (isOverHeight) {
      this.isHeightOverflow = isOverHeight
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
html
  font-size: 14px
#app
  font-family: 'Microsoft YaHei UI Light', Roboto, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  font-size: 0
  color: #2c3e50
  .sidebar
    position: fixed
    left: calc(10vw - 100px)
    top: 50vh
    width: 200px
    transform: rotate(-90deg)
    text-align: center
    .text
      display: inline-block
      padding: 3px 0
      font-size: 13px
      color: #bbb
      letter-spacing: 3px
      cursor: default
      transition: all 0.6s
      &:after
        display: block
        position: absolute
        right: 0
        margin-top: 5px
        content: '.'
        width: 0
        height: 0
        overflow: hidden
        border-bottom: 1px solid #bbb
        transition: all 0.6s
      &:hover
        color: #999
        transform: scaleX(1.3)
        transition: all 0.6s
        &:after
          border-bottom-color: #999
          left: 0
          width: 100%
          transition: all 0.6s
  .main
    position: fixed
    top: 0
    bottom: 0
    left: 0
    right: 0
    .slide-up-enter
      top: 100vh
      opacity: 0
    .slide-up-enter-to, .slide-up-leave
      top: 0
      opacity: 1
    .slide-up-leave-to
      top: -100vh
      opacity: 0
    .slide-up-enter-active, .slide-up-leave-active
      transition: all 1s

    .slide-down-enter
      top: -100vh
      opacity: 0
    .slide-down-enter-to, .slide-down-leave
      top: 0
      opacity: 1
    .slide-down-leave-to
      top: 100vh
      opacity: 0
    .slide-down-enter-active, .slide-down-leave-active
      transition: all 1s
</style>
