var minimalSlide = {
	// setup -------------------------------------------
	// setupSlides(): assigns slides & slidesCount, and adds active class to first slide
	// setupControls(): adds list items to .mSContainer based on slidesCount
	// toggleSlideshowOnButtonClick(): sets up event listener for play/pause button
	// changeSlideOnControlClick(): sets up event listener for controls

	// methods -----------------------------------------
	// startSlideshow(): starts slideshow from current active slide
	// stopSlideshow(): stops slideshow at current active slide
	// nextSlide(): transitions to the next slide
	// prevSlide(): transitions back a slide
	// goToSlide(index): transitions to the slide at index

	// properties --------------------------------------
	// activeSlide: active slide, which is visible
	// activeSlide: index of the active slide
	// slides: slides which are found by .mSSlide  
	// controls: slideshow circle controls 
	// slidesCount: amount of slides
	// animation: holds the setInterval call
	// currentControlColor: color within the active slide's controlColor attribute

	// settings --------------------------------------
	// controlDefaultActiveColor: sets the default active control color
	// controlBackgroundColor: sets the background color of the controls
	// autoPlay: if set to false, the slideshow will be paused upon page load
	// delayTime: sets the delay time between slide transitions in ms, ex: 5000 = 5 seconds
	// transitionTime: sets the transition time in ms, ex: 1000 = 1 second
	// controlGradient: when set to false, control background gradient will be removed

	// setup -------------------------------------------
	setupSlides: function() {
		this.slides = $('.mSSlide');
		this.slides
			.hide()
			.first()
			.addClass('active')
			.fadeIn();
		this.slidesCount = this.slides.length;
		this.activeSlide = this.slides.filter('.active');
		this.activeSlideIndex = this.activeSlide.index();
	},

	setupControls: function() {
		// add controls based on the amount of slides
		var $container = $('.mSContainer');
		var $ul = $("<ul class='mSControls'><p class='mSToggle'>Pause</p></ul>"); 
		for (var i = 0; i < this.slidesCount; i++) {
			$ul.append('<li></li>');
		}
		$container.append($ul);
		this.controls = $ul.children('li');
		this.currentControlColor = this.activeSlide.attr('controlColor');
		this.controls
			.first()
			.addClass('control-active')
			.css('backgroundColor', this.currentControlColor);
		this.toggle = $('.mSToggle');
		this.changeSlideOnControlClick();
		this.toggleSlideshowOnButtonClick();
	},

	toggleSlideshowOnButtonClick: function() {
		self = this;
		this.toggle.on('click', function() {
			var text = $(this).text();
			if (text === 'Pause') {
				self.stopSlideshow();
			} else {
				self.startSlideshow();
			}
		});
	},

	changeSlideOnControlClick: function() {
		self = this;
		this.controls.on('click', function() {
			self.stopSlideshow();
			self.goToSlide($(this).index() - 1);
		});
	},
	
	setup: function() {
		this.setupSlides();
		this.setupControls();
		this.startSlideshow();
	},

	// property updating methods -----------------------------------------
	updateActiveControl: function() {
		this.currentControlColor = this.activeSlide.attr('controlColor');
		this.controls
			.removeClass('control-active')
			.css('backgroundColor', 'white')
			.eq(this.activeSlideIndex)
			.addClass('control-active')
			.css('backgroundColor', this.currentControlColor);
	},

	changeActiveSlideTo: function(index) {
		this.activeSlide.removeClass('active');
		this.activeSlide = this.slides.eq(index).addClass('active');
		this.activeSlideIndex = index;
	},

	// slide actions -----------------------------------------
	nextSlide: function() {
		if (this.onLastSlide()) {
			this.goToSlide(0);
		} else {
			this.goToSlide(this.activeSlideIndex + 1);
		}
	},

	prevSlide: function() {
		if (this.onFirstSlide()) {
			this.goToSlide(this.slides.length - 1);
		} else {
			this.goToSlide(this.activeSlideIndex - 1);
		}
	},
	
	goToSlide: function(index) {
		self = this;
		self.slides.finish();
		this.changeActiveSlideTo(index);
		this.updateActiveControl();
		this.activeSlide.fadeIn(1000, function() {
			self.slides.not('.active').hide();
		});
	},

	// slideshow actions -----------------------------------------
	startSlideshow: function() {
		var self = this;
		this.toggle.text('Pause');
		this.animate = setInterval(function() {
			self.nextSlide();
		}, 5000);
	},

	stopSlideshow: function() {
		this.toggle.text('Start');
		clearInterval(this.animate);
	},

	// abstractions -----------------------------------------
	onFirstSlide: function() {
		return this.activeSlideIndex === 0;
	},

	onLastSlide: function() {
		return this.activeSlideIndex === this.slides.length - 1;
	}
};

minimalSlide.setup();
