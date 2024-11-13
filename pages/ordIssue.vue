<template xmlns:v-gmaps-searchbox="http://www.w3.org/1999/xhtml">
  <div>
    <client-only>
      <Header :title="$t('message.global.rental')" />
      <div class="box">
        <div>
          <p>{{$t("message.global.HousingTypes")}}</p>
          <el-radio v-model="radio1" label="1" border>{{$t("message.global.SellingHouses")}}</el-radio>
          <el-radio v-model="radio1" label="2" border>{{$t("message.global.RentalHousing")}}</el-radio>
        </div>
        <div>
          <p>{{$t("message.global.accommodation")}}</p>
          <el-radio v-model="houseOrApartment" label="1" border>{{$t("message.global.apartments")}}</el-radio>
          <el-radio v-model="houseOrApartment" label="0" border>{{$t("message.global.cottage")}}</el-radio>
        </div>
        <div>
          <p>{{$t("message.global.information")}}</p>
          <el-radio v-model="oneselfOrAgent" label="0" border>{{$t("message.global.Intermediary")}}</el-radio>
          <el-radio v-model="oneselfOrAgent" label="1" border>{{$t("message.global.Personal")}}</el-radio>
        </div>
        <div v-if="type=='租房'">
          <p>{{$t("message.global.shareInformation")}}</p>
          <el-radio v-model="rentType" label="0" border>{{$t("message.global.entireTenancy")}}</el-radio>
          <el-radio v-model="rentType" label="1" border>{{$t("message.global.sublease")}}</el-radio>
        </div>
        <!-- 租房 -->
        <div v-if="type == '租房'&& rentType=='1'">
          <p>{{$t("message.global.personnelInformation")}}</p>
          <div class="room">
            <!-- <p>{{$t("message.global.drawingRoom")}}</p> -->
            <div class="details" v-for="(item,index) in rentingApartmentStr" :key="index">
              <div>
                <p>{{$t("message.global.BedroomArea")}}</p>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.roomArea"
                  type="text"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div>
                <p>{{$t("message.global.orientation")}}</p>
                <el-select v-model="item.direction" :placeholder="$t('message.global.PLEASE_SELECT')">
                  <!-- <el-option
                                    v-for="item in orientation"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                  </el-option>-->
                  <el-option
                    value="东"
                    :label="$t('message.global.Est')"
                  >{{$t("message.global.Est")}}</el-option>
                  <el-option
                    value="南"
                    :label="$t('message.global.Sud')"
                  >{{$t("message.global.Sud")}}</el-option>
                  <el-option
                    value="西"
                    :label="$t('message.global.Ouest')"
                  >{{$t("message.global.Ouest")}}</el-option>
                  <el-option
                    value="北"
                    :label="$t('message.global.Nord')"
                  >{{$t("message.global.Nord")}}</el-option>
                </el-select>
              </div>
              <div>
                <p>{{$t("message.global.gender")}}</p>
                <el-select v-model="item.gender" :placeholder="$t('message.global.PLEASE_SELECT')">
                  <el-option :label="$t('message.global.man')" :value="$t('message.global.man')"></el-option>
                  <el-option
                    :label="$t('message.global.woman')"
                    :value="$t('message.global.woman')"
                  ></el-option>
                </el-select>
              </div>
              <div>
                <p>{{$t("message.global.constellation")}}</p>
                <el-input :placeholder="$t('message.global.PLEASE_ENTER')" v-model="item.zodiac"></el-input>
              </div>
              <div>
                <p>{{$t("message.global.price")}}</p>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.roomPrice"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">€</template>
                </el-input>
              </div>
            </div>

            <el-button
              type="primary"
              @click="addrentingApartment"
            >{{$t("message.global.colocataire")}}</el-button>
          </div>
        </div>

        <div class="details">
          <div>
            <p>{{$t("message.global.SURFACE")}}</p>
            <el-input v-model="acreage" oninput="value=value.replace(/[^\d]/g,'')">
              <template slot="append">{{$t("message.global.square")}}</template>
            </el-input>
          </div>
          <div>
            <p>{{$t("message.global.building")}}</p>
            <el-input v-model="year" oninput="value=value.replace(/[^\d]/g,'')">
              <template slot="append">{{$t("message.global.ans")}}</template>
            </el-input>
          </div>
          <div>
            <p>{{$t("message.global.habitable")}}</p>
            <el-input v-model="roomsNum" oninput="value=value.replace(/[^\d]/g,'')">
              <template slot="append">{{$t("message.global.P")}}</template>
            </el-input>
          </div>
          <div>
            <p>{{$t("message.global.bedroom")}}</p>
            <el-input v-model="bedroomNum" oninput="value=value.replace(/[^\d]/g,'')">
              <template slot="append">{{$t("message.global.CH")}}</template>
            </el-input>
          </div>
        </div>
        <div>
          <p>{{$t("message.global.location")}}</p>
          <!-- <el-input
                    placeholder="例如：巴黎三区 近Art et Méti"
                    v-model= 'address'
                    v-on:input ="Onchange"
                    clearable>
          </el-input>-->
          <input
            type="text"
            :placeholder="$t('message.global.suchas')"
            id="txtPlaces"
            v-on:input="Onchange"
          />
          <p>{{$t("message.global.postcode")}}</p>
          <el-input
            placeholder
            v-model="postcodes"
            oninput="value=value.replace(/[^\d]/g,'')"
            clearable
          ></el-input>
          <p v-if="type=='second_hand'">{{$t("message.global.tradingValue")}}</p>
          <p v-if="type=='租房'">{{$t("message.global.RentalPrices")}}</p>
          <el-input
            :placeholder="$t('message.global.PLEASE_ENTER')"
            v-model="total"
            oninput="value=value.replace(/[^\d]/g,'')"
          >
            <template slot="append">€</template>
          </el-input>
          <p>{{$t("message.global.subject")}}</p>
          <el-input :placeholder="$t('message.global.suchas')" v-model="title" clearable></el-input>
          <p>{{$t("message.global.Describing")}}</p>
          <el-input
            type="textarea"
            :placeholder="$t('message.global.PLEASE_ENTER')"
            v-model="introduceCn"
            maxlength="30"
          ></el-input>
          <p>{{$t("message.global.VRlink")}}</p>
          <el-input :placeholder="$t('message.global.PLEASE_ENTER')" v-model="vrAddress"></el-input>
        </div>
        <div class="room">
          <p>{{$t("message.global.HousingPictures")}}</p>
          <el-upload
            name="imageFile"
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :multiple="true"
            :before-upload="beforeAvatarUpload"
            :on-progress="openFullScreen"
            :on-success="handleAvatarSuccess"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <img v-for="(item,index) in imageUrlList" :key="index" :src="item" class="avatar" />
        </div>
        <div class="uploder">
          <div>
            <p>{{$t("message.global.floorPlan")}}</p>
            <el-upload
              name="imageFile"
              class="avatar-uploader"
              :action="baseUrl"
              :show-file-list="false"
              :multiple="false"
              :on-progress="openFullScreen"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatar"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <div>
            <p>{{$t("message.global.PublisherHead")}}</p>
            <el-upload
              name="imageFile"
              class="avatar-uploader"
              :action="baseUrl"
              :show-file-list="false"
              :multiple="false"
              :before-upload="beforeAvatarUpload"
              :on-progress="openFullScreen"
              :on-success="handleOk"
            >
              <img v-if="after_img" :src="after_img" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </div>
        <div class="videos">
          <p>{{$t("message.global.shortVideo")}}</p>
          <el-upload
            name="imageFile"
            class="avatar-uploader"
            :action="baseUrl"
            :show-file-list="false"
            :multiple="false"
            :before-upload="Upload"
            :on-progress="openFullScreen"
            :on-success="handlevideo"
          >
            <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <video :src="video" controls="controls" class="avatar" v-if="video"></video>
        </div>
        <div v-if="type=='second_hand'">
          <p>{{$t("message.global.construction")}}</p>
          <div class="room">
            <p>{{$t("message.global.drawingRoom")}}</p>
            <div class="details" v-for="(item,index) in drawingList" :key="index">
              <div>
                <p>{{$t("message.global.drawingRoom")}}{{$t("message.global.SURFACE")}}</p>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.area"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div>
                <p>{{$t("message.global.orientation")}}</p>
                <el-select
                  v-model="item.orientation"
                  :placeholder="$t('message.global.PLEASE_SELECT')"
                >
                  <!-- <el-option
                                     v-for="item in orientation"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                  </el-option>-->
                  <el-option
                    value="东"
                    :label="$t('message.global.Est')"
                  >{{$t("message.global.Est")}}</el-option>
                  <el-option
                    value="南"
                    :label="$t('message.global.Sud')"
                  >{{$t("message.global.Sud")}}</el-option>
                  <el-option
                    value="西"
                    :label="$t('message.global.Ouest')"
                  >{{$t("message.global.Ouest")}}</el-option>
                  <el-option
                    value="北"
                    :label="$t('message.global.Nord')"
                  >{{$t("message.global.Nord")}}</el-option>
                </el-select>
              </div>
            </div>
            <el-button type="primary" @click="addDrawing">{{$t("message.global.roomMessage")}}</el-button>
          </div>
          <div class="\room">
            <p>{{$t("message.global.bedroom")}}</p>
            <div class="details" v-for="(item,index) in bedRoomList" :key="index">
              <div>
                <p>{{$t("message.global.BedroomArea")}}</p>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.area"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div>
                <p>{{$t("message.global.orientation")}}</p>
                <el-select
                  v-model="item.orientation"
                  :placeholder="$t('message.global.PLEASE_SELECT')"
                >
                  <!-- <el-option
                                     v-for="item in orientation"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                  </el-option>-->
                  <el-option
                    value="东"
                    :label="$t('message.global.Est')"
                  >{{$t("message.global.Est")}}</el-option>
                  <el-option
                    value="南"
                    :label="$t('message.global.Sud')"
                  >{{$t("message.global.Sud")}}</el-option>
                  <el-option
                    value="西"
                    :label="$t('message.global.Ouest')"
                  >{{$t("message.global.Ouest")}}</el-option>
                  <el-option
                    value="北"
                    :label="$t('message.global.Nord')"
                  >{{$t("message.global.Nord")}}</el-option>
                </el-select>
              </div>
            </div>
            <el-button type="primary" @click="addroom">{{$t("message.global.bedroomInformation")}}</el-button>
          </div>
          <div class="room">
            <p>{{$t("message.global.kitchen")}}</p>
            <div class="details" v-for="(item,index) in kitchenList" :key="index">
              <div>
                <p>{{$t("message.global.kitchen")}}{{$t("message.global.SURFACE")}}</p>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.area"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div>
                <p>{{$t("message.global.orientation")}}</p>
                <el-select
                  v-model="item.orientation"
                  :placeholder="$t('message.global.PLEASE_SELECT')"
                >
                  <!-- <el-option
                                     v-for="item in orientation"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                  </el-option>-->
                  <el-option
                    value="东"
                    :label="$t('message.global.Est')"
                  >{{$t("message.global.Est")}}</el-option>
                  <el-option
                    value="南"
                    :label="$t('message.global.Sud')"
                  >{{$t("message.global.Sud")}}</el-option>
                  <el-option
                    value="西"
                    :label="$t('message.global.Ouest')"
                  >{{$t("message.global.Ouest")}}</el-option>
                  <el-option
                    value="北"
                    :label="$t('message.global.Nord')"
                  >{{$t("message.global.Nord")}}</el-option>
                </el-select>
              </div>
            </div>
            <el-button
              type="primary"
              @click="addkitchen"
            >{{$t("message.global.kitchenInformation")}}</el-button>
          </div>
          <div class="room">
            <p>{{$t("message.global.showerRoom")}}</p>
            <div class="details" v-for="(item,index) in showerList" :key="index">
              <div>
                <p>{{$t("message.global.showerRoom")}}{{$t("message.global.SURFACE")}}</p>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.area"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">{{$t("message.global.square")}}</template>
                </el-input>
              </div>
              <div>
                <p>{{$t("message.global.orientation")}}</p>
                <el-select
                  v-model="item.orientation"
                  :placeholder="$t('message.global.PLEASE_SELECT')"
                >
                  <!-- <el-option
                                     v-for="item in orientation"
                                     :key="item.value"
                                     :label="item.label"
                                     :value="item.value">
                  </el-option>-->
                  <el-option
                    value="东"
                    :label="$t('message.global.Est')"
                  >{{$t("message.global.Est")}}</el-option>
                  <el-option
                    value="南"
                    :label="$t('message.global.Sud')"
                  >{{$t("message.global.Sud")}}</el-option>
                  <el-option
                    value="西"
                    :label="$t('message.global.Ouest')"
                  >{{$t("message.global.Ouest")}}</el-option>
                  <el-option
                    value="北"
                    :label="$t('message.global.Nord')"
                  >{{$t("message.global.Nord")}}</el-option>
                </el-select>
              </div>
            </div>
            <el-button
              type="primary"
              @click="addshower"
            >{{$t("message.global.bathroomInformation")}}</el-button>
          </div>
          <div class="room">
            <p>{{$t("message.global.transactionRecord")}}</p>
            <div class="details" v-for="(item,index) in transactionList" :key="index">
              <div>
                <el-date-picker
                  v-model="item.year"
                  type="year"
                  :editable="false"
                  placeholder="选择年"
                  value-format="yyyy"
                ></el-date-picker>
              </div>
              <div>
                <el-date-picker
                  v-model="item.month"
                  type="month"
                  :editable="false"
                  placeholder="选择月"
                  format="MM"
                  value-format="MM"
                ></el-date-picker>
              </div>
              <div>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.money"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">€</template>
                </el-input>
              </div>
            </div>
            <el-button
              type="primary"
              @click="addtransaction"
            >{{$t("message.global.addtransactionRecord")}}</el-button>
          </div>
          <div class="room">
            <p>{{$t("message.global.buildingTaxes")}}</p>
            <div class="details" v-for="(item,index) in recordsList" :key="index">
              <div>
                <el-date-picker
                  v-model="item.year"
                  type="year"
                  :editable="false"
                  placeholder="选择年"
                  value-format="yyyy"
                ></el-date-picker>
              </div>
              <div>
                <el-input
                  :placeholder="$t('message.global.PLEASE_ENTER')"
                  v-model="item.money"
                  oninput="value=value.replace(/[^\d]/g,'')"
                >
                  <template slot="append">€</template>
                </el-input>
              </div>
            </div>
            <el-button type="primary" @click="addrecords">{{$t("message.global.PropertyTaxRecord")}}</el-button>
          </div>
          <div class="room">
            <p>{{$t("message.global.sellingTime")}}</p>
            <el-select
              v-model="wishSellingTime"
              :placeholder="$t('message.global.PLEASE_SELECT')"
              class="select"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </div>
        </div>
        <div class="estates" v-if="type=='租房'">
          <p>{{$t("message.global.supporting")}}</p>
          <div class="assort">
            <div @click="Ondisplay('isTV')">
              <div v-if="isTV">
                <img src="~/assets/image/download_1.png" alt />
                <p>{{$t("message.global.television")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/download1_1.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.television")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isFrig')">
              <div v-if="isFrig">
                <img src="~/assets/image/download_10.png" alt />
                <p>{{$t("message.global.refrigerator")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/picSzg/refrigH.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.refrigerator")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isWashing')">
              <div v-if="isWashing">
                <img src="~/assets/image/download_7.png" alt />
                <p>{{$t("message.global.microwave")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/picSzg/washerH.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.microwave")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isMicrowave')">
              <div v-if="isMicrowave">
                <img src="~/assets/image/microwave1.png" alt />
                <p>{{$t("message.global.microwave")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/microwave1_1.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.microwave")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isHeater')">
              <div v-if="isHeater">
                <img src="~/assets/image/download_3.png" alt />
                <p>{{$t("message.global.calorifier")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/download3_3.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.calorifier")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isBed')">
              <div v-if="isBed">
                <img src="~/assets/image/download_8.png" alt />
                <p>{{$t("message.global.bed")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/download8_8.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.bed")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isSteam')">
              <div v-if="isSteam">
                <img src="~/assets/image/download_9.png" alt />
                <p>{{$t("message.global.heating")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/picSzg/heatH.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.heating")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isBroadband')">
              <div v-if="isBroadband">
                <img src="~/assets/image/download_6.png" alt />
                <p>{{$t("message.global.broadband")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/download6_6.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.broadband")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isWardrobe')">
              <div v-if="isWardrobe">
                <img src="~/assets/image/download_5.png" alt />
                <p>{{$t("message.global.wardrobe")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/download5_5.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.wardrobe")}}</p>
              </div>
            </div>
            <div @click="Ondisplay('isChair')">
              <div v-if="isChair">
                <img src="~/assets/image/chair.png" alt />
                <p>{{$t("message.global.chairs")}}</p>
              </div>
              <div v-else>
                <img src="~/assets/image/chair_1.png" alt />
                <p
                  style="text-decoration: line-through; color: #E5E5E5;"
                >{{$t("message.global.chairs")}}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>{{$t("message.global.contactName")}}</p>
          <el-input
            :placeholder="$t('message.global.PLEASE_ENTER')"
            prefix-icon="el-icon-search"
            v-model="contactName"
          ></el-input>
          <p>{{$t("message.global.contactEmil")}}</p>
          <el-input
            :placeholder="$t('message.global.PLEASE_ENTER')"
            prefix-icon="el-icon-search"
            v-model="contactEmail"
          ></el-input>
          <p>{{$t("message.global.contactPhone")}}</p>
          <el-input
            :placeholder="$t('message.global.PLEASE_ENTER')"
            oninput="value=value.replace(/[^\d]/g,'')"
            prefix-icon="el-icon-search"
            v-model="contactPhone"
          ></el-input>
          <p>{{$t("message.global.contactWX")}}</p>
          <el-input
            :placeholder="$t('message.global.PLEASE_ENTER')"
            oninput="value=value.replace(/[\u4e00-\u9fa5]/ig,'')"
            prefix-icon="el-icon-search"
            v-model="contactWX"
          ></el-input>
        </div>
        <el-button type="primary" @click="Onclick">{{$t("message.global.AddHousing")}}</el-button>
      </div>
      <Footer />
    </client-only>
    <script
      type="text/javascript"
      src="http://maps.googleapis.com/maps/api/js?libraries=places&key=AIzaSyAajgcsOMI8iloavKcKSKeoomMB7QVQL4w"
    />
  </div>
</template>
<script>
import rem from "~/common/rem.js";
import base from "~/api/base"; // 导入接口域名列表
import Header from "~/components/Mindex/head.vue";
import Footer from "~/components/Mindex/footer.vue";
import axios from "~/common/http";

export default {
  middleware: "responsive",
  components: {
    Header,
    Footer
  },
  watch: {
    radio1() {
      //console.log(this.radio1)
      if (this.radio1 == "1") {
        this.type = "second_hand";
      } else {
        this.type = "租房";
      }
    }
  },
  head() {
    return {
      title:
        "法国我要卖房_我要租房_二手房源发布_法国卖房_法国二手房出售_法国我要出租_法国出租房源信息",
      meta: [
        {
          name: "description",
          content:
            "33找房我要卖房我要租房频道,业主委托卖房和出租房发布出售出租房源,提供个人卖房出租房的快捷渠道。全法经纪人,为您提供卖房出售,房屋出租服务。利用33找房交易托管平台,卖房租房托管房源更加安全,放心 - 法国33找房全程为您服务"
        },
        {
          name: "keywords",
          content:
            "法国我要卖房,我要租房,二手房源发布,法国卖房,法国二手房出售,法国我要出租,法国出租房源信息-法国33找房出售出租频道"
        }
      ]
    };
  },
  data() {
    return {
      houseOrApartment: "", //房屋种类
      oneselfOrAgent: "", //信息来源
      acreage: "", //面积
      year: "", //年份
      roomsNum: "", //居室数量
      bedroomNum: "", //卧室数据
      total: "", //  价格
      title: "", //标题
      introduceCn: "", //房屋简介
      vrAddress: "", //AR地址
      address: "", //房屋地址
      imageUrlList: [], //图片集合
      imageUrl: "", //户型图
      imgUrl: "", //户型图上传
      after_img: "", //头像
      portrait: "", //头像上传
      video: "", //视频
      fullscreenLoading: false,
      baseUrl: base.sq + "/file/addPhoto",
      videoUlr: "", //视频集合
      options: [
        {
          value: "Le plus tôt possible (最快）",
          label: "Le plus tôt possible (最快）"
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
      orientation: [
        //   {value:'东', label:'东'},
        //   {value:'南', label:'南'},
        //   {value:'西', label:'西'},
        //   {value:'北', label:'北'},
      ],
      bedRoomList: [
        {
          area: "", //面积
          orientation: "" //朝向
        }
      ], //卧室
      drawingList: [
        {
          area: "", //面积
          orientation: "" //朝向
        }
      ], //客厅

      kitchenList: [
        {
          area: "", //面积
          orientation: "" //朝向
        }
      ], //厨房
      showerList: [
        {
          area: "", //面积
          orientation: "" //朝向
        }
      ], //浴室
      transactionList: [
        {
          year: "", //年
          month: "", //月
          money: "" //交易金额
        }
      ], //历史记录
      recordsList: [
        {
          year: "", //年
          money: "" //金额
        }
      ], //房产税
      wishSellingTime: "", //期望卖房时间
      contactName: "", //联系人名字
      contactEmail: "", //联系人邮箱
      contactWX: "", //联系人邮箱
      contactPhone: "", //联系人电话
      longitude: "", //经度
      latitude: "", //维度
      postcodes: "", //邮编
      addressList: "",
      rentType: "", //出租类型
      rentingApartmentStr: [
        {
          roomNum: "", //房间号
          roomArea: "", //面积
          direction: "", //朝向
          gender: "", //性别
          zodiac: "", //星座
          roomPrice: "" //租金
        }
      ],
      isTV: true, //电视
      isFrig: true, //冰箱
      isWashing: true, //洗衣机、
      isMicrowave: true, //微波炉
      isHeater: true, //热水器
      isBed: true, //床
      isSteam: true, //暖气
      isBroadband: true, //宽带
      isChair: true, //桌椅
      isWardrobe: true, //衣柜
      imageList: [], //上传图片集合
      radio1: "1",
      input2: "",
      input: "",
      textarea: "",
      type: this.$router.currentRoute.query.type,
      fileList: [
        { url: "https://img.yzcdn.cn/vant/leaf.jpg" },
        { url: "https://cloud-image", isImage: true }
      ],
      uploadVideoList: [], // 选中的上传视频列表
      videoSrc: "", // 选中的视频的src，用来显示视频
      tagId: null,
      tagList: [],
      uploadTitle: "",
      currentTag: null,
      tagId: null,
      columnName: "",
      fileIdArr: []
    };
  },
  mounted() {
    rem();
    this.columnName == localStorage.getItem("columnName");
    this.orientation = this.$t("message.index.orientation");
    //console.log(this.$t("message.index.orientation"))
    if (this.type == "second_hand") {
      this.radio1 = "1";
    } else {
      this.radio1 = "2";
    }
    //console.log(this.$router)
    this.Onchange();
  },
  methods: {
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
    Ondisplay(val) {
      //console.log(this[val])
      this[val] = !this[val];
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
          var list = place.address_components;
          if (place.address_components.length != 0) {
            place.address_components.forEach(item => {
              //console.log(typeof(item.types[0]),item.types[0])
              if (item.types[0] === "postal_code") {
                that.postcodes = item.long_name;
              }
            });
          }

          //console.log(that.postcodes)
          if (that.postcodes == undefined) {
            that.postcodes = "75000";
          }
          //console.log(that.postcodes)
          var address = place.formatted_address;
          var geocoder = new google.maps.Geocoder();
          //    alert("地址：,"+address);
          that.address = place.formatted_address;
          //console.log(that.address)
          geocoder.geocode({ address: address }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              var latitude = results[0].geometry.location.lat();
              var longitude = results[0].geometry.location.lng();

              that.longitude = longitude;
              that.latitude = latitude;
            }
          });
        });
      }
    },
    openFullScreen() {
      //console.log('111')
      this.fullscreenLoading = true;
    },
    openFullScreen() {
      const loading = this.$loading({
        lock: true,
        text: "拼命上传中..."
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    handleAvatarSuccess(res, file) {
      this.$toast("上传成功");
      this.fullscreenLoading = false;
      this.imageUrlList.push(URL.createObjectURL(file.raw));
      this.imageList.push(res.data.imageUrl);
    },
    handleAvatar(res, file) {
      this.$toast("上传成功");
      this.fullscreenLoading = false;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.imgUrl = res.data.imageUrl;
    },
    handleOk(res, file) {
      this.$toast("上传成功");
      this.fullscreenLoading = false;
      this.after_img = URL.createObjectURL(file.raw);
      this.portrait = res.data.imageUrl;
    },
    handlevideo(res, file) {
      this.$toast("上传成功");
      this.fullscreenLoading = false;
      this.video = URL.createObjectURL(file.raw);
      this.videoUlr = res.data.imageUrl;
    },
    // 租客信息
    addrentingApartment() {
      var obj = {
        roomNum: "", //房间号
        roomArea: "", //面积
        direction: "", //朝向
        gender: "", //性别
        zodiac: "", //星座
        roomPrice: "" //租金
      };
      this.rentingApartmentStr.push(obj);
    },
    // 客厅
    addDrawing() {
      var obj = {
        area: "", //面积
        orientation: "" //朝向
      };
      this.drawingList.push(obj);
    },
    // 卧室
    addroom() {
      var obj = {
        area: "", //面积
        orientation: "" //朝向
      };
      this.bedRoomList.push(obj);
    },
    // 浴室
    addkitchen() {
      var obj = {
        area: "", //面积
        orientation: "" //朝向
      };
      this.kitchenList.push(obj);
    },
    // 厨房
    addshower() {
      var obj = {
        area: "", //面积
        orientation: "" //朝向
      };
      this.showerList.push(obj);
    },
    // 交易记录
    addtransaction() {
      var obj = {
        year: "", //年
        month: "", //月
        money: "" //交易金额
      };
      this.transactionList.push(obj);
      //console.log(this.transactionList)
    },
    // 房产税
    addrecords() {
      var obj = {
        year: "", //年
        money: "" //交易金额
      };
      this.recordsList.push(obj);
    },

    Onclick() {
      //console.log(this.rentingApartmentStr)
      // let transaction  =  this.transactionList
      // let records =  this.recordsList

      // transaction.forEach(item => {
      //     if(item.money == ''){
      //         item.money = 0
      //     }
      // });
      // records.forEach(item => {
      //     if(item.money == ''){
      //         item.money = 0
      //     }
      // });
      if (this.type == "second_hand") {
        let params = {
          houseOrApartment: this.houseOrApartment, //房屋种类
          oneselfOrAgent: this.oneselfOrAgent, //信息来源
          acreage: this.acreage, //面积
          year: this.year, //建筑年份
          roomsNum: this.roomsNum, //居室数量
          bedroomNum: this.bedroomNum, //卧室数量
          total: this.total, //价格
          introduceCn: this.introduceCn, //房屋简介
          title: this.title, //标题
          vrAddress: this.vrAddress, //vR地址
          address: this.address, //房屋地址
          pics: this.imageUrl_list.join(","), //图片集合
          huXingUrl: this.imgUrl, //户型图
          contactUrl: this.portrait, //头像
          videoUlr: this.videoUlr, //视频
          parlorList: JSON.stringify(this.drawingList), //客厅[{}]
          bedRoomList: JSON.stringify(this.bedRoomList), //卧室
          kitChenList: JSON.stringify(this.kitchenList), //浴室
          bathRoomList: JSON.stringify(this.showerList), //厨房
          contactName: this.contactName, //联系人名字
          contactEmail: this.contactEmail, //联系人邮箱
          contactWX: this.contactWX, //联系人邮箱
          contactPhone: this.contactPhone, //联系人电话
          longitude: this.longitude, //经度
          latitude: this.latitude, //纬度
          postcodes: this.postcodes, //邮编
          homesRecordsStr: JSON.stringify(this.transactionList),
          homesRevenuesStr: JSON.stringify(this.recordsList),
          wishSellingTime: this.wishSellingTime
        };
        this.$api.article.homeSave(params).then(res => {
          if (res.data.code == "0") {
            this.$toast("发布成功");
            this.$router.push({ path: "/m_index" });
          } else {
            //console.log(res.data.msg)
            this.$toast(res.data.msg);
          }
        });
      } else {
        let params = {
          houseOrApartment: this.houseOrApartment, //房屋种类
          source: this.oneselfOrAgent, //信息来源
          rentType: this.rentType, //出租类型
          acreage: this.acreage, //面积
          year: this.year, //建筑年份
          roomsNum: this.roomsNum, //居室数量
          bedroomNum: this.bedroomNum, //卧室数量
          total: this.total, //价格
          introduceCn: this.introduceCn, //房屋简介
          title: this.title, //标题
          vrAddress: this.vrAddress, //vR地址
          address: this.address, //房屋地址
          pics: this.imageList.join(","), //图片集合
          huXingUrl: this.imgUrl, //户型图
          contactUrl: this.portrait, //头像
          videoUlr: this.videoUlr, //视频
          contactName: this.contactName, //联系人名字
          contactEmail: this.contactEmail, //联系人邮箱
          contactWX: this.contactWX, //联系人邮箱
          contactPhone: this.contactPhone, //联系人电话
          longitude: this.longitude, //经度
          latitude: this.latitude, //纬度
          wishSellingTime: this.wishSellingTime,
          postcodes: this.postcodes, //邮编
          isTV: this.isTV ? "1" : "0", //电视
          isFrig: this.isFrig ? "1" : "0", //冰箱
          isWashing: this.isWashing ? "1" : "0", //洗衣机、
          isMicrowave: this.isMicrowave ? "1" : "0", //微波炉
          isHeater: this.isHeater ? "1" : "0", //热水器
          isBed: this.isBed ? "1" : "0", //床
          isSteam: this.isSteam ? "1" : "0", //暖气
          isBroadband: this.isBroadband ? "1" : "0", //宽带
          isChair: this.isChair ? "1" : "0", //桌椅
          isWardrobe: this.isWardrobe ? "1" : "0", //衣柜
          rentingApartmentStr: JSON.stringify(this.rentingApartmentStr) //租客信息
        };
        this.$api.article.rentingSave(params).then(res => {
          if (res.data.code == "0") {
            this.$toast("发布成功");
            this.$router.push({ path: "/m_index" });
          } else {
            this.$toast(res.data.msg);
          }
        });
      }
    }
  }
};
</script>
<style lang="scss">
.el-input__inner {
  height: 0.4rem;
}
</style>
<style lang="scss" scoped>
div {
  font-size: 16px;
}
//   上传文件
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 0.06rem;
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
  // width: 178px;
  height: 1.78rem;

  line-height: 1.78rem;
  text-align: center;
}
.avatar {
  width: 1.78rem;
  height: 1.78rem;
  display: block;
}
//   大盒子
.box {
  padding: 0.13rem 0.13rem 0.3rem 0.13rem;
  div {
    padding: 0.05rem 0;
  }
}
p {
  font-size: 0.16rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  line-height: 0.22rem;
  padding: 0.08rem 0;
}
//  单选框
.el-radio.is-bordered {
  width: 43%;
}
//  居室详情
.details {
  overflow: hidden;
  margin: 0;
}
.details > div {
  float: left;
  width: 46%;
  padding: 0 0.1rem 0 0;
}
//  上传文件
.uploder {
  display: flex;
}
.uploder > div {
  width: 50%;
}
.van-uploader {
  width: 100%;
  height: 70%;
}
// 房屋
.room {
  padding: 0;
  div {
    p {
      font-size: 0.16rem;
      color: rgba(0, 0, 0, 1);
      line-height: 0.22rem;
      font-weight: 400;
    }
  }
}
// 按钮
.el-button--primary {
  width: 96%;
}
// 下拉框
.el-dropdown {
  width: 100%;
}
.el-button {
  width: 100%;
}
// 配套设备
.assort {
  display: flex;
  flex-wrap: wrap;
  div {
    width: 20%;
    text-align: center;
    margin-bottom: 0.12rem;
    div {
      width: 100%;
    }
    img {
      width: 0.3rem;
      height: 0.25rem;
    }
  }
  p {
    height: 0.17rem;
    font-size: 0.12rem;
    color: rgba(53, 53, 53, 1);
    line-height: 0.17rem;
  }
}
.avatar {
  width: 0.78rem;
  height: 0.62rem;
  padding: 0.05rem 0.18rem;
  display: inline-block;
}
#txtPlaces {
  box-sizing: border-box;
  color: #606266;
  display: inline-block;
  font-size: inherit;
  height: 40px;
  line-height: 40px;
  outline: 0;
  padding: 0 15px;
  background-color: #fff;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
  width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
<style lang="scss">
.videos {
  .el-upload {
    width: 100%;
    height: 0.78rem;
    border-radius: 0.06rem;
    border: 0.02rem solid rgba(151, 151, 151, 1);
  }
  .avatar-uploader-icon {
    line-height: 0.78rem;
  }
  .avatar {
    width: 100%;
    height: 3rem;
    padding: 0;
  }
}
.room {
  .el-upload {
    width: 100%;
    height: 0.78rem;
    border-radius: 0.06rem;
    border: 0.02rem solid rgba(151, 151, 151, 1);
  }
  .avatar-uploader-icon {
    line-height: 0.78rem;
  }
}
.uploder {
  .el-upload {
    width: 1.6rem;
    height: 0.9rem;
    background: rgba(255, 255, 255, 1);
    border-radius: 0.06rem;
    border: 0.02rem solid rgba(151, 151, 151, 1);
  }
  .avatar-uploader-icon {
    line-height: 0.9rem;
  }
  .avatar {
    width: 100%;
    height: 100%;
    padding: 0;
  }
}
.select {
  width: 100%;
}
</style>
