<template>
<div class="content-box" style="margin: 65px 20px;">
  <div class="box box1 full" ref="box">
    <div class="crop">
      <div class="image">
        <p>여행 준비는<br>마치셨나요?</p>
        <p class="desc">여행에 도움이 되는<br>머니 팁 먼저 확인하세요</p>
      </div>
      <div class="cont">
        <div>
          <h2>휴가철 현대카드 사용백서</h2>
          <p>
            '직장인에게 허락된 유일한 마약'. 여름 휴가철이 코앞입니다.
            여행지를 정하고, 코스를 짜고, 항공권과 호텔 예약까지. 정해야 할 게 한두 개가 아니죠.
            <br>기분 좋은 고민이지만, 최소한 여행지에서 신용카드와 관련된 고민은 덜 수 있도록,
            당신이 떠나기 전 미리 알아두면 좋은 신용카드 활용법을 소개합니다.
          </p>

          <h2>성수기 호텔 할인</h2>
          <ul class="box-list icon">
            <li>
              <p>현대카드 전용 프로모션 사이트<br>결제시 12% 즉시 할인</p>
            </li>
            <li>
              <p>현대카드 전용 프로모션 사이트<br>전용 쿠폰 발급</p>
            </li>
            <li>
              <p>야놀자 앱 결제시<br>M포인트 10% 사용</p>
            </li>
          </ul>
          <p class="more">
            <button>더 알아보기</button>
          </p>

          <h2>면세점 무이자 할부 혜택</h2>
          <ul class="box-list icon">
            <li>
              <p>매주 월 화목 30% 즉시 할인<br>매주 월요일 결제금액의 50%<br>M포인트 사용</p>
            </li>
            <li>
              <p>항공 여행 업종 5만원 이상<br>결제 시 2~6개월 무이자 할부<br>그 외 가맹점 ~3개월 무이자 할부</p>
            </li>
          </ul>
          <p class="more">
            <button>더 알아보기</button>
          </p>

          <h2>유의사항</h2>
          <ul class="bul-list">
            <li>M포인트 사용 혜택은 M계열카드에 한해 제공 됩니다.</li>
            <li>상기 혜택은 당사 및 제휴사 사정에 의해 변경 또는 중단 가능합니다.</li>
            <li>할인, 쿠폰 및 무이자할부 적용 기준은 해당 대상점에 따라 적용됩니다.</li>
            <li>모든 가맹점은 현대카드 가맹점 등록 업종 기준입니다.</li>
          </ul>
        </div>
      </div>
      <button class="close">X</button>
    </div>
    <p class="time">19.08.05 오후 04:10</p>
  </div>
</div>
</template>

<script>
// import Velocity from 'velocity-animate';

