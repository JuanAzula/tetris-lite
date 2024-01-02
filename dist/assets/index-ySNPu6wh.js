(function(){const i=document.createElement("link").relList;if(i&&i.supports&&i.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))r(o);new MutationObserver(o=>{for(const s of o)if(s.type==="childList")for(const E of s.addedNodes)E.tagName==="LINK"&&E.rel==="modulepreload"&&r(E)}).observe(document,{childList:!0,subtree:!0});function n(o){const s={};return o.integrity&&(s.integrity=o.integrity),o.referrerPolicy&&(s.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?s.credentials="include":o.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function r(o){if(o.ep)return;o.ep=!0;const s=n(o);fetch(o.href,s)}})();const h=20,w=14,v=30,p={LEFT:"ArrowLeft",DOWN:"ArrowDown",RIGHT:"ArrowRight",UP:"ArrowUp"},d=document.querySelector("canvas"),l=d.getContext("2d"),M=document.querySelector("#score");let m=0;const f=new window.Audio("./Tetris.mp3");f.volume=.5;d.width=h*w;d.height=h*v;l.scale(h,h);const a=S(w,v);function S(t,i){return Array(i).fill().map(()=>Array(t).fill(0))}const O=[["red"],["blue"],["green"],["orange"],["cyan"],["yellow"],["pink"],["white"]],u=[[[1,0,0],[1,1,1]],[[1,1,1],[1,0,0]],[[0,1,0],[1,1,1]],[[1],[1],[1],[1]],[[1,1],[1,1]],[[0,0,0,0],[1,1,1,1]],[[1,1,1],[0,1,0]],[[1],[1]],[[1,1,0],[0,1,1]],[[0,0,1],[1,1,1]]],e={position:{x:6,y:0},shape:[[1,1],[1,1]]};let g=0,T=0;function y(t=0){const i=t-T;T=t,g+=i,g>100&&(e.position.y++,g=0),c()&&(e.position.y--,L(),x(),e.shape=u[Math.floor(Math.random()*u.length)],e.position.y=0,e.position.x=Math.floor(Math.random()*10),c()&&(window.alert("Game Over! Try again."),a.forEach(n=>n.fill(0)),m=0,y())),I(),window.requestAnimationFrame(y)}function I(){l.fillStyle="black",l.fillRect(0,0,d.width,d.height),a.forEach((t,i)=>{t.forEach((n,r)=>{n===1&&(l.fillStyle="purple",l.fillRect(r,i,1,1))})}),e.shape.forEach((t,i)=>{t.forEach((n,r)=>{n===1&&(l.fillStyle=O[Math.floor(Math.random()*O.length)],l.fillRect(r+e.position.x,i+e.position.y,1,1))})}),M.innerText=m}const A=document.getElementById("up"),R=document.getElementById("down"),P=document.getElementById("left"),B=document.getElementById("right");P.addEventListener("click",function(){e.position.x-=1,c()&&e.position.x++});B.addEventListener("click",function(){e.position.x++,c()&&e.position.x--});R.addEventListener("click",function(){e.position.y++,c()&&(e.position.y--,L(),x())});A.addEventListener("click",function(){const t=[];for(let n=0;n<e.shape[0].length;n++){const r=[];for(let o=e.shape.length-1;o>=0;o--)r.push(e.shape[o][n]);t.push(r)}const i=e.shape;e.shape=t,c()&&(e.shape=i)});document.addEventListener("keydown",t=>{if(t.code===p.LEFT&&(e.position.x--,c()&&e.position.x++),t.code===p.RIGHT&&(e.position.x++,c()&&e.position.x--),t.code===p.DOWN&&(e.position.y++,c()&&(e.position.y--,L(),x())),t.code===p.UP){const i=[];for(let r=0;r<e.shape[0].length;r++){const o=[];for(let s=e.shape.length-1;s>=0;s--)o.push(e.shape[s][r]);i.push(o)}const n=e.shape;e.shape=i,c()&&(e.shape=n)}});function c(){return e.shape.find((t,i)=>t.find((n,r)=>{var o;return n!==0&&(e.position.y+i<0||((o=a[e.position.y+i])==null?void 0:o[e.position.x+r])!==0)}))}function L(){e.shape.forEach((t,i)=>{t.forEach((n,r)=>{n===1&&(a[e.position.y+i][e.position.x+r]=1)})}),e.shape=u[Math.floor(Math.random()*u.length)],e.position.x=Math.floor(Math.random()*(w-e.shape[0].length+1)),e.position.y=0,c()&&(window.alert("Game Over! Try again."),a.forEach(t=>t.fill(0)),m=0,y())}function x(){for(let t=0;t<a.length;t++)a[t].every(i=>i===1)&&(a.splice(t,1),a.unshift([0,0,0,0,0,0,0,0,0,0,0,0,0,0]),m+=100)}document.querySelector("section").addEventListener("click",()=>{f.addEventListener("ended",()=>{f.currentTime=0,f.play()}),f.play(),y()});
