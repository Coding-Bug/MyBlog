// 封装mongodb增删改查操作

module.exports = {
  insert(options) {
    return new Promise((resolve, reject) => {
      options = options || {}; // 防空报错
      options.data = options.data;
      options.colName.insertMany(options.data, (err) => {
        // 没有err其内部在调用回调时候会占位的
        err ? reject(err) : resolve();
      });
    });
  },

  update(options) {
    return new Promise((resolve, reject) => {
      options = options || {};
      options.where = options.where || {};
      options.newdata = options.newdata || {};
      options.type = options.type || 1;
      options.type = options.type === 1 ? "updateOne" : "updateMany";
      options.colName[options.type](options.where, options.newdata, (err) => {
        err ? reject(err) : resolve();
      });
    });
  },

  delete(options) {
    return new Promise((resolve, reject) => {
      options = options || {}
      options.where = options.where || {}
      options.type = options.type || 1;
      options.type = options.type === 1 ? "deleteOne" : "deleteMany";
      options.colName.deleteOne(options.where, err => {
        err ? reject(err) : resolve()
      })
    })
  },

  find(options) {
    return new Promise((resolve, reject) => {

      options = options || {}
      options.where = options.where || {}
      options.show = options.show || { __v: 0 }
      options.setting = options.setting || {}
      let find = options.colName.find(options.where, options.show, (err, data) => {
        if (data) {
          if (data.length != undefined) {
            let arr = []
            data.forEach(element => {
              arr.push(element)
            });
            resolve(arr)
          } else {
            reject(data)
          }
        }
      })
      // 在下面定义也没事，因为上面回调是异步的
      
      if (typeof options.setting.skip === "number") {
        find.skip(options.setting.skip)
      }
      if (typeof options.setting.limit === "number") {

        find.limit(options.setting.limit)
      }
      if (typeof options.setting.sort === "object") {
        find.sort(options.setting.sort)
      }

    })
  },

  count(options) {
    return new Promise((resolve, reject) => {
      options = options || {}
      options.where = options.where || {}
      options.colName.count(options.where, (err, count) => {
        err ? reject(err) : resolve(count)
      })
    })

  }

};
