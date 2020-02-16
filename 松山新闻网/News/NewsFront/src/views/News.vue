<template>
  <div class="home">
    <el-row class="workmargin">
      <!-- <img width="100%" alt="logo" src="../assets/banner.jpg"> -->
    <el-row :gutter="0">
			<el-carousel :interval="1000" arrow="never" width="500px" height="600px" type="card">
				<el-carousel-item v-for="item in dataimg" :key="item.id">
					<div class="grid-content">
						<el-col :md="12" :offset="6">
							<div>
								<img :src="item.src">
							<p><a href="#" style="text-decoration:none;color:red">{{item.txt}}</a></p>
								<span>{{item.txt2}}</span>
								<p>{{item.txt3}}</p>
							</div>
						</el-col>
					</div>
				</el-carousel-item>
			</el-carousel>
<marquee direction="left" width="100%" height="50px" behavior="alternate" style="font-size:20px;font-style:bold;color:red;">欢迎进入松山新闻网</marquee>
 </el-row>
  
    </el-row>
    <el-row class="worktype workmargin" style="margin-top:10px">
      <i class="el-icon-s-opportunity"></i>&nbsp;热点要闻
    </el-row>
    <el-row>
      <el-col :span="12" :md="6" v-for="o in works" :key="o.workId" class="workinfo">
        <div class="imgDiv workmargin">
          <router-link :to="{name:'Work',params: {id:o.workId}}">
            <img class="image" :src="URL+'/'+o.workPicture" />
          </router-link>
        </div>
        <div class="worktext workmargin">
          <div class="workname nav">
            <span>作品：
              <router-link :to="{name:'Work',params: {id:o.workId}}">{{o.workName}}</router-link>
            </span>
            <img v-if="o.recommend=='是'" width="22px" />
          </div>
        </div>
      </el-col>
    </el-row>
    <el-row class="worktype workmargin" style="margin-bottom:10px">
      <i class="el-icon-s-opportunity"></i>&nbsp;推荐新闻
    </el-row>
    <el-row>
      <el-col :span="24" :sm="16" :md="18">
        <el-row>
          <el-col :sm="12" :md="8" v-for="o in workRecommends" :key="o.workId" class="workinfo">
            <el-card class="workmargin2" style="margin-bottom:10px">
              <div class="worktext">
                <div>新闻记者：{{o.userName}}</div>
              </div>
              <div class="imgDiv">
                <router-link :to="{name:'Work',params: {id:o.workId}}">
                  <img class="image2" :src="URL+'/'+o.workPicture" />
                </router-link>
              </div>
              <div class="worktext">
                <div class="workname nav">标题：
                  <router-link :to="{name:'Work',params: {id:o.workId}}">{{o.workName}}</router-link>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-row class="worktype workmargin">
          <i class="el-icon-s-opportunity"></i>&nbsp;昨天新闻
        </el-row>
        <el-row class="workmargin" v-for="a in activitys" :key="a.$index">
          <el-container style="text-align:left">
            <el-aside width="200px" style="padding-top:10px">
              <router-link :to="{name:'Activity',params: {id:a.activityId}}">
                <img width="200px" height="130px" :src="URL+'/'+a.activityPicture">
              </router-link>
            </el-aside>
            <el-main style="padding-top:0">
              <h4 class="nav">
                <router-link :to="{name:'Activity',params: {id:a.activityId}}">{{a.activityName}}</router-link>
              </h4>
              <p>{{a.summary}}</p>
              <p>新闻结束时间：{{a.endTime|date}}</p>
            </el-main>
          </el-container>
        </el-row>
      </el-col>
      <el-col :span="24" :sm="8" :md="6">
        <el-card class="workmargin" shadow="never">
          <div slot="header" class="worktype">
            <i class="el-icon-date"></i>&nbsp;推荐新闻
          </div>
          <router-link :to="{name:'Activity',params: {id:activityRecommend.activityId}}">
            <img width="100%" v-if="activityRecommend.activityPicture" :src="URL+'/'+activityRecommend.activityPicture">
          </router-link>
          <div class="nav">
            <router-link :to="{name:'Activity',params: {id:activityRecommend.activityId}}">{{activityRecommend.activityName}}</router-link>
          </div>
        </el-card>
        <el-card class="workmargin" style="margin-top:10px" shadow="never">
          <div slot="header" class="worktype">
            <i class="el-icon-date"></i>&nbsp;已结束新闻
          </div>
          <router-link :to="{name:'Activity',params: {id:activityEnd.activityId}}">
            <img width="100%" v-if="activityEnd.activityPicture" :src="URL+'/'+activityEnd.activityPicture">
          </router-link>
          <div class="nav">
            <router-link :to="{name:'Activity',params: {id:activityEnd.activityId}}">{{activityEnd.activityName}}</router-link>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  data() {
    return {
      works: [],
      workRecommends: [],
      activitys: [],
      activityRecommend: {},
      activityEnd: {},
     dataimg: [{
						src: require('../assets/1.jpg'),
						txt: '习近平会见出席2019年“创新经济论坛”外方代表',
						txt2: new Date(),
						txt3: '来源:松山新闻网'
					},
					{
						src: require('../assets/2.jpg'),
						txt: '习近平会见国际货币基金组织总裁格奥尔基耶娃',
						txt2: new Date(),
						txt3: '来源:松山新闻网'
					},
					{
						src: require('../assets/3.jpg'),
						txt: '习近平会见美国前国务卿基辛格',
						txt2: new Date(),
						txt3: '来源:松山新闻网'
          },
          	{
						src: require('../assets/4.jpg'),
						txt: '一箭双星 中国成功发射第50、51颗北斗导航卫星',
						txt2: new Date(),
						txt3: '来源:松山新闻网'
          },
          {
						src: require('../assets/5.jpg'),
						txt: '美国纽约州纽科姆地区上空现罕见蓝色北极光',
						txt2: new Date(),
						txt3: '来源:松山新闻网'
          },
          {
						src: require('../assets/6.jpg'),
						txt: '惊险刺激，看得腿软！勇者在法国挑战高空走绳',
						txt2:  new Date(),
						txt3: '来源:松山新闻网'
          }
     ]
    }
  },
  created () {
    var url1 = this.URL + "/api/newsinfo/new";
    fetch(url1)
      .then(res => res.json())
      .then(res => {
        if (res.code == 1)
          this.works = res.data;
          // console.log(this.works);
      })

    var url2 = this.URL + "/api/newsinfo/recommend";
    fetch(url2)
      .then(res => res.json())
      .then(res => {
        if (res.code == 1)
          this.workRecommends = res.data;
      })
    var url3 = this.URL + "/api/Verification/new";
    fetch(url3)
      .then(res => res.json())
      .then(res => {
        if (res.code == 1)
          this.activitys = res.data;
      })
    var url4 = this.URL + "/api/Verification/recommend";
    fetch(url4)
      .then(res => res.json())
      .then(res => {
        if (res.code == 1)
          this.activityRecommend = res.data;
      })
    var url5 = this.URL + "/api/Verification/end";
    fetch(url5)
      .then(res => res.json())
      .then(res => {
        if (res.code == 1)
          this.activityEnd = res.data;
      })
  }

  // components: {
  //   HelloWorld
  // }
}
</script>
<style>
.nav{
  font-size:13px;
}
</style>


