<template>
  <div class="home" :class="[...contentBoxClass]">
    <div ref="topMenu" class="top-menu show">
      <button>M</button>
      <p>
        <button>S</button>
        <button>C</button>
        <button>P</button>
      </p>
    </div>

    <div class="content-box" v-show="showList" :class="[...contentBoxClass]">
      <div ref="cropBox" v-for="(data, index) in slideData" :key="`cropbox${index}`"
        class="box collapsed" :class="[`box${index}`, {'used-list': index === 0}]">
        <div class="box-wrapper" v-show="viewStatus === 'list'"
          @touchstart.self="scaleDown(index)"
          @touchmove.self="releaseScale(index)"
          @touchend.self="expand(index)" />
        <div class="crop-wrapper" v-html="data.cropData"></div>
      </div>
    </div>

    <div ref="swiperBox" class="swiper-box" v-show="showSwiper">
      <swiper ref="hSwiper" :options="swiperOptions">
        <swiper-slide
          ref="swiperSlide"
          v-for="(data, index) in slideData" :key="`slidebox${index}`"
          class="box expanded" :class="[`box${index}`, {'used-list': index === 0}]"
          @touchend.native="releaseSlideScale(index)"
          @touchcancel.native="releaseScale(index)">
          <div class="crop-wrapper" v-html="data.cropData"></div>
        </swiper-slide>
      </swiper>
    </div>
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
import Hammer from 'hammerjs';
// import SLIDE_DATA from '@/store/slideData';
import SLIDE_DATA from '@/store/slideData2';

