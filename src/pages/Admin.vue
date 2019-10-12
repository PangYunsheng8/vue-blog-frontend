<template>
  <div class="admin">
    <md-tabs class="md-primary" md-alignment="centered">
      <md-tab id="tab-home" md-label="文章管理" md-icon="assignment">
          <admin-article></admin-article>
      </md-tab>
      <md-tab id="tab-pages" md-label="标签管理" md-icon="bookmark"></md-tab>
      <md-tab id="tab-posts" md-label="分类管理" md-icon="class"></md-tab>
      <md-tab id="tab-favorites" md-label="用户管理" md-icon="person"></md-tab>
    </md-tabs>
  </div>
</template>

<script>
import AdminArticle from '../components/AdminArticle'
export default {
  name: 'Admin',
  components: {
    AdminArticle
  },
  data () {
    return {
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
