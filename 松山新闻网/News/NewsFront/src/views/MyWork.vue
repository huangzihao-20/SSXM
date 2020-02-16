<template>
    <div class="home">
        <el-row>
            <el-col :sm="12" :lg="8" v-for="o in works" :key="o.workId" class="workinfo">
                <el-card class="workmargin" style="margin-right:10px;margin-bottom:10px;">
                    <div class="imgDiv">
                        <router-link :to="{path:'/EditWork',query: {workId:o.workId}}"><img :src="URL+'/'+o.workPicture+'?t='+Math.random()" class="image"></router-link>
                    </div>
                    <div class="worktext nav">
                        <div style="text-align:left">活动：{{o.activityName}}</div>
                        <router-link :to="{path:'/EditWork',query: {workId:o.workId}}">
                            <h2 style="height:20px">{{o.workName}}
                                <img v-if="o.recommend=='是'" width="22px" />
                            </h2>
                        </router-link>
                        <div style="text-align:right;padding-bottom:15px">
                            <span>{{o.uploadTime|date}}上传</span>
                            <img v-if="o.workVerify=='审核通过'" height="22px" src='../assets/egis.jpg' />
                            <img v-else height="22px" src='../assets/toaudit.jpg' />
                        </div>
                    </div>
                    <el-row type="flex" justify="center">
                        <el-button size="small" type="primary" @click="editWork(o.workId)">修改</el-button>
                        <el-button size="small" type="danger" @click="delWork(o.workId)">删除</el-button>
                    </el-row>
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
    name: "MyWork1",
    data() {
        return {
            works: [],
            pTotal: 1,
            pSize: 6,
            ccPage: 1
        };
    },
    methods: {
        editWork(id){
            this.$router.push("/EditWork?workId="+id);
        },
        delWork(id) {
            this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var url = this.URL + "/api/newsinfo/" + id;
                    fetch(url, {
                        method: "delete"
                    })
                        .then(res => res.json())
                        .then(res => {
                            var type = "success";
                            var msg = res.msg;
                            if (res.code == -1) type = "warning";
                            this.$message({
                                showClose: true,
                                message: msg,
                                type: type
                            });
                            if (res.code == 1) {
                                if (this.ccPage > 1 + (this.pTotal - 2) / this.pSize) this.ccPage -= 1;
                                this.calcCount(this.ccPage);
                            }
                        });
                })
                .catch(() => {
                    this.$message({
                        showClose: true,
                        type: "info",
                        message: "已取消删除"
                    });
                });
        },
        pagechange(val) {
            var url = this.URL + "/api/newsinfo/myPage";
            var data = { pageIndex: val, pageSize: this.pSize };
            if (this.$store.state.userName) data.userName = this.$store.state.userName;
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
            var url = this.URL + "/api/newsinfo/myCount";
            if (this.$store.state.userName) url += "?userName=" + this.$store.state.userName;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.pTotal = res;
                    this.pagechange(val);
                });
        }
    },
    created() {
        if (!this.$store.state.userName)
            this.$router.push("/Login");
        this.calcCount(1);
    }
};
</script>
