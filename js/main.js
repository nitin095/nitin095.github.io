gsap.registerPlugin(ScrollTrigger);

var currentImg = undefined,
  currentImgProps = { x: 0, y: 0 },
  isZooming = false,
  column = -1,
  mouse = { x: 0, y: 0 },
  delayedPlay;
var projects = [
  {
    id: 1,
    name: 'Duane Park',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'http://dev.thealphagency.com/duane-park/',
    images: ['duane1.jpg', 'duane2.jpg', 'duane3.jpg'],
    tech: '',
    platforms: ['Web']
  },
  {
    id: 2,
    name: 'Orangeslates',
    role: 'FullStack Developer',
    at: 'The Alpha Agency',
    link: 'https://www.orangeslates.com/',
    images: ['os1.jpg', 'os2.jpg', 'os3.jpg'],
    tech: 'Django/Python',
    platforms: ['Web']
  },
  {
    id: 3,
    name: 'Permier League Next Generation 2021',
    role: 'FullStack Developer',
    at: '',
    link: 'https://plnextgenindia.com/',
    images: ['pl1.jpg', 'pl2.jpg', 'pl3.jpg'],
    tech: 'Django/Python',
    platforms: ['Web']
  },
  {
    id: 4,
    name: 'Brainiant',
    role: 'FullStack Developer',
    at: '',
    link: '',
    images: [],
    tech: 'Angular/NodeJs/MongoDB',
    platforms: ['Web']
  },
  {
    id: 5,
    name: 'The Boutique Club',
    role: 'FullStack Developer',
    at: 'The Alpha Agency',
    link: 'https://www.theboutiqueclub.in/',
    images: [],
    tech: 'Angular/NodeJs/MongoDB',
    platforms: ['Web']
  },
  {
    id: 6,
    name: 'Seasoul Cosmetics',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'https://www.seasoulcosmetics.com/',
    images: [],
    tech: 'Angular',
    platforms: ['Web']
  },
  {
    id: 7,
    name: 'JK Smart Tyre',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'https://www.jktyre.com/SMARTTYRE',
    images: [],
    tech: '',
    platforms: ['Web']
  },
  {
    id: 8,
    name: 'Pramaa by Pratima',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'https://www.pramaabypratima.com/',
    images: [],
    tech: 'Angular',
    platforms: ['Web']
  },
  {
    id: 9,
    name: 'Barosi',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'https://www.barosi.in/',
    images: [],
    tech: '',
    platforms: ['Web', 'Android', 'iOS']
  },
  {
    id: 10,
    name: 'JK Ranger',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'https://ranger.jktyre.com',
    images: [],
    tech: '',
    platforms: ['Web']
  },
  {
    id: 11,
    name: 'JK 20 Million Strong',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'http://20milliontbr.jktyre.com',
    images: [],
    tech: '',
    platforms: ['Web']
  },
  {
    id: 12,
    name: 'JK USA',
    role: 'Frontend Developer',
    at: 'The Alpha Agency',
    link: 'https://www.jk-usa.com',
    images: [],
    tech: 'Angular',
    platforms: ['Web']
  },
  {
    id: 13,
    name: 'International Football Development Programme',
    role: 'Frontend Developer',
    at: '',
    link: 'http://indiaontrack.in/ifdp/',
    images: [],
    tech: '',
    platforms: ['Web']
  }
]

function pauseBoxes(b) {
  var classStr = 'pb-col0';
  if ($(b).hasClass('pb-col1')) classStr = 'pb-col1';
  if ($(b).hasClass('pb-col2')) classStr = 'pb-col2';
  for (var i = 0; i < $('.mainBoxes').children().length; i++) {
    var b = $('.mainBoxes').children()[i];
    if ($(b).hasClass(classStr)) gsap.to(b.tl, { timeScale: 0, ease: 'sine' });
  }
}

function playBoxes() {
  for (var i = 0; i < $('.mainBoxes').children().length; i++) {
    var tl = $('.mainBoxes').children()[i].tl;
    tl.play();
    gsap.to(tl, { duration: 0.4, timeScale: 1, ease: 'sine.in', overwrite: true });
  }
}