export default {
  name: 'cropBoxDetail',
  mounted() {
    // const el = this.$refs.box;
    // Velocity(el, { translateY: '-65px', translateX: '-20px' });

    // document.scrollingElement.scrollTo(0, 100);
    // el.scrollTo(0, 150);
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 65px 20px 20px;
  background: #ebebeb;
}

.top-menu {
  position: fixed;
  top: 20px;
  left: 20px;
  overflow: hidden;
  width: calc(100% - 40px);
  z-index: 5;
  button {
    background: #ebebeb;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
  }
  button + button {
    margin-left: 5px;
  }
  > button {
    float: left;
  }
  p {
    float: right;
  }
}

.box {
  .crop {
    overflow: hidden;
    position: relative;
    background: #fff;
    border-radius: 12px;
  }
  .image {
    position: relative;
    padding: 20px;
    box-sizing: border-box;
    p {
      &:nth-child(1) {
        font-size: 24px;
        line-height: 30px;
      }
      &.desc {
        margin-top: 5px;
        font-size: 15px;
        line-height: 22px;
      }
      &.desc + .desc {
        margin-top: 0;
      }
      &.full-txt {
        display: none;
      }
      &.bottom-txt {
        position: absolute;
        bottom: 20px;
        left: 20px;
      }
    }
    .full-txt {
      display: none;
    }

    button {
      display: none;
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: #333;
      width: calc(100% - 40px);
      padding: 12px 0;
      border-radius: 4px;
      font-size: 15px;
      color: #fff;
    }
  }

  .cont {
    display: none;
    padding: 30px 0 0;
    h2 {
      padding: 0 20px;
      margin: 50px 0 10px;
      font-size: 18px;
      &:first-child {
        margin-top: 0;
      }
    }
    p {
      padding: 0 20px;
      font-size: 13px;
      line-height: 19px;
    }
    .box-list {
      padding: 0 20px;
      li {
        padding: 20px 0;
        border-bottom: 1px solid #ebebeb;
        p {
          display: inline-block;
          padding: 0;
          font-size: 16px;
          line-height: 22px;
          strong {
            font-size: 30px;
          }
          &.num {
            width: 60px;
            margin-right: 10px;
            font-weight: bold;
            text-align: center;
          }
        }
        &:first-child {
          padding-top: 10px;
        }
      }
      &.icon {
        li {
          padding-left: 70px;
        }
      }
      &.click {
        li {
          p {
            margin-bottom: 5px;
            font-weight: bold;
            color: #000;
          }
          span {
             display: block;
             line-height: 22px;
          }
        }
      }
      &.product {
        li {
          padding-left: 70px;
          border-bottom: none;
          .name {
            font-size: 14px;
            line-height: 18px;
          }
          .price {
            display: block;
            margin-top: 5px;
            font-size: 16px;
            line-height: 1;
            font-weight: bold;
          }
        }
        li + li {
          border-top: 1px solid #EBEBEB;
        }
      }
    }
    .bul-list {
      margin: 0 20px;
      padding-top: 209px;
      border-top: 1px solid #ebebeb;
      li {
        position: relative;
        padding-left: 8px;
        font-size: 14px;
        line-height: 22px;
        color: #666;
        &:before {
          display: inline-block;
          content: '';
          position: absolute;
          top: 8px;
          left: 0;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #999;
        }
      }
    }
    .more {
      text-align: right;
      button {
        padding-top: 12px;
        font-size: 14px;
        color :#666;
      }
    }
    .tbl-wrap {
      margin: 15px 20px 0;
      border-top: 1px solid #ebebeb;
      th, td {
        font-size: 14px;
        padding: 10px 0 10px;
        p {
          padding: 0;
          font-size: 14px;
          line-height: 20px;
        }
        p + p {
          margin-top: 15px;
        }
      }
      th {
        vertical-align: top;
        font-weight: normal;
        color: #666;
      }
    }
  }
  .close {
    display: none;
    position: fixed;
    top: 12px;
    right: 15px;
    width: 18px;
    height: 18px;
    padding: 3px;
    background: #666;
    font-size: 8px;
    font-weight: bold;
    line-height: 8px;
    color: #fff;
    border-radius: 50%;
  }
  .time {
    margin: 10px 10px 0 0;
    font-size: 12px;
    color: #666;
    text-align: right;
  }

  &.slide, &.full {
    position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    height: 100%;
    margin-top: 0 !important;
    background: #fff;
    z-index: 10;
    .crop {
      height: auto !important;
      padding: 0;
    }
    .time {
      display: none;
    }
    .image {
      padding: 20px 20px 60px;
      height: 434px !important;
      .full-txt {
        display: block;
      }
      button {
        display: block !important;
      }
    }
  }
  &.slide {
    .cont {
      display: block;
    }
  }
  &.full {
    overflow-y: auto;
    .cont {
      display: block;
    }
    .close {
      display: block;
    }
  }


  &.used-list {
    .preview {
      padding: 20px;
    }
    .cont {
      h2 {
        margin-bottom: 0;
        font-size: 26px;
        letter-spacing: -1px;
      }
      .date {
        margin-bottom: 5px;
        font-size: 14px;
        line-height: 20px;
        color: #666;
      }
      .list-wrap {
        width: calc(100% - 40px);
        margin: 0 20px;
        padding-top: 20px;
        .list {
          display: flex;
          justify-content: space-between;
          padding: 15px 0;
          > div {
            p {
              font-size: 15px;
              color: #333;
            }
            span {
              display: block;
              font-size: 14px;
              line-height: 20px;
              color: #666;
              .bar {
                display: inline-block;
                margin: 0 8px;
                color: #999;
              }
            }
          }
          > p {
            font-size: 15px;
            color: #333;
          }
        }
        p {
          padding: 0;
        }
      }
      .list-wrap + .list-wrap {
        border-top: 1px solid #ebebeb;
      }
      .more {
        text-align: center;
        button {
          font-size: 16px;
          font-weight: bold;
          color: #000;
        }
      }
    }
    &.slide {
      .preview {
        display: none;
      }
      .more {
        display: none;
      }
    }
    &.full {
      .preview {
        display: none;
      }
    }
  }

  &.box1 {
    .image {
      height: 200px;
      background: #44b2b7;
      p {
        color: #fff;
      }
    }
  }

  &.box2 {
    .image {
      height: 434px;
      background: #108c25;
      p {
        color: #000;
      }
    }
    .ad {
      min-height: 300px;
      background: #269e5c;
      padding: 40px 10px 10px;
      margin-top: 60px;
      h2 {
        text-align: center;
        color :#000;
      }
      p {
        margin-top: 15px;
        font-size: 16px;
        text-align: center;
        color: #000;
      }
    }
    .bottom {
      padding: 40px 0;
      margin-top: 50px;
      background: #ebebeb;
      text-align: center;
      h3 {
        font-size: 16px;
        text-align: center;
      }
      .more {
        margin-top: 10px;
        text-align: center;
      }
    }
  }

  &.box3 {
    .image {
      height: 200px;
    }
    .cont {
      h2 + p {
        font-size: 16px;
        font-weight: 500;
      }
    }
  }

  &.box4 {
    .image {
      height: 200px;
      box-sizing: border-box;
      .bottom-txt {
        margin-top: 15px;
        font-size: 36px;
        font-weight: bold;
        span {
          display: block;
          font-size: 14px;
          line-height: 20px;
          font-weight: normal;
        }
      }
    }
    .cont {
      .point-useinfo {
        display: flex;
        padding: 0 20px;
        li {
          flex: 1 1 0;
          padding: 70px 10px 0 10px;
          font-size: 14px;
          line-height: 20px;
          color: #666;
          text-align: center;
        }
        li + li {
          border-left: 1px solid #ebebeb;
        }
      }
    }

    &.slide, &.full {
      .image {
        .bottom-txt {
          bottom: 70px;
          span {
            font-size: 18px;
          }
        }
      }
    }
  }


}

.box + .box {
  margin-top: 20px;
}
</style>
