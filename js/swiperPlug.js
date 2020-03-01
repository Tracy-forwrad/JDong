(function($) {
	function SwiperPlus(options) {
		// 图片列表
		this.imgsArr = options.imgsArr;
		// 动画类型
		this.animateType = options.animateType;
		// 是否有左右按钮
		this.clickBtn = options.clickBtn;
		// 是否有下方小圆点
		this.pointBtn = options.pointBtn;
		// 是否自动轮播
		this.isAuto = options.isAuto;
		this.wrap = options.wrap; //需要加轮播图的div块
		// 每张图片的宽高
		this.evWidth = options.evWidth;
		this.evHeight = options.evHeight;
		this.length = this.imgsArr[0].length; // 数组每一项的长度
		this.totalWidth = this.length * this.evWidth; //每个ul的宽度	
		this.num = this.imgsArr.length; // 有几个图片列表
		this.allWidth = (this.num + 1) * this.totalWidth; //animate时ul的总宽度
		this.curIndex = 0; //当前索引
		this.lock = true;//控制自动播放的锁
		this.timer = null; //自动播放的定时器
		// console.log(this.allWidth)

		this.init = function() {
			this.createStructure(); //创建结构
			this.initStyle(); //初始化样式
			this.bindEvent(); // 添加事件
			if(this.isAuto){ //支持自动轮播
				this.autoPlay(); //添加自动轮播事件
			}
		}
	}
	
	SwiperPlus.prototype.autoPlay = function(){
		var self = this;
		self.timer = setInterval(function(){
			$('.right-btn',self.wrap).trigger('click')
		},2000)
	}
	SwiperPlus.prototype.changeImage = function(){
		var self = this;
		// console.log(self.lock)
		if(self.animateType == 'animate'){
			$('.ul-wrap',self.wrap).animate({
				left: - self.curIndex * self.totalWidth
			},function(){
				self.lock = true;
			})
		}else{
			$('.ul-wrap > ul',self.wrap).fadeOut().eq(self.curIndex).fadeIn(500,function(){
				self.lock = true;
			});
			// console.log(self.flag)
		}
		$('.point-wrap > span',self.wrap).css({
			backgroundColor: 'gray'
		}).eq(self.curIndex % self.num).css({
			backgroundColor: 'red'
		})
	}
	SwiperPlus.prototype.bindEvent = function() {
		var self = this;
		
		$('.left-btn', self.wrap).on('click', function() { //根据参数判断是点击的什么
			self.move('prev');
		});
		$('.right-btn', self.wrap).on('click', function() {
			self.move('next');
		});
		$('.point-wrap > span', self.wrap).on('click', function() {
			self.move($(this).index());
		});
		$('.ul-wrap',self.wrap).on('mouseenter',function(){
			clearInterval(self.timer);
		}).on('mouseleave',function(){
			if(self.isAuto){
				self.timer = setInterval(function(){
					$('.right-btn',self.wrap).trigger('click');
				},2000)
			}
		})
	}
	SwiperPlus.prototype.move = function(dir) {
		if(!this.lock){
			return false;
		}//正在运动直接返回，否则加锁
		this.lock = false;
		// this.lock = false;
		switch (dir) {
			case 'prev': //向左转
				if (this.curIndex == 0) {
					if (this.animateType == 'animate') {
						$('.ul-wrap', this.wrap).css({
							left: - this.num * this.totalWidth
						})
					}
					this.curIndex = this.num - 1;
					console.log(this.curIndex)
				} else {
					this.curIndex--;
				}
				break;
			case 'next': //向右
				if (this.curIndex == this.num) {
					if (this.animateType == 'animate') {
						$('.ul-wrap', this.wrap).css({
							left: 0
						})
					}
					this.curIndex = 1;
				} else {
					this.curIndex++;
				}
				break;
			default: //小圆点
				this.curIndex = dir;
				break;
		}
		this.changeImage(); //进行移动
	}
	SwiperPlus.prototype.lrBtnAdd = function() {
		var leBtn = $('<div class="left-btn btn"><</div>');
		var riBtn = $('<div class="right-btn btn">></div>');
		$(this.wrap).append(leBtn).append(riBtn);
		$('.btn', this.wrap).css({
			width: 20,
			height: 20,
			backgroundColor: 'rgba(0,0,0,0.5)',
			color: '#fff',
			position: 'absolute',
			left: 0,
			top: '50%',
			marginTop: '-10',
			textAlign: 'center',
			lineHeight: '20px',
			cursor: 'pointer'
		}).end().find('.right-btn').css({
			left: 'auto',
			right: 0
		})
	}
	SwiperPlus.prototype.pointWrapAdd = function() {
		var pointWrap = $('<div class="point-wrap"></div>');
		this.imgsArr.forEach(function() {
			pointWrap.append($('<span></span>'));
		})
		pointWrap.appendTo($(this.wrap));
		$('.point-wrap', this.wrap).css({
			width: '100%',
			height: 30,
			lineHeight: '30px',
			position: 'absolute',
			textAlign: 'center',
			bottom: 10,
			zIndex: 500
		});
		$('.point-wrap > span', this.wrap).css({
			display: 'inline-block',
			width: 10,
			height: 10,
			cursor: 'pointer',
			margin: '0px 30px',
			borderRadius: '50%',
			backgroundColor: 'gray'
		}).eq(0).css({
			backgroundColor: 'red'
		})
	}
	SwiperPlus.prototype.createStructure = function() {
		var ulWrap = $('<div class="ul-wrap"></div>'); //创建包裹每个ul的div
		this.imgsArr.forEach(function(ele, index) { //创建ul
			var evUl = $('<ul class="evUl-wrap">');
			ele.forEach(function(item, index) { //创建ul下的li
				var evLi = $('<li><a><img src="' + item + '"></img></a></li>');
				evLi.appendTo(evUl); //一次从里往外添加
			});
			evUl.appendTo(ulWrap);
		})
		// console.log($('.evUl-wrap'))
		var lastUl = $('<ul class="evUl-wrap">');
		this.imgsArr[0].forEach(function(item) {
			var evLi = $('<li><a><img src="' + item + '"></img></a></li>');
			evLi.appendTo(lastUl);
		})
		ulWrap.append(lastUl);
		this.wrap.append(ulWrap);


	}
	SwiperPlus.prototype.initStyle = function(){
		// console.log($(this.wrap))

		$('*', this.wrap).css({
			margin: 0,
			padding: 0,
			listStyle: 'none',
			textDecoration: 'none'
		});
		$(this.wrap).css({
			position: 'relative',
			overflow: 'hidden',
		}).add('ul',this.wrap).css({
			width: this.totalWidth,
			height: this.evHeight,
		});
		$('.ul-wrap', this.wrap).css({
			width: this.allWidth,
			height: this.evHeight,
			position: 'absolute',
			left: 0,
			top: 0,
			overflow: 'hidden'
		}).find('ul').css({
			float: 'left',
		}).find('li').css({
			float: 'left',
		}).find('img').css({
			width: this.evWidth,
			height: this.evHeight
		});
		if (this.animateType == 'fade') {
			$('.ul-wrap', this.wrap).css({
				width: this.totalWidth,
			}).find('ul').css({
				position: 'absolute',
				left: 0,
				top: 0,
				float: 'none'
			})
		}
		if (this.clickBtn) { //添加左右按钮
			this.lrBtnAdd();
		}
		if (this.pointBtn) { //添加下方小圆点区域
			this.pointWrapAdd();
		}
	}
	$.fn.extend({
		swiperPlus: function(options) {
			options.wrap = this; //this赋给options的一个新属性
			var obj = new SwiperPlus(options);
			obj.init();
		}
	})
})(jQuery)
