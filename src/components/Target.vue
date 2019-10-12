<template>
  <div class="archive">
    <h2>标签</h2>
    <ul>
      <li v-for="target in targets" :key="target">
        <router-link :to="`/article/tag/${target.id}`">{{target.name}}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    targets: {
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
  ul
    display flex
    display-warp warp
    li
        font-size 14px
        border 1px solid green
        margin 3px
        a
          text-decoration none
          color #000
</style>
