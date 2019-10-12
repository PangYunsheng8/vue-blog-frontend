<template>
    <nav class="nav">
      <h1>码蜂社博客</h1>
      <ul class="links">
        <li><router-link to='/'>主页</router-link></li>
        <li><router-link to='/about'>关于</router-link></li>
        <template v-if="!isSignin">
          <li><a id="signin" href="#" @click.prevent="clickSignin">登录</a></li>
          <li><a id="signup" href="#" @click.prevent="clickSignup">注册</a></li>
        </template>
        <template v-if="isSignin">
          <li>欢迎你!{{user.username}}</li>
          <li><router-link to="/signout">注销</router-link></li>
          <li><router-link to="/admin">管理</router-link></li>
        </template>
      </ul>

      <md-dialog :md-active.sync="showSigninDialog">
        <md-dialog-title>登录</md-dialog-title>
        <md-dialog-content>
          <form class="form">
            <md-input-container>
              <label>用户名</label>
              <md-input v-model="user.username"></md-input>
            </md-input-container>
            <md-input-container>
              <label>密码</label>
              <md-input v-model="user.password"></md-input>
            </md-input-container>
          </form>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showSigninDialog = false">取消</md-button>
          <md-button class="md-primary" @click="signinSubmit">确认</md-button>
        </md-dialog-actions>
      </md-dialog>

      <md-dialog :md-active.sync="showSignupDialog">
        <md-dialog-title>注册</md-dialog-title>
        <md-dialog-content>
          <form>
            <md-input-container>
              <label>用户名</label>
              <md-input v-model="user.username"></md-input>
            </md-input-container>
            <md-input-container>
              <label>密码</label>
              <md-input v-model="user.password"></md-input>
            </md-input-container>
            <md-input-container>
              <label>重复密码</label>
              <md-input v-model="user.passwordRepeat"></md-input>
            </md-input-container>
            <md-input-container>
              <label>E-mail</label>
              <md-input v-model="user.email"></md-input>
            </md-input-container>
          </form>
        </md-dialog-content>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showSignupDialog = false">取消</md-button>
          <md-button class="md-primary" @click="signupSubmit">确认</md-button>
        </md-dialog-actions>
      </md-dialog>
    </nav>
</template>

<script>
import axios from 'axios'
export default {
  name: 'main-nav',
  data () {
    return {
      showSigninDialog: false,
      showSignupDialog: false,
      user: {
        username: null,
        password: null,
        passwordRepeat: null,
        email: null
      },
      siSignin: false
    }
  },
  async created () {
    let {data: res} = await axios.get('http://localhost:3000/api/session')
    if (!res.data) {
      this.isSignin = false
    } else {
      this.isSignin = true
      this.user = res.data
      window.localStorage.setItem('userId', this.user.id)
    }
  },
  watch: {
    '$route': function (newVal) {
      if (newVal.name === 'Signout') {
        this.isSignin = false
        this.user = {}
      }
    }
  },
  methods: {
    clickSignup () {
      this.showSignupDialog = true
    },
    clickSignin () {
      this.showSigninDialog = true
    },
    async signinSubmit () {
      let {data: res} = await axios.post('http://localhost:3000/api/session', this.user)
      if (res.err) {
        let info = res.info
        alert('登录失败: ' + info)
      } else {
        alert('登录成功')
        this.isSignin = true
        this.showSigninDialog = false
        window.localStorage.setItem('userId', res.data.id)
      }
    },
    signupSubmit () {

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.nav
  width 100%
  display flex
  justify-content space-between
  align-items center
  border-bottom 1px solid #eee

.links
  display flex

  li
    margin 0 10px

    a
      text-decoration none
    a:visited
      color #000

</style>
