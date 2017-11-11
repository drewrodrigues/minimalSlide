$docBodies = $('.versions .body');
$docTitle = $('.versions .title');
$docTitle.prepend('<span class="indicator">+</span>');
$docBodies.hide();

$('.versions .title').on('click', function() {
	$this = $(this);
	$indicator = $this.children('.indicator');
	$this.next().slideToggle();

	if ($indicator.text() === '+') {
		$indicator.text('-');
	} else {
		$indicator.text('+');
	}
});

hljs.initHighlightingOnLoad();
