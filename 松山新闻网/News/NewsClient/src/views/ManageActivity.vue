<template>
    <div class="ManageActivity">
        <el-row class="title">
            <h2>管理新闻</h2>
        </el-row>
        <el-row class="content">
            <el-table :data="activities" border>
                <el-table-column label="序号" prop="num" align="center" width="80"></el-table-column>
                <el-table-column label="新闻名称" prop="activityName" align="center"></el-table-column>
                <el-table-column label="审核情况" prop="activityVerify" align="center"></el-table-column>
                <el-table-column label="结束时间" align="center">
                    <template slot-scope="scope">{{ scope.row.endTime|date }}</template>
                </el-table-column>
                <el-table-column label="推荐情况" prop="recommend" align="center"></el-table-column>
                <el-table-column label="发布人" prop="userName" align="center"></el-table-column>
                <el-table-column label="修改" align="center" width="50">
                    <template slot-scope="scope">
                        <router-link :to="{name:'EditActivity',params:{id:scope.row.activityId}}" class="el-button el-button--text el-button--mini ">
                            <i class="el-icon-edit"></i>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="删除" align="center" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" type="text" @click="delActivity(scope.row.activityId)"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="审核" align="center" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.activityVerify=='待审核'" @click="updateVeritfy(scope.row.activityId)" icon="el-icon-check" type="text"></el-button>
                    </template>
                </el-table-column>
                <el-table-column label="推荐" align="center" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.recommend=='否'" @click="updateRecommend(scope.row.activityId,'是')" icon="el-icon-circle-check" type="text"></el-button>
                        <el-button size="mini" v-else @click="updateRecommend(scope.row.activityId,'否')" icon="el-icon-circle-close" type="text"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-row class="pagerow">
                <el-pagination @current-change="pagechange" :current-page.sync="ccPage" background layout="prev, pager, next" :total="pTotal" :page-size="pSize" :hide-on-single-page="true">
                </el-pagination>
            </el-row>
        </el-row>

    </div>
</template>
<script>
export default {
    name: "ManageActivity",
    data() {
        return {
            form: {},
            activities: [],
            pTotal: 1,
            pSize: 5,
            ccPage: 1
        };
    },
    methods: {
        delActivity(id) {
            this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var url = this.URL + "/api/Verification/" + id;
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
            var url = this.URL + "/api/Verification/Recommend";
            fetch(url, {
                method: "put",
                body: JSON.stringify({ activityId: id, recommend: commend }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    var type = "success";
                    var msg = res.msg;
                    if (res.code == -1) type = "warning";
                    else this.activities.find(p => p.activityId == id).recommend = commend;
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: type
                    });
                })
        },
        updateVeritfy(id) {
            var url = this.URL + "/api/Verification/Verify";
            console.log(id);
            fetch(url, {
                method: "put",
                body: JSON.stringify({ activityId: id, activityVerify: "审核通过" }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    var type = "success";
                    var msg = res.msg;
                    if (res.code == -1) type = "warning";
                    else this.activities.find(p => p.activityId == id).activityVerify = "审核通过";
                    this.$message({
                        showClose: true,
                        message: msg,
                        type: type
                    });
                })
        },
        pagechange(val) {
            var url = this.URL + "/api/Verification/page";
            fetch(url, {
                method: "post",
                body: JSON.stringify({ pageIndex: val, pageSize: this.pSize }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    if (res.code == 1) this.activities = res.data;
                    else this.activities = [];
                });
        },
        calcCount(val) {
            var url = this.URL + "/api/Verification";
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
    }
};
</script>