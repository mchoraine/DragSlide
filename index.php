<html>
<head>
	<title>DragSlide</title>
	<link rel="stylesheet" href="./css/smoothness/jquery-ui.css">
	<link rel="stylesheet" href="./css/main.css">
</head>
<body>
	<header>
		<ul id="menu">
			<li><h1>Catherine Goniot</h1></li>
			<li>Serie1</li>
			<li>Serie2</li>
		</ul>
	</header>
	<div id="dragandslide">
		<section id="slider-big">
			<ul class="scroll-content">
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px" width="2500px" class="panorama"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="500px"></li>
			</ul>
		</section>
		<section id="slider-miniature">
			<ul class="scroll-content">
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
				<li><img src="./img/slide-big/img1.jpg" height="150px"></li>
			</ul>
		</section>
	</div>
	
</body>
	<script src="./js/jquery.js"></script>
	<script src="./js/jquery-ui.js"></script>
	<script src="./js/jquery.easing.js"></script>
	<script src="./js/jquery.dragandslide.js"></script>
	<script>
		$(function(){
			var dragandslide = $('#dragandslide').dragAndSlide({ startImg: 4 });
		})
	</script>
</html>