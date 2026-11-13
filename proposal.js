(function(){
var w=document.getElementById('w'),p='';[['pa',0],['pb',2*Math.PI/3],['pc',4*Math.PI/3]].forEach(function(a){var d='';for(var x=0;x<=3600;x+=15){d+=(x?'L':'M')+x+' '+(300-215*Math.sin(2*Math.PI*x/600+a[1])).toFixed(1)}p+='<path class="'+a[0]+'" d="'+d+'"/>'});w.innerHTML=p;
var S=[["Standby",[0,0,0,0],"All PLC outputs are OFF after initialisation. The system waits for the Start button."],
["Star start",[1,1,0,0],"Start pressed: KM1 (main) and KM2 (star) close. Windings are in star connection, so each winding sees 1/√3 of line voltage and starting current is much lower. Timer T1 runs."],
["Delta run",[1,0,1,0],"When T1 expires the PLC drops KM2 and closes KM3. The motor runs in delta at full voltage and rated power and torque."],
["Safety delay",[0,0,0,0],"Stop pressed: KM3 and KM1 open and the motor is disconnected from the AC supply. A short safety delay guarantees the AC contactors are fully open before braking."],
["DC braking",[0,1,0,1],"KM4 (braking) and KM2 (star) close. The rectifier injects DC into the stator, creating a static field that brakes the rotor. Timer T2 sets how long this lasts."],
["Stopped",[0,0,0,0],"T2 expires and KM4 opens. DC injection ends so the winding is not overheated, and the motor is at standstill."]];
var st=document.getElementById('steps'),k=document.getElementById('kms'),ds=document.getElementById('desc'),N=['KM1','KM2','KM3','KM4'],L=['Main','Star','Delta','Braking'];
k.innerHTML=N.map(function(n,i){return '<div class="km"><small>'+L[i]+'</small>'+n+'</div>'}).join('');
function go(i){[].forEach.call(st.children,function(b,j){b.classList.toggle('on',i===j);b.setAttribute('aria-selected',i===j)});[].forEach.call(k.children,function(e,j){e.classList.toggle('on',!!S[i][1][j])});ds.textContent=S[i][2]}
S.forEach(function(s,i){var b=document.createElement('button');b.textContent=(i+1)+'. '+s[0];b.setAttribute('role','tab');b.onclick=function(){go(i);clearInterval(t)};st.appendChild(b)});
var cur=0,t=setInterval(function(){cur=(cur+1)%S.length;go(cur)},3600);go(0);
var M=['Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],T=[['Guidance',[0,1,2]],['Proposal writing',[0,1,2]],['Proposal defence',[2]],['Build',[]],['Testing &amp; analysis',[]],['Report writing',[]],['Final defence',[]]],g='<span></span>';
M.forEach(function(m,i){g+='<span class="h">'+m+(i<2?" 25":" 26")+'</span>'});
T.forEach(function(r){g+='<span class="t">'+r[0]+'</span>';for(var i=0;i<13;i++)g+='<span class="c'+(r[1].indexOf(i)>-1?' f':'')+'"></span>'});
document.getElementById('gantt').innerHTML=g;
var B=[["Schneider PLC TM221C16R Modicon M221 16 I/O relay output",1,4300000],["Power supply 24 VDC",1,110000],["MCB 1 phase 4A",1,40000],["MCB 3 phase 10A",1,125000],["MCCB 16A",1,400000],["Magnetic contactor Mitsubishi SN-11, 220 V",4,87000],["Rectifier / stud diode",2,40000],["Push button start",1,8000],["Push button stop",1,8000],["Emergency push button",1,25000],["Terminal block",1,16000],["Panel box",1,250000],["DIN rail",1,19000],["Busbar / grounding",1,40000],["Indicator lamp",5,4000],["Cable (10 m)",10,4000],["AC current meter",1,60000],["Thermal overload relay",1,196000]],f=function(n){return 'Rp '+n.toLocaleString('en-US')};
document.getElementById('bud').innerHTML=B.map(function(r,i){return '<tr><td>'+(i+1)+'</td><td>'+r[0]+'</td><td class="r">'+r[1]+'</td><td class="r">'+f(r[2])+'</td><td class="r">'+f(r[1]*r[2])+'</td></tr>'}).join('');
var lb=document.createElement('div');lb.id='lb';lb.innerHTML='<img alt="">';var lx=document.createElement('button');lx.id='lbx';lx.textContent='Close ✕';document.body.append(lb,lx);
function cl(){lb.classList.remove('on');document.body.style.overflow=''}
document.addEventListener('click',function(e){var b=e.target.closest('[data-z]');if(b){var i=b.querySelector('img');lb.firstChild.src=i.src;lb.firstChild.style.background=b.classList.contains('cut')?'transparent':'#fff';lb.firstChild.alt=i.alt;lb.classList.add('on');lb.scrollTop=0;document.body.style.overflow='hidden'}else if(e.target===lb||e.target===lx)cl()});
addEventListener('keydown',function(e){if(e.key==='Escape')cl()});
var io=new IntersectionObserver(function(e){e.forEach(function(x){if(x.isIntersecting){x.target.classList.add('in');io.unobserve(x.target)}})},{threshold:.12});
[].forEach.call(document.querySelectorAll('.rv'),function(e){io.observe(e)});
[].forEach.call(document.querySelectorAll('.glass'),function(e){e.addEventListener('pointermove',function(ev){var r=e.getBoundingClientRect();e.style.setProperty('--mx',ev.clientX-r.left+'px');e.style.setProperty('--my',ev.clientY-r.top+'px');e.style.setProperty('--g',1)});e.addEventListener('pointerleave',function(){e.style.setProperty('--g',0)})});
})();

(function(){
var nav=document.getElementById('nav'),btn=document.querySelector('.menu-btn'),ind=document.querySelector('.nav-ind'),mq=matchMedia('(min-width:1021px)'),links=[].slice.call(document.querySelectorAll('#nav a')),active=null;
function setMenu(o){nav.classList.toggle('open',o);btn.setAttribute('aria-expanded',String(o));btn.setAttribute('aria-label',o?'Close menu':'Open menu')}
btn.addEventListener('click',function(){setMenu(!nav.classList.contains('open'))});
nav.addEventListener('click',function(e){if(e.target.closest('a'))setMenu(false)});
document.addEventListener('keydown',function(e){if(e.key==='Escape')setMenu(false)});
document.addEventListener('pointerdown',function(e){if(nav.classList.contains('open')&&!e.target.closest('.bar'))setMenu(false)});
mq.addEventListener('change',function(e){if(e.matches)setMenu(false)});
function place(){if(!active||!mq.matches){ind.classList.remove('on');return}ind.style.width=active.offsetWidth+'px';ind.style.transform='translate3d('+active.offsetLeft+'px,-50%,0)';ind.classList.add('on')}
function setActive(l){links.forEach(function(a){var on=a===l;a.classList.toggle('active',on);on?a.setAttribute('aria-current','true'):a.removeAttribute('aria-current')});active=l;place()}
var NT=links.map(function(a){return{a:a,el:document.querySelector(a.getAttribute('href'))}}).filter(function(t){return t.el}),vis=new Set();
var so=new IntersectionObserver(function(es){es.forEach(function(en){var t=NT.filter(function(x){return x.el===en.target})[0];en.isIntersecting?vis.add(t):vis.delete(t)});var pick=NT.filter(function(t){return vis.has(t)}).pop()||null;setActive(pick?pick.a:null)},{rootMargin:'-42% 0px -52% 0px'});
NT.forEach(function(t){so.observe(t.el)});
addEventListener('resize',place);if(document.fonts)document.fonts.ready.then(place);
})();
