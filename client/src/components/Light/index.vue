<template>
  <div id="lampadario" @click="changeBg">
    <input type="radio" name="switch" value="on" />
    <input type="radio" name="switch" value="off" checked />
    <label for="switch"></label>
    <!-- 吊灯绳子 -->
    <div id="filo"></div>
    <!-- 薄层 -->
    <div id="lampadina">
      <div id="sorpresa">
        <div id="footer"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "light",
  methods: {
    changeBg() {
      this.$emit("changeBackground");
    },
  },
};
</script>

<style scoped>
#lampadario {
  position: fixed;
  left: 5%;
  top: 0;
  cursor: pointer;
  z-index: 1;
}

/* 绳子样式 */
#filo {
  position: relative;
  background-color: #000000;
  width: 2px;
  height: 100px;
  z-index: 99;

  /* 将中心点的位置放到左上角 */
  -webkit-transform-origin: 0% 0%;
  -moz-transform-origin: 0% 0%;
  -ms-transform-origin: 0% 0%;
  -o-transform-origin: 0% 0%;
  transform-origin: 0% 0%;

  /* 为绳子添加动画 */
  /* 两端慢,中间快,复合灯的摇晃,0s是开始无延迟 */
  -webkit-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  -moz-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  -ms-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  -o-animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
  animation: oscillaFilo 0.9s ease-in-out 0s infinite alternate;
}

/* 构建灯泡头部 */
#filo:after {
  content: " ";
  height: 0;
  width: 4px;
  position: absolute;
  left: -5px;
  top: 100%;
  border-bottom: 15px solid #000000;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
}

/* 设置input通用样式 */
input {
  position: absolute;
  width: 90px;
  height: 70px;
  /* 15+35+100 */
  top: 150px;
  margin-left: -45px;
  opacity: 0;
  z-index: 1;
  cursor: pointer;
}

/* 设置开关等逻辑 */
/* on表示开灯按钮 */
input[value="on"] {
  top: 110px;
}
input[value="off"] {
  top: -100px;
}
input[value="on"]:checked {
  top: -100px;
}
/* 下面+是兄弟选择器，也就是选的是off */
input[value="on"]:checked + input[value="off"] {
  top: 110px;
}

/* 设置灯泡 */
label {
  width: 51px;
  height: 51px;
  /* 100+14 */
  top: 114px;
  position: absolute;
  left: 0;
  margin-left: -24px;
  -webkit-border-radius: 100%;
  -moz-border-radius: 100%;
  -ms-border-radius: 100%;
  -o-border-radius: 100%;
  border-radius: 100%;
  /* 设置灯泡动画 */
  -webkit-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  -moz-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  -ms-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  -o-animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
  animation: oscillaLampadina 0.9s ease-in-out 0s infinite alternate;
}

/* 等关的时候灯泡的样式 */
input[value="off"]:checked ~ label {
  background-color: rgba(223, 223, 223, 0.767);
  /* 设置内部阴影以及外部阴影 第二个参数是上下的 */
  /* 其实是加点小亮光 */
  -webkit-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    /* 这个是让灯泡后面有点投影 */ -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
  -moz-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);

  -o-box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);

  box-shadow: inset 0px 1px 5px rgba(255, 255, 255, 0.5),
    inset 0px 2px 20px rgba(255, 255, 255, 0.1),
    -80px -15px 15px -5px rgba(0, 0, 0, 0.1);
}

input[value="on"]:checked ~ label {
  background: rgba(255, 227, 66, 0.8);
  /* 发光灯泡阴影 */
  /* 越往外越浅 */
  -webkit-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    /* 处理背后的阴影 */ -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  -moz-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  -ms-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    /* 处理背后的阴影 */ -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  -o-box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    /* 处理背后的阴影 */ -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
  box-shadow: 0px 0px 10px rgba(255, 227, 66, 0.8),
    0px 0px 30px rgba(255, 227, 66, 0.8), 0px 0px 50px rgba(255, 227, 66, 0.6),
    0px 0px 70px rgba(255, 227, 66, 0.6),
    /* 处理背后的阴影 */ -80px -15px 120px 0px rgba(255, 227, 66, 0.4);
}

/* 动画关键帧 */
@-webkit-keyframes oscillaFilo{
    from{
        -webkit-transform: rotate(5deg);
    }
    to{
        -webkit-transform: rotate(-5deg);
    }
}
@-moz-keyframes oscillaFilo{
    from{
        -moz-transform: rotate(5deg);
    }
    to{
        -moz-transform: rotate(-5deg);
    }
}

@-ms-keyframes oscillaFilo{
    from{
        -ms-transform: rotate(5deg);
    }
    to{
        -ms-transform: rotate(-5deg);
    }
}
@-o-keyframes oscillaFilo{
    from{
        -o-transform: rotate(5deg);
    }
    to{
        -o-transform: rotate(-5deg);
    }
}
@keyframes oscillaFilo{
    from{
        transform: rotate(5deg);
    }
    to{
        transform: rotate(-5deg);
    }
}

/* 灯泡动画关键帧 */
@-webkit-keyframes oscillaLampadina{
    from{
        -webkit-transform: rotate(3deg) translate(-14px,-0.5px)
    }
    to{
        -webkit-transform: rotate(-3deg) translate(14px,-0.5px);
    }
}
@-moz-keyframes oscillaLampadina{
    from{
        -moz-transform: rotate(3deg) translate(-14px,-0.5px)
    }
    to{
        -moz-transform: rotate(-3deg) translate(14px,-0.5px);
    }
}
@-ms-keyframes oscillaLampadina{
    from{
        -ms-transform: rotate(3deg) translate(-14px,-0.5px)
    }
    to{
        -ms-transform: rotate(-3deg) translate(14px,-0.5px);
    }
}

@-o-keyframes oscillaLampadina{
    from{
        -o-transform: rotate(3deg) translate(-14px,-0.5px)
    }
    to{
        -o-transform: rotate(-3deg) translate(14px,-0.5px);
    }
}

@keyframes oscillaLampadina{
    from{
        transform: rotate(3deg) translate(-14px,-0.5px)
    }
    to{
        transform: rotate(-3deg) translate(14px,-0.5px);
    }
}



</style>