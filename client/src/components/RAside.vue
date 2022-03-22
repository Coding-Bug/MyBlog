<template>
  <div id='RAside'>
    <About></About>
    <!-- <Music></Music> -->
  </div>
</template>

<script>
import About from '@/components/RAsideComponent/About.vue'
// import Music from '@/components/RAsideComponent/Music.vue'
export default {
    name:"RAside",
    components:{
        About,
        // Music
    }
}
</script>

<style lang="scss">
#RAside{
    position: fixed;
    width: 200px;
    font-size: 17px;
    margin-top: 50px;
    ;
}

@media screen and(max-width:768px) {
    #RAside{
        display: none;
    }
}


</style>