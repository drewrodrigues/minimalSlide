var minimalSlide = {
  // setup -------------------------------------------
  // setupControls(count): adds list items to ul.mSControls based on slidesCount
  // setupSlides(): assigns slides & slidesCount, and adds active class to first slide

  // methods -----------------------------------------
  // activeSlide(): returns the current slide with .active
  // activeSlideIndex(): returns the index of the slide with .active
  // startSlideshow(): starts slideshow from current active slide
  // stopSlideshow(): stops slideshow at current active slide
  // nextSlide(): transitions to the next slide
  // prevSlide(): transitions back a slide

  // properties --------------------------------------
  // slides: contains slides with .mS
  // controls: contains list items that are children of .mSControls
  // slidesCount: returns the amount of slides
  // animation: holds the setInterval call
  // controlBackgroundColor:
  // controlActiveColor:
  // currentControlColor: returns the color within the controlColor attribute

  setupControls: function() {
    // add controls based on the amount of slides
    var $container = $('.slide-container');
    var $ul = $("<ul class='mSControls'><p class='mSToggle'>Pause</p></ul>"); 
    for (var i = 0; i < this.slidesCount; i++) {
      $ul.append('<li></li>');
    }
    $container.append($ul);
    this.controls = $ul.children('li');
    this.controls
      .first()
      .addClass('control-active')
      .css('backgroundColor', this.currentControlColor());
    this.toggle = $('.mSToggle');
    this.changeSlideOnControlClick();
    this.toggleSlideshowOnButtonClick();
  },

  currentControlColor: function() {
    return this.activeSlide()
      .attr('controlColor');
  },

  changeSlideOnControlClick: function() {
    self = this;
    this.controls.on('click', function() {
      self.stopSlideshow();
      self.goToSlide($(this).index() - 1);
    });
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

  setupSlides: function() {
    this.slides = $('.mS');
    this.slides
      .hide()
      .first()
      .addClass('active')
      .fadeIn();
    this.slidesCount = this.slides.length;
  },

  activeSlide: function() {
    return this.slides
      .filter('.active');
  },

  activeSlideIndex: function() {
    return this.activeSlide().index();
  },

  onFirstSlide: function() {
    return this.activeSlideIndex() === 0;
  },

  onLastSlide: function() {
    return this.activeSlideIndex() === this.slides.length - 1;
  },

  updateActiveControl: function(index) {
    this.controls
      .removeClass('control-active')
      .css('backgroundColor', 'white')
      .eq(index)
      .addClass('control-active')
      .css('backgroundColor', this.currentControlColor());
  },

  nextSlide: function() {
    if (this.onLastSlide()) {
      this.goToSlide(0);
    } else {
      this.goToSlide(this.activeSlideIndex() + 1);
    }
  },

  prevSlide: function() {
    if (this.onFirstSlide()) {
      this.goToSlide(this.slides.length - 1);
    } else {
      this.goToSlide(this.activeSlideIndex - 1);
    }
  },

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

  goToSlide: function(index) {
    self = this;
    self.slides.finish();
    this.changeActiveSlideTo(index);
    this.activeSlide().fadeIn(1000, function() {
      self.slides.not('.active').hide();
    });
    this.updateActiveControl(index);
  },

  changeActiveSlideTo: function(index) {
    this.slides
      .removeClass('active')
      .eq(index)
      .addClass('active');
  },

  setup: function() {
    this.setupSlides();
    this.setupControls();
    this.startSlideshow();
  }
}

minimalSlide.setup();
