<template>
  <div id="index">
    <div class="container" v-if="!isAdmin">
      <Header :showSome="showSome"></Header>
    </div>
  </div>
</template>


<script>
import Header from "../components/Header.vue";
export default {
  components: {
    Header,
  },
  data() {
    return {
      showSome: true,
    };
  },
};
</script>

<style lang ='scss' scoped>
#index{
    display: flex;
    flex-direction: column;
    width: 100%;
}

.container{
    width: 1000px;
    margin: 0 auto;
}
</style>