window.addEventListener(
	'load',
	function load(event) {
		window.removeEventListener('load', load, false);
		auto_cursor.init();
	},
	false
);

var auto_cursor = {
	
	init : function()
	{
		var appcontent = document.getElementById('appcontent');
		appcontent.addEventListener(
			'DOMContentLoaded',
			function() {
				window.setTimeout(auto_cursor.on_page_load, 1000);
			},
			true
		);
	},
	
	on_page_load : function()
	{
		if (auto_cursor.check_for_anchor()
		|| auto_cursor.check_for_focused_input()
		|| auto_cursor.check_for_selected_input()
		|| auto_cursor.check_for_page_scrolled()) {
			return;
		}
		auto_cursor.select_first_visible_text_input();
	},
	
	check_for_anchor : function()
	{
		var location_hash = content.window.location.hash.replace(/^#/, '');
		
		if ('function' == typeof content.document.getElementsByName) {
			var elements_with_location_hash_name = content.document.getElementsByName(location_hash);
			for (var i = 0; i < elements_with_location_hash_name.length; i++) {
				if (elements_with_location_hash_name[i].tagName == 'A') {
					return true;
				}
			}
		} else if (location_hash) {
			return true;
		}
		return false;
	},
	
	check_for_focused_input : function()
	{
		var focused_element = document.commandDispatcher.focusedElement;
		if (focused_element) {
			return true;
		} else {
			return false;
		}
	},
	
	check_for_selected_input : function()
	{
		if (auto_cursor.page_content_selected()) {
			return true;
		} else {
			return false;
		}
	},
	
	page_content_selected : function()
	{
		if (content.window.getSelection().toString() == '') {
			return false;
		} else {
			return true;
		}
	},
	
	check_for_page_scrolled : function()
	{
		if (content.window.pageYOffset > 0) {
			return true;
		} else {
			return false;
		}
	},
	
	select_first_visible_text_input : function()
	{
		var input_elements = content.document.getElementsByTagName('input');
		for (var i = 0; i < input_elements.length; i++) {
			var current_input_type = input_elements[i].type;
			if (current_input_type == 'text') {
				if (auto_cursor.element_is_visible(input_elements[i])) {
					input_elements[i].focus();
					return;
				}
			}
		}
	},
	
	element_is_visible : function(element)
	{
		var element_offset_top = 0;
		
		while (element) {
			element_offset_top += element.offsetTop;
			element = element.offsetParent;
		}
		
		var window_height = content.window.innerHeight;
		
		if (element_offset_top >= window_height) {
			return false;
		} else {
			return true;
		}
	}
	
};
