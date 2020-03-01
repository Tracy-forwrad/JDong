(function($) {
	function myDropDown(options) {
		this.menuList = options.menuList; //数据
		// console.log(this.menuList)
		this.wrap = options.wrap; //需要加下拉列表的元素
		this.totalWidth = options.totalWidth; //整块宽度
		this.evWidth = options.evWidth; //每列宽度
		this.direction = options.direction || 'y'; //排列方向
		this.init = function() { //初始化
			this.createDom(); //创建结构
			this.initStyle(); //初始化样式
			this.bindEvent(); //绑定事件
		}
	}
	myDropDown.prototype.bindEvent = function() {
		var self = this;
		$('.drop-wrap dl dd', this.wrap).hover(function() {
			self.color = $(this).css('color');
			$('a', this).css({
				color: 'red'
			})
		}, function() {
			$('a', this).css({
				color: self.color
			})
		})
		$(this.wrap).hover(function() {
			$(this).css('background-color', '#fff')
			$('.drop-wrap', self.wrap).show();
		}, function() {
			$(this).css({
				backgroundColor: 'transparent'
			});
			$('.drop-wrap', self.wrap).hide();
		})
	}
	myDropDown.prototype.createDom = function() {
		var self = this;
		var dropWrap = $('<div class= "drop-wrap"></div>'); //建包裹dl的皮
		// console.log(this.menuList)
		self.menuList.forEach(function(menu) {
			var Dl = $('<dl></dl>');
			if (menu.title) {
				$('<dt> ' + menu.title + '</dt>').appendTo(Dl);
			}
			menu.items.forEach(function(item) {
				var DD = $('<dd><a>' + item.name + '</a></dd>').appendTo(Dl);
			})
			if (self.direction == 'x') {
				// console.log(menu.width)
				Dl.css({
					width: menu.width
				})
			}
			Dl.appendTo(dropWrap);
		})
		dropWrap.appendTo(this.wrap)
	}
	myDropDown.prototype.initStyle = function() {
		$(this.wrap).css({
			position: 'relative'
		}).find('.drop-wrap').css({
			// 下拉框的z-index<上面选项的z-index,同时上移2px，实现边框隐藏
			zIndex: '5',
			display: 'none',
			width: this.totalWidth,
			position: 'absolute',
			left: 0,
			border: '1px solid #ccc',
			borderBottom: '1px solid transparent',
			marginTop: '-2px'
		}).find('dl').css({
			borderBottom: '1px solid #eee',
			overflow: 'hidden'
		}).find('dt').css({
			fontWeight: 'bold'
		}).end().find('dd').css({
			float: 'left',
			width: this.evWidth,
			color: '#999',
			whiteSpace: 'no-wrap', //控制文字不换行
		})
		if (this.direction == 'x') {
			$('.drop-wrap', this.wrap).css({
				left: 'auto',
				right: -73,
				padding: '15px 0'
			}).find('dl').css({
				margin: '0 15px',
				float: 'left',
				borderRight: '1px solid #eee',
				borderBottom: 'none'
			})
		}
	}
	$.fn.extend({
		dropDown: function(options) {
			options.wrap = this;
			var obj = new myDropDown(options);
			obj.init();
		}
	})
})(jQuery)
