<template>
    <div id="app">
        <div class="header">
            <div id="logo" class="workmargin el-icon-s-home" style="align:right;color:red;font-size:29px;">松山新闻网</div>
             <!-- <img src="./assets/logo.png"> -->
            <div id="heager-right" class="workmargin">
                <div id="pnlLogin">
                    <div v-if="$store.state.userName" class="login workmargin nav">
                        <span>{{$store.state.userName}}</span> |
                        <el-button type="text" size="mini" @click="logout">注销</el-button>
                    </div>
                    <div v-else class="login workmargin nav">
                        <router-link to="/Login">登录</router-link> |
                        <router-link to="/Register">注册</router-link>
                    </div>
                </div>
            </div>
        </div>
        <el-row>
            <div class="header">
                <div class="workmargin">
                    <el-menu router :default-active="$route.path" class="el-menu-demo" mode="horizontal" background-color="gray" text-color="white" active-text-color="yellow" @select="handleSelect">
                        <el-menu-item index="/">首页</el-menu-item>
                        <el-menu-item index="/WorkList">资讯</el-menu-item>
                        <el-menu-item index="/ActivityList">旅游</el-menu-item>
                        <el-menu-item index="/MyWork">发布</el-menu-item>
                       
                    </el-menu>
                </div>
            </div>
        </el-row>
        <!-- <router-view v-if="isReload"/> -->
        <router-view/>
        <el-footer style="margin-top:50px">© Copyright 2019 计算机系信息管理期末项目</el-footer>
    </div>
</template>
<script>
export default {
    // provide(){
    //     return{
    //         reload:this.reload
    //     }
    // },
    data() {
        return {
            // isReload:true
        };
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
        },
        logout() {
            this.$store.state.userName = "";
            sessionStorage.clear();
            this.$router.push("/");
        },
        // reload(){
        //     this.isReload=false;
        //     this.$nextTick(function(){
        //         this.isReload=true;
        //     })
        // }
    },
    created() {
        if (sessionStorage.user) {
            this.$store.state.userName = sessionStorage.user;
        }
    }
}
</script>
<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
body {
    /* background-image: url(./assets/com_bg.png); */
    background-color: #f0fcff;
}
.header {
    margin: auto;
    max-width: 1260px;
    height: 50px;
}
.home {
    margin: auto;
    max-width: 1260px;
}
.worktype {
    text-align: left;
    /* margin-left: 5px; */
    font-size: 18px;
    color: teal;
    padding-bottom: 5px;
    /* padding-top: 5px; */
}
.el-icon-position {
    color: darkgreen;
}
.el-row > .header {
    padding-bottom: 20px;
}
#logo {
    /* width: 322px; */
    height: 40px;
    float: left;
    text-align: left;
    padding-top: 10px;
}
.login {
    float: right;
    height: 20px;
    line-height: 20px;
    margin-top: 18px;
    margin-right: 0px;
    margin-bottom: 0px;
    margin-left: 0px;
}

.nav a {
    font-weight: bold;
    color: #2c3e50;
}

.nav a.router-link-exact-active {
    color: #42b983;
}
.workinfo {
    padding: 0px;
    text-align: -webkit-left;
}
.workname {
    height: 30px;
    line-height: 36px;
    padding-bottom: 10px;
}
.workname span {
    vertical-align: bottom;
}
.worktext {
    text-align: center;
}
.workmargin {
    margin-left: 7px;
    margin-right: 7px;
}
.workmargin2 {
    margin-left: 4px;
    margin-right: 8px;
}
.imgDiv {
    /* text-align: -webkit-left; */
    margin-top: 10px;
    position: relative; /*相对定位*/
    padding-bottom: 80%; /*拖出内边距60%，相当于div高度为宽度60%*/
}
.image {
    width: 100%;
    height: 100%;
    position: absolute;
    /* text-align: -webkit-left; */
}
.image2 {
    width: 100%;
    height: 100%;
    position: absolute;
    /* text-align: -webkit-left; */
}
.enter,
.enter:visited {
    text-decoration: none;
    color: #0099ff;
}
.workid {
    text-align: left;
    margin-bottom: 20px;
}
.workid span {
    padding: 10px;
}
.Introduction {
    text-align: left;
    padding-left: 10px;
}
.userlogin {
    margin: auto;
    max-width: 470px;
    height: 350px;
    line-height: 350px;
    padding-left: 50px;
    padding-right: 50px;
}
.loginform {
    padding-top: 25%;
}
.regform {
    padding-top: 10%;
}
.avatar-uploader .el-upload {
    /* border-radius: 6px; */
    cursor: pointer;
    position: relative;
    overflow: hidden;
    float: left;
}
.avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    cursor: pointer;
}
.avatar {
    border: 1px dashed #d9d9d9;
    width: 178px;
    height: 178px;
    line-height: 178px;
    display: block;
    cursor: pointer;
}
.avatar2 {
    border: 1px dashed #d9d9d9;
    width: 478px;
    height: 478px;
    line-height: 478px;
    display: block;
    cursor: pointer;
}
.imgurl1 {
    height: 178px;
    display: block;
    cursor: pointer;
}
.imgurl2 {
    max-width: 100%;
    display: block;
    cursor: pointer;
}
/* .recommend {
    margin-top: 25px;
    margin-bottom: 25px;
} */
.clearfix {
    text-align: left;
}
.clearfix:before,
.clearfix:after {
    display: table;
    content: "";
}
.clearfix:after {
    clear: both;
}
.reUserName {
    font-size: 20px;
    color: #409eff;
}
.reTime {
    float: right;
    padding: 3px 0;
    color: #409eff;
}
.reco {
    text-align: left;
    margin-left:15px;
    margin-top: 15px; 
    margin-bottom:15px;     
}
</style>
