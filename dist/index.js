"use strict";import n from"fs";import e from"fast-glob";import c from"critters";const g=async i=>{const r=new c(i);await f(`${i.path}**/*.html`,async o=>await r.process(o))},f=async(i,r=async t=>t,o=async t=>await n.promises.readFile(t,"utf-8"))=>{const t=await e(i);for(const s of t)try{const a=await r(await o(s));if(!a)continue;await n.promises.writeFile(s,a,"utf-8")}catch{console.log("Error: Cannot inline file "+s+" CSS!")}};