window.onload = function () {

  let loadTimeline = gsap.timeline({ defaults: { ease: 'expo' } })
    .from('#home .container h1 span', 2, {
      y: 300,
      rotate: 20
    }, 0.8)
    .from('#home .container .domain_row div', 2, {
      y: 200,
      rotate: 20,
      stagger: 0.1
    }, 0.8)
    .from('#home .container button', 2, {
      y: 350,
      rotate: 20
    }, 0.9)

  for (let project of projects) {
    $('#explore').append(`
      <section class="panel">
          <div class="left">
            <h1>${project.name}</h1>
            ${project.at != '' ? ` <div class="row">
            <div class="col">AT</div>
            <div class="col">${project.at}</div>
            </div>` : ''}
            <div class="row">
              <div class="col">ROLE</div>
              <div class="col">${project.role}</div>
            </div>
            ${project.tech != '' ? ` <div class="row">
            <div class="col">TECH</div>
            <div class="col">${project.tech}</div>
            </div>` : ''}
            <a href="${project.link}" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                />
              </svg>
            </a>
          </div>
          <img src="./assets/${project.id - 1}.jpg" alt="" />
        </section>
      `)
  }


  let mql = window.matchMedia('(min-width: 575px)');
  if (mql.matches) {

    loadTimeline.from('#home .main', 2, {
      scale: 9
    }, 0)

    for (var i = 0; i < 24; i++) {

      if (i % 8 == 0) column++;

      var b = document.createElement('div');
      $('.mainBoxes').append(b);

      gsap.set(b, {
        attr: { id: 'b' + i, class: 'photoBox pb-col' + column, 'data-id': i > 12 ? i - 13 + 1 : i + 1 },
        backgroundImage: 'url(./assets/' + i + '.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        overflow: 'hidden',
        x: [60, 380, 700][column],
        width: 600,
        height: 400,
        borderRadius: 20,
        scale: 0.5,
        zIndex: 1
      });

      b.tl = gsap.timeline({ paused: true, repeat: -1 })
        .fromTo(b, { y: [-575, 800, 800][column], rotation: -0.05 }, { duration: [40, 35, 26][column], y: [800, -575, -575][column], rotation: 0.05, ease: 'none' })
        .progress(i % 5 / 5)
    }

    gsap.set('.m1_stage', { x: '50%', y: '50%' })

    var _tl = gsap.timeline({ onStart: playBoxes })
      .set('.main', { perspective: 800 })
      .set('.photoBox', { opacity: 1, cursor: 'pointer', css: { 'filter': 'grayscale(80%)', '-webkit-filter': 'grayscale(80%)' } })
      .set('.mainBoxes', { left: '60%', xPercent: -40, width: 1200 })
      .set('.mainClose', { autoAlpha: 0, width: 60, height: 60, left: -30, top: -31, pointerEvents: 'none' })
      .fromTo('.main', { autoAlpha: 0 }, { duration: 0.6, ease: 'power2.inOut', autoAlpha: 1 }, 0.2)

    $('.photoBox').on('mouseenter', function (e) {
      console.log($(e.currentTarget).hasClass('pb-col0'))
      if (currentImg) return;
      if (delayedPlay) delayedPlay.kill();
      pauseBoxes(e.currentTarget);
      var _t = e.currentTarget;
      gsap.to('.photoBox', { duration: 0.5, overwrite: 'auto', opacity: function (i, t) { return (t == _t) ? 1 : 0.33 } });
      gsap.fromTo(_t, { zIndex: 100 }, { duration: 0.5, scale: 0.62, css: { 'filter': 'grayscale(0%)', '-webkit-filter': 'grayscale(0%)', 'scale': '0.62' }, overwrite: 'auto', ease: 'power3' });
    });

    $('.photoBox').on('mouseleave', function (e) {
      if (currentImg) return;
      var _t = e.currentTarget;

      if (gsap.getProperty(_t, 'scale') > 0.62) delayedPlay = gsap.delayedCall(0.3, playBoxes); // to avoid jump, add delay when mouseout occurs as big image scales back down (not 100% reliable because the scale value sometimes evaluates too late)
      else playBoxes();

      gsap.timeline()
        .set(_t, { zIndex: 1 })
        .to(_t, { duration: 0.3, scale: 0.5, overwrite: 'auto', ease: 'expo' }, 0)
        .to('.photoBox', { duration: 0.5, opacity: 1, css: { 'filter': 'grayscale(80%)', '-webkit-filter': 'grayscale(80%)', 'opacity': '1' }, ease: 'power2.inOut' }, 0);
    });

    $('.photoBox').on('click', function (e) {
      if (!isZooming) { //only tween if photoBox isn't currently zooming
        isZooming = true;
        gsap.delayedCall(0.8, function () { isZooming = false });
        if (currentImg) {
          gsap.timeline({ defaults: { ease: 'expo.inOut' } })
            .to('#detail .card', 2, { xPercent: -100 })
            .to('#detail img', 1, { opacity: 0, scale: 0.5, stagger: 0.2 }, 0)
            .to('.mainClose', { duration: 0.1, autoAlpha: 0, overwrite: true }, 0)
            .to('.mainBoxes', { duration: 2, scale: 1, left: '60%', width: 1200, rotate: 15, overwrite: true }, 0)
            .to('.photoBox', { duration: 0.6, opacity: 1, ease: 'power4.inOut' }, 0)
            .to(currentImg, { duration: 2, width: 600, height: 400, borderRadius: 20, x: currentImgProps.x, y: currentImgProps.y, scale: 0.5, rotation: 0, zIndex: 1 }, 0)
            // .add(playBoxes, 0.8)
            .to('#home .container h1 span, #home .container button', 2, { y: 0 }, 0.2)
            .set('#detail', { display: 'block' })
          currentImg = undefined;
          $('.mainBoxes').addClass('fog')

        }
        else {
          pauseBoxes(e.currentTarget)
          currentImg = e.currentTarget;
          currentImgProps.x = gsap.getProperty(currentImg, 'x');
          currentImgProps.y = gsap.getProperty(currentImg, 'y');
          gsap.timeline({ defaults: { duration: 0.6, ease: 'expo.inOut' } })
            .set(currentImg, { zIndex: 100 })
            .to('#home .container h1 span, #home .container button', 2, { y: 100 })
            .fromTo('.mainClose', { x: mouse.x, y: mouse.y, background: 'rgba(0,0,0,0)' }, { autoAlpha: 1, duration: 0.3, ease: 'power3.inOut' }, 0)
            // .to('.photoBox', { opacity: 0 }, 0)
            .to(currentImg, 1.8, { width: '100%', height: '100%', borderRadius: 0, x: 0, top: 0, y: 0, scale: 1, opacity: 1 }, 0)
            .to('.mainBoxes', { duration: 1.8, left: '40%', width: '100%', rotate: 0 }, 0)
            .to('.mainBoxes', { duration: 5, scale: 1.06, ease: 'none' }, 0.65)
            .set('#detail', { display: 'block' }, 0)
            .to('#detail .card', 2, { xPercent: 100 }, 0.8)
            .to('#detail img', 2, { opacity: 1, scale: 1, stagger: 0.2 }, 1.5)

          $('.mainBoxes').removeClass('fog')
          console.log(e.target.dataset.id)
          for (let project of projects) {
            if (project.id == e.target.dataset.id) {
              $('#detail .card').html(`
            <h1>${project.name}</h1>
            <h5>ROLE</h5>
            <p>${project.role}</p>
            ${project.at !== '' ? "<h5>AT</h5><p>" + project.at + "</p>" : ''}
            ${project.tech !== '' ? "<h5>Tech</h5><p>" + project.tech + "</p>" : ''}
            <a href="${project.link}" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
              >
                <path
                  d="M21 13v10h-21v-19h12v2h-10v15h17v-8h2zm3-12h-10.988l4.035 4-6.977 7.07 2.828 2.828 6.977-7.07 4.125 4.172v-11z"
                />
              </svg>
            </a>
            `)
            }
            break;
          }
        }
      }
    });

    if (!!('ontouchstart' in window)) {
      console.log('touch device!')
      mouse.x = window.innerWidth - 50;
      mouse.y = 60;
    }
    else {
      $('.main').on('mousemove', function (e) {
        mouse.x = e.x;
        mouse.y = e.layerY;
        if (currentImg) gsap.to('.mainClose', { duration: 0.1, x: mouse.x, y: mouse.y, overwrite: 'auto' });
      });
    }

    // grid reveal on scroll
    gsap.timeline({
      scrollTrigger: {
        trigger: ".grid-container.one",
        start: "top top",
        end: () => innerHeight * 4,
        scrub: true,
        pin: ".grid-container.one .grid",
        anticipatePin: 1
      }
    })
      .set(".grid-container.one .gridBlock:not(.centerBlock)", { autoAlpha: 0 })
      .to(".grid-container.one .gridBlock:not(.centerBlock)", { duration: 0.1, autoAlpha: 1 }, 0.001)
      .from(".grid-container.one .gridLayer", {
        scale: 2.3333,
        ease: "none",
      });

    gsap.utils.toArray('section').forEach((section, index) => {
      const w = section.querySelector('.section_heading');
      if (w) {
        const [x, xEnd] = (index % 2) ? [w.dataset.percent, (w.scrollWidth - section.offsetWidth) * w.dataset.speed] : [w.scrollWidth * -0.3, w.dataset.percent];
        gsap.fromTo(w, { x }, {
          x: xEnd,
          scrollTrigger: {
            trigger: section,
            scrub: 0.5
          }
        });
      }
    });

  }//end if mq1.matches
  else {
    loadTimeline.from('#home .mainBoxes', 5, {
      x: -100,
      opacity: 0,
      scale: 2
    }, 0)
    for (var i = 0; i < 24; i++) {
      $('.mainBoxes').append(`
      <div>
        <img src="./assets/${i}.jpg">
      </div>
      `);
    }
  }


}


