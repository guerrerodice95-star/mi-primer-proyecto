"""Genera los efectos de sonido (whoosh, impact, pop, click, tick, ding, glitch, riser).

Uso: python3 generar_sfx.py CARPETA_SALIDA
Necesita: pip install numpy soundfile
"""
import numpy as np, soundfile as sf, sys
SR=48000; out=sys.argv[1]; rng=np.random.default_rng(7)
def t(d): return np.arange(int(SR*d))/SR
def bandsweep(x,f0,f1,q=3.0):
    # time-varying bandpass via STFT-free approach: state-variable filter
    n=len(x); y=np.zeros(n); low=band=0.0
    fs=np.geomspace(f0,f1,n)
    for i in range(n):
        f=2*np.sin(np.pi*fs[i]/SR); hp=x[i]-low-band/q
        band+=f*hp; low+=f*band; y[i]=band
    return y
def norm(x,g=0.9): return x/np.max(np.abs(x))*g
def save(n,x): sf.write(f"{out}/{n}.wav",norm(x).astype(np.float32),SR)
# whoosh
d=0.45; x=rng.standard_normal(len(t(d))); env=np.sin(np.pi*np.linspace(0,1,len(x)))**2
save("whoosh",bandsweep(x,300,4500)*env)
# impact: low sine drop + noise burst
tt=t(0.9); f=40+120*np.exp(-tt*18); ph=2*np.pi*np.cumsum(f)/SR
boom=np.sin(ph)*np.exp(-tt*4.5); nb=rng.standard_normal(len(tt))*np.exp(-tt*30)*0.5
save("impact",np.tanh(2.2*(boom+bandsweep(nb,2000,300))))
# pop
tt=t(0.12); f=900*np.exp(-tt*25)+250; save("pop",np.sin(2*np.pi*np.cumsum(f)/SR)*np.exp(-tt*35))
# click
tt=t(0.05); c=rng.standard_normal(len(tt))*np.exp(-tt*300)+np.sin(2*np.pi*3000*tt)*np.exp(-tt*200)
save("click",c)
# tick
tt=t(0.03); save("tick",np.sin(2*np.pi*2200*tt)*np.exp(-tt*250))
# ding (bright bell)
tt=t(1.2); b=sum(a*np.sin(2*np.pi*fr*tt)*np.exp(-tt*k) for fr,a,k in [(1318,1,4),(2637,.5,6),(3951,.25,8),(1976,.3,5)])
save("ding",b)
# glitch for NADA
tt=t(0.35); g=np.sign(np.sin(2*np.pi*(180+60*np.floor(tt*40))*tt))*np.exp(-tt*6)*0.6+rng.standard_normal(len(tt))*0.2*np.exp(-tt*10)
save("glitch",g)
# riser to CTA
tt=t(1.0); f=200*np.exp(tt*2.2); r=np.sin(2*np.pi*np.cumsum(f)/SR)*tt**2*0.5+bandsweep(rng.standard_normal(len(tt)),400,6000)*tt**2
save("riser",r)
