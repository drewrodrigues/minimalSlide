$docBodies = $('.documentation .body');
$docTitle = $('.documentation .title');
$docTitle.prepend('<span class="indicator">+</span>');
$docBodies.hide();

$('.documentation .title').on('click', function() {
	$this = $(this);
	$indicator = $this.children('.indicator');
	$this.next().slideToggle();

	if ($indicator.text() === '+') {
		$indicator.text('-');
	} else {
		$indicator.text('+');
	}
});
