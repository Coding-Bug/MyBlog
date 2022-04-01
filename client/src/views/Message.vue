<template>
  <div id = 'Message'>
  <Guestbook :isComment="false" ref="GuestBook"></Guestbook>
  </div>
</template>

<script>
import Guestbook from '@/components/Guestbook'
export default {
  name:'Message',
  components:{
      Guestbook
  },
  deactivated(){
    this.$destroy(this.$refs.Guestbook)
  }
}
</script>

<style>

</style>