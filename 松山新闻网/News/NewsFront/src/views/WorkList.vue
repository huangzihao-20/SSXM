<template>
  <div class="home">
    <el-row class="workmargin" style="margin-bottom:10px;">
      <el-input placeholder="请输入内容" v-model="findName">
        <i slot="prefix" class="el-input__icon el-icon-search"></i>
        <el-button slot="append" @click="find">搜索</el-button>
      </el-input>
    </el-row>
    <el-row>
      <el-col :sm="12" :lg="8" v-for="o in works" :key="o.workId" class="workinfo">
        <el-card class="workmargin" style="margin-right:10px;margin-bottom:10px;">
          <div class="imgDiv">
            <router-link :to="{name:'Work',params: {id:o.workId}}"><img :src="URL+'/'+o.workPicture" class="image"></router-link>
          </div>
          <div class="worktext nav">
            <div style="text-align:left">新闻事件：{{o.activityName}}</div>
            <router-link :to="{name:'Work',params: {id:o.workId}}">
              <h2 style="height:30px">{{o.workName}}<img v-if="o.recommend=='是'" width="22px" /></h2>
            </router-link>
            <div style="text-align:right">{{o.userName}}于{{o.uploadTime|date}}上传</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <el-row class="pagerow">
      <el-pagination @current-change="pagechange" :current-page.sync="ccPage" background layout="prev, pager, next" :total="pTotal" :page-size="pSize" :hide-on-single-page="true">
      </el-pagination>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "WorkList",  
  data() {
    return {
      findName: "",
      works: [],
      pTotal: 1,
      pSize: 6,
      ccPage: 1
    };
  },
  methods: {    
    find() {
      this.$router.push({ path: 'WorkList', query: { findName: this.findName } });
      this.ccPage = 1;
      this.calcCount(1);
    },
    pagechange(val) {
      var url = this.URL + "/api/newsinfo/findPage";
      var data = { pageIndex: val, pageSize: this.pSize };
      if (this.$route.query.findName) data.workName = this.$route.query.findName;
      fetch(url, {
        method: "post",
        body: JSON.stringify(data),
        headers: { "content-type": "application/json" }
      })
        .then(res => res.json())
        .then(res => {
          console.log(res.data);
          if (res.code == 1) this.works = res.data;
          else this.works = [];
        });
    },
    calcCount(val) {
      var url = this.URL + "/api/newsinfo/findCount";
      if (this.$route.query.findName) url += "?findName=" + this.$route.query.findName;
      fetch(url)
        .then(res => res.json())
        .then(res => {
          this.pTotal = res;
          this.pagechange(val);
        });
    }
  },
  created() {    
    this.calcCount(1);
    if (this.$route.query.findName)
      this.findName = this.$route.query.findName;
  }
};
</script>
