window.requestAnimationFrame = window.requestAnimationFrame       ||
                               window.webkitRequestAnimationFrame ||
                               window.mozRequestAnimationFrame    ||
                               function( callback ){
                                   window.setTimeout(callback, 1000 / 60);
                               };

var smoothScroll = function(){
    var aim = 0,
        delta = 0,
        i = 0,
        half = 0,
        prev = 0,
        stepsCount = 0;
    
    var step = function(){
        if(--i)requestAnimationFrame(step);
        
        //delta = getDelta();
        
        //console.log(prev+delta*stepsCount);
        //console.log(stepsCount);
        
        var steps = (half - Math.abs(half-i));
        
        stepsCount -= steps;
        prev += steps * delta;
        
        document.body.scrollTop = prev;
    };
    var getDelta = function(){
        return (aim-prev)/stepsCount;
    };
    return function(end, steps){
        if(i!==0)return;
        
        prev = document.body.scrollTop;
        
        aim = end;
        stepsCount = steps*steps;
        
        i = steps*2;
        half = steps;
        
        delta = getDelta();
        
        requestAnimationFrame(step);
    }
}();

var fixPath = function(name){
    document.title = name.charAt(0).toUpperCase()+name.substr(1) + ' | Project-H2O';
    history.replaceState({},document.title,location.pathname+'#'+name);
};

var PROJECT_SITE = location.pathname === '/projektet/';
var REAL_TITLE = document.title;

if(PROJECT_SITE && ['#bostader', '#naturen', '#offentligt', '#detaljer'].indexOf(location.hash) !== -1)
    fixPath(location.hash.substr(1));

window.onload = function(){
//remove no-touch class
if(Modernizr.touch){
    document.children[0].classList.remove('no-touch');
}else{
    var a = document.createElement('a');
    a.href = '/projektet';
    a.textContent = 'Projektet.';
    var element = document.getElementById('nav').children[1];
    element.removeChild(element.firstElementChild);
    element.insertBefore(a, element.firstElementChild);
}

//go top stuff
(function(){
    var t = document.getElementById('go-top'),
        scrl = document.body.scrollTop<300,
        c = 'visible';
    
    var changeVissibility = function(){
        var l = t.classList;
        if(scrl)l.remove(c);
        else l.add(c);
    };
    
    if(t){
        changeVissibility();
        document.addEventListener('scroll',function(){
            var newScrl = document.body.scrollTop<300;
            if(!(newScrl&&scrl)&&(newScrl||scrl)){
                scrl = newScrl;
                changeVissibility()
            }
        });
    }
    
    t.addEventListener('click',function(e){
        smoothScroll(0,10);
        if(PROJECT_SITE)document.title = 'Projektet | Project-H2O'
        history.replaceState({},document.title,location.pathname);
        e.preventDefault();
    });
})();

//mobile menu
(function(){
    var btns = document.getElementsByClassName('mobile-btn');
    for(var i=0;i<btns.length;i++)
        btns[i].addEventListener('click',function(e){
            e.preventDefault();
            var extend = true;
            if(e.srcElement.attributes.getNamedItem('href').textContent === '#')
                extend = false;
            
            document.getElementById('nav-wrap').classList[extend?'add':'remove']('target');
    });
    
})();

//silder stuff
var container = document.getElementsByClassName('slides')[0];
var slides = container && container.children;
if(slides)
    (function(){
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
    })();

//project stuff
if(PROJECT_SITE)
    (function(){
        var clickHandler = function(e){
            var a = e.srcElement.attributes.getNamedItem('href').textContent.substr(1);
            fixPath(a);
            smoothScroll(document.getElementById(a).getBoundingClientRect().top,10);
        };
        
        var links = document.querySelectorAll('#nav li li a');
        for(var i=0;i<links.length;i++){
            links[i].addEventListener('click',clickHandler);
        }
    })();
};