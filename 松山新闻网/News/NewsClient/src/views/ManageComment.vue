<template>
    <div class="ManageComment">
        <el-row class="title">
            <h2>管理新闻评论</h2>
        </el-row>
        <el-row class="content">
            <el-table :data="comments" border>
                <el-table-column label="序号" prop="num" align="center" width="80"></el-table-column>
                <el-table-column label="新闻编号" prop="workId" align="center" width="80"></el-table-column>
                <el-table-column label="新闻名称" prop="workName" align="center"></el-table-column>
                <el-table-column label="评论人" prop="userName" align="center"></el-table-column>
                <el-table-column label="评论内容" prop="commentContent" align="center"></el-table-column>
                <el-table-column label="评论时间" align="center">
                    <template slot-scope="scope">{{ scope.row.commentTime|date }}</template>
                </el-table-column>
                <el-table-column label="删除" align="center" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" type="text" @click="delComment(scope.row.commentId)"></el-button>
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
    name: "ManageComment",
    data() {
        return {
            form: {},
            comments: [],
            pTotal: 1,
            pSize: 5,
            ccPage: 1
        };
    },
    methods: {
        delComment(id) {
            this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            })
                .then(() => {
                    var url = this.URL + "/api/Publish/" + id;
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
                                if (this.ccPage > 1+(this.pTotal-2) / this.pSize) this.ccPage -= 1;
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
            var url = this.URL + "/api/Publish/page";
            fetch(url, {
                method: "post",
                body: JSON.stringify({ pageIndex: val, pageSize: this.pSize }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {                    
                    if (res.code == 1) this.comments = res.data;
                    else this.comments = [];
                    console.log("ok:");
                    console.log(this.comments);
                });
        },
        calcCount(val) {
            var url = this.URL + "/api/Publish";
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