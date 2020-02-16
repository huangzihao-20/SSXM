<template>
    <div class="ManageUser">
        <el-row class="title">
            <h2>管理用户</h2>
        </el-row>
        <el-row class="content">
            <el-table :data="users" border>
                <el-table-column label="序号" prop="num" align="center" width="80"></el-table-column>
                <el-table-column label="用户名称" prop="userName" align="center"></el-table-column>
                <el-table-column label="用户密码" prop="passWord" align="center"></el-table-column>
                <el-table-column label="用户QQ" prop="qq" align="center"></el-table-column>
                <el-table-column label="用户邮箱" prop="email" align="center"></el-table-column>
                <el-table-column label="用户类型" prop="type" align="center"></el-table-column>
                <el-table-column label="修改" align="center" width="50">
                    <template slot-scope="scope">
                        <router-link :to="{name:'EditUser',params:{username:scope.row.userName}}" class="el-button el-button--text el-button--mini ">
                            <i class="el-icon-edit"></i>
                        </router-link>
                    </template>
                </el-table-column>
                <el-table-column label="删除" align="center" width="50">
                    <template slot-scope="scope">
                        <el-button size="mini" icon="el-icon-delete" type="text" @click="delUser(scope.row.userName)"></el-button>
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
    data() {
        return {
            pTotal: 1,
            pSize: 5,
            form: {},
            users: [],
            ccPage: 1
        };
    },
    methods: {
        pagechange(val) {
            var url = this.URL + "/api/users/page";
            fetch(url, {
                method: "post",
                body: JSON.stringify({ pageIndex: val, pageSize: this.pSize }),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    if (res.code == 1) this.users = res.data;
                    else this.users = [];
                });
        },
        calcCount(val) {
            var url = this.URL + "/api/users";
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.pTotal = res;
                    this.pagechange(val);
                });
        },
        delUser(userName) {
            if (userName != this.$store.state.userName) {
                this.$confirm("此操作将永久删除该记录, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning"
                })
                    .then(() => {
                        var url = this.URL + "/api/users/" + userName;
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
            } else
                this.$message({
                    showClose: true,
                    type: "warning",
                    message: "不能删除登录用户"
                });
        }
    },
    created() {
        this.calcCount(1);
    }
};
</script>