<template>
    <div class="home">
        <el-row>
            <el-col :md="3">&nbsp;</el-col>
            <el-col :md="18">
                <el-card :body-style="{ padding: '0px' }">
                    <el-col :sm="12">
                        <img width="100%" height="350px" src="../assets/321.png">
                    </el-col>
                    <el-col :sm="12">
                        <div width="100%" class="userlogin">
                            <el-form class="regform" :model="form" ref="form" :rules="rules">
                                <el-form-item prop="userName">
                                    <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="form.userName">
                                    </el-input>
                                </el-form-item>
                                <el-form-item prop="passWord">
                                    <el-input placeholder="请输入密码" type="PassWord" prefix-icon="el-icon-lock" v-model="form.passWord"></el-input>
                                </el-form-item>
                                <el-form-item prop="qq">
                                    <el-input placeholder="请输入QQ" prefix-icon="el-icon-message-solid" v-model="form.qq"></el-input>
                                </el-form-item>
                                <el-form-item prop="email">
                                    <el-input placeholder="请输入Email" prefix-icon="el-icon-message" v-model="form.email"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="Reg('form')">注册</el-button>
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
    data() {
        return {
            form: {},
            rules: {
                qq: [
                    {
                        validator: (rule, value, callback) => {
                            if (value && (!Number.isInteger(Number(value)) || value < 10000))
                                callback(new Error("请输入正确QQ号"));
                            else callback();
                        },
                        trigger: ["blur", "change"]
                    }
                ],
                email: [
                    {
                        type: "email",
                        message: "请输入正确的邮箱地址",
                        trigger: ["blur", "change"]
                    }
                ],
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
        Reg(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    var url = this.URL + "/api/users";
                    var cuMethod = "post";
                    this.form.type = "会员";
                    fetch(url, {
                        method: cuMethod,
                        body: JSON.stringify(this.form),
                        headers: { "content-type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            var type = "success";
                            if (res.code == -1) type = "warning"
                            else res.msg = "注册成功";
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: type
                            });
                            if (res.code == 1) this.$router.push("/Login");
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    }
}
</script>

