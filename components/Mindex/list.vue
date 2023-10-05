<template>
  <div>
    <ul class="new_list" v-for="(item,index) in promoteList" :key="index">
      <li @click="Onclick(item.promoteId)">
        <diV class="flex">
          <div class="img">
            <img :src="item.promoteShowUrl" class="new_img" />
            <span class="year" v-if="type=='new'">{{item.promoteExpressing}}</span>
            <span class="num" v-if="type=='new'">{{item.promoteProvince}}</span>
            <span
              class="num"
              v-if="type=='租房'"
            >{{item.rentType?$t("message.global.sublease"):$t("message.global.entireTenancy")}}</span>
          </div>
          <div class="text">
            <p class="text_title" v-if="type=='new'">{{item.promoteEstate}}</p>
            <p class="text_title" v-else-if="type == 'second_hand'">{{item.promoteTitle}}</p>
            <p class="text_title" v-else-if="type == '租房'">{{item.promoteTitle}}</p>

            <p
              class="sort"
              v-if="type=='new'"
            >{{item.promoteMinHall}} - {{item.promoteMaxHall}}{{$t("message.global.P")}}</p>
            <p
              class="sort"
              v-if="type =='second_hand'"
            >{{item.promoteBigProvince}}/{{item.promoteProvince}}</p>
            <p class="sort" v-if="type =='租房'">{{item.promoteProvince}}/{{item.promoteCity}}</p>

            <p class="font" v-if="type=='new'">
              <span class="itemize" v-for="(items,index) in item.tags" :key="index">{{items}}</span>
            </p>
            <p class="font" v-else-if="type == 'second_hand'">
              <span class="itemize">{{item.promoteRoomNum}}{{$t("message.global.P")}}</span>
              <span class="itemize">{{item.promoteBedRoomNum}}{{$t("message.global.bedroom")}}</span>
              <span class="itemize">{{item.promoteAcreage}}{{$t("message.global.square")}}</span>
            </p>
            <p class="font" v-if=" type == '租房' ">
              <span
                class="itemize"
              >{{item.promoteSource?$t("message.global.Personal"):$t("message.global.Intermediary")}}</span>
              <span
                class="itemize"
                v-show="item.promoteSchool == '1'"
              >{{$t("message.global.jinxuexiao")}}</span>
            </p>

            <p class="money" v-if="type=='new'">
              {{item.promoteLowPrice}}{{$t("message.global.rise")}} - {{item.promoteMaxPrice}}{{$t("message.global.rise")}}
              <span></span>
            </p>
            <p class="money" v-else-if="type == 'second_hand'">
              {{item.promoteTotal}} {{$t("message.global.rise")}}
              <span
                style="font-size:.12rem;color:rgba(172,172,172,1);"
              >{{item.promoteUnit}}€/{{$t("message.global.square")}}</span>
            </p>
            <p
              class="money"
              v-else-if="type == '租房'"
            >{{item.promoteTotal}} {{$t("message.global.rise")}}</p>
          </div>
        </diV>
        <!-- <div >
            <div class="image">
                <img src="~/assets/image/newhouse.png" class="list-img">  
                <span class="list-font">Cogedim</span>
            </div>
            <p class="font">
                    <span class="itemize">低TVA</span>
                    <span class="itemize">低TVA</span>
                    <span class="itemize">低TVA</span>
            </p>
        </div>-->
      </li>
      <hr class="hr" />
    </ul>
  </div>
</template>
<script>
export default {
  props: ["promoteList", "type"],
  methods: {
    Onclick(val) {
      if (this.type == "new") {
        this.$router.push({
          path: "/Details",
          query: { id: val }
        });
      } else if (this.type == "second_hand") {
        this.$router.push({
          path: "/ordDetails",
          query: { id: val }
        });
      } else {
        this.$router.push({
          path: "/rentDetails",
          query: { id: val }
        });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
div {
  font-size: 16px;
}
.text_title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 1.8rem;
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(80, 80, 80, 1);
  line-height: 0.18rem;
  text-shadow: 0px 2px 3px rgba(255, 255, 255, 0.5);
}
.sort {
  font-size: 0.13rem;
  font-weight: 600;
  color: rgba(168, 168, 168, 1);
  line-height: 0.18rem;
}
.itemize {
  width: 0.45rem;
  height: 0.18rem;
  background: rgba(191, 191, 191, 1);
  font-size: 0.11rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.16rem;
  padding: 0 0.03rem;
  margin-right: 0.06rem;
}
.money {
  font-size: 0.16rem;
  padding-left: 0 !important;
  font-weight: 600;
  color: rgba(255, 94, 94, 1);
  line-height: 0.22rem;
  padding-right: 0.07rem;
  span {
    margin-left: 0.07rem;
  }
}
.year {
  // width:0.51rem;
  height: 0.24rem;
  background: rgba(35, 76, 211, 1);
  border-radius: 0px 0px 0px 0.13rem;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  top: 0rem;
  right: 0;
  padding: 0 0.15rem;
  line-height: 0.24rem;
  overflow: hidden;
}
.num {
  // width:0.38rem;
  padding: 0 0.03rem;
  text-align: center;
  height: 0.17rem;
  background: rgba(106, 192, 120, 1);
  border-radius: 1px;
  font-size: 0.12rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 1);
  line-height: 0.17rem;
  position: absolute;
  top: 0.75rem;
  left: 0.05rem;
}
.new_img {
  width: 1.44rem;
  height: 0.98rem;
}
.img {
  width: 1.44rem;
  height: 0.98rem;
  position: relative;
  margin-right: 0.11rem;
}
.image {
  width: 1.44rem;
  margin-right: 0.11rem;
}
.new_list li > div {
  display: flex;
  //   padding-top: 0.11rem;
}
.flex {
  padding-top: 0.11rem;
}
.text p {
  padding-bottom: 0.04rem;
}
.hr {
  border: none;
  height: 1px;
  background-color: #ececec;
}
.list-img {
  width: 0.28rem;
  height: 0.28rem;
}
.list-font {
  height: 0.22rem;
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(5, 5, 5, 1);
  line-height: 0.22rem;
  position: relative;
  bottom: 0.08rem;
}
</style>