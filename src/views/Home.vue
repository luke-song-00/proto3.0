<template>
  <div class="home" :class="[...contentBoxClass]">
    <div ref="topMenu" class="top-menu show">
      <button>M</button>
      <p>
        <button>S</button>
        <button>C</button>
        <button @click="$router.push('crop-box-detail')">P</button>
      </p>
    </div>

    <div class="content-box" v-show="true" :class="[...contentBoxClass]">
      <div ref="cropBox" v-for="(data, index) in slideData" :key="`cropbox${index}`"
        class="box collapsed" :class="[`box${index}`, {'used-list': index === 0}]">
        <div class="box-wrapper" v-show="viewStatus === 'list'"
          @touchstart.self="scaleDown(index)"
          @touchmove.self="relaseScale(index)"
          @touchend.self="expand(index)" />
        <div class="crop-wrapper" v-html="data.cropData"></div>
      </div>
    </div>

    <!-- @touchstart.self="scaleDown(index)"
          @touchmove.self="relaseScale(index)"
          @touchend.self="expand(index)" -->

    <!-- <div class="swiper-box" v-show="false">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(data, index) in slideData" :key="`slidebox${index}`" class="box no-shadow full" :class="[`box${index}`, {'used-list': index === 0}]">
          <div class="crop-wrapper" v-html="data.cropData"></div>
        </swiper-slide>
      </swiper>
    </div> -->
  </div>
</template>

<script>
import Velocity from 'velocity-animate';
// import SLIDE_DATA from '@/store/slideData';
import SLIDE_DATA from '@/store/slideData2';

export default {
  name: 'home',
  data: () => ({
    importedSlideData: SLIDE_DATA,
    slideData: [],
    viewStatus: 'list',
    swiperOptions: {
      spaceBetween: 5,
    },
    activeIndex: 0,
  }),
  computed: {
    contentBoxClass() {
      return [
        `${this.viewStatus}`,
      ];
    },
  },
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
    relaseScale(index) {
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
      const data = this.slideData[index];
      if (data.status === 'scaleDown') {
        this.hideMenu();
        const el = this.$refs.cropBox[index];
        // const el = this.$refs.cropBox;
        // const rect = el.getBoundingClientRect();

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
            easing: [0.18, 0.89, 0.32, 1.1],
            // easing: 'ease',
            queue: false,
          });
        Velocity(el,
          {
            width: target.width,
            // height: target.height,
            // translateX: target.left,
          },
          {
            duration: 300,
            delay: 50,
            easing: [0.18, 0.89, 0.32, 1.1],
            // easing: 'ease',
            queue: false,
          });
        Velocity(el,
          {
            height: target.height,
          },
          {
            duration: 400,
            delay: 100,
            easing: [0.18, 0.89, 0.32, 1.1],
            // easing: 'ease',
            queue: false,
          })
          .then(() => {
            this.$nextTick(() => {
              document.scrollingElement.scrollTo(0, 0);
              this.$refs.cropBox.forEach((cropEl, cropIdx) => {
                if (cropIdx !== index) {
                  cropEl.classList.add('hidden');
                }
              });

              this.viewStatus = 'full';
              data.status = 'expanded';
              el.style.transform = '';
              el.style.width = '';
              el.style.height = '';
              el.classList.remove('transform');
              // el.classList.remove('collapsed');
              el.classList.add('expanded');
              this.activeIndex = index;
              // Velocity(el, { translateY: '0px' }, { duration: 0 });
            });
          });
      }
    },

    collapse() {
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

      Velocity(el,
        {
          translateY: '0px',
        },
        {
          duration: 400,
          easing: [0.18, 0.89, 0.32, 1.1],
          queue: false,
        });
      Velocity(el,
        {
          width: initialWidth,
        },
        {
          duration: 300,
          easing: 'linear',
          queue: false,
        });
      Velocity(el,
        {
          height: initialHeight,
        },
        {
          duration: 300,
          easing: 'linear',
          queue: false,
        })
        .then(() => {
          data.status = 'initial';
          el.style.transform = '';
          el.style.width = '';
          el.style.height = '';
          el.classList.add('collapsed');
          el.classList.remove('collapsing');
        });
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

    // document.getElementsByClassName('crop').forEach((element) => {
    //   element.ontouchstart = function () {};
    // });
    // this.hideMenu();

    window.collapse = this.collapse;
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding-top: 70px;
  &.full {
    padding-top: 0;
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
    padding: 20px 20px 60px;
    height: 434px;
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
    background: #44b2b7;
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
  }
  &.transform {
    // position: absolute;
    // z-index: 3;
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