window.onresize = function () {
  gsap.set('.m1_stage', { x: '50%' })
}

// skills svg
gsap.timeline({ defaults: { duration: 45 } })
  .from('.main1', { duration: 1, autoAlpha: 0, ease: 'power1.inOut' }, 0)
  .fromTo('.m1_cGroup', { opacity: 0 }, { duration: 0.3, opacity: 1, stagger: -0.1 }, 0)
  .from('.m1_cGroup', { duration: 2.5, scale: -0.3, transformOrigin: '50% 50%', stagger: -0.05, ease: 'elastic' }, 0)
  .fromTo('.m1Bg', { opacity: 0 }, { duration: 1, opacity: 1, ease: 'power2.inOut' }, 0.2)

  .add('orbs', 1.2)
  .add(function () {
    $('.main1').on('mousemove', function (e) {
      gsap.to('.m1_cGroup', { duration: 1, x: function (i) { return (e.clientX / window.innerWidth) / (i + 1) * 150 }, y: function (i) { return i * -20 * (e.clientY / window.innerHeight) }, rotation: Math.random() * 0.1, overwrite: 'auto' });
      gsap.to('.c1_solid, .c1_line', { duration: 1, attr: { opacity: 1.1 - 0.75 * (e.clientY / window.innerHeight) } })
      gsap.to('.m1OrbBlank', { duration: 1, opacity: 0.2 + 0.55 * (e.clientY / window.innerHeight) })
    });

    $('.main1').on('click', function (e) {
      if (gsap.getProperty('.m1_cGroup', 'scale') != 1) return; //prevent overlapping bouncy tweens
      for (var i = 0; i < $('.m1_cGroup').length; i++) {
        gsap.fromTo($('.m1_cGroup')[i], { transformOrigin: '50% 50%', scale: 1 }, { duration: 0.7 - i / 25, scale: 0.9, ease: 'back.in(10)', yoyo: true, repeat: 1 })
      }
    });
  }, 'orbs+=0.5')


  .fromTo('.orb1', { xPercent: -35, yPercent: -5 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line1', false)[0] },
      start: 1.03,
      end: 1.22
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb1b', { xPercent: -50, yPercent: -15 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line1', false)[0] },
      start: 2.3,
      end: 2.5
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb1c', { xPercent: -35, yPercent: -25 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line1', false)[0] },
      start: 1.7,
      end: 1.8
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb2', { xPercent: -45, yPercent: -10 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line2', false)[0] },
      start: 0.98,
      end: 1.2
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb3', { xPercent: -50, yPercent: -15 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
      start: 1.06,
      end: 1.31
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb3b', { xPercent: -50, yPercent: -25 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
      start: 1.49,
      end: 1.65
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb3c', { xPercent: -45, yPercent: -15 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
      start: 0.95,
      end: 1.2
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb3d', { xPercent: -35, yPercent: -5 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line3', false)[0] },
      start: 1.9,
      end: 2.1
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb4', { xPercent: -60, yPercent: -35 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line4', false)[0] },
      start: 2.6,
      end: 2.7
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.orb4b', { xPercent: -50, yPercent: -25 }, {
    motionPath: {
      path: function () { return MotionPathPlugin.convertToPath('.c1_line4', false)[0] },
      start: 1.41,
      end: 1.6
    }, ease: 'none', yoyo: true, repeat: -1
  }, 'orbs')

  .fromTo('.m1Orb', { scale: 0, transformOrigin: '50% 50%' }, { duration: 0.8, scale: 1.5, ease: 'back.out(3)', stagger: 0.15, overwrite: 'auto' }, 'orbs')
  .fromTo('.m1OrbBlank', { opacity: 0 }, { duration: 0.8, opacity: function (i) { return 0.2 + i / 7 }, stagger: 0.1, overwrite: 'auto' }, 'orbs')
  .fromTo('.m1OrbBlank', { x: function (i) { return 620 - i / 4 * 380 }, transformOrigin: function (i) { return -(620 - i / 4 * 380) + 'px 0px' }, rotation: function (i) { return [99, -10, 55, 110, 120][i] } }, { rotation: '+=75', yoyo: true, repeat: -1 }, 'orbs')


