<template>
  <div class="AddActivity">    
    <CUActivity CUname="发布"/>
  </div>
</template>

<script>
// @ is an alias to /src
import CUActivity from '@/components/CUActivity.vue'

export default {
  name: 'AddActivity',
  components: {
    CUActivity
  }
}
</script>