
$(document).ready(function() {
    
    window['optimizely'] = window['optimizely'] || [];
    
   
    
    fillEmptyBubbles = function() {
        $('.bubble-item.empty').each(function() {
            var thisBubble = $(this),
                thisVideoName = $(thisBubble).attr('data-url'), //video name. For example: video.mp4
                thisVideoUrl = 'vid/'+ thisVideoName+''; // vid/video.mp4
            
            var title = $(this).attr('data-title'),
                videoIconPath = $(this).attr('data-icon');
           
            $(thisBubble).removeClass('empty').addClass('unwatched').attr('data-feature-url', thisVideoUrl).append('<div class="bubble-image"><span class="text-new">new</span><div class="bubble-image-foreground" style="background-image: url('+ videoIconPath +');"></div><svg viewBox="0 0 100 100" fill="#fff" stroke="red" xmlns="http://www.w3.org/2000/svg" style="enable-background:new -580 439 577.9 194;" xml:space="preserve"><circle cx="50" cy="50" r="48" /></svg></div>').append('<div class="bubble-headline">'+ title +'</div>'); 
        });
    }
        
    fillEmptyBubbles();
    
    generateStory = function() {
        $(this).addClass('bubble-on').removeClass('unwatched').addClass('watched');
        if($(this).attr('data-type') == 'video'){
            var thisStory = $(this),
            videoUrl = $(this).attr('data-feature-url'),
            videoTag = '<video id="video-id" class="story-video" playsinline muted src="'+ videoUrl +'"></video>';
            
            $('.story-item').append(videoTag);

            $('video.story-video')[0].ontimeupdate = function(){ //progress bar animation
                progressBar = document.querySelector('.progress-bar');
                progress = $('video.story-video')[0].duration;
                progressBar.style.animation = 'progress '+ progress+'s linear';
            };
        
            $('.giftImg').css('visibility', 'hidden');
            $('.is-arrow').css('visibility', 'hidden');

            var promise = $('video.story-video')[0].play();

            if (promise !== undefined) {
                promise.then(_ => {
                    // Autoplay started!
//                    console.warn('Autoplay successful');
                }).catch(error => {
                    // Autoplay was prevented.
//                    console.warn('Autoplay blocked');

                    $('.button-volume').addClass('muted');
                    $('video.story-video')[0].volume = 0.0;
                    $('video.story-video')[0].play();
                });
            }
            $('body').addClass('story-on');
        
            setTimeout(function() {          
                $(thisStory).appendTo('.stories-bubbles');               
            }, 200);

            $('video.story-video')[0].addEventListener('ended', function() {
                closeStory();
            }, true);
        }
        else if($(this).attr('data-type') == 'image'){
            var thisStory = $(this),
            imageUrl = $(this).attr('data-feature-url'),
            imageTag = '<img src="'+ imageUrl+'" alt="">';

            $('.story-item').append(imageTag);

            //play code

            $('.giftImg').css('visibility', 'hidden');
            $('.is-arrow').css('visibility', 'hidden');
            $('body').addClass('story-on');
        
            setTimeout(function() {          
                $(thisStory).appendTo('.stories-bubbles');               
            }, 200);

            progressBar = document.querySelector('.progress-bar');
            progress = 7 //seconds till story ends
            progressBar.style.animation = 'progress '+ progress+'s linear';

            setTimeout(function(){
                closeStory();
            }, 7000); 
        }
    }
        
    
    
    nextStory = function() {

        var playingStoryId = $('.story-video').attr('data-story-id'),
            playingStoryBubble = $('.bubble-item*[data-story-id='+ playingStoryId +']'),
            firstAvailableBubble = $('.bubble-item:eq(0)');

        progressBar = document.querySelector('.progress-bar');
        progressBar.style.animation = 'none';
        
        if ($(playingStoryBubble).hasClass('last')) {
            closeStory();
        } else {
            closeStory();
            $(firstAvailableBubble).click();
        }
      
    }
    
    prevStory = function() {
        var playingStoryId = $('.story-video').attr('data-story-id'),
            playingStoryBubble = $('.bubble-item*[data-story-id='+ playingStoryId +']');
        
        if ($(playingStoryBubble).prev('.bubble-item').length) {
            var prevStoryBubble = $(playingStoryBubble).prev('.bubble-item')[0];
            
            closeStory();
            $(prevStoryBubble).click();
        } else {
            closeStory();
        }
    }
    
    $('body').on('click', '.story-video, .stories-over-tap.right, .stories-tap.right', nextStory);
    $('body').on('click', '.story-video, .stories-over-tap.left, .stories-tap.left', prevStory);
    
    closeStory = function() {
        $('.bubble-on').removeClass('bubble-on');
        $('body').removeClass('story-on');
        $('.giftImg').css('visibility', 'visible');
        $('.is-arrow').css('visibility', 'visible');
        progressBar = document.querySelector('.progress-bar');
        progressBar.style.animation = 'none';
        $('.story-item').empty();
    }
    
    $('body').on('click', '.bubble-item', generateStory);
    $('body').on('click', '.stories-headline', function() {
        $('.bubble-item').eq(0).click();
    });
    $('body').on('click', '.stories-button-close, .stories-button-x', closeStory);
    $(document).keyup(function(e) {
         if (e.keyCode == 27) { // escape key maps to keycode `27`
            closeStory();
        }
    });
    
    $('body').on('click', '.button-volume', function() {
       
        $('.button-volume').toggleClass('muted');
        if ($('.button-volume').hasClass('muted')) {
            $('video.story-video')[0].volume = 0.0;  
            $('video.story-video')[0].muted = true;
        } else {
            $('video.story-video')[0].volume = 1.0;
            $('video.story-video')[0].muted = false;
        }
    });

    var windowHeight = $(window).innerHeight(),
        dynamicCss = '\
            <style type="text/css">\
                @media screen and (max-width: 600px), (max-aspect-ratio: 9/16), (max-height: 600px) {\
                .stories-story {flex-basis: calc('+ windowHeight +'px * 0.5625);}\
                .stories-box-top,\
                .stories-box-bot {width: calc('+ windowHeight +'px * 0.5625);}\
                }\
            </style>';
//    $('body').append(dynamicCss);
    
});

