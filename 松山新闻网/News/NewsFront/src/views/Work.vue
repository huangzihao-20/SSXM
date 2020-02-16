<template>
    <div class="home">
        <div v-if="work.workVerify=='审核通过'" class="workmargin">
            <el-card>
                <el-row class="workid">
                    <span>新闻来源：{{work.activityName}}</span>
                    <span>新闻标题：{{work.workName}}<img v-if="work.recommend=='是'" width="22px" /></span>
                    <span>报道人：{{work.userName}}</span>
                </el-row>
                <el-row>
                    <img :src="imgurl" style="max-width:100%">
                    <div  v-html="activity.activityIntroduction"></div>
                </el-row>
            </el-card>
            <div class="reco">全部评论
                <el-badge :value="commCnt" class="item">
                    <i class="el-icon-chat-dot-square"></i>
                </el-badge>
            </div>
            <el-card>
                <el-card v-for="o in comments" :key="o.commentId">
                    <div slot="header" class="clearfix">
                        <span class="reUserName">
                            <i class="el-icon-user-solid"></i>{{o.userName}}</span>
                        <span class="reTime">{{o.commentTime|time}}</span>
                    </div>
                    <div class="clearfix">{{o.commentContent}}</div>
                </el-card>
                <el-row class="pagerow">
                    <el-pagination @current-change="pagechange" :current-page.sync="ccPage" background layout="prev, pager, next" :total="pTotal" :page-size="pSize" :hide-on-single-page="true">
                    </el-pagination>
                </el-row>
            </el-card>
            <div class="reco">发表评论
                <i class="el-icon-chat-dot-square"></i>
            </div>
            <el-card>
                <el-form ref="form" :model="form" :rules="rules">
                    <el-form-item prop="commentContent">
                        <el-input type="textarea" :autosize="{ minRows: 6, maxRows: 10}" placeholder="请输入评论" v-model="form.commentContent">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="toComment('form')" style="margin-top:10px" icon="el-icon-chat-dot-square">发表</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
        <div v-else>新闻不存在或尚未审核通过</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activity:{},
            commCnt: 0,
            work: {},
            rules: {
                commentContent: [
                    {
                        required: true,
                        message: "请输入评论内容",
                        trigger: ["blur", "change"]
                    }
                ],
            },
            imgurl: "",
            form: {},
            comments: [],
            pTotal: 1,
            pSize: 6,
            ccPage: 1
        }
    },
    methods: {
        toComment(formName) {
            if (!this.$store.state.userName) {
                this.$message({
                    showClose: true,
                    message: "登录后才能发布作品",
                    type: "warning"
                });
                this.$router.push("/Login");
            }
            else
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        var url = this.URL + "/api/Publish";
                        var cuMethod = "post";
                        this.form.userName = this.$store.state.userName;
                        this.form.workId = this.$route.params.id;
                        fetch(url, {
                            method: cuMethod,
                            body: JSON.stringify(this.form),
                            headers: { "content-type": "application/json" }
                        })
                            .then(res => res.json())
                            .then(res => {
                                var type = "success";
                                if (res.code == -1) type = "warning";
                                this.$message({
                                    showClose: true,
                                    message: res.msg,
                                    type: type
                                });
                                if (res.code == 1) this.calcCount(1);
                            });
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });

        },
        pagechange(val) {
            var url = this.URL + "/api/Publish/workPage";
            var data = { pageIndex: val, pageSize: this.pSize };
            if (this.$route.params.id) data.workId = this.$route.params.id;
            fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    if (res.code == 1) this.comments = res.data;
                    else this.comments = [];
                });
        },
        calcCount(val) {
            var url = this.URL + "/api/Publish/" + this.$route.params.id;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.pTotal = res;
                    this.commCnt = res;
                    this.pagechange(val);
                });
        }
    },
    created() {
        var url = this.URL + "/api/newsinfo/" + this.$route.params.id;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.code == 1) {
                    this.work = res.data;
                    this.imgurl = this.URL + "/" + this.work.workIntroduction;
                }
            })
        this.calcCount(1);
         var url1 = this.URL + "/api/Verification/" + this.$route.params.id;
        fetch(url1)
            .then(res => res.json())
            .then(res => {
                if (res.code == 1) {
                    this.activity = res.data;
                }
            })

    }

}
</script>

