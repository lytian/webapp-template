<template>
  <div class="fixed-box">
    <div class="top">
      <img src="../../assets/logo.png"/>
    </div>
    <p class="app-name">Vincent-cli</p>
    <ul class="form">
      <li>
        <!-- <img src="../../assets/img/login_user.png" /> -->
        <input v-model="username" placeholder="请输入用户名" />
      </li>
      <li>
        <!-- <img src="../../assets/img/login_password.png" /> -->
        <input type="password" v-model="password" placeholder="请输入密码" />
      </li>
    </ul>
    <p class="login-btn" @click="login">登录</p>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      if (this.username === '') {
        Toast('请输入用户名')
        return
      }
      if (this.password === '') {
        Toast('请输入密码')
        return
      }
      this.$localUser.set({
        id: 1,
        account: this.account,
        password: this.password
      })
      this.$router.replace('/')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/stylus/variable.styl'

.top
  height 60vw
  background $color-theme
  text-align center
  img
    width 125px
    margin-top 42px
.app-name
  height 50px
  margin -25px 30px 20px 30px
  border-radius 50px
  line-height 50px
  font-size 20px
  background #ffffff
  color #7b7b7b
  box-shadow 0 2px 8px #b0e1f0
  position relative
  z-index 1
  text-align center
.form
  margin 0 30px
  li
    padding 20px 0
    display flex
    justify-content space-between
    border-bottom 2px solid #D8D8D8
    img
      height 30px
    input
      border none
      width calc(100% - 50px)
      height 30px
      overflow hidden
      font-size 16px
      background-color transparent
      letter-spacing 2px
      color #333333
      &:focus
        outline none
.login-btn
  height 42px
  line-height 42px
  margin 50px 30px 30px 30px
  background $color-theme
  letter-spacing 1rem
  font-size 20px
  border-radius 42px
  color #ffffff
  text-align center
  box-shadow 0 2px 8px #b0e1f0
  &:hover
    background $color-theme-1
</style>
