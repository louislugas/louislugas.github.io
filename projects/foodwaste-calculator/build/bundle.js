
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        node.parentNode.removeChild(node);
    }
    function destroy_each(iterations, detaching) {
        for (let i = 0; i < iterations.length; i += 1) {
            if (iterations[i])
                iterations[i].d(detaching);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function empty() {
        return text('');
    }
    function listen(node, event, handler, options) {
        node.addEventListener(event, handler, options);
        return () => node.removeEventListener(event, handler, options);
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function to_number(value) {
        return value === '' ? null : +value;
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function set_input_value(input, value) {
        input.value = value == null ? '' : value;
    }
    function select_option(select, value) {
        for (let i = 0; i < select.options.length; i += 1) {
            const option = select.options[i];
            if (option.__value === value) {
                option.selected = true;
                return;
            }
        }
        select.selectedIndex = -1; // no option should be selected
    }
    function select_value(select) {
        const selected_option = select.querySelector(':checked') || select.options[0];
        return selected_option && selected_option.__value;
    }
    function custom_event(type, detail, bubbles = false) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, false, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }
    function get_current_component() {
        if (!current_component)
            throw new Error('Function called outside component initialization');
        return current_component;
    }
    function createEventDispatcher() {
        const component = get_current_component();
        return (type, detail) => {
            const callbacks = component.$$.callbacks[type];
            if (callbacks) {
                // TODO are there situations where events could be dispatched
                // in a server (non-DOM) environment?
                const event = custom_event(type, detail);
                callbacks.slice().forEach(fn => {
                    fn.call(component, event);
                });
            }
        };
    }
    // TODO figure out if we still want to support
    // shorthand events, or if we want to implement
    // a real bubbling mechanism
    function bubble(component, event) {
        const callbacks = component.$$.callbacks[event.type];
        if (callbacks) {
            // @ts-ignore
            callbacks.slice().forEach(fn => fn.call(this, event));
        }
    }

    const dirty_components = [];
    const binding_callbacks = [];
    const render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    function add_flush_callback(fn) {
        flush_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            while (flushidx < dirty_components.length) {
                const component = dirty_components[flushidx];
                flushidx++;
                set_current_component(component);
                update(component.$$);
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
    }

    function bind(component, name, callback) {
        const index = component.$$.props[name];
        if (index !== undefined) {
            component.$$.bound[index] = callback;
            callback(component.$$.ctx[index]);
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, on_mount, on_destroy, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = on_mount.map(run).filter(is_function);
                if (on_destroy) {
                    on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: null,
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.46.4' }, detail), true));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function listen_dev(node, event, handler, options, has_prevent_default, has_stop_propagation) {
        const modifiers = options === true ? ['capture'] : options ? Array.from(Object.keys(options)) : [];
        if (has_prevent_default)
            modifiers.push('preventDefault');
        if (has_stop_propagation)
            modifiers.push('stopPropagation');
        dispatch_dev('SvelteDOMAddEventListener', { node, event, handler, modifiers });
        const dispose = listen(node, event, handler, options);
        return () => {
            dispatch_dev('SvelteDOMRemoveEventListener', { node, event, handler, modifiers });
            dispose();
        };
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function prop_dev(node, property, value) {
        node[property] = value;
        dispatch_dev('SvelteDOMSetProperty', { node, property, value });
    }
    function set_data_dev(text, data) {
        data = '' + data;
        if (text.wholeText === data)
            return;
        dispatch_dev('SvelteDOMSetData', { node: text, data });
        text.data = data;
    }
    function validate_each_argument(arg) {
        if (typeof arg !== 'string' && !(arg && typeof arg === 'object' && 'length' in arg)) {
            let msg = '{#each} only iterates over array-like objects.';
            if (typeof Symbol === 'function' && arg && Symbol.iterator in arg) {
                msg += ' You can use a spread to convert this iterable into an array.';
            }
            throw new Error(msg);
        }
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Login.svelte generated by Svelte v3.46.4 */

    const file$7 = "src\\Login.svelte";

    // (6:0) {#if page == 1}
    function create_if_block$6(ctx) {
    	let div2;
    	let img;
    	let img_src_value;
    	let t0;
    	let div1;
    	let div0;
    	let h1;
    	let t2;
    	let p;
    	let t4;
    	let input;
    	let t5;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			img = element("img");
    			t0 = space();
    			div1 = element("div");
    			div0 = element("div");
    			h1 = element("h1");
    			h1.textContent = "Berapa Banyak Makanan yang Kamu Buang Kemarin?";
    			t2 = space();
    			p = element("p");
    			p.textContent = "Mari kita cari tahu";
    			t4 = space();
    			input = element("input");
    			t5 = space();
    			button = element("button");
    			button.textContent = "Mulai";
    			if (!src_url_equal(img.src, img_src_value = "./images/login-bg.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "food waste calculator background");
    			attr_dev(img, "class", "svelte-1ebjeif");
    			add_location(img, file$7, 7, 4, 119);
    			attr_dev(h1, "class", "svelte-1ebjeif");
    			add_location(h1, file$7, 10, 12, 263);
    			attr_dev(div0, "class", "title svelte-1ebjeif");
    			add_location(div0, file$7, 9, 8, 230);
    			attr_dev(p, "class", "svelte-1ebjeif");
    			add_location(p, file$7, 12, 8, 344);
    			attr_dev(input, "type", "text");
    			attr_dev(input, "name", "nama");
    			attr_dev(input, "id", "nama");
    			attr_dev(input, "class", "svelte-1ebjeif");
    			add_location(input, file$7, 13, 8, 380);
    			attr_dev(button, "class", "svelte-1ebjeif");
    			add_location(button, file$7, 14, 8, 449);
    			attr_dev(div1, "class", "container svelte-1ebjeif");
    			add_location(div1, file$7, 8, 4, 197);
    			attr_dev(div2, "class", "background svelte-1ebjeif");
    			add_location(div2, file$7, 6, 0, 89);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, img);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, div0);
    			append_dev(div0, h1);
    			append_dev(div1, t2);
    			append_dev(div1, p);
    			append_dev(div1, t4);
    			append_dev(div1, input);
    			set_input_value(input, /*name*/ ctx[0]);
    			append_dev(div1, t5);
    			append_dev(div1, button);

    			if (!mounted) {
    				dispose = [
    					listen_dev(input, "input", /*input_input_handler*/ ctx[3]),
    					listen_dev(button, "click", /*click_handler*/ ctx[2], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1 && input.value !== /*name*/ ctx[0]) {
    				set_input_value(input, /*name*/ ctx[0]);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$6.name,
    		type: "if",
    		source: "(6:0) {#if page == 1}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$7(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[1] == 1 && create_if_block$6(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[1] == 1) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$6(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$7.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$7($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Login', slots, []);
    	let { name = '' } = $$props;
    	let { page } = $$props;
    	const writable_props = ['name', 'page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Login> was created with unknown prop '${key}'`);
    	});

    	function click_handler(event) {
    		bubble.call(this, $$self, event);
    	}

    	function input_input_handler() {
    		name = this.value;
    		$$invalidate(0, name);
    	}

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('page' in $$props) $$invalidate(1, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({ name, page });

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('page' in $$props) $$invalidate(1, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, page, click_handler, input_input_handler];
    }

    class Login extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$7, create_fragment$7, safe_not_equal, { name: 0, page: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Login",
    			options,
    			id: create_fragment$7.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*page*/ ctx[1] === undefined && !('page' in props)) {
    			console.warn("<Login> was created without expected prop 'page'");
    		}
    	}

    	get name() {
    		throw new Error("<Login>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<Login>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get page() {
    		throw new Error("<Login>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Login>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\AddFood.svelte generated by Svelte v3.46.4 */
    const file$6 = "src\\AddFood.svelte";

    function get_each_context$2(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[11] = list[i];
    	child_ctx[12] = list;
    	child_ctx[13] = i;
    	return child_ctx;
    }

    function get_each_context_1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[14] = list[i];
    	return child_ctx;
    }

    // (135:0) {#if page == 2}
    function create_if_block$5(ctx) {
    	let div2;
    	let p;
    	let t0;
    	let strong;
    	let t1;
    	let t2;
    	let t3;
    	let div1;
    	let t4;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;
    	let each_value = /*foods*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$2(get_each_context$2(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			p = element("p");
    			t0 = text("Coba ingat-ingat, ");
    			strong = element("strong");
    			t1 = text(/*name*/ ctx[1]);
    			t2 = text(". Kemarin, apa saja makanan yang mestinya masih bisa kamu makan, tapi tidak bisa kamu habiskan dan terpaksa kamu buang dari kulkas atau piringmu? Tentu tidak termasuk duri ikan, tulang ayam, lengkuas yang menyamar jadi daging rendang atau sejenisnya (non-edible), ya!");
    			t3 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t4 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Lanjut";
    			add_location(strong, file$6, 137, 26, 4201);
    			attr_dev(p, "class", "svelte-1guc1cq");
    			add_location(p, file$6, 136, 4, 4170);
    			attr_dev(button, "class", "next svelte-1guc1cq");
    			add_location(button, file$6, 174, 12, 5962);
    			attr_dev(div0, "class", "button svelte-1guc1cq");
    			add_location(div0, file$6, 173, 8, 5928);
    			attr_dev(div1, "class", "bottom svelte-1guc1cq");
    			add_location(div1, file$6, 139, 4, 4507);
    			attr_dev(div2, "class", "container");
    			add_location(div2, file$6, 135, 0, 4141);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, p);
    			append_dev(p, t0);
    			append_dev(p, strong);
    			append_dev(strong, t1);
    			append_dev(p, t2);
    			append_dev(div2, t3);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t4);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_2*/ ctx[10], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 2) set_data_dev(t1, /*name*/ ctx[1]);

    			if (dirty & /*foods, addAmount, minAmount*/ 49) {
    				each_value = /*foods*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$2(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$2(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t4);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$5.name,
    		type: "if",
    		source: "(135:0) {#if page == 2}",
    		ctx
    	});

    	return block;
    }

    // (166:20) {#each food.unit as unit}
    function create_each_block_1(ctx) {
    	let option;
    	let t_value = /*unit*/ ctx[14] + "";
    	let t;
    	let option_value_value;

    	const block = {
    		c: function create() {
    			option = element("option");
    			t = text(t_value);
    			option.__value = option_value_value = /*unit*/ ctx[14];
    			option.value = option.__value;
    			add_location(option, file$6, 166, 24, 5752);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, option, anchor);
    			append_dev(option, t);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*foods*/ 1 && t_value !== (t_value = /*unit*/ ctx[14] + "")) set_data_dev(t, t_value);

    			if (dirty & /*foods*/ 1 && option_value_value !== (option_value_value = /*unit*/ ctx[14])) {
    				prop_dev(option, "__value", option_value_value);
    				option.value = option.__value;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(option);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block_1.name,
    		type: "each",
    		source: "(166:20) {#each food.unit as unit}",
    		ctx
    	});

    	return block;
    }

    // (141:8) {#each foods as food, key}
    function create_each_block$2(ctx) {
    	let div8;
    	let div4;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div3;
    	let div1;
    	let strong;
    	let t1_value = /*food*/ ctx[11].mainTitle + "";
    	let t1;
    	let t2;
    	let div2;
    	let t3_value = /*food*/ ctx[11].mainContent + "";
    	let t3;
    	let t4;
    	let div7;
    	let div5;
    	let button0;
    	let t6;
    	let input;
    	let t7;
    	let button1;
    	let t9;
    	let div6;
    	let select;
    	let option;
    	let mounted;
    	let dispose;

    	function click_handler() {
    		return /*click_handler*/ ctx[6](/*key*/ ctx[13]);
    	}

    	function input_input_handler() {
    		/*input_input_handler*/ ctx[7].call(input, /*key*/ ctx[13]);
    	}

    	function click_handler_1() {
    		return /*click_handler_1*/ ctx[8](/*key*/ ctx[13]);
    	}

    	let each_value_1 = /*food*/ ctx[11].unit;
    	validate_each_argument(each_value_1);
    	let each_blocks = [];

    	for (let i = 0; i < each_value_1.length; i += 1) {
    		each_blocks[i] = create_each_block_1(get_each_context_1(ctx, each_value_1, i));
    	}

    	function select_change_handler() {
    		/*select_change_handler*/ ctx[9].call(select, /*each_value*/ ctx[12], /*key*/ ctx[13]);
    	}

    	const block = {
    		c: function create() {
    			div8 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			strong = element("strong");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div7 = element("div");
    			div5 = element("div");
    			button0 = element("button");
    			button0.textContent = "-";
    			t6 = space();
    			input = element("input");
    			t7 = space();
    			button1 = element("button");
    			button1.textContent = "+";
    			t9 = space();
    			div6 = element("div");
    			select = element("select");
    			option = element("option");
    			option.textContent = "Pilih Satuan";

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			if (!src_url_equal(img.src, img_src_value = /*food*/ ctx[11].imageurl)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*food*/ ctx[11].imagetitle);
    			attr_dev(img, "class", "svelte-1guc1cq");
    			add_location(img, file$6, 145, 20, 4730);
    			attr_dev(div0, "class", "image svelte-1guc1cq");
    			add_location(div0, file$6, 144, 16, 4689);
    			add_location(strong, file$6, 149, 38, 4937);
    			attr_dev(div1, "class", "main");
    			add_location(div1, file$6, 149, 20, 4919);
    			attr_dev(div2, "class", "content");
    			add_location(div2, file$6, 150, 20, 5000);
    			attr_dev(div3, "class", "title svelte-1guc1cq");
    			add_location(div3, file$6, 148, 16, 4878);
    			attr_dev(div4, "class", "side left svelte-1guc1cq");
    			add_location(div4, file$6, 142, 12, 4616);
    			attr_dev(button0, "class", "svelte-1guc1cq");
    			add_location(button0, file$6, 157, 16, 5216);
    			attr_dev(input, "type", "number");
    			attr_dev(input, "name", "jumlah");
    			attr_dev(input, "id", "jumlah");
    			attr_dev(input, "class", "svelte-1guc1cq");
    			add_location(input, file$6, 158, 16, 5288);
    			attr_dev(button1, "class", "svelte-1guc1cq");
    			add_location(button1, file$6, 159, 16, 5383);
    			attr_dev(div5, "class", "amount svelte-1guc1cq");
    			add_location(div5, file$6, 156, 12, 5178);
    			option.__value = "";
    			option.value = option.__value;
    			option.disabled = true;
    			option.selected = true;
    			add_location(option, file$6, 164, 24, 5623);
    			attr_dev(select, "name", "satuan");
    			attr_dev(select, "id", "satuan");
    			attr_dev(select, "class", "svelte-1guc1cq");
    			if (/*food*/ ctx[11].select === void 0) add_render_callback(select_change_handler);
    			add_location(select, file$6, 163, 16, 5538);
    			attr_dev(div6, "class", "unit svelte-1guc1cq");
    			add_location(div6, file$6, 162, 12, 5500);
    			attr_dev(div7, "class", "side right svelte-1guc1cq");
    			add_location(div7, file$6, 154, 12, 5107);
    			attr_dev(div8, "class", "input-container svelte-1guc1cq");
    			add_location(div8, file$6, 141, 8, 4573);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div8, anchor);
    			append_dev(div8, div4);
    			append_dev(div4, div0);
    			append_dev(div0, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, strong);
    			append_dev(strong, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, t3);
    			append_dev(div8, t4);
    			append_dev(div8, div7);
    			append_dev(div7, div5);
    			append_dev(div5, button0);
    			append_dev(div5, t6);
    			append_dev(div5, input);
    			set_input_value(input, /*foods*/ ctx[0][/*key*/ ctx[13]].value);
    			append_dev(div5, t7);
    			append_dev(div5, button1);
    			append_dev(div7, t9);
    			append_dev(div7, div6);
    			append_dev(div6, select);
    			append_dev(select, option);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(select, null);
    			}

    			select_option(select, /*food*/ ctx[11].select);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", click_handler, false, false, false),
    					listen_dev(input, "input", input_input_handler),
    					listen_dev(button1, "click", click_handler_1, false, false, false),
    					listen_dev(select, "change", select_change_handler)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(new_ctx, dirty) {
    			ctx = new_ctx;

    			if (dirty & /*foods*/ 1 && !src_url_equal(img.src, img_src_value = /*food*/ ctx[11].imageurl)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*foods*/ 1 && img_alt_value !== (img_alt_value = /*food*/ ctx[11].imagetitle)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*foods*/ 1 && t1_value !== (t1_value = /*food*/ ctx[11].mainTitle + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*foods*/ 1 && t3_value !== (t3_value = /*food*/ ctx[11].mainContent + "")) set_data_dev(t3, t3_value);

    			if (dirty & /*foods*/ 1 && to_number(input.value) !== /*foods*/ ctx[0][/*key*/ ctx[13]].value) {
    				set_input_value(input, /*foods*/ ctx[0][/*key*/ ctx[13]].value);
    			}

    			if (dirty & /*foods*/ 1) {
    				each_value_1 = /*food*/ ctx[11].unit;
    				validate_each_argument(each_value_1);
    				let i;

    				for (i = 0; i < each_value_1.length; i += 1) {
    					const child_ctx = get_each_context_1(ctx, each_value_1, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block_1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(select, null);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value_1.length;
    			}

    			if (dirty & /*foods*/ 1) {
    				select_option(select, /*food*/ ctx[11].select);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div8);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$2.name,
    		type: "each",
    		source: "(141:8) {#each foods as food, key}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$6(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[2] == 2 && create_if_block$5(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[2] == 2) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$5(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('AddFood', slots, []);
    	const dispatch = createEventDispatcher();
    	let { name } = $$props;

    	let { foods = [
    		{
    			imageurl: './images/buah.png',
    			imagetitle: 'Buah',
    			mainTitle: 'Buah',
    			mainContent: 'Apel, mangga, pisang, dll',
    			value: 0,
    			unit: ['gram', 'kilogram'],
    			select: ''
    		},
    		{
    			imageurl: './images/sayuran.png',
    			imagetitle: 'Sayuran Segar',
    			mainTitle: 'Sayuran Segar',
    			mainContent: 'Selada, sawi, bayam, tomat, dll',
    			value: 0,
    			unit: ['ikat', 'butir', 'gram', 'kilogram', 'sendok makan'],
    			select: ''
    		},
    		{
    			imageurl: './images/biji-bijian.png',
    			imagetitle: 'Biji-bijian',
    			mainTitle: 'Biji-bijian',
    			mainContent: 'Beras, kacang, jagung kering, dll',
    			value: 0,
    			unit: ['gram', 'kilogram', 'sendok makan', 'gelas belimbing'],
    			select: ''
    		},
    		{
    			imageurl: './images/rempah.png',
    			imagetitle: 'Bumbu rempah',
    			mainTitle: 'Bumbu rempah',
    			mainContent: 'Lengkuas, bawang, daun salam, dll',
    			value: 0,
    			unit: ['butir', 'gram', 'kilogram', 'sendok makan'],
    			select: ''
    		},
    		{
    			imageurl: './images/protein.png',
    			imagetitle: 'Protein (hewani & nabati)',
    			mainTitle: 'Protein (hewani & nabati)',
    			mainContent: 'Ikan, ayam, tahu, telur, dll',
    			value: 0,
    			unit: ['butir', 'gram', 'kilogram', 'sendok makan'],
    			select: ''
    		},
    		{
    			imageurl: './images/karbo.png',
    			imagetitle: 'Karbohidrat',
    			mainTitle: 'Karbohidrat',
    			mainContent: 'Nasi, mie, roti, ketela, dll',
    			value: 0,
    			unit: ['gram', 'kilogram', 'lembar', 'sendok makan'],
    			select: ''
    		},
    		{
    			imageurl: './images/bumbu-kemasan.png',
    			imagetitle: 'Bumbu kemasan',
    			mainTitle: 'Bumbu kemasan',
    			mainContent: 'Kecap, gula, margarin, selai, dll',
    			value: 0,
    			unit: ['gram', 'kilogram', 'sendok makan', 'mililiter', 'liter'],
    			select: ''
    		},
    		{
    			imageurl: './images/kuah-saus.png',
    			imagetitle: 'Saus/kuah',
    			mainTitle: 'Saus/kuah',
    			mainContent: 'Kuah sisa masakan, sambal, dll',
    			value: 0,
    			unit: ['sendok makan', 'gelas belimbing', 'mililiter', 'liter'],
    			select: ''
    		},
    		{
    			imageurl: './images/sayur-matang.png',
    			imagetitle: 'Sayuran matang',
    			mainTitle: 'Sayuran matang',
    			mainContent: 'Sayur sisa tumisan, rebusan, salad, dll',
    			value: 0,
    			unit: ['gram', 'kilogram', 'sendok makan', 'gelas belimbing'],
    			select: ''
    		},
    		{
    			imageurl: './images/makanan-kemasan.png',
    			imagetitle: 'Makanan dalam kemasan',
    			mainTitle: 'Makanan dalam kemasan',
    			mainContent: 'Keripik, makanan kaleng, biskuit, dll',
    			value: 0,
    			unit: ['gram', 'kilogram'],
    			select: ''
    		},
    		{
    			imageurl: './images/minuman-kemasan.png',
    			imagetitle: 'Minuman dalam kemasan',
    			mainTitle: 'Minuman dalam kemasan',
    			mainContent: 'Susu, sari buah, minuman kaleng, dll',
    			value: 0,
    			unit: ['sendok makan', 'gelas belimbing'],
    			select: ''
    		},
    		{
    			imageurl: './images/tepung-bubuk.png',
    			imagetitle: 'Bubuk/Tepung',
    			mainTitle: 'Bubuk/Tepung',
    			mainContent: 'Tepung, susu bubuk, lada bubuk, dll',
    			value: 0,
    			unit: ['gram', 'kilogram', 'sendok makan', 'gelas belimbing'],
    			select: ''
    		}
    	] } = $$props;

    	let { page } = $$props;

    	const addAmount = id => {
    		$$invalidate(0, foods[id].value += 1, foods);
    	}; // console.log(foods[id].value)

    	const minAmount = id => {
    		if (foods[id].value > 0) {
    			$$invalidate(0, foods[id].value -= 1, foods);
    		} // console.log(foods[id].value)
    	};

    	const writable_props = ['name', 'foods', 'page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<AddFood> was created with unknown prop '${key}'`);
    	});

    	const click_handler = key => {
    		minAmount(key);
    	};

    	function input_input_handler(key) {
    		foods[key].value = to_number(this.value);
    		$$invalidate(0, foods);
    	}

    	const click_handler_1 = key => {
    		addAmount(key);
    	};

    	function select_change_handler(each_value, key) {
    		each_value[key].select = select_value(this);
    		$$invalidate(0, foods);
    	}

    	const click_handler_2 = () => dispatch('next');

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('foods' in $$props) $$invalidate(0, foods = $$props.foods);
    		if ('page' in $$props) $$invalidate(2, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		name,
    		foods,
    		page,
    		addAmount,
    		minAmount
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('foods' in $$props) $$invalidate(0, foods = $$props.foods);
    		if ('page' in $$props) $$invalidate(2, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		foods,
    		name,
    		page,
    		dispatch,
    		addAmount,
    		minAmount,
    		click_handler,
    		input_input_handler,
    		click_handler_1,
    		select_change_handler,
    		click_handler_2
    	];
    }

    class AddFood extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, { name: 1, foods: 0, page: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "AddFood",
    			options,
    			id: create_fragment$6.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[1] === undefined && !('name' in props)) {
    			console.warn("<AddFood> was created without expected prop 'name'");
    		}

    		if (/*page*/ ctx[2] === undefined && !('page' in props)) {
    			console.warn("<AddFood> was created without expected prop 'page'");
    		}
    	}

    	get name() {
    		throw new Error("<AddFood>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<AddFood>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get foods() {
    		throw new Error("<AddFood>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set foods(value) {
    		throw new Error("<AddFood>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get page() {
    		throw new Error("<AddFood>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<AddFood>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\FoodSummary.svelte generated by Svelte v3.46.4 */
    const file$5 = "src\\FoodSummary.svelte";

    function get_each_context$1(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[7] = list[i];
    	child_ctx[9] = i;
    	return child_ctx;
    }

    // (11:0) {#if page == 3}
    function create_if_block$4(ctx) {
    	let if_block_anchor;

    	function select_block_type(ctx, dirty) {
    		if (/*foods*/ ctx[0].length > 0) return create_if_block_1;
    		if (/*foods*/ ctx[0].length == 0) return create_if_block_2;
    	}

    	let current_block_type = select_block_type(ctx);
    	let if_block = current_block_type && current_block_type(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (current_block_type === (current_block_type = select_block_type(ctx)) && if_block) {
    				if_block.p(ctx, dirty);
    			} else {
    				if (if_block) if_block.d(1);
    				if_block = current_block_type && current_block_type(ctx);

    				if (if_block) {
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			}
    		},
    		d: function destroy(detaching) {
    			if (if_block) {
    				if_block.d(detaching);
    			}

    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$4.name,
    		type: "if",
    		source: "(11:0) {#if page == 3}",
    		ctx
    	});

    	return block;
    }

    // (48:36) 
    function create_if_block_2(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let p0;
    	let t1;
    	let strong0;
    	let t2;
    	let t3;
    	let t4;
    	let p1;
    	let t5;
    	let strong1;
    	let t7;
    	let t8;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			p0 = element("p");
    			t1 = text("Wah, hebat sekali, ");
    			strong0 = element("strong");
    			t2 = text(/*name*/ ctx[1]);
    			t3 = text("! Kamu sudah selangkah lebih maju dalam menerapkan kebiasaan zero-waste!");
    			t4 = space();
    			p1 = element("p");
    			t5 = text("Sekarang, apakah kamu percaya jika kami mengatakan bahwa jumlah sampah makanan di Indonesia mencapai ");
    			strong1 = element("strong");
    			strong1.textContent = "2x lipat lebih banyak";
    			t7 = text(" dibandingkan sampah plastik?");
    			t8 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Lanjut";
    			attr_dev(img, "class", "nofoodimg svelte-nndqdl");
    			if (!src_url_equal(img.src, img_src_value = "./images/food-hero.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "no food waste");
    			add_location(img, file$5, 49, 12, 1897);
    			add_location(strong0, file$5, 51, 35, 2023);
    			attr_dev(p0, "class", "svelte-nndqdl");
    			add_location(p0, file$5, 50, 12, 1983);
    			add_location(strong1, file$5, 54, 117, 2272);
    			attr_dev(p1, "class", "svelte-nndqdl");
    			add_location(p1, file$5, 53, 12, 2150);
    			attr_dev(button, "class", "next svelte-nndqdl");
    			add_location(button, file$5, 57, 16, 2409);
    			attr_dev(div0, "class", "button svelte-nndqdl");
    			add_location(div0, file$5, 56, 12, 2371);
    			attr_dev(div1, "class", "nofoodcontainer svelte-nndqdl");
    			add_location(div1, file$5, 48, 8, 1854);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, p0);
    			append_dev(p0, t1);
    			append_dev(p0, strong0);
    			append_dev(strong0, t2);
    			append_dev(p0, t3);
    			append_dev(div1, t4);
    			append_dev(div1, p1);
    			append_dev(p1, t5);
    			append_dev(p1, strong1);
    			append_dev(p1, t7);
    			append_dev(div1, t8);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler_2*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 2) set_data_dev(t2, /*name*/ ctx[1]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_2.name,
    		type: "if",
    		source: "(48:36) ",
    		ctx
    	});

    	return block;
    }

    // (13:8) {#if foods.length > 0}
    function create_if_block_1(ctx) {
    	let div2;
    	let p;
    	let strong;
    	let t0;
    	let t1;
    	let t2;
    	let div1;
    	let t3;
    	let div0;
    	let button0;
    	let t5;
    	let button1;
    	let mounted;
    	let dispose;
    	let each_value = /*foods*/ ctx[0];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block$1(get_each_context$1(ctx, each_value, i));
    	}

    	const block = {
    		c: function create() {
    			div2 = element("div");
    			p = element("p");
    			strong = element("strong");
    			t0 = text(/*name*/ ctx[1]);
    			t1 = text(", berikut adalah makanan yang kamu singkirkan kemarin. Tenang, kita semua pernah berada dalam dilema yang sama :’)");
    			t2 = space();
    			div1 = element("div");

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			t3 = space();
    			div0 = element("div");
    			button0 = element("button");
    			button0.textContent = "Ubah";
    			t5 = space();
    			button1 = element("button");
    			button1.textContent = "Lanjut";
    			add_location(strong, file$5, 15, 16, 311);
    			attr_dev(p, "class", "svelte-nndqdl");
    			add_location(p, file$5, 14, 12, 290);
    			attr_dev(button0, "class", "ubah svelte-nndqdl");
    			add_location(button0, file$5, 41, 20, 1568);
    			attr_dev(button1, "class", "next svelte-nndqdl");
    			add_location(button1, file$5, 42, 20, 1660);
    			attr_dev(div0, "class", "button svelte-nndqdl");
    			add_location(div0, file$5, 40, 16, 1526);
    			attr_dev(div1, "class", "bottom svelte-nndqdl");
    			add_location(div1, file$5, 17, 12, 483);
    			attr_dev(div2, "class", "container svelte-nndqdl");
    			add_location(div2, file$5, 13, 8, 253);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div2, anchor);
    			append_dev(div2, p);
    			append_dev(p, strong);
    			append_dev(strong, t0);
    			append_dev(p, t1);
    			append_dev(div2, t2);
    			append_dev(div2, div1);

    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(div1, null);
    			}

    			append_dev(div1, t3);
    			append_dev(div1, div0);
    			append_dev(div0, button0);
    			append_dev(div0, t5);
    			append_dev(div0, button1);

    			if (!mounted) {
    				dispose = [
    					listen_dev(button0, "click", /*click_handler*/ ctx[4], false, false, false),
    					listen_dev(button1, "click", /*click_handler_1*/ ctx[5], false, false, false)
    				];

    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 2) set_data_dev(t0, /*name*/ ctx[1]);

    			if (dirty & /*foods*/ 1) {
    				each_value = /*foods*/ ctx[0];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context$1(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block$1(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(div1, t3);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div2);
    			destroy_each(each_blocks, detaching);
    			mounted = false;
    			run_all(dispose);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block_1.name,
    		type: "if",
    		source: "(13:8) {#if foods.length > 0}",
    		ctx
    	});

    	return block;
    }

    // (19:16) {#each foods as food, key}
    function create_each_block$1(ctx) {
    	let div7;
    	let div4;
    	let div0;
    	let img;
    	let img_src_value;
    	let img_alt_value;
    	let t0;
    	let div3;
    	let div1;
    	let strong0;
    	let t1_value = /*food*/ ctx[7].mainTitle + "";
    	let t1;
    	let t2;
    	let div2;
    	let t3_value = /*food*/ ctx[7].mainContent + "";
    	let t3;
    	let t4;
    	let div6;
    	let div5;
    	let span;
    	let strong1;
    	let t5_value = /*food*/ ctx[7].value + "";
    	let t5;
    	let t6;
    	let t7_value = /*food*/ ctx[7].select + "";
    	let t7;

    	const block = {
    		c: function create() {
    			div7 = element("div");
    			div4 = element("div");
    			div0 = element("div");
    			img = element("img");
    			t0 = space();
    			div3 = element("div");
    			div1 = element("div");
    			strong0 = element("strong");
    			t1 = text(t1_value);
    			t2 = space();
    			div2 = element("div");
    			t3 = text(t3_value);
    			t4 = space();
    			div6 = element("div");
    			div5 = element("div");
    			span = element("span");
    			strong1 = element("strong");
    			t5 = text(t5_value);
    			t6 = space();
    			t7 = text(t7_value);
    			if (!src_url_equal(img.src, img_src_value = /*food*/ ctx[7].imageurl)) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", img_alt_value = /*food*/ ctx[7].imagetitle);
    			attr_dev(img, "class", "svelte-nndqdl");
    			add_location(img, file$5, 23, 28, 754);
    			attr_dev(div0, "class", "image svelte-nndqdl");
    			add_location(div0, file$5, 22, 24, 705);
    			add_location(strong0, file$5, 27, 46, 993);
    			attr_dev(div1, "class", "main");
    			add_location(div1, file$5, 27, 28, 975);
    			attr_dev(div2, "class", "content");
    			add_location(div2, file$5, 28, 28, 1064);
    			attr_dev(div3, "class", "title svelte-nndqdl");
    			add_location(div3, file$5, 26, 24, 926);
    			attr_dev(div4, "class", "side left svelte-nndqdl");
    			add_location(div4, file$5, 20, 20, 616);
    			add_location(strong1, file$5, 35, 34, 1349);
    			add_location(span, file$5, 35, 28, 1343);
    			attr_dev(div5, "class", "summary svelte-nndqdl");
    			add_location(div5, file$5, 34, 24, 1292);
    			attr_dev(div6, "class", "side right svelte-nndqdl");
    			add_location(div6, file$5, 32, 20, 1195);
    			attr_dev(div7, "class", "input-container svelte-nndqdl");
    			add_location(div7, file$5, 19, 16, 565);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div7, anchor);
    			append_dev(div7, div4);
    			append_dev(div4, div0);
    			append_dev(div0, img);
    			append_dev(div4, t0);
    			append_dev(div4, div3);
    			append_dev(div3, div1);
    			append_dev(div1, strong0);
    			append_dev(strong0, t1);
    			append_dev(div3, t2);
    			append_dev(div3, div2);
    			append_dev(div2, t3);
    			append_dev(div7, t4);
    			append_dev(div7, div6);
    			append_dev(div6, div5);
    			append_dev(div5, span);
    			append_dev(span, strong1);
    			append_dev(strong1, t5);
    			append_dev(strong1, t6);
    			append_dev(strong1, t7);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*foods*/ 1 && !src_url_equal(img.src, img_src_value = /*food*/ ctx[7].imageurl)) {
    				attr_dev(img, "src", img_src_value);
    			}

    			if (dirty & /*foods*/ 1 && img_alt_value !== (img_alt_value = /*food*/ ctx[7].imagetitle)) {
    				attr_dev(img, "alt", img_alt_value);
    			}

    			if (dirty & /*foods*/ 1 && t1_value !== (t1_value = /*food*/ ctx[7].mainTitle + "")) set_data_dev(t1, t1_value);
    			if (dirty & /*foods*/ 1 && t3_value !== (t3_value = /*food*/ ctx[7].mainContent + "")) set_data_dev(t3, t3_value);
    			if (dirty & /*foods*/ 1 && t5_value !== (t5_value = /*food*/ ctx[7].value + "")) set_data_dev(t5, t5_value);
    			if (dirty & /*foods*/ 1 && t7_value !== (t7_value = /*food*/ ctx[7].select + "")) set_data_dev(t7, t7_value);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div7);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block$1.name,
    		type: "each",
    		source: "(19:16) {#each foods as food, key}",
    		ctx
    	});

    	return block;
    }

    function create_fragment$5(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[2] == 3 && create_if_block$4(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[2] == 3) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$4(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FoodSummary', slots, []);
    	const dispatch = createEventDispatcher();
    	let { foods } = $$props;
    	let { name } = $$props;
    	let { page } = $$props;
    	const writable_props = ['foods', 'name', 'page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FoodSummary> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('back');
    	const click_handler_1 = () => dispatch('next');
    	const click_handler_2 = () => dispatch('next');

    	$$self.$$set = $$props => {
    		if ('foods' in $$props) $$invalidate(0, foods = $$props.foods);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('page' in $$props) $$invalidate(2, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		foods,
    		name,
    		page
    	});

    	$$self.$inject_state = $$props => {
    		if ('foods' in $$props) $$invalidate(0, foods = $$props.foods);
    		if ('name' in $$props) $$invalidate(1, name = $$props.name);
    		if ('page' in $$props) $$invalidate(2, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [foods, name, page, dispatch, click_handler, click_handler_1, click_handler_2];
    }

    class FoodSummary extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, { foods: 0, name: 1, page: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FoodSummary",
    			options,
    			id: create_fragment$5.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*foods*/ ctx[0] === undefined && !('foods' in props)) {
    			console.warn("<FoodSummary> was created without expected prop 'foods'");
    		}

    		if (/*name*/ ctx[1] === undefined && !('name' in props)) {
    			console.warn("<FoodSummary> was created without expected prop 'name'");
    		}

    		if (/*page*/ ctx[2] === undefined && !('page' in props)) {
    			console.warn("<FoodSummary> was created without expected prop 'page'");
    		}
    	}

    	get foods() {
    		throw new Error("<FoodSummary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set foods(value) {
    		throw new Error("<FoodSummary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get name() {
    		throw new Error("<FoodSummary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<FoodSummary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get page() {
    		throw new Error("<FoodSummary>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<FoodSummary>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Result1.svelte generated by Svelte v3.46.4 */
    const file$4 = "src\\Result1.svelte";

    // (12:0) {#if page == 4 }
    function create_if_block$3(ctx) {
    	let div1;
    	let p0;
    	let t0;
    	let strong0;
    	let t1;
    	let t2;
    	let t3;
    	let strong1;
    	let t4;
    	let t5;
    	let t6;
    	let strong2;
    	let t8;
    	let strong3;
    	let t9;
    	let t10;
    	let t11;
    	let t12;
    	let p1;
    	let t13;
    	let strong4;
    	let t14;
    	let t15;
    	let t16;
    	let t17;
    	let img;
    	let img_src_value;
    	let t18;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			p0 = element("p");
    			t0 = text("Kamu membuang ");
    			strong0 = element("strong");
    			t1 = text(/*total*/ ctx[1]);
    			t2 = text(" gram");
    			t3 = text(" kemarin. Jumlah itu akan menjadi ");
    			strong1 = element("strong");
    			t4 = text(/*weekly*/ ctx[2]);
    			t5 = text(" gram dalam 1 minggu");
    			t6 = text(" dan dalam ");
    			strong2 = element("strong");
    			strong2.textContent = "sebulan";
    			t8 = text(" dapat mencapai ");
    			strong3 = element("strong");
    			t9 = text(/*monthly*/ ctx[3]);
    			t10 = text(" gram");
    			t11 = text(".");
    			t12 = space();
    			p1 = element("p");
    			t13 = text("Seandainya sisa makanan itu terselamatkan, jumlah potensi kandungan gizinyanya dapat mengisi ");
    			strong4 = element("strong");
    			t14 = text(/*plate*/ ctx[4]);
    			t15 = text(" piring");
    			t16 = text(" makanan untuk orang yang membutuhkan.");
    			t17 = space();
    			img = element("img");
    			t18 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Lanjut";
    			add_location(strong0, file$4, 14, 26, 333);
    			add_location(strong1, file$4, 14, 89, 396);
    			add_location(strong2, file$4, 14, 145, 452);
    			add_location(strong3, file$4, 14, 185, 492);
    			attr_dev(p0, "class", "svelte-1hfbs3y");
    			add_location(p0, file$4, 13, 8, 302);
    			add_location(strong4, file$4, 17, 105, 658);
    			attr_dev(p1, "class", "svelte-1hfbs3y");
    			add_location(p1, file$4, 16, 8, 548);
    			attr_dev(img, "class", "img svelte-1hfbs3y");
    			if (!src_url_equal(img.src, img_src_value = "./images/distribusi-makanan.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "distribusi makanan");
    			add_location(img, file$4, 19, 8, 751);
    			attr_dev(button, "class", "next svelte-1hfbs3y");
    			add_location(button, file$4, 22, 12, 877);
    			attr_dev(div0, "class", "button svelte-1hfbs3y");
    			add_location(div0, file$4, 20, 8, 841);
    			attr_dev(div1, "class", "container svelte-1hfbs3y");
    			add_location(div1, file$4, 12, 4, 269);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p0);
    			append_dev(p0, t0);
    			append_dev(p0, strong0);
    			append_dev(strong0, t1);
    			append_dev(strong0, t2);
    			append_dev(p0, t3);
    			append_dev(p0, strong1);
    			append_dev(strong1, t4);
    			append_dev(strong1, t5);
    			append_dev(p0, t6);
    			append_dev(p0, strong2);
    			append_dev(p0, t8);
    			append_dev(p0, strong3);
    			append_dev(strong3, t9);
    			append_dev(strong3, t10);
    			append_dev(p0, t11);
    			append_dev(div1, t12);
    			append_dev(div1, p1);
    			append_dev(p1, t13);
    			append_dev(p1, strong4);
    			append_dev(strong4, t14);
    			append_dev(strong4, t15);
    			append_dev(p1, t16);
    			append_dev(div1, t17);
    			append_dev(div1, img);
    			append_dev(div1, t18);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[6], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*total*/ 2) set_data_dev(t1, /*total*/ ctx[1]);
    			if (dirty & /*weekly*/ 4) set_data_dev(t4, /*weekly*/ ctx[2]);
    			if (dirty & /*monthly*/ 8) set_data_dev(t9, /*monthly*/ ctx[3]);
    			if (dirty & /*plate*/ 16) set_data_dev(t14, /*plate*/ ctx[4]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$3.name,
    		type: "if",
    		source: "(12:0) {#if page == 4 }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$4(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[0] == 4 && create_if_block$3(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[0] == 4) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$3(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Result1', slots, []);
    	const dispatch = createEventDispatcher();
    	let { page } = $$props;
    	let { total, weekly, monthly, plate } = $$props;
    	const writable_props = ['page', 'total', 'weekly', 'monthly', 'plate'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Result1> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('next');

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    		if ('weekly' in $$props) $$invalidate(2, weekly = $$props.weekly);
    		if ('monthly' in $$props) $$invalidate(3, monthly = $$props.monthly);
    		if ('plate' in $$props) $$invalidate(4, plate = $$props.plate);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		page,
    		total,
    		weekly,
    		monthly,
    		plate
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('total' in $$props) $$invalidate(1, total = $$props.total);
    		if ('weekly' in $$props) $$invalidate(2, weekly = $$props.weekly);
    		if ('monthly' in $$props) $$invalidate(3, monthly = $$props.monthly);
    		if ('plate' in $$props) $$invalidate(4, plate = $$props.plate);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, total, weekly, monthly, plate, dispatch, click_handler];
    }

    class Result1 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);

    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {
    			page: 0,
    			total: 1,
    			weekly: 2,
    			monthly: 3,
    			plate: 4
    		});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Result1",
    			options,
    			id: create_fragment$4.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*page*/ ctx[0] === undefined && !('page' in props)) {
    			console.warn("<Result1> was created without expected prop 'page'");
    		}

    		if (/*total*/ ctx[1] === undefined && !('total' in props)) {
    			console.warn("<Result1> was created without expected prop 'total'");
    		}

    		if (/*weekly*/ ctx[2] === undefined && !('weekly' in props)) {
    			console.warn("<Result1> was created without expected prop 'weekly'");
    		}

    		if (/*monthly*/ ctx[3] === undefined && !('monthly' in props)) {
    			console.warn("<Result1> was created without expected prop 'monthly'");
    		}

    		if (/*plate*/ ctx[4] === undefined && !('plate' in props)) {
    			console.warn("<Result1> was created without expected prop 'plate'");
    		}
    	}

    	get page() {
    		throw new Error("<Result1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Result1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get total() {
    		throw new Error("<Result1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set total(value) {
    		throw new Error("<Result1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get weekly() {
    		throw new Error("<Result1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set weekly(value) {
    		throw new Error("<Result1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get monthly() {
    		throw new Error("<Result1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set monthly(value) {
    		throw new Error("<Result1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get plate() {
    		throw new Error("<Result1>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set plate(value) {
    		throw new Error("<Result1>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Result2.svelte generated by Svelte v3.46.4 */
    const file$3 = "src\\Result2.svelte";

    // (12:0) {#if page == 5 }
    function create_if_block$2(ctx) {
    	let div1;
    	let img;
    	let img_src_value;
    	let t0;
    	let p0;
    	let t1;
    	let strong0;
    	let t2;
    	let t3;
    	let t4;
    	let strong1;
    	let t6;
    	let strong2;
    	let t7;
    	let t8;
    	let t9;
    	let t10;
    	let p1;
    	let t11;
    	let strong3;
    	let t13;
    	let t14;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			img = element("img");
    			t0 = space();
    			p0 = element("p");
    			t1 = text("Ketika sampah makananmu bercampur bersama sampah anorganik lainnya di keranjang, gas rumah kaca yang dapat dihasilkannya dapat mencapai ");
    			strong0 = element("strong");
    			t2 = text(/*monthlyGas*/ ctx[1]);
    			t3 = text(" kg CO²e per bulan");
    			t4 = text(". Jumlah yang dapat digunakan untuk menyalakan ");
    			strong1 = element("strong");
    			strong1.textContent = "lampu 10 Watt";
    			t6 = text(" selama ");
    			strong2 = element("strong");
    			t7 = text(/*dailyElectric*/ ctx[2]);
    			t8 = text(" hari");
    			t9 = text(".");
    			t10 = space();
    			p1 = element("p");
    			t11 = text("Sekarang, apakah kamu percaya jika kami mengatakan bahwa jumlah sampah makanan di Indonesia mencapai ");
    			strong3 = element("strong");
    			strong3.textContent = "2x lipat lebih banyak";
    			t13 = text(" dibandingkan sampah plastik?");
    			t14 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Lanjut";
    			attr_dev(img, "class", "img svelte-1hfbs3y");
    			if (!src_url_equal(img.src, img_src_value = "./images/gas-metana.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "gas metana");
    			add_location(img, file$3, 13, 8, 298);
    			add_location(strong0, file$3, 15, 148, 525);
    			add_location(strong1, file$3, 15, 242, 619);
    			add_location(strong2, file$3, 15, 280, 657);
    			attr_dev(p0, "class", "svelte-1hfbs3y");
    			add_location(p0, file$3, 14, 8, 372);
    			add_location(strong3, file$3, 18, 113, 837);
    			attr_dev(p1, "class", "svelte-1hfbs3y");
    			add_location(p1, file$3, 17, 8, 719);
    			attr_dev(button, "class", "next svelte-1hfbs3y");
    			add_location(button, file$3, 22, 12, 964);
    			attr_dev(div0, "class", "button svelte-1hfbs3y");
    			add_location(div0, file$3, 20, 8, 928);
    			attr_dev(div1, "class", "container svelte-1hfbs3y");
    			add_location(div1, file$3, 12, 4, 265);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, img);
    			append_dev(div1, t0);
    			append_dev(div1, p0);
    			append_dev(p0, t1);
    			append_dev(p0, strong0);
    			append_dev(strong0, t2);
    			append_dev(strong0, t3);
    			append_dev(p0, t4);
    			append_dev(p0, strong1);
    			append_dev(p0, t6);
    			append_dev(p0, strong2);
    			append_dev(strong2, t7);
    			append_dev(strong2, t8);
    			append_dev(p0, t9);
    			append_dev(div1, t10);
    			append_dev(div1, p1);
    			append_dev(p1, t11);
    			append_dev(p1, strong3);
    			append_dev(p1, t13);
    			append_dev(div1, t14);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[4], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*monthlyGas*/ 2) set_data_dev(t2, /*monthlyGas*/ ctx[1]);
    			if (dirty & /*dailyElectric*/ 4) set_data_dev(t7, /*dailyElectric*/ ctx[2]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$2.name,
    		type: "if",
    		source: "(12:0) {#if page == 5 }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$3(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[0] == 5 && create_if_block$2(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[0] == 5) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$2(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Result2', slots, []);
    	const dispatch = createEventDispatcher();
    	let { page } = $$props;
    	let { monthlyGas, dailyElectric } = $$props;
    	const writable_props = ['page', 'monthlyGas', 'dailyElectric'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Result2> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('next');

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('monthlyGas' in $$props) $$invalidate(1, monthlyGas = $$props.monthlyGas);
    		if ('dailyElectric' in $$props) $$invalidate(2, dailyElectric = $$props.dailyElectric);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		page,
    		monthlyGas,
    		dailyElectric
    	});

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    		if ('monthlyGas' in $$props) $$invalidate(1, monthlyGas = $$props.monthlyGas);
    		if ('dailyElectric' in $$props) $$invalidate(2, dailyElectric = $$props.dailyElectric);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, monthlyGas, dailyElectric, dispatch, click_handler];
    }

    class Result2 extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, { page: 0, monthlyGas: 1, dailyElectric: 2 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Result2",
    			options,
    			id: create_fragment$3.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*page*/ ctx[0] === undefined && !('page' in props)) {
    			console.warn("<Result2> was created without expected prop 'page'");
    		}

    		if (/*monthlyGas*/ ctx[1] === undefined && !('monthlyGas' in props)) {
    			console.warn("<Result2> was created without expected prop 'monthlyGas'");
    		}

    		if (/*dailyElectric*/ ctx[2] === undefined && !('dailyElectric' in props)) {
    			console.warn("<Result2> was created without expected prop 'dailyElectric'");
    		}
    	}

    	get page() {
    		throw new Error("<Result2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Result2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get monthlyGas() {
    		throw new Error("<Result2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set monthlyGas(value) {
    		throw new Error("<Result2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get dailyElectric() {
    		throw new Error("<Result2>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set dailyElectric(value) {
    		throw new Error("<Result2>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\Data.svelte generated by Svelte v3.46.4 */
    const file$2 = "src\\Data.svelte";

    // (9:0) {#if page == 6 }
    function create_if_block$1(ctx) {
    	let div1;
    	let p0;
    	let t0;
    	let strong0;
    	let t2;
    	let strong1;
    	let t4;
    	let strong2;
    	let t6;
    	let strong3;
    	let t8;
    	let strong4;
    	let t10;
    	let t11;
    	let img;
    	let img_src_value;
    	let t12;
    	let p1;
    	let strong5;
    	let t14;
    	let strong6;
    	let t16;
    	let strong7;
    	let t18;
    	let t19;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			p0 = element("p");
    			t0 = text("Yep, berdasar data ");
    			strong0 = element("strong");
    			strong0.textContent = "SIPSN (2021)";
    			t2 = text(" jumlah ");
    			strong1 = element("strong");
    			strong1.textContent = "sampah sisa makanan";
    			t4 = text(" menduduki ");
    			strong2 = element("strong");
    			strong2.textContent = "39,77%";
    			t6 = text(" dari total timbulan sampah, sedangkan ");
    			strong3 = element("strong");
    			strong3.textContent = "sampah plastik";
    			t8 = text(" menduduki posisi terbanyak kedua, yaitu ");
    			strong4 = element("strong");
    			strong4.textContent = "17,91%";
    			t10 = text(".");
    			t11 = space();
    			img = element("img");
    			t12 = space();
    			p1 = element("p");
    			strong5 = element("strong");
    			strong5.textContent = "Kajian Food Loss & Waste di Indonesia";
    			t14 = text(" juga mencatat bahwa ");
    			strong6 = element("strong");
    			strong6.textContent = "23–48 juta ton";
    			t16 = text(" sampah makanan dihasilkan tiap tahun pada periode 2000-2019 saja. Ini artinya, setiap orang di Indonesia menghasilkan rata-rata sebanyak ");
    			strong7 = element("strong");
    			strong7.textContent = "115–184 kilogram sampah per tahun";
    			t18 = text(".");
    			t19 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Lanjut";
    			add_location(strong0, file$2, 11, 31, 240);
    			add_location(strong1, file$2, 11, 68, 277);
    			add_location(strong2, file$2, 11, 115, 324);
    			add_location(strong3, file$2, 11, 177, 386);
    			add_location(strong4, file$2, 11, 249, 458);
    			attr_dev(p0, "class", "svelte-ho5j14");
    			add_location(p0, file$2, 10, 8, 204);
    			attr_dev(img, "class", "img svelte-ho5j14");
    			if (!src_url_equal(img.src, img_src_value = "./images/data-komposisi-sampah-indonesia.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "data komposisi sampah indonesia");
    			add_location(img, file$2, 13, 8, 506);
    			add_location(strong5, file$2, 15, 12, 639);
    			add_location(strong6, file$2, 15, 87, 714);
    			add_location(strong7, file$2, 15, 256, 883);
    			attr_dev(p1, "class", "svelte-ho5j14");
    			add_location(p1, file$2, 14, 8, 622);
    			attr_dev(button, "class", "next svelte-ho5j14");
    			add_location(button, file$2, 20, 12, 1012);
    			attr_dev(div0, "class", "button svelte-ho5j14");
    			add_location(div0, file$2, 18, 8, 968);
    			attr_dev(div1, "class", "container svelte-ho5j14");
    			add_location(div1, file$2, 9, 4, 171);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p0);
    			append_dev(p0, t0);
    			append_dev(p0, strong0);
    			append_dev(p0, t2);
    			append_dev(p0, strong1);
    			append_dev(p0, t4);
    			append_dev(p0, strong2);
    			append_dev(p0, t6);
    			append_dev(p0, strong3);
    			append_dev(p0, t8);
    			append_dev(p0, strong4);
    			append_dev(p0, t10);
    			append_dev(div1, t11);
    			append_dev(div1, img);
    			append_dev(div1, t12);
    			append_dev(div1, p1);
    			append_dev(p1, strong5);
    			append_dev(p1, t14);
    			append_dev(p1, strong6);
    			append_dev(p1, t16);
    			append_dev(p1, strong7);
    			append_dev(p1, t18);
    			append_dev(div1, t19);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[2], false, false, false);
    				mounted = true;
    			}
    		},
    		p: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block$1.name,
    		type: "if",
    		source: "(9:0) {#if page == 6 }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$2(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[0] == 6 && create_if_block$1(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[0] == 6) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block$1(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Data', slots, []);
    	const dispatch = createEventDispatcher();
    	let { page } = $$props;
    	const writable_props = ['page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Data> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('next');

    	$$self.$$set = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({ createEventDispatcher, dispatch, page });

    	$$self.$inject_state = $$props => {
    		if ('page' in $$props) $$invalidate(0, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [page, dispatch, click_handler];
    }

    class Data extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, { page: 0 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Data",
    			options,
    			id: create_fragment$2.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*page*/ ctx[0] === undefined && !('page' in props)) {
    			console.warn("<Data> was created without expected prop 'page'");
    		}
    	}

    	get page() {
    		throw new Error("<Data>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<Data>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\End.svelte generated by Svelte v3.46.4 */
    const file$1 = "src\\End.svelte";

    // (11:0) {#if page == 7 }
    function create_if_block(ctx) {
    	let div1;
    	let p0;
    	let t1;
    	let p1;
    	let t3;
    	let img;
    	let img_src_value;
    	let t4;
    	let p2;
    	let strong0;
    	let t6;
    	let p3;
    	let strong1;
    	let t7;
    	let t8;
    	let t9;
    	let div0;
    	let button;
    	let mounted;
    	let dispose;

    	const block = {
    		c: function create() {
    			div1 = element("div");
    			p0 = element("p");
    			p0.textContent = "Sumber timbulan sampah sisa makanan paling banyak dihasilkan di tahap konsumsi dan 80% berasal dari rumah tangga, dan sisanya dari non-rumah tangga (seperti warung makan atau restoran). 44% dari sampah makanan yang terbuang itu masih layak untuk dikonsumsi.";
    			t1 = space();
    			p1 = element("p");
    			p1.textContent = "Untuk dampaknya terhadap lingkungan, timbulan sampah makanan menghasilkan gas rumah kaca (GRK) berbentuk metana—yang potensinya 25 kali lebih tinggi daripada karbon dioksida dalam meningkatkan pemanasan global.";
    			t3 = space();
    			img = element("img");
    			t4 = space();
    			p2 = element("p");
    			strong0 = element("strong");
    			strong0.textContent = "Jika diibaratkan sebagai sebuah negara, limbah sampah makanan akan menjadi penghasil GRK terbesar ketiga tepat di belakang Tiongkok dan AS.";
    			t6 = space();
    			p3 = element("p");
    			strong1 = element("strong");
    			t7 = text(/*name*/ ctx[0]);
    			t8 = text(", apakah kamu menjadi salah satu penghuninya?");
    			t9 = space();
    			div0 = element("div");
    			button = element("button");
    			button.textContent = "Main Lagi";
    			attr_dev(p0, "class", "svelte-wqrrgt");
    			add_location(p0, file$1, 12, 8, 252);
    			attr_dev(p1, "class", "svelte-wqrrgt");
    			add_location(p1, file$1, 15, 8, 550);
    			attr_dev(img, "class", "img svelte-wqrrgt");
    			if (!src_url_equal(img.src, img_src_value = "./images/bendera-sampah.png")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "gas metana");
    			add_location(img, file$1, 18, 8, 801);
    			add_location(strong0, file$1, 19, 11, 882);
    			attr_dev(p2, "class", "svelte-wqrrgt");
    			add_location(p2, file$1, 19, 8, 879);
    			add_location(strong1, file$1, 22, 11, 1079);
    			attr_dev(p3, "class", "svelte-wqrrgt");
    			add_location(p3, file$1, 22, 8, 1076);
    			attr_dev(button, "class", "next svelte-wqrrgt");
    			add_location(button, file$1, 26, 12, 1219);
    			attr_dev(div0, "class", "button svelte-wqrrgt");
    			add_location(div0, file$1, 25, 8, 1185);
    			attr_dev(div1, "class", "container svelte-wqrrgt");
    			add_location(div1, file$1, 11, 4, 219);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, div1, anchor);
    			append_dev(div1, p0);
    			append_dev(div1, t1);
    			append_dev(div1, p1);
    			append_dev(div1, t3);
    			append_dev(div1, img);
    			append_dev(div1, t4);
    			append_dev(div1, p2);
    			append_dev(p2, strong0);
    			append_dev(div1, t6);
    			append_dev(div1, p3);
    			append_dev(p3, strong1);
    			append_dev(strong1, t7);
    			append_dev(strong1, t8);
    			append_dev(div1, t9);
    			append_dev(div1, div0);
    			append_dev(div0, button);

    			if (!mounted) {
    				dispose = listen_dev(button, "click", /*click_handler*/ ctx[3], false, false, false);
    				mounted = true;
    			}
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*name*/ 1) set_data_dev(t7, /*name*/ ctx[0]);
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(div1);
    			mounted = false;
    			dispose();
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_if_block.name,
    		type: "if",
    		source: "(11:0) {#if page == 7 }",
    		ctx
    	});

    	return block;
    }

    function create_fragment$1(ctx) {
    	let if_block_anchor;
    	let if_block = /*page*/ ctx[1] == 7 && create_if_block(ctx);

    	const block = {
    		c: function create() {
    			if (if_block) if_block.c();
    			if_block_anchor = empty();
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			if (if_block) if_block.m(target, anchor);
    			insert_dev(target, if_block_anchor, anchor);
    		},
    		p: function update(ctx, [dirty]) {
    			if (/*page*/ ctx[1] == 7) {
    				if (if_block) {
    					if_block.p(ctx, dirty);
    				} else {
    					if_block = create_if_block(ctx);
    					if_block.c();
    					if_block.m(if_block_anchor.parentNode, if_block_anchor);
    				}
    			} else if (if_block) {
    				if_block.d(1);
    				if_block = null;
    			}
    		},
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (if_block) if_block.d(detaching);
    			if (detaching) detach_dev(if_block_anchor);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('End', slots, []);
    	const dispatch = createEventDispatcher();
    	let { name } = $$props;
    	let { page } = $$props;
    	const writable_props = ['name', 'page'];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<End> was created with unknown prop '${key}'`);
    	});

    	const click_handler = () => dispatch('back');

    	$$self.$$set = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('page' in $$props) $$invalidate(1, page = $$props.page);
    	};

    	$$self.$capture_state = () => ({
    		createEventDispatcher,
    		dispatch,
    		name,
    		page
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('page' in $$props) $$invalidate(1, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [name, page, dispatch, click_handler];
    }

    class End extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, { name: 0, page: 1 });

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "End",
    			options,
    			id: create_fragment$1.name
    		});

    		const { ctx } = this.$$;
    		const props = options.props || {};

    		if (/*name*/ ctx[0] === undefined && !('name' in props)) {
    			console.warn("<End> was created without expected prop 'name'");
    		}

    		if (/*page*/ ctx[1] === undefined && !('page' in props)) {
    			console.warn("<End> was created without expected prop 'page'");
    		}
    	}

    	get name() {
    		throw new Error("<End>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set name(value) {
    		throw new Error("<End>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	get page() {
    		throw new Error("<End>: Props cannot be read directly from the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}

    	set page(value) {
    		throw new Error("<End>: Props cannot be set directly on the component instance unless compiling with 'accessors: true' or '<svelte:options accessors/>'");
    	}
    }

    /* src\App.svelte generated by Svelte v3.46.4 */
    const file = "src\\App.svelte";

    function get_each_context(ctx, list, i) {
    	const child_ctx = ctx.slice();
    	child_ctx[20] = list[i];
    	return child_ctx;
    }

    // (163:1) {#each foods as food}
    function create_each_block(ctx) {
    	let link;
    	let link_href_value;

    	const block = {
    		c: function create() {
    			link = element("link");
    			attr_dev(link, "rel", "preload");
    			attr_dev(link, "as", "image");
    			attr_dev(link, "href", link_href_value = /*food*/ ctx[20].imageurl);
    			add_location(link, file, 163, 2, 5437);
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, link, anchor);
    		},
    		p: function update(ctx, dirty) {
    			if (dirty & /*foods*/ 2 && link_href_value !== (link_href_value = /*food*/ ctx[20].imageurl)) {
    				attr_dev(link, "href", link_href_value);
    			}
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(link);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_each_block.name,
    		type: "each",
    		source: "(163:1) {#each foods as food}",
    		ctx
    	});

    	return block;
    }

    function create_fragment(ctx) {
    	let link0;
    	let link1;
    	let link2;
    	let link3;
    	let link4;
    	let t0;
    	let main;
    	let login;
    	let updating_name;
    	let t1;
    	let addfood;
    	let updating_name_1;
    	let updating_foods;
    	let t2;
    	let foodsummary;
    	let updating_name_2;
    	let updating_foods_1;
    	let t3;
    	let result1;
    	let updating_name_3;
    	let t4;
    	let result2;
    	let updating_name_4;
    	let t5;
    	let data;
    	let t6;
    	let end;
    	let updating_name_5;
    	let current;
    	let each_value = /*foods*/ ctx[1];
    	validate_each_argument(each_value);
    	let each_blocks = [];

    	for (let i = 0; i < each_value.length; i += 1) {
    		each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
    	}

    	function login_name_binding(value) {
    		/*login_name_binding*/ ctx[12](value);
    	}

    	let login_props = { page: /*page*/ ctx[9] };

    	if (/*name*/ ctx[0] !== void 0) {
    		login_props.name = /*name*/ ctx[0];
    	}

    	login = new Login({ props: login_props, $$inline: true });
    	binding_callbacks.push(() => bind(login, 'name', login_name_binding));
    	login.$on("click", /*nextPage*/ ctx[10]);

    	function addfood_name_binding(value) {
    		/*addfood_name_binding*/ ctx[13](value);
    	}

    	function addfood_foods_binding(value) {
    		/*addfood_foods_binding*/ ctx[14](value);
    	}

    	let addfood_props = { page: /*page*/ ctx[9] };

    	if (/*name*/ ctx[0] !== void 0) {
    		addfood_props.name = /*name*/ ctx[0];
    	}

    	if (/*foods*/ ctx[1] !== void 0) {
    		addfood_props.foods = /*foods*/ ctx[1];
    	}

    	addfood = new AddFood({ props: addfood_props, $$inline: true });
    	binding_callbacks.push(() => bind(addfood, 'name', addfood_name_binding));
    	binding_callbacks.push(() => bind(addfood, 'foods', addfood_foods_binding));
    	addfood.$on("next", /*nextPage*/ ctx[10]);

    	function foodsummary_name_binding(value) {
    		/*foodsummary_name_binding*/ ctx[15](value);
    	}

    	function foodsummary_foods_binding(value) {
    		/*foodsummary_foods_binding*/ ctx[16](value);
    	}

    	let foodsummary_props = { page: /*page*/ ctx[9] };

    	if (/*name*/ ctx[0] !== void 0) {
    		foodsummary_props.name = /*name*/ ctx[0];
    	}

    	if (/*filterFoods*/ ctx[2] !== void 0) {
    		foodsummary_props.foods = /*filterFoods*/ ctx[2];
    	}

    	foodsummary = new FoodSummary({ props: foodsummary_props, $$inline: true });
    	binding_callbacks.push(() => bind(foodsummary, 'name', foodsummary_name_binding));
    	binding_callbacks.push(() => bind(foodsummary, 'foods', foodsummary_foods_binding));
    	foodsummary.$on("next", /*nextPage*/ ctx[10]);
    	foodsummary.$on("back", /*backPage*/ ctx[11]);

    	function result1_name_binding(value) {
    		/*result1_name_binding*/ ctx[17](value);
    	}

    	let result1_props = {
    		page: /*page*/ ctx[9],
    		total: /*total*/ ctx[3],
    		weekly: /*weekly*/ ctx[4],
    		monthly: /*monthly*/ ctx[5],
    		plate: /*plate*/ ctx[6]
    	};

    	if (/*name*/ ctx[0] !== void 0) {
    		result1_props.name = /*name*/ ctx[0];
    	}

    	result1 = new Result1({ props: result1_props, $$inline: true });
    	binding_callbacks.push(() => bind(result1, 'name', result1_name_binding));
    	result1.$on("next", /*nextPage*/ ctx[10]);
    	result1.$on("back", /*backPage*/ ctx[11]);

    	function result2_name_binding(value) {
    		/*result2_name_binding*/ ctx[18](value);
    	}

    	let result2_props = {
    		page: /*page*/ ctx[9],
    		monthlyGas: /*monthlyGas*/ ctx[7],
    		dailyElectric: /*dailyElectric*/ ctx[8]
    	};

    	if (/*name*/ ctx[0] !== void 0) {
    		result2_props.name = /*name*/ ctx[0];
    	}

    	result2 = new Result2({ props: result2_props, $$inline: true });
    	binding_callbacks.push(() => bind(result2, 'name', result2_name_binding));
    	result2.$on("next", /*nextPage*/ ctx[10]);
    	result2.$on("back", /*backPage*/ ctx[11]);

    	data = new Data({
    			props: { page: /*page*/ ctx[9] },
    			$$inline: true
    		});

    	data.$on("next", /*nextPage*/ ctx[10]);
    	data.$on("back", /*backPage*/ ctx[11]);

    	function end_name_binding(value) {
    		/*end_name_binding*/ ctx[19](value);
    	}

    	let end_props = { page: /*page*/ ctx[9] };

    	if (/*name*/ ctx[0] !== void 0) {
    		end_props.name = /*name*/ ctx[0];
    	}

    	end = new End({ props: end_props, $$inline: true });
    	binding_callbacks.push(() => bind(end, 'name', end_name_binding));
    	end.$on("back", /*backPage*/ ctx[11]);

    	const block = {
    		c: function create() {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].c();
    			}

    			link0 = element("link");
    			link1 = element("link");
    			link2 = element("link");
    			link3 = element("link");
    			link4 = element("link");
    			t0 = space();
    			main = element("main");
    			create_component(login.$$.fragment);
    			t1 = space();
    			create_component(addfood.$$.fragment);
    			t2 = space();
    			create_component(foodsummary.$$.fragment);
    			t3 = space();
    			create_component(result1.$$.fragment);
    			t4 = space();
    			create_component(result2.$$.fragment);
    			t5 = space();
    			create_component(data.$$.fragment);
    			t6 = space();
    			create_component(end.$$.fragment);
    			attr_dev(link0, "rel", "preload");
    			attr_dev(link0, "as", "image");
    			attr_dev(link0, "href", "./images/bendera-sampah.png");
    			add_location(link0, file, 165, 2, 5503);
    			attr_dev(link1, "rel", "preload");
    			attr_dev(link1, "as", "image");
    			attr_dev(link1, "href", "./images/data-komposisi-sampah-indonesia.png");
    			add_location(link1, file, 166, 2, 5574);
    			attr_dev(link2, "rel", "preload");
    			attr_dev(link2, "as", "image");
    			attr_dev(link2, "href", "./images/distribusi-makanan.png");
    			add_location(link2, file, 167, 2, 5662);
    			attr_dev(link3, "rel", "preload");
    			attr_dev(link3, "as", "image");
    			attr_dev(link3, "href", "./images/food-hero.png");
    			add_location(link3, file, 168, 2, 5737);
    			attr_dev(link4, "rel", "preload");
    			attr_dev(link4, "as", "image");
    			attr_dev(link4, "href", "./images/gas-metana.png");
    			add_location(link4, file, 169, 2, 5803);
    			attr_dev(main, "class", "svelte-1rks3nc");
    			add_location(main, file, 172, 0, 5884);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			for (let i = 0; i < each_blocks.length; i += 1) {
    				each_blocks[i].m(document.head, null);
    			}

    			append_dev(document.head, link0);
    			append_dev(document.head, link1);
    			append_dev(document.head, link2);
    			append_dev(document.head, link3);
    			append_dev(document.head, link4);
    			insert_dev(target, t0, anchor);
    			insert_dev(target, main, anchor);
    			mount_component(login, main, null);
    			append_dev(main, t1);
    			mount_component(addfood, main, null);
    			append_dev(main, t2);
    			mount_component(foodsummary, main, null);
    			append_dev(main, t3);
    			mount_component(result1, main, null);
    			append_dev(main, t4);
    			mount_component(result2, main, null);
    			append_dev(main, t5);
    			mount_component(data, main, null);
    			append_dev(main, t6);
    			mount_component(end, main, null);
    			current = true;
    		},
    		p: function update(ctx, [dirty]) {
    			if (dirty & /*foods*/ 2) {
    				each_value = /*foods*/ ctx[1];
    				validate_each_argument(each_value);
    				let i;

    				for (i = 0; i < each_value.length; i += 1) {
    					const child_ctx = get_each_context(ctx, each_value, i);

    					if (each_blocks[i]) {
    						each_blocks[i].p(child_ctx, dirty);
    					} else {
    						each_blocks[i] = create_each_block(child_ctx);
    						each_blocks[i].c();
    						each_blocks[i].m(link0.parentNode, link0);
    					}
    				}

    				for (; i < each_blocks.length; i += 1) {
    					each_blocks[i].d(1);
    				}

    				each_blocks.length = each_value.length;
    			}

    			const login_changes = {};
    			if (dirty & /*page*/ 512) login_changes.page = /*page*/ ctx[9];

    			if (!updating_name && dirty & /*name*/ 1) {
    				updating_name = true;
    				login_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name = false);
    			}

    			login.$set(login_changes);
    			const addfood_changes = {};
    			if (dirty & /*page*/ 512) addfood_changes.page = /*page*/ ctx[9];

    			if (!updating_name_1 && dirty & /*name*/ 1) {
    				updating_name_1 = true;
    				addfood_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name_1 = false);
    			}

    			if (!updating_foods && dirty & /*foods*/ 2) {
    				updating_foods = true;
    				addfood_changes.foods = /*foods*/ ctx[1];
    				add_flush_callback(() => updating_foods = false);
    			}

    			addfood.$set(addfood_changes);
    			const foodsummary_changes = {};
    			if (dirty & /*page*/ 512) foodsummary_changes.page = /*page*/ ctx[9];

    			if (!updating_name_2 && dirty & /*name*/ 1) {
    				updating_name_2 = true;
    				foodsummary_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name_2 = false);
    			}

    			if (!updating_foods_1 && dirty & /*filterFoods*/ 4) {
    				updating_foods_1 = true;
    				foodsummary_changes.foods = /*filterFoods*/ ctx[2];
    				add_flush_callback(() => updating_foods_1 = false);
    			}

    			foodsummary.$set(foodsummary_changes);
    			const result1_changes = {};
    			if (dirty & /*page*/ 512) result1_changes.page = /*page*/ ctx[9];
    			if (dirty & /*total*/ 8) result1_changes.total = /*total*/ ctx[3];
    			if (dirty & /*weekly*/ 16) result1_changes.weekly = /*weekly*/ ctx[4];
    			if (dirty & /*monthly*/ 32) result1_changes.monthly = /*monthly*/ ctx[5];
    			if (dirty & /*plate*/ 64) result1_changes.plate = /*plate*/ ctx[6];

    			if (!updating_name_3 && dirty & /*name*/ 1) {
    				updating_name_3 = true;
    				result1_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name_3 = false);
    			}

    			result1.$set(result1_changes);
    			const result2_changes = {};
    			if (dirty & /*page*/ 512) result2_changes.page = /*page*/ ctx[9];
    			if (dirty & /*monthlyGas*/ 128) result2_changes.monthlyGas = /*monthlyGas*/ ctx[7];
    			if (dirty & /*dailyElectric*/ 256) result2_changes.dailyElectric = /*dailyElectric*/ ctx[8];

    			if (!updating_name_4 && dirty & /*name*/ 1) {
    				updating_name_4 = true;
    				result2_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name_4 = false);
    			}

    			result2.$set(result2_changes);
    			const data_changes = {};
    			if (dirty & /*page*/ 512) data_changes.page = /*page*/ ctx[9];
    			data.$set(data_changes);
    			const end_changes = {};
    			if (dirty & /*page*/ 512) end_changes.page = /*page*/ ctx[9];

    			if (!updating_name_5 && dirty & /*name*/ 1) {
    				updating_name_5 = true;
    				end_changes.name = /*name*/ ctx[0];
    				add_flush_callback(() => updating_name_5 = false);
    			}

    			end.$set(end_changes);
    		},
    		i: function intro(local) {
    			if (current) return;
    			transition_in(login.$$.fragment, local);
    			transition_in(addfood.$$.fragment, local);
    			transition_in(foodsummary.$$.fragment, local);
    			transition_in(result1.$$.fragment, local);
    			transition_in(result2.$$.fragment, local);
    			transition_in(data.$$.fragment, local);
    			transition_in(end.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(login.$$.fragment, local);
    			transition_out(addfood.$$.fragment, local);
    			transition_out(foodsummary.$$.fragment, local);
    			transition_out(result1.$$.fragment, local);
    			transition_out(result2.$$.fragment, local);
    			transition_out(data.$$.fragment, local);
    			transition_out(end.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			destroy_each(each_blocks, detaching);
    			detach_dev(link0);
    			detach_dev(link1);
    			detach_dev(link2);
    			detach_dev(link3);
    			detach_dev(link4);
    			if (detaching) detach_dev(t0);
    			if (detaching) detach_dev(main);
    			destroy_component(login);
    			destroy_component(addfood);
    			destroy_component(foodsummary);
    			destroy_component(result1);
    			destroy_component(result2);
    			destroy_component(data);
    			destroy_component(end);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	let name, foods, filterFoods;
    	let total, weekly, monthly, plate; //Result 1
    	let monthlyGas, dailyElectric; //Result 2
    	let page = 1;

    	const nextPage = () => {
    		if (name) {
    			if (page == 1) {
    				$$invalidate(9, page++, page);
    			} else if (page == 2) {
    				// filter by amount
    				$$invalidate(2, filterFoods = foods.filter(food => {
    					return food.value != 0;
    				}));

    				// filter by unit
    				$$invalidate(2, filterFoods = foods.filter(food => {
    					return food.select != '';
    				}));

    				// console.table(filterFoods)
    				$$invalidate(9, page++, page);
    			} else if (page == 3) {
    				if (filterFoods.length == 0) {
    					$$invalidate(9, page = 6);
    				} else {
    					$$invalidate(9, page++, page);

    					filterFoods.forEach(food => {
    						if (food.mainTitle == 'Buah') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							}
    						} else if (food.mainTitle == 'Sayuran Segar') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'ikat') {
    								return food.value = food.value * 200;
    							} else if (food.select == 'butir') {
    								return food.value = food.value * 100;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 5;
    							}
    						} else if (food.mainTitle == 'Biji-bijian') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'gelas belimbing') {
    								return food.value = food.value * 200;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 15;
    							}
    						} else if (food.mainTitle == 'Bumbu rempah') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'butir') {
    								return food.value = food.value * 5;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 15;
    							}
    						} else if (food.mainTitle == 'Protein (hewani & nabati)') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'butir') {
    								return food.value = food.value * 60;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 35;
    							}
    						} else if (food.mainTitle == 'Karbohidrat') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'lembar') {
    								return food.value = food.value * 25;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 22;
    							}
    						} else if (food.mainTitle == 'Bumbu kemasan') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 14.3;
    							} else if (food.select == 'liter') {
    								return food.value = food.value * 1000;
    							}
    						} else if (food.mainTitle == 'Saus/kuah') {
    							if (food.select == 'liter') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'gelas belimbing') {
    								return food.value = food.value * 237;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 15;
    							}
    						} else if (food.mainTitle == 'Sayuran matang') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'gelas belimbing') {
    								return food.value = food.value * 100;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 5;
    							}
    						} else if (food.mainTitle == 'Makanan dalam kemasan') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							}
    						} else if (food.mainTitle == 'Minuman dalam kemasan') {
    							if (food.select == 'gelas belimbing') {
    								return food.value = food.value * 237;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 15;
    							}
    						} else if (food.mainTitle == 'Bubuk/Tepung') {
    							if (food.select == 'kilogram') {
    								return food.value = food.value * 1000;
    							} else if (food.select == 'gelas belimbing') {
    								return food.value = food.value * 130;
    							} else if (food.select == 'sendok makan') {
    								return food.value = food.value * 7;
    							}
    						}
    					});

    					let num = filterFoods.map(item => item.value).reduce((prev, curr) => prev + curr, 0);
    					$$invalidate(3, total = num.toLocaleString('de-DE'));
    					$$invalidate(4, weekly = (num * 7).toLocaleString('de-DE'));
    					$$invalidate(5, monthly = (num * 30).toLocaleString('de-DE'));
    					$$invalidate(7, monthlyGas = (num * 30 * 0.04051).toLocaleString('de-DE'));
    					$$invalidate(8, dailyElectric = (num * 30 * 0.23).toLocaleString('de-DE'));
    					$$invalidate(6, plate = (num * 30 * 1.96 / 700).toLocaleString('de-DE'));
    				}
    			} else if (page == 4) {
    				$$invalidate(9, page++, page);
    			} else if (page == 5) {
    				$$invalidate(9, page++, page);
    			} else if (page == 6) {
    				$$invalidate(9, page++, page);
    			}
    		} else {
    			alert('Tulis Namamu');
    		}
    	};

    	const backPage = () => {
    		if (page == 7) {
    			$$invalidate(9, page = 1);
    			$$invalidate(2, filterFoods = []);
    		} else {
    			$$invalidate(9, page--, page); // console.log(page)
    		} // console.log(page)
    	};

    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	function login_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	function addfood_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	function addfood_foods_binding(value) {
    		foods = value;
    		$$invalidate(1, foods);
    	}

    	function foodsummary_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	function foodsummary_foods_binding(value) {
    		filterFoods = value;
    		$$invalidate(2, filterFoods);
    	}

    	function result1_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	function result2_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	function end_name_binding(value) {
    		name = value;
    		$$invalidate(0, name);
    	}

    	$$self.$capture_state = () => ({
    		Login,
    		AddFood,
    		FoodSummary,
    		Result1,
    		Result2,
    		Data,
    		End,
    		name,
    		foods,
    		filterFoods,
    		total,
    		weekly,
    		monthly,
    		plate,
    		monthlyGas,
    		dailyElectric,
    		page,
    		nextPage,
    		backPage
    	});

    	$$self.$inject_state = $$props => {
    		if ('name' in $$props) $$invalidate(0, name = $$props.name);
    		if ('foods' in $$props) $$invalidate(1, foods = $$props.foods);
    		if ('filterFoods' in $$props) $$invalidate(2, filterFoods = $$props.filterFoods);
    		if ('total' in $$props) $$invalidate(3, total = $$props.total);
    		if ('weekly' in $$props) $$invalidate(4, weekly = $$props.weekly);
    		if ('monthly' in $$props) $$invalidate(5, monthly = $$props.monthly);
    		if ('plate' in $$props) $$invalidate(6, plate = $$props.plate);
    		if ('monthlyGas' in $$props) $$invalidate(7, monthlyGas = $$props.monthlyGas);
    		if ('dailyElectric' in $$props) $$invalidate(8, dailyElectric = $$props.dailyElectric);
    		if ('page' in $$props) $$invalidate(9, page = $$props.page);
    	};

    	if ($$props && "$$inject" in $$props) {
    		$$self.$inject_state($$props.$$inject);
    	}

    	return [
    		name,
    		foods,
    		filterFoods,
    		total,
    		weekly,
    		monthly,
    		plate,
    		monthlyGas,
    		dailyElectric,
    		page,
    		nextPage,
    		backPage,
    		login_name_binding,
    		addfood_name_binding,
    		addfood_foods_binding,
    		foodsummary_name_binding,
    		foodsummary_foods_binding,
    		result1_name_binding,
    		result2_name_binding,
    		end_name_binding
    	];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
    	target: document.body,
    	props: {
    		name: 'world'
    	}
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
