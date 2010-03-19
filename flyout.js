var flyout = {
	init : function(){
		var $menu = $('ul.menu_options');
		var $open = $('a.trigger');

		//create an emtpy object to keep track of the timeouts
		var menuTimeouts = {};

		//hide all of the menus
		$menu.hide();

		$open.each(function(index) {				
			$(this).click(function() {
				//identify the clostest menu
				$nextMenu = $(this).next($menu);
				if ($nextMenu.is(":visible")) {
					$nextMenu.fadeOut('fast').css('z-index', '50');
					if (menuTimeouts[$id]) {
						clearTimeout(menuTimeouts[$nextMenu.attr('id')]);
						menuTimeouts[$nextMenu.attr('id')] = undefined;
					}
				} else {
					$menu.hide(); //close all other open menus
					$nextMenu.show().css('z-index', '500'); //z-index for good measure

					//start a unique setTimeout for this menu
					menuTimeouts[$nextMenu.attr('id')] = setTimeout(function () {
						//fade the menu out after 2 seconds
						$nextMenu.fadeOut('slow');
					}, 2000)
				}

				return false;
			});
		});

		$menu.find('li').mouseenter(function (event) {
			//store the ID of this trigger's closest menu
			var $id = $(this).parents('ul').attr('id');

			//cancel the timeOut when the mouse is over the menu
			if (menuTimeouts[$id]) {
				clearTimeout(menuTimeouts[$id]);
				menuTimeouts[$id] = undefined;
			}
		}).mouseleave(function () {
			var $this = $(this).parents('ul');

			//start another time when the mouse leaves the menu
			menuTimeouts[$this.attr('id')] = setTimeout(function () {
				$this.fadeOut('slow');
			}, 2000);
		});		
	}
}
