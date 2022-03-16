<template>
  <div id='RAside'>

  </div>
</template>

<script>
export default {
    name:"RAside",
}
</script>

<style lang="scss">
#RAside{
    width: 200px;
    height: 600px;
    font-size: 17px;
    margin-top: 50px;
    background-color: rgba(116, 119, 119, 0.4);
}

@media screen and(max-width:768px) {
    #RAside{
        display: none;
    }
}


</style>