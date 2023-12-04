import t,{Component as e,createRef as s}from"react";import i from"jquery";import"./index.css";import{jsx as r}from"react/jsx-runtime";import{jsxs as l}from"react/jsx-runtime";export default class h extends e{constructor(t){super(t),this.dom=s(),this.index=0,this.state={left:0,lastLeft:0,index:0,moving:!1,items:[t.items[0]]},this.autoSlide()}autoSlide(){this.props.autoSlide&&!(this.props.items.length<2)&&(clearInterval(this.autoSlideInterval),this.autoSlideInterval=setInterval(()=>{if(this.state.moving)return;let t=this.getWidth();this.setState({moving:!0,left:-t,lastLeft:-t},()=>{this.startScroll(1)})},this.props.autoSlide))}getItems(){let{items:t}=this.props;if(t.length<2)return t;let e=this.index;return[t[e-1<0?t.length-1:e-1],t[e],t[e+1>t.length-1?0:e+1]]}componentDidMount(){let{items:t}=this.state;!(t.length<2)&&this.setState({left:-this.getWidth()})}getWidth(){return i(this.dom.current).width()}mouseDown(t){if(this.state.moving||this.props.items.length<2)return;this.isDown=!0;let{x:e}=this.getClient(t),s=this.getWidth();this.so={x:e,left:-s,width:s},this.setState({left:-s,lastLeft:-s,moving:!0}),this.eventHandler("window","mousemove",i.proxy(this.mouseMove,this)),this.eventHandler("window","mouseup",i.proxy(this.mouseUp,this))}setIndex(t){this.index+=t,this.index<0&&(this.index=this.props.items.length-1),this.index>this.props.items.length-1&&(this.index=0)}stopScroll(t){this.autoSlide(),clearInterval(this.interval),this.setIndex(t),this.setState({moving:!1})}getSpeed(){let{speed:t}=this.props;return t>99&&(t=99),t<1&&(t=1),{speed:(500-5*t)/10,step:5}}startScroll(t){let{speed:e,step:s}=this.getSpeed(),i=this.state.lastLeft+-t*this.getWidth(),r=-(t*s);this.interval=setInterval(()=>{let{left:e}=this.state;r>0&&e>=i?this.stopScroll(t):r<0&&e<=i?this.stopScroll(t):this.setState({left:e+r})},e)}mouseMove(t){let{x:e}=this.getClient(t),s=e-this.so.x;!(Math.abs(s)>=this.so.width-10)&&this.setState({left:this.so.left+s})}mouseUp(){this.isDown=!1,this.eventHandler("window","mousemove",this.mouseMove,"unbind"),this.eventHandler("window","mouseup",this.mouseUp,"unbind");let{swipMethod:t}=this.props,{left:e,lastLeft:s}=this.state;if(e===s){this.stopScroll(0);return}let i;if(e<s?i=s-this.so.width:e>s&&(i=s+this.so.width),s===i)return;let r;r=i>s?-1:1,this.startScroll(r)}getArrow(t){let{arrow:e,items:s}=this.props;if(!e||s.length<2)return null;let i={},l,h;return"left"===t?(i={left:0},l=r("svg",{viewBox:"0 0 24 24",role:"presentation",style:{width:"1.5rem",height:"1.5rem"},children:r("path",{d:"M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z",style:{fill:"currentcolor"}})},t),h=()=>{if(this.state.moving)return;let t=this.getWidth();this.setState({moving:!0,left:-t,lastLeft:-t},()=>this.startScroll(-1))}):(i={right:0},l=r("svg",{viewBox:"0 0 24 24",role:"presentation",style:{width:"1.5rem",height:"1.5rem"},children:r("path",{d:"M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z",style:{fill:"currentcolor"}})},t),h=()=>{if(this.state.moving)return;let t=this.getWidth();this.setState({moving:!0,left:-t,lastLeft:-t},()=>this.startScroll(1))}),r("div",{className:"rh-slider-arrow",style:i,onClick:h,children:l})}getClient(t){return"ontouchstart"in document.documentElement?t.changedTouches?{x:t.changedTouches[0].clientX,y:t.changedTouches[0].clientY}:{x:0,y:0}:{x:t.clientX,y:t.clientY}}eventHandler(t,e,s,r="bind"){e="ontouchstart"in document.documentElement?({mousedown:"touchstart",mousemove:"touchmove",mouseup:"touchend"})[e]:e;var l="string"==typeof t?"window"===t?i(window):i(t):t;l.unbind(e,s),"bind"===r&&l.bind(e,s)}render(){let{moving:t}=this.state,{attrs:e}=this.props,s,i;t?(s=this.state.left,i=this.getItems()):(s=0,i=[this.props.items[this.index]]);let h={["ontouchstart"in document.documentElement?"onTouchStart":"onMouseDown"]:this.mouseDown.bind(this)};return l("div",{className:"rh-slider",...e,ref:this.dom,children:[r("div",{className:"rh-slider-items",style:{left:s},...h,draggable:!1,onDragStart:t=>t.preventDefault(),children:i.map((t,e)=>r("div",{className:"rh-slider-item msf",children:t},e))}),this.getArrow("left"),this.getArrow("right"),r(ReactSliderDots,{attrs:{},index:this.index,length:this.props.items.length})]})}};function ReactSliderDots(t){let{attrs:e={},rtl:s,index:i,length:h,size:o,gap:n,activeColor:d,deactiveColor:a}=t;return l("div",{...e,className:"react-slider-dots"+(e.className?" "+e.className:""),style:{direction:s?"rtl":"ltr",...e.style},children:[r("div",{style:{flex:1}}),Array(h).fill(0).map((t,e)=>{let s=e===i,l={width:o,height:o,background:s?d:a,margin:n?`0 ${n}px`:void 0};return r("div",{className:"react-slider-dots-item"+(s?" active":""),style:l},e)}),r("div",{style:{flex:1}})]})}h.defaultProps={items:[],speed:96,arrow:!0,autoSlide:4e3};