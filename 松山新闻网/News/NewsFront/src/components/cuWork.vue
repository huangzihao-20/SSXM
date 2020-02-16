<template>
    <div class="workmargin">
        <el-card>
            <el-row>
                <h2>{{CUname}}新闻</h2>
            </el-row>
            <el-row>
                <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                    <el-form-item label="新闻名称" prop="workName">
                        <el-input v-model="form.workName"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻图片" prop="imgurl1">
                        <div class="avatar-uploader">
                            <div class="el-upload el-upload--text">
                                <label v-if="form.imgurl1" for="file1">
                                    <img :src="form.imgurl1" class="imgurl1" id="img1">
                                </label>
                                <label v-else for="file1" class="avatar">
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                </label>
                                <input type="file" name="file" id="file1" ref="file1" @change="show1" class="el-upload__input">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="上传新闻" prop="imgurl2">
                        <div class="avatar-uploader">
                            <div class="el-upload el-upload--text">
                                <label v-if="form.imgurl2" for="file2">
                                    <img :src="form.imgurl2" class="imgurl2" id="img2">
                                </label>
                                <label v-else for="file2" class="avatar2">
                                    <i class="el-icon-plus avatar-uploader-icon"></i>
                                </label>
                                <input type="file" name="file" id="file2" ref="file2" @change="show2" class="el-upload__input">
                            </div>
                        </div>
                    </el-form-item>
                    <el-form-item label="新闻活动">
                        <el-input v-model="form.activityName" readonly></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="upWork('form')">{{CUname}}新闻</el-button>
                        <el-button type="info" @click="retu()">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-row>
        </el-card>
    </div>
</template>
<script>
export default {
    // inject:['reload'],
    props: {
        CUname: String
    },
    data() {
        return {
            form: { imgurl1: "", imgurl2: "", activityName: "", activityId: "" },
            rules: {
                workName: [
                    {
                        required: true,
                        message: "请输入新闻名称",
                        trigger: ["blur", "change"]
                    }
                ],
                imgurl1: [
                    {
                        required: true,
                        message: "请上传新闻图片",
                        trigger: ["blur", "change"]
                    }
                ],
                imgurl2: [
                    {
                        required: true,
                        message: "请上传新闻",
                        trigger: ["blur", "change"]
                    }
                ]
            },
        }
    },
    methods: {
        listMyWork() {
            var url = this.URL + "/api/newsinfo/" + this.$route.query.workId;
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    console.log(res);
                    if (res.code == 1) {
                        this.form = res.data;
                        this.form.imgurl1 = this.URL + "/" + this.form.workPicture + "?t=" + Math.random();
                        this.form.imgurl2 = this.URL + "/" + this.form.workIntroduction + "?t=" + Math.random();
                    }
                })
        },
        retu() {
            this.$router.push("/MyWork");
        },
        show(e,imgurl) {
            var reader = new FileReader();
            reader.onload = e => this.$set(this.form, imgurl, e.target.result);            
            reader.readAsDataURL(e.target.files[0]);
        },
        show1(e) {
            this.show(e,'imgurl1');
        },
        show2(e) {
            this.show(e,'imgurl2');
        },
        upWork(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    var url = this.URL + "/api/newsinfo";
                    var cuMethod = "post";
                    if (this.CUname == "修改") cuMethod = "put";
                    if (!this.form.UserName) this.form.UserName = this.$store.state.userName;
                    if (!this.form.workPicture && this.CUname != "修改") this.form.workPicture = "";
                    if (!this.form.workIntroduction && this.CUname != "修改") this.form.workIntroduction = "";
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
                                if (this.$refs.file1.files.length != 0) {
                                    var formData = new FormData();                                    
                                    formData.append("files",this.$refs.file1.files[0]);
                                    var url1 = url + "/" + res.data;
                                    var url2 = url + "/i" + res.data;
                                    fetch(url1, { method: "put", body: formData })
                                        .then(res => res.json())
                                        .then(res => {
                                            if (res.code == -1) {
                                                msg += "，但新闻图片未能正确上传";
                                                type = "warning";
                                                this.$message({
                                                    showClose: true,
                                                    message: msg,
                                                    type: type
                                                });
                                            }
                                            else {
                                                if (this.$refs.file2.files.length != 0) {
                                                    var formData = new FormData();                                                    
                                                    formData.append("files",this.$refs.file2.files[0]);
                                                    fetch(url2, { method: "put", body: formData })
                                                        .then(res => res.json())
                                                        .then(res => {
                                                            if (res.code == -1) {
                                                                msg += "，但新闻图片未能正确上传";
                                                                type = "warning";
                                                            }
                                                            this.$message({
                                                                showClose: true,
                                                                message: msg,
                                                                type: type
                                                            });
                                                        })
                                                }
                                                else {
                                                    this.$message({
                                                        showClose: true,
                                                        message: msg,
                                                        type: type
                                                    });
                                                }
                                            }
                                        });
                                }
                                else {
                                    if (this.$refs.file2.files.length != 0) {
                                        var url2 = url + "/i" + res.data;
                                        var formData = new FormData();
                                        formData.append("files", this.$refs.file2.files[0]);
                                        fetch(url2, { method: "put", body: formData })
                                            .then(res => res.json())
                                            .then(res => {
                                                if (res.code == -1) {
                                                    msg += "，但新闻图片未能正确上传";
                                                    type = "warning";
                                                }
                                                this.$message({
                                                    showClose: true,
                                                    message: msg,
                                                    type: type
                                                });
                                            })
                                    }
                                    else {
                                        this.$message({
                                            showClose: true,
                                            message: msg,
                                            type: type
                                        });
                                    }
                                }
                            }
                        })
                }
                else {
                    console.log("error submit!!");
                    return false;
                }
            })
        }
    },
    created() {
        if (this.$route.query.id && this.$route.query.name) {
            this.form.activityId = this.$route.query.id;
            this.form.activityName = this.$route.query.name;
        }
        else if (this.$route.query.workId) {
            this.listMyWork();
        }
    }
}
</script>