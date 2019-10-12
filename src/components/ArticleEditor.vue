<template>
  <div class="main">
    <form @submit.stop.prevent="articleCommit" action="/api/article">
    <md-layout md-gutter>
      <md-layout md-flex-xsmall='100' md-flex-medium='66'>
        <md-field>
          <label>文章标题</label>
          <md-input v-model="article.title"></md-input>
        </md-field>
      </md-layout>
      <md-layout md-flex-xsmall='100' md-flex-medium='33'>
        <md-field>
          <label>文章标签</label>
          <md-input v-model="computedTag"></md-input>
        </md-field>
      </md-layout>
    </md-layout>
    <vue-editor v-model="article.content"></vue-editor>
    </form>
  </div>
</template>

<script>
import axios from 'axios'
import { VueEditor } from 'vue2-editor'
export default {
  name: 'article-editor',
  components: {
    VueEditor
  },
  props: {
    aId: {
      type: Number
    }
  },
  data () {
    return {
      article: {
        title: '',
        tags: '',
        content: ''
      }
    }
  },
  computed: {
    computedTag () {
      if (this.article.tags === '') {
        return ''
      } else {
        return this.article.tags.map(i => i.name).join(',')
      }
    }
  },
  methods: {
  },
  watch: {
    'aId': {
      handler (newVal) {
        let articleId = this.aId
        if (articleId) {
          axios.get(`http://localhost:3000/api/article/${articleId}`).then(({data: res}) => {
            if (res.err) {
              alert('加载文章出错')
            } else {
              this.article = res.data
            }
          })
        }
      },
      deep: true,
      immediate: true
    },
    'article': {
      handler (newVal) {
        this.$emit('article', newVal)
      },
      deep: true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
