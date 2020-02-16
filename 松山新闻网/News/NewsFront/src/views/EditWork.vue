<template>
    <div class="home">
        <cuWork CUname="修改" />
    </div>
</template>
<script>
import cuWork from '@/components/cuWork.vue'
export default {
    name: 'EditWork',
    components: {
        cuWork
    },
    created() {
        if (!this.$route.query.workId) {
            this.$router.push("/WorkList");
        }
        if (!this.$store.state.userName) {
            this.$message({
                showClose: true,
                message: "登录后才能修改作品",
                type: "warning"
            });
            this.$router.push("/Login");
        }
    }    
}
</script>

