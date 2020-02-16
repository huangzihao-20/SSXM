
<template>
    <div class="home">
        <el-row>
            <el-col :md="3">&nbsp;</el-col>
            <el-col :md="18">
                <el-card :body-style="{ padding: '0px' }">
                    <el-col :sm="12">
                        <img width="100%" height="350px" src="../assets/123.png">
                    </el-col>
                    <el-col :sm="12">
                        <div width="100%" class="userlogin">
                            <el-form class="loginform" :model="form" ref="form" :rules="rules">
                                <el-form-item prop="userName">
                                    <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="form.userName">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="passWord">
                                    <el-input placeholder="请输入密码" type="PassWord" prefix-icon="el-icon-lock" v-model="form.passWord"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Login('form')">登录</el-button>
                                    <el-button type="primary" plain @click="Reg">注册</el-button>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-col>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    onload(){},
    data() {
        return {
            form: {},
            rules: {
                userName: [
                    {
                        required: true,
                        message: "请输入用户名",
                        trigger: ["blur", "change"]
                    }
                ],
                passWord: [
                    {
                        required: true,
                        message: "请输入密码",
                        trigger: ["blur", "change"]
                    }
                ]
            }
        };
    },
    methods: {
        Reg() {
            this.$router.push("/Register")
        },
        Login(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    var url = this.URL + "/api/Users/genCheck";
                    fetch(url, {
                        method: "post",
                        body: JSON.stringify(this.form),
                        headers: { "content-type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(res => {
                            var type = "success";
                            console.log(res);
                            var msg = res.msg;
                            if (res.code == -1) type = "warning";
                            this.$message({
                                showClose: true,
                                message: msg,
                                type: type
                            });
                            if (res.code == 1) {                                
                                this.$store.state.userName = res.data.userName;
                                sessionStorage.user = res.data.userName;                                
                                this.$router.push("/");
                            }
                        });
                }
                else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
}
</script>