export default {
  name: 'home',
  data: () => ({
    importedSlideData: SLIDE_DATA,
    slideData: [],
    viewStatus: 'list',
    // viewStatus: 'full',
    swiperOptions: {
      spaceBetween: 5,
    },
    activeIndex: 0,
    windowScrollTop: 0,
    showSwiper: false,
    showList: true,
    slideGMInitialized: false,
    slideGestureManager: [],
  }),
  computed: {
    contentBoxClass() {
      return [
        `${this.viewStatus}`,
      ];
    },
  },
  watch: {},
  methods: {
    scaleDown(index) {
      if (this.viewStatus !== 'list') {
        return;
      }

      const data = this.slideData[index];
      if (data.status === 'initial') {
        const el = this.$refs.cropBox[index];
        // const el = this.$refs.cropBox;
        const rect = el.getBoundingClientRect();
        data.style['--current-top'] = `${rect.y}px`;
        data.style['--current-left'] = `${rect.x}px`;
        data.style['--current-width'] = `${rect.width}px`;
        data.style['--current-height'] = `${rect.height}px`;
        Velocity(el, {
          width: data.style['--current-width'],
          height: data.style['--current-height'],
          translateY: '0px',
          translateX: '0px',
        }, { duration: 0 });
        // el.style.width = data.style['--current-width'];
        // el.style.height = data.style['--current-height'];

        this.$nextTick(() => {
          this.slideData[index].status = 'scaleDown';
          Velocity(el, { scale: 0.97 }, { duration: 150, easing: 'ease' });
        });
        // this.$nextTick(() => {
        //   this.slideData[index].status = 'scaleDown';
        //   el.style.transition = 'transform 150ms ease';
        //   el.style.transform = 'scale(0.97)';
        // });
      }
    },
    releaseScale(index) {
      if (this.viewStatus !== 'list') {
        return;
      }

      const data = this.slideData[index];
      if (data.status === 'scaleDown') {
        const el = this.$refs.cropBox[index];
        // const el = this.$refs.cropBox;
        this.slideData[index].status = 'initial';
        Velocity(el, { scale: 1 }, { duration: 150, easing: 'ease' });
      }
    },
    expand(index) {
      if (this.viewStatus !== 'list') {
        return;
      }

      this.windowScrollTop = document.scrollingElement.scrollTop;

      const data = this.slideData[index];
      if (data.status === 'scaleDown') {
        // document.scrollingElement.style.overflow = 'hidden';
        // document.scrollingElement.scrollTo(0, this.windowScrollTop);
        this.hideMenu();
        const el = this.$refs.cropBox[index];

        const calcTop = data.style['--current-top'].charAt(0) === '-'
          ? data.style['--current-top'].replace('-', '')
          : `-${data.style['--current-top']}`;
        const calcLeft = data.style['--current-left'].charAt(0) === '-'
          ? data.style['--current-left'].replace('-', '')
          : `-${data.style['--current-left']}`;

        const target = {
          top: calcTop,
          left: calcLeft,
          width: '100vw',
          height: '100vh',
        };

        el.classList.add('transform');
        el.classList.remove('collapsed');
        this.viewStatus = 'transform';
        Velocity(el,
          { translateY: target.top, scale: 1 },
          {
            duration: 500,
            // easing: [0.18, 0.89, 0.32, 1.1],
            easing: [0.5, 0.22, -0.06, 1],
            queue: false,
          });
        Velocity(el,
          {
            width: target.width,
          },
          {
            duration: 300,
            delay: 50,
            // easing: [0.18, 0.89, 0.32, 1.1],
            easing: [0.5, 0.22, -0.06, 1],
            queue: false,
          });
        Velocity(el,
          {
            height: target.height,
          },
          {
            duration: 400,
            delay: 100,
            // easing: [0.18, 0.89, 0.32, 1.1],
            easing: [0.5, 0.22, -0.06, 1],
            queue: false,
          })
          .then(() => {
            this.$refs.cropBox.forEach((cropEl, cropIdx) => {
              if (cropIdx !== index) {
                cropEl.classList.add('hidden');
              }
            });
            document.scrollingElement.scrollTo(0, 0);
            el.style.transform = '';
            el.style.width = '';
            el.style.height = '';
            el.classList.remove('transform');
            el.classList.add('expanded');
            data.status = 'expanded';
            this.viewStatus = 'full';
            this.activeIndex = index;
            this.$refs.hSwiper.swiper.slideTo(this.activeIndex, 0);

            this.showSwiper = true;
            setTimeout(() => {
              this.showList = false;

              if (!this.slideGMInitialized) {
                this.initSlideGestureManager();
              }
            }, 100);
          });
      }
    },

    collapse() {
      this.showList = true;
      setTimeout(() => {
        this.showSwiper = false;
        this.$refs.hSwiper.swiper.slides.each((index, slide) => {
          slide.style.transform = '';
        });
      }, 100);
      // debugger;
      setTimeout(() => {
        const index = this.activeIndex;
        const data = this.slideData[index];
        const el = this.$refs.cropBox[index];

        // const initialTop = data.style['--current-top'];
        // const initialLeft = data.style['--current-left'];
        const initialWidth = data.style['--current-width'];
        const initialHeight = data.style['--current-height'];

        el.classList.remove('expanded');
        el.classList.add('collapsing');
        this.$refs.cropBox.forEach((cropEl) => {
          cropEl.classList.remove('hidden');
        });

        this.viewStatus = 'list';

        this.showMenu();

        document.scrollingElement.scrollTo(0, this.windowScrollTop);

        Velocity(el,
          {
            height: initialHeight,
          },
          {
            duration: 200,
            easing: 'ease',
            queue: false,
          });
        Velocity(el,
          {
            width: initialWidth,
          },
          {
            duration: 300,
            easing: 'ease',
            queue: false,
          });
        Velocity(el,
          {
            translateY: '0px',
          },
          {
            duration: 400,
            // easing: [0.29, 0.78, 0.51, 0.92],
            easing: [0.5, 0.22, -0.06, 1],
            // easing: 'ease',
            queue: false,
          })
          .then(() => {
            data.status = 'initial';
            el.style.transform = '';
            el.style.width = '';
            el.style.height = '';
            el.classList.add('collapsed');
            el.classList.remove('collapsing');
            // document.scrollingElement.style.overflow = '';
            // console.log(this.$refs.hSwiper.swiper.activeIndex);
            // const swiperActiveIdx = this.$refs.hSwiper.swiper.activeIndex;
            // this.slideGestureManager[swiperActiveIdx].onTransition = false;
          });
      }, 10);
    },

    hideMenu() {
      const el = this.$refs.topMenu;
      el.classList.remove('show');
      el.classList.add('hide');
      // Velocity(el, { translateY: '-70px' }, { duration: 200, easing: 'ease' });
    },
    showMenu() {
      const el = this.$refs.topMenu;
      el.classList.remove('hide');
      el.classList.add('show');
      // Velocity(el, { translateY: '0px' }, { duration: 200, easing: 'ease' });
    },
    checkSlideScroll($event) {
      console.log($event);
    },
    initSlideGestureManager() {
      if (this.slideGMInitialized) {
        return;
      }
      this.slideGMInitialized = true;
      const { slides } = this.$refs.hSwiper.swiper;
      slides.each((index, slide) => {
        const gm = new Hammer(slide, { touchAction: 'pan-y pan-x' });
        // const gm = new Hammer(slide);

        const obj = {
          managerObj: gm,
          onTransition: false,
        };

        this.slideGestureManager[index] = obj;


        // gm.add(pan);

        // gm.on('swipe');

        gm.get('pan').set({ direction: Hammer.DIRECTION_DOWN });
        gm.on('pandown', (ev) => {
          const angle = Math.abs(ev.angle);
          console.log('deltaY:', Math.abs(ev.deltaY), 'velocity:', ev.velocity, 'angle:', angle);

          if (slide.scrollTop === 0 && angle >= 80 && angle <= 120) {
            if (ev.velocity >= 0.25) {
              // this.slideGestureManager[index].onTransition = true;
              this.collapse();
            } else if (!this.slideGestureManager[index].onTransition) {
              // const scaleValue = Math.max(1 - (Math.abs(ev.deltaY) * 0.0018), 0.95);
              
              // Velocity(slide,
              //   {
              //     scale: scaleValue,
              //   },
              //   {
              //     duration: 0,
              //     queue: false,
              //   });
            }
          }
        });

        // gm.get('swipe').set({ direction: Hammer.DIRECTION_DOWN });
        // gm.on('swipedown', (ev) => {
        //   console.log('swipe', ev);
        //   this.collapse();
        // });


        // gm.get('pan').set({ direction: Hammer.DIRECTION_DOWN });
        // gm.get('swipe').set({ direction: Hammer.DIRECTION_VERTICAL });
        // gm.on('pandown', (ev) => {
        //   if (slide.scrollTop === 0 && ev.isFinal) {
        //     const scaleValue = Math.max(1 - (Math.abs(ev.deltaY) * 0.0006), 0.95);
        //     console.log(ev);
        //     console.log(ev.deltaY, ev.velocity, scaleValue);

        //     if (ev.velocity >= 1) {
        //       this.collapse();
        //     } else if (Math.abs(ev.deltaY) > 1000) {
        //       this.collapse();
        //     } else if (!this.slideGestureManager[index].onTransition) {
        //       this.slideGestureManager[index].onTransition = true;
        //       Velocity(slide,
        //         {
        //           scale: scaleValue,
        //         },
        //         {
        //           duration: 500,
        //           easing: 'ease',
        //         })
        //         .then(() => {
        //           this.slideGestureManager[index].onTransition = false;
        //         });
        //     }
        //   }

        //   // if (
        //   //   slide.scrollTop === 0
        //   //   // && ev.isFinal
        //   //   && Math.abs(ev.deltaY) > 30
        //   //   && ev.velocity > 0.3
        //   // ) {
        //   //   this.collapse();
        //   // } else {
        //   // const scaleValue = Math.max(1 - (Math.abs(ev.deltaY) * 0.0006), 0.97);

        //   // const scaleValue = (1 - (Math.abs(ev.deltaY) * 0.0001));
        //   // slide.style.transform = `scale(${scaleValue})`;

        //   // }
        //   // else if (!ev.isFinal) {
        //   //   if (Math.abs(ev.deltaY) > 100) {
        //   //     this.collapse();
        //   //     return;
        //   //   }
        //   //   // console.log(ev.deltaY);
        //   //   const scaleValue = ev.deltaY * 0.0006;
        //   //   slide.style.transform = `scale(${1 - scaleValue})`;
        //   // }
        // });
        // this.slideGestureManager.push(gm);
        // gm.get('pan').set({ enable: false });
      });
    },
    releaseSlideScale(index) {
      const slide = this.$refs.hSwiper.swiper.slides[index];
      Velocity(slide,
        {
          scale: 1,
        },
        {
          duration: 400,
          easing: 'ease',
        });
    },
  },
  mounted() {
    this.slideData = this.importedSlideData.map(data => ({
      ...data,
      status: 'initial',
      style: {
        '--current-top': '0px',
        '--current-left': '0px',
        '--current-width': '0px',
        '--current-height': '0px',
      },
    }));

    window.collapse = this.collapse;
    window.homeVm = this;

    // accountBox initial setting;
    // const { height } = this.accountBoxRect;
    // this.accountTranslateY = height - 180;

    // Velocity(this.accountBox,
    //   { translateY: this.accountTranslateY },
    //   {
    //     duration: 300,
    //     delay: 1200,
    //     easing: 'ease',
    //   })
    //   .then(() => {
    //     this.accountBoxStatus = 'collapsed';
    //   });

    // window.addEventListener('scroll', this.onScroll);
    // this.initAccountBoxGesture();
    // setTimeout(() => {
    //   this.initSlideGestureManager();
    // }, 1000);
  },
};
</script>

