<template>
  <div class="article-item">
    <h3>{{article.title}}</h3>
    <div class="desc">
      <span class="target">{{article.tags.map(i=>i.name).join(",")}}</span>
      <span class="circle"></span>
      <span class="date">{{article.createdAt | datetime('YYYY/MM/DD')}}</span>
      <span class="circle"></span>
      <span class="click-times">浏览 {{article.clickTimes}}</span>
      <!-- <router-link class="edit" :to="`/article/${article.id}/editor`">编辑</router-link> -->
      <!-- <md-button class="delete" type="submit" @click="deleteArticle()">删除</md-button> -->
    </div>
    <div class="content" v-if="showDetail">{{article.content}}</div>
    <div class="content" v-if="!showDetail">{{article.content | clip}}</div>
    <div v-if="!showDetail" class="view-article"><router-link :to="`/article/${article.id}`">查看文章</router-link></div>
  </div>
</template>

<script>
// import axios from 'axios'
export default {
  props: {
    showDetail: {
      type: Boolean,
      default: false
    },
    article: {
      required: true,
      type: Object
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // deleteArticle () {
    //   axios.delete(`http://localhost:3000/api/article/${this.article.id}`)
    // }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.article-item{
  h3{
    text-align center
  }
  .desc{
    text-align center
    display flex
    justify-content center
    align-items center
    .circle{
      height 4px
      width 4px
      background-color black
      border-radius 50%
    }
    .target,.date,.click-times{
      color gray
      font-size 13px
      margin 5px
    }
    .edit,.delete{
      padding 10px
    }
  }
  .content{
    margin-top 20px
    line-height 1.5
  }
  .view-article{
    text-align center
    margin 20px
    a{
      color #000
      text-decoration none

      &:after{
        content "|"
        font-weight 700
        display inline-block
        margin 0 10px
      }
      &:before{
        content "|"
        font-weight 700
        display inline-block
        margin 0 10px
      }
    }

  }
}
</style>
