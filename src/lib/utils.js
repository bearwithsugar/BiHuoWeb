// 统一函数工具
export default {
  // class
  addClass (obj, cls) {
    let classVal = obj.getAttribute('class') || ''
    classVal = classVal.concat(' ' + cls)
    obj.setAttribute('class', classVal)
  },
  removeClass (obj, cls) {
    let classVal = obj.getAttribute('class')
    classVal = classVal.replace(cls, '')
    obj.setAttribute('class', classVal)
  },
  // 检测手机号码格式
  checkPhone (phone) {
    return /^1(3|4|5|7|8)\d{9}$/.test(phone)
  },
  // 检测用户名是否在6到20位之间
  checkName (str) {
    return /^[a-zA-Z0-9_\u4e00-\u9fa5]{6,20}$/.test(str)
  },
  // 检测密码格式
  checkPsw (str) {
    return /^([a-zA-Z0-9]){6,20}$/.test(str)
  },
  // 验证邮箱
  checkEmail (str) {
    return /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(str)
  },
  // 时间戳格式转换
  formatDate (t) {
    return t.getFullYear() + '-' + (t.getMonth() + 1) + '-' + t.getDate() + ' ' + t.getHours() + ':' + t.getMinutes() + ':' + t.getSeconds()
  },
  // 时间戳相差日期计算
  DateCalculate (t1, t2) {
    let t = t2 - t1
    t = t / 1000
    let day = parseInt(t / 86400)
    t = t - day * 86400
    let hours = parseInt(t / 3600)
    t = t - hours * 3600
    let minutes = parseInt(t / 60)
    t = t - minutes * 60
    return {
      day,
      hours,
      minutes,
      t
    }
  },
  // 对localstorage的封装
  localData: {
    set (key, value) {
      let v = null
      if (typeof value === 'object') {
        try {
          v = JSON.stringify(value)
        } catch (e) {
          console.log(v)
        }
      } else if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
        v = value
      }
      localStorage.setItem(key, v)
    },
    get (key) {
      let v = localStorage.getItem(key)
      if (typeof v === 'string') {
        try {
          if (v.search(/^\{/) > -1 || v.search(/^\[/) > -1) {
            return JSON.parse(v)
          } else {
            return v
          }
        } catch (e) {
          console.log(v)
        }
      }
      return undefined
    },
    remove (key) {
      localStorage.removeItem(key)
    }
  },
  // 是否为空对象
  isEmptyObject (e) {
    var t 
    for (t in e) {
      return !1
    }
    return !0
  },
  // 检查是否为json字符串,为true，转化为json对象
  parseJson (str) {
    if (typeof str === 'string') {
      try {
        if (str.search(/^\{/) > -1 || str.search(/^\[/) > -1) {
          return JSON.parse(str)
        } else {
          return str
        }
      } catch (e) {
        throw new Error('Cannot be converted to json format.')
      }
    } else if (typeof str == 'object') {
      return str
    } else {
      throw new Error("params is not json type")
    }
  },
  addStyle (customStyle, eleId) {
    let eleStyle = eleId ? document.getElementById(eleId) : false
  
    if (eleStyle) {
      eleStyle.innerHTML = customStyle
    } else {
      let newStyleEle = document.createElement('style')
      newStyleEle.type = 'text/css'
      newStyleEle.id = eleId
      newStyleEle.innerHTML = customStyle
      document.getElementsByTagName('head').item(0).appendChild(newStyleEle)
    }
  }
}
