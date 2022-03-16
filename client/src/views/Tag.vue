<template>
  <div id="Tag">
    <div class="tag_container">
      <span
        class="tag_card"
        v-for="item in tagList"
        :key="item.tag_id"
        :style="{ color: getColor(item), 'font-size': getSize(item),'border-bottom':`1px solid ${getColor(item)}` }"
        @click="goToArticle(item.tag_name)"
      >
        {{ item.tag_name }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Tag",
  data() {
    return {
      // 不同数量的标签对应的颜色和尺寸
      type: [
        {
          color: "magenta",
          size: "1.9rem",
        },
        {
          color: "#1E90FF",
          size: "1.5rem",
        },
        {
          color: "#00ffffb3",
          size: "1.2rem",
        },
        {
          color: "#aaadb0",
          size: ".8rem",
        },
      ],
      //标签
      tagList: [],
    };
  },
  methods: {
    getColor(item) {
      if (item.tag_num <= 2) {
        return this.type[3].color;
      } else if (item.tag_num <= 3) {
        return this.type[2].color;
      } else if (item.tag_num <= 5) {
        return this.type[1].color;
      } else {
        return this.type[0].color;
      }
    },
    getSize(item) {
      if (item.tag_num <= 2) {
        return this.type[3].size;
      } else if (item.tag_num <= 3) {
        return this.type[2].size;
      } else if (item.tag_num <= 5) {
        return this.type[1].size;
      } else {
        return this.type[0].size;
      }
    },

    // 获取标签列表
    async getList() {
      try {
        let res = await this.$api.getTag();
        this.tagList = res.data;
      } catch (err) {
        this.$message.error(err);
      }
    },
    // 到列表页
    goToArticle(tag_name){
      this.$router.push({name:'article',params:{tag_name:tag_name}})
    }
  },
  mounted() {
    this.getList();
  },
};
</script>

<style lang="scss">
#Tag {
  display: flex;
  justify-content: center;
  align-items: center;
  .tag_container {
    display: inline-block;
    flex: 1;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    .tag_card {
      display: inline-block;
      user-select: none;
      cursor: pointer;
      margin:.5rem 1rem ;
      padding-bottom: .3rem;
      &:hover {
        transform: translate(-0.1rem, -0.1rem);
      }
    }
  }
}
</style>