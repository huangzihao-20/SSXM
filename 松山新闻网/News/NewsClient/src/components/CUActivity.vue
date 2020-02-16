<template>
    <div class="CUActivity">
        <el-row class="title">
            <h2>{{CUname}}活动</h2>
        </el-row>
        <el-row class="content">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="活动名称" prop="activityName">
                    <el-input v-model="form.activityName"></el-input>
                </el-form-item>
                <el-form-item label="活动图片">
                    <div class="avatar-uploader">
                        <div class="el-upload el-upload--text">
                            <label for="file" class="avatar">
                                <img v-if="imgurl" :src="imgurl" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </label>
                            <input type="file" name="file" id="file" @change="show" class="el-upload__input">
                        </div>
                    </div>
                </el-form-item>
                <el-form-item label="结束日期" prop="endTime">
                    <el-date-picker v-model="form.endTime" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="活动简介" prop="summary">
                    <el-input type="textarea" :rows="6" v-model="form.summary"></el-input>
                </el-form-item>
                <el-form-item label="详细介绍" prop="activityIntroduction">
                    <quill-editor v-model="form.activityIntroduction" :options="editorOption" ref="myQuillEditor"></quill-editor>
                    <!-- <el-input type="textarea" :rows="9" v-model="form.activityIntroduction"></el-input> -->
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="cuActivity('form')">{{CUname}}活动</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
import { quillRedefine } from 'vue-quill-editor-upload'
export default {
    name: "CUActivity",
    props: {
        CUname: String
    },
    data() {
        return {
            imgurl: "",
            form: {},
            rules: {
                activityName: [
                    {
                        required: true,
                        message: "请输入活动名称",
                        trigger: ["blur", "change"]
                    }
                ]
            },
            uploadUrl: this.URL + "/api/Renewal",
            editorOption: {
                placeholder: "请在这里输入",
            }
        };
    },
    methods: {
        show(e) {
            let _this = this;
            var reader = new FileReader();
            reader.onload = function () {
                _this.imgurl = this.result;
            };
            reader.readAsDataURL(e.target.files[0]);
        },
        cuActivity(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    if (document.getElementById("file").files.length != 0 || this.form.activityPicture) {
                        var url = this.URL + "/api/Verification";
                        var cuMethod = "post";
                        if (this.CUname == "修改") cuMethod = "put";
                        if (!this.form.ActivityVerify) this.form.ActivityVerify = "待审核";
                        if (!this.form.ActivityStatus) this.form.ActivityStatus = "末结束";
                        if (!this.form.ActivityPicture && this.CUname != "修改") this.form.ActivityPicture = "";
                        if (!this.form.UserName) this.form.UserName = this.$store.state.userName;
                        if (this.CUname == "修改") cuMethod = "put";
                        fetch(url, {
                            method: cuMethod,
                            body: JSON.stringify(this.form),
                            headers: { "content-type": "application/json" }
                        })
                            .then(res => res.json())
                            .then(res => {
                                if (res.code == -1) {
                                    this.$message({
                                        showClose: true,
                                        message: res.msg,
                                        type: "warning"
                                    });
                                } else if (res.code == 1) {
                                    var msg = res.msg;
                                    var type = "success";
                                    if (document.getElementById("file").files.length != 0) {
                                        var formData = new FormData();
                                        formData.append("files", document.getElementById("file").files[0]);
                                        url = url + "/" + res.data;
                                        fetch(url, { method: "put", body: formData })
                                            .then(res => res.json())
                                            .then(res => {
                                                if (res.code == -1) {
                                                    msg += "，但活动图片未能正确上传";
                                                    type = "warning";
                                                }
                                                this.$message({
                                                    showClose: true,
                                                    message: msg,
                                                    type: type
                                                });
                                                if (res.code == 1) this.$router.push("/ManageActivity");
                                            });
                                    }
                                    else {
                                        this.$message({
                                            showClose: true,
                                            message: msg,
                                            type: type
                                        });
                                        this.$router.push("/ManageActivity");
                                    }
                                }
                            });
                    } else {
                        this.$message({
                            showClose: true,
                            message: "请上传活动图片",
                            type: "warning"
                        });
                    }
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
            //console.log(document.getElementById("file").files[0]);
        }
    },
    computed: {
        editor() {
            return this.$refs.myQuillEditor.quill;
        },
    },
    created() {
        if (this.CUname == "修改") {
            var id = this.$route.params.id;
            var url = this.URL + "/api/Verification/" + id;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    if (res.code == -1) this.$router.push("/ManageActivity");
                    else {
                        this.form = res.data;
                        this.imgurl = this.URL + "/" + res.data.activityPicture + "?t=" + Math.random();
                    }
                });
        }
        this.editorOption = quillRedefine(//修改富文本编辑器图片上传路径
            {
                // 图片上传的设置
                placeholder: "请在这里输入",
                uploadConfig: {
                    action: this.uploadUrl,  // 必填参数 图片上传地址
                    res: (respnse) => {
                        return respnse.data;
                        // return this.URL+"/"+respnse.data;//return图片url
                    },
                    name: 'files'  // 图片上传参数名
                }
            })
    }
}
</script>