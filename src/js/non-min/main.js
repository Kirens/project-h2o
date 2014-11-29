window.onload = function(){
(function(){
    var t = document.getElementById('go-top'),
        scrl = document.body.scrollTop<300,
        c = 'visible';
    if(t){
        t=t.classList;
        if(scrl)t.remove(c);
        else t.add(c);
        
        document.addEventListener('scroll',function(){
            var newScrl = document.body.scrollTop<300;
            if(!(newScrl&&scrl)&&(newScrl||scrl)){
                var l = t.classList;
                if(t.contains(c))t.remove(c);
                else t.add(c);
            }
            scrl = newScrl;
        },true);
    }
})();
(function(){
    var container = document.getElementsByClassName('slides')[0];
    var slides = container && container.children;
    if(slides){
        var moveTo = function(position){
            if(!slides[position])throw 'invalid number';
            slides[slides.current].classList.remove('visible');
            slides[position].classList.add('visible');
            container.style.height = slides[position].getBoundingClientRect().height+'px';
            slides.current = position;
        };
        var highligt = function(side){
            if(side){
                clearInterval(side.timeout);
                side.classList.add('highlight');
                side.timeout = setTimeout(function(){side.classList.remove('highlight')},500);
            }
        };
        var next = function(keepInterval){
            try{
                moveTo(slides.current+1);
            }catch(e){
                if(e=='invalid number')moveTo(0)
            }
            if(!keepInterval)clearInterval(interval);
            //highligt button
            highligt(actions.right)
        };
        var prev = function(){
            try{
                moveTo(slides.current-1);
            }catch(e){
                if(e=='invalid number')moveTo(slides.length-1)
            }
            clearInterval(interval);
            //highligt button
            highligt(actions.left)
        };
        var interval = setInterval(next,7000,true);
        
        
        //Find any vissible and remove others
        var found=false;
        for(var i=0;i<slides.length;i++){
            if(found)slides[i].classList.remove('visible');
            else found=slides[i].classList.contains('visible'),slides.current = i;
        }
        if(!found)slides.current=0,setTimeout(function(){moveTo(0); window.slider = {moveTo:moveTo,next:next,prev:prev}},500);
        
        
        //add eventlisteners
        document.body.addEventListener('keyup',function(e){
            switch(e.keyCode){
                case 37:
                    //left
                    prev();
                    break;
                case 39:
                    //right
                    next();
                    break;
            }
            
        },true);
        
        var actions;
        if(actions = document.getElementById('actions')){
            actions = {left:actions.getElementsByClassName('left')[0],right:actions.getElementsByClassName('right')[0]};
            actions.left.addEventListener('click', function(){prev()},true);
            actions.right.addEventListener('click', function(){next()},true);
        }
        
        //var intro = document.getElementById('intro');
        //add touch events
        if (Modernizr.touch)
            (function(){
                //hint that the user may swipe
                if(document.getElementById('swipe-hint'))document.getElementById('swipe-hint').classList.add('hint');
                
                var startX,
                    startY,
                    start,
                    timeThreshold = 0.8, //pixels per milisec
                    lengthThreshold = 0.4, //length relative to screenwidth
                    ratio = 3; //length/height;
                
                container.addEventListener('touchstart', function(e){
                    startX = e.changedTouches[0].pageX;
                    startY = e.changedTouches[0].pageY;
                    start = e.timeStamp;
                }, false);
                
                container.addEventListener('touchend', function(e){
                    var x = e.changedTouches[0].pageX-startX,
                        y = e.changedTouches[0].pageY-startY,
                        time = (e.timeStamp-start);
                    
                    if(((Math.abs(x)/time)>timeThreshold /*|| (Math.abs(x)-window.innerWidth*lengthThreshold)>0*/) && Math.abs(x/y)>ratio){
                        if(x<0)next();
                        else prev();
                    }
                }, false);
            })();
    }
})();
//remove no-touch class
if(Modernizr.touch)document.children[0].classList.remove('no-touch');
};