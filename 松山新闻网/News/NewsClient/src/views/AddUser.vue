<template>
  <div class="AddUser">    
    <CUUser CUname="添加"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CUUser from '@/components/CUUser.vue'

export default {
  name: 'AddUser',
  components: {
    CUUser
  }
}
</script>
