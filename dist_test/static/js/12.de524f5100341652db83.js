webpackJsonp([12],{"4o1g":function(t,e){},NmIh:function(t,e,i){"use strict";function s(t){i("gvKj"),i("4o1g"),i("eJ1N")}Object.defineProperty(e,"__esModule",{value:!0});var n={props:{activityFormList:{type:Array},userDefinedList:{type:Array},preview:{type:Object}},data:function(){return{}},methods:{addList:function(){this.userDefinedList.push({id:null,name:"",uid:null}),this.preview.type=2,this.preview.content=1},removeList:function(t,e){e?this.userDefinedList.splice(t,1):this.activityFormList.splice(t,1),this.preview.type=2,this.preview.content=1}},mounted:function(){console.log(this.activityFormList)},beforeDestroy:function(){this.preview.type=1}},o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"box"},[i("el-form",[i("el-form-item",[i("div",{staticClass:"collect"},[i("div",{staticStyle:{color:"#606266"}},[t._v("*报名收集：")]),t._v(" "),i("div",{staticClass:"collect-input"},[i("ul",[t._l(t.activityFormList,function(e,s){return i("li",{key:"activityFormList"+s},[i("el-input",{staticStyle:{width:"220px"},attrs:{size:"medium",placeholder:e.name,readonly:"readonly"}},[e.isNeed?i("i",{staticClass:"el-input__icon",attrs:{slot:"suffix"},slot:"suffix"},[i("img",{staticStyle:{position:"relative",top:"-14px",left:"-6px"},attrs:{src:"static/imgs/manage/editor/lock.png"}})]):i("i",{staticClass:"pointer el-input__icon el-icon-remove-outline",attrs:{slot:"suffix"},on:{click:function(e){t.removeList(s,!1)}},slot:"suffix"})])],1)}),t._v(" "),t._l(t.userDefinedList,function(e,s){return i("li",{key:"userDefinedList"+s},[i("el-input",{staticClass:"userDefined",staticStyle:{width:"220px"},attrs:{size:"medium",placeholder:"自定义选项"},model:{value:e.name,callback:function(i){t.$set(e,"name",i)},expression:"item.name"}},[i("i",{staticClass:"pointer el-input__icon el-icon-remove-outline",attrs:{slot:"suffix"},on:{click:function(e){t.removeList(s,!0)}},slot:"suffix"})])],1)}),t._v(" "),i("el-input",{staticClass:"userDefined",staticStyle:{width:"220px"},attrs:{size:"medium",readonly:"readonly",placeholder:"自定义选项"}},[i("i",{staticClass:"pointer el-input__icon el-icon-circle-plus-outline",attrs:{slot:"suffix"},on:{click:t.addList},slot:"suffix"})])],2)]),t._v(" "),i("div",t._l(t.activityFormList,function(e,s){return i("p",{directives:[{name:"show",rawName:"v-show",value:e.isNeed,expression:"item.isNeed"}],key:"activityFormItem"+s,staticClass:"font-small"},[t._v("必填，不可更改")])}))])])],1),t._v(" "),i("div",{staticClass:"next"},[i("router-link",{attrs:{to:{name:"sponsor",params:{id:t.$route.params.id}}}},[i("img",{attrs:{src:"static/imgs/manage/editor/next.png"}}),t._v(" "),i("span",[t._v("下一步")])])],1)],1)},a=[],l={render:o,staticRenderFns:a},r=l,c=i("Z0/y"),u=s,p=c(n,r,!1,u,"data-v-10c1abd3",null);e.default=p.exports},eJ1N:function(t,e){},gvKj:function(t,e){}});
//# sourceMappingURL=12.de524f5100341652db83.js.map