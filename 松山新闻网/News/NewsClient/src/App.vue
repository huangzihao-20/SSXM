<template>
    <div id="app">
        <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
        <div>
            <el-container>
                <el-header><img src="./assets/logo1.png" /></el-header>
                <el-container :style="height">
                    <el-aside v-if="notlog()" width="240px">
                        <div id="leftside">
                            <div class="user">
                                <img src="./assets/avatar.png" width="54" height="54" class="hoverimg" alt="Avatar" />
                                <p>{{$store.state.type}}：
                                    <span class="username">{{$store.state.userName}}</span>
                                    <el-button type="text" size="mini" @click="logout">注销</el-button>
                                </p>
                            </div>
                        </div>
                        <el-menu router :default-active="$route.path" class="el-menu-vertical-demo" unique-opened @open="selRoute">
                            <el-submenu index="1">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>新闻管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/ManageWork">管理新闻</el-menu-item>
                                    <el-menu-item index="/ManageComment">管理评论</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="2">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>新闻管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/AddActivity">发布新闻</el-menu-item>
                                    <el-menu-item index="/ManageActivity">管理新闻</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                            <el-submenu index="3">
                                <template slot="title">
                                    <i class="el-icon-location"></i>
                                    <span>用户管理</span>
                                </template>
                                <el-menu-item-group>
                                    <el-menu-item index="/AddUser">添加用户</el-menu-item>
                                    <el-menu-item index="/ManageUser">管理用户</el-menu-item>
                                </el-menu-item-group>
                            </el-submenu>
                        </el-menu>
                    </el-aside>
                    <el-main>
                        <router-view/>
                    </el-main>
                </el-container>
            </el-container>
            <el-footer>© Copyright 2019 广东松山职业技术学院计算机系</el-footer>
        </div>
    </div>
</template>
<script>
import HelloWorld from "@/components/HelloWorld.vue";
export default {
    components: {
        HelloWorld
    },
    data() {
        return {
            height: {
                height: window.innerHeight - 120 + "px"
            },
            UserName: "",
            Type: ""
        };
    },
    methods: {
        selRoute() {

        },
        notlog() {
            return this.$route.path != "/login";
        },
        logout() {
            this.$store.state.type = "";
            this.$store.state.userName = "";
            sessionStorage.clear();
            this.$router.push("login");
        }
    },
    created() {
        if (sessionStorage.user && sessionStorage.type == "管理员") {
            this.$store.state.type = sessionStorage.type;
            this.$store.state.userName = sessionStorage.user;
        }
        window.onresize = () => {
            return (() => {
                this.height = {
                    height: window.innerHeight - 120 + "px"
                }
            })()
        }
    }
};
</script>



<style>
/* ul {
    display: block;
    list-style-type: disc;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
    -webkit-padding-start: 40px;
} */
#logincontainer {
    width: 385px;
    height: 600px;
    margin: 0 auto;
    margin-top: 90px;
}

#loginbox {
    border-radius: 20px;
    -moz-border-radius: 20px;
    background:white;
    opacity:0.8;
    border-bottom: 1px solid #fff;
}
#loginheader {
    text-align: center;
    padding: 15px 0;
    background: white;
    border-bottom: 1px solid #424242;
    border-top-left-radius: 20px;
    border-top-right-radius: 20px;
    -moz-border-radius-topright: 20px;
    -moz-border-radius-topleft: 20px;
}
#innerlogin {
    width: 260px;
    margin: 0 auto;
    text-align: center;
    padding: 50px 30px 30px 30px;
    color: #999;
    
    font-size: 14px;
}
.el-select,
.el-date-editor {
    float: left;
}
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
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
    width: 178px;
    height: 178px;
    line-height: 178px;
    display: block;
    cursor: pointer;
}
.pagerow {
    text-align: right;
    margin-top: 15px;
}
h2 {
    padding-top: 8px;
    padding-left: 10px;
    margin: 0;
    height: 47px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color:red;
}
.title {
    padding-top: 0px;
    text-align: left;
    background:gray;
    border: 1px solid #00789f;
    color: #fff;
    text-shadow: 1px 1px 1px #2d738a;
    height: 47px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    -moz-border-radius-topright: 10px;
    -moz-border-radius-topleft: 10px;
}
.content {
    overflow: auto;
    border: 1px solid #fff;
    padding: 15px;
    background:white;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    -moz-border-radius-bottomright: 10px;
    -moz-border-radius-bottomleft: 10px;
    background: url(./assets/222.jpg);
}
.user,
.notifications {
    width: 195px;
    padding: 15px;
    color: #ccc;
    overflow: auto;
    text-shadow: 1px 1px 1px #111;
    /* background: url(./assets/bg_left_spacer.png) repeat-x bottom; */
}
.username {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    letter-spacing: -1px;
    padding-bottom: 5px;
}
p {
    padding-top: 0px;
    margin: 0;
}
p {
    display: block;
    -webkit-margin-before: 1em;
    -webkit-margin-after: 1em;
    -webkit-margin-start: 0px;
    -webkit-margin-end: 0px;
}
th {
    background: #e0e0e0 url(./assets/bg_th.png) no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    text-shadow: 1px 1px 1px #fff;
    /* font-size: 14px; */
}
.user img {
    float: left;
    margin: 5px 15px 10px 0;
}
.hoverimg {
    background: #ccc;
    padding: 3px;
    float: left;
}
.user,
.notifications {
    width: 195px;
    padding: 15px;
    color: #ccc;
    overflow: auto;
    text-shadow: 1px 1px 1px #111;
    /* background: url(./assets/bg_left_spacer.png) repeat-x bottom; */
}
body {
    /* height: 100%; */
    /* font-family: Arial, Helvetica, sans-serif; */
    font-size: 13px;
    margin: 0;
    padding: 0;
    color: #666;
}
.el-header {
    background-color: #353535;
    text-align: left;
    line-height: 60px;
}
.el-footer {
    background-color: #b3c0d1;
    text-align: center;
    line-height: 60px;
    position: fixed;
    bottom: 0;
    width: 100%;
}
.el-header > img {
    padding-top: 14px;
}
.el-container > .el-container > .el-aside {
    background-color: #d3dce6;
    color: #333;
    text-align: left;
    /* line-height: 200px; */
}

.el-container > .el-container > .el-main {
    background-color: #e9eef3;
    color: #333;
    text-align: center;
    /* line-height: 160px; */
}
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
.ql-toolbar {
    text-align: left;
}
</style>
