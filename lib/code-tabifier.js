var cheerio = require('cheerio');

var languageTitles = {
	'cs': '.NET',
	'csharp': '.NET',
	'java': 'Java',
	'java-vanilla': 'Java',
	'java-android': 'Java',
	'js': 'JavaScript',
	'objc': 'Objective-C',
	'objectivec': 'Objective-C',
	'ruby': 'Ruby',
	'swift': 'Swift',
	'json': 'JSON',
	'bash': 'cURL',
	'': ''
}

function getLanguage(code) {
	if (!code.attr('class'))
		return "";
		
    var classes = code.attr('class').split(' ');
    
    for (var i = 0; i < classes.length; i++) {
        var matches = /^lang\-(.+)/.exec(classes[i]);
        if (matches != null) {
            return matches[1];
        }
    }   
}

function setSelectedLanguage($, selector) {
	var selected = $('ul.dropdown-menu li a', selector)
		.first()
		.html();

	$('a.dropdown-toggle', selector)
		.html(selected + '<span class="caret"></span>');
}

var codeTabifier = {
	tabifyCode: function(html, allowedLanguages) {
		var $ = cheerio.load(html),		
			groups = [],
		    currentGroup = [],
			counter = 0;
				
		$('pre').each(function() {
		    currentGroup.push(this);
		    
		    if($(this).next('pre').length == 0) {
		        groups.push(currentGroup);
		        currentGroup = [];
		    }
		});
		
		groups.forEach(function(group) {
			var codeSamples = $('<div class="code-samples"></div>'),
				selector = $('<ul class="nav"><li class="dropdown"><a href="#" class="dropdown-toggle" data-toggle="dropdown"></a><ul class="dropdown-menu"></ul></li></ul>'),
		        tabContent = $('<div class="tab-content"></div>');
		    
			$(group[0]).before(codeSamples);
		    codeSamples.append(selector);
		    codeSamples.append(tabContent);
			
			var index = 0;
			var addedCount = 0;
			var firstGroupTabPane;
			var firstGroupTab;
		    
		    group.forEach(function(elem) {
				counter++;
				
				var code = $('code', elem),
		        	lang = getLanguage(code),
					baseLang = lang.split('-')[0],
					title = languageTitles[lang] || "Not Found",
					id = 'code-sample' + counter,
		            tab = $('<li><a href="#' + id + '" role="tab" data-toggle="tab" data-lang="' + baseLang + '">' + title + '</a></li>'),
		            tabPane = $('<div class="tab-pane" id="' + id + '"></div>');
				
				code.attr('class', baseLang ? 'lang-' + baseLang : 'nohighlight');
		        
		        tabPane.append(elem);
				
				if (index++ == 0) {
					firstGroupTabPane = tabPane;
					firstGroupTab = tab;
				}
				
				if (!allowedLanguages || allowedLanguages.indexOf(lang) >= 0) {
					addedCount++;
		        	tabContent.append(tabPane);
		        	$('ul.dropdown-menu', selector).append(tab);
				}
		    });
			
			if (addedCount === 0) {
				tabContent.append(firstGroupTabPane);
	        	$('ul.dropdown-menu', selector).append(firstGroupTab);
			}

		    if(addedCount <= 1) {
		    	selector.addClass('hide');
		    } else {
		    	setSelectedLanguage($, selector);
		    }
			
			$('ul.dropdown-menu li', selector).first().addClass('active');
			$('.tab-pane', tabContent).first().addClass('active');
		});
		
		return $.html();
	}
};

module.exports = codeTabifier;