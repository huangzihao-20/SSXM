<template>
    <div class="ManageWork">
        <el-row class="title">
            <h2>管理作品</h2>
        </el-row>
        <el-row class="content">
            <el-row>
                <p class="acitvityType">选择新闻类型</p>
                <el-select v-model="value1" style="width:100%;margin-bottom:10px" multiple placeholder="请选择新闻活动" @change="selActivity">
                    <el-option v-for="item in options" :key="item.activityId" :label="item.activityName" :value="item.activityId">
                    </el-option>
                </el-select>
            </el-row>
            <el-row>
                <el-col :sm="12" :lg="8" v-for="o in works" :key="o.workId" class="workinfo">
                    <div class="imgDiv">
                        <img :src="URL+'/'+o.workPicture" class="image">
                    </div>
                    <div class="worktext">
                        <h2 class="workname">{{o.workName}}</h2>
                        <div class="workuser">新闻类型：{{options.filter(p=>p.activityId==o.activityId)[0].activityName}} &nbsp;&nbsp;&nbsp; 所属人：{{o.userName}}</div>
                        <div class="workvu">审核情况：{{o.workVerify}} &nbsp;&nbsp;&nbsp; 是否推荐：{{o.recommend}}</div>
                        <div>
                            <el-button v-if="o.workVerify!='审核通过'" type="primary" size="mini" class="workbtn" icon="el-icon-check" @click="updateVeritfy(o.workId)">审核</el-button>
                            <el-button v-if="o.recommend=='否'" type="success" size="mini" class="workbtn" icon="el-icon-circle-check" @click="updateRecommend(o.workId,'是')">推荐</el-button>
                            <el-button v-else type="warning" size="mini" class="workbtn" icon="el-icon-circle-close" @click="updateRecommend(o.workId,'否')">不推</el-button>
                            <el-button type="danger" size="mini" class="workbtn" icon="el-icon-delete" @click="delWork(o.workId)">删除</el-button>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-row class="pagerow">
                <el-pagination @current-change="pagechange" :current-page.sync="ccPage" background layout="prev, pager, next" :total="pTotal" :page-size="pSize" :hide-on-single-page="true">
                </el-pagination>
            </el-row>
        </el-row>

    </div>
</template>
<script>
export default {
    name: "ManageWork",
    data() {
        return {
            options: [],
            value1: [],
            works: [],
            activities: [],
            pTotal: 1,
            pSize: 6,
            ccPage: 1
        };
    },
    methods: {
        selActivity() {
            this.calcCount(1);
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
        updateRecommend(id, commend) {
            var url = this.URL + "/api/newsinfo/Recommend";
            fetch(url, {
                method: "put",
                body: JSON.stringify({ workId: id, recommend: commend }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    var type = "success";
                    var msg = res.msg;
                    if (res.code == -1) type = "warning";
                    else this.works.find(p => p.workId == id).recommend = commend;
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: type
                    });
                })
        },
        updateVeritfy(id) {
            var url = this.URL + "/api/newsinfo/Verify";
            fetch(url, {
                method: "put",
                body: JSON.stringify({ workId: id, workVerify: "审核通过" }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    var type = "success";
                    var msg = res.msg;
                    if (res.code == -1) type = "warning";
                    else this.works.find(p => p.workId == id).workVerify = "审核通过";
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: type
                    });
                })
        },
        pagechange(val) {
            var url = this.URL + "/api/newsinfo/page";
            fetch(url, {
                method: "post",
                body: JSON.stringify({ pageIndex: val, pageSize: this.pSize, activityIds: this.value1 }),
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
            var url = this.URL + "/api/newsinfo/count";
            fetch(url, {
                method: "post",
                body: JSON.stringify(this.value1),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    this.pTotal = res;
                    this.pagechange(val);
                });
        }
    },
    created() {
        this.calcCount(1);
        var url = this.URL + "/api/Verification/names";
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.code == 1)
                    this.options = res.data;
            })
    }
};
</script>

<style>
.workname {
    height: 30px;
}
.acitvityType {
    margin: 10px;
    text-align: left;
}
.workinfo {
    padding: 0px;
    text-align: -webkit-left;
}
.worktext {
    text-align: center;
}

.workvu {
    padding: 5px;
}
.imgDiv {
    position: relative; /*相对定位*/
    padding: 5%;
    padding-bottom: 80%; /*拖出内边距60%，相当于div高度为宽度60%*/
}
.image {
    width: 90%;
    height: 90%;
    position: absolute;
    text-align: left;
}
</style>