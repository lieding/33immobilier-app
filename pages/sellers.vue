<template>
  <div class="sellers">
    <headers :class="{colors:flag}"></headers>
    <div class="sellersBody centerSss">
      <div class="headline">
        <span>{{$t("message.global.home")}}</span> /
        <span>{{$t("message.global.AddHousing")}}</span>
      </div>
      <div class="listTab">
        <p class="tit">{{$t("message.global.HousingTypes")}}</p>
        <div>
          <el-radio
            v-model="radio1"
            style="height:50px;line-height:26px;"
            label="1"
            border
          >{{$t("message.global.SellingHouses")}}</el-radio>
          <el-radio
            v-model="radio1"
            style="height:50px;line-height:26px;"
            label="2"
            border
          >{{$t("message.global.RentalHousing")}}</el-radio>
        </div>
      </div>
      <div class="listTab">
        <p class="tit">{{$t("message.global.accommodation")}}</p>
        <div>
          <el-radio
            v-model="info.houseOrApartment"
            style="height:50px;line-height:26px;"
            label="1"
            border
          >{{$t("message.global.apartments")}}</el-radio>
          <el-radio
            v-model="info.houseOrApartment"
            style="height:50px;line-height:26px;"
            label="0"
            border
          >{{$t("message.global.cottage")}}</el-radio>
        </div>
      </div>
      <div class="listTab">
        <p class="tit">{{$t("message.global.information")}}</p>
        <div>
          <el-radio
            v-model="info.oneselfOrAgent"
            style="height:50px;line-height:26px;"
            label="1"
            border
          >{{$t("message.global.Intermediary")}}</el-radio>
          <el-radio
            v-model="info.oneselfOrAgent"
            style="height:50px;line-height:26px;"
            label="0"
            border
          >{{$t("message.global.Personal")}}</el-radio>
        </div>
      </div>
      <div class="listTab" v-if="radio1==2">
        <p class="tit">{{$t("message.global.shareInformation")}}</p>
        <div>
          <el-radio
            v-model="rentType"
            label="0"
            style="height:50px;line-height:26px;"
            border
          >{{$t("message.global.entireTenancy")}}</el-radio>
          <el-radio
            v-model="rentType"
            label="1"
            style="height:50px;line-height:26px;"
            border
          >{{$t("message.global.sublease")}}</el-radio>
        </div>
      </div>
      <div class="details" style="overflow:hidden" v-show="rentType == 1">
        <p class="tit">{{$t("message.global.zukexiangqing")}}</p>
        <div v-for="(itemsa,indexs) in ListList" :key="indexs">
          <div class="lists listss">
            <p style="font-weight:400">{{$t("message.global.BedroomArea")}}</p>
            <el-input placeholder type="Number" v-model="itemsa.roomArea">
              <template slot="append">{{$t("message.global.square")}}</template>
            </el-input>
          </div>
          <div class="lists listss">
            <p style="font-weight:400">{{$t("message.global.orientation")}}</p>
            <el-select v-model="itemsa.direction" placeholder>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="lists listss">
            <p style="font-weight:400">{{$t("message.global.gender")}}</p>
            <el-select v-model="itemsa.gender" placeholder>
              <el-option
                v-for="item in optionss"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
          <div class="lists listss">
            <p style="font-weight:400">{{$t("message.global.constellation")}}</p>
            <el-input placeholder v-model="itemsa.zodiac"></el-input>
          </div>
          <div class="lists listss">
            <p style="font-weight:400">
              {{$t("message.global.price")}}
              <span style="float:right" @click="deletes(indexs)">
                <img style="width:20px;" src="@/assets/image/go.png" alt />
              </span>
            </p>
            <el-input placeholder type="Number" v-model="itemsa.roomPrice">
              <template slot="append">€</template>
            </el-input>
          </div>
        </div>
        <div style="padding: 10px;">
          <div
            @click="addFJ"
            style="float:right;width:365px;font-size:20px;color:#fff;height:60px;line-height:60px;text-align:center;background-color:#234DD4FF;border-radius:7px;"
          >{{$t("message.global.tjygfyxx")}}</div>
        </div>
      </div>
      <div class="details">
        <div class="lists">
          <p>{{$t("message.global.proportion")}}</p>
          <el-input placeholder type="Number" v-model="info.acreage">
            <template slot="append">{{$t("message.global.square")}}</template>
          </el-input>
        </div>
        <div class="lists">
          <p>{{$t("message.global.building")}}</p>
          <el-input placeholder type="Number" v-model="info.year">
            <template slot="append">{{$t("message.global.ans")}}</template>
          </el-input>
        </div>
        <div class="lists">
          <p>{{$t("message.global.habitable")}}</p>
          <el-input placeholder type="Number" v-model="info.roomsNum">
            <template slot="append">{{$t("message.global.P")}}</template>
          </el-input>
        </div>
        <div class="lists">
          <p>{{$t("message.global.bedroom")}}</p>
          <el-input placeholder type="Number" v-model="info.bedroomNum">
            <template slot="append">{{$t("message.global.CH")}}</template>
          </el-input>
        </div>
      </div>
      <div class="details">
        <div class="lefts">
          <p>{{$t("message.global.location")}}</p>
          <input
            style="height: 52px;width: 70%;padding: 4px;"
            type="text"
            :placeholder="$t('message.global.addressex')"
            id="txtPlaces"
            v-on:input="Onchange"
          />
        </div>
        <div class="rights">
          <p>{{$t("message.global.postcode")}}</p>
          <el-input placeholder type="Number" v-model="info.postcodes"></el-input>
        </div>
      </div>
      <div class="details">
        <div class="lefts">
          <p>{{$t("message.global.tradingValue")}}</p>
          <el-input placeholder type="Number" v-model="info.total">
            <template slot="append">€</template>
          </el-input>
        </div>
      </div>
      <div class="details">
        <p>{{$t("message.global.subject")}}</p>
        <el-input :placeholder="$t('message.global.suchas')" v-model="info.title"></el-input>
      </div>
      <div class="details">
        <p>{{$t("message.global.Describing")}}</p>
        <el-input
          type="textarea"
          :placeholder="$t('message.global.suchas')"
          v-model="info.introduceCn"
          show-word-limit
        ></el-input>
      </div>
      <div class="details">
        <p>{{$t("message.global.VRlink")}}</p>
        <el-input placeholder v-model="info.vrAddress"></el-input>
      </div>
      <div class="details">
        <p>{{$t("message.global.HousingPictures")}}</p>
        <el-upload
          name="imageFile"
          class="avatar-uploader"
          :action="baseU"
          :show-file-list="false"
          :multiple="true"
          :before-upload="beforeAvatarUpload"
          :on-success="handleAvatarSuccess"
        >
          <!-- <img src="@/assets/image/addABC.png" class="avatar"> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <img
          v-for="(item,keys) in imageUrlList"
          style="width:193px;height:153px;margin-right:10px;"
          :key="keys"
          :src="item"
          alt
        />
      </div>
      <div class="details">
        <p>{{$t("message.global.shortVideo")}}</p>
        <el-upload
          name="imageFile"
          class="avatar-uploader"
          :action="baseU"
          :show-file-list="false"
          :before-upload="Upload"
          :on-success="handleAvatarSucces"
        >
          <!-- <img v-if="imgurl" :src="imgurl" class="avatar"> -->
          <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <video :src="video" controls="controls" class="avatar" v-if="video"></video>
      </div>
      <div style="overflow:hidden">
        <div class="floorPlan">
          <p>{{$t("message.global.floorPlan")}}</p>
          <el-upload
            name="imageFile"
            class="avatar-uploader"
            :action="baseU"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSucce"
          >
            <img v-if="huXingUrl" :src="huXingUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <div class="floorPlan">
          <p>{{$t("message.global.PublisherHead")}}</p>
          <el-upload
            name="imageFile"
            class="avatar-uploader"
            :action="baseU"
            :show-file-list="false"
            :before-upload="beforeAvatarUpload"
            :on-success="handleAvatarSuc"
          >
            <img v-if="imageUrls" :src="imageUrls" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
      </div>
      <br />
      <div v-if="radio1==1">
        <p>{{$t("message.global.construction")}}</p>
        <!-- // 客厅 -->
        <div style="display:inline-block;padding:20px;vertical-align: top;">
          <p>{{$t("message.global.drawingRoom")}}</p>
          <div>
            <div style="margin-top:10px;" v-for="(itemsa,inds) in drawingList" :key="inds">
              <div style="display:inline-block;widht:80px;vertical-align: top;">
                <p>{{$t("message.global.proportion")}}</p>
                <el-input placeholder type="Number" v-model="itemsa.area">
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div style="display:inline-block;width:160px;margin-left:10px;">
                <p>{{$t("message.global.orientation")}}</p>
                <el-select v-model="itemsa.orientation" placeholder>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <br />
          <div
            @click="pushK"
            style="width:568px;
                    height:60px;
                    background-color:#234DD4;border-radius:7px;font-size:24px;color:#fff;text-align:center;line-height:60px;"
          >{{$t("message.global.drawingRoom")}}</div>
        </div>
        <!-- // 厨房 -->
        <div style="display:inline-block; padding:20px;vertical-align: top;">
          <p>{{$t("message.global.kitchen")}}</p>
          <div>
            <div style="margin-top:10px;" v-for="(itemsa,inds) in kitchenList" :key="inds">
              <div style="display:inline-block;widht:80px;vertical-align: top;">
                <p>{{$t("message.global.proportion")}}</p>
                <el-input placeholder type="Number" v-model="itemsa.area">
                  area
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div style="display:inline-block;width:160px;margin-left:10px;">
                <p>{{$t("message.global.orientation")}}</p>
                <el-select v-model="itemsa.orientation" placeholder>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <br />
          <div
            @click="pushC"
            style="width:568px;
                    height:60px;
                    background-color:#234DD4;border-radius:7px;font-size:24px;color:#fff;text-align:center;line-height:60px;"
          >{{$t("message.global.kitchen")}}</div>
        </div>
        <!-- 卧室 -->
        <div style="display:inline-block; padding:20px;vertical-align: top;">
          <p>{{$t("message.global.bedroomInformation")}}</p>
          <div>
            <div style="margin-top:10px;" v-for="(itemsa,inds) in bedRoomList" :key="inds">
              <div style="display:inline-block;widht:80px;vertical-align: top;">
                <p>{{$t("message.global.proportion")}}</p>
                <el-input placeholder type="Number" v-model="itemsa.area">
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div style="display:inline-block;width:160px;margin-left:10px;">
                <p>{{$t("message.global.orientation")}}</p>
                <el-select v-model="itemsa.orientation" placeholder>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <br />
          <div
            @click="pushW"
            style="width:568px;
                    height:60px;
                    background-color:#234DD4;border-radius:7px;font-size:24px;color:#fff;text-align:center;line-height:60px;"
          >{{$t("message.global.bedroomInformation")}}</div>
        </div>
        <!-- 浴室 -->
        <div style="display:inline-block; padding:20px;vertical-align: top;">
          <p>{{$t("message.global.sdbbotton")}}</p>
          <div>
            <div style="margin-top:10px;" v-for="(itemsa,inds) in showersList" :key="inds">
              <div style="display:inline-block;widht:80px;vertical-align: top;">
                <p>{{$t("message.global.proportion")}}</p>
                <el-input placeholder type="Number" v-model="itemsa.area">
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div style="display:inline-block;width:160px;margin-left:10px;">
                <p>{{$t("message.global.orientation")}}</p>
                <el-select v-model="itemsa.orientation" placeholder>
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </div>
            </div>
          </div>
          <br />
          <div
            @click="pushY"
            style="width:568px;
                    height:60px;
                    background-color:#234DD4;border-radius:7px;font-size:24px;color:#fff;text-align:center;line-height:60px;"
          >{{$t("message.global.sdbbotton")}}</div>
        </div>
        <div class="Historical">
          <p class="titHis">{{$t("message.global.transactionRecord")}}</p>
          <div
            v-for="(itemsa, index) in transactionList"
            style="vertical-align: top;margin-top:10px;"
            :key="index"
          >
            <el-date-picker
              style="margin-right:10px;"
              v-model="itemsa.year"
              type="year"
              value-format="yyyy"
              placeholder="选择年"
            ></el-date-picker>
            <el-date-picker
              style="margin-right:10px;"
              v-model="itemsa.month"
              type="month"
              value-format="MM"
              placeholder="选择月"
            ></el-date-picker>
            <el-input style="width:200px;vertical-align: top;" placeholder v-model="itemsa.money">
              <template slot="append">€</template>
            </el-input>
          </div>
          <br />
          <br />
          <span
            @click="pushHs"
            class="Propertytaxrecord"
          >{{$t("message.global.addtransactionRecord")}}</span>
        </div>
        <br />
        <div class="Historical">
          <p class="titHis">{{$t("message.global.buildingTaxes")}}</p>
          <div v-for="(itemsa, index) in buildingHis" style="margin-top:10px;" :key="index">
            <el-date-picker
              style="margin-right:10px;"
              v-model="itemsa.year"
              type="year"
              value-format="yyyy"
              placeholder
            ></el-date-picker>
            <el-input style="width:200px;vertical-align: top;" placeholder v-model="itemsa.money">
              <template slot="append">€</template>
            </el-input>
          </div>
          <br />
          <br />
          <span @click="pushFh" class="Propertytaxrecord">{{$t("message.global.PropertyTaxRecord")}}</span>
        </div>
        <div>
          <p
            style="font-size:30px;line-height:42px;padding:10px;font-weight:600"
          >{{$t("message.global.sellingTime")}}</p>
          <!-- <el-input style="width:70%" placeholder="" v-model="info.wishSellingTime"></el-input> -->
          <el-select v-model="info.wishSellingTime" placeholder style="width:800px;">
            <el-option
              v-for="item in optiona"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
      </div>
      <div v-else>
        <p
          style="font-size: 30px;font-weight: 600; padding: 12px;"
        >{{$t("message.global.supporting")}}</p>
        <div class="peitao">
          <span :class="{'sizeClo': info.isChair}" @click="ClK('isChair')">
            <img v-if="!info.isChair" :src="img.chairsG" alt />
            <img v-else :src="img.chairsH" alt />
            <br />
            {{$t("message.global.chairs")}}
          </span>
          <span :class="{'sizeClo': info.isWardrobe}" @click="ClK('isWardrobe')">
            <img v-if="!info.isWardrobe" :src="img.chestG" alt />
            <img v-else :src="img.chestH" alt />
            <br />
            {{$t("message.global.wardrobe")}}
          </span>
          <span :class="{'sizeClo': info.isBed}" @click="ClK('isBed')">
            <img v-if="!info.isBed" :src="img.bedG" alt />
            <img v-else :src="img.bedH" alt />
            <br />
            {{$t("message.global.bed")}}
          </span>
          <span :class="{'sizeClo': info.isWashing}" @click="ClK('isWashing')">
            <img v-if="!info.isWashing" :src="img.washerG" alt />
            <img v-else :src="img.washerH" alt />
            <br />
            {{$t("message.global.washer")}}
          </span>
          <span :class="{'sizeClo': info.isFrig}" @click="ClK('isFrig')">
            <img v-if="!info.isFrig" :src="img.refrigG" alt />
            <img v-else :src="img.refrigH" alt />
            <br />
            {{$t("message.global.refrigerator")}}
          </span>
          <span :class="{'sizeClo': info.isHeater}" @click="ClK('isHeater')">
            <img v-if="!info.isHeater" :src="img.airG" alt />
            <img v-else :src="img.airH" alt />
            <br />
            {{$t("message.global.calorifier")}}
          </span>
          <span :class="{'sizeClo': info.isSteam}" @click="ClK('isSteam')">
            <img v-if="!info.isSteam" :src="img.heatG" alt />
            <img v-else :src="img.heatH" alt />
            <br />
            {{$t("message.global.heating")}}
          </span>
          <span :class="{'sizeClo': info.isMicrowave}" @click="ClK('isMicrowave')">
            <img v-if="!info.isMicrowave" :src="img.ovenG" alt />
            <img v-else :src="img.ovenH" alt />
            <br />
            {{$t("message.global.microwave")}}
          </span>
          <span :class="{'sizeClo': info.isBroadband}" @click="ClK('isBroadband')">
            <img v-if="!info.isBroadband" :src="img.wifiG" alt />
            <img v-else :src="img.wifiH" alt />
            <br />
            {{$t("message.global.broadband")}}
          </span>
          <span :class="{'sizeClo': info.isTV}" @click="ClK('isTV')">
            <img v-if="!info.isTV" :src="img.televisG" alt />
            <img v-else :src="img.televisH" alt />
            <br />
            {{$t("message.global.television")}}
          </span>
        </div>
      </div>
      <div>
        <div style="display:inline-block;width:25%;margin-right:20px;">
          <span
            style="font-size: 30px;font-weight: 600; padding: 12px;"
          >{{$t("message.global.contactName")}}</span>
          <br />
          <el-input placeholder v-model="info.contactName">
            <i slot="prefix" class="el-icon-user-solid"></i>
          </el-input>
        </div>
        <div style="display:inline-block;width:25%;margin-right:20px;">
          <span
            style="font-size: 30px;font-weight: 600; padding: 12px;"
          >{{$t("message.global.contactEmil")}}</span>
          <br />
          <el-input placeholder v-model="info.contactEmail">
            <i slot="prefix" class="el-icon-message"></i>
          </el-input>
        </div>
        <div style="display:inline-block;width:25%;margin-right:20px;">
          <span
            style="font-size: 30px;font-weight: 600; padding: 12px;"
          >{{$t("message.global.contactPhone")}}</span>
          <br />
          <el-input placeholder v-model="info.contactPhone">
            <i slot="prefix" class="el-icon-phone"></i>
          </el-input>
        </div>
        <div style="display:inline-block;width:25%;margin-right:20px;">
          <span
            style="font-size: 30px;font-weight: 600; padding: 12px;"
          >{{$t("message.global.contactWX")}}</span>
          <br />
          <el-input placeholder v-model="info.contactWX">
            <i slot="prefix" class="el-icon-search"></i>
          </el-input>
        </div>
      </div>
    </div>
    <div
      class="centerS"
      style="overflow:hidden;margin-bottom:10px;padding-bottom:10px;padding-top:20px;"
    >
      <div
        @click="Goover"
        style="float:right;color:#fff;border-radius:7px;width:702px;height:70px;text-align:center;line-height:70px;background-color:#234DD4FF"
      >{{$t("message.global.AddHousing")}}</div>
    </div>
    <foots></foots>
  </div>
