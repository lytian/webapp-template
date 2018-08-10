<template>
  <div class="home-wrapper">
    <img src="../../assets/logo.png"/>
    <p class="desc">感谢您使用vincent-cli脚手架。</p>
    <router-link to="/doc" class="link">查看webapp模板文档</router-link>
  </div>
</template>

<style lang="stylus" scoped>
@import '~assets/stylus/variable.styl'

.home-wrapper
  text-align center
  .desc
    font-size $font-size-medium-x
    color $color-text-d
    margin-bottom 16px
  .link
    font-size $font-size-medium
    color $color-theme
  img
    width 120px
    margin 110px auto 80px auto
</style>
