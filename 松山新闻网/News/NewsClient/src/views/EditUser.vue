<template>
  <div class="EditUser">    
    <CUUser CUname="修改"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CUUser from '@/components/CUUser.vue'

export default {
  name: 'EditUser',
  components: {
    CUUser
  }
}
</script>
