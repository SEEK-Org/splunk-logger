'use strict';const levels={error:5,warn:4,info:3,debug:2};class Logger{constructor(a,b){b=b||'info',this.name=a,this.formattedName=a?`, name=${JSON.stringify(a)}`:'',this.setLevel(b)}setLevel(a){if(!levels[a])throw new TypeError(`unknown error level ${a}`);return this.level=levels[a],this}log(a,b){if(!b||'string'!=typeof b||!levels[b])throw new TypeError(`Level must be one of [${levels.keys.join(', ')}].`);let c={};if(levels[b]>=this.level){if('string'==typeof a)c={msg:a};else if('[object Object]'===Object.prototype.toString.call(a))c=a;else throw new TypeError(`Unsupported message type ${typeof a}`);console.log(Object.keys(c).reduce((d,e)=>{if('name'===e||'level'===e||'time'===e)return d;let f=c[e];return'[object Object]'!==Object.prototype.toString.call(f)&&(f=f.toString?f.toString():f),`${d}, ${e}=${JSON.stringify(f)}`},`time=${new Date().toISOString()}, level=${b}${this.formattedName}`))}}error(a){this.log(a,'error')}warn(a){this.log(a,'warn')}info(a){this.log(a,'info')}debug(a){this.log(a,'debug')}}module.exports=Logger;
