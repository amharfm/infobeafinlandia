var spinner, dim;
AM = {
	'memuat' : function (muat){
		if (muat){
			if (!opts) var opts = {
				lines: 13     , length: 28      , width: 14     , radius: 42
				, scale: 1      , corners: 1      , color: '#fff' , opacity: 0.5
				, rotate: 0     , speed: 1        , trail: 60     , fps: 20
				, zIndex: 2e9   , className: 'spinner'            , position: 'absolute'
				, top: '50%'    , left: '50%'     , shadow: false , hwaccel: false
			};
			if (!spinner) spinner = new Spinner(opts);
			if (!dim){
				dim = document.createElement('div');
				dim.id = 'dim';
				dim.style.position = 'absolute';
				dim.style.backgroundColor = '#1751a1';
				dim.style.opacity = '0.9';
				dim.style.top = dim.style.left = '0';
				dim.style.zIndex =  '10001';
				dim.style.width = dim.style.height = '100%';
			}
			spinner.spin();
			document.body.appendChild(dim)
			document.body.appendChild(spinner.el);
		} else {
			spinner.stop();
			if (document.getElementById('dim')) dim.parentElement.removeChild(dim);
		}
	}
}