J=V=t=j=s=0;
P=40;
f='fillStyle';
a.R=a.fillRect
a.l=a.lineTo
a.m=a.moveTo
a.T=a.fillText
_='#FFF'
function r(a){return ((a<<5)^(a*1243+123))&0xff}
setInterval(function(){
    c.width=W=500;
    c.height=H=150;
    // background
    l = a.createLinearGradient(0,W,0,0);
    l.A=l.addColorStop
    l.A(0,_);
    l.A(1,a.shadowColor='#444');
    a[f]=l
    a.R(0,0,W,H);
    // pyramids 
    k=30;
    for(d=4;d!=0;d--) {
        a.save();
        m=t/d
        a.translate(-60-m%k,D=(H-P*.5/d+30));
        for(i=0;i<20;++i) {
            p=((m/k)|0) + i + 10*d;
            a.translate(k, 0);
            h=-r(p)*d/10
            w=d*r(p*4)/4;
            A=0,B=w/3,C=w-B;
            a.shadowBlur=d*2;
            c=2*(d>1?1:0);while(c--) {
                with(a) {
                    beginPath();
                    m(B, h);
                    l(c?w:A,0);
                    l(C,0);
                    l(B, h);
                    a[f]=d==4?'#444':d==3?'#555':c?'#888':'#bbb';
                    fill();
                    closePath();
                }
            }
            if(d==1&&p&1){
                x=r(p<<4)
                h=r(p)/3;
                a[f]='#111',
                a.R(0,-x,30,h);
                a[f]='#333',
                a.R(2,-x+2,26,h-4);
                x=D-x;
                if(J&&i==4&&P>x&&P<x+h)J=0;
            }
         }
        a.restore();
    }
    u=document
    u.onkeydown=function(){j=.2}
    u.onkeyup=function(){j=0;if(!J)t=0,J=1}
    a[f]='#111';
    if(J) V+=.1-j,P+=V;
    if(P<0)V=P=0;
    if(P>H-8)V=0,P=H-8;
    a.R(90, P,5,8);
    a[f]=_
    if(!J)
        a.font='30px s',a.T(t?"DISTANCE "+t+'m':"PRESS BUTTON",t?160:35,H/2)
    else
        a.T(t+'m',10,30),t+=2+((t/1000)|0)

}, 20);
