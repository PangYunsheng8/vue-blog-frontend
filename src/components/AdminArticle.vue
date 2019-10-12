<template>
  <md-table-card>
    <md-table v-model="articles" @md-selected="selectedArticle = $event" md-sort="name" md-sort-order="asc">
      <md-table-toolbar>
        <h1 class="md-title">文章管理</h1>
        <md-button id="article-add" class="md-icon-button" @click.stop.prevent="addArticle"><md-icon>add</md-icon></md-button>
      </md-table-toolbar>

      <md-table-row slot="md-table-row" slot-scope="{ item }" md-selectable="multiple" md-auto-select>
        <md-table-cell md-label="id" md-sort-by="id">{{ item.id }}</md-table-cell>
        <md-table-cell md-label="标题" md-sort-by="title">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="标签" md-sort-by="target">{{ item.tags.map(i=>i.name).join(',') }}</md-table-cell>
        <md-table-cell md-label="作者" md-sort-by="user">{{ item.user.username }}</md-table-cell>
        <md-table-cell md-label="发布时间" md-sort-by="createdAt">{{ item.createdAt | datetime}}</md-table-cell>
        <md-table-cell md-label="修改时间" md-sort-by="updatedAt">{{ item.updatedAt | datetime}}</md-table-cell>
        <md-table-cell md-label="操作">
          <md-button :id="'article-edit-'+item.id" class="md-icon-button" @click.stop.prevent="edit(item.id)"><md-icon>edit</md-icon></md-button>
          <md-button :id="'article-remove-'+item.id" class="md-icon-button" @click.stop.prevent="remove(item.id)"><md-icon>delete</md-icon></md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>

    <md-button id="article-remove-all" class="rm-all-btn md-icon-button" :disabled="selectedArticle.length==0" @click="removeAll">
      <md-icon>delete</md-icon>
    </md-button>

    <md-table-pagination
      :md-size="pagination.pageSize"
      :md-total="pagination.total"
      :md-page="page"
      md-label="单页文章数"
      md-separator="of"
      :md-page-options="[5, 10, 25, 30]"
      @pagination="onPagination">
    </md-table-pagination>

    <md-dialog :md-open-from="'#article-edit-'+currId" :md-close-to="'#article-edit-'+currId" :md-active.sync="showDialog">
      <md-dialog-title>修改文章</md-dialog-title>
      <md-dialog-content>
          <article-editor :a-id="currId" @article="currArticle=$event"></article-editor>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = fasle">取消</md-button>
        <md-button class="md-primary" @click="articleCommit()">确认</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-open-from="'#article-add'" :md-close-to="'#article-add'" :md-active.sync="showAddDialog">
      <md-dialog-title>添加文章</md-dialog-title>
      <md-dialog-content>
          <article-editor @article="currArticle=$event"></article-editor>
      </md-dialog-content>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showAddDialog = fasle">取消</md-button>
        <md-button class="md-primary" @click="articleCommit()">确认</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog-confirm
      :md-active.sync="showRemoveDialog"
      md-title="确认删除"
      :md-content="removeHit"
      md-confirm-text="删除"
      md-cancel-text="取消"
      @md-confirm="onConfirm"/>

    <md-dialog-confirm
      :md-active.sync="showRemoveAllDialog"
      md-title="确认删除"
      :md-content="removeAllHit"
      md-confirm-text="删除"
      md-cancel-text="取消"
      @md-confirm="onConfirmAll"/>
  </md-table-card>
</template>

<script>
import axios from 'axios'
import ArticleEditor from './ArticleEditor'
export default {
  name: 'admin-article',
  components: {
    ArticleEditor
  },
  data () {
    return {
      articles: [],
      showDialog: false,
      showRemoveDialog: false,
      showRemoveAllDialog: false,
      showAddDialog: false,
      currArticle: {},
      currId: null,
      pagination: {},
      page: 1,
      selectedArticle: []
    }
  },
  computed: {
    removeHit () {
      let title = this.articles.filter(i => i.id === this.currId)[0]
      if (title) {
        title = title.title
      }
      return `
        确认删除文章吗？
        id:${this.currId}<br/>
        标题为：${title}
      `
    },
    removeAllHit () {
      return `
        确认删除${this.selectedArticle.length}篇文章吗？
      `
    }
  },
  created () {
    axios.get('http://localhost:3000/api/article').then(({data: res}) => {
      if (!res.err) {
        this.articles = res.data
        this.pagination = res.pagination
      } else {
        console.log('err')
      }
    })
  },
  methods: {
    onPagination (pagination) {
      console.log(pagination)
      this.page = pagination.page
      this.pagination.pageSize = pagination.size
      // axios.get(`http://localhost:3000/api/article?offset=`).then(({data: res}) => {
      //   if (!res.err) {
      //     this.articles = res.data
      //     this.pagination = res.pagination
      //   } else {
      //     console.log('err')
      //   }
      // })
    },
    edit (id) {
      this.currId = id
      setTimeout(() => {
        this.showDialog = true
      }, 0)
    },
    remove (id) {
      this.currId = id
      setTimeout(() => {
        this.showRemoveDialog = true
      }, 0)
    },
    addArticle () {
      this.currId = null
      setTimeout(() => {
        this.showAddDialog = true
      }, 0)
    },
    onConfirm () {
      axios.delete(`http://localhost:3000/api/article/${this.currId}`).then(({data: res}) => {
        if (res.err) {
          alert('删除失败')
        } else {
          alert('删除成功')
          this.articles = this.articles.filter(i => i.id !== this.currId)
        }
      })
    },
    onConfirmAll () {
      Promise.all(this.selectedArticle.map(i => axios.delete(`http://localhost:3000/api/article/${i.id}`))).then((resArr) => {
        let res = resArr.reduce((i, j) => i || j.data.err, 0)
        if (res) {
          alert('删除失败')
        } else {
          alert('删除成功')
          this.articles = this.articles.filter(i => !this.selectedArticle.map(i => i.id).includes(i.id))
          this.selectedArticle = []
        }
      })
    },
    articleCommit () {
      if (this.currId) { // 如果有articleId，说明是修改文章，用put方法
        axios.put(`http://localhost:3000/api/article/${this.currId}`, this.currArticle).then(({data: res}) => {
          if (res.err) {
            alert('修改失败')
          } else {
            alert('修改成功')
            Object.assign(this.articles.filter(i => i.id === this.currId)[0], this.currArticle)
          }
        })
        this.showDialog = false
      } else { // 如果没有articleId，说明是添加文章，用post方法
        axios.post('http://localhost:3000/api/article', this.currArticle).then(res => {
          if (res.data.err) {
            alert('提交失败')
          } else {
            alert('提交成功')
          }
        })
        this.showAddDialog = false
      }
    },
    removeAll () {
      setTimeout(() => {
        this.showRemoveAllDialog = true
      }, 0)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rm-all-btn{
  margin-left: 12px
}
</style>
