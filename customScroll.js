//Firefox
// document.addEventListener('DOMMouseScroll', function(e){
//     if(e.originalEvent.detail > 0) {
//         //scroll down
//         console.log('Down');
//     }else {
//         //scroll up
//         console.log('Up');
//     }

//     //prevent page fom scrolling
//     return false;
// });

//IE, Opera, Safari
// document.addEventListener('mousewheel', function(e){
//     if(e.originalEvent.wheelDelta < 0) {
//         //scroll down
//         console.log('Down');
//     }else {
//         //scroll up
//         console.log('Up');
//     }

//     //prevent page fom scrolling
//     return false;
// });


// window.addEventListener('scroll', scrollToSection());

// let startID = 'js-section-1';
// let startIdArr = startID.split('');
// let secNumber = parseInt(startIdArr[startIdArr.length - 1]);

// function scrollToSecDown() {
//     // console.log('scroll down!!!');
//     secNumber +=1;
//     console.log(secNumber);
// }

// function scrollToSecUp() {
//     // console.log('scroll up!!!');
//     secNumber -=1;
//     console.log(secNumber);
// }

// console.log(secNumber);

// let previousPosition = window.pageYOffset || document.documentElement.scrollTop;

// window.onscroll = function() {
//   let currentPosition = window.pageYOffset || document.documentElement.scrollTop;

//   if (previousPosition > currentPosition) {
//     // console.log('scrolling up');
//     scrollToSecUp();
//   } else {
//     // console.log('scrolling down');
//     scrollToSecDown();
//   }

//   previousPosition = currentPosition;
// };

(function() {
	"use strict";
	/*[pan and well CSS scrolls]*/
	let pnls = document.querySelectorAll('.panel').length,
		scdir, hold = false;

	function _scrollY(obj) {
		let slength, plength, pan, step = 100,
			vh = window.innerHeight / 100,
			vmin = Math.min(window.innerHeight, window.innerWidth) / 100;
		if ((this !== undefined && this.id === 'well') || (obj !== undefined && obj.id === 'well')) {
			pan = this || obj;
			plength = parseInt(pan.offsetHeight / vh);
		}
		if (pan === undefined) {
			return;
		}
		plength = plength || parseInt(pan.offsetHeight / vmin);
		slength = parseInt(pan.style.transform.replace('translateY(', ''));
		if (scdir === 'up' && Math.abs(slength) < (plength - plength / pnls)) {
			slength = slength - step;
		} else if (scdir === 'down' && slength < 0) {
			slength = slength + step;
		} else if (scdir === 'top') {
			slength = 0;
		}
		if (hold === false) {
			hold = true;
			pan.style.transform = 'translateY(' + slength + 'vh)';
			setTimeout(function() {
				hold = false;
			}, 1000);
		}
		// console.log(scdir + ':' + slength + ':' + plength + ':' + (plength - plength / pnls));
	}
	/*[swipe detection on touchscreen devices]*/
	function _swipe(obj) {
		let swdir,
			sX,
			sY,
			dX,
			dY,
			threshold = 100,
			/*[min distance traveled to be considered swipe]*/
			slack = 50, //50
			/*[max distance allowed at the same time in perpendicular direction]*/
			alT = 500,
			/*[max time allowed to travel that distance]*/
			elT, /*[elapsed time]*/
			stT; /*[start time]*/
		obj.addEventListener('touchstart', function(e) {
			var tchs = e.changedTouches[0];
			swdir = 'none';
			sX = tchs.pageX;
			sY = tchs.pageY;
			stT = new Date().getTime();
			//e.preventDefault();
		}, false);

		obj.addEventListener('touchmove', function(e) {
			e.preventDefault(); /*[prevent scrolling when inside DIV]*/
		}, false);

		obj.addEventListener('touchend', function(e) {
			let tchs = e.changedTouches[0];
			dX = tchs.pageX - sX;
			dY = tchs.pageY - sY;
			elT = new Date().getTime() - stT;
			if (elT <= alT) {
				if (Math.abs(dX) >= threshold && Math.abs(dY) <= slack) {
					swdir = (dX < 0) ? 'left' : 'right';
				} else if (Math.abs(dY) >= threshold && Math.abs(dX) <= slack) {
					swdir = (dY < 0) ? 'up' : 'down';
				}
				if (obj.id === 'well') {
					if (swdir === 'up') {
						scdir = swdir;
						_scrollY(obj);
					} else if (swdir === 'down' && obj.style.transform !== 'translateY(0)') {
						scdir = swdir;
						_scrollY(obj);

					}
					e.stopPropagation();
				}
			}
		}, false);
	}
	/*[assignments]*/
	let well = document.getElementById('well');
	well.style.transform = 'translateY(0)';
	well.addEventListener('wheel', function(e) {
		if (e.deltaY < 0) {
			scdir = 'down';
		}
		if (e.deltaY > 0) {
			scdir = 'up';
		}
		e.stopPropagation();
	});
	well.addEventListener('wheel', _scrollY);
	_swipe(well);
	let tops = document.querySelectorAll('.top');
	for (let i = 0; i < tops.length; i++) {
		tops[i].addEventListener('click', function() {
			scdir = 'top';
			_scrollY(well);
		});
	}
})();


////////scroll on top when page reloaded
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
} else {
    window.onbeforeunload = function () {
        window.scrollTo(0, 0);
    }
}



//
// анимация при движении мыши (paralax)
// document.addEventListener('mousemove', onDocumentMouseMove)

// let mouseX = 0
// let mouseY = 0

// let targetX = 0
// let targetY = 0

// const windowHalfX = window.innerWidth / 2
// const windowHalfY = window.innerHeight / 2

// function onDocumentMouseMove(event) {
//     mouseX = (event.clientX - windowHalfX)
//     mouseY = (event.clientY - windowHalfY)
// }


// const updateSphere = (event) => {
//     blackhole.position.y = window.scrollY * .001
// }
 
// window.addEventListener('scroll', updateSphere)