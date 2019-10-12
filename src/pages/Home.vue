<template>
  <div class="main">
    <div class="col md-10 list" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10">
      <div class="item" v-for="article in articles" :key="article">
        <article-item :article="article"></article-item>
      </div>
    </div>
    <div class="col md-2 xs-12" >
      <lastest-article :lastestArticles="lastestArticles"></lastest-article>
      <archive :archives="archives"></archive>
      <target :targets="tags"></target>
    </div>
  </div>
</template>

<script>
import ArticleItem from '../components/ArticleItem'
import LastestArticle from '../components/LastestArticle'
import Archive from '../components/Archive'
import Target from '../components/Target'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    ArticleItem,
    LastestArticle,
    Archive,
    Target
  },
  data () {
    return {
      pagination: {
        pageSize: 10,
        total: 10,
        offset: 0,
        nextOffset: 0
      },
      articles: [],
      lastestArticles: [],
      archives: [],
      filter: {},
      tags: [],
      resource: 'article',
      queryId: null
    }
  },
  watch: {
    '$route': function (newVal) {
      this.initByRoute()
      this.loadMore()
    }
  },
  async created () {
    this.initByRoute()
    let {data: resLastestArticles} = await axios.get('http://localhost:3000/api/lastest-article')
    let {data: resArchives} = await axios.get('http://localhost:3000/api/archive')
    let {data: resTags} = await axios.get('http://localhost:3000/api/tag')
    this.lastestArticles = resLastestArticles.data
    this.archives = resArchives.data
    this.tags = resTags.data
  },
  methods: {
    loadMore () {
      if (this.pagination.nextOffset != null) {
        axios.get(`http://localhost:3000/api/${this.resource}?pageSize=${this.pagination.pageSize}&offset=${this.articles.length}&filter=${JSON.stringify(this.filter)}`).then(res => {
          if (!res.err) {
            this.articles = [...this.articles, ...res.data.data]
            this.pagination = res.data.pagination
          } else {
            console.log('err')
          }
        })
      }
    },
    initByRoute () {
      const name = this.$route.name
      if (name === 'Archive') {
        const {year, month} = this.$route.params
        this.filter = {
          createdAt: {
            '$lt': `${year}-${+month + 1}-1`,
            '$gte': `${year}-${month}-1`
          }
        }
        this.resource = 'article'
      } else if (name === 'Target') {
        const {id} = this.$route.params
        this.queryId = id
        this.resource = 'article/tag/' + this.queryId
        this.filter = {}
      } else if (name === 'Home') {
        this.filter = {}
        this.resource = 'article'
      }
      this.pagination = {
        pageSize: 10,
        total: 10,
        offset: 0,
        nextOffset: 0
      }
      this.articles = []
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/base.css";
.main{
  margin-top: 2px;
}
.list{
  padding: 0 100px 0 0;
}
.item{
  margin: 60px;
}
</style>
