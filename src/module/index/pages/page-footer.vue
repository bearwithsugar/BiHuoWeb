<template>
  <div class="page-footer">
    <div class="page-footer_wrap">
      <div class="col-first">
        <div>
          <img src="/static/imgs/index/bihuo-qrcode.png" style="width:116px;height:116px;margin-top:11px; " alt="bihuo-qrcode">
          <p>用手机就能创建活动？</p>
          <p>赶紧扫码进入</p>
        </div>
        <div><img src="/static/imgs/index/icon bottomBihuo.png" style="width: 90px;height: 21px;"></div>
      </div>
      <div>
        <dl>
          <dd>关于我们</dd>
          <dt>必火简介</dt>
          <dt>加盟合作</dt>
          <dt>加入我们</dt>
        </dl>
        <dl>
          <dd>联系我们</dd>
          <dt>电话：0731-88803223</dt>
          <dt>周一到周日 9:00-18:00</dt>
        </dl>
        <ul>
          <li>
            <div class="icon"></div>
            <p>咨询合作</p>
          </li>
          <li>
            <div class="icon"></div>
            <p>客户咨询</p>
          </li>
        </ul>

        <ul class="pageFooter-list">
          <li class="pageFooter-list2">
            <img src="/static/imgs/index/icon co.png" style="width:24px;height: 26px;">
            <p>合作咨询</p>
          </li>
          <li class="pageFooter-list2">
            <img src="/static/imgs/index/icon customer.png" style="width:26px;height: 26px;">
            <p>客服咨询</p>
          </li>
        </ul>
      </div>
      <div>
        <dl>
          <dd>抽奖活动 － 超级大转盘互动</dd>
          <dt>投票活动 － 品牌引流</dt>
          <dt>红包派发 － 吸粉必备</dt>
          <dt>砍价助力 － 砍价、集赞、拆礼盒</dt>
          <dt>强制关注 － 公号涨粉</dt>
          <dt>分享奖励 - 客户裂变</dt>
          <dt>信息采集 - 轻松获客</dt>
          <dt>各类派奖 - 抽奖、排名、报名、参与送</dt>
          <dt>微信卡劵 - 怒刷存在</dt>
          <dt>短信群发 - 定制短信批量群发</dt>
          <dt>营销课堂 - 资深同行爆款案例</dt>
          <dt>客户管理 - 在线营销服务部</dt>
        </dl>
      </div>
      <div>
        <dl>
          <dd>必火动态</dd>
          <dt>教程 ｜ 如何借助h5游戏进行节日营销？</dt>
          <dt>更新 ｜ 必火互动功能更新</dt>
          <dt>更新 ｜ 必火新功能3连发！再次 “引爆”票圈！</dt>
          <dt>教程 ｜ 如何借助h5游戏进行节日营销？</dt>
          <dt>更新 ｜ 必火互动功能更新</dt>
          <dt>更新 ｜ 必火新功能3连发！再次 “引爆”票圈！</dt>
          <dt>教程 ｜ 如何借助h5游戏进行节日营销？</dt>
          <dt>更新 ｜ 必火互动功能更新</dt>
          <dt>更新 ｜ 必火新功能3连发！再次 “引爆”票圈！</dt>
        </dl>
        <p class="more">更多动态
          <span class="icon icon-right"></span>
        </p>
      </div>
    </div>
    <div class="row-line"></div>
    <div class="websit-auth">© 2018-2018 okbihuo.com <img class="website_approve_icon" src="../images/website_approve_icon.png" alt="湘公网安备图标"> 湘公网安备 43010402000531号 湘ICP备 18008669号-1</div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.page-footer {
  background: #373d44;
  padding: 71px 0;

  .page-footer_wrap {
    width: 1200px;
    margin: 0 auto;
    line-height: 2;
    color: #fff;
    font-size: 14px;

    display: flex;
    justify-content: space-between;

    .col-first {
      display: flex;
      flex-flow: column wrap;
      justify-content: space-between;
      text-align: center;
    }

    dd {
      font-size: 22px;
    }
    .more {
      margin-top: 2em;
    }
    .pageFooter-list {
      display: flex;
      justify-content: space-around;
      width: 143px;
      height: 50px;
      padding: 25px 0px;
      margin: 0px -9px;
      .pageFooter-list2 {
        text-align: center;
        img {
        }
        p {
          font-size: 14px;
          text-align: center;
        }
      }
    }
  }
  .row-line {
    width: 1200px;
    height: 1px;
    margin: 51px auto 35px;
    background: #68727e;
  }
  .websit-auth {
    width: 1200px;
    margin: 0 auto;
    text-align: center;
    color: #73777d;
    font-size: 12px;

    .website_approve_icon{
      width: 1em;
      height: auto;
      vertical-align: text-top;
    }
  }
}
</style>

