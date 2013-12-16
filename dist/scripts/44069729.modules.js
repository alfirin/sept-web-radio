!function(window,angular,undefined){"use strict";function isValidDottedPath(path){return null!=path&&""!==path&&"hasOwnProperty"!==path&&MEMBER_NAME_REGEX.test("."+path)}function lookupDottedPath(obj,path){if(!isValidDottedPath(path))throw $resourceMinErr("badmember",'Dotted member path "@{0}" is invalid.',path);for(var keys=path.split("."),i=0,ii=keys.length;ii>i&&obj!==undefined;i++){var key=keys[i];obj=null!==obj?obj[key]:undefined}return obj}var $resourceMinErr=angular.$$minErr("$resource"),MEMBER_NAME_REGEX=/^(\.[a-zA-Z_$][0-9a-zA-Z_$]*)+$/;angular.module("ngResource",["ng"]).factory("$resource",["$http","$q",function($http,$q){function encodeUriSegment(val){return encodeUriQuery(val,!0).replace(/%26/gi,"&").replace(/%3D/gi,"=").replace(/%2B/gi,"+")}function encodeUriQuery(val,pctEncodeSpaces){return encodeURIComponent(val).replace(/%40/gi,"@").replace(/%3A/gi,":").replace(/%24/g,"$").replace(/%2C/gi,",").replace(/%20/g,pctEncodeSpaces?"%20":"+")}function Route(template,defaults){this.template=template,this.defaults=defaults||{},this.urlParams={}}function resourceFactory(url,paramDefaults,actions){function extractParams(data,actionParams){var ids={};return actionParams=extend({},paramDefaults,actionParams),forEach(actionParams,function(value,key){isFunction(value)&&(value=value()),ids[key]=value&&value.charAt&&"@"==value.charAt(0)?lookupDottedPath(data,value.substr(1)):value}),ids}function defaultResponseInterceptor(response){return response.resource}function Resource(value){copy(value||{},this)}var route=new Route(url);return actions=extend({},DEFAULT_ACTIONS,actions),forEach(actions,function(action,name){var hasBody=/^(POST|PUT|PATCH)$/i.test(action.method);Resource[name]=function(a1,a2,a3,a4){var data,success,error,params={};switch(arguments.length){case 4:error=a4,success=a3;case 3:case 2:if(!isFunction(a2)){params=a1,data=a2,success=a3;break}if(isFunction(a1)){success=a1,error=a2;break}success=a2,error=a3;case 1:isFunction(a1)?success=a1:hasBody?data=a1:params=a1;break;case 0:break;default:throw $resourceMinErr("badargs","Expected up to 4 arguments [params, data, success, error], got {0} arguments",arguments.length)}var isInstanceCall=this instanceof Resource,value=isInstanceCall?data:action.isArray?[]:new Resource(data),httpConfig={},responseInterceptor=action.interceptor&&action.interceptor.response||defaultResponseInterceptor,responseErrorInterceptor=action.interceptor&&action.interceptor.responseError||undefined;forEach(action,function(value,key){"params"!=key&&"isArray"!=key&&"interceptor"!=key&&(httpConfig[key]=copy(value))}),hasBody&&(httpConfig.data=data),route.setUrlParams(httpConfig,extend({},extractParams(data,action.params||{}),params),action.url);var promise=$http(httpConfig).then(function(response){var data=response.data,promise=value.$promise;if(data){if(angular.isArray(data)!==!!action.isArray)throw $resourceMinErr("badcfg","Error in resource configuration. Expected response to contain an {0} but got an {1}",action.isArray?"array":"object",angular.isArray(data)?"array":"object");action.isArray?(value.length=0,forEach(data,function(item){value.push(new Resource(item))})):(copy(data,value),value.$promise=promise)}return value.$resolved=!0,response.resource=value,response},function(response){return value.$resolved=!0,(error||noop)(response),$q.reject(response)});return promise=promise.then(function(response){var value=responseInterceptor(response);return(success||noop)(value,response.headers),value},responseErrorInterceptor),isInstanceCall?promise:(value.$promise=promise,value.$resolved=!1,value)},Resource.prototype["$"+name]=function(params,success,error){isFunction(params)&&(error=success,success=params,params={});var result=Resource[name].call(this,params,this,success,error);return result.$promise||result}}),Resource.bind=function(additionalParamDefaults){return resourceFactory(url,extend({},paramDefaults,additionalParamDefaults),actions)},Resource}var DEFAULT_ACTIONS={get:{method:"GET"},save:{method:"POST"},query:{method:"GET",isArray:!0},remove:{method:"DELETE"},"delete":{method:"DELETE"}},noop=angular.noop,forEach=angular.forEach,extend=angular.extend,copy=angular.copy,isFunction=angular.isFunction;return Route.prototype={setUrlParams:function(config,params,actionUrl){var val,encodedVal,self=this,url=actionUrl||self.template,urlParams=self.urlParams={};forEach(url.split(/\W/),function(param){if("hasOwnProperty"===param)throw $resourceMinErr("badname","hasOwnProperty is not a valid parameter name.");!new RegExp("^\\d+$").test(param)&&param&&new RegExp("(^|[^\\\\]):"+param+"(\\W|$)").test(url)&&(urlParams[param]=!0)}),url=url.replace(/\\:/g,":"),params=params||{},forEach(self.urlParams,function(_,urlParam){val=params.hasOwnProperty(urlParam)?params[urlParam]:self.defaults[urlParam],angular.isDefined(val)&&null!==val?(encodedVal=encodeUriSegment(val),url=url.replace(new RegExp(":"+urlParam+"(\\W|$)","g"),encodedVal+"$1")):url=url.replace(new RegExp("(/?):"+urlParam+"(\\W|$)","g"),function(match,leadingSlashes,tail){return"/"==tail.charAt(0)?tail:leadingSlashes+tail})}),url=url.replace(/\/+$/,""),url=url.replace(/\/\.(?=\w+($|\?))/,"."),config.url=url.replace(/\/\\\./,"/."),forEach(params,function(value,key){self.urlParams[key]||(config.params=config.params||{},config.params[key]=value)})}},resourceFactory}])}(window,window.angular),function(window,angular,undefined){"use strict";angular.module("ngCookies",["ng"]).factory("$cookies",["$rootScope","$browser",function($rootScope,$browser){function push(){var name,value,browserCookies,updated;for(name in lastCookies)isUndefined(cookies[name])&&$browser.cookies(name,undefined);for(name in cookies)value=cookies[name],angular.isString(value)?value!==lastCookies[name]&&($browser.cookies(name,value),updated=!0):angular.isDefined(lastCookies[name])?cookies[name]=lastCookies[name]:delete cookies[name];if(updated){updated=!1,browserCookies=$browser.cookies();for(name in cookies)cookies[name]!==browserCookies[name]&&(isUndefined(browserCookies[name])?delete cookies[name]:cookies[name]=browserCookies[name],updated=!0)}}var lastBrowserCookies,cookies={},lastCookies={},runEval=!1,copy=angular.copy,isUndefined=angular.isUndefined;return $browser.addPollFn(function(){var currentCookies=$browser.cookies();lastBrowserCookies!=currentCookies&&(lastBrowserCookies=currentCookies,copy(currentCookies,lastCookies),copy(currentCookies,cookies),runEval&&$rootScope.$apply())})(),runEval=!0,$rootScope.$watch(push),cookies}]).factory("$cookieStore",["$cookies",function($cookies){return{get:function(key){var value=$cookies[key];return value?angular.fromJson(value):value},put:function(key,value){$cookies[key]=angular.toJson(value)},remove:function(key){delete $cookies[key]}}}])}(window,window.angular),function(window,angular){"use strict";function $SanitizeProvider(){this.$get=["$$sanitizeUri",function($$sanitizeUri){return function(html){var buf=[];return htmlParser(html,htmlSanitizeWriter(buf,function(uri,isImage){return!/^unsafe/.test($$sanitizeUri(uri,isImage))})),buf.join("")}}]}function sanitizeText(chars){var buf=[],writer=htmlSanitizeWriter(buf,angular.noop);return writer.chars(chars),buf.join("")}function makeMap(str){var i,obj={},items=str.split(",");for(i=0;i<items.length;i++)obj[items[i]]=!0;return obj}function htmlParser(html,handler){function parseStartTag(tag,tagName,rest,unary){if(tagName=angular.lowercase(tagName),blockElements[tagName])for(;stack.last()&&inlineElements[stack.last()];)parseEndTag("",stack.last());optionalEndTagElements[tagName]&&stack.last()==tagName&&parseEndTag("",tagName),unary=voidElements[tagName]||!!unary,unary||stack.push(tagName);var attrs={};rest.replace(ATTR_REGEXP,function(match,name,doubleQuotedValue,singleQuotedValue,unquotedValue){var value=doubleQuotedValue||singleQuotedValue||unquotedValue||"";attrs[name]=decodeEntities(value)}),handler.start&&handler.start(tagName,attrs,unary)}function parseEndTag(tag,tagName){var i,pos=0;if(tagName=angular.lowercase(tagName))for(pos=stack.length-1;pos>=0&&stack[pos]!=tagName;pos--);if(pos>=0){for(i=stack.length-1;i>=pos;i--)handler.end&&handler.end(stack[i]);stack.length=pos}}var index,chars,match,stack=[],last=html;for(stack.last=function(){return stack[stack.length-1]};html;){if(chars=!0,stack.last()&&specialElements[stack.last()])html=html.replace(new RegExp("(.*)<\\s*\\/\\s*"+stack.last()+"[^>]*>","i"),function(all,text){return text=text.replace(COMMENT_REGEXP,"$1").replace(CDATA_REGEXP,"$1"),handler.chars&&handler.chars(decodeEntities(text)),""}),parseEndTag("",stack.last());else if(0===html.indexOf("<!--")?(index=html.indexOf("--",4),index>=0&&html.lastIndexOf("-->",index)===index&&(handler.comment&&handler.comment(html.substring(4,index)),html=html.substring(index+3),chars=!1)):DOCTYPE_REGEXP.test(html)?(match=html.match(DOCTYPE_REGEXP),match&&(html=html.replace(match[0],""),chars=!1)):BEGING_END_TAGE_REGEXP.test(html)?(match=html.match(END_TAG_REGEXP),match&&(html=html.substring(match[0].length),match[0].replace(END_TAG_REGEXP,parseEndTag),chars=!1)):BEGIN_TAG_REGEXP.test(html)&&(match=html.match(START_TAG_REGEXP),match&&(html=html.substring(match[0].length),match[0].replace(START_TAG_REGEXP,parseStartTag),chars=!1)),chars){index=html.indexOf("<");var text=0>index?html:html.substring(0,index);html=0>index?"":html.substring(index),handler.chars&&handler.chars(decodeEntities(text))}if(html==last)throw $sanitizeMinErr("badparse","The sanitizer was unable to parse the following block of html: {0}",html);last=html}parseEndTag()}function decodeEntities(value){if(!value)return"";var parts=spaceRe.exec(value),spaceBefore=parts[1],spaceAfter=parts[3],content=parts[2];return content&&(hiddenPre.innerHTML=content.replace(/</g,"&lt;"),content="textContent"in hiddenPre?hiddenPre.textContent:hiddenPre.innerText),spaceBefore+content+spaceAfter}function encodeEntities(value){return value.replace(/&/g,"&amp;").replace(NON_ALPHANUMERIC_REGEXP,function(value){return"&#"+value.charCodeAt(0)+";"}).replace(/</g,"&lt;").replace(/>/g,"&gt;")}function htmlSanitizeWriter(buf,uriValidator){var ignore=!1,out=angular.bind(buf,buf.push);return{start:function(tag,attrs,unary){tag=angular.lowercase(tag),!ignore&&specialElements[tag]&&(ignore=tag),ignore||validElements[tag]!==!0||(out("<"),out(tag),angular.forEach(attrs,function(value,key){var lkey=angular.lowercase(key),isImage="img"===tag&&"src"===lkey||"background"===lkey;validAttrs[lkey]!==!0||uriAttrs[lkey]===!0&&!uriValidator(value,isImage)||(out(" "),out(key),out('="'),out(encodeEntities(value)),out('"'))}),out(unary?"/>":">"))},end:function(tag){tag=angular.lowercase(tag),ignore||validElements[tag]!==!0||(out("</"),out(tag),out(">")),tag==ignore&&(ignore=!1)},chars:function(chars){ignore||out(encodeEntities(chars))}}}var $sanitizeMinErr=angular.$$minErr("$sanitize"),START_TAG_REGEXP=/^<\s*([\w:-]+)((?:\s+[\w:-]+(?:\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|[^>\s]+))?)*)\s*(\/?)\s*>/,END_TAG_REGEXP=/^<\s*\/\s*([\w:-]+)[^>]*>/,ATTR_REGEXP=/([\w:-]+)(?:\s*=\s*(?:(?:"((?:[^"])*)")|(?:'((?:[^'])*)')|([^>\s]+)))?/g,BEGIN_TAG_REGEXP=/^</,BEGING_END_TAGE_REGEXP=/^<\s*\//,COMMENT_REGEXP=/<!--(.*?)-->/g,DOCTYPE_REGEXP=/<!DOCTYPE([^>]*?)>/i,CDATA_REGEXP=/<!\[CDATA\[(.*?)]]>/g,NON_ALPHANUMERIC_REGEXP=/([^\#-~| |!])/g,voidElements=makeMap("area,br,col,hr,img,wbr"),optionalEndTagBlockElements=makeMap("colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr"),optionalEndTagInlineElements=makeMap("rp,rt"),optionalEndTagElements=angular.extend({},optionalEndTagInlineElements,optionalEndTagBlockElements),blockElements=angular.extend({},optionalEndTagBlockElements,makeMap("address,article,aside,blockquote,caption,center,del,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,map,menu,nav,ol,pre,script,section,table,ul")),inlineElements=angular.extend({},optionalEndTagInlineElements,makeMap("a,abbr,acronym,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,q,ruby,rp,rt,s,samp,small,span,strike,strong,sub,sup,time,tt,u,var")),specialElements=makeMap("script,style"),validElements=angular.extend({},voidElements,blockElements,inlineElements,optionalEndTagElements),uriAttrs=makeMap("background,cite,href,longdesc,src,usemap"),validAttrs=angular.extend({},uriAttrs,makeMap("abbr,align,alt,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,coords,dir,face,headers,height,hreflang,hspace,ismap,lang,language,nohref,nowrap,rel,rev,rows,rowspan,rules,scope,scrolling,shape,span,start,summary,target,title,type,valign,value,vspace,width")),hiddenPre=document.createElement("pre"),spaceRe=/^(\s*)([\s\S]*?)(\s*)$/;angular.module("ngSanitize",[]).provider("$sanitize",$SanitizeProvider),angular.module("ngSanitize").filter("linky",["$sanitize",function($sanitize){var LINKY_URL_REGEXP=/((ftp|https?):\/\/|(mailto:)?[A-Za-z0-9._%+-]+@)\S*[^\s.;,(){}<>]/,MAILTO_REGEXP=/^mailto:/;return function(text,target){function addText(text){text&&html.push(sanitizeText(text))}function addLink(url,text){html.push("<a "),angular.isDefined(target)&&(html.push('target="'),html.push(target),html.push('" ')),html.push('href="'),html.push(url),html.push('">'),addText(text),html.push("</a>")}if(!text)return text;for(var match,url,i,raw=text,html=[];match=raw.match(LINKY_URL_REGEXP);)url=match[0],match[2]==match[3]&&(url="mailto:"+url),i=match.index,addText(raw.substr(0,i)),addLink(url,match[0].replace(MAILTO_REGEXP,"")),raw=raw.substring(i+match[0].length);return addText(raw),$sanitize(html.join(""))}}])}(window,window.angular),function(window,angular){"use strict";function $RouteProvider(){function inherit(parent,extra){return angular.extend(new(angular.extend(function(){},{prototype:parent})),extra)}function pathRegExp(path,opts){var insensitive=opts.caseInsensitiveMatch,ret={originalPath:path,regexp:path},keys=ret.keys=[];return path=path.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?|\*])?/g,function(_,slash,key,option){var optional="?"===option?option:null,star="*"===option?option:null;return keys.push({name:key,optional:!!optional}),slash=slash||"",""+(optional?"":slash)+"(?:"+(optional?slash:"")+(star&&"(.+?)"||"([^/]+)")+(optional||"")+")"+(optional||"")}).replace(/([\/$\*])/g,"\\$1"),ret.regexp=new RegExp("^"+path+"$",insensitive?"i":""),ret}var routes={};this.when=function(path,route){if(routes[path]=angular.extend({reloadOnSearch:!0},route,path&&pathRegExp(path,route)),path){var redirectPath="/"==path[path.length-1]?path.substr(0,path.length-1):path+"/";routes[redirectPath]=angular.extend({redirectTo:path},pathRegExp(redirectPath,route))}return this},this.otherwise=function(params){return this.when(null,params),this},this.$get=["$rootScope","$location","$routeParams","$q","$injector","$http","$templateCache","$sce",function($rootScope,$location,$routeParams,$q,$injector,$http,$templateCache,$sce){function switchRouteMatcher(on,route){var keys=route.keys,params={};if(!route.regexp)return null;var m=route.regexp.exec(on);if(!m)return null;for(var i=1,len=m.length;len>i;++i){var key=keys[i-1],val="string"==typeof m[i]?decodeURIComponent(m[i]):m[i];key&&val&&(params[key.name]=val)}return params}function updateRoute(){var next=parseRoute(),last=$route.current;next&&last&&next.$$route===last.$$route&&angular.equals(next.pathParams,last.pathParams)&&!next.reloadOnSearch&&!forceReload?(last.params=next.params,angular.copy(last.params,$routeParams),$rootScope.$broadcast("$routeUpdate",last)):(next||last)&&(forceReload=!1,$rootScope.$broadcast("$routeChangeStart",next,last),$route.current=next,next&&next.redirectTo&&(angular.isString(next.redirectTo)?$location.path(interpolate(next.redirectTo,next.params)).search(next.params).replace():$location.url(next.redirectTo(next.pathParams,$location.path(),$location.search())).replace()),$q.when(next).then(function(){if(next){var template,templateUrl,locals=angular.extend({},next.resolve);return angular.forEach(locals,function(value,key){locals[key]=angular.isString(value)?$injector.get(value):$injector.invoke(value)}),angular.isDefined(template=next.template)?angular.isFunction(template)&&(template=template(next.params)):angular.isDefined(templateUrl=next.templateUrl)&&(angular.isFunction(templateUrl)&&(templateUrl=templateUrl(next.params)),templateUrl=$sce.getTrustedResourceUrl(templateUrl),angular.isDefined(templateUrl)&&(next.loadedTemplateUrl=templateUrl,template=$http.get(templateUrl,{cache:$templateCache}).then(function(response){return response.data}))),angular.isDefined(template)&&(locals.$template=template),$q.all(locals)}}).then(function(locals){next==$route.current&&(next&&(next.locals=locals,angular.copy(next.params,$routeParams)),$rootScope.$broadcast("$routeChangeSuccess",next,last))},function(error){next==$route.current&&$rootScope.$broadcast("$routeChangeError",next,last,error)}))}function parseRoute(){var params,match;return angular.forEach(routes,function(route){!match&&(params=switchRouteMatcher($location.path(),route))&&(match=inherit(route,{params:angular.extend({},$location.search(),params),pathParams:params}),match.$$route=route)}),match||routes[null]&&inherit(routes[null],{params:{},pathParams:{}})}function interpolate(string,params){var result=[];return angular.forEach((string||"").split(":"),function(segment,i){if(0===i)result.push(segment);else{var segmentMatch=segment.match(/(\w+)(.*)/),key=segmentMatch[1];result.push(params[key]),result.push(segmentMatch[2]||""),delete params[key]}}),result.join("")}var forceReload=!1,$route={routes:routes,reload:function(){forceReload=!0,$rootScope.$evalAsync(updateRoute)}};return $rootScope.$on("$locationChangeSuccess",updateRoute),$route}]}function $RouteParamsProvider(){this.$get=function(){return{}}}function ngViewFactory($route,$anchorScroll,$compile,$controller,$animate){return{restrict:"ECA",terminal:!0,priority:400,transclude:"element",link:function(scope,$element,attr,ctrl,$transclude){function cleanupLastView(){currentScope&&(currentScope.$destroy(),currentScope=null),currentElement&&($animate.leave(currentElement),currentElement=null)}function update(){var locals=$route.current&&$route.current.locals,template=locals&&locals.$template;if(template){var newScope=scope.$new(),clone=$transclude(newScope,angular.noop);clone.html(template),$animate.enter(clone,null,currentElement||$element,function(){!angular.isDefined(autoScrollExp)||autoScrollExp&&!scope.$eval(autoScrollExp)||$anchorScroll()}),cleanupLastView();var link=$compile(clone.contents()),current=$route.current;if(currentScope=current.scope=newScope,currentElement=clone,current.controller){locals.$scope=currentScope;var controller=$controller(current.controller,locals);current.controllerAs&&(currentScope[current.controllerAs]=controller),clone.data("$ngControllerController",controller),clone.children().data("$ngControllerController",controller)}link(currentScope),currentScope.$emit("$viewContentLoaded"),currentScope.$eval(onloadExp)}else cleanupLastView()}var currentScope,currentElement,autoScrollExp=attr.autoscroll,onloadExp=attr.onload||"";scope.$on("$routeChangeSuccess",update),update()}}}var ngRouteModule=angular.module("ngRoute",["ng"]).provider("$route",$RouteProvider);ngRouteModule.provider("$routeParams",$RouteParamsProvider),ngRouteModule.directive("ngView",ngViewFactory),ngViewFactory.$inject=["$route","$anchorScroll","$compile","$controller","$animate"]}(window,window.angular),function(window,angular,undefined){"use strict";angular.module("ngAnimate",["ng"]).config(["$provide","$animateProvider",function($provide,$animateProvider){function extractElementNode(element){for(var i=0;i<element.length;i++){var elm=element[i];if(elm.nodeType==ELEMENT_NODE)return elm}}function isMatchingElement(elm1,elm2){return extractElementNode(elm1)==extractElementNode(elm2)}var noop=angular.noop,forEach=angular.forEach,selectors=$animateProvider.$$selectors,ELEMENT_NODE=1,NG_ANIMATE_STATE="$$ngAnimateState",NG_ANIMATE_CLASS_NAME="ng-animate",rootAnimateState={running:!0};$provide.decorator("$animate",["$delegate","$injector","$sniffer","$rootElement","$timeout","$rootScope","$document",function($delegate,$injector,$sniffer,$rootElement,$timeout,$rootScope){function lookup(name){if(name){var matches=[],flagMap={},classes=name.substr(1).split(".");($sniffer.transitions||$sniffer.animations)&&classes.push("");for(var i=0;i<classes.length;i++){var klass=classes[i],selectorFactoryName=selectors[klass];selectorFactoryName&&!flagMap[klass]&&(matches.push($injector.get(selectorFactoryName)),flagMap[klass]=!0)}return matches}}function performAnimation(animationEvent,className,element,parentElement,afterElement,domOperation,doneCallback){function onBeforeAnimationsComplete(cancelled){if(fireDOMOperation(),cancelled===!0)return closeAnimation(),void 0;var data=element.data(NG_ANIMATE_STATE);data&&(data.done=closeAnimation,element.data(NG_ANIMATE_STATE,data)),invokeRegisteredAnimationFns(animations,"after",closeAnimation)}function invokeRegisteredAnimationFns(animations,phase,allAnimationFnsComplete){function progress(index,phase){var phaseCompletionFlag=phase+"Complete",currentAnimation=animations[index];currentAnimation[phaseCompletionFlag]=!0,(currentAnimation[endFnName]||noop)();for(var i=0;i<animations.length;i++)if(!animations[i][phaseCompletionFlag])return;allAnimationFnsComplete()}var endFnName=phase+"End";forEach(animations,function(animation,index){var animationPhaseCompleted=function(){progress(index,phase)};return"before"!=phase||"enter"!=animationEvent&&"move"!=animationEvent?(animation[phase]?animation[endFnName]=isClassBased?animation[phase](element,className,animationPhaseCompleted):animation[phase](element,animationPhaseCompleted):animationPhaseCompleted(),void 0):(animationPhaseCompleted(),void 0)})}function fireDoneCallbackAsync(){doneCallback&&$timeout(doneCallback,0,!1)}function fireDOMOperation(){fireDOMOperation.hasBeenRun||(fireDOMOperation.hasBeenRun=!0,domOperation())}function closeAnimation(){if(!closeAnimation.hasBeenRun){closeAnimation.hasBeenRun=!0;var data=element.data(NG_ANIMATE_STATE);data&&(isClassBased?cleanup(element):(data.closeAnimationTimeout=$timeout(function(){cleanup(element)},0,!1),element.data(NG_ANIMATE_STATE,data))),fireDoneCallbackAsync()}}var node=extractElementNode(element);if(!node)return fireDOMOperation(),closeAnimation(),void 0;var currentClassName=node.className,classes=currentClassName+" "+className,animationLookup=(" "+classes).replace(/\s+/g,".");parentElement||(parentElement=afterElement?afterElement.parent():element.parent());var matches=lookup(animationLookup),isClassBased="addClass"==animationEvent||"removeClass"==animationEvent,ngAnimateState=element.data(NG_ANIMATE_STATE)||{};if(animationsDisabled(element,parentElement)||0===matches.length)return fireDOMOperation(),closeAnimation(),void 0;var animations=[];if(ngAnimateState.running&&isClassBased&&ngAnimateState.structural||forEach(matches,function(animation){if(!animation.allowCancel||animation.allowCancel(element,animationEvent,className)){var beforeFn,afterFn=animation[animationEvent];"leave"==animationEvent?(beforeFn=afterFn,afterFn=null):beforeFn=animation["before"+animationEvent.charAt(0).toUpperCase()+animationEvent.substr(1)],animations.push({before:beforeFn,after:afterFn})}}),0===animations.length)return fireDOMOperation(),fireDoneCallbackAsync(),void 0;var futureClassName=" "+currentClassName+" ";ngAnimateState.running&&($timeout.cancel(ngAnimateState.closeAnimationTimeout),cleanup(element),cancelAnimations(ngAnimateState.animations),ngAnimateState.beforeComplete?(ngAnimateState.done||noop)(!0):isClassBased&&!ngAnimateState.structural&&(futureClassName="removeClass"==ngAnimateState.event?futureClassName.replace(ngAnimateState.className,""):futureClassName+ngAnimateState.className+" "));var classNameToken=" "+className+" ";return"addClass"==animationEvent&&futureClassName.indexOf(classNameToken)>=0||"removeClass"==animationEvent&&-1==futureClassName.indexOf(classNameToken)?(fireDOMOperation(),fireDoneCallbackAsync(),void 0):(element.addClass(NG_ANIMATE_CLASS_NAME),element.data(NG_ANIMATE_STATE,{running:!0,event:animationEvent,className:className,structural:!isClassBased,animations:animations,done:onBeforeAnimationsComplete}),invokeRegisteredAnimationFns(animations,"before",onBeforeAnimationsComplete),void 0)}function cancelChildAnimations(element){var node=extractElementNode(element);forEach(node.querySelectorAll("."+NG_ANIMATE_CLASS_NAME),function(element){element=angular.element(element);var data=element.data(NG_ANIMATE_STATE);data&&(cancelAnimations(data.animations),cleanup(element))})}function cancelAnimations(animations){var isCancelledFlag=!0;forEach(animations,function(animation){animations.beforeComplete||(animation.beforeEnd||noop)(isCancelledFlag),animations.afterComplete||(animation.afterEnd||noop)(isCancelledFlag)})}function cleanup(element){isMatchingElement(element,$rootElement)?rootAnimateState.disabled||(rootAnimateState.running=!1,rootAnimateState.structural=!1):(element.removeClass(NG_ANIMATE_CLASS_NAME),element.removeData(NG_ANIMATE_STATE))}function animationsDisabled(element,parentElement){if(rootAnimateState.disabled)return!0;if(isMatchingElement(element,$rootElement))return rootAnimateState.disabled||rootAnimateState.running;do{if(0===parentElement.length)break;var isRoot=isMatchingElement(parentElement,$rootElement),state=isRoot?rootAnimateState:parentElement.data(NG_ANIMATE_STATE),result=state&&(!!state.disabled||!!state.running);if(isRoot||result)return result;if(isRoot)return!0}while(parentElement=parentElement.parent());return!0}return $rootElement.data(NG_ANIMATE_STATE,rootAnimateState),$rootScope.$$postDigest(function(){$rootScope.$$postDigest(function(){rootAnimateState.running=!1})}),{enter:function(element,parentElement,afterElement,doneCallback){this.enabled(!1,element),$delegate.enter(element,parentElement,afterElement),$rootScope.$$postDigest(function(){performAnimation("enter","ng-enter",element,parentElement,afterElement,noop,doneCallback)})},leave:function(element,doneCallback){cancelChildAnimations(element),this.enabled(!1,element),$rootScope.$$postDigest(function(){performAnimation("leave","ng-leave",element,null,null,function(){$delegate.leave(element)},doneCallback)})},move:function(element,parentElement,afterElement,doneCallback){cancelChildAnimations(element),this.enabled(!1,element),$delegate.move(element,parentElement,afterElement),$rootScope.$$postDigest(function(){performAnimation("move","ng-move",element,parentElement,afterElement,noop,doneCallback)})},addClass:function(element,className,doneCallback){performAnimation("addClass",className,element,null,null,function(){$delegate.addClass(element,className)},doneCallback)},removeClass:function(element,className,doneCallback){performAnimation("removeClass",className,element,null,null,function(){$delegate.removeClass(element,className)},doneCallback)},enabled:function(value,element){switch(arguments.length){case 2:if(value)cleanup(element);else{var data=element.data(NG_ANIMATE_STATE)||{};data.disabled=!0,element.data(NG_ANIMATE_STATE,data)}break;case 1:rootAnimateState.disabled=!value;break;default:value=!rootAnimateState.disabled}return!!value}}}]),$animateProvider.register("",["$window","$sniffer","$timeout",function($window,$sniffer,$timeout){function afterReflow(callback){animationReflowQueue.push(callback),$timeout.cancel(animationTimer),animationTimer=$timeout(function(){forEach(animationReflowQueue,function(fn){fn()}),animationReflowQueue=[],animationTimer=null,lookupCache={}},10,!1)}function getElementAnimationDetails(element,cacheKey){var data=cacheKey?lookupCache[cacheKey]:null;if(!data){var transitionDelayStyle,animationDelayStyle,transitionDurationStyle,transitionPropertyStyle,transitionDuration=0,transitionDelay=0,animationDuration=0,animationDelay=0;forEach(element,function(element){if(element.nodeType==ELEMENT_NODE){var elementStyles=$window.getComputedStyle(element)||{};transitionDurationStyle=elementStyles[TRANSITION_PROP+DURATION_KEY],transitionDuration=Math.max(parseMaxTime(transitionDurationStyle),transitionDuration),transitionPropertyStyle=elementStyles[TRANSITION_PROP+PROPERTY_KEY],transitionDelayStyle=elementStyles[TRANSITION_PROP+DELAY_KEY],transitionDelay=Math.max(parseMaxTime(transitionDelayStyle),transitionDelay),animationDelayStyle=elementStyles[ANIMATION_PROP+DELAY_KEY],animationDelay=Math.max(parseMaxTime(animationDelayStyle),animationDelay);var aDuration=parseMaxTime(elementStyles[ANIMATION_PROP+DURATION_KEY]);aDuration>0&&(aDuration*=parseInt(elementStyles[ANIMATION_PROP+ANIMATION_ITERATION_COUNT_KEY],10)||1),animationDuration=Math.max(aDuration,animationDuration)}}),data={total:0,transitionPropertyStyle:transitionPropertyStyle,transitionDurationStyle:transitionDurationStyle,transitionDelayStyle:transitionDelayStyle,transitionDelay:transitionDelay,transitionDuration:transitionDuration,animationDelayStyle:animationDelayStyle,animationDelay:animationDelay,animationDuration:animationDuration},cacheKey&&(lookupCache[cacheKey]=data)}return data}function parseMaxTime(str){var maxValue=0,values=angular.isString(str)?str.split(/\s*,\s*/):[];return forEach(values,function(value){maxValue=Math.max(parseFloat(value)||0,maxValue)}),maxValue}function getCacheKey(element){var parentElement=element.parent(),parentID=parentElement.data(NG_ANIMATE_PARENT_KEY);return parentID||(parentElement.data(NG_ANIMATE_PARENT_KEY,++parentCounter),parentID=parentCounter),parentID+"-"+extractElementNode(element).className}function animateSetup(element,className){var cacheKey=getCacheKey(element),eventCacheKey=cacheKey+" "+className,stagger={},ii=lookupCache[eventCacheKey]?++lookupCache[eventCacheKey].total:0;if(ii>0){var staggerClassName=className+"-stagger",staggerCacheKey=cacheKey+" "+staggerClassName,applyClasses=!lookupCache[staggerCacheKey];applyClasses&&element.addClass(staggerClassName),stagger=getElementAnimationDetails(element,staggerCacheKey),applyClasses&&element.removeClass(staggerClassName)}element.addClass(className);var timings=getElementAnimationDetails(element,eventCacheKey),maxDuration=Math.max(timings.transitionDuration,timings.animationDuration);if(0===maxDuration)return element.removeClass(className),!1;var activeClassName="";return timings.transitionDuration>0?(element.addClass(NG_ANIMATE_FALLBACK_CLASS_NAME),activeClassName+=NG_ANIMATE_FALLBACK_ACTIVE_CLASS_NAME+" ",blockTransitions(element)):blockKeyframeAnimations(element),forEach(className.split(" "),function(klass,i){activeClassName+=(i>0?" ":"")+klass+"-active"}),element.data(NG_ANIMATE_CSS_DATA_KEY,{className:className,activeClassName:activeClassName,maxDuration:maxDuration,classes:className+" "+activeClassName,timings:timings,stagger:stagger,ii:ii}),!0}function blockTransitions(element){extractElementNode(element).style[TRANSITION_PROP+PROPERTY_KEY]="none"}function blockKeyframeAnimations(element){extractElementNode(element).style[ANIMATION_PROP]="none 0s"}function unblockTransitions(element){var prop=TRANSITION_PROP+PROPERTY_KEY,node=extractElementNode(element);node.style[prop]&&node.style[prop].length>0&&(node.style[prop]="")}function unblockKeyframeAnimations(element){var prop=ANIMATION_PROP,node=extractElementNode(element);node.style[prop]&&node.style[prop].length>0&&(node.style[prop]="")}function animateRun(element,className,activeAnimationComplete){function onAnimationProgress(event){event.stopPropagation();var ev=event.originalEvent||event,timeStamp=ev.$manualTimeStamp||ev.timeStamp||Date.now(),elapsedTime=parseFloat(ev.elapsedTime.toFixed(ELAPSED_TIME_MAX_DECIMAL_PLACES));Math.max(timeStamp-startTime,0)>=maxDelayTime&&elapsedTime>=maxDuration&&activeAnimationComplete()}var data=element.data(NG_ANIMATE_CSS_DATA_KEY),node=extractElementNode(element);if(-1==node.className.indexOf(className)||!data)return activeAnimationComplete(),void 0;var applyFallbackStyle,timings=data.timings,stagger=data.stagger,maxDuration=data.maxDuration,activeClassName=data.activeClassName,maxDelayTime=1e3*Math.max(timings.transitionDelay,timings.animationDelay),startTime=Date.now(),css3AnimationEvents=ANIMATIONEND_EVENT+" "+TRANSITIONEND_EVENT,ii=data.ii,style="",appliedStyles=[];
if(timings.transitionDuration>0){var propertyStyle=timings.transitionPropertyStyle;if(-1==propertyStyle.indexOf("all")){applyFallbackStyle=!0;var fallbackProperty=$sniffer.msie?"-ms-zoom":"border-spacing";style+=CSS_PREFIX+"transition-property: "+propertyStyle+", "+fallbackProperty+"; ",style+=CSS_PREFIX+"transition-duration: "+timings.transitionDurationStyle+", "+timings.transitionDuration+"s; ",appliedStyles.push(CSS_PREFIX+"transition-property"),appliedStyles.push(CSS_PREFIX+"transition-duration")}}if(ii>0){if(stagger.transitionDelay>0&&0===stagger.transitionDuration){var delayStyle=timings.transitionDelayStyle;applyFallbackStyle&&(delayStyle+=", "+timings.transitionDelay+"s"),style+=CSS_PREFIX+"transition-delay: "+prepareStaggerDelay(delayStyle,stagger.transitionDelay,ii)+"; ",appliedStyles.push(CSS_PREFIX+"transition-delay")}stagger.animationDelay>0&&0===stagger.animationDuration&&(style+=CSS_PREFIX+"animation-delay: "+prepareStaggerDelay(timings.animationDelayStyle,stagger.animationDelay,ii)+"; ",appliedStyles.push(CSS_PREFIX+"animation-delay"))}if(appliedStyles.length>0){var oldStyle=node.getAttribute("style")||"";node.setAttribute("style",oldStyle+" "+style)}return element.on(css3AnimationEvents,onAnimationProgress),element.addClass(activeClassName),function(){element.off(css3AnimationEvents,onAnimationProgress),element.removeClass(activeClassName),animateClose(element,className);var node=extractElementNode(element);for(var i in appliedStyles)node.style.removeProperty(appliedStyles[i])}}function prepareStaggerDelay(delayStyle,staggerDelay,index){var style="";return forEach(delayStyle.split(","),function(val,i){style+=(i>0?",":"")+(index*staggerDelay+parseInt(val,10))+"s"}),style}function animateBefore(element,className){return animateSetup(element,className)?function(cancelled){cancelled&&animateClose(element,className)}:void 0}function animateAfter(element,className,afterAnimationComplete){return element.data(NG_ANIMATE_CSS_DATA_KEY)?animateRun(element,className,afterAnimationComplete):(animateClose(element,className),afterAnimationComplete(),void 0)}function animate(element,className,animationComplete){var preReflowCancellation=animateBefore(element,className);if(!preReflowCancellation)return animationComplete(),void 0;var cancel=preReflowCancellation;return afterReflow(function(){unblockTransitions(element),unblockKeyframeAnimations(element),cancel=animateAfter(element,className,animationComplete)}),function(cancelled){(cancel||noop)(cancelled)}}function animateClose(element,className){element.removeClass(className),element.removeClass(NG_ANIMATE_FALLBACK_CLASS_NAME),element.removeData(NG_ANIMATE_CSS_DATA_KEY)}function suffixClasses(classes,suffix){var className="";return classes=angular.isArray(classes)?classes:classes.split(/\s+/),forEach(classes,function(klass,i){klass&&klass.length>0&&(className+=(i>0?" ":"")+klass+suffix)}),className}var TRANSITION_PROP,TRANSITIONEND_EVENT,ANIMATION_PROP,ANIMATIONEND_EVENT,CSS_PREFIX="";window.ontransitionend===undefined&&window.onwebkittransitionend!==undefined?(CSS_PREFIX="-webkit-",TRANSITION_PROP="WebkitTransition",TRANSITIONEND_EVENT="webkitTransitionEnd transitionend"):(TRANSITION_PROP="transition",TRANSITIONEND_EVENT="transitionend"),window.onanimationend===undefined&&window.onwebkitanimationend!==undefined?(CSS_PREFIX="-webkit-",ANIMATION_PROP="WebkitAnimation",ANIMATIONEND_EVENT="webkitAnimationEnd animationend"):(ANIMATION_PROP="animation",ANIMATIONEND_EVENT="animationend");var animationTimer,DURATION_KEY="Duration",PROPERTY_KEY="Property",DELAY_KEY="Delay",ANIMATION_ITERATION_COUNT_KEY="IterationCount",NG_ANIMATE_PARENT_KEY="$$ngAnimateKey",NG_ANIMATE_CSS_DATA_KEY="$$ngAnimateCSS3Data",NG_ANIMATE_FALLBACK_CLASS_NAME="ng-animate-start",NG_ANIMATE_FALLBACK_ACTIVE_CLASS_NAME="ng-animate-active",ELAPSED_TIME_MAX_DECIMAL_PLACES=3,lookupCache={},parentCounter=0,animationReflowQueue=[];return{allowCancel:function(element,animationEvent,className){var oldClasses=(element.data(NG_ANIMATE_CSS_DATA_KEY)||{}).classes;if(!oldClasses||["enter","leave","move"].indexOf(animationEvent)>=0)return!0;var parentElement=element.parent(),clone=angular.element(extractElementNode(element).cloneNode());clone.attr("style","position:absolute; top:-9999px; left:-9999px"),clone.removeAttr("id"),clone.html(""),forEach(oldClasses.split(" "),function(klass){clone.removeClass(klass)});var suffix="addClass"==animationEvent?"-add":"-remove";clone.addClass(suffixClasses(className,suffix)),parentElement.append(clone);var timings=getElementAnimationDetails(clone);return clone.remove(),Math.max(timings.transitionDuration,timings.animationDuration)>0},enter:function(element,animationCompleted){return animate(element,"ng-enter",animationCompleted)},leave:function(element,animationCompleted){return animate(element,"ng-leave",animationCompleted)},move:function(element,animationCompleted){return animate(element,"ng-move",animationCompleted)},beforeAddClass:function(element,className,animationCompleted){var cancellationMethod=animateBefore(element,suffixClasses(className,"-add"));return cancellationMethod?(afterReflow(function(){unblockTransitions(element),unblockKeyframeAnimations(element),animationCompleted()}),cancellationMethod):(animationCompleted(),void 0)},addClass:function(element,className,animationCompleted){return animateAfter(element,suffixClasses(className,"-add"),animationCompleted)},beforeRemoveClass:function(element,className,animationCompleted){var cancellationMethod=animateBefore(element,suffixClasses(className,"-remove"));return cancellationMethod?(afterReflow(function(){unblockTransitions(element),unblockKeyframeAnimations(element),animationCompleted()}),cancellationMethod):(animationCompleted(),void 0)},removeClass:function(element,className,animationCompleted){return animateAfter(element,suffixClasses(className,"-remove"),animationCompleted)}}}])}])}(window,window.angular);