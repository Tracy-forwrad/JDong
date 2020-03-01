(function($) {

	// 创建轮播对象
	function Swiper(options) {
		// 存储添加轮播图区域的dom元素
		this.wrap = options.wrap;
		// 存储要添加的图片数据
		this.imgList = options.imgList;
		// 存储展示区域的宽度
		this.showImgWidth = options.showImgWidth || $(this.wrap).width();
		// 存储每张图片的宽度
		this.imgWidth = options.imgWidth || $(this.wrap).width();
		// 存储每张图片的高度
		this.imgHeight = options.imgHeight || $(this.wrap).height();
		// 存储轮播页数
		this.imgNum = Math.floor(this.imgList.length * this.imgWidth / this.showImgWidth);
		// 存储当前轮播的页数
		this.nowIndex = 0;
		// 是否自动轮播
		this.isAuto = typeof options.isAuto == 'undefined' ? false : options.isAuto;
		// 轮播动画类型   fade为淡入淡出效果   animate为正常轮播效果
		this.animateType = typeof options.animateType == 'undefined' ? "fade" : options.animateType;
		// 当前动画是否结束  锁
		this.flag = false;
		// 创建dom结构
		this.createDom();
		// 初始化样式
		this.initStyle();
		// 绑定事件
		this.bindEvent();
		// 自动轮播
		if (this.isAuto) {
			this.autoChange();
		}
	}
	Swiper.prototype.createDom = function() {
		// 轮播图最外层ul  包含所有图片
		var oUl = $('<ul class="swiper"></ul>');
		// 添加图片元素
		for (var i = 0; i < this.imgList.length; i++) {
			var oLi = $('<li></li>');
			var oA = $('<a href="#"></a>');
			var oImg = $('<img src="' + this.imgList[i] + '"></img>');
			oA.append(oImg).appendTo(oLi);
			oUl.append(oLi);
		}
		// 如果轮播动画为animate则图片最后一页为第一页轮播的图片  保持最后一页图片和第一页相同
		if (this.animateType == 'animate') {
			// 每页的图片数量
			var num = Math.floor(this.showImgWidth / this.imgWidth);
			for (var i = 0; i < num; i++) {
				var oLi = $('<li></li>');
				var oA = $('<a href="#"></a>');
				var oImg = $('<img src="' + this.imgList[i] + '"></img>');
				oA.append(oImg).appendTo(oLi);
				oUl.append(oLi);
			}
		}
		oUl.appendTo(this.wrap);
		// 添加左右点击按钮
		var leftBtn = $('<div class="left-btn">&lt;</div>');
		var rightBtn = $('<div class="right-btn">&gt;</div>');
		$(this.wrap).append(leftBtn).append(rightBtn);
		// 添加轮播图的页数小圆点
		if (this.showImgWidth == this.imgWidth) {
			var spotDiv = $('<div class="spot"></div>');
			for (var i = 0; i < this.imgNum; i++) {
				$('<span></span>').appendTo(spotDiv);
			}
			spotDiv.appendTo(this.wrap);
		}

	}

	Swiper.prototype.initStyle = function() {
		// 为父元素设置初始化样式超出部分隐藏
		// console.log($(this.wrap))
		$(this.wrap).css({
			overflow: 'hidden',
			position: "relative"
		})
		// console.log($(this.wrap).css('width'))
		// 为轮播图内部标签初始化样式  默认样式清除
		$("*", this.wrap).css({
			listStyle: 'none',
			padding: 0,
			margin: 0,
		});
		// 为ul添加宽度
		// console.log($('.swiper').css('width'))
		$('.swiper', this.wrap).css({
			// overflow: 'hidden',
			position: 'relative',
			width: this.animateType == 'fade' ? this.showImgWidth * this.imgNum : this.showImgWidth * this.imgNum + this.showImgWidth,
		});

		// 图片变成一行
		$('.swiper li', this.wrap).css({
			float: "left",
			// width: this.imgWidth,
			// height: this.imgHeight,
		});
		// 设置图片的大小
		$('.swiper li a, .swiper li a img', this.wrap).css({
			display: 'inline-block',
			height: this.imgHeight,
			width: this.imgWidth,
		});
		// 如果轮播i动画为但如淡出则图片应重合在一起 且初始只展示当前页
		if (this.animateType == 'fade') {
			$('.swiper', this.wrap).css({
				width: this.showImgWidth,
				height: this.imgHeight,
			});
			$('.swiper li', this.wrap).css({
				float: "auto",
				position: "absolute",
				display: 'none',
			}).eq(this.nowIndex).css({
				display: 'block',
			});
		}
		// 设置左右按钮的样式
		$('.left-btn, .right-btn', this.wrap).css({
			position: "absolute",
			width: 50,
			height: 30,
			lineHeight: '30px',
			backgroundColor: "rgba(0, 0, 0, 0.5)",
			color: '#fff',
			top: '50%',
			marginTop: -15,
			textAlign: 'center',
			fontWeight: 'bold',
			cursor: 'pointer',
		});
		$('.right-btn', this.wrap).css({
			right: 0
		});
		// 设置小圆点的位置
		$('.spot', this.wrap).css({
			position: 'absolute',
			bottom: 10,
			left: "50%",
			marginLeft: -(16 * this.imgNum / 2),
		});
		// 设置小圆点的样式
		$('.spot > span', this.wrap).css({
			// display: 'inline-block',
			float: 'left',
			width: 10,
			height: 10,
			margin: 3,
			backgroundColor: "#fff",
			borderRadius: '50%',
			cursor: 'pointer',
		}).eq(this.nowIndex).css({
			backgroundColor: 'red'
		})
	}
	Swiper.prototype.bindEvent = function() {
		var self = this;
		// 点击左右按钮  前后翻页
		$('.left-btn', this.wrap).click(function(e) {
			self.move('prev');
		});
		$('.right-btn', this.wrap).click(function(e) {
			self.move('next');
		});
		$('.spot span', this.wrap).click(function(e) {
			self.move($(this).index());
		});
		// 自动播放判断
		$(this.wrap).mouseenter(function() {
			clearInterval(self.timer);
		}).mouseleave(function() {
			if (self.isAuto) {
				self.autoChange();
			}
		});
	}
	Swiper.prototype.move = function(dir) {
		// 判断上一次动画是否结束 如果没有结束 则不进行下次动画
		if (this.flag) {
			return false;
		}
		// 如果已经结束 可以继续下一次动画  并且将锁锁住
		this.flag = true;
		// 判断运动方向
		switch (dir) {
			// 前一页 
			case 'prev':
				// 如果当前页索引值为0 则前一页应该为最后一页 即imgNum - 1
				if (this.nowIndex == 0) {
					// 如果轮播动画为animate  则要将图片的位置置为最后一页图片的位置  为了使动画效果展现成从第一张向前到最后一张过度的效果 而不经过中间几张图片
					if (this.animateType == 'animate') {
						$('.swiper', this.wrap).css({
							left: -this.showImgWidth * this.imgNum,
						})
					}
					this.nowIndex = this.imgNum - 1;
				} else {
					// 如果索引值不是0 则索引值-1
					this.nowIndex--;
				}
				break;
				// 向后
			case 'next':
				// 如果动画类型为淡入淡出的类型  且当前页为最后一页 则将索引值置为0
				if (this.animateType == 'fade' && this.nowIndex == this.imgNum - 1) {
					this.nowIndex = 0;
					// 如果动画类型为animate 并且当前页为最后一页（展现出来的使第一页的效果）则要让ul的位置瞬间移动到第0号索引值的位置 在进行轮播
				} else if (this.animateType == 'animate' && this.nowIndex == this.imgNum) {
					// 该步骤的目的是是效果显示为最后一张过渡到第一张的效果
					this.nowIndex = 0;
					$('.swiper', this.wrap).css({
						left: 0
					});
					// 如果当前页不是最后一页 则将索引值+1
				}
				this.nowIndex++;
				break;
				// 如果传入的是索引值 则将页码置为当前索引值
			default:
				this.nowIndex = dir;
				break;
		}
		// 改变图片样式
		this.changeImage();
	}
	Swiper.prototype.changeImage = function() {
		var self = this;
		// 如果是淡入淡出效果  则添加淡入淡出动画
		if (this.animateType == 'fade') {
			$('.swiper > li', this.wrap).fadeOut().eq(this.nowIndex).fadeIn(500, function() {
				self.flag = false;
			});
			// 如果是animate效果   则添加animate动画效果
		} else if (this.animateType == 'animate') {
			$('.swiper', this.wrap).animate({
				left: - this.showImgWidth * this.nowIndex,
			}, function() {
				// 动画完成之后 解锁
				self.flag = false;
			});
		}
		// 切换小圆点样式
		$('.spot > span', this.wrap).css({
			backgroundColor: '#fff'
		}).eq(this.nowIndex % this.imgNum).css({
			backgroundColor: "red",
		});
	}
	Swiper.prototype.autoChange = function() {
		var self = this;
		this.timer = setInterval(function() {
			$('.right-btn', self.wrap).trigger('click');
		}, 3000);
	}

	$.fn.extend({
		swiper: function(options) {
			options.wrap = this;
			var obj = new Swiper(options);
			
		}
	});
}(jQuery));
