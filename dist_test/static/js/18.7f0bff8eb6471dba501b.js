webpackJsonp([18],{"7+db":function(t,e,n){"use strict";function o(t){n("Hoc+")}Object.defineProperty(e,"__esModule",{value:!0});var r={data:function(){return{carTab:"info",mainType:[{name:"账号信息",id:"",route:"info"},{name:"修改密码",id:"",route:"editpsw"},{name:"我的订单",id:"",route:"order"}]}},mounted:function(){var t=document.querySelector(".right-content");t.scrollTop=0,console.log(t)},created:function(){this.$emit("leftAct",3)},methods:{toggleTab:function(t){var e=this;e.carTab=t.route,console.log(t),t.route&&e.$router.push({path:"/nav-center/"+t.route})}}},a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("p",{staticClass:"main-title"},[t._v("账户中心")]),t._v(" "),n("ul",{staticClass:"main-type flexBox"},t._l(t.mainType,function(e,o){return n("li",{key:o,class:t.carTab==e.route?"act":"",on:{click:function(n){t.toggleTab(e)}}},[t._v("\n      "+t._s(e.name)+"\n    ")])})),t._v(" "),n("transition",[n("router-view")],1)],1)},i=[],c={render:a,staticRenderFns:i},u=c,s=n("Z0/y"),l=o,d=s(r,u,!1,l,"data-v-b3001710",null);e.default=d.exports},"Hoc+":function(t,e){}});
//# sourceMappingURL=18.7f0bff8eb6471dba501b.js.map