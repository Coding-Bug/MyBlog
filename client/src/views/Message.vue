<template>
  <div id = 'Message'>
  <Guestbook :isComment="false" ></Guestbook>
  </div>
</template>

<script>
import Guestbook from '@/components/Guestbook'
export default {
  name:'Message',
  components:{
      Guestbook
  }
}
</script>

<style>

</style>