<template>
  <div class="contact">
    <div class="title">
      <div class="chi">联系方式</div>
      <div class="eng">Contact</div>
    </div>
    <div class="content-wrapper">
      <div class="content">
        <p clas="name">{{ contacts.name }}</p>
        <p class="address">{{ contacts.address }}</p>
        <p class="mobile">
          <a :href="'tel:' + contacts.mobile">{{ contacts.mobile }}</a>
        </p>
        <p class="email">
          <a :href="'mailto:' + contacts.email">{{ contacts.email }}</a>
        </p>
        <p class="website">
          {{ contacts.website }}
        </p>
      </div>
    </div>
    <scroll-down></scroll-down>
  </div>
</template>

<script>
import scrollDown from '@/components/scrollDown'

export default {
  name: 'Contact',
  props: {
    contacts: {
      type: Object
    }
  },
  components: {
    'scroll-down': scrollDown
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
.contact
  position: absolute
  left: 0
  top: 0
  width: 100vw
  height: 100vh
  .title
    display: inline-block
    position: relative
    vertical-align: top
    width: 45vw
    height: 100vh
    .chi
      position: absolute
      right: 0
      bottom: calc(30vh + 100px + 1vh)
      font-size: 20px
      color: #999
    .eng
      position: absolute
      right: 0
      bottom: 30vh
      font-size: 100px
      color: #666
  .content-wrapper
    display: inline-block
    position: relative
    vertical-align: top
    width: 55vw
    height: 100vh
    .content
      position: absolute
      left: 10vw
      bottom: 30vh
      p
        font-size: 16px
        line-height: 40px
        letter-spacing: 3px
        text-align: left
        color: #666
        a
          display: inline-block
          color: #666
          font-weight: normal
          transition: all 0.5s
          &:after
            content: ' '
            display: block
            height: 0
            width: 0
            margin: -10px auto 0
            border-top: 1px solid transparent
            transition: all 0.5s
          &:hover
            color: #333
            transition: all 0.5s
            &:after
              width: 100%
              border-top-color: #999
              transition: all 0.5s

@media only screen and (max-width: 1000px)
  .contact
    .title
      .chi
        bottom: calc(30vh + 80px + 1vh)
        font-size: 18px
      .eng
        font-size: 80px
    .content-wrapper
      .content
        p
          font-size: 15px
          line-height: 37px
@media only screen and (max-width: 850px)
  .contact
    .title
      .chi
        bottom: calc(30vh + 65px)
        font-size: 16px
      .eng
        font-size: 65px
    .content-wrapper
      .content
        p
          font-size: 14px
          line-height: 34px

@media only screen and (max-aspect-ratio: 1/1)
  .contact
    .title, .content-wrapper
      display: block
      position: relative
      width: 70vw
      height: 30vh
      margin: 0 auto
    .title
      margin-top: 15vh
      .chi
        position: relative
        right: 0
        top: 10vh
        height: 5vh
        font-size: 16px
        line-height: 5vh
      .eng
        position: relative
        right: 0
        top: -5vh
        font-size: 40px
        height: 10vh
        line-height: 10vh
    .content-wrapper
      .content
        position: relative
        left: 0
        top: 0
        p
          font-size: 14px
          line-height: 6vh
          text-align: center
          a
            &:after
              display: none
</style>