gsap.from('#skills .main1', 1, {
  scale: 0.5,
  scrollTrigger: {
    trigger: '#skills',
    onEnter: () => {
      setTimeout(() => {
        $('.main1').trigger('click')
      }, 1000);
    }
  }
})

gsap.from('#contact #form', 2, {
  y: 200,
  scale: 0.8,
  skewY: 30,
  opacity: 0,
  ease: 'expo',
  scrollTrigger: {
    trigger: '#contact'
  }
})


// for parallex scroll
gsap.to(".grid-container.one .text", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.one",
    scrub: true
  },
});
gsap.to(".grid-container.one .desk", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.one",
    scrub: true
  },
});
gsap.to(".grid-container.one .mob", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.one",
    scrub: true
  },
});
gsap.to(".grid-container.one .lap", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.one",
    scrub: true
  },
});

gsap.to(".grid-container.two .text", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.two",
    scrub: true
  },
});
gsap.to(".grid-container.two .desk", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.two",
    scrub: true
  },
});
gsap.to(".grid-container.two .mob", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.two",
    scrub: true
  },
});
gsap.to(".grid-container.two .lap", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.two",
    scrub: true
  },
});


gsap.to(".grid-container.three .text", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.three",
    scrub: true
  },
});
gsap.to(".grid-container.three .desk", {
  yPercent: 20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.three",
    scrub: true
  },
});
gsap.to(".grid-container.three .mob", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.three",
    scrub: true
  },
});
gsap.to(".grid-container.three .lap", {
  yPercent: -20,
  ease: "none",
  scrollTrigger: {
    trigger: ".grid-container.three",
    scrub: true
  },
});


