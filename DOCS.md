## Modules

<dl>
<dt><a href="#module_core/utils">core/utils</a></dt>
<dd><p>General use helper methods. Nothing in this module should have outside dependecies (unless they are passed in).</p></dd>
</dl>

## Classes

<dl>
<dt><a href="#Widget">Widget</a></dt>
<dd><p>Widget baseclass</p></dd>
</dl>

<a name="module_core/utils"></a>

## core/utils
<p>General use helper methods. Nothing in this module should have outside dependecies (unless they are passed in).</p>


* [core/utils](#module_core/utils)
    * [~logger](#module_core/utils..logger)
    * [~isDeveloper()](#module_core/utils..isDeveloper) ⇒ <code>string</code> \| <code>boolean</code>
    * [~discover(fqpath, [container])](#module_core/utils..discover) ⇒ <code>object</code> \| <code>null</code>
    * [~createLogger(prefix)](#module_core/utils..createLogger) ⇒ <code>Object</code>
    * [~intersection(arr1, arr2)](#module_core/utils..intersection) ⇒ <code>Array</code>
    * [~dispatch(data, [signal])](#module_core/utils..dispatch)

<a name="module_core/utils..logger"></a>

### core/utils~logger
<p>default logger</p>

**Kind**: inner constant of [<code>core/utils</code>](#module_core/utils)  
**Example**  
```js
logger.log("whatever", object);
// logs:
// "[FDFW]" "whatever" object
```
<a name="module_core/utils..isDeveloper"></a>

### core/utils~isDeveloper() ⇒ <code>string</code> \| <code>boolean</code>
<p>Helper method to check if developer cookie is set</p>

**Kind**: inner method of [<code>core/utils</code>](#module_core/utils)  
<a name="module_core/utils..discover"></a>

### core/utils~discover(fqpath, [container]) ⇒ <code>object</code> \| <code>null</code>
<p>Discovers a function/attribute under the fully qualified path</p>

**Kind**: inner method of [<code>core/utils</code>](#module_core/utils)  
**Returns**: <code>object</code> \| <code>null</code> - <ul>
<li>The discovered member or null if fqpath is not found</li>
</ul>  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| fqpath | <code>string</code> |  | <p>the fully qualified (dotted) path of the object/function</p> |
| [container] | <code>string</code> | <code>&quot;window&quot;</code> | <p>the starting container</p> |

**Example**  
```js
window.cica = { mokus: 12 };
//now check if it exists with discover
console.log(discover('cica.mokus'));
// 12
```
<a name="module_core/utils..createLogger"></a>

### core/utils~createLogger(prefix) ⇒ <code>Object</code>
<p>create logger instance with given prefix</p>

**Kind**: inner method of [<code>core/utils</code>](#module_core/utils)  
**Returns**: <code>Object</code> - <p>logger instance</p>  

| Param | Type | Description |
| --- | --- | --- |
| prefix | <code>string</code> | <p>log prefix</p> |

**Example**  
```js
let logger = createLogger(["!!!", "PREFIX"]);
logger.log("cica");
// logs:
// !!! PREFIX cica
```
<a name="module_core/utils..intersection"></a>

### core/utils~intersection(arr1, arr2) ⇒ <code>Array</code>
<p>intersection (shared items) of two arrays</p>

**Kind**: inner method of [<code>core/utils</code>](#module_core/utils)  
**Returns**: <code>Array</code> - <p>shared items</p>  

| Param | Type | Description |
| --- | --- | --- |
| arr1 | <code>Array</code> | <p>first array</p> |
| arr2 | <code>Array</code> | <p>second array</p> |

**Example**  
```js
let isec = intersection([1, 2, 3], [2, 3, 4]);
// isec === [2, 3]
```
<a name="module_core/utils..dispatch"></a>

### core/utils~dispatch(data, [signal])
<p>dispatch data to the widgets</p>

**Kind**: inner method of [<code>core/utils</code>](#module_core/utils)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> |  |
| [signal] | <code>string</code> | <p>signal to use</p> |

<a name="Widget"></a>

## Widget
<p>Widget baseclass</p>

**Kind**: global class  

* [Widget](#Widget)
    * [new Widget(cfg)](#new_Widget_new)
    * _instance_
        * [.init()](#Widget+init)
        * [.preprocess(data)](#Widget+preprocess) ⇒ <code>Object</code>
        * [.renderContent(data)](#Widget+renderContent) ⇒ <code>string</code>
        * [.process(data)](#Widget+process)
        * [.render()](#Widget+render)
    * _static_
        * [.properties](#Widget.properties)
        * [.styles](#Widget.styles)

<a name="new_Widget_new"></a>

### new Widget(cfg)
<p>Create a widget</p>


| Param | Type | Description |
| --- | --- | --- |
| cfg | <code>Object</code> | <p>configuration</p> <blockquote> <p><code>cfg</code> may have:</p> </blockquote> <ul> <li><code>name</code> - widget name</li> <li><code>signal</code> - signal name or list of signal names</li> <li><code>template</code> - template to render (<code>function</code> or <code>function name as dotted path</code></li> <li><code>placeholder</code> - DOM element to render the widget into</li> </ul> |

<a name="Widget+init"></a>

### widget.init()
<p>Initialize widget - add event listeners and such</p>
<p>Implement in subclasses, call <code>super.init()</code> at the beginning of the method.</p>

**Kind**: instance method of [<code>Widget</code>](#Widget)  
<a name="Widget+preprocess"></a>

### widget.preprocess(data) ⇒ <code>Object</code>
<p>Preprocess data to be easily renderable by the <code>template</code></p>

**Kind**: instance method of [<code>Widget</code>](#Widget)  
**Returns**: <code>Object</code> - <p>transformed data</p>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | <p>data to transform</p> |

<a name="Widget+renderContent"></a>

### widget.renderContent(data) ⇒ <code>string</code>
<p>Renders the <code>template</code> with the provided <code>data</code></p>

**Kind**: instance method of [<code>Widget</code>](#Widget)  
**Returns**: <code>string</code> - <p>the rendered content</p>  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | <p>data for the template</p> |

<a name="Widget+process"></a>

### widget.process(data)
<p>Called with the event's <code>data</code> if <code>signal</code> matches</p>

**Kind**: instance method of [<code>Widget</code>](#Widget)  

| Param | Type | Description |
| --- | --- | --- |
| data | <code>Object</code> | <p>By default renders the <code>template</code> into the <slot> of the component with <code>data</code>, if they are defined.</p> |

<a name="Widget+render"></a>

### widget.render()
<p>WebComponent render method</p>

**Kind**: instance method of [<code>Widget</code>](#Widget)  
<a name="Widget.properties"></a>

### Widget.properties
<p>WebComponent properties</p>

**Kind**: static property of [<code>Widget</code>](#Widget)  
<a name="Widget.styles"></a>

### Widget.styles
<p>WebComponent scoped style</p>

**Kind**: static property of [<code>Widget</code>](#Widget)  
