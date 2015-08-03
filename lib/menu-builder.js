var cheerio = require('cheerio');

var getNodeFromHeading = function(heading) {
	return {
        id: heading.attr('id'),
        title: heading.html(),
        children: []
    };
};
		
var builder = {
	buildMenuFromHtml: function(html) {
		var $ = cheerio.load(html),
			menu = [];

		$("h1").each(function(heading) {
			var level1Heading = $(this),
				level1Node = getNodeFromHeading(level1Heading);
		
		     level1Heading.nextUntil("h1")
		         .filter("h2")
		         .each(function() {
					 var level2Heading = $(this),
		             	 level2Node = getNodeFromHeading(level2Heading);
						  
				     level2Heading.nextUntil("h2")
		             	.filter("h3")
		             	.each(function() {
							var level3Heading = $(this),
								level3Node = getNodeFromHeading(level3Heading);
								
							level2Node.children.push(level3Node);
						});
						  
		             level1Node.children.push(level2Node);
		         });
		    
		    menu.push(level1Node);
		});
		
		return menu;
	}
};

module.exports = builder;