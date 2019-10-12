<template>
  <div class="main">
    <div class="col md-8 list">
      <article-item :article="article" :show-detail="true"></article-item>
    </div>
    <div class="col md-4 xs-12" >
      <lastest-article :lastestArticles="lastestArticles"></lastest-article>
      <archive :archives="archives"></archive>
      <target :targets="targets"></target>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import ArticleItem from '../components/ArticleItem'
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Target from '../components/Target'
export default {
  name: 'article',
  components: {
    ArticleItem,
    LastestArticle,
    Archive,
    Target
  },
  data () {
    return {
      article: {},
      lastestArticles: [],
      archives: [],
      targets: [
        {
          id: 1,
          name: '前端'
        },
        {
          id: 1,
          name: 'css'
        },
        {
          id: 1,
          name: '爬虫'
        }
      ]
    }
  },
  methods: {
    getData (aid) {
      axios.get(`http://localhost:3000/api/article/${aid}`).then(({ data: res }) => {
        if (!res.err) {
          this.article = res.data
        } else {
          console.log(res.err)
          this.$router.push('/notfound')
        }
      })
    }
  },
  // created () {
  //   let { id: articleId } = this.$route.params
  //   this.getData(articleId)
  // },
  async created () {
    let { id: articleId } = this.$route.params
    this.getData(articleId)

    let {data: res} = await axios.get('http://localhost:3000/api/lastest-article')
    this.lastestArticles = res.data

    let {data: resArchives} = await axios.get('http://localhost:3000/api/archive')
    this.archives = resArchives.data
  },
  watch: {
    $route: function (newVal) {
      let { id: articleId } = newVal.params
      this.getData(articleId)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/base.css";
.main {
  margin-top: 2px;
}
.list {
  padding: 0 100px 0 0;
}
</style>
