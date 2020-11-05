$(document).ready(function(){

	//Google Analytics
	  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	  ga('create','UA-53828044-1','auto');
	  ga('require', 'displayfeatures');
	  ga('send','pageview');
  
	// SNS LINK
	function sharefb(url) {
	  window.open('http://www.facebook.com/sharer/sharer.php?u=' + url);
	};
  
	function sharetwit(url, text) {
	  window.open('http://twitter.com/intent/tweet?text=' + text + '&url=' + url);
	};
  
	$('#facebook').on("click", function() {
	  sharefb('http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html');
	});
  
	$('#twitter').on("click", function() {
	  sharetwit('http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html', 'SBS마부작침: ');
	});
  });
  
  
  
  
  Kakao.init('3304e8a619f256f70fd0c71f5cc846a7');
  function sendLink() {
	Kakao.Link.sendDefault({
		objectType: 'feed',
		content: {
		  title: '유기동물에 관한 슬픈 보고서',
		  description: '지난 10년 간 우리가 버린 유기동물이 95만 마리나 되는 거 알고 계셨나요?',
		  imageUrl: 'https://s3.ap-northeast-2.amazonaws.com/mabu.newscloud.sbs.co.kr/abandoned-pets/img/share.jpg',
		  link: {
			mobileWebUrl: 'http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html',
			webUrl: 'http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html'
		  }
		},
		buttons: [
		  {
			title: '웹으로 보기',
			link: {
			  mobileWebUrl: 'http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html',
			  webUrl: 'http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html'
			}
		  },
		  {
			title: '앱으로 보기',
			link: {
			  mobileWebUrl: 'http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html',
			  webUrl: 'http://mabu.newscloud.sbs.co.kr/abandoned_pets/index.html'
			}
		  }
		]
	});
  }

(() => {

	const actions = {
	};
	
	const stepElems = document.querySelectorAll('.step');
	const graphicElems = document.querySelectorAll('.graphic-item');
	const bg = document.getElementById('bg');
	const header = document.getElementById('header');
	let currentItem = graphicElems[0];
	let ioIndex;
	let prevIdx; 

	const io = new IntersectionObserver((entries, observer) => {
		ioIndex = entries[0].target.dataset.index * 1;
	});

	for (let i = 0; i < stepElems.length; i++) {
		io.observe(stepElems[i]);
		stepElems[i].dataset.index = i;
		graphicElems[i].dataset.index = i;
	}

	function activate(action) {
		currentItem.classList.add('visible');
	}

	function inactivate(action) {
		currentItem.classList.remove('visible');
	}

	function bgBlack() {
		bg.classList.add('toBlack');
		bg.classList.remove('toWhite');
		header.classList.add('headtoBlack');
		header.classList.remove('headtoWhite');
	}

	function bgWhite()
	{
		bg.classList.add('toWhite');
		bg.classList.remove('toBlack');
		header.classList.add('headtoWhite');
		header.classList.remove('headtoBlack');
	}

	window.addEventListener('scroll', () => {
		let step;
		let boundingRect;
        //배경색 해결을 위한 나의 노력
        let tempIdx;


		
		for (let i = ioIndex - 1; i < ioIndex + 2; i++) {
			step = stepElems[i];
			if (!step) continue;
			boundingRect = step.getBoundingClientRect();
			
			if (boundingRect.top > window.innerHeight * 0.1 &&
				boundingRect.top < window.innerHeight * 0.8) {
				
				inactivate(currentItem.dataset.action);
				currentItem = graphicElems[step.dataset.index];
				activate(currentItem.dataset.action);
			}
		}
		
		// 블랙아웃되는부분
        tempIdx = currentItem.dataset.index;
        if (prevIdx==6 && tempIdx==7){
            bgBlack();
        } else if(prevIdx==7 && tempIdx==6){
            bgWhite();
        }
        prevIdx = tempIdx;


	});

	window.addEventListener('load', () => {
		setTimeout(() => scrollTo(0, 0), 100);
	});

	activate();

})();


