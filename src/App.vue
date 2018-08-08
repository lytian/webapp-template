<template>
  <el-container>
    <el-header class="header">Header</el-header>
    <el-main>
      <router-view />
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable.styl'

.header
  text-align center
  line-height 60px
  font-size 18px
  background $color-background-d
</style>
