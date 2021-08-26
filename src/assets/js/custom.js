"use strict";

var TSD = {};
TSD.WebLoad = function () {
    document.getElementById("loading").style.display = "none";
}

$(window).on("load", function () {
    TSD.WebLoad();
});

var typed = new Typed('.element', {
    strings: [
        'Senior Front-End Web Developer . . .',
        'Graphic Designer . . .',
        'UX/UI Designer . . .',
        'Web Designer . . .'
    ],
    typeSpeed: 100,
    loop: true,
    showCursor: false
});

const filterizr = new Filterizr('.filter-container', {
    animationDuration: 0.5, // in seconds
    delay: 250, // Transition delay in ms
    delayMode: 'alternate', // 'progressive' or 'alternate'
    gutterPixels: 0 // Items spacing in pixels
});

$(document).ready(function () { // $(function () {});
    $('.ah-intro').animatedHeadline({
            animationType: 'rotate-2'
        }
    );
    $('input').focus(function () {
        $(this).addClass('active');
    }).blur(function () {
        $(this).removeClass('active');
    });

    $('.popup-link').magnificPopup({
        gallery: {
            enabled: true
        },
        type: 'image',
        zoom: {
            enabled: true,
            duration: 300,
            easing: 'ease-in-out'
        }
    });

    // $('.list-group-item').click(function () {
    //     $(this).addClass('active');
    //     $(this).siblings().removeClass('active');
    // });

    var audio = $("#click-sound")[0];
    $("#button").mousedown(function () {
        audio.play();
    });
});

var cursor = {
    delay: 8,
    _x: 0,
    _y: 0,
    endX: (window.innerWidth / 2),
    endY: (window.innerHeight / 2),
    cursorVisible: true,
    cursorEnlarged: false,
    $dot: document.querySelector('.cursor-dot'),
    $outline: document.querySelector('.cursor-dot-outline'),

    init: function () {
        // Set up element sizes
        this.dotSize = this.$dot.offsetWidth;
        this.outlineSize = this.$outline.offsetWidth;

        this.setupEventListeners();
        this.animateDotOutline();
    },

//     updateCursor: function(e) {
//         var self = this;

//         console.log(e)

//         // Show the cursor
//         self.cursorVisible = true;
//         self.toggleCursorVisibility();

//         // Position the dot
//         self.endX = e.pageX;
//         self.endY = e.pageY;
//         self.$dot.style.top = self.endY + 'px';
//         self.$dot.style.left = self.endX + 'px';
//     },

    setupEventListeners: function () {
        var self = this;

        // Anchor hovering
        document.querySelectorAll('a').forEach(function (el) {
            el.addEventListener('mouseover', function () {
                self.cursorEnlarged = true;
                self.toggleCursorSize();
            });
            el.addEventListener('mouseout', function () {
                self.cursorEnlarged = false;
                self.toggleCursorSize();
            });
        });

        // Click events
        document.addEventListener('mousedown', function () {
            self.cursorEnlarged = true;
            self.toggleCursorSize();
        });
        document.addEventListener('mouseup', function () {
            self.cursorEnlarged = false;
            self.toggleCursorSize();
        });


        document.addEventListener('mousemove', function (e) {
            // Show the cursor
            self.cursorVisible = true;
            self.toggleCursorVisibility();

            // Position the dot
            self.endX = e.pageX;
            self.endY = e.pageY;
            self.$dot.style.top = self.endY + 'px';
            self.$dot.style.left = self.endX + 'px';
        });

        // Hide/show cursor
        document.addEventListener('mouseenter', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        });

        document.addEventListener('mouseleave', function (e) {
            self.cursorVisible = true;
            self.toggleCursorVisibility();
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        });
    },

    animateDotOutline: function () {
        var self = this;

        self._x += (self.endX - self._x) / self.delay;
        self._y += (self.endY - self._y) / self.delay;
        self.$outline.style.top = self._y + 'px';
        self.$outline.style.left = self._x + 'px';

        requestAnimationFrame(this.animateDotOutline.bind(self));
    },

    toggleCursorSize: function () {
        var self = this;

        if (self.cursorEnlarged) {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(0.75)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1.5)';
        } else {
            self.$dot.style.transform = 'translate(-50%, -50%) scale(1)';
            self.$outline.style.transform = 'translate(-50%, -50%) scale(1)';
        }
    },

    toggleCursorVisibility: function () {
        var self = this;

        if (self.cursorVisible) {
            self.$dot.style.opacity = 1;
            self.$outline.style.opacity = 1;
        } else {
            self.$dot.style.opacity = 0;
            self.$outline.style.opacity = 0;
        }
    }
}

cursor.init();

var buttons = document.getElementsByClassName("btn-primary");

Array.prototype.forEach.call(buttons, function (b) {
    b.addEventListener('click', createRipple);
});


function createRipple(e) {
    // alert('x');
    var circle = document.createElement('div');
    this.appendChild(circle);

    var d = Math.max(this.clientWidth, this.clientHeight);

    circle.style.width = circle.style.height = d + 'px';

    var rect = this.getBoundingClientRect();
    circle.style.left = e.clientX - rect.left - d / 2 + 'px';
    circle.style.top = e.clientY - rect.top - d / 2 + 'px';
    circle.classList.add('ripple');

    setTimeout(function () {
        circle.remove();
    }, 500);
}

let c = 45;

function draw() {
    document.documentElement.style.setProperty('--direction', c++ + 'deg');
    requestAnimationFrame(draw);
}

requestAnimationFrame(draw);