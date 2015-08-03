(function($) {
	$('.code-samples li a').click(function(e, ignore) {
		if(ignore) return;
		
		var lang = $(this).data('lang');
		$('.code-samples li a[data-lang=' + lang + ']')
			.not(this)
			.trigger('click', true);
	});

	$(".code-samples .dropdown-menu li a").click(function(){

      	var $this = $(this),
      		newHeading = $this.text();
    		
		$this.parents('li.dropdown')
			.find('.dropdown-toggle')
			.html(newHeading + ' <span class="caret"></span>');
			
		$this.parents('ul.dropdown-menu')
			.find('li')
			.not(this)
			.removeClass('active');

	});
   
	var shouldReplace = false;
	$('.lang-html').each(function (i, e) {
		shouldReplace = shouldReplace || $(e).html().indexOf('{x.x.x}') >= 0;
	});
	if (shouldReplace) {
		$.ajax({
			url: 'https://api.github.com/repos/getconnect/connect-js/tags',
			method: 'GET',
			dataType: 'json'
		}).then(function (response) {
			var jsVersion = response[0].name.substr(1);
			$('.lang-html').each(function (i, e) {
				if ($(e).html().indexOf('{x.x.x}') > 0)
					$(e).html($(e).html().replace('{x.x.x}', jsVersion));
			});
		});
	}
	
})(jQuery);

var svgs = document.querySelectorAll('img.inject-me');
SVGInjector(svgs);

var sp = new StatusPage({ pageId: '3ynj22l3r4d8'});
sp.getStatus({
	success: function(data) {
	$('.color-description').text(data.status.description);
	$('.color-dot').addClass(data.status.indicator);
	}
});

$(function() {
	$('pre code').each(function(i, block) {
	hljs.highlightBlock(block);
	});  
});
