export function newGuid() {
	var guid = "";
	for (var i = 1; i <= 32; i++) {
	  var n = Math.floor(Math.random() * 16.0).toString(16);
	  guid += n;
	  if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
	}
	return guid;
}

export function isArray(value) {
	if (typeof Array.isArray === "function") {
		return Array.isArray(value);
	} else {
		return Object.prototype.toString.call(value) === "[object Array]";
	}
}

export function isJSON(value,  isArray) {
	try {
		let json = JSON.parse(value);
		let isJSON = typeof json === 'object';
		if(isArray){
			return isJSON && Array.isArray(json)
		}
		return isJSON;
	} catch(err) {
		console.log(err);
		return false;
	}
}

export function isObject(value) {
	return Object.prototype.toString.call(value) === "[object Object]";
}

export function isNumber(value) {
	return !isNaN(Number(value));
}

export function isFunction(value) {
	return typeof value == "function";
}

export function isString(value) {
	return typeof value == "string";
}

export function isEmpty(value) {
	if (isArray(value)) {
		return value.length === 0;
	}

	if (isObject(value)) {
		return Object.keys(value).length === 0;
	}

	return value === "" || value === undefined || value === null;
}


export function isBoolean(value) {
	return typeof value === "boolean";
}

export function last(data) {
	if (isArray(data) || isString(data)) {
		return data[data.length - 1];
	}
}

export function cloneDeep(obj) {
	const d = isArray(obj) ? obj : {};

	if (isObject(obj)) {
		for (const key in obj) {
			if (obj[key]) {
				if (obj[key] && typeof obj[key] === "object") {
					d[key] = cloneDeep(obj[key]);
				} else {
					d[key] = obj[key];
				}
			}
		}
	}

	return d;
}

export function clone(obj) {
	return Object.create(Object.getPrototypeOf(obj), Object.getOwnPropertyDescriptors(obj));
}

export function deepMerge(a, b) {
	let k;
	for (k in b) {
		a[k] =
			a[k] && a[k].toString() === "[object Object]" ? deepMerge(a[k], b[k]) : (a[k] = b[k]);
	}
	return a;
}

export function contains(parent, node) {
	while (node && (node = node.parentNode)) if (node === parent) return true;
	return false;
}

export function getUrlParam(name) {
	const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	const r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURIComponent(r[2]);
	return null;
}

export function isPc() {
	const userAgentInfo = navigator.userAgent;
	const Agents = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"];
	let flag = true;
	for (let v = 0; v < Agents.length; v++) {
		if (userAgentInfo.indexOf(Agents[v]) > 0) {
			flag = false;
			break;
		}
	}
	return flag;
}

export function getBrowser() {
	const { clientHeight, clientWidth } = document.documentElement;

	// ???????????????
	const ua = navigator.userAgent.toLowerCase();

	// ???????????????
	let type = (ua.match(/firefox|chrome|safari|opera/g) || "other")[0];

	if ((ua.match(/msie|trident/g) || [])[0]) {
		type = "msie";
	}

	// ????????????
	let tag = "";

	const isTocuh =
		"ontouchstart" in window || ua.indexOf("touch") !== -1 || ua.indexOf("mobile") !== -1;
	if (isTocuh) {
		if (ua.indexOf("ipad") !== -1) {
			tag = "pad";
		} else if (ua.indexOf("mobile") !== -1) {
			tag = "mobile";
		} else if (ua.indexOf("android") !== -1) {
			tag = "androidPad";
		} else {
			tag = "pc";
		}
	} else {
		tag = "pc";
	}

	// ???????????????
	let prefix = "";

	switch (type) {
		case "chrome":
		case "safari":
		case "mobile":
			prefix = "webkit";
			break;
		case "msie":
			prefix = "ms";
			break;
		case "firefox":
			prefix = "Moz";
			break;
		case "opera":
			prefix = "O";
			break;
		default:
			prefix = "webkit";
			break;
	}

	// ????????????
	const plat = ua.indexOf("android") > 0 ? "android" : navigator.platform.toLowerCase();

	// ????????????
	let screen = "full";

	if (clientWidth < 768) {
		screen = "xs";
	} else if (clientWidth < 992) {
		screen = "sm";
	} else if (clientWidth < 1200) {
		screen = "md";
	} else if (clientWidth < 1920) {
		screen = "xl";
	} else {
		screen = "full";
	}

	// ?????? ios
	const isIOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

	// ???????????????
	const version = (ua.match(/[\s\S]+(?:rv|it|ra|ie)[\/: ]([\d.]+)/) || [])[1];

	// ?????? PC ???
	const isPC = tag === "pc";

	// ???????????????
	const isMobile = isPC ? false : true;

	// ??????????????? + ???????????????
	const isMini = screen === "xs" || isMobile;

	// ????????????width
	const onResize = window.innerWidth;
	return {
		height: clientHeight,
		width: clientWidth,
		version,
		type,
		plat,
		tag,
		prefix,
		isMobile,
		isIOS,
		isPC,
		isMini,
		screen,
		onResize
	};
}

export function href(path, newWindow) {
	const { origin, pathname } = window.location;

	if (pathname == path) {
		return false;
	}

	let url = "";

	/* if (routerMode == "history") {
		url = origin + import.meta.env.BASE_URL + path.substr(1);
	} else {
		url = origin + import.meta.env.BASE_URL + "#" + path;
	} */

	if (newWindow) {
		window.open(url);
	} else {
		window.location.href = url;
	}
}

export function orderBy(list, key) {
	return list.sort((a, b) => a[key] - b[key]);
}

export function deepTree(list) {
	const newList = [];
	const map = {};

	list.forEach((e) => (map[e.id] = e));

	list.forEach((e) => {
		const parent = map[e.parentId];

		if (parent) {
			(parent.children || (parent.children = [])).push(e);
		} else {
			newList.push(e);
		}
	});

	const fn = (list) => {
		list.map((e) => {
			if (e.children instanceof Array) {
				e.children = orderBy(e.children, "orderNum");

				fn(e.children);
			}
		});
	};

	fn(newList);

	return orderBy(newList, "orderNum");
}

export function revDeepTree(list = []) {
	const d = [];
	let id = 0;

	const deep = (list, parentId) => {
		list.forEach((e) => {
			if (!e.id) {
				e.id = id++;
			}

			e.parentId = parentId;

			d.push(e);

			if (e.children && isArray(e.children)) {
				deep(e.children, e.id);
			}
		});
	};

	deep(list || [], null);

	return d;
}

export function basename(path) {
	let index = path.lastIndexOf("/");
	index = index > -1 ? index : path.lastIndexOf("\\");
	if (index < 0) {
		return path;
	}
	return path.substring(index + 1);
}

export function getLocalImg (name, type = "png") {
	try {
		return new URL(`../assets/img/${name}.${type}`, import.meta.url).href
	} catch (error) {
		return new URL(`../assets/img/err.${type}`, import.meta.url).href
	}
};