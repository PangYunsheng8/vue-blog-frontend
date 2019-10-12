<template>
  <div class="archive">
    <h2>文章归档</h2>
    <ul>
      <li v-for="archive in archives" :key="archive">
        <router-link :to="`/archive/${archive.year}/${archive.month}`">{{archive.date}}&nbsp;&nbsp;&nbsp;({{archive.count}})</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    archives: {
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
.archive
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