// for skewing on scroll
let proxy = { skew: 0 },
  skewSetter = gsap.quickSetter(".gridBlock", "skewY", "deg"),
  clamp = gsap.utils.clamp(-2, 2)
ScrollTrigger.create({
  onUpdate: (self) => {
    // -1000
    let skew = clamp(self.getVelocity() / -10);
    if (Math.abs(skew) > Math.abs(proxy.skew)) {
      proxy.skew = skew;
      gsap.to(proxy, { skew: 0, duration: 0.8, ease: "power3", overwrite: true, onUpdate: () => { skewSetter(proxy.skew) } });
    }
  }
});
gsap.set(".gridBlock", { transformOrigin: "center", force3D: true });


$('#home button').on('mouseenter', function () {
  gsap.timeline()
    .to('#home .skew', 1, { skewX: -15, scale: 1.1, x: 20, ease: 'expo' })
    .to('.mainBoxes', 1, { scale: 1.5, x: -200, opacity: 0.5, ease: 'expo' }, 0)
});

$('#home button').on('mouseleave', function () {
  gsap.to('#home .skew', 1, { skewX: 0, scale: 1, x: 0, ease: 'expo' })
  gsap.to('.mainBoxes', 1, { scale: 1, x: 0, opacity: 1, ease: 'expo' })
});


