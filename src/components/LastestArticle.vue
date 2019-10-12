<template>
  <div class="latest-article">
    <h2>近期文章</h2>
    <ul>
      <li v-for="la in lastestArticles" :key="la">
        <router-link :to="`/article/${la.id}`">{{la.title}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    lastestArticles: {
      required: true,
      type: Array
    }
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.latest-article
  h2
    font-weight 500
    font-size 18px
  li
    font-size 14px
    line-height 28px
    a
      text-decoration none
      color #000
</style>