</template>



<script>
import headers from "@/components/PcIndex/moduleT/header.vue";
import foots from "@/components/PcIndex/moduleT/foot.vue";
import addLis from "@/assets/image/addLis.png";
import airG from "@/assets/image/picSzg/airG.png";
import airH from "@/assets/image/picSzg/airH.png";
import bedG from "@/assets/image/picSzg/bedG.png";
import bedH from "@/assets/image/picSzg/bedH.png";
import chairsG from "@/assets/image/picSzg/chairsG.png";
import chairsH from "@/assets/image/picSzg/chairsH.png";
import chestG from "@/assets/image/picSzg/chestG.png";
import chestH from "@/assets/image/picSzg/chestH.png";
import heatG from "@/assets/image/picSzg/heatG.png";
import heatH from "@/assets/image/picSzg/heatH.png";
import ovenG from "@/assets/image/picSzg/ovenG.png";
import ovenH from "@/assets/image/picSzg/ovenH.png";
import refrigG from "@/assets/image/picSzg/refrigG.png";
import refrigH from "@/assets/image/picSzg/refrigH.png";
import televisG from "@/assets/image/picSzg/televisG.png";
import televisH from "@/assets/image/picSzg/televisH.png";
import washerG from "@/assets/image/picSzg/washerG.png";
import washerH from "@/assets/image/picSzg/washerH.png";
import wifiG from "@/assets/image/picSzg/wifiG.png";
import wifiH from "@/assets/image/picSzg/wifiH.png";
export default {
  name: "sellers",
  components: {
    headers,
    foots
  },
  data() {
    return {
      radio1: "1",
      // 图片集合
      ListList: [
        {
          // roomNum: '',
          roomArea: "",
          direction: "",
          gender: "",
          zodiac: "",
          roomPrice: ""
        }
      ],
      img: {
        addLis,
        airG,
        airH,
        bedG,
        bedH,
        chairsG,
        chairsH,
        chestG,
        chestH,
        heatG,
        heatH,
        ovenG,
        ovenH,
        refrigG,
        refrigH,
        televisG,
        televisH,
        washerG,
        washerH,
        wifiG,
        wifiH
      },
      rentType: "",
      //  集合
      drawingList: [
        {
          area: "",
          orientation: ""
        }
      ],
      //厨房
      kitchenList: [
        {
          area: "",
          orientation: ""
        }
      ],
      //bedRoomList
      bedRoomList: [
        {
          area: "",
          orientation: ""
        }
      ],
      // 浴室
      showersList: [
        {
          area: "",
          orientation: ""
        }
      ], // 交易记录
      transactionList: [
        {
          year: "",
          month: "",
          money: ""
        }
      ], // 交易税记录
      buildingHis: [
        {
          year: "",
          money: ""
        }
      ],
      imageUrls: "",
      imageUrlList: [],
      imageUrl_list: [],
      video: "", //video
      baseU: "http://47.254.149.82/latest/file/addPhoto",
      imgurl: "",
      huXingUrl: "",
      options: [
        { value: "east", label: "east" },
        { value: "west", label: "west" },
        { value: "south", label: "south" },
        { value: "north", label: "north" }
      ],
      optionss: [
        { value: "男", label: this.$t("message.global.man") },
        { value: "女", label: this.$t("message.global.woman") }
      ],
      flag: true,
      optiona: [
        {
          value: "e plus tôt possible (最快）",
          label: "e plus tôt possible (最快）"
        },
        {
          value: " 3 mois(3个月）",
          label: " 3 mois(3个月）"
        },
        {
          value: "6 mois（6个月）",
          label: "6 mois（6个月）"
        }
      ],
      value: "",
      input2: "",
      value2: "",
      value3: "",
      radio1: "1",
      textarea: "1",
      imageUrl: "",
      info: {
        houseOrApartment: "",
        rentType: "",
        oneselfOrAgent: "",
        acreage: "",
        year: "",
        huXingUrl: "",
        roomsNum: "",
        bedroomNum: "",
        address: "",
        total: "",
        title: "",
        introduceCn: "",
        vrAddress: "",
        postcodes: "",
        longitude: "",
        latitude: "",
        videoUlr: "",
        wishSellingTime: "",
        homesRecordsStr: "",
        homesRevenuesStr: "",
        bedRoomList: [{}],
        parlorList: [{}],
        bathRoomList: [{}],
        kitChenList: [{}],
        imageUrl: "",
        contactWX: "",
        contactName: "",
        contactPhone: "",
        contactEmail: "",
        imageUrls: "",
        isChair: "1",
        isTV: "1",
        isFrig: "1",
        isWashing: "1",
        isMicrowave: "1",
        isHeater: "1",
        isBed: "1",
        isSteam: "1",
        isBroadband: "1",
        isWardrobe: "1"
      }
    };
  },
  created() {
    //TODO get the real local instead of localStorage
    if (process.client && this.$i18n.locale == "zh") {
      this.options = [
        { value: "东", label: "东" },
        { value: "南", label: "南" },
        { value: "西", label: "西" },
        { value: "北", label: "北" }
      ];
    } else {
      this.options = [
        { value: "Est", label: "Est" },
        { value: "Ouest", label: "Ouest" },
        { value: "Sud", label: "Sud" },
        { value: "Nord", label: "Nord" }
      ];
    }
  },
  methods: {
    deletes(val) {
      d;
      //console.log(val)
      // //console.log(type)
      if (this.ListList.length > 1) {
        this.ListList.splice(val, 1);
      }
    },
    Onchange() {
      var that = this;
      var options = {
        componentRestrictions: { country: "fr" }
      };
      if (process.client) {
        var places = new google.maps.places.Autocomplete(
          document.getElementById("txtPlaces"),
          options
        );
        google.maps.event.addListener(places, "place_changed", function() {
          var place = places.getPlace();
          var address = place.formatted_address;
          var geocoder = new google.maps.Geocoder();
          //    alert("地址：,"+address);
          // that.address = place.formatted_address;
          var list = place.address_components;
          if (place.address_components.length != 0) {
            place.address_components.forEach(item => {
              //console.log(typeof(item.types[0]),item.types[0])
              if (item.types[0] === "postal_code") {
                that.info.postcodes = item.long_name;
              }
            });
          }
          if (that.info.postcodes == undefined) {
            that.info.postcodes = "75000";
          }
          that.info.address = place.formatted_address;
          //console.log(that.address)
          geocoder.geocode({ address: address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              //console.log(results)
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();
              // that.longitude = longitude;
              // that.latitude = latitude;
              that.info.longitude = longitude;
              that.info.latitude = latitude;
              //console.log(latitude,longitude)
            }
          });
        });
      }
    },
    addFJ() {
      const a = {
        roomArea: "",
        direction: "",
        gender: "",
        zodiac: "",
        roomPrice: ""
      };
      this.ListList.push(a);
      //console.log(123)
      //console.log(this.ListList)
    },
    ClK(ite) {
      //console.log(ite)
      this.info[ite] = !this.info[ite];
    },
    handleAvatarSuccess(res, file) {
      this.imageUrlList.push(URL.createObjectURL(file.raw));
      // //console.log(this.imageUrlList)
      // //console.log(res)
      this.imageUrl_list.push(res.data.imageUrl);
      //console.log(this.imageUrl_list.join(','))
    },
    handleAvatarSucces(res, file) {
      //console.log(res, file)
      this.video = URL.createObjectURL(file.raw);
      this.imgurl = res.data.imageUrl;
    },
    handleAvatarSucce(res, file) {
      this.huXingUrl = URL.createObjectURL(file.raw);
      this.info.huXingUrl = res.data.imageUrl;
    },
    handleAvatarSuc(res, file) {
      this.imageUrls = URL.createObjectURL(file.raw);
      this.info.contactUrl = res.data.imageUrl;
      this.info.imageUrls = res.data.imageUrl;
    },
    Upload(file) {
      //console.log(file.type)
      var RightType = ["video/mp4"]; // 创建数组，包含可上传文件格式
      var fileType = file.type; // 获取文件扩展名
      var isbool = RightType.includes(fileType); // 判断上传文件格式是否包含在可上传中
      if (isbool == true) {
      } else {
        this.$toast("格式错误，请重新上传");
      }
      return isbool;
    },
    beforeAvatarUpload(file) {
      //console.log(file.type)
      var RightType = ["image/jpeg", "image/jpg", "image/png", "image/bmp"]; // 创建数组，包含可上传文件格式
      var fileType = file.type; // 获取文件扩展名
      var isbool = RightType.includes(fileType); // 判断上传文件格式是否包含在可上传中
      if (isbool == true) {
      } else {
        this.$toast("格式错误，请重新上传");
      }
      return isbool;
    },
    pushK() {
      const a = {
        area: "",
        orientation: ""
      };
      this.drawingList.push(a);
      //console.log(123)
      //console.log(this.drawingList)
    },
    pushC() {
      //kitchenList
      const a = {
        area: "",
        orientation: ""
      };
      this.kitchenList.push(a);
      //console.log(123)
      //console.log(this.kitchenList)
    },
    pushY() {
      const a = {
        area: "",
        orientation: ""
      };
      this.showersList.push(a);
      //console.log(123)
      //console.log(this.showersList)
    }, // showersList
    pushW() {
      const a = {
        area: "",
        orientation: ""
      };
      this.bedRoomList.push(a);
      //console.log(123)
      //console.log(this.bedRoomList)
    },
    pushHs() {
      const a = {
        year: "",
        month: "",
        money: ""
      };
      this.transactionList.push(a);
      //console.log(this.transactionList)
    },
    pushFh() {
      const a = {
        year: "",
        money: ""
      };
      this.buildingHis.push(a);
      //console.log(this.buildingHis)
    }, //
    async Goover() {
      if (this.radio1 == 1) {
        const Obj = {
          houseOrApartment: this.info.houseOrApartment,
          oneselfOrAgent: this.info.oneselfOrAgent,
          acreage: this.info.acreage,
          year: this.info.year,
          roomsNum: this.info.roomsNum,
          bedroomNum: this.info.bedroomNum,
          address: this.info.address,
          postcodes: this.info.postcodes,
          total: this.info.total,
          title: this.info.title,
          introduceCn: this.info.introduceCn,
          vrAddress: this.info.vrAddress,
          wishSellingTime: this.info.wishSellingTime,
          latitude: this.info.latitude,
          longitude: this.info.longitude,
          contactName: this.info.contactName,
          contactPhone: this.info.contactPhone,
          contactEmail: this.info.contactEmail,
          contactWX: this.info.contactWX,
          pics: this.imageUrl_list.join(","),
          videoUlr: this.imgurl,
          huXingUrl: this.info.huXingUrl,
          contactUrl: this.info.imageUrls,
          parlorList: JSON.stringify(this.drawingList),
          bedRoomList: JSON.stringify(this.bedRoomList),
          bathRoomList: JSON.stringify(this.showersList),
          kitChenList: JSON.stringify(this.kitchenList),
          homesRecordsStr: JSON.stringify(this.transactionList),
          homesRevenuesStr: JSON.stringify(this.buildingHis)
        };
        //console.log(Obj)
        // return
        const homeSaveSInfo = (await this.$api.article.homeSaveS(Obj)).data;
        //console.log(homeSaveSInfo)
        if (homeSaveSInfo.code == "0") {
          this.$toast("success");
          this.$router.push({ path: "/pc_index" });
        } else {
          // //console.log(res.data.msg)
          // this.$toast(homeSaveSInfo.msg);
          this.$message({
            showClose: true,
            message: homeSaveSInfo.msg,
            type: "warning"
          });
        }
      } else {
        const objs = {
          houseOrApartment: this.info.houseOrApartment, //房屋种类
          source: this.info.oneselfOrAgent, //信息来源
          rentType: this.rentType, //出租类型
          acreage: this.info.acreage, //面积
          year: this.info.year, //建筑年份
          roomsNum: this.info.roomsNum, //居室数量
          bedroomNum: this.info.bedroomNum, //卧室数量
          total: this.info.total, //价格
          introduceCn: this.info.introduceCn, //房屋简介
          title: this.info.title, //标题
          vrAddress: this.info.vrAddress, //vR地址
          address: this.info.address, //房屋地址
          pics: this.imageUrl_list.join(","), //图片集合
          huXingUrl: this.info.huXingUrl, //户型图
          contactUrl: this.info.imageUrls, //头像
          videoUlr: this.imgurl, //视频
          contactName: this.info.contactName, //联系人名字
          contactEmail: this.info.contactEmail, //联系人邮箱
          contactWX: this.info.contactWX, //联系人邮箱
          contactPhone: this.info.contactPhone, //联系人电话
          longitude: this.info.longitude, //经度
          latitude: this.info.latitude, //纬度
          postcodes: this.info.postcodes, //邮编
          isTV: this.info.isTV ? "1" : "0", //电视
          isFrig: this.info.isFrig ? "1" : "0", //冰箱
          isWashing: this.info.isWashing ? "1" : "0", //洗衣机、
          isMicrowave: this.info.isMicrowave ? "1" : "0", //微波炉
          isHeater: this.info.isHeater ? "1" : "0", //热水器
          isBed: this.info.isBed ? "1" : "0", //床
          isSteam: this.info.isSteam ? "1" : "0", //暖气
          isBroadband: this.info.isBroadband ? "1" : "0", //宽带
          isChair: this.info.isChair ? "1" : "0", //桌椅
          isWardrobe: this.info.isWardrobe ? "1" : "0", //衣柜
          rentingApartmentStr: JSON.stringify(this.ListList) //租客信息
        };
        //console.log(objs)
        const homeSaveSInfo = (await this.$api.article.rentingSave(objs)).data;
        if (homeSaveSInfo.code == "0") {
          this.$toast("success");
          this.$router.push({ path: "/pc_index" });
        } else {
          // //console.log(res.data.msg)
          // this.$toast(homeSaveSInfo.msg);
          this.$message({
            showClose: true,
            message: homeSaveSInfo.msg,
            type: "warning"
          });
        }
        //console.log(homeSaveSInfo)
      }
    }
  }
};
</script>

