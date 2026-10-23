(function(){
var H=window.K_HODINY||[],el=document.getElementById('kNow');
if(el&&H.length){try{
var p=new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Prague',weekday:'short',hour:'2-digit',minute:'2-digit',hour12:false}).formatToParts(new Date()),o={};
p.forEach(function(x){o[x.type]=x.value});
var d=['Sun','Mon','Tue','Wed','Thu','Fri','Sat'].indexOf(o.weekday),t=o.hour+':'+o.minute,N=['ne','po','út','st','čt','pá','so'];
var now=H.filter(function(h){return h[0]===d&&h[1]<=t&&t<h[2]})[0];
if(now){el.classList.add('on');el.querySelector('span').textContent='Teď otevřeno, do '+now[2].replace(/^0/,'');}
else{for(var i=0;i<8;i++){var dd=(d+i)%7,n=H.filter(function(h){return h[0]===dd&&(i>0||h[1]>t)})[0];
if(n){el.querySelector('span').textContent='Teď zavřeno, otevíráme '+(i===0?'dnes':i===1?'zítra':'v '+N[dd])+' v '+n[1].replace(/^0/,'');break;}}}
}catch(e){}}
var f=document.getElementById('kForm');
if(f)f.addEventListener('submit',function(ev){
var m=f.getAttribute('data-mode');if(m==='post')return;ev.preventDefault();
if(!f.reportValidity())return;
if(m==='demo'){f.querySelector('.k-note').textContent='Tohle je ukázka webu: formulář zatím nic neodesílá.';return;}
var v=function(n){return(f.elements[n]||{}).value||''};
location.href='mailto:'+f.getAttribute('data-to')+'?subject='+encodeURIComponent('Poptávka z webu: '+v('jmeno'))+'&body='+encodeURIComponent(v('zprava')+'\n\n'+v('jmeno')+'\n'+v('kontakt'));
});
})();
