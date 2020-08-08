(function($){
    //variable that will hold the href attr of the links in the menu
    var sections = [];
    //variable that stores the id of the section
    var id = false;
    //variable for the selection of the anchors in the navbar
    var $navbara = $('#navi a');
    
    
    
    
    //select all the anchors in the navbar one after another
    $navbara.each(function(){
     // and adds them in the sections variable
      sections.push($($(this).attr('href')));
      
    })
    $(window).scroll(function(e){
      // scrollTop retains the value of the scroll top with the reference at the middle of the page
      var scrollTop = $(this).scrollTop() + ($(window).height()/2);
      //cycle through the values in sections array
      for (var i in sections) {
        var section = sections[i];
        //if scrollTop variable is bigger than the top offset of a section in the sections array then 
        if (scrollTop > section.offset().top){
          var scrolled_id = section.attr('id');
        }
      }
      if (scrolled_id !== id) {
        id = scrolled_id;
        $($navbara).removeClass('active');
        $('#navi a[href="#' + id + '"]').addClass('active'); 
      }
    })
  })(jQuery);