import './assets/scss/style.scss';

import 'jquery';
import 'bootstrap/dist/js/bootstrap.bundle';
import './assets/js/modernizr-custom';
import 'desandro-classie';
import './assets/js/main';
import 'typed.js';
import 'filterizr';
import 'magnific-popup';
import 'jquery-animated-headlines';
import './assets/js/TweenMax.min';
import './assets/js/DistortedButtonEffects';
import './assets/js/custom';

import './assets/images/afzoonravan02.jpg';
import './assets/images/altontrading02.jpg';
import './assets/images/artman02.jpg';
import './assets/images/badr2402.jpg';
import './assets/images/bonmano02.jpg';
import './assets/images/bsi02.jpg';
import './assets/images/caspian02.jpg';
import './assets/images/cr7shop02.jpg';
import './assets/images/curriculum-vitae.jpg';
import './assets/images/fabrioni02.jpg';
import './assets/images/fastclick02.jpg';
import './assets/images/gtc102.jpg';
import './assets/images/iranmrcarpet02.jpg';
import './assets/images/karafarinbank02.jpg';
import './assets/images/koohrangdairy02.jpg';
import './assets/images/lalehzarcenter02.jpg';
import './assets/images/magic-home02.jpg';
import './assets/images/medghoo02.jpg';
import './assets/images/midhco02.jpg';
import './assets/images/novinleather02.jpg';
import './assets/images/paraye02.jpg';
import './assets/images/pasargadmobl02.jpg';
import './assets/images/rostani02.jpg';
import './assets/images/sedcompany02.jpg';
import './assets/images/tiamnetworks02.jpg';
import './assets/images/vata02.jpg';
import './assets/images/vichyteen02.jpg';

console.log("window: ", window);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}