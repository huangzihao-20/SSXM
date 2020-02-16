<template>
    <div class="home">
        <cuWork CUname="发布" />
    </div>
</template>
<script>
import cuWork from '@/components/cuWork.vue'
export default {
    name: 'uploadWork',
    components: {
        cuWork
    },
    created() {
        if (!this.$route.query.id || !this.$route.query.name) {
            this.$router.push("/ActivityList");
        }
        if (!this.$store.state.userName) {
            this.$message({
                showClose: true,
                message: "登录后才能发布作品",
                type: "warning"
            });
            this.$router.push("/Login");
        }
    }
}
</script>