<style lang="scss" scoped>
$wH: 100vh;
$heightPadding: 60px;
$headerHeight: 180px;
$height: calc(#{$wH} - #{$heightPadding});
$bottom: calc(-#{$wH} + #{$heightPadding} + #{$headerHeight});

.account-box {
  // display: none;
  position: fixed;
  width: 100vw;
  height: $height;
  background: #fff;
  border-top-right-radius: 12px;
  border-top-left-radius: 12px;
  z-index: 5;
  box-shadow: 1px 1px 10px 6px rgba(0, 0, 0, .12);
  box-sizing: border-box;
  padding: 0 20px 20px;
  overflow-y: scroll;
  bottom: 0;
  will-change: transform;
  -webkit-overflow-scrolling: touch;

  &.small, &.collapsed, &.hide {
    overflow: hidden;
    div.sum {
      margin-top: 20px;
    }
  }

  &.small {
    div.sum {
      .date {
        span.small-sum {
          opacity: 1;
        }
      }
      p.sum {
        opacity: 0;
      }
    }
  }

  &.hide {
    box-shadow: none;
  }

  .pan-handle-wrapper {
    position: sticky;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    height: 20px;
    display: flex;
    background: #fff;
    .pan-handle {
      margin: auto;
      width: 50px;
      height: 4px;
      background: rgba(0, 0, 0, .12);
      border-radius: 18px;
    }

    &.collapsed, &.small, &.hide {
      position: absolute;
      height: 100%;
      background: transparent;
      .pan-handle {
        margin-top: 10px;
      }
    }

    &.detail {
      position: sticky;
      height: 20px;
      background: #fff;
    }
  }

  div.sum {
    margin-top: 10px;
    margin-bottom: 35px;
    .date {
      font-size: 20px;
      font-weight: bold;
      .small-sum {
        // will-change: opacity;
        transition: opacity 200ms ease;
        opacity: 0;
        font-size: 25px;
        float: right;
        margin-top: -5px;
        .unit {
          font-size: 15px;
        }
      }
    }
    p.sum {
      // will-change: opacity;
      transition: opacity 200ms ease;
      opacity: 1;
      font-size: 34px;
      font-weight: bold;
      letter-spacing: -1px;
      margin-bottom: 0;
      .unit {
        margin-left: 5px;
        font-size: 18px;
      }
    }
    .btns {
      display: flex;
      width: 100%;
      margin-top: 10px;
      button {
        flex: 1 1 0;
        padding: 10px;
        background: #ebebeb;
        border-radius: 6px;
        font-size: 14px;
      }
      button + button {
        margin-left: 10px;
      }
    }
  }
  .box {
    margin-top: 25px;
    padding: 20px 18px;
    border: 1px solid #ebebeb;
    border-radius: 6px;
    h3 {
      font-size: 16px;
    }
    &.used-box {
      div {
        font-size: 14px;
        display: flex;
        justify-content: space-between;
        p {
          padding-top: 10px;
          .date {
            display: block;
            margin-top: 5px;
            font-size: 12px;
            color: #666;
            .bar {
              margin: 0 2px;
              color: #999;
            }
          }
        }
      }
    }

    &.loan-info {
      border: none;
      padding: 0;
      ul {
        overflow: hidden;
        border: 1px solid #ebebeb;
        border-radius: 6px;
        li {
          height: 108px;
          button {
            background: rgba(0, 0, 0,.15);
            color: #fff;
          }
          width: 50%;
          padding: 20px;
          float: right;
          box-sizing: border-box;
          p {
            font-size: 14px;
          }
          .sum {
            font-size: 20px;
            font-weight: bold;
            padding: 10px 0;
            margin-bottom: 0;
            .unit {
              font-size: 14px;
            }
          }
          .desc {
            margin-top: 5px;
            font-size: 12px;
            line-height: 14px;
            font-weight: bold;
            color: #999;
          }
          &:nth-child(1) {
            float: left;
            height: 216px;
            border-right: 1px solid #ebebeb;
          }
          &:nth-child(2) {
            border-bottom: 1px solid #ebebeb;
          }

          .donut-wrap {
            width: 110px;
            margin: 0 auto;
            position: relative;
            .circular-chart {
              display: block;
              max-height:250px;
              .circle-bg {
                fill: none;
                stroke: rgba(0, 0, 0, .12);
                stroke-width: 0.5;
              }
              .circle {
                fill: none;
                stroke: #32b8e0;
                stroke-width: 0.5;
                stroke-linecap:round;
                animation: progress .5s ease-out forwards;
              }
            }
            .percentage {
              position: absolute;
              left: 0;
              top: 50%;
              transform: translateY(-50%);
              width: 100%;
              font-size: 20px;
              font-weight: bold;
              letter-spacing: -1px;
              text-align: center;
              color: #333;
            }
          }
          @keyframes progress {
            0% {
              stroke-dasharray: 0 100;
            }
          }
        }
      }
    }

    &.point {
      padding: 0 20px;
      li {
        display: flex;
        justify-content: space-between;
        padding: 20px 0;
        font-size: 16px;
        font-weight: bold;
        border-top: 1px solid #ebebeb;
        align-items: center;
        p:nth-child(2) {
          font-size: 20px;
        }
        &:first-child {
          border-top: none;
        }
      }
    }
    &.hurdle-wrap {
      > p {
        margin-top: 8px;
        font-size: 16px;
        letter-spacing: -1px;
        color: #666;
      }
      .hurdle {
        margin-top: 20px;
        .sum {
          margin-bottom: 0;
          color: #000;
          font-size: 20px;
          font-weight: bold;
          text-align: right;
          .unit {
            font-size: 14px;
          }
        }
        .progress-bar {
          width: 100%;
          progress {
            display: inline-block;
            width: 100%;
            height: 4px;
            background: none;
            border: 0;
            border-radius: 8px;
            vertical-align: middle;
          }
          progress::-webkit-progress-bar {
            height: 4px;
            background: none;
            border-radius: 8px;
          }
          progress::-webkit-progress-value {
            height: 4px;
            background: #32b8e0;
            border-radius: 20px;
          }
        }

        div {
          display: flex;
          p {
            flex: 1 1 0;
            padding-left: 10px;
            font-size: 12px;
            font-weight: bold;
            border-left: 1px solid #ebebeb;
            span {
              display: block;
              font-weight: normal;
              color: #666;
            }
          }
        }
      }
    }

    &.benefit {
      .box-list {
        margin-top: 10px;
        li {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 5px 0;
          p {
            font-size: 14px;
            color: #000;
            &:last-child {
              font-size: 15px;
              font-weight: bold;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.swiper-box {
  // position: absolute;
  // top: 0;
  // left: 0;
  // width: 100vw;
  // z-index: 1;
  .swiper-container {
    .swiper-wrapper {
      .swiper-slide.box {
        max-height: 100vh;
        overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        margin-top: 0;
        .crop-wrapper {
          /deep/ .crop {
            .close {
              position: absolute;
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.home {
  position: relative;
  padding-top: 70px;
  padding-bottom: 220px;
  // &.transform {
  //   padding-top: 0;
  // }
  &.full {
    padding-top: 0;
    padding-bottom: 0;
  }
}

/deep/ .box {
  background: #fff;
  margin: auto;
  // margin-top: 20px;
  position: relative;

  .box-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 3;
  }

  .crop-wrapper {
    position: relative;
  }
  // .crop {}
  .image {
    position: relative;
    padding: 20px 20px 60px;
    height: 434px;
    box-sizing: border-box;
    overflow: hidden;
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
    }
    button {
      position: absolute;
      bottom: 20px;
      left: 20px;
      background: #333;
      width: calc(100% - 40px);
      padding: 12px 0;
      border-radius: 4px;
      -webkit-border-radius: 4px;
      font-size: 15px;
      color: #fff;
    }
  }
  .cont {
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
          color :#000;
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
        border-top: 1px solid #ebebeb;
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
  .close {
    position: fixed;
    top: 12px;
    right: 15px;
    width: 26px;
    height: 26px;
    padding: 3px;
    background: #666;
    font-size: 9px;
    font-weight: bold;
    line-height: 8px;
    color: #fff;
    border-radius: 50%;
    text-align: center;
  }
  .time {
    margin: 10px 10px 0 0;
    font-size: 12px;
    color: #666;
    text-align: right;
  }
}
.box + .box {
  margin-top: 20px;
}
</style>


<style lang="scss" scoped>
// 0. used-list
/deep/ .box.used-list {
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
}

// 1. box1
/deep/ .box.box1 {
  .image {
    background: url('../assets/images/box1_background2.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    p {
      color: #fff;
    }
  }
  &.collapsed {
    .image {
      height: 200px;
    }
  }
  &.expanded {
    .image {
      height: 434px;
    }
  }
}

// 2. box2
/deep/ .box.box2 {
  .image {
    background: url('../assets/images/box2_background.jpg');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    height: 434px;
    p {
      color: #fff;
    }
  }
  .ad {
    min-height: 300px;
    background: #269e5c;
    padding: 40px 10px 10px;
    margin-top: 60px;
    h2 {
      text-align: center;
      color: #000;
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

// 3. box3
/deep/ .box.box3 {
  .image {
    background: url('../assets/images/box1_background2.gif');
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center top;
    p {
      color: #fff;
    }
  }
  &.collapsed {
    .image {
      height: 434px;
    }
  }
  &.expanded {
    .image {
      height: 434px;
    }
  }
}
</style>

<style lang="scss" scoped>
/deep/ .box {
  &.collapsed {
    overflow: hidden;
    border-radius: 12px;
    width: calc(100% - 40px);
    .preview {
      display: block;
    }
    .cont {
      display: none;
    }
    .close {
      display: none;
    }

    .image {
      p.full-txt {
        display: none;
      }
      // p.bottom-txt {
      //   position: absolute;
      //   bottom: 20px;
      //   left: 20px;
      // }
      button {
        display: none;
      }
    }
  }
  &.expanded {
    width: 100%;
    margin: 0;
    min-height: 100vh;
    transform: none !important;
    .preview {
      display: none;
    }
    .cont {
      display: block;
      padding-bottom: 40px !important;
    }
    .close {
      display: block;
    }

    .image {
      p.full-txt {
        display: block;
      }
      button {
        display: block;
      }
    }
  }
  &.transform {
    // position: absolute;
    z-index: 3;
    border-radius: none !important;
    box-shadow: none;
    overflow: hidden;
    .preview {
      display: none;
    }
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
    .cont {
      display: block;
    }
  }
  &.hidden {
    display: none;
  }
  &.collapsing {
    overflow: hidden;
    border-radius: 12px;
    box-shadow: none;
    .close {
      display: none;
    }
    .image {
      button {
        display: none !important;
      }
    }
  }
}
</style>

<style lang="scss" scoped>
.top-menu {
  overflow: hidden;
  width: calc(100% - 40px);
  z-index: 5;
  margin: auto;
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

  transition: top 400ms ease;
  position: fixed;
  left: 20px;

  &.show {
    top: 20px;
  }
  &.hide {
    // transform: translateY(-60px);
    top: -60px;
  }
}
</style>

// <style lang="scss" scoped>
// .swiper-container,
// .swiper-wrapper {
//   width: 100%;
//   height: 100vh;
// }

// .swiper-slide.box.full {
//   position: relative;
//   /deep/ .close {
//     position: absolute;
//     width: initial;
//     height: initial;
//   }
// }

// /deep/ .box {
//   border-radius: 12px;
//   box-shadow: 1px 1px 10px 6px rgba(0, 0, 0, .12);

//   &.no-shadow {
//     box-shadow: none;
//     margin-top: 0 !important;
//   }

//   &.transform {
//     box-shadow: none;
//     z-index: 10;
//     overflow-y: scroll;
//     .preview {
//       display: none;
//     }
//     .crop {
//       height: auto !important;
//       padding: 0;
//     }
//     .time {
//       display: none;
//     }
//     .image {
//       padding: 20px 20px 60px;
//       height: 434px !important;
//       .full-txt {
//         display: block;
//       }
//       button {
//         display: block !important;
//       }
//     }
//     .cont {
//       display: block;
//     }
//   }
// }
// .content-box {
//   position: relative;
// }
// </style>

// <style lang="scss" scoped>
// .home {
//   // padding: 65px 20px 20px;
//   background: #ebebeb;
// }

// /deep/ .box {
//   overflow: hidden;
//   .crop {
//     overflow: hidden;
//     position: relative;
//     background: #fff;
//     border-radius: 12px;
//   }
//   .image {
//     position: relative;
//     padding: 20px;
//     box-sizing: border-box;
//     p {
//       &:nth-child(1) {
//         font-size: 24px;
//         line-height: 30px;
//       }
//       &.desc {
//         margin-top: 5px;
//         font-size: 15px;
//         line-height: 22px;
//       }
//       &.desc + .desc {
//         margin-top: 0;
//       }
//       &.full-txt {
//         display: none;
//       }
//       &.bottom-txt {
//         position: absolute;
//         bottom: 20px;
//         left: 20px;
//       }
//     }
//     .full-txt {
//       display: none;
//     }

//     button {
//       display: none;
//       position: absolute;
//       bottom: 20px;
//       left: 20px;
//       background: #333;
//       width: calc(100% - 40px);
//       padding: 12px 0;
//       border-radius: 4px;
//       font-size: 15px;
//       color: #fff;
//     }
//   }

//   .cont {
//     display: none;
//     padding: 30px 0 0;
//     h2 {
//       padding: 0 20px;
//       margin: 50px 0 10px;
//       font-size: 18px;
//       &:first-child {
//         margin-top: 0;
//       }
//     }
//     p {
//       padding: 0 20px;
//       font-size: 13px;
//       line-height: 19px;
//     }
//     .box-list {
//       padding: 0 20px;
//       li {
//         padding: 20px 0;
//         border-bottom: 1px solid #ebebeb;
//         p {
//           display: inline-block;
//           padding: 0;
//           font-size: 16px;
//           line-height: 22px;
//           strong {
//             font-size: 30px;
//           }
//           &.num {
//             width: 60px;
//             margin-right: 10px;
//             font-weight: bold;
//             text-align: center;
//           }
//         }
//         &:first-child {
//           padding-top: 10px;
//         }
//       }
//       &.icon {
//         li {
//           padding-left: 70px;
//         }
//       }
//       &.click {
//         li {
//           p {
//             margin-bottom: 5px;
//             font-weight: bold;
//             color: #000;
//           }
//           span {
//              display: block;
//              line-height: 22px;
//           }
//         }
//       }
//       &.product {
//         li {
//           padding-left: 70px;
//           border-bottom: none;
//           .name {
//             font-size: 14px;
//             line-height: 18px;
//           }
//           .price {
//             display: block;
//             margin-top: 5px;
//             font-size: 16px;
//             line-height: 1;
//             font-weight: bold;
//           }
//         }
//         li + li {
//           border-top: 1px solid #EBEBEB;
//         }
//       }
//     }
//     .bul-list {
//       margin: 0 20px;
//       padding-top: 209px;
//       border-top: 1px solid #ebebeb;
//       li {
//         position: relative;
//         padding-left: 8px;
//         font-size: 14px;
//         line-height: 22px;
//         color: #666;
//         &:before {
//           display: inline-block;
//           content: '';
//           position: absolute;
//           top: 8px;
//           left: 0;
//           width: 3px;
//           height: 3px;
//           border-radius: 50%;
//           background: #999;
//         }
//       }
//     }
//     .more {
//       text-align: right;
//       button {
//         padding-top: 12px;
//         font-size: 14px;
//         color :#666;
//       }
//     }
//     .tbl-wrap {
//       margin: 15px 20px 0;
//       border-top: 1px solid #ebebeb;
//       th, td {
//         font-size: 14px;
//         padding: 10px 0 10px;
//         p {
//           padding: 0;
//           font-size: 14px;
//           line-height: 20px;
//         }
//         p + p {
//           margin-top: 15px;
//         }
//       }
//       th {
//         vertical-align: top;
//         font-weight: normal;
//         color: #666;
//       }
//     }
//   }
//   .close {
//     display: none;
//     position: fixed;
//     top: 12px;
//     right: 15px;
//     width: 18px;
//     height: 18px;
//     padding: 3px;
//     background: #666;
//     font-size: 8px;
//     font-weight: bold;
//     line-height: 8px;
//     color: #fff;
//     border-radius: 50%;
//   }
//   .time {
//     margin: 10px 10px 0 0;
//     font-size: 12px;
//     color: #666;
//     text-align: right;
//   }

//   &.slide, &.full {
//     // position: fixed;
//     // top: 0;
//     // left: 0;
//     width: 100%;
//     height: 100%;
//     margin-top: 0 !important;
//     background: #fff;
//     z-index: 10;
//     .crop {
//       height: auto !important;
//       padding: 0;
//     }
//     .time {
//       display: none;
//     }
//     .image {
//       padding: 20px 20px 60px;
//       height: 434px !important;
//       .full-txt {
//         display: block;
//       }
//       button {
//         display: block !important;
//       }
//     }
//   }
//   &.slide {
//     .cont {
//       display: block;
//     }
//   }
//   &.full {
//     overflow-y: auto;
//     // -webkit-overflow-scrolling: touch;
//     // -webkit-transform: translate3d(0,0,0);
//     // overscroll-behavior: contain;
//     .cont {
//       display: block;
//     }
//     .close {
//       display: block;
//     }
//   }


//   &.used-list {
//     .preview {
//       padding: 20px;
//     }
//     .cont {
//       h2 {
//         margin-bottom: 0;
//         font-size: 26px;
//         letter-spacing: -1px;
//       }
//       .date {
//         margin-bottom: 5px;
//         font-size: 14px;
//         line-height: 20px;
//         color: #666;
//       }
//       .list-wrap {
//         width: calc(100% - 40px);
//         margin: 0 20px;
//         padding-top: 20px;
//         .list {
//           display: flex;
//           justify-content: space-between;
//           padding: 15px 0;
//           > div {
//             p {
//               font-size: 15px;
//               color: #333;
//             }
//             span {
//               display: block;
//               font-size: 14px;
//               line-height: 20px;
//               color: #666;
//               .bar {
//                 display: inline-block;
//                 margin: 0 8px;
//                 color: #999;
//               }
//             }
//           }
//           > p {
//             font-size: 15px;
//             color: #333;
//           }
//         }
//         p {
//           padding: 0;
//         }
//       }
//       .list-wrap + .list-wrap {
//         border-top: 1px solid #ebebeb;
//       }
//       .more {
//         text-align: center;
//         button {
//           font-size: 16px;
//           font-weight: bold;
//           color: #000;
//         }
//       }
//     }
//     &.slide {
//       .preview {
//         display: none;
//       }
//       .more {
//         display: none;
//       }
//     }
//     &.full {
//       .preview {
//         display: none;
//       }
//     }
//   }

//   &.box1 {
//     .image {
//       height: 200px;
//       background: #44b2b7;
//       p {
//         color: #fff;
//       }
//     }
//   }

//   &.box2 {
//     .image {
//       height: 434px;
//       background: #108c25;
//       p {
//         color: #000;
//       }
//     }
//     .ad {
//       min-height: 300px;
//       background: #269e5c;
//       padding: 40px 10px 10px;
//       margin-top: 60px;
//       h2 {
//         text-align: center;
//         color :#000;
//       }
//       p {
//         margin-top: 15px;
//         font-size: 16px;
//         text-align: center;
//         color: #000;
//       }
//     }
//     .bottom {
//       padding: 40px 0;
//       margin-top: 50px;
//       background: #ebebeb;
//       text-align: center;
//       h3 {
//         font-size: 16px;
//         text-align: center;
//       }
//       .more {
//         margin-top: 10px;
//         text-align: center;
//       }
//     }
//   }

//   &.box3 {
//     .image {
//       height: 200px;
//     }
//     .cont {
//       h2 + p {
//         font-size: 16px;
//         font-weight: 500;
//       }
//     }
//   }

//   &.box4 {
//     .image {
//       height: 200px;
//       box-sizing: border-box;
//       .bottom-txt {
//         margin-top: 15px;
//         font-size: 36px;
//         font-weight: bold;
//         span {
//           display: block;
//           font-size: 14px;
//           line-height: 20px;
//           font-weight: normal;
//         }
//       }
//     }
//     .cont {
//       .point-useinfo {
//         display: flex;
//         padding: 0 20px;
//         li {
//           flex: 1 1 0;
//           padding: 70px 10px 0 10px;
//           font-size: 14px;
//           line-height: 20px;
//           color: #666;
//           text-align: center;
//         }
//         li + li {
//           border-left: 1px solid #ebebeb;
//         }
//       }
//     }

//     &.slide, &.full {
//       .image {
//         .bottom-txt {
//           bottom: 70px;
//           span {
//             font-size: 18px;
//           }
//         }
//       }
//     }
//   }


// }


// </style>
