//添加logo鼠标移入变为gif事件
//鼠标动画事件
// 防抖,在还没有加载完的时候不响应onmouseenter事件
$('.logo').mouseenter(function() {
	if ($(this).find('.active').index() == '0') {
		console.log($(this).find('.active').index() == '0')
		$(this).find('.active').removeClass('active');
		$(this).find('.logo_wrap').eq(1).addClass('active');
		var imgGif =
			"<img src='https://img1.360buyimg.com/da/jfs/t1/16134/5/11584/77878/5c90a4bdE5ae12937/38714fb6679b8daf.gif?+${Math.random}'/>";
		$(this).find('.active>img').detach();
		$(this).find('.active').append(imgGif);
	}
});


$('.logo').mouseleave(function() {
	var self = this;
	var timer = setTimeout(function() {
		$(self).find('.active').removeClass('active');
		$(self).find('.logo_wrap').eq(0).addClass('active');
	}, 5000);
});

// 添加下拉框
$('#myJD').dropDown({
	totalWidth: 280, //总宽度
	evWidth: 126, //每一列宽度
	direction: 'y', //导航的排列方向
	menuList: [{
		title: "",
		items: [{
			href: '#',
			name: '待处理订单',
		}, {
			href: '#',
			name: '消息',
		}, {
			href: '#',
			name: '返修退换货',
		}, {
			href: '#',
			name: '我的问答',
		}, {
			href: '#',
			name: '降价商品',
		}, {
			href: '#',
			name: '我的关注',
		}],
	}, {
		title: '',
		items: [{
			href: '#',
			name: '我的京豆',
		}, {
			href: '#',
			name: '我的优惠券',
		}, {
			href: '#',
			name: '我的白条',
		}],
	}]
})
$('#web-nav').dropDown({
	totalWidth: 1190,
	evWidth: 85,
	// title: '网站导航',
	direction: 'x',
	menuList: [{
		title: '特色主题',
		width: 340,
		items: [{
			name: '京东试用'
		}, {
			name: '京东金融'
		}, {
			name: '全球售'
		}, {
			name: '国际站'
		}, {
			name: '京东会员'
		}, {
			name: '京东预售'
		}, {
			name: '买什么'
		}, {
			name: '俄语站'
		}, {
			name: '装机大师'
		}, {
			name: '0元评测'
		}, {
			name: '港澳售'
		}, {
			name: '优惠券'
		}, {
			name: '秒杀闪购'
		}, {
			name: '印尼站'
		}, {
			name: '京东金融科技'
		}, {
			name: '陪伴计划'
		}, {
			name: '出海招商'
		}, {
			name: '拍拍'
		}]
	}, {
		title: '特色主题',
		width: 270,
		items: [{
			name: '京东试用'
		}, {
			name: '京东金融'
		}, {
			name: '全球售'
		}, {
			name: '国际站'
		}, {
			name: '京东会员'
		}, {
			name: '京东预售'
		}, {
			name: '买什么'
		}, {
			name: '俄语站'
		}, {
			name: '装机大师'
		}, {
			name: '0元评测'
		}, {
			name: '港澳售'
		}, {
			name: '优惠券'
		}, {
			name: '秒杀闪购'
		}, {
			name: '印尼站'
		}]
	}]
})
// 插入中间部分,大的单张轮播图
$('.fs_two').swiper({
	imgList: [
		'https://img1.360buyimg.com/da/s590x470_jfs/t1/36626/1/11773/101331/5cf9fd07E20a31b94/57ae8abe34bebdd3.jpg!q90!cc_590x470.webp',
		'https://img1.360buyimg.com/pop/s590x470_jfs/t1/59093/24/1607/97943/5cf64040E35019e3c/146d717401d191b4.jpg!q90!cc_590x470.webp',
		'https://img1.360buyimg.com/pop/s590x470_jfs/t1/54850/17/1372/95559/5cf22dbfE93749187/3e9ff5abd392ad9f.jpg!q90!cc_590x470.webp',
		'https://img20.360buyimg.com/babel/s590x470_jfs/t1/75044/39/1736/95484/5d00d14fE01e49b30/f9fb876af71a91bd.jpg!q90!cc_590x470.webp'
	],
	isAuto: 'true'
})

//不能直接操作::after，所有需要通过控制类名实现
//1.具有s类名的第一排元素，鼠标移上去的时候位置上升，
$('.s').hover(function() {
	$('.s').addClass('service_convient_wrap');
	//2.同时其下面出现红色的下划线
	$('.service_convient_wrap').find('.service_name').addClass('service_convient');
	//3.下面的service_pop上升
	$('.service_pop').css({
		top: '50px',
		display: 'block'
	})
})
//点击关闭按钮进行关闭
$('.jipiao_close').on('click', function() {
	$('.s').removeClass('service_convient_wrap');
	$('.service_convient').removeClass('service_convient');
	$('.service_pop').css({
		top: '250',
		display: 'none'
	})
})

//秒杀部分插入多张轮播图

$('.seckill_list').swiperPlus({
	imgsArr: [
		['img/multiTurnPage/a-1.png', 'img/multiTurnPage/a-1.png', 'img/multiTurnPage/a-3.png',
			'img/multiTurnPage/a-2.png'
		],
		['img/multiTurnPage/b-1.png', 'img/multiTurnPage/b-2.png', 'img/multiTurnPage/b-3.png',
			'img/multiTurnPage/c-2.png'
		],
		['img/multiTurnPage/c-1.png', 'img/multiTurnPage/c-2.png', 'img/multiTurnPage/c-3.png',
			'img/multiTurnPage/b-3.png'
		],
	],
	clickBtn: 'true', //控制左右点击的按钮
	pointBtn: 'true', //下方的小圆点
	isAuto: 'true', // 是否自动播放
	animateType: 'animate', //动画类型
	evWidth: 200, //每张图片的宽和高
	evHeight: 260,
});
// 两张图片轮播
$('.seckill_brand').swiperPlus({
	imgsArr: [
		['img/multiTurnPage/a-1.png'],
		['img/multiTurnPage/b-1.png']
	],
	clickBtn: 'false', //控制左右点击的按钮
	pointBtn: 'false', //下方的小圆点
	isAuto: 'true', // 是否自动播放
	animateType: 'animate', //动画类型
	evWidth: 200, //每张图片的宽和高
	evHeight: 260,
});

// 推荐好物区实现懒加载
$(function() {
	$("img.lazy").lazyload({
		event: "sporty"
	});
});

$(window).bind("load", function() {
	var timeout = setTimeout(function() {
		$("img.lazy").trigger("sporty")
	}, 3000);
});

//添加鼠标滚动,顶部元素固定事件
$(document).ready(function(){
	$(window).scroll(function(){
		var disY = $(document).scrollTop();
		if(disY >= 1000){
			$('.head').addClass('head_active')
			.find('.search').addClass('search_active')
				.find('.search_logo_lk').addClass('lk_active');
		}else{
			$('.head').removeClass('head_active')
			.find('.search').removeClass('search_active')
				.find('.search_logo_lk').removeClass('lk_active');
		}
	})
})
var timer = setInterval(function() {
	console.log($(document).scrollTop())
}, 1000)
