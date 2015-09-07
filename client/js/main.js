$(function(){
	$.material.init();
	var isNarrow = $(window).width()
	$.get('/cgi-bin/iso-images.sh', function(dat){
		var arr = dat.split(/[\r\n]+/)
		var $ul = $('.list-group')
		arr.forEach(function(el, i){
			if(!el) return
			var $li = $('<li>')
				.addClass('list-group-item')
				.appendTo($ul)
			$('<i class="mdi-file-folder-open">').appendTo($li)
			var $a = $('<a>')
				.attr('href', '#')
				.appendTo($li)
				.click(function(){$.get('/cgi-bin/iso-play-shuffle.sh?' + (i + 1))})
			el = el.substring(el.search(/[^\/]+\/[^\/]+$/)).replace(/\.iso$/, '')
			el = el.replace('_', ' ')
			var txts = el.split('/')
			if(!isNarrow){
				$('<strong>').text(txts[0]).appendTo($a)
				$('<span>&nbsp;/&nbsp;</span>').appendTo($a)
			}
			$('<span>').text(txts[1]).appendTo($a)
		})
	})

	if(isNarrow){
		$('#volume')
			.appendTo('nav')
			.css('margin', '35px 25px 0 0')
		$('nav .row').remove()
		$('nav .btn-group').removeClass('hidden')
	}
	else $('nav .row').removeClass('hidden')

	var volumeSlider = document.getElementById('volume');
	noUiSlider.create(volumeSlider, {
		start: 100,
		range: {
			min: 80,
			max: 100
		},
	});
	volumeSlider.noUiSlider.on('change', function(e){$.get('/cgi-bin/volume.sh?' + e)})
	$('nav .mdi-av-volume-up').click(function(){
		var that = this
		$.get('/cgi-bin/mute.sh', function(dat){
			if(dat == 1)$(that).removeClass('mdi-av-volume-off').addClass('mdi-av-volume-up')
			if(dat == 0)$(that).removeClass('mdi-av-volume-up').addClass('mdi-av-volume-off')
		})
	})
	$('nav .mdi-av-skip-next').click(function(){
		$.get('/cgi-bin/stop-single.sh', function(dat){})
	})
	$('nav .mdi-av-stop').click(function(){
		$.get('/cgi-bin/stop-all.sh', function(dat){})
	})
})
