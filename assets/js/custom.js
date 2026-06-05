(function ($) {
	
	"use strict";

	$(window).scroll(function() {
	  var scroll = $(window).scrollTop();
	  var box = $('.header-text').height();
	  var header = $('header').height();

	  if (scroll >= box - header) {
	    $("header").addClass("background-header");
	  } else {
	    $("header").removeClass("background-header");
	  }
	});
	
	$('.filters ul li').click(function(){
        $('.filters ul li').removeClass('active');
        $(this).addClass('active');
          
          var data = $(this).attr('data-filter');
          $grid.isotope({
            filter: data
          })
        });

        var $grid = $(".grid").isotope({
          itemSelector: ".all",
          percentPosition: true,
          masonry: {
            columnWidth: ".all"
          }
        });


	const Accordion = {
	  settings: {
	    // Expand the first item by default
	    first_expanded: false,
	    // Allow items to be toggled independently
	    toggle: false
	  },

	  openAccordion: function(toggle, content) {
	    if (content.children.length) {
	      toggle.classList.add("is-open");
	      let final_height = Math.floor(content.children[0].offsetHeight);
	      content.style.height = final_height + "px";
	    }
	  },

	  closeAccordion: function(toggle, content) {
	    toggle.classList.remove("is-open");
	    content.style.height = 0;
	  },

	  init: function(el) {
	    const _this = this;

	    // Override default settings with classes
	    let is_first_expanded = _this.settings.first_expanded;
	    if (el.classList.contains("is-first-expanded")) is_first_expanded = true;
	    let is_toggle = _this.settings.toggle;
	    if (el.classList.contains("is-toggle")) is_toggle = true;

	    // Loop through the accordion's sections and set up hover/touch behavior
	    const sections = el.getElementsByClassName("accordion");
	    const all_toggles = el.getElementsByClassName("accordion-head");
	    const all_contents = el.getElementsByClassName("accordion-body");
	    for (let i = 0; i < sections.length; i++) {
	      const section = sections[i];
	      const toggle = all_toggles[i];
	      const content = all_contents[i];
	      const icon = toggle.querySelector(".icon");

	      let closeTimeout = null;

	      const openFn = function() {
	        if (closeTimeout) {
	          clearTimeout(closeTimeout);
	          closeTimeout = null;
	        }
	        // Close others if we want accordion behavior
	        for (let a = 0; a < all_contents.length; a++) {
	          if (all_toggles[a] !== toggle) {
	            _this.closeAccordion(all_toggles[a], all_contents[a]);
	          }
	        }
	        _this.openAccordion(toggle, content);
	      };

	      const closeFn = function() {
	        if (closeTimeout) clearTimeout(closeTimeout);
	        closeTimeout = setTimeout(function() {
	          _this.closeAccordion(toggle, content);
	        }, 150);
	      };

	      if (icon) {
	        icon.addEventListener("mouseenter", openFn);
	        icon.addEventListener("mouseleave", closeFn);
	        icon.addEventListener("click", function(e) {
	          e.preventDefault();
	          e.stopPropagation();
	          if (toggle.classList.contains("is-open")) {
	            _this.closeAccordion(toggle, content);
	          } else {
	            openFn();
	          }
	        });
	      }

	      content.addEventListener("mouseenter", function() {
	        if (closeTimeout) {
	          clearTimeout(closeTimeout);
	          closeTimeout = null;
	        }
	      });
	      content.addEventListener("mouseleave", closeFn);
	    }
	  }
	};

	(function() {
	  // Initiate all instances on the page
	  const accordions = document.getElementsByClassName("accordions");
	  for (let i = 0; i < accordions.length; i++) {
	    Accordion.init(accordions[i]);
	  }
	})();


	$('.owl-service-item').owlCarousel({
		items:3,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:3
			  }
		  }
	  })

	$('.owl-courses-item').owlCarousel({
		items:4,
		loop:true,
		dots: true,
		nav: true,
		autoplay: true,
		margin:30,
		  responsive:{
			  0:{
				  items:1
			  },
			  600:{
				  items:2
			  },
			  1000:{
				  items:4
			  }
		  }
	  })
	

	// Menu Dropdown Toggle
	if($('.menu-trigger').length){
		$(".menu-trigger").on('click', function() {	
			$(this).toggleClass('active');
			$('.header-area .nav').slideToggle(200);
		});
	}


	// Menu elevator animation
	$('.scroll-to-section a[href*=\\#]:not([href=\\#])').on('click', function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
				var width = $(window).width();
				if(width < 991) {
					$('.menu-trigger').removeClass('active');
					$('.header-area .nav').slideUp(200);	
				}				
				$('html,body').animate({
					scrollTop: (target.offset().top) - 80
				}, 700);
				return false;
			}
		}
	});

	$(document).ready(function () {
	    $(document).on("scroll", onScroll);
	    
	    //smoothscroll
	    $('.scroll-to-section a[href^="#"]').on('click', function (e) {
	        e.preventDefault();
	        $(document).off("scroll");
	        
	        $('.scroll-to-section a').each(function () {
	            $(this).removeClass('active');
	        })
	        $(this).addClass('active');
	      
	        var target = this.hash,
	        menu = target;
	       	var target = $(this.hash);
	        $('html, body').stop().animate({
	            scrollTop: (target.offset().top) - 79
	        }, 500, 'swing', function () {
	            window.location.hash = target;
	            $(document).on("scroll", onScroll);
	        });
	    });
	});

	function onScroll(event){
	    var scrollPos = $(document).scrollTop();
	    $('.nav a').each(function () {
	        var currLink = $(this);
	        var href = currLink.attr("href");
	        if (href && href.startsWith("#")) {
	            var refElement = $(href);
	            if (refElement.length) {
	                if (refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
	                    $('.nav ul li a').removeClass("active");
	                    currLink.addClass("active");
	                }
	                else{
	                    currLink.removeClass("active");
	                }
	            }
	        }
	    });
	}


	// Page loading animation
	$(window).on('load', function() {
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}

		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
				if (typeof $grid !== 'undefined') {
					$grid.isotope('layout');
				}
			}, 300);
		});
	});

	

	const dropdownOpener = $('.main-nav ul.nav .has-sub');

    // Open/Close Submenus
    if (dropdownOpener.length) {
        dropdownOpener.each(function () {
            var _this = $(this);

            _this.on('tap click', function (e) {
                // If clicked a link inside the sub-menu, let it route normally
                if ($(e.target).closest('.sub-menu').length) {
                    return;
                }

                var thisItemParent = _this,
                    thisItemParentSiblingsWithDrop = thisItemParent.siblings('.has-sub');

                var submenu = thisItemParent.find('> ul.sub-menu');

                if (submenu.is(':visible') && thisItemParent.hasClass('is-open-sub')) {
                    submenu.slideUp(450, 'easeInOutQuad');
                    thisItemParent.removeClass('is-open-sub');
                } else {
                    thisItemParent.addClass('is-open-sub');

                    if (thisItemParentSiblingsWithDrop.length === 0) {
                        thisItemParent.find('.sub-menu').slideUp(400, 'easeInOutQuad', function () {
                            submenu.slideDown(250, 'easeInOutQuad');
                        });
                    } else {
                        thisItemParent.siblings().removeClass('is-open-sub').find('.sub-menu').slideUp(250, 'easeInOutQuad', function () {
                            submenu.slideDown(250, 'easeInOutQuad');
                        });
                    }
                }

                e.preventDefault();
            });
        });
    }


	function visible(partial) {
        var $t = partial,
            $w = jQuery(window),
            viewTop = $w.scrollTop(),
            viewBottom = viewTop + $w.height(),
            _top = $t.offset().top,
            _bottom = _top + $t.height(),
            compareTop = partial === true ? _bottom : _top,
            compareBottom = partial === true ? _top : _bottom;

        return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

    }

    $(window).scroll(function() {

        if (visible($('.count-digit'))) {
            if ($('.count-digit').hasClass('counter-loaded')) return;
            $('.count-digit').addClass('counter-loaded');

            $('.count-digit').each(function() {
                var $this = $(this);
                jQuery({
                    Counter: 0
                }).animate({
                    Counter: $this.text()
                }, {
                    duration: 3000,
                    easing: 'swing',
                    step: function() {
                        $this.text(Math.ceil(this.Counter));
                    }
                });
            });
        }
    })

    // Dynamic title parameter passing for meeting-details page
    $(document).ready(function() {
        var sessionDetailsMap = {
            "SIH Project Strategy": {
                description: "The SIH Project Strategy session focuses on mapping out scalable tech solutions for agricultural challenges, specifically tailored for the Smart India Hackathon. Dev Sprints cohorts at GIET University will guide you through system architecture design, data flow diagrams, and select tech stacks.<br><br>Participants are welcome to explore this strategy layout, draft project workflows, and integrate prototype mockups. Ideal for teams aiming to build robust software/hardware solutions for local farming and rural development challenges.",
                date: "Aug 15",
                price: "Free"
            },
            "Computer Vision Bootcamp": {
                description: "The Computer Vision Bootcamp is an intensive hands-on lab centered around real-time project building using YOLO (You Only Look Once) models. Students will learn image labeling, model training, and edge device deployment for automated agricultural monitoring and pest detection.<br><br>Get ready to test custom dataset training and compile video feeds. Bring your laptops configured with Python and OpenCV. For environment setup and dataset access, reach out to GIET Dev Sprints mentors.",
                date: "Aug 24",
                price: "Free"
            },
            "Cloud & Authentication": {
                description: "The Cloud & Authentication workshop walks you through configuring Firebase services for developer platforms. We cover real-time databases, Firestore collections, secure user registration, and OAuth integrations.<br><br>Learn to design solid security rules and handle backend session validation. Perfect for developers looking to add persistent databases and user management to their web or mobile application prototypes.",
                date: "Sep 05",
                price: "Free"
            },
            "HealthTech UI/UX Design": {
                description: "The HealthTech UI/UX Design session covers creating modern, high-contrast dark-themed layouts for healthcare apps. Using platforms like NutriPlan as reference points, we discuss user empathy, accessibility guidelines, and interactive design tokens.<br><br>Collaborate on wireframes and prototype interactive transitions in Figma. Ideal for UI/UX designers and front-end developers aiming to deliver premium, user-friendly digital health dashboards.",
                date: "Sep 12",
                price: "Free"
            },
            "Advanced Computer Vision Lab": {
                description: "The Advanced Computer Vision Lab takes CV concepts to the next level. We focus on multi-class object detection, semantic image segmentation, and optimized inference pipeline deployment on resource-constrained embedded systems.<br><br>Explore how convolutional neural networks can be fine-tuned for high-accuracy crop classification and weed detection. A strong background in Python and basic machine learning is recommended.",
                date: "Nov 22",
                price: "Rs.134.00"
            },
            "Cloud Architecture & Scaling": {
                description: "The Cloud Architecture & Scaling masterclass focuses on high-availability system designs. Learn containerization with Docker, orchestration with Kubernetes, and horizontal scaling strategies on AWS and Google Cloud Platform.<br><br>Understand how to configure microservices architectures and optimize cloud billing cycles. Recommended for senior developer cohorts aiming to deploy production-grade software platforms.",
                date: "Nov 24",
                price: "Rs.145.00"
            },
            "SIH Hackathon Mentorship": {
                description: "The Smart India Hackathon (SIH) Mentorship session offers GIET University cohorts a direct channel to receive feedback from hackathon winners and tech leaders. We review project repositories, pitch presentations, and demo videos.<br><br>Learn how to present your software prototypes, highlight key engineering achievements, and address edge cases. Bring your complete draft projects for evaluation and live debugging.",
                date: "Nov 27",
                price: "Rs.152.00"
            },
            "YOLO Object Detection Lab": {
                description: "The YOLO Object Detection Lab is a technical deep dive into custom anchor boxes, loss function tuning, and model quantization. Learn how to optimize YOLO models to run efficiently on mobile devices and edge GPUs.<br><br>Build real-time detection applications using live webcams or video feeds. A pre-configured Python environment with PyTorch or TensorFlow is required for the lab exercises.",
                date: "Nov 28",
                price: "Rs.164.00"
            },
            "Secure API Integration": {
                description: "The Secure API Integration workshop teaches developers how to build robust, secure communication layers. We cover JSON Web Token (JWT) authorization, API gateways, rate limiting, and defensive programming practices.<br><br>Learn how to prevent common security flaws, write automated API integration tests, and configure secure HTTPS headers. Ideal for backend and full-stack developer cohorts.",
                date: "Nov 30",
                price: "Rs.174.00"
            }
        };

        // Update meeting-details.html links with query parameters on index and meetings page
        $('.meeting-item').each(function() {
            var title = $(this).find('h4').text().trim();
            if (title) {
                $(this).find('a[href^="meeting-details.html"]').each(function() {
                    $(this).attr('href', 'meeting-details.html?title=' + encodeURIComponent(title));
                });
            }
        });

        // Parse title parameter and update page headings dynamically on meeting-details.html
        if (window.location.pathname.indexOf('meeting-details.html') > -1 || $('body').hasClass('meeting-details')) {
            var urlParams = new URLSearchParams(window.location.search);
            var meetingTitle = urlParams.get('title');
            if (meetingTitle) {
                // Update the banner heading
                var bannerHeading = $('.heading-page h2');
                if (bannerHeading.length) {
                    bannerHeading.text(meetingTitle);
                } else {
                    $('h2').first().text(meetingTitle);
                }

                // Update the card heading
                var cardHeading = $('.meeting-single-item h4');
                if (cardHeading.length) {
                    cardHeading.text(meetingTitle);
                } else {
                    $('h4').first().text(meetingTitle);
                }

                // Also update the browser document/tab title
                document.title = meetingTitle + " - Dev Sprints Community";

                // Update description, date, price if mapped
                var details = sessionDetailsMap[meetingTitle];
                if (details) {
                    // Update description
                    var descElem = $('.meeting-single-item p.description');
                    if (descElem.length) {
                        descElem.html(details.description);
                    }

                    // Update price
                    var priceElem = $('.meeting-single-item .price span');
                    if (priceElem.length) {
                        priceElem.text(details.price);
                    }

                    // Update date
                    var dateElem = $('.meeting-single-item .date h6');
                    if (dateElem.length && details.date) {
                        var dateParts = details.date.split(' ');
                        if (dateParts.length === 2) {
                            dateElem.html(dateParts[0] + ' <span>' + dateParts[1] + '</span>');
                        }
                    }
                }
            }
        }
    });

})(window.jQuery);