<style lang="less" scoped>
.bacBlue {
  background-color: #234dd4;
  color: #fff !important;
}
.Propertytaxrecord {
  margin-left: 10px;
  cursor: pointer;
  display: inline-block;
  overflow: hidden;
  width: 342px;
  height: 62px;
  // border-radius:9px;
  border-radius: 9px;
  background-color: #234dd4;
  color: #ffffff;
  line-height: 62px;
  text-align: center;
  vertical-align: middle;
}
.Historical {
  // text-align: center;
  display: inline-block;
  padding-right: 10px;
  vertical-align: top;
  .titHis {
    font-size: 30px;
    font-weight: 600;
    margin: 12px;
  }
}
.floorPlan {
  overflow: hidden;
  float: left;
  width: 48%;
  p {
    font-size: 30px;
    font-weight: 600;
    padding: 12px;
  }
}
.colors {
  color: #000 !important;
}
.headline {
  padding-top: 10px;
  color: #000;
  font-size: 16px;
  span {
    cursor: pointer;
  }
}
.listTab {
  .tit {
    font-size: 30px;
    color: #000;
    font-weight: 600;
    margin-bottom: 11px;
    margin-top: 20px;
  }
}
.details {
  width: 100%;
  margin-top: 20px;
  padding-bottom: 10px;
  // overflow: hidden;
  // height: 10px;
  p {
    font-size: 30px;
    margin-bottom: 17px;
    font-weight: 600;
  }
  .listss {
    width: 15% !important;
  }
  .lists {
    vertical-align: top;
    display: inline-block;
    width: 20%;
    margin-right: 5%;
    p {
      font-size: 30px;
      margin-bottom: 17px;
      font-weight: 600;
    }
  }
  .lefts,
  .rights {
    display: inline-block;
    // height:10px;
    overflow: hidden;
    p {
      font-size: 30px;
      margin-bottom: 17px;
      font-weight: 600;
    }
  }
  .lefts {
    width: 60%;
    margin-right: 10px;
  }
  .rights {
    width: 30%;
  }
}
.peitao {
  padding: 10px 0;
  span {
    display: inline-block;
    width: 19%;
    // margin-right:2%;
    text-align: center;
  }
}
.sizeClo {
  text-decoration: line-through;
  color: #bcbcbc;
}
</style>
<style lang="less">
.el-icon-plus:before {
  color: #234dd4;
}
.sellers {
  .avatar-uploader {
    text-align: center;
    img {
      width: 200px;
    }
  }
  .el-upload .el-upload--text {
    width: 100%;
    text-align: center;
    img {
      width: 100%;
    }
  }
  .el-radio.is-bordered {
    width: 30%;
    padding-left: 60px !important;
  }
  .el-input-group__append,
  .el-input-group__prepend {
    background-color: #fff !important;
  }
  .el-textarea__inner {
    height: 200px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 1300px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .el-icon-plus:before {
    font-size: 160px;
  }
  .avatar {
    width: 100%;
    height: 178px;
    display: block;
  }
  .floorPlan {
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 600px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
  }
  .el-icon-user-solid:before,
  .el-icon-message:before,
  .el-icon-phone:before,
  .el-icon-search:before {
    font-size: 20px;
    line-height: 60px;
  }
}
</style>