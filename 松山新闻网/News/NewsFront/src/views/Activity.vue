<template>
    <div class="home">
        <div v-if="activity.activityVerify=='审核通过'" class="workmargin">
            <el-card>
                <el-row class="workid">
                    <span>新闻名称：{{activity.activityName}}<img v-if="activity.recommend=='是'" width="22px" src='../assets/recommend.jpg' /></span>
                    <span>新闻发布人：{{activity.userName}}</span>
                </el-row>
                <el-row class="workid">
                    <span>新闻结束时间：{{activity.endTime|date}}</span>
                    <span v-if="activity.activityStatus==1">
                        <router-link :to="{path:'/UploadWork',query: {id: activity.activityId,name:activity.activityName}}" class="enter">>>参加活动</router-link>
                    </span>
                    <span v-else>新闻已结束</span>
                </el-row>
                <el-row class="Introduction">
                    <div v-html="activity.activityIntroduction"></div>
                </el-row>
            </el-card>
        </div>
        <div v-else>新闻不存在或尚未审核通过</div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activity: {},
        }
    },
    created() {
        var url = this.URL + "/api/Verification/" + this.$route.params.id;
        fetch(url)
            .then(res => res.json())
            .then(res => {
                if (res.code == 1) {
                    this.activity = res.data;
                }
            })
    }
}
</script>

