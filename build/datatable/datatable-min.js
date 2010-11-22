YUI.add("datatable-base",function(D){var V=D.Lang,f=D.Lang.substitute,E=D.Node,T=E.create,P=D.ClassNameManager.getClassName,Q="datatable",R="column",h="focus",k="keydown",H="mouseenter",O="mouseleave",K="mouseup",X="mousedown",c="click",C="doubleclick",F=P(Q,"columns"),b=P(Q,"data"),B=P(Q,"msg"),L=P(Q,"liner"),e=P(Q,"first"),I=P(Q,"last"),U=P(Q,"even"),a=P(Q,"odd"),d="<table></table>",W="<col></col>",i='<thead class="'+F+'"></thead>',G='<tbody class="'+b+'"></tbody>',j='<th id="{id}" rowspan="{rowspan}" colspan="{colspan}" class="{classnames}"><div class="'+L+'">{value}</div></th>',g='<tr id="{id}"></tr>',A='<td headers="{headers}" class="{classnames}"><div class="'+L+'">{value}</div></td>',J="{value}",N='<tbody class="'+B+'"></tbody>';function M(Y){M.superclass.constructor.apply(this,arguments);}D.mix(M,{NAME:"column",ATTRS:{id:{valueFn:"_defaultId",writeOnce:true},key:{valueFn:"_defaultKey"},field:{valueFn:"_defaultField"},label:{valueFn:"_defaultLabel"},keyIndex:{readOnly:true},parent:{readOnly:true},children:{},colSpan:{readOnly:true},rowSpan:{readOnly:true},thNode:{readOnly:true},thLinerNode:{readOnly:true},thLabelNode:{readOnly:true},abbr:{value:null},headers:{},classnames:{readOnly:true,getter:"_getClassnames"},editor:{},formatter:{},resizeable:{},sortable:{},hidden:{},width:{},minWidth:{},maxAutoWidth:{}}});D.extend(M,D.Widget,{_defaultId:function(){return D.guid();},_defaultKey:function(Y){return Y||D.guid();},_defaultField:function(Y){return Y||this.get("key");},_defaultLabel:function(Y){return Y||this.get("key");},_afterAbbrChange:function(Y){this._uiSetAbbr(Y.newVal);},initializer:function(Y){},destructor:function(){},_getClassnames:function(){return D.ClassNameManager.getClassName(R,this.get("id"));},syncUI:function(){this._uiSetAbbr(this.get("abbr"));},_uiSetAbbr:function(Y){this._thNode.set("abbr",Y);}});D.Column=M;function Z(Y){Z.superclass.constructor.apply(this,arguments);}D.mix(Z,{NAME:"columnset",ATTRS:{definitions:{setter:"_setDefinitions"},tree:{readOnly:true,value:[]},flat:{readOnly:true,value:[]},hash:{readOnly:true,value:{}},keys:{readOnly:true,value:[]}}});D.extend(Z,D.Base,{_setDefinitions:function(Y){return D.clone(Y);},initializer:function(){var Y=[],q=[],p={},o=[],n=this.get("definitions"),l=this;function m(y,x,w){var t=0,s=x.length,v,u,r;y++;if(!Y[y]){Y[y]=[];}for(;t<s;++t){v=x[t];v=V.isString(v)?{key:v}:v;u=new D.Column(v);v.yuiColumnId=u.get("id");q.push(u);p[u.get("id")]=u;if(w){u._set("parent",w);}if(V.isArray(v.children)){r=v.children;u._set("children",r);l._setColSpans(u,v);l._cascadePropertiesToChildren(u,r);if(!Y[y+1]){Y[y+1]=[];}m(y,r,u);}else{u._set("keyIndex",o.length);u._set("colSpan",1);o.push(u);}Y[y].push(u);}y--;}m(-1,n);this._set("tree",Y);this._set("flat",q);this._set("hash",p);this._set("keys",o);this._setRowSpans();this._setHeaders();},destructor:function(){},_cascadePropertiesToChildren:function(n,l){var m=0,Y=l.length,o;for(;m<Y;++m){o=l[m];if(n.get("className")&&(o.className===undefined)){o.className=n.get("className");}if(n.get("editor")&&(o.editor===undefined)){o.editor=n.get("editor");}if(n.get("formatter")&&(o.formatter===undefined)){o.formatter=n.get("formatter");}if(n.get("resizeable")&&(o.resizeable===undefined)){o.resizeable=n.get("resizeable");}if(n.get("sortable")&&(o.sortable===undefined)){o.sortable=n.get("sortable");}if(n.get("hidden")){o.hidden=true;}if(n.get("width")&&(o.width===undefined)){o.width=n.get("width");}if(n.get("minWidth")&&(o.minWidth===undefined)){o.minWidth=n.get("minWidth");}if(n.get("maxAutoWidth")&&(o.maxAutoWidth===undefined)){o.maxAutoWidth=n.get("maxAutoWidth");}}},_setColSpans:function(m,l){var n=0;function Y(q){var r=q.children,p=0,o=r.length;for(;p<o;++p){if(V.isArray(r[p].children)){Y(r[p]);}else{n++;}}}Y(l);m._set("colSpan",n);},_setRowSpans:function(){function Y(n){var o=1,r,q,l,t;function s(w,v){v=v||1;var u=0,m=w.length,p;for(;u<m;++u){p=w[u];if(V.isArray(p.children)){v++;s(p.children,v);v--;}else{if(p.get&&V.isArray(p.get("children"))){v++;s(p.get("children"),v);v--;}else{if(v>o){o=v;}}}}}for(l=0;l<n.length;l++){r=n[l];s(r);for(t=0;t<r.length;t++){q=r[t];if(!V.isArray(q.get("children"))){q._set("rowSpan",o);}else{q._set("rowSpan",1);}}o=1;}}Y(this.get("tree"));},_setHeaders:function(){var p,n,m=this.get("keys"),l=0,Y=m.length;function o(r,q){r.push(q.get("key"));if(q.get("parent")){o(r,q.get("parent"));}}for(;l<Y;++l){p=[];n=m[l];o(p,n);n._set("headers",p.reverse().join(" "));}},getColumn:function(){}});D.Columnset=Z;function S(Y){S.superclass.constructor.apply(this,arguments);}D.mix(S,{NAME:"dataTable",ATTRS:{columnset:{setter:"_setColumnset"},recordset:{value:new D.Recordset({records:[]}),setter:"_setRecordset"},strings:{valueFn:function(){return D.Intl.get("datatable-base");}},thValueTemplate:{value:J},tdValueTemplate:{value:J},trTemplate:{value:g}},HTML_PARSER:{}});D.extend(S,D.Widget,{thTemplate:j,tdTemplate:A,_theadNode:null,_tbodyNode:null,_msgNode:null,_setColumnset:function(Y){return V.isArray(Y)?new D.Columnset({definitions:Y}):Y;},_setRecordset:function(Y){if(V.isArray(Y)){Y=new D.Recordset({records:Y});}Y.addTarget(this);return Y;},_afterColumnsetChange:function(Y){this._uiSetColumnset(Y.newVal);},_afterRecordsetChange:function(Y){this._uiSetRecordset(Y.newVal);},_afterStringsChange:function(Y){this._uiSetStrings(Y.newVal);},initializer:function(Y){this.after("columnsetChange",this._afterColumnsetChange);this.after("recordsetChange",this._afterRecordsetChange);},destructor:function(){this.get("recordset").removeTarget(this);},renderUI:function(){return(this._addTableNode(this.get("contentBox"))&&this._addColgroupNode(this._tableNode)&&this._addTheadNode(this._tableNode)&&this._addTbodyNode(this._tableNode)&&this._addMessageNode(this._tableNode)&&this._addCaptionNode(this._tableNode));},_addTableNode:function(Y){if(!this._tableNode){this._tableNode=Y.appendChild(T(d));}return this._tableNode;},_addColgroupNode:function(m){var Y=this.get("columnset").get("keys").length,l=0,n=["<colgroup>"];
for(;l<Y;++l){n.push(W);}n.push("</colgroup>");this._colgroupNode=m.insertBefore(T(n.join("")),m.get("firstChild"));return this._colgroupNode;},_addTheadNode:function(Y){if(Y){this._theadNode=Y.insertBefore(T(i),this._colgroupNode.next());return this._theadNode;}},_addTbodyNode:function(Y){this._tbodyNode=Y.appendChild(T(G));return this._tbodyNode;},_addMessageNode:function(Y){this._msgNode=Y.insertBefore(T(N),this._tbodyNode);return this._msgNode;},_addCaptionNode:function(Y){this._captionNode=Y.invoke("createCaption");return this._captionNode;},bindUI:function(){var o=this._tableNode,l=this.get("contentBox"),m="thead."+F+">tr>th",n="tbody."+b+">tr>td",Y="tbody."+B+">tr>td";this.publish("theadCellClick",{defaultFn:this._defTheadCellClickFn,emitFacade:false,queuable:true});this.publish("theadRowClick",{defaultFn:this._defTheadRowClickFn,emitFacade:false,queuable:true});this.publish("theadClick",{defaultFn:this._defTheadClickFn,emitFacade:false,queuable:true});this.publish("theadCellMouseenter",{defaultFn:this._defTheadCellMouseenterFn,emitFacade:false,queuable:true});this.publish("theadRowMouseenter",{defaultFn:this._defTheadRowMouseenterFn,emitFacade:false,queuable:true});this.publish("theadMouseenter",{defaultFn:this._defTheadMouseenterFn,emitFacade:false,queuable:true});this.publish("tbodyCellClick",{defaultFn:this._defTbodyCellClickFn,emitFacade:false,queuable:true});this.publish("tbodyRowClick",{defaultFn:this._defTbodyRowClickFn,emitFacade:false,queuable:true});this.publish("tbodyClick",{defaultFn:this._defTbodyClickFn,emitFacade:false,queuable:true});o.delegate(h,this._onDomEvent,m,this,"theadCellFocus");o.delegate(k,this._onDomEvent,m,this,"theadCellKeydown");o.delegate(H,this._onDomEvent,m,this,"theadCellMouseenter");o.delegate(O,this._onDomEvent,m,this,"theadCellMouseleave");o.delegate(K,this._onDomEvent,m,this,"theadCellMouseup");o.delegate(X,this._onDomEvent,m,this,"theadCellMousedown");o.delegate(c,this._onDomEvent,m,this,"theadCellClick");l.delegate(C,this._onEvent,m,this,"theadCellDoubleclick");o.delegate(h,this._onDomEvent,n,this,"tbodyCellFocus");o.delegate(k,this._onDomEvent,n,this,"tbodyCellKeydown");o.delegate(H,this._onDomEvent,n,this,"tbodyCellMouseenter");o.delegate(O,this._onDomEvent,n,this,"tbodyCellMouseleave");o.delegate(K,this._onDomEvent,n,this,"tbodyCellMouseup");o.delegate(X,this._onDomEvent,n,this,"tbodyCellMousedown");o.delegate(c,this._onDomEvent,n,this,"tbodyCellClick");l.delegate(C,this._onEvent,n,this,"tbodyCellDoubleclick");o.delegate(h,this._onDomEvent,Y,this,"msgCellFocus");o.delegate(k,this._onDomEvent,Y,this,"msgCellKeydown");o.delegate(H,this._onDomEvent,Y,this,"msgCellMouseenter");o.delegate(O,this._onDomEvent,Y,this,"msgCellMouseleave");o.delegate(K,this._onDomEvent,Y,this,"msgCellMouseup");o.delegate(X,this._onDomEvent,Y,this,"msgCellMousedown");o.delegate(c,this._onDomEvent,Y,this,"msgCellClick");l.delegate(C,this._onDomEvent,Y,this,"msgCellDoubleclick");},_onDomEvent:function(l,Y){this.fire(Y,l);},_defTheadCellClickFn:function(Y){this.fire("theadRowClick",Y);},_defTheadRowClickFn:function(Y){this.fire("theadClick",Y);},_defTheadClickFn:function(Y){},syncUI:function(){this._uiSetColumnset(this.get("columnset"));this._uiSetRecordset(this.get("recordset"));this._uiSetStrings(this.get("strings"));},_uiSetStrings:function(Y){this._uiSetSummary(Y.summary);this._uiSetCaption(Y.caption);},_uiSetSummary:function(Y){this._tableNode.set("summary",Y);},_uiSetCaption:function(Y){this._captionNode.setContent(Y);},_uiSetColumnset:function(o){var l=o.get("tree"),q=this._theadNode,m=0,Y=l.length,n=q.get("parentNode"),p=q.next();q.remove();q.get("children").remove(true);for(;m<Y;++m){this._addTheadTrNode({thead:q,columns:l[m]},(m===0),(m===Y-1));}n.insert(q,p);},_addTheadTrNode:function(m,Y,l){m.tr=this._createTheadTrNode(m,Y,l);this._attachTheadTrNode(m);},_createTheadTrNode:function(s,l,r){var q=T(f(this.get("trTemplate"),s)),n=0,m=s.columns,Y=m.length,p;if(l){q.addClass(e);}if(r){q.addClass(I);}for(;n<Y;++n){p=m[n];this._addTheadThNode({value:p.get("label"),column:p,tr:q});}return q;},_attachTheadTrNode:function(Y){Y.thead.appendChild(Y.tr);},_addTheadThNode:function(Y){Y.th=this._createTheadThNode(Y);this._attachTheadThNode(Y);},_createTheadThNode:function(l){var Y=l.column;l.id=Y.get("id");l.colspan=Y.get("colSpan");l.rowspan=Y.get("rowSpan");l.classnames=Y.get("classnames");l.value=f(this.get("thValueTemplate"),l);return T(f(this.thTemplate,l));},_attachTheadThNode:function(Y){Y.tr.appendChild(Y.th);},_uiSetRecordset:function(l){var n=0,Y=l.getLength(),m=this._tbodyNode,p=m.get("parentNode"),q=m.next(),r={tbody:m};m.remove();for(;n<Y;++n){r.record=l.getRecord(n);r.rowindex=n;this._addTbodyTrNode(r);}p.insert(m,q);},_addTbodyTrNode:function(m){var l=m.tbody,Y=m.record;m.tr=l.one("#"+Y.get("id"))||this._createTbodyTrNode(m);this._attachTbodyTrNode(m);},_createTbodyTrNode:function(p){var n=T(f(this.get("trTemplate"),{id:p.record.get("id")})),l=0,m=this.get("columnset").get("keys"),Y=m.length;p.tr=n;for(;l<Y;++l){p.column=m[l];this._addTbodyTdNode(p);}return n;},_attachTbodyTrNode:function(p){var l=p.tbody,n=p.tr,Y=p.rowindex,m=l.get("children").item(Y)||null,q=(Y%2===0);if(q){n.replaceClass(a,U);}else{n.replaceClass(U,a);}l.insertBefore(n,m);},_addTbodyTdNode:function(Y){Y.td=this._createTbodyTdNode(Y);this._attachTbodyTdNode(Y);},_createTbodyTdNode:function(l){var Y=l.column;l.headers=Y.get("headers");l.classnames=Y.get("classnames");l.value=this.formatDataCell(l);return T(f(this.tdTemplate,l));},_attachTbodyTdNode:function(Y){Y.tr.appendChild(Y.td);},formatDataCell:function(l){var Y=l.record;l.data=Y.get("data");l.value=Y.getValue(l.column.get("key"));return f(this.get("tdValueTemplate"),l);}});D.namespace("DataTable").Base=S;},"@VERSION@",{lang:["en"],requires:["intl","substitute","widget","recordset-base"]});YUI.add("datatable-datasource",function(C){var B=C.ClassNameManager.getClassName;function A(){A.superclass.constructor.apply(this,arguments);}C.mix(A,{NS:"datasource",NAME:"dataTableDataSource",ATTRS:{datasource:{setter:"_setDataSource"},initialRequest:{setter:"_setInitialRequest"}}});
C.extend(A,C.Plugin.Base,{_setDataSource:function(E){var D=this.get("host");return E||new C.DataSource.Local(E);},_setInitialRequest:function(D){},initializer:function(D){if(D.initialRequest){this.load();}},load:function(D){D=D||{};D.request=D.request||this.get("initialRequest");D.callback=D.callback||{success:C.bind(this.onDataReturnInitializeTable,this),failure:C.bind(this.onDataReturnInitializeTable,this),argument:this.get("host").get("state")};var E=(D.datasource||this.get("datasource"));if(E){E.sendRequest(D);}},onDataReturnInitializeTable:function(D){this.get("host").set("recordset",new C.Recordset({records:D.response.results}));}});C.namespace("Plugin").DataTableDataSource=A;},"@VERSION@",{requires:["plugin","datatable-base","datasource-local"]});YUI.add("datatable-sort",function(A){var H=A.ClassNameManager.getClassName,I="datatable",B="asc",D="desc",C=H(I,"asc"),E=H(I,"desc"),F=H(I,"sortable"),J='<a class="{link_class}" title="{link_title}" href="{link_href}">{value}</a>';function G(){G.superclass.constructor.apply(this,arguments);}A.mix(G,{NS:"sort",NAME:"dataTableSort",ATTRS:{trigger:{value:"theadCellClick",writeOnce:"initOnly"},lastSortedBy:{value:null},template:{value:J}}});A.extend(G,A.Plugin.Base,{initializer:function(K){var L=this.get("host");L.get("recordset").plug(A.Plugin.RecordsetSort,{dt:L});L.get("recordset").sort.addTarget(L);this.doBefore("_createTheadThNode",this._beforeCreateTheadThNode);this.doBefore("_attachTheadThNode",function(M){if(M.column.get("sortable")){M.th.addClass(F);}});L.on(this.get("trigger"),A.bind(this._onEventSortColumn,this));L.after("recordsetSort:sort",function(){L._uiSetRecordset(L.get("recordset"));});L.after("lastSortedByChangeEvent",function(){});if(L.get("rendered")){L._uiSetColumnset(L.get("columnset"));}},_beforeCreateTheadThNode:function(K){if(K.column.get("sortable")){K.value=A.substitute(this.get("template"),{link_class:"foo",link_title:"bar",link_href:"bat",value:K.value});}},_onEventSortColumn:function(O){O.halt();var M=this.get("host"),L=M.get("columnset").get("hash")[O.currentTarget.get("id")],N=L.get("field"),P=this.get("lastSortedBy"),K=(P&&P.field===N&&P.dir===B)?D:B,Q=L.get("sortFn");if(L.get("sortable")){M.get("recordset").sort.sort(N,K===D,Q);this.set("lastSortedBy",{field:N,dir:K});}}});A.namespace("Plugin").DataTableSort=G;},"@VERSION@",{requires:["plugin","datatable-base","recordset-sort"],lang:["en"]});YUI.add("datatable-scroll",function(B){var L=B.Do,M=B.Node,J=B.Lang,O=B.UA,C=B.StyleSheet,F=B.ClassNameManager.getClassName,N="datatable",A=F(N,"hd"),E=F(N,"bd"),K=F(N,"liner"),I=F(N,"scrollable"),H='<div class="'+A+'"></div>',D='<div class="'+E+'"></div>',G="<table></table>";function P(){P.superclass.constructor.apply(this,arguments);}B.mix(P,{NS:"scroll",NAME:"dataTableScroll",ATTRS:{width:{value:undefined},height:{value:undefined},scroll:{value:"y"},COLOR_COLUMNFILLER:{value:"#f2f2f2",validator:J.isString,setter:function(Q){if(this._headerContainerNode){this._headerContainerNode.setStyle("backgroundColor",Q);}}}}});B.extend(P,B.Plugin.Base,{_parentTableNode:null,_parentTheadNode:null,_parentTbodyNode:null,_parentMsgNode:null,_parentContainer:null,_bodyContainerNode:null,_headerContainerNode:null,initializer:function(Q){var R=this.get("host");this._parentContainer=R.get("contentBox");this._parentContainer.addClass(I);this._setUpNodes();},_setUpNodes:function(){var Q=this.get("host");this.afterHostMethod("_addTableNode",this._setUpParentTableNode);this.afterHostMethod("_addTheadNode",this._setUpParentTheadNode);this.afterHostMethod("_addTbodyNode",this._setUpParentTbodyNode);this.afterHostMethod("_addMessageNode",this._setUpParentMessageNode);this.afterHostMethod("renderUI",this.renderUI);this.afterHostMethod("syncUI",this.syncUI);if(this.get("scroll")!=="x"){this.afterHostMethod("_attachTheadThNode",this._attachTheadThNode);this.afterHostMethod("_attachTbodyTdNode",this._attachTbodyTdNode);}},_setUpParentTableNode:function(){this._parentTableNode=this.get("host")._tableNode;},_setUpParentTheadNode:function(){this._parentTheadNode=this.get("host")._theadNode;},_setUpParentTbodyNode:function(){this._parentTbodyNode=this.get("host")._tbodyNode;},_setUpParentMessageNode:function(){this._parentMsgNode=this.get("host")._msgNode;},renderUI:function(){this._createBodyContainer();this._createHeaderContainer();this._setContentBoxDimensions();},syncUI:function(){this._syncWidths();this._syncScroll();},_syncWidths:function(){var R=M.all("#"+this._parentContainer.get("id")+" .yui3-datatable-hd table thead th"),S=M.one("#"+this._parentContainer.get("id")+" .yui3-datatable-bd table .yui3-datatable-data").get("firstChild").get("children"),T,W,Y,V,X,U,Q=O.ie;for(T=0,W=R.size();T<W;T++){X=R.item(T).get("firstChild");U=S.item(T).get("firstChild");if(!Q){Y=X.get("clientWidth");V=S.item(T).get("clientWidth");}else{Y=X.get("offsetWidth");V=S.item(T).get("offsetWidth");}if(Y>V){U.setStyle("width",(Y-20+"px"));}else{if(V>Y){X.setStyle("width",(V-20+"px"));}}}if(Q&&this.get("scroll")==="y"&&this._bodyContainerNode.get("scrollHeight")>this._bodyContainerNode.get("offsetHeight")){this._headerContainerNode.setStyle("width",this._parentContainer.get("offsetWidth")+15+"px");}},_attachTheadThNode:function(R){var Q=R.column.get("width")||"auto";if(Q!=="auto"){R.th.get("firstChild").setStyles({"width":Q,"overflow":"hidden"});}return R;},_attachTbodyTdNode:function(R){var Q=R.column.get("width")||"auto";if(Q!=="auto"){R.td.get("firstChild").setStyles({"width":Q,"overflow":"hidden"});}return R;},_createBodyContainer:function(){var R=M.create(D),Q=B.bind("_onScroll",this);this._bodyContainerNode=R;this._setStylesForTbody();R.appendChild(this._parentTableNode);this._parentContainer.appendChild(R);R.on("scroll",Q);},_createHeaderContainer:function(){var R=M.create(H),Q=M.create(G);this._headerContainerNode=R;this._setStylesForThead();Q.appendChild(this._parentTheadNode);R.appendChild(Q);this._parentContainer.prepend(R);},_setStylesForTbody:function(){var R=this.get("scroll"),Q=this.get("width")||"",T=this.get("height")||"",S=this._bodyContainerNode,U={"width":"","height":T};
if(R==="x"){U["overflowY"]="hidden";U["width"]=Q;}else{if(R==="y"){U["overflowX"]="hidden";}else{U["width"]=Q;}}S.setStyles(U);return S;},_setStylesForThead:function(){var R=this.get("scroll"),Q=this.get("width")||"",S=this._headerContainerNode;S.setStyles({"width":Q,"overflow":"hidden"});},_setContentBoxDimensions:function(){if(this.get("scroll")==="y"||(!this.get("width"))){this._parentContainer.setStyle("width","auto");}},_onScroll:function(){this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));},_syncScroll:function(){this._syncScrollX();this._syncScrollY();this._syncScrollOverhang();if(O.opera){this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));if(!this.get("width")){document.body.style+="";}}},_syncScrollY:function(){var Q=this._parentTbodyNode,S=this._bodyContainerNode,R;if(!this.get("width")){R=(S.get("scrollHeight")>S.get("clientHeight"))?(Q.get("parentNode").get("clientWidth")+19)+"px":(Q.get("parentNode").get("clientWidth")+2)+"px";this._parentContainer.setStyle("width",R);}},_syncScrollX:function(){var Q=this._parentTbodyNode,S=this._bodyContainerNode,R;this._headerContainerNode.set("scrollLeft",this._bodyContainerNode.get("scrollLeft"));if(!this.get("height")&&(O.ie)){R=(S.get("scrollWidth")>S.get("offsetWidth"))?(Q.get("parentNode").get("offsetHeight")+18)+"px":Q.get("parentNode").get("offsetHeight")+"px";S.setStyle("height",R);}if(Q.get("rows").length===0){this._parentMsgNode.get("parentNode").setStyle("width",this._parentTheadNode.get("parentNode").get("offsetWidth")+"px");}else{this._parentMsgNode.get("parentNode").setStyle("width","");}},_syncScrollOverhang:function(){var Q=this._bodyContainerNode,R=1;if((Q.get("scrollHeight")>Q.get("clientHeight"))||(Q.get("scrollWidth")>Q.get("clientWidth"))){R=18;}this._setOverhangValue(R);},_setOverhangValue:function(R){var T=this.get("host"),V=T.get("columnset").get("definitions"),Q=V.length,U=R+"px solid "+this.get("COLOR_COLUMNFILLER"),S=M.all("#"+this._parentContainer.get("id")+" ."+A+" table thead th");S.item(Q-1).setStyle("borderRight",U);}});B.namespace("Plugin").DataTableScroll=P;},"@VERSION@",{requires:["plugin","datatable-base","stylesheet"]});YUI.add("datatable",function(A){},"@VERSION@",{use:["datatable-base","datatable-datasource","datatable-sort","datatable-scroll"]});