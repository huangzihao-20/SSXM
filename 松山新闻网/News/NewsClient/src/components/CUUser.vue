<template>
    <div class="CUUser">
        <el-row class="title">
            <h2>{{CUname}}用户</h2>
        </el-row>
        <el-row class="content">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                <el-form-item label="用户名称" prop="userName">
                    <el-input v-model="ruleForm.userName" :readonly="CUname=='修改'"></el-input>
                </el-form-item>
                <el-form-item label="用户密码" prop="passWord">
                    <el-input type="PassWord" v-model="ruleForm.passWord"></el-input>
                </el-form-item>
                <el-form-item label="用户QQ" prop="qq">
                    <el-input v-model="ruleForm.qq"></el-input>
                </el-form-item>
                <el-form-item label="用户邮箱" prop="email">
                    <el-input v-model="ruleForm.email"></el-input>
                </el-form-item>
                <el-form-item label="用户类型" prop="type">
                    <el-select v-model="ruleForm.type" placeholder="请选择">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="cuUser('ruleForm')">{{CUname}}用户</el-button>
                </el-form-item>
            </el-form>
        </el-row>
    </div>
</template>
<script>
export default {
    name: "cuUser",
    props: {
        CUname: String
    },
    data() {
        return {
            ruleForm: {},
            options: [
                {
                    value: "管理员",
                    label: "管理员"
                },
                {
                    value: "会员",
                    label: "会员"
                }
            ],
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
                ],
                type: [
                    {
                        required: true,
                        message: "请选择身份",
                        trigger: ["blur", "change"]
                    }
                ]
            }
        };
    },
    methods: {
        cuUser(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    var url = this.URL + "/api/users";
                    var cuMethod = "post";
                    if (this.CUname == "修改") cuMethod = "put";
                    console.log(url);
                    fetch(url, {
                        method: cuMethod,
                        body: JSON.stringify(this.ruleForm),
                        headers: { "content-type": "application/json" }
                    })
                        .then(res => res.json())
                        .then(res => {
                            console.log(res);
                            var type = "success";
                            if (res.code == -1) type = "warning";
                            this.$message({
                                showClose: true,
                                message: res.msg,
                                type: type
                            });
                            if (res.code == 1) this.$router.push("/ManageUser");
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        }
    },
    created() {
        if (this.CUname == "修改") {
            var username = this.$route.params.username;
            var url = this.URL + "/api/users/" + username;
            fetch(url, {
                method: "put"
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    if (res.code == -1) this.$router.push("/ManageUser");
                    else this.ruleForm = res.data;
                });
        }
    }
};
</script>