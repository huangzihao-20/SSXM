<template>
  <div class="login">
    <el-row class="title">
      <h2>松山新闻网登录系统</h2>
    </el-row>
    <el-row class="content">
      <div id="logincontainer">
        <div id="loginbox">
          <div id="loginheader">
            <img src="../assets/logo1.png" alt="Control Panel Login">
          </div>
          <div id="innerlogin">
            <el-form :model="form" ref="form" :rules="rules">
              <el-form-item prop="userName">
                <el-input placeholder="请输入用户名" suffix-icon="el-icon-user" v-model="form.userName">
                </el-input>
              </el-form-item>
              <el-form-item prop="passWord">
                <el-input placeholder="请输入密码" type="PassWord" suffix-icon="el-icon-lock" v-model="form.passWord"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="login('form')">登录</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-row>
  </div>
</template>

<script>
export default {
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
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          var url = this.URL + "/api/users/check";
          if (this.form.userName && this.form.passWord) {
            fetch(url, {
              method: "post",
              body: JSON.stringify(this.form),
              headers: { "content-type": "application/json" }
            })
              .then(res => res.json())
              .then(res => {
                var type = "success";
                console.log(res.data);
                var msg = res.msg;
                if (res.code == -1) type = "warning";
                this.$message({
                  showClose: true,
                  message: msg,
                  type: type
                });
                if (res.code == 1) {
                  this.$store.state.type = res.data.type;
                  this.$store.state.userName = res.data.userName;
                  sessionStorage.user = res.data.userName;
                  sessionStorage.type = res.data.type;
                  this.$router.push("/");
                }
              });
          } else {
            this.$message({
              showClose: true,
              message: "用户名或密码不能为空",
              type: "warning"
            });
          }
        }
        else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>
