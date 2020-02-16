<template>
    <div class="home">
        <el-row class="workmargin" v-for="a in activitys" :key="a.$index" style="text-align:left">
            <el-container v-if="wind>700">
                <el-aside style="padding-top:10px">
                    <img width="300px" height="175px" :src="URL+'/'+a.activityPicture">
                </el-aside>
                <el-main style="padding-top:0">
                    <h2>{{a.activityName}}<img v-if="a.recommend=='是'" width="22px" /></h2>
                    <p>{{a.summary}}</p>
                    <p>新闻结束时间：{{a.endTime|date}}</p>
                    <router-link v-if="a.activityStatus==1" :to="{path:'/UploadWork',query: {id: a.activityId,name:a.activityName}}" class="enter">>>发布新闻</router-link>
                    <span v-else>新闻已结束</span>
                </el-main>
            </el-container>
            <div v-else>
                <el-aside style="padding-top:10px">
                    <img width="300px" height="175px" :src="URL+'/'+a.activityPicture">
                </el-aside>
                <el-main style="padding-top:0">
                    <h2>{{a.activityName}}<img v-if="a.recommend=='是'" width="22px"/></h2>
                    <p>{{a.summary}}</p>
                    <p>新闻结束时间：{{a.endTime|date}}</p>
                    <router-link v-if="a.activityStatus==1" :to="{path:'/UploadWork',query: {id: a.activityId,name:a.activityName}}" class="enter">>>参加活动</router-link>
                    <span v-else>新闻已结束</span>
                </el-main>
            </div>
        </el-row>
        <el-row class="pagerow">
            <el-pagination @current-change="pagechange" :current-page.sync="ccPage" background layout="prev, pager, next" :total="pTotal" :page-size="pSize" :hide-on-single-page="true">
            </el-pagination>
        </el-row>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activitys: [],
            pTotal: 1,
            pSize: 2,
            ccPage: 1,
            wind: 1000
        }
    },
    methods: {
        pagechange(val) {
            var url = this.URL + "/api/Verification/verifyPage";
            var data = { pageIndex: val, pageSize: this.pSize };
            fetch(url, {
                method: "post",
                body: JSON.stringify(data),
                headers: { "content-type": "application/json" }
            })
                .then(res => res.json())
                .then(res => {
                    console.log(res.data);
                    if (res.code == 1) this.activitys = res.data;
                    else this.activitys = [];
                });
        },
        calcCount(val) {
            var url = this.URL + "/api/Verification/verifyCount";
            fetch(url)
                .then(res => res.json())
                .then(res => {
                    this.pTotal = res;
                    this.pagechange(val);
                });
        }
    },
    created() {
        this.calcCount(1);
        this.wind = window.innerWidth;
        window.onresize = () => {
            return (() => {
                this.wind = window.innerWidth;
            })()
        }

    }
}
</script>




