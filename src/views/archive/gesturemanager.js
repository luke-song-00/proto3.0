// initSlideGestureManager() {
//   if (this.slideGMInitialized) {
//     return;
//   }
//   this.slideGMInitialized = true;
//   const { slides } = this.$refs.hSwiper.swiper;
//   slides.each((index, slide) => {
//     // const gm = new Hammer(slide, { touchAction: 'pan-y pan-x' });
//     const gm = new Hammer(slide);

//     const obj = {
//       managerObj: gm,
//       onTransition: false,
//       touchAction: 'auto',
//     };

//     this.slideGestureManager[index] = obj;
//     obj.managerObj.set({ touchAction: obj.touchAction });

//     gm.get('pan').set({ direction: Hammer.DIRECTION_VERTICAL });
//     gm.on('pandown', (ev) => {
//       const angle = Math.abs(ev.angle);
//       console.log('deltaY:', Math.abs(ev.deltaY), 'velocity:', ev.velocity, 'angle:', angle);

//       if (slide.scrollTop === 0) {
//         if (angle >= 80 && angle <= 120) {
//           if (ev.velocity >= 0.2) {
//             // this.slideGestureManager[index].onTransition = true;
//             this.collapse();
//           } else {
//             if (!this.slideGestureManager[index].onTransition) {
//               // const scaleValue = Math.max(1 - (Math.abs(ev.deltaY) * 0.0018), 0.95);
//               const scaleValue = 1 - Math.abs(ev.deltaY) * 0.0018;

//               Velocity(slide,
//                 {
//                   scale: scaleValue,
//                   // borderRadius: '8px',
//                 },
//                 {
//                   duration: 0,
//                   queue: false,
//                 });
//             }
//           }
//         }
//       }
//     });

//     gm.on('panend pancancel', (ev) => {
//       Velocity(slide,
//         {
//           scale: 1,
//         },
//         {
//           duration: 400,
//           easing: 'ease',
//           queue: false,
//         });
//     });

//     // gm.get('swipe').set({ direction: Hammer.DIRECTION_DOWN });
//     // gm.on('swipe', (ev) => {
//     //   console.log('swipe', ev);
//     //   this.collapse();
//     // });
//   });
// },

// initCropBoxGestureManager() {
//   this.$refs.cropBox.forEach((cropboxEl, index) => {
//     const gm = new Hammer(cropboxEl);

//     gm.get('pan').set({ direction: Hammer.DIRECTION_DOWN });
//     gm.on('pandown', (ev) => {
//       const angle = Math.abs(ev.angle);
//       console.log('deltaY:', Math.abs(ev.deltaY), 'velocity:', ev.velocity, 'angle:', angle);
//       if (document.scrollingElement.scrollTop === 0 && angle >= 80 && angle <= 120) {
//         if (ev.velocity >= 0.4) {
//           // this.slideGestureManager[index].onTransition = true;
//           this.collapse();
//         } else {
//           // const scaleValue = Math.max(1 - (Math.abs(ev.deltaY) * 0.0018), 0.95);
//           const scaleValue = 1 - Math.abs(ev.deltaY) * 0.0018;

//           Velocity(cropboxEl,
//             {
//               scale: scaleValue,
//             },
//             {
//               duration: 0,
//               queue: false,
//             });
//         }
//       }
//     });
//   });
// },


    
// releaseSlideScale(index) {
//   const slide = this.$refs.hSwiper.swiper.slides[index];
//   Velocity(slide,
//     {
//       scale: 1,
//       // borderRadius: 'none',
//     },
//     {
//       duration: 400,
//       easing: 'ease',
//     })
//     .then(() => {
//       // this.slideGestureManager[index].managerObj.set({ touchAction: 'auto' });
//     });
// },
// touchMoveOnSlide(index) {
//   // console.log('touch move');
// },
// touchStartOnslide(index) {
//   const slide = this.$refs.hSwiper.swiper.slides[index];
//   if (slide.scrollTop === 0) {
//     // this.slideGestureManager[index].managerObj.set({ touchAction: 'pan-x' });
//   }
// },