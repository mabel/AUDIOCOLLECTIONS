$(function(){
	$.material.init();
	var isNarrow = $(window).width() <= 320
    var $ul = $('#iso-images')
	$.get('/cgi-bin/iso-images.sh', function(dat){
		var arr = dat.split(/[\r\n]+/)
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
        $('body').css('margin-top', '0')
		$('nav .btn-group').removeClass('hidden').css('margin-top', '-10px').appendTo('body')
		$('.btn-group i').css({'font-size': '40px'})
		$('#volume')
			.appendTo('body')
			.css('margin', '35px 25px 25px 15px')
        $ul.appendTo('body')
		$('main').remove()
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
	$('.mdi-av-volume-up').click(function(){
		var that = this
		$.get('/cgi-bin/mute.sh', function(dat){
			if(dat == 1)$(that).removeClass('mdi-av-volume-off').addClass('mdi-av-volume-up')
			if(dat == 0)$(that).removeClass('mdi-av-volume-up').addClass('mdi-av-volume-off')
		})
	})
	$('.mdi-av-skip-next').click(function(){
		$.get('/cgi-bin/stop-single.sh', function(dat){})
	})
	$('.mdi-av-stop').click(function(){
		$.get('/cgi-bin/stop-all.sh', function(dat){})
	})
	$('.mdi-action-search').click(function(){
		var val = $('#search-request').val().trim()
		if(!val) return
		$.get('/cgi-bin/search.sh?' + $('#search-request').val(), function(dat){
			var arr = dat.split(/[\r\n]/)
			if(!arr.length) return
			var $ul = $('#search-result')
			$ul.empty()
			arr.forEach(function(el){
				var sa = el.split('|')
				if(sa.length < 5) return
				var $li = $('<li>')
					.addClass('list-group-item')
					.appendTo($ul)
				$('<i class="mdi-image-audiotrack">').appendTo($li)
				var $a = $('<a>')
					.attr('href', '#')
					.appendTo($li)
					.click(function(){$.get('/cgi-bin/iso-play-single.sh?' + sa[0] + '&' + sa[1] + '&' + sa[2])})
				if(!isNarrow){
					$('<strong>').text(sa[4].replace(/\.iso$/, '')).appendTo($a)
					$('<span>&nbsp;&nbsp;</span>').appendTo($a)
				}
				$('<span>').text(sa[3]).appendTo($a)
			})
			$('#iso-images').addClass('hidden')
			$ul.removeClass('hidden')
		})
	})
	$('.mdi-navigation-refresh').click(function(){
		$('#iso-images').removeClass('hidden')
		$('#search-result').addClass('hidden')
	})
})
