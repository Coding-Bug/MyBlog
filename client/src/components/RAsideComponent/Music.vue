<template>
  <div id="Music">
<iframe id = "iframe" frameborder="no" border="0" marginwidth="0" margin="0" marginheight="0" width=60 height=450 src="//music.163.com/outchain/player?type=0&id=2086954344&auto=1&height=430"></iframe>



  </div>
</template>

<script>
export default {
    name:'Music',
    mounted(){

    },
    methods:{
      // 初始化iframe
      initIframe(){
        const iframeBox = document.getElementById("#iframe").contentWindow.document
        // // 获取ifram的html
        // const doc = iframeBox.contentWindow.document
        // // 获取容器
        // const player = doc.querySelector("player")
        // console.log('aaa',player)
        console.log(iframeBox)
      }

    }


}
</script>

<style lang="scss">
  #Music{
      width: 200px;
      margin-top: 50px;
      iframe{
        width: 200px;
      }
  }
</style>