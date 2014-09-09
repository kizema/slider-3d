// ====================== Created 04/09/2014 ====================== // 
// ====================== Free use  ====================== //
// ====================== Author: Maxim Sysoev  ====================== //

$(document).ready(
function ()
{
    var count = 0;  var obj = { };
    
    var f = function() {
        this.rotateXY = function(val, disp, index)
        {
            var img = document.getElementById('img'+val).getAttribute('dir');
            var class_css = {
                    position: 'absolute',
                    display: disp,
                    backfaceVisibility: 'hidden',
                    width: mslider.width,
                    height: mslider.height,
                    webkitTransition: mslider.timeAnimation + 'ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                    mozTransition: mslider.timeAnimation + 'ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                    oTransition: mslider.timeAnimation + 'ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                    transition: 'transform ' + mslider.timeAnimation + 'ms  cubic-bezier(0.645, 0.045, 0.355, 1)',
                    backgroundImage: 'url('+img+')',
                    zIndex: index
                }
                $("#img" + val).css(class_css);
        }
        
        this.rotateXYH = function(id, val, disp, angle, margTop, index) 
        {
            area = document.getElementById('area');
            var div = document.createElement('div');
            div.className = 'clone';
            div.id = id;
            
            with (div.style)
            position = 'absolute',

            display = disp,
            width = mslider.width + 'px',
            height = (mslider.height / 100) * 25 + 'px',
            backgroundImage =  'url('+val+')',
            backgroundRepeat = 'no-repeat',
            webkitTransform = mslider.action.substring(5) + '('+angle+'deg)',
            transform = mslider.action.substring(5) + '('+angle+'deg)',           
            webkitTransition = mslider.timeAnimation + 'ms  cubic-bezier(0.075, 0.82, 0.165, 1)',
            transition = 'transform ' + mslider.timeAnimation + 'ms  cubic-bezier(0.075, 0.82, 0.165, 1)',
            backgroundPosition = '0 -'+margTop+'px',
            margin = margTop + 'px 0 0 0',
            zIndex = index;

            area.appendChild(div);
        }
    }
    
    var slide = new f();
   
    f.prototype.countLayer = function() { return parseInt($("#area").find("div:not(#pagination, .clone)").length); }
    f.prototype.settings = function()
    {
        document.getElementById('area').style.width = mslider.width + 'px';
        document.getElementById('area').style.height = mslider.height + 'px';
        document.getElementById('slider-arrows').style.width = mslider.width + 'px';
        document.getElementById('slider').style.width = mslider.width + 'px';
         var marginPrev = $("#prev").css("left");
         var marginNext = $("#next").css("left");
        
        var divPrev = document.createElement('div');
        var divNext = document.createElement('div');
        divPrev.className = 'prev';
        divNext.className = 'next';
        
        with (divPrev.style)
        position = 'absolute',
        width = document.getElementById('prev').offsetWidth + 'px',
        height = document.getElementById('prev').offsetHeight + 'px',
        cursor = 'pointer',
        left = marginPrev,
        backgroundColor = 'Blue',
        opacity = '0',
        zIndex = 20;
        
        with (divNext.style)
        position = 'absolute',
        width = document.getElementById('next').offsetWidth + 'px',
        height = document.getElementById('next').offsetHeight + 'px',
        cursor = 'pointer',
        left = marginNext,
        backgroundColor = 'Blue',
        opacity = '0',
        zIndex = 20;  

        document.getElementById('slider-arrows').appendChild(divPrev);
        document.getElementById('slider-arrows').appendChild(divNext);
        
    }
    slide.settings();
     
    f.prototype.action = function(val)
    {
        if (val=='rotateX' || val=='rotateY')
        {
            obj.run = function(val)
            {
                for (var i = 1; i <= slide.countLayer(); i++)
                {
                    (i==val) ? slide.rotateXY(i, 'block', 20) : slide.rotateXY(i, 'none', 0);
                }
                $("#sp" + val).css("display", "block");
            }
            obj.animation = function(dir, val1, val2, angle)
            {
                switch (dir)
                {
                    case "next":
                        (val1 != slide.countLayer()) ? val2 = val1+1 : val2 = 1;
                        slide.p1(val2, -180);
                    break;
                    
                    case "prev":
                        (val1!=1) ? val2 = val1 - 1 : val2 = slide.countLayer();
                        slide.p1(val2, 180);
                    break;
                    
                    case "pagNext":
                        slide.p1(val2, -180);
                    break;
                    
                    case "pagPrev":
                        slide.p1(val2, 180);
                    break;            
                    
                    default:
                        return null;
                    break;
                }
                 
                setTimeout(function(){
                    $("#p"+val1).removeClass("pActive");
                    $(".sp").css("display", "none");
                    
                    $("#img" + val1).css({ transform: mslider.action+'('+angle+'deg)' });
                    $("#img" + val2).css({
                        transform: mslider.action+'(0deg)',
                        webkitTransition: mslider.timeAnimation + 'ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                        mozTransition: mslider.timeAnimation + 'ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                        oTransition: mslider.timeAnimation + 'ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                        transition: 'transform ' + mslider.timeAnimation + 'ms  cubic-bezier(0.645, 0.045, 0.355, 1)'
                    });
                    
                    setTimeout(function(){
                        $("#img" + val1).css({ display: "none", zIndex: 0 });
                        $("#img" + val2).css({ zIndex: 20 });
                        
                    }, mslider.timeAnimation );
                    $("#p"+val2).addClass("pActive");
                   }, 100);
                
                setTimeout(function() { $("#sp"+val2).show("slow"); },  mslider.timeAnimation);
            }
        }
        else if (val == 'multiRotateX' || val == 'multiRotateY')
        {
            obj.run = function(val1)
            {
                var img1 = $("#img"+val1).attr("dir");
                for (var i = 0; i < 4; i++)
                {
                    (i!=0) ? slide.rotateXYH('cur'+i, img1, 'block', 0, i*(mslider.height / 100) * 25, 20) : slide.rotateXYH('cur'+i, img1, 'block', 0, 0, 20);
                }
                $("#sp" + val1).css("display", "block");
            }
        
            obj.animation = function(dir, val1, val2, angle)
            {
                switch (dir)
                {
                    case "next":
                        (val1 != slide.countLayer()) ? val2 = val1+1 : val2 = 1;
                        var curAngle = 180;
                        var img2 = $("#img"+val2).attr("dir");
                        slide.p2(img2, -180);
                    break;
                    
                    case "prev":
                        var curAngle = -180; 
                        (val1!=1) ? val2 = val1 - 1 : val2 = slide.countLayer();
                        var img2 = $("#img"+val2).attr("dir");
                        slide.p2(img2, 180);
                    break;
                    
                    case "pagNext":
                        var curAngle = 180;
                        var img2 = $("#img"+val2).attr("dir");
                        slide.p2(img2, -180);
                    break;
                    
                    case "pagPrev":
                    var curAngle = -180; 
                        var img2 = $("#img"+val2).attr("dir");
                        slide.p2(img2, 180);
                    break;   
                    
                    default:
                        return null;
                    break;
                }
                
                var timeout = 0;
                $("#p" + val1).removeClass("pActive");

                setTimeout( function() {
                $(".sp").css("display", "none");
                for (i = 0; i < 4; i++)
                {
                    setTimeout (
                    (function (N) {
                    return function()
                    {
                        $("#cur"+N).css({
                            backfaceVisibility: 'hidden',
                            webkitTransform: mslider.action.substring(5) + "("+curAngle+"deg)",
                            transform: mslider.action.substring(5) + "("+curAngle+"deg)" });
                           
                        $("#next"+N).css({
                        backfaceVisibility: 'hidden',
                        webkitTransform: mslider.action.substring(5) + "(0deg)",
                        transform: mslider.action.substring(5) + "(0deg)" });
                        
                        
                            setTimeout(function () {
                             $("#next"+N).css("z-index", "20");
                            $("#cur"+N).remove();
                             $("#next"+N).attr("id", "cur"+N);
                            }, mslider.timeAnimation );
                    } }) (i), timeout );
                    timeout+=mslider.timeout;
                    $("#p"+val2).addClass("pActive");
                } }, 100);
                
                setTimeout(function() {
               
                    $("#sp"+val2).show("slow");
                },  mslider.timeAnimation);
            }
        }
        else {}
    }

    slide.action(mslider.action);
    f.prototype.visibleLayer = function(val) { obj.run(val); }    
    
    f.prototype.pag = function()
    {
        if (document.getElementById('pagination')!=null)
        {
            var pag = document.getElementById('pagination');
            var ul = document.createElement('ul');
            ul.id = 'pag';
            for (var i = 1; i <= slide.countLayer(); i++)
            {
                var li = document.createElement('li');
                var div = document.createElement('div');
                with (div.style)
                    position = 'absolute',
                    top = '0px',
                    margin = '0',
                    padding = '0',
                    width = '12px',
                    height = '12px',
                    zIndex = '100';
                div.className = 'wrapSl';
                (i==1) ? li.className = 'pActive' : li.className='';
                li.id = 'p'+i;
                li.setAttribute('option', i);
                div.id = i;
                li.appendChild(div);
                ul.appendChild(li);
            }
            pag.appendChild(ul);
        }
        else
        {
            var pag = document.createElement('div');
            var ul = document.createElement('ul');
            pag.id = 'pagination';
            pag.style.display = 'none';
            for (var i = 1; i <= slide.countLayer(); i++)
            {
                var li = document.createElement('li');
                (i==1) ? li.className = 'pActive' : li.className='';
                li.id = 'p'+i;
                li.setAttribute('option', i);
                ul.appendChild(li);
            }
            pag.appendChild(ul);
            document.getElementById('area').appendChild(pag);
        }
    }
    
    f.prototype.p1 = function(val, angle)
    {
       $("#img" + val).css({
          display: 'block',
          transform: mslider.action+'('+angle+'deg)',
                        webkitTransition: '0ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                        mozTransition: '0ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                        oTransition: '0ms cubic-bezier(0.645, 0.045, 0.355, 1)',
                        transition: 'transform 0ms  cubic-bezier(0.645, 0.045, 0.355, 1)'
       });
    }
    f.prototype.p2 = function(val, angle) // razbivaet sledyshii div
    {
        for (var i = 0; i < 4; i++)
        {
            (i!=0) ? slide.rotateXYH('next'+i, val, 'block', angle, i*(mslider.height / 100) * 25, 0) : slide.rotateXYH('next'+i, val, 'block', angle, 0, 0);
        }        
    }
    slide.visibleLayer(1);
    slide.pag();
    f.prototype.inactive = function() { $(".prev, .next, .wrapSl").css("display", "block"); }
    f.prototype.noactive = function() { $(".prev, .next, .wrapSl").css("display", "none"); }
    f.prototype.unblock = function() { this.noactive(); setTimeout(function () {slide.inactive()}, mslider.timeAnimation+300); }
    var play = function()
    {
        var next = count;
        count = parseInt($(".pActive").attr("option"));
        if (document.getElementById('pagination')==null)
        {
            if (count == slide.countLayer())
            {
                $("#p" + slide.countLayer()).removeClass("pActive");
                $("#p1").addClass("pActive");
            }else {}
        }else{}
        obj.animation("next", count, next, 180);
        
        slide.unblock();
    }
    // Autoplay
    if (mslider.autoplay == true)
    {
        var id = setInterval(play, mslider.pause);
        $("#area, .prev, .next, #pagination").hover(
        function() { clearInterval(id); },
        function() { id = setInterval(play, mslider.pause)});
    }
    else {}
    $(".next").click(function () { play(); });
    $(".prev").click(function()
    {
        var prev = count;
        count = parseInt($(".pActive").attr("option"));
        if (document.getElementById('pagination')==null)
        {
            if (count == 1)
            {
                $("#p1").removeClass("pActive");
                $("#p"+slide.countLayer()).addClass("pActive");
            } else {}
        } else {}
        
        obj.animation("prev", count, prev, -180);
        slide.unblock();
    });
    $(".wrapSl").click(function()
    {
        var prev = $(".pActive").attr("option");
        if (prev!=$(this).attr("id"))
        {
            (prev < $(this).attr("id")) ? obj.animation("pagNext", prev, $(this).attr("id"), 180) : obj.animation("pagPrev", prev, $(this).attr("id"), -180);
            slide.unblock();
        } else {}
    });
    
    /*$("#img1").click(function()
    {
       $(this).css("transform", "rotateX(180deg)"); 
    });*/
})
    