$('.explore').on('click', function () {
  gsap.timeline()
    .set('#pageTransition', { transformOrigin: 'bottom' })
    .to('#pageTransition', 1, {
      scaleY: 1, ease: 'expo'
    }, 0)
    .set('#explore', { display: 'flex' })
    .set('#pageTransition', { transformOrigin: 'top' })
    .to('#pageTransition', 1, {
      scaleY: 0, ease: 'expo'
    })
  setTimeout(() => {
    cancelAnimationFrame(myReq);
    $('#home,#work,#skills,#contact,#about').hide()
  }, 1000);
});

$('.close').on('click', function () {
  gsap.timeline()
    .set('#pageTransition', { transformOrigin: 'top' })
    .to('#pageTransition', 1, {
      scaleY: 1, ease: 'expo'
    }, 0)
    .set('#explore', { display: 'none' })
    .set('#pageTransition', { transformOrigin: 'bottom' })
    .to('#pageTransition', 1, {
      scaleY: 0, ease: 'expo'
    })
  setTimeout(() => {
    $('#home,#work,#skills,#contact,#about').show()
  }, 1000);
});


// button hover effect
var filter = document.querySelector("#turbulence");
var frames = 0;
var rad = Math.PI / 180;
var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;
var myReq;
function freqAnimation() {
  console.log('freqAnimation')
  bfx = 0.005;
  bfy = .01;
  frames += .45
  bfx += 0.001 * Math.cos(frames * rad);
  bfy += 0.005 * Math.sin(frames * rad);
  bf = bfx.toString() + ' ' + bfy.toString();
  filter.setAttributeNS(null, 'baseFrequency', bf);
  myReq = requestAnimationFrame(freqAnimation);
}

$('button').on('mouseenter', function () {
  myReq = requestAnimationFrame(freqAnimation);
})

$('button').on('mouseleave', function () {
  cancelAnimationFrame(myReq);
})


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyBF-sionJcXnxBi1KAyQlbg9JPETnr8ZHs",
  authDomain: "my-app-095.firebaseapp.com",
  projectId: "my-app-095",
  // storageBucket: "my-app-095.appspot.com",
  // messagingSenderId: "595447145271",
  appId: "1:595447145271:web:fb6d56eb4b847d9158b0b2",
  // measurementId: "G-WBYXD4178V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

var db = firebase.firestore();

function submit() {
  db.collection("enquires").add({
    name: $('#name').val(),
    email: $('#email').val(),
    message: $('#message').val(),
    isWeb: $('#web').prop('checked'),
    isAndroid: $('#android').prop('checked'),
    isIos: $('#ios').prop('checked')
  })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      animateForm()
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
}


function animateForm() {
  gsap.timeline()
    .to('#form .group,#form button', 1, {
      opacity: 0, ease: 'expo'
    })
    .set('#form', { transformOrigin: 'center' })
    .to('#form', 2, {
      rotateY: 180,
      background: 'linear-gradient(35deg,rgba(0, 142, 201, 0.2),rgba(215, 115, 160, 0.2))',
      ease: 'expo'
    }, 0.3)
    .to('#form .sent_msg', 1.5, {
      opacity: 1, y: 0, ease: 'expo'
    }, 0.5)
}