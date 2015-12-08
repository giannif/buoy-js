(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.BuoyData = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
//  Ramda v0.18.0
//  https://github.com/ramda/ramda
//  (c) 2013-2015 Scott Sauyet, Michael Hurley, and David Chambers
//  Ramda may be freely distributed under the MIT license.

;(function() {

  'use strict';

  /**
     * A special placeholder value used to specify "gaps" within curried functions,
     * allowing partial application of any combination of arguments,
     * regardless of their positions.
     *
     * If `g` is a curried ternary function and `_` is `R.__`, the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2, _)(1, 3)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @constant
     * @memberOf R
     * @since v0.6.0
     * @category Function
     * @example
     *
     *      var greet = R.replace('{name}', R.__, 'Hello, {name}!');
     *      greet('Alice'); //=> 'Hello, Alice!'
     */
    var __ = { '@@functional/placeholder': true };

    // jshint unused:vars
    var _arity = function _arity(n, fn) {
        // jshint unused:vars
        switch (n) {
        case 0:
            return function () {
                return fn.apply(this, arguments);
            };
        case 1:
            return function (a0) {
                return fn.apply(this, arguments);
            };
        case 2:
            return function (a0, a1) {
                return fn.apply(this, arguments);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.apply(this, arguments);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.apply(this, arguments);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.apply(this, arguments);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.apply(this, arguments);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.apply(this, arguments);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.apply(this, arguments);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.apply(this, arguments);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.apply(this, arguments);
            };
        default:
            throw new Error('First argument to _arity must be a non-negative integer no greater than ten');
        }
    };

    var _arrayFromIterator = function _arrayFromIterator(iter) {
        var list = [];
        var next;
        while (!(next = iter.next()).done) {
            list.push(next.value);
        }
        return list;
    };

    var _cloneRegExp = function _cloneRegExp(pattern) {
        return new RegExp(pattern.source, (pattern.global ? 'g' : '') + (pattern.ignoreCase ? 'i' : '') + (pattern.multiline ? 'm' : '') + (pattern.sticky ? 'y' : '') + (pattern.unicode ? 'u' : ''));
    };

    var _complement = function _complement(f) {
        return function () {
            return !f.apply(this, arguments);
        };
    };

    /**
     * Private `concat` function to merge two array-like objects.
     *
     * @private
     * @param {Array|Arguments} [set1=[]] An array-like object.
     * @param {Array|Arguments} [set2=[]] An array-like object.
     * @return {Array} A new, merged array.
     * @example
     *
     *      _concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     */
    var _concat = function _concat(set1, set2) {
        set1 = set1 || [];
        set2 = set2 || [];
        var idx;
        var len1 = set1.length;
        var len2 = set2.length;
        var result = [];
        idx = 0;
        while (idx < len1) {
            result[result.length] = set1[idx];
            idx += 1;
        }
        idx = 0;
        while (idx < len2) {
            result[result.length] = set2[idx];
            idx += 1;
        }
        return result;
    };

    var _containsWith = function _containsWith(pred, x, list) {
        var idx = 0, len = list.length;
        while (idx < len) {
            if (pred(x, list[idx])) {
                return true;
            }
            idx += 1;
        }
        return false;
    };

    /**
     * Optimized internal one-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry1 = function _curry1(fn) {
        return function f1(a) {
            if (arguments.length === 0) {
                return f1;
            } else if (a != null && a['@@functional/placeholder'] === true) {
                return f1;
            } else {
                return fn.apply(this, arguments);
            }
        };
    };

    /**
     * Optimized internal two-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry2 = function _curry2(fn) {
        return function f2(a, b) {
            var n = arguments.length;
            if (n === 0) {
                return f2;
            } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
                return f2;
            } else if (n === 1) {
                return _curry1(function (b) {
                    return fn(a, b);
                });
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
                return f2;
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
                return _curry1(function (a) {
                    return fn(a, b);
                });
            } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
                return _curry1(function (b) {
                    return fn(a, b);
                });
            } else {
                return fn(a, b);
            }
        };
    };

    /**
     * Optimized internal three-arity curry function.
     *
     * @private
     * @category Function
     * @param {Function} fn The function to curry.
     * @return {Function} The curried function.
     */
    var _curry3 = function _curry3(fn) {
        return function f3(a, b, c) {
            var n = arguments.length;
            if (n === 0) {
                return f3;
            } else if (n === 1 && a != null && a['@@functional/placeholder'] === true) {
                return f3;
            } else if (n === 1) {
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
                return f3;
            } else if (n === 2 && a != null && a['@@functional/placeholder'] === true) {
                return _curry2(function (a, c) {
                    return fn(a, b, c);
                });
            } else if (n === 2 && b != null && b['@@functional/placeholder'] === true) {
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            } else if (n === 2) {
                return _curry1(function (c) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
                return f3;
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && b != null && b['@@functional/placeholder'] === true) {
                return _curry2(function (a, b) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
                return _curry2(function (a, c) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && b != null && b['@@functional/placeholder'] === true && c != null && c['@@functional/placeholder'] === true) {
                return _curry2(function (b, c) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && a != null && a['@@functional/placeholder'] === true) {
                return _curry1(function (a) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && b != null && b['@@functional/placeholder'] === true) {
                return _curry1(function (b) {
                    return fn(a, b, c);
                });
            } else if (n === 3 && c != null && c['@@functional/placeholder'] === true) {
                return _curry1(function (c) {
                    return fn(a, b, c);
                });
            } else {
                return fn(a, b, c);
            }
        };
    };

    /**
     * Internal curryN function.
     *
     * @private
     * @category Function
     * @param {Number} length The arity of the curried function.
     * @return {array} An array of arguments received thus far.
     * @param {Function} fn The function to curry.
     */
    var _curryN = function _curryN(length, received, fn) {
        return function () {
            var combined = [];
            var argsIdx = 0;
            var left = length;
            var combinedIdx = 0;
            while (combinedIdx < received.length || argsIdx < arguments.length) {
                var result;
                if (combinedIdx < received.length && (received[combinedIdx] == null || received[combinedIdx]['@@functional/placeholder'] !== true || argsIdx >= arguments.length)) {
                    result = received[combinedIdx];
                } else {
                    result = arguments[argsIdx];
                    argsIdx += 1;
                }
                combined[combinedIdx] = result;
                if (result == null || result['@@functional/placeholder'] !== true) {
                    left -= 1;
                }
                combinedIdx += 1;
            }
            return left <= 0 ? fn.apply(this, combined) : _arity(left, _curryN(length, combined, fn));
        };
    };

    var _filter = function _filter(fn, list) {
        var idx = 0, len = list.length, result = [];
        while (idx < len) {
            if (fn(list[idx])) {
                result[result.length] = list[idx];
            }
            idx += 1;
        }
        return result;
    };

    var _forceReduced = function _forceReduced(x) {
        return {
            '@@transducer/value': x,
            '@@transducer/reduced': true
        };
    };

    /**
     * @private
     * @param {Function} fn The strategy for extracting function names from an object
     * @return {Function} A function that takes an object and returns an array of function names.
     */
    var _functionsWith = function _functionsWith(fn) {
        return function (obj) {
            return _filter(function (key) {
                return typeof obj[key] === 'function';
            }, fn(obj));
        };
    };

    var _has = function _has(prop, obj) {
        return Object.prototype.hasOwnProperty.call(obj, prop);
    };

    var _identity = function _identity(x) {
        return x;
    };

    var _isArguments = function () {
        var toString = Object.prototype.toString;
        return toString.call(arguments) === '[object Arguments]' ? function _isArguments(x) {
            return toString.call(x) === '[object Arguments]';
        } : function _isArguments(x) {
            return _has('callee', x);
        };
    }();

    /**
     * Tests whether or not an object is an array.
     *
     * @private
     * @param {*} val The object to test.
     * @return {Boolean} `true` if `val` is an array, `false` otherwise.
     * @example
     *
     *      _isArray([]); //=> true
     *      _isArray(null); //=> false
     *      _isArray({}); //=> false
     */
    var _isArray = Array.isArray || function _isArray(val) {
        return val != null && val.length >= 0 && Object.prototype.toString.call(val) === '[object Array]';
    };

    /**
     * Determine if the passed argument is an integer.
     *
     * @private
     * @param {*} n
     * @category Type
     * @return {Boolean}
     */
    var _isInteger = Number.isInteger || function _isInteger(n) {
        return n << 0 === n;
    };

    var _isNumber = function _isNumber(x) {
        return Object.prototype.toString.call(x) === '[object Number]';
    };

    var _isObject = function _isObject(x) {
        return Object.prototype.toString.call(x) === '[object Object]';
    };

    var _isRegExp = function _isRegExp(x) {
        return Object.prototype.toString.call(x) === '[object RegExp]';
    };

    var _isString = function _isString(x) {
        return Object.prototype.toString.call(x) === '[object String]';
    };

    var _isTransformer = function _isTransformer(obj) {
        return typeof obj['@@transducer/step'] === 'function';
    };

    var _map = function _map(fn, functor) {
        var idx = 0;
        var len = functor.length;
        var result = Array(len);
        while (idx < len) {
            result[idx] = fn(functor[idx]);
            idx += 1;
        }
        return result;
    };

    var _of = function _of(x) {
        return [x];
    };

    var _pipe = function _pipe(f, g) {
        return function () {
            return g.call(this, f.apply(this, arguments));
        };
    };

    var _pipeP = function _pipeP(f, g) {
        return function () {
            var ctx = this;
            return f.apply(ctx, arguments).then(function (x) {
                return g.call(ctx, x);
            });
        };
    };

    // \b matches word boundary; [\b] matches backspace
    var _quote = function _quote(s) {
        var escaped = s.replace(/\\/g, '\\\\').replace(/[\b]/g, '\\b')    // \b matches word boundary; [\b] matches backspace
    .replace(/\f/g, '\\f').replace(/\n/g, '\\n').replace(/\r/g, '\\r').replace(/\t/g, '\\t').replace(/\v/g, '\\v').replace(/\0/g, '\\0');
        return '"' + escaped.replace(/"/g, '\\"') + '"';
    };

    var _reduced = function _reduced(x) {
        return x && x['@@transducer/reduced'] ? x : {
            '@@transducer/value': x,
            '@@transducer/reduced': true
        };
    };

    /**
     * An optimized, private array `slice` implementation.
     *
     * @private
     * @param {Arguments|Array} args The array or arguments object to consider.
     * @param {Number} [from=0] The array index to slice from, inclusive.
     * @param {Number} [to=args.length] The array index to slice to, exclusive.
     * @return {Array} A new, sliced array.
     * @example
     *
     *      _slice([1, 2, 3, 4, 5], 1, 3); //=> [2, 3]
     *
     *      var firstThreeArgs = function(a, b, c, d) {
     *        return _slice(arguments, 0, 3);
     *      };
     *      firstThreeArgs(1, 2, 3, 4); //=> [1, 2, 3]
     */
    var _slice = function _slice(args, from, to) {
        switch (arguments.length) {
        case 1:
            return _slice(args, 0, args.length);
        case 2:
            return _slice(args, from, args.length);
        default:
            var list = [];
            var idx = 0;
            var len = Math.max(0, Math.min(args.length, to) - from);
            while (idx < len) {
                list[idx] = args[from + idx];
                idx += 1;
            }
            return list;
        }
    };

    /**
     * Polyfill from <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/toISOString>.
     */
    var _toISOString = function () {
        var pad = function pad(n) {
            return (n < 10 ? '0' : '') + n;
        };
        return typeof Date.prototype.toISOString === 'function' ? function _toISOString(d) {
            return d.toISOString();
        } : function _toISOString(d) {
            return d.getUTCFullYear() + '-' + pad(d.getUTCMonth() + 1) + '-' + pad(d.getUTCDate()) + 'T' + pad(d.getUTCHours()) + ':' + pad(d.getUTCMinutes()) + ':' + pad(d.getUTCSeconds()) + '.' + (d.getUTCMilliseconds() / 1000).toFixed(3).slice(2, 5) + 'Z';
        };
    }();

    var _xdropRepeatsWith = function () {
        function XDropRepeatsWith(pred, xf) {
            this.xf = xf;
            this.pred = pred;
            this.lastValue = undefined;
            this.seenFirstValue = false;
        }
        XDropRepeatsWith.prototype['@@transducer/init'] = function () {
            return this.xf['@@transducer/init']();
        };
        XDropRepeatsWith.prototype['@@transducer/result'] = function (result) {
            return this.xf['@@transducer/result'](result);
        };
        XDropRepeatsWith.prototype['@@transducer/step'] = function (result, input) {
            var sameAsLast = false;
            if (!this.seenFirstValue) {
                this.seenFirstValue = true;
            } else if (this.pred(this.lastValue, input)) {
                sameAsLast = true;
            }
            this.lastValue = input;
            return sameAsLast ? result : this.xf['@@transducer/step'](result, input);
        };
        return _curry2(function _xdropRepeatsWith(pred, xf) {
            return new XDropRepeatsWith(pred, xf);
        });
    }();

    var _xfBase = {
        init: function () {
            return this.xf['@@transducer/init']();
        },
        result: function (result) {
            return this.xf['@@transducer/result'](result);
        }
    };

    var _xfilter = function () {
        function XFilter(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XFilter.prototype['@@transducer/init'] = _xfBase.init;
        XFilter.prototype['@@transducer/result'] = _xfBase.result;
        XFilter.prototype['@@transducer/step'] = function (result, input) {
            return this.f(input) ? this.xf['@@transducer/step'](result, input) : result;
        };
        return _curry2(function _xfilter(f, xf) {
            return new XFilter(f, xf);
        });
    }();

    var _xfind = function () {
        function XFind(f, xf) {
            this.xf = xf;
            this.f = f;
            this.found = false;
        }
        XFind.prototype['@@transducer/init'] = _xfBase.init;
        XFind.prototype['@@transducer/result'] = function (result) {
            if (!this.found) {
                result = this.xf['@@transducer/step'](result, void 0);
            }
            return this.xf['@@transducer/result'](result);
        };
        XFind.prototype['@@transducer/step'] = function (result, input) {
            if (this.f(input)) {
                this.found = true;
                result = _reduced(this.xf['@@transducer/step'](result, input));
            }
            return result;
        };
        return _curry2(function _xfind(f, xf) {
            return new XFind(f, xf);
        });
    }();

    var _xfindIndex = function () {
        function XFindIndex(f, xf) {
            this.xf = xf;
            this.f = f;
            this.idx = -1;
            this.found = false;
        }
        XFindIndex.prototype['@@transducer/init'] = _xfBase.init;
        XFindIndex.prototype['@@transducer/result'] = function (result) {
            if (!this.found) {
                result = this.xf['@@transducer/step'](result, -1);
            }
            return this.xf['@@transducer/result'](result);
        };
        XFindIndex.prototype['@@transducer/step'] = function (result, input) {
            this.idx += 1;
            if (this.f(input)) {
                this.found = true;
                result = _reduced(this.xf['@@transducer/step'](result, this.idx));
            }
            return result;
        };
        return _curry2(function _xfindIndex(f, xf) {
            return new XFindIndex(f, xf);
        });
    }();

    var _xfindLast = function () {
        function XFindLast(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XFindLast.prototype['@@transducer/init'] = _xfBase.init;
        XFindLast.prototype['@@transducer/result'] = function (result) {
            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.last));
        };
        XFindLast.prototype['@@transducer/step'] = function (result, input) {
            if (this.f(input)) {
                this.last = input;
            }
            return result;
        };
        return _curry2(function _xfindLast(f, xf) {
            return new XFindLast(f, xf);
        });
    }();

    var _xfindLastIndex = function () {
        function XFindLastIndex(f, xf) {
            this.xf = xf;
            this.f = f;
            this.idx = -1;
            this.lastIdx = -1;
        }
        XFindLastIndex.prototype['@@transducer/init'] = _xfBase.init;
        XFindLastIndex.prototype['@@transducer/result'] = function (result) {
            return this.xf['@@transducer/result'](this.xf['@@transducer/step'](result, this.lastIdx));
        };
        XFindLastIndex.prototype['@@transducer/step'] = function (result, input) {
            this.idx += 1;
            if (this.f(input)) {
                this.lastIdx = this.idx;
            }
            return result;
        };
        return _curry2(function _xfindLastIndex(f, xf) {
            return new XFindLastIndex(f, xf);
        });
    }();

    var _xmap = function () {
        function XMap(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XMap.prototype['@@transducer/init'] = _xfBase.init;
        XMap.prototype['@@transducer/result'] = _xfBase.result;
        XMap.prototype['@@transducer/step'] = function (result, input) {
            return this.xf['@@transducer/step'](result, this.f(input));
        };
        return _curry2(function _xmap(f, xf) {
            return new XMap(f, xf);
        });
    }();

    var _xtake = function () {
        function XTake(n, xf) {
            this.xf = xf;
            this.n = n;
        }
        XTake.prototype['@@transducer/init'] = _xfBase.init;
        XTake.prototype['@@transducer/result'] = _xfBase.result;
        XTake.prototype['@@transducer/step'] = function (result, input) {
            if (this.n === 0) {
                return _reduced(result);
            } else {
                this.n -= 1;
                return this.xf['@@transducer/step'](result, input);
            }
        };
        return _curry2(function _xtake(n, xf) {
            return new XTake(n, xf);
        });
    }();

    var _xtakeWhile = function () {
        function XTakeWhile(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XTakeWhile.prototype['@@transducer/init'] = _xfBase.init;
        XTakeWhile.prototype['@@transducer/result'] = _xfBase.result;
        XTakeWhile.prototype['@@transducer/step'] = function (result, input) {
            return this.f(input) ? this.xf['@@transducer/step'](result, input) : _reduced(result);
        };
        return _curry2(function _xtakeWhile(f, xf) {
            return new XTakeWhile(f, xf);
        });
    }();

    var _xwrap = function () {
        function XWrap(fn) {
            this.f = fn;
        }
        XWrap.prototype['@@transducer/init'] = function () {
            throw new Error('init not implemented on XWrap');
        };
        XWrap.prototype['@@transducer/result'] = function (acc) {
            return acc;
        };
        XWrap.prototype['@@transducer/step'] = function (acc, x) {
            return this.f(acc, x);
        };
        return function _xwrap(fn) {
            return new XWrap(fn);
        };
    }();

    /**
     * Adds two numbers. Equivalent to `a + b` but curried.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a
     * @param {Number} b
     * @return {Number}
     * @see R.subtract
     * @example
     *
     *      R.add(2, 3);       //=>  5
     *      R.add(7)(10);      //=> 17
     */
    var add = _curry2(function add(a, b) {
        return a + b;
    });

    /**
     * Applies a function to the value at the given index of an array,
     * returning a new copy of the array with the element at the given
     * index replaced with the result of the function application.
     * @see R.update
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category List
     * @sig (a -> a) -> Number -> [a] -> [a]
     * @param {Function} fn The function to apply.
     * @param {Number} idx The index.
     * @param {Array|Arguments} list An array-like object whose value
     *        at the supplied index will be replaced.
     * @return {Array} A copy of the supplied array-like object with
     *         the element at index `idx` replaced with the value
     *         returned by applying `fn` to the existing element.
     * @example
     *
     *      R.adjust(R.add(10), 1, [0, 1, 2]);     //=> [0, 11, 2]
     *      R.adjust(R.add(10))(1)([0, 1, 2]);     //=> [0, 11, 2]
     */
    var adjust = _curry3(function adjust(fn, idx, list) {
        if (idx >= list.length || idx < -list.length) {
            return list;
        }
        var start = idx < 0 ? list.length : 0;
        var _idx = start + idx;
        var _list = _concat(list);
        _list[_idx] = fn(list[_idx]);
        return _list;
    });

    /**
     * Returns a function that always returns the given value. Note that for
     * non-primitives the value returned is a reference to the original value.
     *
     * This function is known as `const`, `constant`, or `K` (for K combinator)
     * in other languages and libraries.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig a -> (* -> a)
     * @param {*} val The value to wrap in a function
     * @return {Function} A Function :: * -> val.
     * @example
     *
     *      var t = R.always('Tee');
     *      t(); //=> 'Tee'
     */
    var always = _curry1(function always(val) {
        return function () {
            return val;
        };
    });

    /**
     * Returns `true` if both arguments are `true`; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Logic
     * @sig * -> * -> *
     * @param {Boolean} a A boolean value
     * @param {Boolean} b A boolean value
     * @return {Boolean} `true` if both arguments are `true`, `false` otherwise
     * @see R.both
     * @example
     *
     *      R.and(true, true); //=> true
     *      R.and(true, false); //=> false
     *      R.and(false, true); //=> false
     *      R.and(false, false); //=> false
     */
    var and = _curry2(function and(a, b) {
        return a && b;
    });

    /**
     * Returns a new list containing the contents of the given list, followed by the given
     * element.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig a -> [a] -> [a]
     * @param {*} el The element to add to the end of the new list.
     * @param {Array} list The list whose contents will be added to the beginning of the output
     *        list.
     * @return {Array} A new list containing the contents of the old list followed by `el`.
     * @see R.prepend
     * @example
     *
     *      R.append('tests', ['write', 'more']); //=> ['write', 'more', 'tests']
     *      R.append('tests', []); //=> ['tests']
     *      R.append(['tests'], ['write', 'more']); //=> ['write', 'more', ['tests']]
     */
    var append = _curry2(function append(el, list) {
        return _concat(list, [el]);
    });

    /**
     * Applies function `fn` to the argument list `args`. This is useful for
     * creating a fixed-arity function from a variadic function. `fn` should
     * be a bound function if context is significant.
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Function
     * @sig (*... -> a) -> [*] -> a
     * @param {Function} fn
     * @param {Array} args
     * @return {*}
     * @see R.call, R.unapply
     * @example
     *
     *      var nums = [1, 2, 3, -99, 42, 6, 7];
     *      R.apply(Math.max, nums); //=> 42
     */
    var apply = _curry2(function apply(fn, args) {
        return fn.apply(this, args);
    });

    /**
     * Makes a shallow clone of an object, setting or overriding the specified
     * property with the given value.  Note that this copies and flattens
     * prototype properties onto the new object as well.  All non-primitive
     * properties are copied by reference.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Object
     * @sig String -> a -> {k: v} -> {k: v}
     * @param {String} prop the property name to set
     * @param {*} val the new value
     * @param {Object} obj the object to clone
     * @return {Object} a new object similar to the original except for the specified property.
     * @see R.dissoc
     * @example
     *
     *      R.assoc('c', 3, {a: 1, b: 2}); //=> {a: 1, b: 2, c: 3}
     */
    var assoc = _curry3(function assoc(prop, val, obj) {
        var result = {};
        for (var p in obj) {
            result[p] = obj[p];
        }
        result[prop] = val;
        return result;
    });

    /**
     * Makes a shallow clone of an object, setting or overriding the nodes
     * required to create the given path, and placing the specific value at the
     * tail end of that path.  Note that this copies and flattens prototype
     * properties onto the new object as well.  All non-primitive properties
     * are copied by reference.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Object
     * @sig [String] -> a -> {k: v} -> {k: v}
     * @param {Array} path the path to set
     * @param {*} val the new value
     * @param {Object} obj the object to clone
     * @return {Object} a new object similar to the original except along the specified path.
     * @see R.dissocPath
     * @example
     *
     *      R.assocPath(['a', 'b', 'c'], 42, {a: {b: {c: 0}}}); //=> {a: {b: {c: 42}}}
     */
    var assocPath = _curry3(function assocPath(path, val, obj) {
        switch (path.length) {
        case 0:
            return obj;
        case 1:
            return assoc(path[0], val, obj);
        default:
            return assoc(path[0], assocPath(_slice(path, 1), val, Object(obj[path[0]])), obj);
        }
    });

    /**
     * Creates a function that is bound to a context.
     * Note: `R.bind` does not provide the additional argument-binding capabilities of
     * [Function.prototype.bind](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).
     *
     * @func
     * @memberOf R
     * @since v0.6.0
     * @category Function
     * @category Object
     * @see R.partial
     * @sig (* -> *) -> {*} -> (* -> *)
     * @param {Function} fn The function to bind to context
     * @param {Object} thisObj The context to bind `fn` to
     * @return {Function} A function that will execute in the context of `thisObj`.
     */
    var bind = _curry2(function bind(fn, thisObj) {
        return _arity(fn.length, function () {
            return fn.apply(thisObj, arguments);
        });
    });

    /**
     * Makes a comparator function out of a function that reports whether the first element is less than the second.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (a, b -> Boolean) -> (a, b -> Number)
     * @param {Function} pred A predicate function of arity two.
     * @return {Function} A Function :: a -> b -> Int that returns `-1` if a < b, `1` if b < a, otherwise `0`.
     * @example
     *
     *      var cmp = R.comparator((a, b) => a.age < b.age);
     *      var people = [
     *        // ...
     *      ];
     *      R.sort(cmp, people);
     */
    var comparator = _curry1(function comparator(pred) {
        return function (a, b) {
            return pred(a, b) ? -1 : pred(b, a) ? 1 : 0;
        };
    });

    /**
     * Returns a function, `fn`, which encapsulates if/else-if/else logic.
     * `R.cond` takes a list of [predicate, transform] pairs. All of the
     * arguments to `fn` are applied to each of the predicates in turn
     * until one returns a "truthy" value, at which point `fn` returns the
     * result of applying its arguments to the corresponding transformer.
     * If none of the predicates matches, `fn` returns undefined.
     *
     * @func
     * @memberOf R
     * @since v0.6.0
     * @category Logic
     * @sig [[(*... -> Boolean),(*... -> *)]] -> (*... -> *)
     * @param {Array} pairs
     * @return {Function}
     * @example
     *
     *      var fn = R.cond([
     *        [R.equals(0),   R.always('water freezes at 0°C')],
     *        [R.equals(100), R.always('water boils at 100°C')],
     *        [R.T,           temp => 'nothing special happens at ' + temp + '°C']
     *      ]);
     *      fn(0); //=> 'water freezes at 0°C'
     *      fn(50); //=> 'nothing special happens at 50°C'
     *      fn(100); //=> 'water boils at 100°C'
     */
    var cond = _curry1(function cond(pairs) {
        return function () {
            var idx = 0;
            while (idx < pairs.length) {
                if (pairs[idx][0].apply(this, arguments)) {
                    return pairs[idx][1].apply(this, arguments);
                }
                idx += 1;
            }
        };
    });

    /**
     * Returns `true` if the `x` is found in the `list`, using `pred` as an
     * equality predicate for `x`.
     *
     * @func
     * @memberOf R
     * @since v0.1.5
     * @category List
     * @sig (a, a -> Boolean) -> a -> [a] -> Boolean
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {*} x The item to find
     * @param {Array} list The list to iterate over
     * @return {Boolean} `true` if `x` is in `list`, else `false`.
     * @deprecated since v0.18.0
     * @example
     *
     *      var absEq = (a, b) => Math.abs(a) === Math.abs(b);
     *      R.containsWith(absEq, 5, [1, 2, 3]); //=> false
     *      R.containsWith(absEq, 5, [4, 5, 6]); //=> true
     *      R.containsWith(absEq, 5, [-1, -2, -3]); //=> false
     *      R.containsWith(absEq, 5, [-4, -5, -6]); //=> true
     */
    var containsWith = _curry3(_containsWith);

    /**
     * Counts the elements of a list according to how many match each value
     * of a key generated by the supplied function. Returns an object
     * mapping the keys produced by `fn` to the number of occurrences in
     * the list. Note that all keys are coerced to strings because of how
     * JavaScript objects work.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig (a -> String) -> [a] -> {*}
     * @param {Function} fn The function used to map values to keys.
     * @param {Array} list The list to count elements from.
     * @return {Object} An object mapping keys to number of occurrences in the list.
     * @example
     *
     *      var numbers = [1.0, 1.1, 1.2, 2.0, 3.0, 2.2];
     *      var letters = R.split('', 'abcABCaaaBBc');
     *      R.countBy(Math.floor)(numbers);    //=> {'1': 3, '2': 2, '3': 1}
     *      R.countBy(R.toLower)(letters);   //=> {'a': 5, 'b': 4, 'c': 3}
     */
    var countBy = _curry2(function countBy(fn, list) {
        var counts = {};
        var len = list.length;
        var idx = 0;
        while (idx < len) {
            var key = fn(list[idx]);
            counts[key] = (_has(key, counts) ? counts[key] : 0) + 1;
            idx += 1;
        }
        return counts;
    });

    /**
     * Returns a curried equivalent of the provided function, with the
     * specified arity. The curried function has two unusual capabilities.
     * First, its arguments needn't be provided one at a time. If `g` is
     * `R.curryN(3, f)`, the following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * Secondly, the special placeholder value `R.__` may be used to specify
     * "gaps", allowing partial application of any combination of arguments,
     * regardless of their positions. If `g` is as above and `_` is `R.__`,
     * the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @func
     * @memberOf R
     * @since v0.5.0
     * @category Function
     * @sig Number -> (* -> a) -> (* -> a)
     * @param {Number} length The arity for the returned function.
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @see R.curry
     * @example
     *
     *      var sumArgs = (...args) => R.sum(args);
     *
     *      var curriedAddFourNumbers = R.curryN(4, sumArgs);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4); //=> 10
     */
    var curryN = _curry2(function curryN(length, fn) {
        if (length === 1) {
            return _curry1(fn);
        }
        return _arity(length, _curryN(length, [], fn));
    });

    /**
     * Decrements its argument.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Math
     * @sig Number -> Number
     * @param {Number} n
     * @return {Number}
     * @see R.inc
     * @example
     *
     *      R.dec(42); //=> 41
     */
    var dec = add(-1);

    /**
     * Returns the second argument if it is not `null`, `undefined` or `NaN`
     * otherwise the first argument is returned.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Logic
     * @sig a -> b -> a | b
     * @param {a} val The default value.
     * @param {b} val The value to return if it is not null or undefined
     * @return {*} The the second value or the default value
     * @example
     *
     *      var defaultTo42 = R.defaultTo(42);
     *
     *      defaultTo42(null);  //=> 42
     *      defaultTo42(undefined);  //=> 42
     *      defaultTo42('Ramda');  //=> 'Ramda'
     *      defaultTo42(parseInt('string')); //=> 42
     */
    var defaultTo = _curry2(function defaultTo(d, v) {
        return v == null || v !== v ? d : v;
    });

    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     * Duplication is determined according to the value returned by applying the supplied predicate to two list
     * elements.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @see R.difference
     * @return {Array} The elements in `list1` that are not in `list2`.
     * @example
     *
     *      function cmp(x, y) => x.a === y.a;
     *      var l1 = [{a: 1}, {a: 2}, {a: 3}];
     *      var l2 = [{a: 3}, {a: 4}];
     *      R.differenceWith(cmp, l1, l2); //=> [{a: 1}, {a: 2}]
     */
    var differenceWith = _curry3(function differenceWith(pred, first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        var containsPred = containsWith(pred);
        while (idx < firstLen) {
            if (!containsPred(first[idx], second) && !containsPred(first[idx], out)) {
                out[out.length] = first[idx];
            }
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a new object that does not contain a `prop` property.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Object
     * @sig String -> {k: v} -> {k: v}
     * @param {String} prop the name of the property to dissociate
     * @param {Object} obj the object to clone
     * @return {Object} a new object similar to the original but without the specified property
     * @see R.assoc
     * @example
     *
     *      R.dissoc('b', {a: 1, b: 2, c: 3}); //=> {a: 1, c: 3}
     */
    var dissoc = _curry2(function dissoc(prop, obj) {
        var result = {};
        for (var p in obj) {
            if (p !== prop) {
                result[p] = obj[p];
            }
        }
        return result;
    });

    /**
     * Makes a shallow clone of an object, omitting the property at the
     * given path. Note that this copies and flattens prototype properties
     * onto the new object as well.  All non-primitive properties are copied
     * by reference.
     *
     * @func
     * @memberOf R
     * @since v0.11.0
     * @category Object
     * @sig [String] -> {k: v} -> {k: v}
     * @param {Array} path the path to set
     * @param {Object} obj the object to clone
     * @return {Object} a new object without the property at path
     * @see R.assocPath
     * @example
     *
     *      R.dissocPath(['a', 'b', 'c'], {a: {b: {c: 42}}}); //=> {a: {b: {}}}
     */
    var dissocPath = _curry2(function dissocPath(path, obj) {
        switch (path.length) {
        case 0:
            return obj;
        case 1:
            return dissoc(path[0], obj);
        default:
            var head = path[0];
            var tail = _slice(path, 1);
            return obj[head] == null ? obj : assoc(head, dissocPath(tail, obj[head]), obj);
        }
    });

    /**
     * Divides two numbers. Equivalent to `a / b`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The first value.
     * @param {Number} b The second value.
     * @return {Number} The result of `a / b`.
     * @see R.multiply
     * @example
     *
     *      R.divide(71, 100); //=> 0.71
     *
     *      var half = R.divide(R.__, 2);
     *      half(42); //=> 21
     *
     *      var reciprocal = R.divide(1);
     *      reciprocal(4);   //=> 0.25
     */
    var divide = _curry2(function divide(a, b) {
        return a / b;
    });

    /**
     * Returns a new list containing all but last the`n` elements of a given list,
     * passing each value from the right to the supplied predicate function, skipping
     * elements while the predicate function returns `true`. The predicate function
     * is passed one argument: (value)*.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.takeLastWhile
     * @example
     *
     *      var lteThree = x => x <= 3;
     *
     *      R.dropLastWhile(lteThree, [1, 2, 3, 4, 3, 2, 1]); //=> [1, 2, 3, 4]
     */
    var dropLastWhile = _curry2(function dropLastWhile(pred, list) {
        var idx = list.length - 1;
        while (idx >= 0 && pred(list[idx])) {
            idx -= 1;
        }
        return _slice(list, 0, idx + 1);
    });

    /**
     * Returns the empty value of its argument's type. Ramda defines the empty
     * value of Array (`[]`), Object (`{}`), String (`''`), and Arguments.
     * Other types are supported if they define `<Type>.empty` and/or
     * `<Type>.prototype.empty`.
     *
     * Dispatches to the `empty` method of the first argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Function
     * @sig a -> a
     * @param {*} x
     * @return {*}
     * @example
     *
     *      R.empty(Just(42));      //=> Nothing()
     *      R.empty([1, 2, 3]);     //=> []
     *      R.empty('unicorns');    //=> ''
     *      R.empty({x: 1, y: 2});  //=> {}
     */
    // else
    var empty = _curry1(function empty(x) {
        return x != null && typeof x.empty === 'function' ? x.empty() : x != null && x.constructor != null && typeof x.constructor.empty === 'function' ? x.constructor.empty() : _isArray(x) ? [] : _isString(x) ? '' : _isObject(x) ? {} : _isArguments(x) ? function () {
            return arguments;
        }() : // else
        void 0;
    });

    /**
     * Creates a new object by recursively evolving a shallow copy of `object`, according to the
     * `transformation` functions. All non-primitive properties are copied by reference.
     *
     * A `transformation` function will not be invoked if its corresponding key does not exist in
     * the evolved object.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Object
     * @sig {k: (v -> v)} -> {k: v} -> {k: v}
     * @param {Object} transformations The object specifying transformation functions to apply
     *        to the object.
     * @param {Object} object The object to be transformed.
     * @return {Object} The transformed object.
     * @example
     *
     *      var tomato  = {firstName: '  Tomato ', data: {elapsed: 100, remaining: 1400}, id:123};
     *      var transformations = {
     *        firstName: R.trim,
     *        lastName: R.trim, // Will not get invoked.
     *        data: {elapsed: R.add(1), remaining: R.add(-1)}
     *      };
     *      R.evolve(transformations, tomato); //=> {firstName: 'Tomato', data: {elapsed: 101, remaining: 1399}, id:123}
     */
    var evolve = _curry2(function evolve(transformations, object) {
        var transformation, key, type, result = {};
        for (key in object) {
            transformation = transformations[key];
            type = typeof transformation;
            result[key] = type === 'function' ? transformation(object[key]) : type === 'object' ? evolve(transformations[key], object[key]) : object[key];
        }
        return result;
    });

    /**
     * Creates a new object out of a list key-value pairs.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category List
     * @sig [[k,v]] -> {k: v}
     * @param {Array} pairs An array of two-element arrays that will be the keys and values of the output object.
     * @return {Object} The object made by pairing up `keys` and `values`.
     * @see R.toPairs, R.pair
     * @example
     *
     *      R.fromPairs([['a', 1], ['b', 2],  ['c', 3]]); //=> {a: 1, b: 2, c: 3}
     */
    var fromPairs = _curry1(function fromPairs(pairs) {
        var idx = 0, len = pairs.length, out = {};
        while (idx < len) {
            if (_isArray(pairs[idx]) && pairs[idx].length) {
                out[pairs[idx][0]] = pairs[idx][1];
            }
            idx += 1;
        }
        return out;
    });

    /**
     * Returns `true` if the first argument is greater than the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @see R.lt
     * @example
     *
     *      R.gt(2, 1); //=> true
     *      R.gt(2, 2); //=> false
     *      R.gt(2, 3); //=> false
     *      R.gt('a', 'z'); //=> false
     *      R.gt('z', 'a'); //=> true
     */
    var gt = _curry2(function gt(a, b) {
        return a > b;
    });

    /**
     * Returns `true` if the first argument is greater than or equal to the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean}
     * @see R.lte
     * @example
     *
     *      R.gte(2, 1); //=> true
     *      R.gte(2, 2); //=> true
     *      R.gte(2, 3); //=> false
     *      R.gte('a', 'z'); //=> false
     *      R.gte('z', 'a'); //=> true
     */
    var gte = _curry2(function gte(a, b) {
        return a >= b;
    });

    /**
     * Returns whether or not an object has an own property with
     * the specified name
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Object
     * @sig s -> {s: x} -> Boolean
     * @param {String} prop The name of the property to check for.
     * @param {Object} obj The object to query.
     * @return {Boolean} Whether the property exists.
     * @example
     *
     *      var hasName = R.has('name');
     *      hasName({name: 'alice'});   //=> true
     *      hasName({name: 'bob'});     //=> true
     *      hasName({});                //=> false
     *
     *      var point = {x: 0, y: 0};
     *      var pointHas = R.has(R.__, point);
     *      pointHas('x');  //=> true
     *      pointHas('y');  //=> true
     *      pointHas('z');  //=> false
     */
    var has = _curry2(_has);

    /**
     * Returns whether or not an object or its prototype chain has
     * a property with the specified name
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Object
     * @sig s -> {s: x} -> Boolean
     * @param {String} prop The name of the property to check for.
     * @param {Object} obj The object to query.
     * @return {Boolean} Whether the property exists.
     * @example
     *
     *      function Rectangle(width, height) {
     *        this.width = width;
     *        this.height = height;
     *      }
     *      Rectangle.prototype.area = function() {
     *        return this.width * this.height;
     *      };
     *
     *      var square = new Rectangle(2, 2);
     *      R.hasIn('width', square);  //=> true
     *      R.hasIn('area', square);  //=> true
     */
    var hasIn = _curry2(function hasIn(prop, obj) {
        return prop in obj;
    });

    /**
     * Returns true if its arguments are identical, false otherwise. Values are
     * identical if they reference the same memory. `NaN` is identical to `NaN`;
     * `0` and `-0` are not identical.
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category Relation
     * @sig a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      var o = {};
     *      R.identical(o, o); //=> true
     *      R.identical(1, 1); //=> true
     *      R.identical(1, '1'); //=> false
     *      R.identical([], []); //=> false
     *      R.identical(0, -0); //=> false
     *      R.identical(NaN, NaN); //=> true
     */
    // SameValue algorithm
    // Steps 1-5, 7-10
    // Steps 6.b-6.e: +0 != -0
    // Step 6.a: NaN == NaN
    var identical = _curry2(function identical(a, b) {
        // SameValue algorithm
        if (a === b) {
            // Steps 1-5, 7-10
            // Steps 6.b-6.e: +0 != -0
            return a !== 0 || 1 / a === 1 / b;
        } else {
            // Step 6.a: NaN == NaN
            return a !== a && b !== b;
        }
    });

    /**
     * A function that does nothing but return the parameter supplied to it. Good as a default
     * or placeholder function.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig a -> a
     * @param {*} x The value to return.
     * @return {*} The input value, `x`.
     * @example
     *
     *      R.identity(1); //=> 1
     *
     *      var obj = {};
     *      R.identity(obj) === obj; //=> true
     */
    var identity = _curry1(_identity);

    /**
     * Creates a function that will process either the `onTrue` or the `onFalse` function depending
     * upon the result of the `condition` predicate.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Logic
     * @see R.unless, R.when
     * @sig (*... -> Boolean) -> (*... -> *) -> (*... -> *) -> (*... -> *)
     * @param {Function} condition A predicate function
     * @param {Function} onTrue A function to invoke when the `condition` evaluates to a truthy value.
     * @param {Function} onFalse A function to invoke when the `condition` evaluates to a falsy value.
     * @return {Function} A new unary function that will process either the `onTrue` or the `onFalse`
     *                    function depending upon the result of the `condition` predicate.
     * @example
     *
     *      var incCount = R.ifElse(
     *        R.has('count'),
     *        R.over(R.lensProp('count'), R.inc),
     *        R.assoc('count', 1)
     *      );
     *      incCount({});           //=> { count: 1 }
     *      incCount({ count: 1 }); //=> { count: 2 }
     */
    var ifElse = _curry3(function ifElse(condition, onTrue, onFalse) {
        return curryN(Math.max(condition.length, onTrue.length, onFalse.length), function _ifElse() {
            return condition.apply(this, arguments) ? onTrue.apply(this, arguments) : onFalse.apply(this, arguments);
        });
    });

    /**
     * Increments its argument.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Math
     * @sig Number -> Number
     * @param {Number} n
     * @return {Number}
     * @see R.dec
     * @example
     *
     *      R.inc(42); //=> 43
     */
    var inc = add(1);

    /**
     * Inserts the supplied element into the list, at index `index`.  _Note
     * that this is not destructive_: it returns a copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @func
     * @memberOf R
     * @since v0.2.2
     * @category List
     * @sig Number -> a -> [a] -> [a]
     * @param {Number} index The position to insert the element
     * @param {*} elt The element to insert into the Array
     * @param {Array} list The list to insert into
     * @return {Array} A new Array with `elt` inserted at `index`.
     * @example
     *
     *      R.insert(2, 'x', [1,2,3,4]); //=> [1,2,'x',3,4]
     */
    var insert = _curry3(function insert(idx, elt, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        var result = _slice(list);
        result.splice(idx, 0, elt);
        return result;
    });

    /**
     * Inserts the sub-list into the list, at index `index`.  _Note  that this
     * is not destructive_: it returns a copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category List
     * @sig Number -> [a] -> [a] -> [a]
     * @param {Number} index The position to insert the sub-list
     * @param {Array} elts The sub-list to insert into the Array
     * @param {Array} list The list to insert the sub-list into
     * @return {Array} A new Array with `elts` inserted starting at `index`.
     * @example
     *
     *      R.insertAll(2, ['x','y','z'], [1,2,3,4]); //=> [1,2,'x','y','z',3,4]
     */
    var insertAll = _curry3(function insertAll(idx, elts, list) {
        idx = idx < list.length && idx >= 0 ? idx : list.length;
        return _concat(_concat(_slice(list, 0, idx), elts), _slice(list, idx));
    });

    /**
     * See if an object (`val`) is an instance of the supplied constructor.
     * This function will check up the inheritance chain, if any.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Type
     * @sig (* -> {*}) -> a -> Boolean
     * @param {Object} ctor A constructor
     * @param {*} val The value to test
     * @return {Boolean}
     * @example
     *
     *      R.is(Object, {}); //=> true
     *      R.is(Number, 1); //=> true
     *      R.is(Object, 1); //=> false
     *      R.is(String, 's'); //=> true
     *      R.is(String, new String('')); //=> true
     *      R.is(Object, new String('')); //=> true
     *      R.is(Object, 's'); //=> false
     *      R.is(Number, {}); //=> false
     */
    var is = _curry2(function is(Ctor, val) {
        return val != null && val.constructor === Ctor || val instanceof Ctor;
    });

    /**
     * Tests whether or not an object is similar to an array.
     *
     * @func
     * @memberOf R
     * @since v0.5.0
     * @category Type
     * @category List
     * @sig * -> Boolean
     * @param {*} x The object to test.
     * @return {Boolean} `true` if `x` has a numeric length property and extreme indices defined; `false` otherwise.
     * @example
     *
     *      R.isArrayLike([]); //=> true
     *      R.isArrayLike(true); //=> false
     *      R.isArrayLike({}); //=> false
     *      R.isArrayLike({length: 10}); //=> false
     *      R.isArrayLike({0: 'zero', 9: 'nine', length: 10}); //=> true
     */
    var isArrayLike = _curry1(function isArrayLike(x) {
        if (_isArray(x)) {
            return true;
        }
        if (!x) {
            return false;
        }
        if (typeof x !== 'object') {
            return false;
        }
        if (x instanceof String) {
            return false;
        }
        if (x.nodeType === 1) {
            return !!x.length;
        }
        if (x.length === 0) {
            return true;
        }
        if (x.length > 0) {
            return x.hasOwnProperty(0) && x.hasOwnProperty(x.length - 1);
        }
        return false;
    });

    /**
     * Checks if the input value is `null` or `undefined`.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Type
     * @sig * -> Boolean
     * @param {*} x The value to test.
     * @return {Boolean} `true` if `x` is `undefined` or `null`, otherwise `false`.
     * @example
     *
     *      R.isNil(null); //=> true
     *      R.isNil(undefined); //=> true
     *      R.isNil(0); //=> false
     *      R.isNil([]); //=> false
     */
    var isNil = _curry1(function isNil(x) {
        return x == null;
    });

    /**
     * Returns a list containing the names of all the enumerable own
     * properties of the supplied object.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {k: v} -> [k]
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own properties.
     * @example
     *
     *      R.keys({a: 1, b: 2, c: 3}); //=> ['a', 'b', 'c']
     */
    // cover IE < 9 keys issues
    var keys = function () {
        // cover IE < 9 keys issues
        var hasEnumBug = !{ toString: null }.propertyIsEnumerable('toString');
        var nonEnumerableProps = [
            'constructor',
            'valueOf',
            'isPrototypeOf',
            'toString',
            'propertyIsEnumerable',
            'hasOwnProperty',
            'toLocaleString'
        ];
        var contains = function contains(list, item) {
            var idx = 0;
            while (idx < list.length) {
                if (list[idx] === item) {
                    return true;
                }
                idx += 1;
            }
            return false;
        };
        return typeof Object.keys === 'function' ? _curry1(function keys(obj) {
            return Object(obj) !== obj ? [] : Object.keys(obj);
        }) : _curry1(function keys(obj) {
            if (Object(obj) !== obj) {
                return [];
            }
            var prop, ks = [], nIdx;
            for (prop in obj) {
                if (_has(prop, obj)) {
                    ks[ks.length] = prop;
                }
            }
            if (hasEnumBug) {
                nIdx = nonEnumerableProps.length - 1;
                while (nIdx >= 0) {
                    prop = nonEnumerableProps[nIdx];
                    if (_has(prop, obj) && !contains(ks, prop)) {
                        ks[ks.length] = prop;
                    }
                    nIdx -= 1;
                }
            }
            return ks;
        });
    }();

    /**
     * Returns a list containing the names of all the
     * properties of the supplied object, including prototype properties.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.2.0
     * @category Object
     * @sig {k: v} -> [k]
     * @param {Object} obj The object to extract properties from
     * @return {Array} An array of the object's own and prototype properties.
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      R.keysIn(f); //=> ['x', 'y']
     */
    var keysIn = _curry1(function keysIn(obj) {
        var prop, ks = [];
        for (prop in obj) {
            ks[ks.length] = prop;
        }
        return ks;
    });

    /**
     * Returns the number of elements in the array by returning `list.length`.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category List
     * @sig [a] -> Number
     * @param {Array} list The array to inspect.
     * @return {Number} The length of the array.
     * @example
     *
     *      R.length([]); //=> 0
     *      R.length([1, 2, 3]); //=> 3
     */
    var length = _curry1(function length(list) {
        return list != null && is(Number, list.length) ? list.length : NaN;
    });

    /**
     * Returns `true` if the first argument is less than the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @see R.gt
     * @example
     *
     *      R.lt(2, 1); //=> false
     *      R.lt(2, 2); //=> false
     *      R.lt(2, 3); //=> true
     *      R.lt('a', 'z'); //=> true
     *      R.lt('z', 'a'); //=> false
     */
    var lt = _curry2(function lt(a, b) {
        return a < b;
    });

    /**
     * Returns `true` if the first argument is less than or equal to the second;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord a => a -> a -> Boolean
     * @param {Number} a
     * @param {Number} b
     * @return {Boolean}
     * @see R.gte
     * @example
     *
     *      R.lte(2, 1); //=> false
     *      R.lte(2, 2); //=> true
     *      R.lte(2, 3); //=> true
     *      R.lte('a', 'z'); //=> true
     *      R.lte('z', 'a'); //=> false
     */
    var lte = _curry2(function lte(a, b) {
        return a <= b;
    });

    /**
     * The mapAccum function behaves like a combination of map and reduce; it applies a
     * function to each element of a list, passing an accumulating parameter from left to
     * right, and returning a final value of this accumulator together with the new list.
     *
     * The iterator function receives two arguments, *acc* and *value*, and should return
     * a tuple *[acc, value]*.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category List
     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var digits = ['1', '2', '3', '4'];
     *      var append = (a, b) => [a + b, a + b];
     *
     *      R.mapAccum(append, 0, digits); //=> ['01234', ['01', '012', '0123', '01234']]
     */
    var mapAccum = _curry3(function mapAccum(fn, acc, list) {
        var idx = 0, len = list.length, result = [], tuple = [acc];
        while (idx < len) {
            tuple = fn(tuple[0], list[idx]);
            result[idx] = tuple[1];
            idx += 1;
        }
        return [
            tuple[0],
            result
        ];
    });

    /**
     * The mapAccumRight function behaves like a combination of map and reduce; it applies a
     * function to each element of a list, passing an accumulating parameter from right
     * to left, and returning a final value of this accumulator together with the new list.
     *
     * Similar to `mapAccum`, except moves through the input list from the right to the
     * left.
     *
     * The iterator function receives two arguments, *acc* and *value*, and should return
     * a tuple *[acc, value]*.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category List
     * @sig (acc -> x -> (acc, y)) -> acc -> [x] -> (acc, [y])
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var digits = ['1', '2', '3', '4'];
     *      var append = (a, b) => [a + b, a + b];
     *
     *      R.mapAccumRight(append, 0, digits); //=> ['04321', ['04321', '0432', '043', '04']]
     */
    var mapAccumRight = _curry3(function mapAccumRight(fn, acc, list) {
        var idx = list.length - 1, result = [], tuple = [acc];
        while (idx >= 0) {
            tuple = fn(tuple[0], list[idx]);
            result[idx] = tuple[1];
            idx -= 1;
        }
        return [
            tuple[0],
            result
        ];
    });

    /**
     * Tests a regular expression against a String. Note that this function
     * will return an empty array when there are no matches. This differs
     * from [`String.prototype.match`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)
     * which returns `null` when there are no matches.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @see R.test
     * @category String
     * @sig RegExp -> String -> [String | Undefined]
     * @param {RegExp} rx A regular expression.
     * @param {String} str The string to match against
     * @return {Array} The list of matches or empty array.
     * @example
     *
     *      R.match(/([a-z]a)/g, 'bananas'); //=> ['ba', 'na', 'na']
     *      R.match(/a/, 'b'); //=> []
     *      R.match(/a/, null); //=> TypeError: null does not have a method named "match"
     */
    var match = _curry2(function match(rx, str) {
        return str.match(rx) || [];
    });

    /**
     * mathMod behaves like the modulo operator should mathematically, unlike the `%`
     * operator (and by extension, R.modulo). So while "-17 % 5" is -2,
     * mathMod(-17, 5) is 3. mathMod requires Integer arguments, and returns NaN
     * when the modulus is zero or negative.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} m The dividend.
     * @param {Number} p the modulus.
     * @return {Number} The result of `b mod a`.
     * @example
     *
     *      R.mathMod(-17, 5);  //=> 3
     *      R.mathMod(17, 5);   //=> 2
     *      R.mathMod(17, -5);  //=> NaN
     *      R.mathMod(17, 0);   //=> NaN
     *      R.mathMod(17.2, 5); //=> NaN
     *      R.mathMod(17, 5.3); //=> NaN
     *
     *      var clock = R.mathMod(R.__, 12);
     *      clock(15); //=> 3
     *      clock(24); //=> 0
     *
     *      var seventeenMod = R.mathMod(17);
     *      seventeenMod(3);  //=> 2
     *      seventeenMod(4);  //=> 1
     *      seventeenMod(10); //=> 7
     */
    var mathMod = _curry2(function mathMod(m, p) {
        if (!_isInteger(m)) {
            return NaN;
        }
        if (!_isInteger(p) || p < 1) {
            return NaN;
        }
        return (m % p + p) % p;
    });

    /**
     * Returns the larger of its two arguments.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord a => a -> a -> a
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.maxBy, R.min
     * @example
     *
     *      R.max(789, 123); //=> 789
     *      R.max('a', 'b'); //=> 'b'
     */
    var max = _curry2(function max(a, b) {
        return b > a ? b : a;
    });

    /**
     * Takes a function and two values, and returns whichever value produces
     * the larger result when passed to the provided function.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Relation
     * @sig Ord b => (a -> b) -> a -> a -> a
     * @param {Function} f
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.max, R.minBy
     * @example
     *
     *      //  square :: Number -> Number
     *      var square = n => n * n;
     *
     *      R.maxBy(square, -3, 2); //=> -3
     *
     *      R.reduce(R.maxBy(square), 0, [3, -5, 4, 1, -2]); //=> -5
     *      R.reduce(R.maxBy(square), 0, []); //=> 0
     */
    var maxBy = _curry3(function maxBy(f, a, b) {
        return f(b) > f(a) ? b : a;
    });

    /**
     * Create a new object with the own properties of `a`
     * merged with the own properties of object `b`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {k: v} -> {k: v} -> {k: v}
     * @param {Object} a
     * @param {Object} b
     * @return {Object}
     * @example
     *
     *      R.merge({ 'name': 'fred', 'age': 10 }, { 'age': 40 });
     *      //=> { 'name': 'fred', 'age': 40 }
     *
     *      var resetToDefault = R.merge(R.__, {x: 0});
     *      resetToDefault({x: 5, y: 2}); //=> {x: 0, y: 2}
     */
    var merge = _curry2(function merge(a, b) {
        var result = {};
        var ks = keys(a);
        var idx = 0;
        while (idx < ks.length) {
            result[ks[idx]] = a[ks[idx]];
            idx += 1;
        }
        ks = keys(b);
        idx = 0;
        while (idx < ks.length) {
            result[ks[idx]] = b[ks[idx]];
            idx += 1;
        }
        return result;
    });

    /**
     * Returns the smaller of its two arguments.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord a => a -> a -> a
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.minBy, R.max
     * @example
     *
     *      R.min(789, 123); //=> 123
     *      R.min('a', 'b'); //=> 'a'
     */
    var min = _curry2(function min(a, b) {
        return b < a ? b : a;
    });

    /**
     * Takes a function and two values, and returns whichever value produces
     * the smaller result when passed to the provided function.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Relation
     * @sig Ord b => (a -> b) -> a -> a -> a
     * @param {Function} f
     * @param {*} a
     * @param {*} b
     * @return {*}
     * @see R.min, R.maxBy
     * @example
     *
     *      //  square :: Number -> Number
     *      var square = n => n * n;
     *
     *      R.minBy(square, -3, 2); //=> 2
     *
     *      R.reduce(R.minBy(square), Infinity, [3, -5, 4, 1, -2]); //=> 1
     *      R.reduce(R.minBy(square), Infinity, []); //=> Infinity
     */
    var minBy = _curry3(function minBy(f, a, b) {
        return f(b) < f(a) ? b : a;
    });

    /**
     * Divides the second parameter by the first and returns the remainder.
     * Note that this function preserves the JavaScript-style behavior for
     * modulo. For mathematical modulo see `mathMod`.
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The value to the divide.
     * @param {Number} b The pseudo-modulus
     * @return {Number} The result of `b % a`.
     * @see R.mathMod
     * @example
     *
     *      R.modulo(17, 3); //=> 2
     *      // JS behavior:
     *      R.modulo(-17, 3); //=> -2
     *      R.modulo(17, -3); //=> 2
     *
     *      var isOdd = R.modulo(R.__, 2);
     *      isOdd(42); //=> 0
     *      isOdd(21); //=> 1
     */
    var modulo = _curry2(function modulo(a, b) {
        return a % b;
    });

    /**
     * Multiplies two numbers. Equivalent to `a * b` but curried.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The first value.
     * @param {Number} b The second value.
     * @return {Number} The result of `a * b`.
     * @see R.divide
     * @example
     *
     *      var double = R.multiply(2);
     *      var triple = R.multiply(3);
     *      double(3);       //=>  6
     *      triple(4);       //=> 12
     *      R.multiply(2, 5);  //=> 10
     */
    var multiply = _curry2(function multiply(a, b) {
        return a * b;
    });

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly `n`
     * parameters. Any extraneous parameters will not be passed to the supplied function.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig Number -> (* -> a) -> (* -> a)
     * @param {Number} n The desired arity of the new function.
     * @param {Function} fn The function to wrap.
     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
     *         arity `n`.
     * @example
     *
     *      var takesTwoArgs = (a, b) => [a, b];
     *
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = R.nAry(1, takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // Only `n` arguments are passed to the wrapped function
     *      takesOneArg(1, 2); //=> [1, undefined]
     */
    var nAry = _curry2(function nAry(n, fn) {
        switch (n) {
        case 0:
            return function () {
                return fn.call(this);
            };
        case 1:
            return function (a0) {
                return fn.call(this, a0);
            };
        case 2:
            return function (a0, a1) {
                return fn.call(this, a0, a1);
            };
        case 3:
            return function (a0, a1, a2) {
                return fn.call(this, a0, a1, a2);
            };
        case 4:
            return function (a0, a1, a2, a3) {
                return fn.call(this, a0, a1, a2, a3);
            };
        case 5:
            return function (a0, a1, a2, a3, a4) {
                return fn.call(this, a0, a1, a2, a3, a4);
            };
        case 6:
            return function (a0, a1, a2, a3, a4, a5) {
                return fn.call(this, a0, a1, a2, a3, a4, a5);
            };
        case 7:
            return function (a0, a1, a2, a3, a4, a5, a6) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6);
            };
        case 8:
            return function (a0, a1, a2, a3, a4, a5, a6, a7) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7);
            };
        case 9:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8);
            };
        case 10:
            return function (a0, a1, a2, a3, a4, a5, a6, a7, a8, a9) {
                return fn.call(this, a0, a1, a2, a3, a4, a5, a6, a7, a8, a9);
            };
        default:
            throw new Error('First argument to nAry must be a non-negative integer no greater than ten');
        }
    });

    /**
     * Negates its argument.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Math
     * @sig Number -> Number
     * @param {Number} n
     * @return {Number}
     * @example
     *
     *      R.negate(42); //=> -42
     */
    var negate = _curry1(function negate(n) {
        return -n;
    });

    /**
     * A function that returns the `!` of its argument. It will return `true` when
     * passed false-y value, and `false` when passed a truth-y one.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Logic
     * @sig * -> Boolean
     * @param {*} a any value
     * @return {Boolean} the logical inverse of passed argument.
     * @see R.complement
     * @example
     *
     *      R.not(true); //=> false
     *      R.not(false); //=> true
     *      R.not(0); => true
     *      R.not(1); => false
     */
    var not = _curry1(function not(a) {
        return !a;
    });

    /**
     * Returns the nth element of the given list or string.
     * If n is negative the element at index length + n is returned.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Number -> [a] -> a | Undefined
     * @sig Number -> String -> String
     * @param {Number} offset
     * @param {*} list
     * @return {*}
     * @example
     *
     *      var list = ['foo', 'bar', 'baz', 'quux'];
     *      R.nth(1, list); //=> 'bar'
     *      R.nth(-1, list); //=> 'quux'
     *      R.nth(-99, list); //=> undefined
     *
     *      R.nth('abc', 2); //=> 'c'
     *      R.nth('abc', 3); //=> ''
     */
    var nth = _curry2(function nth(offset, list) {
        var idx = offset < 0 ? list.length + offset : offset;
        return _isString(list) ? list.charAt(idx) : list[idx];
    });

    /**
     * Returns a function which returns its nth argument.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Function
     * @sig Number -> *... -> *
     * @param {Number} n
     * @return {Function}
     * @example
     *
     *      R.nthArg(1)('a', 'b', 'c'); //=> 'b'
     *      R.nthArg(-1)('a', 'b', 'c'); //=> 'c'
     */
    var nthArg = _curry1(function nthArg(n) {
        return function () {
            return nth(n, arguments);
        };
    });

    /**
     * Creates an object containing a single key:value pair.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category Object
     * @sig String -> a -> {String:a}
     * @param {String} key
     * @param {*} val
     * @return {Object}
     * @see R.pair
     * @example
     *
     *      var matchPhrases = R.compose(
     *        R.objOf('must'),
     *        R.map(R.objOf('match_phrase'))
     *      );
     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
     */
    var objOf = _curry2(function objOf(key, val) {
        var obj = {};
        obj[key] = val;
        return obj;
    });

    /**
     * Returns a singleton array containing the value provided.
     *
     * Note this `of` is different from the ES6 `of`; See
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/of
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Function
     * @sig a -> [a]
     * @param {*} x any value
     * @return {Array} An array wrapping `x`.
     * @example
     *
     *      R.of(null); //=> [null]
     *      R.of([42]); //=> [[42]]
     */
    var of = _curry1(_of);

    /**
     * Accepts a function `fn` and returns a function that guards invocation of `fn` such that
     * `fn` can only ever be called once, no matter how many times the returned function is
     * invoked. The first value calculated is returned in subsequent invocations.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (a... -> b) -> (a... -> b)
     * @param {Function} fn The function to wrap in a call-only-once wrapper.
     * @return {Function} The wrapped function.
     * @example
     *
     *      var addOneOnce = R.once(x => x + 1);
     *      addOneOnce(10); //=> 11
     *      addOneOnce(addOneOnce(50)); //=> 11
     */
    var once = _curry1(function once(fn) {
        var called = false, result;
        return function () {
            if (called) {
                return result;
            }
            called = true;
            result = fn.apply(this, arguments);
            return result;
        };
    });

    /**
     * Returns `true` if one or both of its arguments are `true`. Returns `false`
     * if both arguments are `false`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Logic
     * @sig * -> * -> *
     * @param {Boolean} a A boolean value
     * @param {Boolean} b A boolean value
     * @return {Boolean} `true` if one or both arguments are `true`, `false` otherwise
     * @see R.either
     * @example
     *
     *      R.or(true, true); //=> true
     *      R.or(true, false); //=> true
     *      R.or(false, true); //=> true
     *      R.or(false, false); //=> false
     */
    var or = _curry2(function or(a, b) {
        return a || b;
    });

    /**
     * Returns the result of "setting" the portion of the given data structure
     * focused by the given lens to the result of applying the given function to
     * the focused value.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Object
     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Lens s a -> (a -> a) -> s -> s
     * @param {Lens} lens
     * @param {*} v
     * @param {*} x
     * @return {*}
     * @see R.prop, R.lensIndex, R.lensProp
     * @example
     *
     *      var headLens = R.lensIndex(0);
     *
     *      R.over(headLens, R.toUpper, ['foo', 'bar', 'baz']); //=> ['FOO', 'bar', 'baz']
     */
    var over = function () {
        var Identity = function (x) {
            return {
                value: x,
                map: function (f) {
                    return Identity(f(x));
                }
            };
        };
        return _curry3(function over(lens, f, x) {
            return lens(function (y) {
                return Identity(f(y));
            })(x).value;
        });
    }();

    /**
     * Takes two arguments, `fst` and `snd`, and returns `[fst, snd]`.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category List
     * @sig a -> b -> (a,b)
     * @param {*} fst
     * @param {*} snd
     * @return {Array}
     * @see R.createMapEntry, R.of
     * @example
     *
     *      pair('foo', 'bar'); //=> ['foo', 'bar']
     */
    var pair = _curry2(function pair(fst, snd) {
        return [
            fst,
            snd
        ];
    });

    /**
     * Retrieve the value at a given path.
     *
     * @func
     * @memberOf R
     * @since v0.2.0
     * @category Object
     * @sig [String] -> {k: v} -> v | Undefined
     * @param {Array} path The path to use.
     * @return {*} The data at `path`.
     * @example
     *
     *      R.path(['a', 'b'], {a: {b: 2}}); //=> 2
     *      R.path(['a', 'b'], {c: {b: 2}}); //=> undefined
     */
    var path = _curry2(function path(paths, obj) {
        if (obj == null) {
            return;
        } else {
            var val = obj;
            var idx = 0;
            while (val != null && idx < paths.length) {
                val = val[paths[idx]];
                idx += 1;
            }
            return val;
        }
    });

    /**
     * If the given, non-null object has a value at the given path, returns
     * the value at that path. Otherwise returns the provided default value.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category Object
     * @sig a -> [String] -> Object -> a
     * @param {*} d The default value.
     * @param {Array} p The path to use.
     * @return {*} The data at `path` of the supplied object or the default value.
     * @example
     *
     *      R.pathOr('N/A', ['a', 'b'], {a: {b: 2}}); //=> 2
     *      R.pathOr('N/A', ['a', 'b'], {c: {b: 2}}); //=> "N/A"
     */
    var pathOr = _curry3(function pathOr(d, p, obj) {
        return defaultTo(d, path(p, obj));
    });

    /**
     * Returns a partial copy of an object containing only the keys specified.  If the key does not exist, the
     * property is ignored.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig [k] -> {k: v} -> {k: v}
     * @param {Array} names an array of String property names to copy onto a new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties from `names` on it.
     * @see R.omit, R.props
     * @example
     *
     *      R.pick(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
     *      R.pick(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1}
     */
    var pick = _curry2(function pick(names, obj) {
        var result = {};
        var idx = 0;
        while (idx < names.length) {
            if (names[idx] in obj) {
                result[names[idx]] = obj[names[idx]];
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Similar to `pick` except that this one includes a `key: undefined` pair for properties that don't exist.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig [k] -> {k: v} -> {k: v}
     * @param {Array} names an array of String property names to copy onto a new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties from `names` on it.
     * @see R.pick
     * @example
     *
     *      R.pickAll(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, d: 4}
     *      R.pickAll(['a', 'e', 'f'], {a: 1, b: 2, c: 3, d: 4}); //=> {a: 1, e: undefined, f: undefined}
     */
    var pickAll = _curry2(function pickAll(names, obj) {
        var result = {};
        var idx = 0;
        var len = names.length;
        while (idx < len) {
            var name = names[idx];
            result[name] = obj[name];
            idx += 1;
        }
        return result;
    });

    /**
     * Returns a partial copy of an object containing only the keys that
     * satisfy the supplied predicate.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Object
     * @sig (v, k -> Boolean) -> {k: v} -> {k: v}
     * @param {Function} pred A predicate to determine whether or not a key
     *        should be included on the output object.
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with only properties that satisfy `pred`
     *         on it.
     * @see R.pick
     * @example
     *
     *      var isUpperCase = (val, key) => key.toUpperCase() === key;
     *      R.pickBy(isUpperCase, {a: 1, b: 2, A: 3, B: 4}); //=> {A: 3, B: 4}
     */
    var pickBy = _curry2(function pickBy(test, obj) {
        var result = {};
        for (var prop in obj) {
            if (test(obj[prop], prop, obj)) {
                result[prop] = obj[prop];
            }
        }
        return result;
    });

    /**
     * Returns a new list with the given element at the front, followed by the contents of the
     * list.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig a -> [a] -> [a]
     * @param {*} el The item to add to the head of the output list.
     * @param {Array} list The array to add to the tail of the output list.
     * @return {Array} A new array.
     * @see R.append
     * @example
     *
     *      R.prepend('fee', ['fi', 'fo', 'fum']); //=> ['fee', 'fi', 'fo', 'fum']
     */
    var prepend = _curry2(function prepend(el, list) {
        return _concat([el], list);
    });

    /**
     * Returns a function that when supplied an object returns the indicated property of that object, if it exists.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig s -> {s: a} -> a | Undefined
     * @param {String} p The property name
     * @param {Object} obj The object to query
     * @return {*} The value at `obj.p`.
     * @example
     *
     *      R.prop('x', {x: 100}); //=> 100
     *      R.prop('x', {}); //=> undefined
     */
    var prop = _curry2(function prop(p, obj) {
        return obj[p];
    });

    /**
     * If the given, non-null object has an own property with the specified name,
     * returns the value of that property.
     * Otherwise returns the provided default value.
     *
     * @func
     * @memberOf R
     * @since v0.6.0
     * @category Object
     * @sig a -> String -> Object -> a
     * @param {*} val The default value.
     * @param {String} p The name of the property to return.
     * @param {Object} obj The object to query.
     * @return {*} The value of given property of the supplied object or the default value.
     * @example
     *
     *      var alice = {
     *        name: 'ALICE',
     *        age: 101
     *      };
     *      var favorite = R.prop('favoriteLibrary');
     *      var favoriteWithDefault = R.propOr('Ramda', 'favoriteLibrary');
     *
     *      favorite(alice);  //=> undefined
     *      favoriteWithDefault(alice);  //=> 'Ramda'
     */
    var propOr = _curry3(function propOr(val, p, obj) {
        return obj != null && _has(p, obj) ? obj[p] : val;
    });

    /**
     * Returns `true` if the specified object property satisfies the given
     * predicate; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Logic
     * @sig (a -> Boolean) -> String -> {String: a} -> Boolean
     * @param {Function} pred
     * @param {String} name
     * @param {*} obj
     * @return {Boolean}
     * @see R.propEq
     * @see R.propIs
     * @example
     *
     *      R.propSatisfies(x => x > 0, 'x', {x: 1, y: 2}); //=> true
     */
    var propSatisfies = _curry3(function propSatisfies(pred, name, obj) {
        return pred(obj[name]);
    });

    /**
     * Acts as multiple `prop`: array of keys in, array of values out. Preserves order.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig [k] -> {k: v} -> [v]
     * @param {Array} ps The property names to fetch
     * @param {Object} obj The object to query
     * @return {Array} The corresponding values or partially applied function.
     * @example
     *
     *      R.props(['x', 'y'], {x: 1, y: 2}); //=> [1, 2]
     *      R.props(['c', 'a', 'b'], {b: 2, a: 1}); //=> [undefined, 1, 2]
     *
     *      var fullName = R.compose(R.join(' '), R.props(['first', 'last']));
     *      fullName({last: 'Bullet-Tooth', age: 33, first: 'Tony'}); //=> 'Tony Bullet-Tooth'
     */
    var props = _curry2(function props(ps, obj) {
        var len = ps.length;
        var out = [];
        var idx = 0;
        while (idx < len) {
            out[idx] = obj[ps[idx]];
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a list of numbers from `from` (inclusive) to `to`
     * (exclusive).
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Number -> Number -> [Number]
     * @param {Number} from The first number in the list.
     * @param {Number} to One more than the last number in the list.
     * @return {Array} The list of numbers in tthe set `[a, b)`.
     * @example
     *
     *      R.range(1, 5);    //=> [1, 2, 3, 4]
     *      R.range(50, 53);  //=> [50, 51, 52]
     */
    var range = _curry2(function range(from, to) {
        if (!(_isNumber(from) && _isNumber(to))) {
            throw new TypeError('Both arguments to range must be numbers');
        }
        var result = [];
        var n = from;
        while (n < to) {
            result.push(n);
            n += 1;
        }
        return result;
    });

    /**
     * Returns a single item by iterating through the list, successively calling the iterator
     * function and passing it an accumulator value and the current value from the array, and
     * then passing the result to the next call.
     *
     * Similar to `reduce`, except moves through the input list from the right to the left.
     *
     * The iterator function receives two values: *(acc, value)*
     *
     * Note: `R.reduceRight` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduceRight#Description
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a,b -> a) -> a -> [b] -> a
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var pairs = [ ['a', 1], ['b', 2], ['c', 3] ];
     *      var flattenPairs = (acc, pair) => acc.concat(pair);
     *
     *      R.reduceRight(flattenPairs, [], pairs); //=> [ 'c', 3, 'b', 2, 'a', 1 ]
     */
    var reduceRight = _curry3(function reduceRight(fn, acc, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
            acc = fn(acc, list[idx]);
            idx -= 1;
        }
        return acc;
    });

    /**
     * Returns a value wrapped to indicate that it is the final value of the
     * reduce and transduce functions.  The returned value
     * should be considered a black box: the internal structure is not
     * guaranteed to be stable.
     *
     * Note: this optimization is unavailable to functions not explicitly listed
     * above.  For instance, it is not currently supported by reduceIndexed,
     * reduceRight, or reduceRightIndexed.
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category List
     * @see R.reduce, R.transduce
     * @sig a -> *
     * @param {*} x The final value of the reduce.
     * @return {*} The wrapped value.
     * @example
     *
     *      R.reduce(
     *        R.pipe(R.add, R.when(R.gte(R.__, 10), R.reduced)),
     *        0,
     *        [1, 2, 3, 4, 5]) // 10
     */
    var reduced = _curry1(_reduced);

    /**
     * Removes the sub-list of `list` starting at index `start` and containing
     * `count` elements.  _Note that this is not destructive_: it returns a
     * copy of the list with the changes.
     * <small>No lists have been harmed in the application of this function.</small>
     *
     * @func
     * @memberOf R
     * @since v0.2.2
     * @category List
     * @sig Number -> Number -> [a] -> [a]
     * @param {Number} start The position to start removing elements
     * @param {Number} count The number of elements to remove
     * @param {Array} list The list to remove from
     * @return {Array} A new Array with `count` elements from `start` removed.
     * @example
     *
     *      R.remove(2, 3, [1,2,3,4,5,6,7,8]); //=> [1,2,6,7,8]
     */
    var remove = _curry3(function remove(start, count, list) {
        return _concat(_slice(list, 0, Math.min(start, list.length)), _slice(list, Math.min(list.length, start + count)));
    });

    /**
     * Replace a substring or regex match in a string with a replacement.
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category String
     * @sig RegExp|String -> String -> String -> String
     * @param {RegExp|String} pattern A regular expression or a substring to match.
     * @param {String} replacement The string to replace the matches with.
     * @param {String} str The String to do the search and replacement in.
     * @return {String} The result.
     * @example
     *
     *      R.replace('foo', 'bar', 'foo foo foo'); //=> 'bar foo foo'
     *      R.replace(/foo/, 'bar', 'foo foo foo'); //=> 'bar foo foo'
     *
     *      // Use the "g" (global) flag to replace all occurrences:
     *      R.replace(/foo/g, 'bar', 'foo foo foo'); //=> 'bar bar bar'
     */
    var replace = _curry3(function replace(regex, replacement, str) {
        return str.replace(regex, replacement);
    });

    /**
     * Returns a new list or string with the elements or characters in reverse
     * order.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {Array|String} list
     * @return {Array|String}
     * @example
     *
     *      R.reverse([1, 2, 3]);  //=> [3, 2, 1]
     *      R.reverse([1, 2]);     //=> [2, 1]
     *      R.reverse([1]);        //=> [1]
     *      R.reverse([]);         //=> []
     *
     *      R.reverse('abc');      //=> 'cba'
     *      R.reverse('ab');       //=> 'ba'
     *      R.reverse('a');        //=> 'a'
     *      R.reverse('');         //=> ''
     */
    var reverse = _curry1(function reverse(list) {
        return _isString(list) ? list.split('').reverse().join('') : _slice(list).reverse();
    });

    /**
     * Scan is similar to reduce, but returns a list of successively reduced values from the left
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category List
     * @sig (a,b -> a) -> a -> [b] -> [a]
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {Array} A list of all intermediately reduced values.
     * @example
     *
     *      var numbers = [1, 2, 3, 4];
     *      var factorials = R.scan(R.multiply, 1, numbers); //=> [1, 1, 2, 6, 24]
     */
    var scan = _curry3(function scan(fn, acc, list) {
        var idx = 0, len = list.length, result = [acc];
        while (idx < len) {
            acc = fn(acc, list[idx]);
            result[idx + 1] = acc;
            idx += 1;
        }
        return result;
    });

    /**
     * Returns the result of "setting" the portion of the given data structure
     * focused by the given lens to the given value.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Object
     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Lens s a -> a -> s -> s
     * @param {Lens} lens
     * @param {*} v
     * @param {*} x
     * @return {*}
     * @see R.prop, R.lensIndex, R.lensProp
     * @example
     *
     *      var xLens = R.lensProp('x');
     *
     *      R.set(xLens, 4, {x: 1, y: 2});  //=> {x: 4, y: 2}
     *      R.set(xLens, 8, {x: 1, y: 2});  //=> {x: 8, y: 2}
     */
    var set = _curry3(function set(lens, v, x) {
        return over(lens, always(v), x);
    });

    /**
     * Returns a copy of the list, sorted according to the comparator function, which should accept two values at a
     * time and return a negative number if the first value is smaller, a positive number if it's larger, and zero
     * if they are equal.  Please note that this is a **copy** of the list.  It does not modify the original.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a,a -> Number) -> [a] -> [a]
     * @param {Function} comparator A sorting function :: a -> b -> Int
     * @param {Array} list The list to sort
     * @return {Array} a new array with its elements sorted by the comparator function.
     * @example
     *
     *      var diff = function(a, b) { return a - b; };
     *      R.sort(diff, [4,2,7,5]); //=> [2, 4, 5, 7]
     */
    var sort = _curry2(function sort(comparator, list) {
        return _slice(list).sort(comparator);
    });

    /**
     * Sorts the list according to the supplied function.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig Ord b => (a -> b) -> [a] -> [a]
     * @param {Function} fn
     * @param {Array} list The list to sort.
     * @return {Array} A new list sorted by the keys generated by `fn`.
     * @example
     *
     *      var sortByFirstItem = R.sortBy(R.prop(0));
     *      var sortByNameCaseInsensitive = R.sortBy(R.compose(R.toLower, R.prop('name')));
     *      var pairs = [[-1, 1], [-2, 2], [-3, 3]];
     *      sortByFirstItem(pairs); //=> [[-3, 3], [-2, 2], [-1, 1]]
     *      var alice = {
     *        name: 'ALICE',
     *        age: 101
     *      };
     *      var bob = {
     *        name: 'Bob',
     *        age: -10
     *      };
     *      var clara = {
     *        name: 'clara',
     *        age: 314.159
     *      };
     *      var people = [clara, bob, alice];
     *      sortByNameCaseInsensitive(people); //=> [alice, bob, clara]
     */
    var sortBy = _curry2(function sortBy(fn, list) {
        return _slice(list).sort(function (a, b) {
            var aa = fn(a);
            var bb = fn(b);
            return aa < bb ? -1 : aa > bb ? 1 : 0;
        });
    });

    /**
     * Subtracts two numbers. Equivalent to `a - b` but curried.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Math
     * @sig Number -> Number -> Number
     * @param {Number} a The first value.
     * @param {Number} b The second value.
     * @return {Number} The result of `a - b`.
     * @see R.add
     * @example
     *
     *      R.subtract(10, 8); //=> 2
     *
     *      var minus5 = R.subtract(R.__, 5);
     *      minus5(17); //=> 12
     *
     *      var complementaryAngle = R.subtract(90);
     *      complementaryAngle(30); //=> 60
     *      complementaryAngle(72); //=> 18
     */
    var subtract = _curry2(function subtract(a, b) {
        return a - b;
    });

    /**
     * Returns a new list containing the last `n` elements of a given list, passing each value
     * to the supplied predicate function, and terminating when the predicate function returns
     * `false`. Excludes the element that caused the predicate function to fail. The predicate
     * function is passed one argument: *(value)*.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.dropLastWhile
     * @example
     *
     *      var isNotOne = x => x !== 1;
     *
     *      R.takeLastWhile(isNotOne, [1, 2, 3, 4]); //=> [2, 3, 4]
     */
    var takeLastWhile = _curry2(function takeLastWhile(fn, list) {
        var idx = list.length - 1;
        while (idx >= 0 && fn(list[idx])) {
            idx -= 1;
        }
        return _slice(list, idx + 1, Infinity);
    });

    /**
     * Runs the given function with the supplied object, then returns the object.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (a -> *) -> a -> a
     * @param {Function} fn The function to call with `x`. The return value of `fn` will be thrown away.
     * @param {*} x
     * @return {*} `x`.
     * @example
     *
     *      var sayX = x => console.log('x is ' + x);
     *      R.tap(sayX, 100); //=> 100
     *      //-> 'x is 100'
     */
    var tap = _curry2(function tap(fn, x) {
        fn(x);
        return x;
    });

    /**
     * Calls an input function `n` times, returning an array containing the results of those
     * function calls.
     *
     * `fn` is passed one argument: The current value of `n`, which begins at `0` and is
     * gradually incremented to `n - 1`.
     *
     * @func
     * @memberOf R
     * @since v0.2.3
     * @category List
     * @sig (i -> a) -> i -> [a]
     * @param {Function} fn The function to invoke. Passed one argument, the current value of `n`.
     * @param {Number} n A value between `0` and `n - 1`. Increments after each function call.
     * @return {Array} An array containing the return values of all calls to `fn`.
     * @example
     *
     *      R.times(R.identity, 5); //=> [0, 1, 2, 3, 4]
     */
    var times = _curry2(function times(fn, n) {
        var len = Number(n);
        var list = new Array(len);
        var idx = 0;
        while (idx < len) {
            list[idx] = fn(idx);
            idx += 1;
        }
        return list;
    });

    /**
     * Converts an object into an array of key, value arrays.
     * Only the object's own properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.4.0
     * @category Object
     * @sig {String: *} -> [[String,*]]
     * @param {Object} obj The object to extract from
     * @return {Array} An array of key, value arrays from the object's own properties.
     * @see R.fromPairs
     * @example
     *
     *      R.toPairs({a: 1, b: 2, c: 3}); //=> [['a', 1], ['b', 2], ['c', 3]]
     */
    var toPairs = _curry1(function toPairs(obj) {
        var pairs = [];
        for (var prop in obj) {
            if (_has(prop, obj)) {
                pairs[pairs.length] = [
                    prop,
                    obj[prop]
                ];
            }
        }
        return pairs;
    });

    /**
     * Converts an object into an array of key, value arrays.
     * The object's own properties and prototype properties are used.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.4.0
     * @category Object
     * @sig {String: *} -> [[String,*]]
     * @param {Object} obj The object to extract from
     * @return {Array} An array of key, value arrays from the object's own
     *         and prototype properties.
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      R.toPairsIn(f); //=> [['x','X'], ['y','Y']]
     */
    var toPairsIn = _curry1(function toPairsIn(obj) {
        var pairs = [];
        for (var prop in obj) {
            pairs[pairs.length] = [
                prop,
                obj[prop]
            ];
        }
        return pairs;
    });

    /**
     * Removes (strips) whitespace from both ends of the string.
     *
     * @func
     * @memberOf R
     * @since v0.6.0
     * @category String
     * @sig String -> String
     * @param {String} str The string to trim.
     * @return {String} Trimmed version of `str`.
     * @example
     *
     *      R.trim('   xyz  '); //=> 'xyz'
     *      R.map(R.trim, R.split(',', 'x, y, z')); //=> ['x', 'y', 'z']
     */
    var trim = function () {
        var ws = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028' + '\u2029\uFEFF';
        var zeroWidth = '\u200B';
        var hasProtoTrim = typeof String.prototype.trim === 'function';
        if (!hasProtoTrim || (ws.trim() || !zeroWidth.trim())) {
            return _curry1(function trim(str) {
                var beginRx = new RegExp('^[' + ws + '][' + ws + ']*');
                var endRx = new RegExp('[' + ws + '][' + ws + ']*$');
                return str.replace(beginRx, '').replace(endRx, '');
            });
        } else {
            return _curry1(function trim(str) {
                return str.trim();
            });
        }
    }();

    /**
     * Gives a single-word string description of the (native) type of a value, returning such
     * answers as 'Object', 'Number', 'Array', or 'Null'.  Does not attempt to distinguish user
     * Object types any further, reporting them all as 'Object'.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Type
     * @sig (* -> {*}) -> String
     * @param {*} val The value to test
     * @return {String}
     * @example
     *
     *      R.type({}); //=> "Object"
     *      R.type(1); //=> "Number"
     *      R.type(false); //=> "Boolean"
     *      R.type('s'); //=> "String"
     *      R.type(null); //=> "Null"
     *      R.type([]); //=> "Array"
     *      R.type(/[A-z]/); //=> "RegExp"
     */
    var type = _curry1(function type(val) {
        return val === null ? 'Null' : val === undefined ? 'Undefined' : Object.prototype.toString.call(val).slice(8, -1);
    });

    /**
     * Takes a function `fn`, which takes a single array argument, and returns
     * a function which:
     *
     *   - takes any number of positional arguments;
     *   - passes these arguments to `fn` as an array; and
     *   - returns the result.
     *
     * In other words, R.unapply derives a variadic function from a function
     * which takes an array. R.unapply is the inverse of R.apply.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Function
     * @sig ([*...] -> a) -> (*... -> a)
     * @param {Function} fn
     * @return {Function}
     * @see R.apply
     * @example
     *
     *      R.unapply(JSON.stringify)(1, 2, 3); //=> '[1,2,3]'
     */
    var unapply = _curry1(function unapply(fn) {
        return function () {
            return fn(_slice(arguments));
        };
    });

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly 1
     * parameter. Any extraneous parameters will not be passed to the supplied function.
     *
     * @func
     * @memberOf R
     * @since v0.2.0
     * @category Function
     * @sig (* -> b) -> (a -> b)
     * @param {Function} fn The function to wrap.
     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
     *         arity 1.
     * @example
     *
     *      var takesTwoArgs = function(a, b) {
     *        return [a, b];
     *      };
     *      takesTwoArgs.length; //=> 2
     *      takesTwoArgs(1, 2); //=> [1, 2]
     *
     *      var takesOneArg = R.unary(takesTwoArgs);
     *      takesOneArg.length; //=> 1
     *      // Only 1 argument is passed to the wrapped function
     *      takesOneArg(1, 2); //=> [1, undefined]
     */
    var unary = _curry1(function unary(fn) {
        return nAry(1, fn);
    });

    /**
     * Returns a function of arity `n` from a (manually) curried function.
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category Function
     * @sig Number -> (a -> b) -> (a -> c)
     * @param {Number} length The arity for the returned function.
     * @param {Function} fn The function to uncurry.
     * @return {Function} A new function.
     * @see R.curry
     * @example
     *
     *      var addFour = a => b => c => d => a + b + c + d;
     *
     *      var uncurriedAddFour = R.uncurryN(4, addFour);
     *      uncurriedAddFour(1, 2, 3, 4); //=> 10
     */
    var uncurryN = _curry2(function uncurryN(depth, fn) {
        return curryN(depth, function () {
            var currentDepth = 1;
            var value = fn;
            var idx = 0;
            var endIdx;
            while (currentDepth <= depth && typeof value === 'function') {
                endIdx = currentDepth === depth ? arguments.length : idx + value.length;
                value = value.apply(this, _slice(arguments, idx, endIdx));
                currentDepth += 1;
                idx = endIdx;
            }
            return value;
        });
    });

    /**
     * Builds a list from a seed value. Accepts an iterator function, which returns either false
     * to stop iteration or an array of length 2 containing the value to add to the resulting
     * list and the seed to be used in the next call to the iterator function.
     *
     * The iterator function receives one argument: *(seed)*.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category List
     * @sig (a -> [b]) -> * -> [b]
     * @param {Function} fn The iterator function. receives one argument, `seed`, and returns
     *        either false to quit iteration or an array of length two to proceed. The element
     *        at index 0 of this array will be added to the resulting array, and the element
     *        at index 1 will be passed to the next call to `fn`.
     * @param {*} seed The seed value.
     * @return {Array} The final list.
     * @example
     *
     *      var f = n => n > 50 ? false : [-n, n + 10];
     *      R.unfold(f, 10); //=> [-10, -20, -30, -40, -50]
     */
    var unfold = _curry2(function unfold(fn, seed) {
        var pair = fn(seed);
        var result = [];
        while (pair && pair.length) {
            result[result.length] = pair[0];
            pair = fn(pair[1]);
        }
        return result;
    });

    /**
     * Returns a new list containing only one copy of each element in the original list, based
     * upon the value returned by applying the supplied predicate to two list elements. Prefers
     * the first item if two items compare equal based on the predicate.
     *
     * @func
     * @memberOf R
     * @since v0.2.0
     * @category List
     * @sig (a, a -> Boolean) -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      var strEq = R.eqBy(String);
     *      R.uniqWith(strEq)([1, '1', 2, 1]); //=> [1, 2]
     *      R.uniqWith(strEq)([{}, {}]);       //=> [{}]
     *      R.uniqWith(strEq)([1, '1', 1]);    //=> [1]
     *      R.uniqWith(strEq)(['1', 1, 1]);    //=> ['1']
     */
    var uniqWith = _curry2(function uniqWith(pred, list) {
        var idx = 0, len = list.length;
        var result = [], item;
        while (idx < len) {
            item = list[idx];
            if (!_containsWith(pred, item, result)) {
                result[result.length] = item;
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Tests the final argument by passing it to the given predicate function.
     * If the predicate is not satisfied, the function will return the
     * result of calling the `whenFalseFn` function with the same argument. If the
     * predicate is satisfied, the argument is returned as is.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category Logic
     * @see R.ifElse, R.when
     * @sig (a -> Boolean) -> (a -> a) -> a -> a
     * @param {Function} pred        A predicate function
     * @param {Function} whenFalseFn A function to invoke when the `pred` evaluates
     *                               to a falsy value.
     * @param {*}        x           An object to test with the `pred` function and
     *                               pass to `whenFalseFn` if necessary.
     * @return {*} Either `x` or the result of applying `x` to `whenFalseFn`.
     * @example
     *
     *      // coerceArray :: (a|[a]) -> [a]
     *      var coerceArray = R.unless(R.isArrayLike, R.of);
     *      coerceArray([1, 2, 3]); //=> [1, 2, 3]
     *      coerceArray(1);         //=> [1]
     */
    var unless = _curry3(function unless(pred, whenFalseFn, x) {
        return pred(x) ? x : whenFalseFn(x);
    });

    /**
     * Returns a new copy of the array with the element at the
     * provided index replaced with the given value.
     * @see R.adjust
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category List
     * @sig Number -> a -> [a] -> [a]
     * @param {Number} idx The index to update.
     * @param {*} x The value to exist at the given index of the returned array.
     * @param {Array|Arguments} list The source array-like object to be updated.
     * @return {Array} A copy of `list` with the value at index `idx` replaced with `x`.
     * @example
     *
     *      R.update(1, 11, [0, 1, 2]);     //=> [0, 11, 2]
     *      R.update(1)(11)([0, 1, 2]);     //=> [0, 11, 2]
     */
    var update = _curry3(function update(idx, x, list) {
        return adjust(always(x), idx, list);
    });

    /**
     * Returns a list of all the enumerable own properties of the supplied object.
     * Note that the order of the output array is not guaranteed across
     * different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {k: v} -> [v]
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own properties.
     * @example
     *
     *      R.values({a: 1, b: 2, c: 3}); //=> [1, 2, 3]
     */
    var values = _curry1(function values(obj) {
        var props = keys(obj);
        var len = props.length;
        var vals = [];
        var idx = 0;
        while (idx < len) {
            vals[idx] = obj[props[idx]];
            idx += 1;
        }
        return vals;
    });

    /**
     * Returns a list of all the properties, including prototype properties,
     * of the supplied object.
     * Note that the order of the output array is not guaranteed to be
     * consistent across different JS platforms.
     *
     * @func
     * @memberOf R
     * @since v0.2.0
     * @category Object
     * @sig {k: v} -> [v]
     * @param {Object} obj The object to extract values from
     * @return {Array} An array of the values of the object's own and prototype properties.
     * @example
     *
     *      var F = function() { this.x = 'X'; };
     *      F.prototype.y = 'Y';
     *      var f = new F();
     *      R.valuesIn(f); //=> ['X', 'Y']
     */
    var valuesIn = _curry1(function valuesIn(obj) {
        var prop, vs = [];
        for (prop in obj) {
            vs[vs.length] = obj[prop];
        }
        return vs;
    });

    /**
     * Returns a "view" of the given data structure, determined by the given lens.
     * The lens's focus determines which portion of the data structure is visible.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Object
     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Lens s a -> s -> a
     * @param {Lens} lens
     * @param {*} x
     * @return {*}
     * @see R.prop, R.lensIndex, R.lensProp
     * @example
     *
     *      var xLens = R.lensProp('x');
     *
     *      R.view(xLens, {x: 1, y: 2});  //=> 1
     *      R.view(xLens, {x: 4, y: 2});  //=> 4
     */
    var view = function () {
        var Const = function (x) {
            return {
                value: x,
                map: function () {
                    return this;
                }
            };
        };
        return _curry2(function view(lens, x) {
            return lens(Const)(x).value;
        });
    }();

    /**
     * Tests the final argument by passing it to the given predicate function.
     * If the predicate is satisfied, the function will return the result
     * of calling the `whenTrueFn` function with the same argument. If the predicate
     * is not satisfied, the argument is returned as is.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category Logic
     * @see R.ifElse, R.unless
     * @sig (a -> Boolean) -> (a -> a) -> a -> a
     * @param {Function} pred       A predicate function
     * @param {Function} whenTrueFn A function to invoke when the `condition`
     *                              evaluates to a truthy value.
     * @param {*}        x          An object to test with the `pred` function and
     *                              pass to `whenTrueFn` if necessary.
     * @return {*} Either `x` or the result of applying `x` to `whenTrueFn`.
     * @example
     *
     *      // truncate :: String -> String
     *      var truncate = R.when(
     *        R.propSatisfies(R.gt(R.__, 10), 'length'),
     *        R.pipe(R.take(10), R.append('…'), R.join(''))
     *      );
     *      truncate('12345');         //=> '12345'
     *      truncate('0123456789ABC'); //=> '0123456789…'
     */
    var when = _curry3(function when(pred, whenTrueFn, x) {
        return pred(x) ? whenTrueFn(x) : x;
    });

    /**
     * Takes a spec object and a test object; returns true if the test satisfies
     * the spec. Each of the spec's own properties must be a predicate function.
     * Each predicate is applied to the value of the corresponding property of
     * the test object. `where` returns true if all the predicates return true,
     * false otherwise.
     *
     * `where` is well suited to declaratively expressing constraints for other
     * functions such as `filter` and `find`.
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category Object
     * @sig {String: (* -> Boolean)} -> {String: *} -> Boolean
     * @param {Object} spec
     * @param {Object} testObj
     * @return {Boolean}
     * @example
     *
     *      // pred :: Object -> Boolean
     *      var pred = R.where({
     *        a: R.equals('foo'),
     *        b: R.complement(R.equals('bar')),
     *        x: R.gt(_, 10),
     *        y: R.lt(_, 20)
     *      });
     *
     *      pred({a: 'foo', b: 'xxx', x: 11, y: 19}); //=> true
     *      pred({a: 'xxx', b: 'xxx', x: 11, y: 19}); //=> false
     *      pred({a: 'foo', b: 'bar', x: 11, y: 19}); //=> false
     *      pred({a: 'foo', b: 'xxx', x: 10, y: 19}); //=> false
     *      pred({a: 'foo', b: 'xxx', x: 11, y: 20}); //=> false
     */
    var where = _curry2(function where(spec, testObj) {
        for (var prop in spec) {
            if (_has(prop, spec) && !spec[prop](testObj[prop])) {
                return false;
            }
        }
        return true;
    });

    /**
     * Wrap a function inside another to allow you to make adjustments to the parameters, or do
     * other processing either before the internal function is called or with its results.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (a... -> b) -> ((a... -> b) -> a... -> c) -> (a... -> c)
     * @param {Function} fn The function to wrap.
     * @param {Function} wrapper The wrapper function.
     * @return {Function} The wrapped function.
     * @example
     *
     *      var greet = name => 'Hello ' + name;
     *
     *      var shoutedGreet = R.wrap(greet, (gr, name) => gr(name).toUpperCase());
     *
     *      shoutedGreet("Kathy"); //=> "HELLO KATHY"
     *
     *      var shortenedGreet = R.wrap(greet, function(gr, name) {
     *        return gr(name.substring(0, 3));
     *      });
     *      shortenedGreet("Robert"); //=> "Hello Rob"
     */
    var wrap = _curry2(function wrap(fn, wrapper) {
        return curryN(fn.length, function () {
            return wrapper.apply(this, _concat([fn], arguments));
        });
    });

    /**
     * Creates a new list out of the two supplied by creating each possible
     * pair from the lists.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [b] -> [[a,b]]
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The list made by combining each possible pair from
     *         `as` and `bs` into pairs (`[a, b]`).
     * @example
     *
     *      R.xprod([1, 2], ['a', 'b']); //=> [[1, 'a'], [1, 'b'], [2, 'a'], [2, 'b']]
     */
    // = xprodWith(prepend); (takes about 3 times as long...)
    var xprod = _curry2(function xprod(a, b) {
        // = xprodWith(prepend); (takes about 3 times as long...)
        var idx = 0;
        var ilen = a.length;
        var j;
        var jlen = b.length;
        var result = [];
        while (idx < ilen) {
            j = 0;
            while (j < jlen) {
                result[result.length] = [
                    a[idx],
                    b[j]
                ];
                j += 1;
            }
            idx += 1;
        }
        return result;
    });

    /**
     * Creates a new list out of the two supplied by pairing up
     * equally-positioned items from both lists.  The returned list is
     * truncated to the length of the shorter of the two input lists.
     * Note: `zip` is equivalent to `zipWith(function(a, b) { return [a, b] })`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [b] -> [[a,b]]
     * @param {Array} list1 The first array to consider.
     * @param {Array} list2 The second array to consider.
     * @return {Array} The list made by pairing up same-indexed elements of `list1` and `list2`.
     * @example
     *
     *      R.zip([1, 2, 3], ['a', 'b', 'c']); //=> [[1, 'a'], [2, 'b'], [3, 'c']]
     */
    var zip = _curry2(function zip(a, b) {
        var rv = [];
        var idx = 0;
        var len = Math.min(a.length, b.length);
        while (idx < len) {
            rv[idx] = [
                a[idx],
                b[idx]
            ];
            idx += 1;
        }
        return rv;
    });

    /**
     * Creates a new object out of a list of keys and a list of values.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category List
     * @sig [String] -> [*] -> {String: *}
     * @param {Array} keys The array that will be properties on the output object.
     * @param {Array} values The list of values on the output object.
     * @return {Object} The object made by pairing up same-indexed elements of `keys` and `values`.
     * @example
     *
     *      R.zipObj(['a', 'b', 'c'], [1, 2, 3]); //=> {a: 1, b: 2, c: 3}
     */
    var zipObj = _curry2(function zipObj(keys, values) {
        var idx = 0, len = keys.length, out = {};
        while (idx < len) {
            out[keys[idx]] = values[idx];
            idx += 1;
        }
        return out;
    });

    /**
     * Creates a new list out of the two supplied by applying the function to
     * each equally-positioned pair in the lists. The returned list is
     * truncated to the length of the shorter of the two input lists.
     *
     * @function
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a,b -> c) -> [a] -> [b] -> [c]
     * @param {Function} fn The function used to combine the two elements into one value.
     * @param {Array} list1 The first array to consider.
     * @param {Array} list2 The second array to consider.
     * @return {Array} The list made by combining same-indexed elements of `list1` and `list2`
     *         using `fn`.
     * @example
     *
     *      var f = (x, y) => {
     *        // ...
     *      };
     *      R.zipWith(f, [1, 2, 3], ['a', 'b', 'c']);
     *      //=> [f(1, 'a'), f(2, 'b'), f(3, 'c')]
     */
    var zipWith = _curry3(function zipWith(fn, a, b) {
        var rv = [], idx = 0, len = Math.min(a.length, b.length);
        while (idx < len) {
            rv[idx] = fn(a[idx], b[idx]);
            idx += 1;
        }
        return rv;
    });

    /**
     * A function that always returns `false`. Any passed in parameters are ignored.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Function
     * @sig * -> Boolean
     * @param {*}
     * @return {Boolean}
     * @see R.always, R.T
     * @example
     *
     *      R.F(); //=> false
     */
    var F = always(false);

    /**
     * A function that always returns `true`. Any passed in parameters are ignored.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Function
     * @sig * -> Boolean
     * @param {*}
     * @return {Boolean}
     * @see R.always, R.F
     * @example
     *
     *      R.T(); //=> true
     */
    var T = always(true);

    var _aperture = function _aperture(n, list) {
        var idx = 0;
        var limit = list.length - (n - 1);
        var acc = new Array(limit >= 0 ? limit : 0);
        while (idx < limit) {
            acc[idx] = _slice(list, idx, idx + n);
            idx += 1;
        }
        return acc;
    };

    /**
     * Similar to hasMethod, this checks whether a function has a [methodname]
     * function. If it isn't an array it will execute that function otherwise it will
     * default to the ramda implementation.
     *
     * @private
     * @param {Function} fn ramda implemtation
     * @param {String} methodname property to check for a custom implementation
     * @return {Object} Whatever the return value of the method is.
     */
    var _checkForMethod = function _checkForMethod(methodname, fn) {
        return function () {
            var length = arguments.length;
            if (length === 0) {
                return fn();
            }
            var obj = arguments[length - 1];
            return _isArray(obj) || typeof obj[methodname] !== 'function' ? fn.apply(this, arguments) : obj[methodname].apply(obj, _slice(arguments, 0, length - 1));
        };
    };

    /**
     * Copies an object.
     *
     * @private
     * @param {*} value The value to be copied
     * @param {Array} refFrom Array containing the source references
     * @param {Array} refTo Array containing the copied source references
     * @return {*} The copied value.
     */
    var _clone = function _clone(value, refFrom, refTo) {
        var copy = function copy(copiedValue) {
            var len = refFrom.length;
            var idx = 0;
            while (idx < len) {
                if (value === refFrom[idx]) {
                    return refTo[idx];
                }
                idx += 1;
            }
            refFrom[idx + 1] = value;
            refTo[idx + 1] = copiedValue;
            for (var key in value) {
                copiedValue[key] = _clone(value[key], refFrom, refTo);
            }
            return copiedValue;
        };
        switch (type(value)) {
        case 'Object':
            return copy({});
        case 'Array':
            return copy([]);
        case 'Date':
            return new Date(value);
        case 'RegExp':
            return _cloneRegExp(value);
        default:
            return value;
        }
    };

    var _createPartialApplicator = function _createPartialApplicator(concat) {
        return _curry2(function (fn, args) {
            return _arity(Math.max(0, fn.length - args.length), function () {
                return fn.apply(this, concat(args, arguments));
            });
        });
    };

    /**
     * Returns a function that dispatches with different strategies based on the
     * object in list position (last argument). If it is an array, executes [fn].
     * Otherwise, if it has a  function with [methodname], it will execute that
     * function (functor case). Otherwise, if it is a transformer, uses transducer
     * [xf] to return a new transformer (transducer case). Otherwise, it will
     * default to executing [fn].
     *
     * @private
     * @param {String} methodname property to check for a custom implementation
     * @param {Function} xf transducer to initialize if object is transformer
     * @param {Function} fn default ramda implementation
     * @return {Function} A function that dispatches on object in list position
     */
    var _dispatchable = function _dispatchable(methodname, xf, fn) {
        return function () {
            var length = arguments.length;
            if (length === 0) {
                return fn();
            }
            var obj = arguments[length - 1];
            if (!_isArray(obj)) {
                var args = _slice(arguments, 0, length - 1);
                if (typeof obj[methodname] === 'function') {
                    return obj[methodname].apply(obj, args);
                }
                if (_isTransformer(obj)) {
                    var transducer = xf.apply(null, args);
                    return transducer(obj);
                }
            }
            return fn.apply(this, arguments);
        };
    };

    // Values of other types are only equal if identical.
    var _equals = function _equals(a, b, stackA, stackB) {
        if (identical(a, b)) {
            return true;
        }
        if (type(a) !== type(b)) {
            return false;
        }
        if (a == null || b == null) {
            return false;
        }
        if (typeof a.equals === 'function' || typeof b.equals === 'function') {
            return typeof a.equals === 'function' && a.equals(b) && typeof b.equals === 'function' && b.equals(a);
        }
        switch (type(a)) {
        case 'Arguments':
        case 'Array':
        case 'Object':
            break;
        case 'Boolean':
        case 'Number':
        case 'String':
            if (!(typeof a === typeof b && identical(a.valueOf(), b.valueOf()))) {
                return false;
            }
            break;
        case 'Date':
            if (!identical(a.valueOf(), b.valueOf())) {
                return false;
            }
            break;
        case 'RegExp':
            if (!(a.source === b.source && a.global === b.global && a.ignoreCase === b.ignoreCase && a.multiline === b.multiline && a.sticky === b.sticky && a.unicode === b.unicode)) {
                return false;
            }
            break;
        case 'Map':
        case 'Set':
            if (!_equals(_arrayFromIterator(a.entries()), _arrayFromIterator(b.entries()), stackA, stackB)) {
                return false;
            }
            break;
        case 'Int8Array':
        case 'Uint8Array':
        case 'Uint8ClampedArray':
        case 'Int16Array':
        case 'Uint16Array':
        case 'Int32Array':
        case 'Uint32Array':
        case 'Float32Array':
        case 'Float64Array':
            break;
        case 'ArrayBuffer':
            break;
        default:
            // Values of other types are only equal if identical.
            return false;
        }
        var keysA = keys(a);
        if (keysA.length !== keys(b).length) {
            return false;
        }
        var idx = stackA.length - 1;
        while (idx >= 0) {
            if (stackA[idx] === a) {
                return stackB[idx] === b;
            }
            idx -= 1;
        }
        stackA.push(a);
        stackB.push(b);
        idx = keysA.length - 1;
        while (idx >= 0) {
            var key = keysA[idx];
            if (!(_has(key, b) && _equals(b[key], a[key], stackA, stackB))) {
                return false;
            }
            idx -= 1;
        }
        stackA.pop();
        stackB.pop();
        return true;
    };

    /**
     * `_makeFlat` is a helper function that returns a one-level or fully recursive function
     * based on the flag passed in.
     *
     * @private
     */
    var _makeFlat = function _makeFlat(recursive) {
        return function flatt(list) {
            var value, result = [], idx = 0, j, ilen = list.length, jlen;
            while (idx < ilen) {
                if (isArrayLike(list[idx])) {
                    value = recursive ? flatt(list[idx]) : list[idx];
                    j = 0;
                    jlen = value.length;
                    while (j < jlen) {
                        result[result.length] = value[j];
                        j += 1;
                    }
                } else {
                    result[result.length] = list[idx];
                }
                idx += 1;
            }
            return result;
        };
    };

    var _reduce = function () {
        function _arrayReduce(xf, acc, list) {
            var idx = 0, len = list.length;
            while (idx < len) {
                acc = xf['@@transducer/step'](acc, list[idx]);
                if (acc && acc['@@transducer/reduced']) {
                    acc = acc['@@transducer/value'];
                    break;
                }
                idx += 1;
            }
            return xf['@@transducer/result'](acc);
        }
        function _iterableReduce(xf, acc, iter) {
            var step = iter.next();
            while (!step.done) {
                acc = xf['@@transducer/step'](acc, step.value);
                if (acc && acc['@@transducer/reduced']) {
                    acc = acc['@@transducer/value'];
                    break;
                }
                step = iter.next();
            }
            return xf['@@transducer/result'](acc);
        }
        function _methodReduce(xf, acc, obj) {
            return xf['@@transducer/result'](obj.reduce(bind(xf['@@transducer/step'], xf), acc));
        }
        var symIterator = typeof Symbol !== 'undefined' ? Symbol.iterator : '@@iterator';
        return function _reduce(fn, acc, list) {
            if (typeof fn === 'function') {
                fn = _xwrap(fn);
            }
            if (isArrayLike(list)) {
                return _arrayReduce(fn, acc, list);
            }
            if (typeof list.reduce === 'function') {
                return _methodReduce(fn, acc, list);
            }
            if (list[symIterator] != null) {
                return _iterableReduce(fn, acc, list[symIterator]());
            }
            if (typeof list.next === 'function') {
                return _iterableReduce(fn, acc, list);
            }
            throw new TypeError('reduce: list must be array or iterable');
        };
    }();

    var _xall = function () {
        function XAll(f, xf) {
            this.xf = xf;
            this.f = f;
            this.all = true;
        }
        XAll.prototype['@@transducer/init'] = _xfBase.init;
        XAll.prototype['@@transducer/result'] = function (result) {
            if (this.all) {
                result = this.xf['@@transducer/step'](result, true);
            }
            return this.xf['@@transducer/result'](result);
        };
        XAll.prototype['@@transducer/step'] = function (result, input) {
            if (!this.f(input)) {
                this.all = false;
                result = _reduced(this.xf['@@transducer/step'](result, false));
            }
            return result;
        };
        return _curry2(function _xall(f, xf) {
            return new XAll(f, xf);
        });
    }();

    var _xany = function () {
        function XAny(f, xf) {
            this.xf = xf;
            this.f = f;
            this.any = false;
        }
        XAny.prototype['@@transducer/init'] = _xfBase.init;
        XAny.prototype['@@transducer/result'] = function (result) {
            if (!this.any) {
                result = this.xf['@@transducer/step'](result, false);
            }
            return this.xf['@@transducer/result'](result);
        };
        XAny.prototype['@@transducer/step'] = function (result, input) {
            if (this.f(input)) {
                this.any = true;
                result = _reduced(this.xf['@@transducer/step'](result, true));
            }
            return result;
        };
        return _curry2(function _xany(f, xf) {
            return new XAny(f, xf);
        });
    }();

    var _xaperture = function () {
        function XAperture(n, xf) {
            this.xf = xf;
            this.pos = 0;
            this.full = false;
            this.acc = new Array(n);
        }
        XAperture.prototype['@@transducer/init'] = _xfBase.init;
        XAperture.prototype['@@transducer/result'] = _xfBase.result;
        XAperture.prototype['@@transducer/step'] = function (result, input) {
            this.store(input);
            return this.full ? this.xf['@@transducer/step'](result, this.getCopy()) : result;
        };
        XAperture.prototype.store = function (input) {
            this.acc[this.pos] = input;
            this.pos += 1;
            if (this.pos === this.acc.length) {
                this.pos = 0;
                this.full = true;
            }
        };
        XAperture.prototype.getCopy = function () {
            return _concat(_slice(this.acc, this.pos), _slice(this.acc, 0, this.pos));
        };
        return _curry2(function _xaperture(n, xf) {
            return new XAperture(n, xf);
        });
    }();

    var _xdrop = function () {
        function XDrop(n, xf) {
            this.xf = xf;
            this.n = n;
        }
        XDrop.prototype['@@transducer/init'] = _xfBase.init;
        XDrop.prototype['@@transducer/result'] = _xfBase.result;
        XDrop.prototype['@@transducer/step'] = function (result, input) {
            if (this.n > 0) {
                this.n -= 1;
                return result;
            }
            return this.xf['@@transducer/step'](result, input);
        };
        return _curry2(function _xdrop(n, xf) {
            return new XDrop(n, xf);
        });
    }();

    var _xdropWhile = function () {
        function XDropWhile(f, xf) {
            this.xf = xf;
            this.f = f;
        }
        XDropWhile.prototype['@@transducer/init'] = _xfBase.init;
        XDropWhile.prototype['@@transducer/result'] = _xfBase.result;
        XDropWhile.prototype['@@transducer/step'] = function (result, input) {
            if (this.f) {
                if (this.f(input)) {
                    return result;
                }
                this.f = null;
            }
            return this.xf['@@transducer/step'](result, input);
        };
        return _curry2(function _xdropWhile(f, xf) {
            return new XDropWhile(f, xf);
        });
    }();

    var _xgroupBy = function () {
        function XGroupBy(f, xf) {
            this.xf = xf;
            this.f = f;
            this.inputs = {};
        }
        XGroupBy.prototype['@@transducer/init'] = _xfBase.init;
        XGroupBy.prototype['@@transducer/result'] = function (result) {
            var key;
            for (key in this.inputs) {
                if (_has(key, this.inputs)) {
                    result = this.xf['@@transducer/step'](result, this.inputs[key]);
                    if (result['@@transducer/reduced']) {
                        result = result['@@transducer/value'];
                        break;
                    }
                }
            }
            return this.xf['@@transducer/result'](result);
        };
        XGroupBy.prototype['@@transducer/step'] = function (result, input) {
            var key = this.f(input);
            this.inputs[key] = this.inputs[key] || [
                key,
                []
            ];
            this.inputs[key][1] = append(input, this.inputs[key][1]);
            return result;
        };
        return _curry2(function _xgroupBy(f, xf) {
            return new XGroupBy(f, xf);
        });
    }();

    /**
     * Creates a new list iteration function from an existing one by adding two new parameters
     * to its callback function: the current index, and the entire list.
     *
     * This would turn, for instance, Ramda's simple `map` function into one that more closely
     * resembles `Array.prototype.map`.  Note that this will only work for functions in which
     * the iteration callback function is the first parameter, and where the list is the last
     * parameter.  (This latter might be unimportant if the list parameter is not used.)
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category Function
     * @category List
     * @sig ((a ... -> b) ... -> [a] -> *) -> (a ..., Int, [a] -> b) ... -> [a] -> *)
     * @param {Function} fn A list iteration function that does not pass index or list to its callback
     * @return {Function} An altered list iteration function that passes (item, index, list) to its callback
     * @example
     *
     *      var mapIndexed = R.addIndex(R.map);
     *      mapIndexed((val, idx) => idx + '-' + val, ['f', 'o', 'o', 'b', 'a', 'r']);
     *      //=> ['0-f', '1-o', '2-o', '3-b', '4-a', '5-r']
     */
    var addIndex = _curry1(function addIndex(fn) {
        return curryN(fn.length, function () {
            var idx = 0;
            var origFn = arguments[0];
            var list = arguments[arguments.length - 1];
            var args = _slice(arguments);
            args[0] = function () {
                var result = origFn.apply(this, _concat(arguments, [
                    idx,
                    list
                ]));
                idx += 1;
                return result;
            };
            return fn.apply(this, args);
        });
    });

    /**
     * Returns `true` if all elements of the list match the predicate, `false` if there are any
     * that don't.
     *
     * Dispatches to the `all` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> Boolean
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the predicate is satisfied by every element, `false`
     *         otherwise.
     * @see R.any, R.none
     * @example
     *
     *      var lessThan2 = R.flip(R.lt)(2);
     *      var lessThan3 = R.flip(R.lt)(3);
     *      R.all(lessThan2)([1, 2]); //=> false
     *      R.all(lessThan3)([1, 2]); //=> true
     */
    var all = _curry2(_dispatchable('all', _xall, function all(fn, list) {
        var idx = 0;
        while (idx < list.length) {
            if (!fn(list[idx])) {
                return false;
            }
            idx += 1;
        }
        return true;
    }));

    /**
     * Returns `true` if at least one of elements of the list match the predicate, `false`
     * otherwise.
     *
     * Dispatches to the `any` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> Boolean
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the predicate is satisfied by at least one element, `false`
     *         otherwise.
     * @see R.all, R.none
     * @example
     *
     *      var lessThan0 = R.flip(R.lt)(0);
     *      var lessThan2 = R.flip(R.lt)(2);
     *      R.any(lessThan0)([1, 2]); //=> false
     *      R.any(lessThan2)([1, 2]); //=> true
     */
    var any = _curry2(_dispatchable('any', _xany, function any(fn, list) {
        var idx = 0;
        while (idx < list.length) {
            if (fn(list[idx])) {
                return true;
            }
            idx += 1;
        }
        return false;
    }));

    /**
     * Returns a new list, composed of n-tuples of consecutive elements
     * If `n` is greater than the length of the list, an empty list is returned.
     *
     * Dispatches to the `aperture` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category List
     * @sig Number -> [a] -> [[a]]
     * @param {Number} n The size of the tuples to create
     * @param {Array} list The list to split into `n`-tuples
     * @return {Array} The new list.
     * @example
     *
     *      R.aperture(2, [1, 2, 3, 4, 5]); //=> [[1, 2], [2, 3], [3, 4], [4, 5]]
     *      R.aperture(3, [1, 2, 3, 4, 5]); //=> [[1, 2, 3], [2, 3, 4], [3, 4, 5]]
     *      R.aperture(7, [1, 2, 3, 4, 5]); //=> []
     */
    var aperture = _curry2(_dispatchable('aperture', _xaperture, _aperture));

    /**
     * Wraps a function of any arity (including nullary) in a function that accepts exactly 2
     * parameters. Any extraneous parameters will not be passed to the supplied function.
     *
     * @func
     * @memberOf R
     * @since v0.2.0
     * @category Function
     * @sig (* -> c) -> (a, b -> c)
     * @param {Function} fn The function to wrap.
     * @return {Function} A new function wrapping `fn`. The new function is guaranteed to be of
     *         arity 2.
     * @example
     *
     *      var takesThreeArgs = function(a, b, c) {
     *        return [a, b, c];
     *      };
     *      takesThreeArgs.length; //=> 3
     *      takesThreeArgs(1, 2, 3); //=> [1, 2, 3]
     *
     *      var takesTwoArgs = R.binary(takesThreeArgs);
     *      takesTwoArgs.length; //=> 2
     *      // Only 2 arguments are passed to the wrapped function
     *      takesTwoArgs(1, 2, 3); //=> [1, 2, undefined]
     */
    var binary = _curry1(function binary(fn) {
        return nAry(2, fn);
    });

    /**
     * Creates a deep copy of the value which may contain (nested) `Array`s and `Object`s, `Number`s,
     * `String`s, `Boolean`s and `Date`s. `Function`s are not copied, but assigned by their
     * reference. Dispatches to a `clone` method if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig {*} -> {*}
     * @param {*} value The object or array to clone
     * @return {*} A new object or array.
     * @example
     *
     *      var objects = [{}, {}, {}];
     *      var objectsClone = R.clone(objects);
     *      objects[0] === objectsClone[0]; //=> false
     */
    var clone = _curry1(function clone(value) {
        return value != null && typeof value.clone === 'function' ? value.clone() : _clone(value, [], []);
    });

    /**
     * Creates an object containing a single key:value pair.
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Object
     * @sig String -> a -> {String:a}
     * @param {String} key
     * @param {*} val
     * @return {Object}
     * @see R.pair, R.objOf
     * @deprecated since v0.18.0
     * @example
     *
     *      var matchPhrases = R.compose(
     *        R.createMapEntry('must'),
     *        R.map(R.createMapEntry('match_phrase'))
     *      );
     *      matchPhrases(['foo', 'bar', 'baz']); //=> {must: [{match_phrase: 'foo'}, {match_phrase: 'bar'}, {match_phrase: 'baz'}]}
     */
    var createMapEntry = objOf;

    /**
     * Returns a curried equivalent of the provided function. The curried
     * function has two unusual capabilities. First, its arguments needn't
     * be provided one at a time. If `f` is a ternary function and `g` is
     * `R.curry(f)`, the following are equivalent:
     *
     *   - `g(1)(2)(3)`
     *   - `g(1)(2, 3)`
     *   - `g(1, 2)(3)`
     *   - `g(1, 2, 3)`
     *
     * Secondly, the special placeholder value `R.__` may be used to specify
     * "gaps", allowing partial application of any combination of arguments,
     * regardless of their positions. If `g` is as above and `_` is `R.__`,
     * the following are equivalent:
     *
     *   - `g(1, 2, 3)`
     *   - `g(_, 2, 3)(1)`
     *   - `g(_, _, 3)(1)(2)`
     *   - `g(_, _, 3)(1, 2)`
     *   - `g(_, 2)(1)(3)`
     *   - `g(_, 2)(1, 3)`
     *   - `g(_, 2)(_, 3)(1)`
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (* -> a) -> (* -> a)
     * @param {Function} fn The function to curry.
     * @return {Function} A new, curried function.
     * @see R.curryN
     * @example
     *
     *      var addFourNumbers = (a, b, c, d) => a + b + c + d;
     *
     *      var curriedAddFourNumbers = R.curry(addFourNumbers);
     *      var f = curriedAddFourNumbers(1, 2);
     *      var g = f(3);
     *      g(4); //=> 10
     */
    var curry = _curry1(function curry(fn) {
        return curryN(fn.length, fn);
    });

    /**
     * Returns a new list containing the last `n` elements of a given list, passing each value
     * to the supplied predicate function, skipping elements while the predicate function returns
     * `true`. The predicate function is passed one argument: *(value)*.
     *
     * Dispatches to the `dropWhile` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.takeWhile
     * @example
     *
     *      var lteTwo = x => x <= 2;
     *
     *      R.dropWhile(lteTwo, [1, 2, 3, 4, 3, 2, 1]); //=> [3, 4, 3, 2, 1]
     */
    var dropWhile = _curry2(_dispatchable('dropWhile', _xdropWhile, function dropWhile(pred, list) {
        var idx = 0, len = list.length;
        while (idx < len && pred(list[idx])) {
            idx += 1;
        }
        return _slice(list, idx);
    }));

    /**
     * Returns `true` if its arguments are equivalent, `false` otherwise.
     * Dispatches to an `equals` method if present. Handles cyclical data
     * structures.
     *
     * Dispatches to the `equals` method of both arguments, if present.
     *
     * @func
     * @memberOf R
     * @since v0.15.0
     * @category Relation
     * @sig a -> b -> Boolean
     * @param {*} a
     * @param {*} b
     * @return {Boolean}
     * @example
     *
     *      R.equals(1, 1); //=> true
     *      R.equals(1, '1'); //=> false
     *      R.equals([1, 2, 3], [1, 2, 3]); //=> true
     *
     *      var a = {}; a.v = a;
     *      var b = {}; b.v = b;
     *      R.equals(a, b); //=> true
     */
    var equals = _curry2(function equals(a, b) {
        return _equals(a, b, [], []);
    });

    /**
     * Returns a new list containing only those items that match a given predicate function.
     * The predicate function is passed one argument: *(value)*.
     *
     * Note that `R.filter` does not skip deleted or unassigned indices, unlike the native
     * `Array.prototype.filter` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter#Description
     *
     * Dispatches to the `filter` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} The new filtered array.
     * @see R.reject
     * @example
     *
     *      var isEven = n => n % 2 === 0;
     *
     *      R.filter(isEven, [1, 2, 3, 4]); //=> [2, 4]
     */
    var filter = _curry2(_dispatchable('filter', _xfilter, _filter));

    /**
     * Returns the first element of the list which matches the predicate, or `undefined` if no
     * element matches.
     *
     * Dispatches to the `find` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> a | undefined
     * @param {Function} fn The predicate function used to determine if the element is the
     *        desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @example
     *
     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
     *      R.find(R.propEq('a', 2))(xs); //=> {a: 2}
     *      R.find(R.propEq('a', 4))(xs); //=> undefined
     */
    var find = _curry2(_dispatchable('find', _xfind, function find(fn, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
            if (fn(list[idx])) {
                return list[idx];
            }
            idx += 1;
        }
    }));

    /**
     * Returns the index of the first element of the list which matches the predicate, or `-1`
     * if no element matches.
     *
     * Dispatches to the `findIndex` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category List
     * @sig (a -> Boolean) -> [a] -> Number
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Number} The index of the element found, or `-1`.
     * @example
     *
     *      var xs = [{a: 1}, {a: 2}, {a: 3}];
     *      R.findIndex(R.propEq('a', 2))(xs); //=> 1
     *      R.findIndex(R.propEq('a', 4))(xs); //=> -1
     */
    var findIndex = _curry2(_dispatchable('findIndex', _xfindIndex, function findIndex(fn, list) {
        var idx = 0;
        var len = list.length;
        while (idx < len) {
            if (fn(list[idx])) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    }));

    /**
     * Returns the last element of the list which matches the predicate, or `undefined` if no
     * element matches.
     *
     * Dispatches to the `findLast` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category List
     * @sig (a -> Boolean) -> [a] -> a | undefined
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Object} The element found, or `undefined`.
     * @example
     *
     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
     *      R.findLast(R.propEq('a', 1))(xs); //=> {a: 1, b: 1}
     *      R.findLast(R.propEq('a', 4))(xs); //=> undefined
     */
    var findLast = _curry2(_dispatchable('findLast', _xfindLast, function findLast(fn, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
            if (fn(list[idx])) {
                return list[idx];
            }
            idx -= 1;
        }
    }));

    /**
     * Returns the index of the last element of the list which matches the predicate, or
     * `-1` if no element matches.
     *
     * Dispatches to the `findLastIndex` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category List
     * @sig (a -> Boolean) -> [a] -> Number
     * @param {Function} fn The predicate function used to determine if the element is the
     * desired one.
     * @param {Array} list The array to consider.
     * @return {Number} The index of the element found, or `-1`.
     * @example
     *
     *      var xs = [{a: 1, b: 0}, {a:1, b: 1}];
     *      R.findLastIndex(R.propEq('a', 1))(xs); //=> 1
     *      R.findLastIndex(R.propEq('a', 4))(xs); //=> -1
     */
    var findLastIndex = _curry2(_dispatchable('findLastIndex', _xfindLastIndex, function findLastIndex(fn, list) {
        var idx = list.length - 1;
        while (idx >= 0) {
            if (fn(list[idx])) {
                return idx;
            }
            idx -= 1;
        }
        return -1;
    }));

    /**
     * Returns a new list by pulling every item out of it (and all its sub-arrays) and putting
     * them in a new array, depth-first.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [b]
     * @param {Array} list The array to consider.
     * @return {Array} The flattened list.
     * @see R.unnest
     * @example
     *
     *      R.flatten([1, 2, [3, 4], 5, [6, [7, 8, [9, [10, 11], 12]]]]);
     *      //=> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
     */
    var flatten = _curry1(_makeFlat(true));

    /**
     * Returns a new function much like the supplied one, except that the first two arguments'
     * order is reversed.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (a -> b -> c -> ... -> z) -> (b -> a -> c -> ... -> z)
     * @param {Function} fn The function to invoke with its first two parameters reversed.
     * @return {*} The result of invoking `fn` with its first two parameters' order reversed.
     * @example
     *
     *      var mergeThree = (a, b, c) => [].concat(a, b, c);
     *
     *      mergeThree(1, 2, 3); //=> [1, 2, 3]
     *
     *      R.flip(mergeThree)(1, 2, 3); //=> [2, 1, 3]
     */
    var flip = _curry1(function flip(fn) {
        return curry(function (a, b) {
            var args = _slice(arguments);
            args[0] = b;
            args[1] = a;
            return fn.apply(this, args);
        });
    });

    /**
     * Iterate over an input `list`, calling a provided function `fn` for each element in the
     * list.
     *
     * `fn` receives one argument: *(value)*.
     *
     * Note: `R.forEach` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.forEach` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach#Description
     *
     * Also note that, unlike `Array.prototype.forEach`, Ramda's `forEach` returns the original
     * array. In some libraries this function is named `each`.
     *
     * Dispatches to the `forEach` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category List
     * @sig (a -> *) -> [a] -> [a]
     * @param {Function} fn The function to invoke. Receives one argument, `value`.
     * @param {Array} list The list to iterate over.
     * @return {Array} The original list.
     * @example
     *
     *      var printXPlusFive = x => console.log(x + 5);
     *      R.forEach(printXPlusFive, [1, 2, 3]); //=> [1, 2, 3]
     *      //-> 6
     *      //-> 7
     *      //-> 8
     */
    var forEach = _curry2(_checkForMethod('forEach', function forEach(fn, list) {
        var len = list.length;
        var idx = 0;
        while (idx < len) {
            fn(list[idx]);
            idx += 1;
        }
        return list;
    }));

    /**
     * Returns a list of function names of object's own functions
     *
     * @func
     * @memberOf R
     * @since v0.4.0
     * @category Object
     * @sig {*} -> [String]
     * @param {Object} obj The objects with functions in it
     * @return {Array} A list of the object's own properties that map to functions.
     * @deprecated since v0.18.0
     * @example
     *
     *      R.functions(R); // returns list of ramda's own function names
     *
     *      var F = function() { this.x = function(){}; this.y = 1; }
     *      F.prototype.z = function() {};
     *      F.prototype.a = 100;
     *      R.functions(new F()); //=> ["x"]
     */
    var functions = _curry1(_functionsWith(keys));

    /**
     * Returns a list of function names of object's own and prototype functions
     *
     * @func
     * @memberOf R
     * @since v0.4.0
     * @category Object
     * @sig {*} -> [String]
     * @param {Object} obj The objects with functions in it
     * @return {Array} A list of the object's own properties and prototype
     *         properties that map to functions.
     * @deprecated since v0.18.0
     * @example
     *
     *      R.functionsIn(R); // returns list of ramda's own and prototype function names
     *
     *      var F = function() { this.x = function(){}; this.y = 1; }
     *      F.prototype.z = function() {};
     *      F.prototype.a = 100;
     *      R.functionsIn(new F()); //=> ["x", "z"]
     */
    var functionsIn = _curry1(_functionsWith(keysIn));

    /**
     * Splits a list into sub-lists stored in an object, based on the result of calling a String-returning function
     * on each element, and grouping the results according to values returned.
     *
     * Dispatches to the `groupBy` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> String) -> [a] -> {String: [a]}
     * @param {Function} fn Function :: a -> String
     * @param {Array} list The array to group
     * @return {Object} An object with the output of `fn` for keys, mapped to arrays of elements
     *         that produced that key when passed to `fn`.
     * @example
     *
     *      var byGrade = R.groupBy(function(student) {
     *        var score = student.score;
     *        return score < 65 ? 'F' :
     *               score < 70 ? 'D' :
     *               score < 80 ? 'C' :
     *               score < 90 ? 'B' : 'A';
     *      });
     *      var students = [{name: 'Abby', score: 84},
     *                      {name: 'Eddy', score: 58},
     *                      // ...
     *                      {name: 'Jack', score: 69}];
     *      byGrade(students);
     *      // {
     *      //   'A': [{name: 'Dianne', score: 99}],
     *      //   'B': [{name: 'Abby', score: 84}]
     *      //   // ...,
     *      //   'F': [{name: 'Eddy', score: 58}]
     *      // }
     */
    var groupBy = _curry2(_dispatchable('groupBy', _xgroupBy, function groupBy(fn, list) {
        return _reduce(function (acc, elt) {
            var key = fn(elt);
            acc[key] = append(elt, acc[key] || (acc[key] = []));
            return acc;
        }, {}, list);
    }));

    /**
     * Returns the first element of the given list or string. In some libraries
     * this function is named `first`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @see R.tail, R.init, R.last
     * @sig [a] -> a | Undefined
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.head(['fi', 'fo', 'fum']); //=> 'fi'
     *      R.head([]); //=> undefined
     *
     *      R.head('abc'); //=> 'a'
     *      R.head(''); //=> ''
     */
    var head = nth(0);

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those
     * elements common to both lists.  Duplication is determined according
     * to the value returned by applying the supplied predicate to two list
     * elements.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
     * @param {Function} pred A predicate function that determines whether
     *        the two supplied elements are equal.
     * @param {Array} list1 One list of items to compare
     * @param {Array} list2 A second list of items to compare
     * @see R.intersection
     * @return {Array} A new list containing those elements common to both lists.
     * @example
     *
     *      var buffaloSpringfield = [
     *        {id: 824, name: 'Richie Furay'},
     *        {id: 956, name: 'Dewey Martin'},
     *        {id: 313, name: 'Bruce Palmer'},
     *        {id: 456, name: 'Stephen Stills'},
     *        {id: 177, name: 'Neil Young'}
     *      ];
     *      var csny = [
     *        {id: 204, name: 'David Crosby'},
     *        {id: 456, name: 'Stephen Stills'},
     *        {id: 539, name: 'Graham Nash'},
     *        {id: 177, name: 'Neil Young'}
     *      ];
     *
     *      R.intersectionWith(R.eqBy(R.prop('id')), buffaloSpringfield, csny);
     *      //=> [{id: 456, name: 'Stephen Stills'}, {id: 177, name: 'Neil Young'}]
     */
    var intersectionWith = _curry3(function intersectionWith(pred, list1, list2) {
        var results = [], idx = 0;
        while (idx < list1.length) {
            if (_containsWith(pred, list1[idx], list2)) {
                results[results.length] = list1[idx];
            }
            idx += 1;
        }
        return uniqWith(pred, results);
    });

    /**
     * Creates a new list with the separator interposed between elements.
     *
     * Dispatches to the `intersperse` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category List
     * @sig a -> [a] -> [a]
     * @param {*} separator The element to add to the list.
     * @param {Array} list The list to be interposed.
     * @return {Array} The new list.
     * @example
     *
     *      R.intersperse('n', ['ba', 'a', 'a']); //=> ['ba', 'n', 'a', 'n', 'a']
     */
    var intersperse = _curry2(_checkForMethod('intersperse', function intersperse(separator, list) {
        var out = [];
        var idx = 0;
        var length = list.length;
        while (idx < length) {
            if (idx === length - 1) {
                out.push(list[idx]);
            } else {
                out.push(list[idx], separator);
            }
            idx += 1;
        }
        return out;
    }));

    /**
     * Same as R.invertObj, however this accounts for objects
     * with duplicate values by putting the values into an
     * array.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Object
     * @sig {s: x} -> {x: [ s, ... ]}
     * @param {Object} obj The object or array to invert
     * @return {Object} out A new object with keys
     * in an array.
     * @example
     *
     *      var raceResultsByFirstName = {
     *        first: 'alice',
     *        second: 'jake',
     *        third: 'alice',
     *      };
     *      R.invert(raceResultsByFirstName);
     *      //=> { 'alice': ['first', 'third'], 'jake':['second'] }
     */
    var invert = _curry1(function invert(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = 0;
        var out = {};
        while (idx < len) {
            var key = props[idx];
            var val = obj[key];
            var list = _has(val, out) ? out[val] : out[val] = [];
            list[list.length] = key;
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a new object with the keys of the given object
     * as values, and the values of the given object, which are
     * coerced to strings, as keys.
     * Note that the last key found is preferred when handling
     * the same value.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Object
     * @sig {s: x} -> {x: s}
     * @param {Object} obj The object or array to invert
     * @return {Object} out A new object
     * @example
     *
     *      var raceResults = {
     *        first: 'alice',
     *        second: 'jake'
     *      };
     *      R.invertObj(raceResults);
     *      //=> { 'alice': 'first', 'jake':'second' }
     *
     *      // Alternatively:
     *      var raceResults = ['alice', 'jake'];
     *      R.invertObj(raceResults);
     *      //=> { 'alice': '0', 'jake':'1' }
     */
    var invertObj = _curry1(function invertObj(obj) {
        var props = keys(obj);
        var len = props.length;
        var idx = 0;
        var out = {};
        while (idx < len) {
            var key = props[idx];
            out[obj[key]] = key;
            idx += 1;
        }
        return out;
    });

    /**
     * Returns `true` if the given value is its type's empty value; `false`
     * otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Logic
     * @sig a -> Boolean
     * @param {*} x
     * @return {Boolean}
     * @see R.empty
     * @example
     *
     *      R.isEmpty([1, 2, 3]);   //=> false
     *      R.isEmpty([]);          //=> true
     *      R.isEmpty('');          //=> true
     *      R.isEmpty(null);        //=> false
     *      R.isEmpty({});          //=> true
     *      R.isEmpty({length: 0}); //=> false
     */
    var isEmpty = _curry1(function isEmpty(x) {
        return x != null && equals(x, empty(x));
    });

    /**
     * Returns the last element of the given list or string.
     *
     * @func
     * @memberOf R
     * @since v0.1.4
     * @category List
     * @see R.init, R.head, R.tail
     * @sig [a] -> a | Undefined
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.last(['fi', 'fo', 'fum']); //=> 'fum'
     *      R.last([]); //=> undefined
     *
     *      R.last('abc'); //=> 'c'
     *      R.last(''); //=> ''
     */
    var last = nth(-1);

    /**
     * Returns the position of the last occurrence of an item in
     * an array, or -1 if the item is not included in the array.
     * `R.equals` is used to determine equality.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig a -> [a] -> Number
     * @param {*} target The item to find.
     * @param {Array} xs The array to search in.
     * @return {Number} the index of the target, or -1 if the target is not found.
     * @see R.indexOf
     * @example
     *
     *      R.lastIndexOf(3, [-1,3,3,0,1,2,3,4]); //=> 6
     *      R.lastIndexOf(10, [1,2,3,4]); //=> -1
     */
    var lastIndexOf = _curry2(function lastIndexOf(target, xs) {
        if (typeof xs.lastIndexOf === 'function' && !_isArray(xs)) {
            return xs.lastIndexOf(target);
        } else {
            var idx = xs.length - 1;
            while (idx >= 0) {
                if (equals(xs[idx], target)) {
                    return idx;
                }
                idx -= 1;
            }
            return -1;
        }
    });

    /**
     * Returns a new list, constructed by applying the supplied function to every element of the
     * supplied list.
     *
     * Note: `R.map` does not skip deleted or unassigned indices (sparse arrays), unlike the
     * native `Array.prototype.map` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map#Description
     *
     * Dispatches to the `map` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * Map treats also treats functions as functors and will compose them together.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Functor f => (a -> b) -> f a -> f b
     * @param {Function} fn The function to be called on every element of the input `list`.
     * @param {Array} list The list to be iterated over.
     * @return {Array} The new list.
     * @example
     *
     *      var double = x => x * 2;
     *
     *      R.map(double, [1, 2, 3]); //=> [2, 4, 6]
     *
     *      R.map(double, {x: 1, y: 2, z: 3}); //=> {x: 2, y: 4, z: 6}
     */
    var map = _curry2(_dispatchable('map', _xmap, function map(fn, functor) {
        switch (Object.prototype.toString.call(functor)) {
        case '[object Function]':
            return curryN(functor.length, function () {
                return fn.call(this, functor.apply(this, arguments));
            });
        case '[object Object]':
            return _reduce(function (acc, key) {
                acc[key] = fn(functor[key]);
                return acc;
            }, {}, keys(functor));
        default:
            return _map(fn, functor);
        }
    }));

    /**
     * Map, but for objects. Creates an object with the same keys as `obj` and values
     * generated by running each property of `obj` through `fn`. `fn` is passed one argument:
     * *(value)*.
     *
     * @func
     * @memberOf R
     * @since v0.1.4
     * @category Object
     * @sig (v -> v) -> {k: v} -> {k: v}
     * @param {Function} fn A function called for each property in `obj`. Its return value will
     * become a new property on the return object.
     * @param {Object} obj The object to iterate over.
     * @return {Object} A new object with the same keys as `obj` and values that are the result
     *         of running each property through `fn`.
     * @deprecated since v0.18.0
     * @example
     *
     *      var values = { x: 1, y: 2, z: 3 };
     *      var double = num => num * 2;
     *
     *      R.mapObj(double, values); //=> { x: 2, y: 4, z: 6 }
     */
    var mapObj = _curry2(function mapObj(fn, obj) {
        return _reduce(function (acc, key) {
            acc[key] = fn(obj[key]);
            return acc;
        }, {}, keys(obj));
    });

    /**
     * Like `mapObj`, but passes additional arguments to the predicate function. The
     * predicate function is passed three arguments: *(value, key, obj)*.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Object
     * @sig (v, k, {k: v} -> v) -> {k: v} -> {k: v}
     * @param {Function} fn A function called for each property in `obj`. Its return value will
     *        become a new property on the return object.
     * @param {Object} obj The object to iterate over.
     * @return {Object} A new object with the same keys as `obj` and values that are the result
     *         of running each property through `fn`.
     * @example
     *
     *      var values = { x: 1, y: 2, z: 3 };
     *      var prependKeyAndDouble = (num, key, obj) => key + (num * 2);
     *
     *      R.mapObjIndexed(prependKeyAndDouble, values); //=> { x: 'x2', y: 'y4', z: 'z6' }
     */
    var mapObjIndexed = _curry2(function mapObjIndexed(fn, obj) {
        return _reduce(function (acc, key) {
            acc[key] = fn(obj[key], key, obj);
            return acc;
        }, {}, keys(obj));
    });

    /**
     * Returns `true` if no elements of the list match the predicate,
     * `false` otherwise.
     *
     * Dispatches to the `any` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> Boolean
     * @param {Function} fn The predicate function.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the predicate is not satisfied by every element, `false` otherwise.
     * @see R.all, R.any
     * @example
     *
     *      R.none(R.isNaN, [1, 2, 3]); //=> true
     *      R.none(R.isNaN, [1, 2, 3, NaN]); //=> false
     */
    var none = _curry2(_complement(_dispatchable('any', _xany, any)));

    /**
     * Takes a function `f` and a list of arguments, and returns a function `g`.
     * When applied, `g` returns the result of applying `f` to the arguments
     * provided initially followed by the arguments provided to `g`.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Function
     * @sig ((a, b, c, ..., n) -> x) -> [a, b, c, ...] -> ((d, e, f, ..., n) -> x)
     * @param {Function} f
     * @param {Array} args
     * @return {Function}
     * @see R.partialRight
     * @example
     *
     *      var multiply = (a, b) => a * b;
     *      var double = R.partial(multiply, [2]);
     *      double(2); //=> 4
     *
     *      var greet = (salutation, title, firstName, lastName) =>
     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *
     *      var sayHello = R.partial(greet, ['Hello']);
     *      var sayHelloToMs = R.partial(sayHello, ['Ms.']);
     *      sayHelloToMs('Jane', 'Jones'); //=> 'Hello, Ms. Jane Jones!'
     */
    var partial = _createPartialApplicator(_concat);

    /**
     * Takes a function `f` and a list of arguments, and returns a function `g`.
     * When applied, `g` returns the result of applying `f` to the arguments
     * provided to `g` followed by the arguments provided initially.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Function
     * @sig ((a, b, c, ..., n) -> x) -> [d, e, f, ..., n] -> ((a, b, c, ...) -> x)
     * @param {Function} f
     * @param {Array} args
     * @return {Function}
     * @see R.partial
     * @example
     *
     *      var greet = (salutation, title, firstName, lastName) =>
     *        salutation + ', ' + title + ' ' + firstName + ' ' + lastName + '!';
     *
     *      var greetMsJaneJones = R.partialRight(greet, ['Ms.', 'Jane', 'Jones']);
     *
     *      greetMsJaneJones('Hello'); //=> 'Hello, Ms. Jane Jones!'
     */
    var partialRight = _createPartialApplicator(flip(_concat));

    /**
     * Takes a predicate and a list and returns the pair of lists of
     * elements which do and do not satisfy the predicate, respectively.
     *
     * @func
     * @memberOf R
     * @since v0.1.4
     * @category List
     * @sig (a -> Boolean) -> [a] -> [[a],[a]]
     * @param {Function} pred A predicate to determine which array the element belongs to.
     * @param {Array} list The array to partition.
     * @return {Array} A nested array, containing first an array of elements that satisfied the predicate,
     *         and second an array of elements that did not satisfy.
     * @example
     *
     *      R.partition(R.contains('s'), ['sss', 'ttt', 'foo', 'bars']);
     *      //=> [ [ 'sss', 'bars' ],  [ 'ttt', 'foo' ] ]
     */
    var partition = _curry2(function partition(pred, list) {
        return _reduce(function (acc, elt) {
            var xs = acc[pred(elt) ? 0 : 1];
            xs[xs.length] = elt;
            return acc;
        }, [
            [],
            []
        ], list);
    });

    /**
     * Determines whether a nested path on an object has a specific value,
     * in `R.equals` terms. Most likely used to filter a list.
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @category Relation
     * @sig [String] -> * -> {String: *} -> Boolean
     * @param {Array} path The path of the nested property to use
     * @param {*} val The value to compare the nested property with
     * @param {Object} obj The object to check the nested property in
     * @return {Boolean} `true` if the value equals the nested object property,
     *         `false` otherwise.
     * @example
     *
     *      var user1 = { address: { zipCode: 90210 } };
     *      var user2 = { address: { zipCode: 55555 } };
     *      var user3 = { name: 'Bob' };
     *      var users = [ user1, user2, user3 ];
     *      var isFamous = R.pathEq(['address', 'zipCode'], 90210);
     *      R.filter(isFamous, users); //=> [ user1 ]
     */
    var pathEq = _curry3(function pathEq(_path, val, obj) {
        return equals(path(_path, obj), val);
    });

    /**
     * Returns a new list by plucking the same named property off all objects in the list supplied.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig k -> [{k: v}] -> [v]
     * @param {Number|String} key The key name to pluck off of each object.
     * @param {Array} list The array to consider.
     * @return {Array} The list of values for the given key.
     * @see R.props
     * @example
     *
     *      R.pluck('a')([{a: 1}, {a: 2}]); //=> [1, 2]
     *      R.pluck(0)([[1, 2], [3, 4]]);   //=> [1, 3]
     */
    var pluck = _curry2(function pluck(p, list) {
        return map(prop(p), list);
    });

    /**
     * Returns `true` if the specified object property is equal, in `R.equals`
     * terms, to the given value; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig String -> a -> Object -> Boolean
     * @param {String} name
     * @param {*} val
     * @param {*} obj
     * @return {Boolean}
     * @see R.equals, R.propSatisfies
     * @example
     *
     *      var abby = {name: 'Abby', age: 7, hair: 'blond'};
     *      var fred = {name: 'Fred', age: 12, hair: 'brown'};
     *      var rusty = {name: 'Rusty', age: 10, hair: 'brown'};
     *      var alois = {name: 'Alois', age: 15, disposition: 'surly'};
     *      var kids = [abby, fred, rusty, alois];
     *      var hasBrownHair = R.propEq('hair', 'brown');
     *      R.filter(hasBrownHair, kids); //=> [fred, rusty]
     */
    var propEq = _curry3(function propEq(name, val, obj) {
        return propSatisfies(equals(val), name, obj);
    });

    /**
     * Returns `true` if the specified object property is of the given type;
     * `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Type
     * @sig Type -> String -> Object -> Boolean
     * @param {Function} type
     * @param {String} name
     * @param {*} obj
     * @return {Boolean}
     * @see R.is
     * @see R.propSatisfies
     * @example
     *
     *      R.propIs(Number, 'x', {x: 1, y: 2});  //=> true
     *      R.propIs(Number, 'x', {x: 'foo'});    //=> false
     *      R.propIs(Number, 'x', {});            //=> false
     */
    var propIs = _curry3(function propIs(type, name, obj) {
        return propSatisfies(is(type), name, obj);
    });

    /**
     * Returns a single item by iterating through the list, successively calling the iterator
     * function and passing it an accumulator value and the current value from the array, and
     * then passing the result to the next call.
     *
     * The iterator function receives two values: *(acc, value)*.  It may use `R.reduced` to
     * shortcut the iteration.
     *
     * Note: `R.reduce` does not skip deleted or unassigned indices (sparse arrays), unlike
     * the native `Array.prototype.reduce` method. For more details on this behavior, see:
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce#Description
     * @see R.reduced
     *
     * Dispatches to the `reduce` method of the third argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a,b -> a) -> a -> [b] -> a
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array.
     * @param {*} acc The accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var numbers = [1, 2, 3];
     *      var add = (a, b) => a + b;
     *
     *      R.reduce(add, 10, numbers); //=> 16
     */
    var reduce = _curry3(_reduce);

    /**
     * Similar to `filter`, except that it keeps only values for which the given predicate
     * function returns falsy. The predicate function is passed one argument: *(value)*.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} The new filtered array.
     * @see R.filter
     * @example
     *
     *      var isOdd = (n) => n % 2 === 1;
     *
     *      R.reject(isOdd, [1, 2, 3, 4]); //=> [2, 4]
     */
    var reject = _curry2(function reject(fn, list) {
        return filter(_complement(fn), list);
    });

    /**
     * Returns a fixed list of size `n` containing a specified identical value.
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category List
     * @sig a -> n -> [a]
     * @param {*} value The value to repeat.
     * @param {Number} n The desired size of the output list.
     * @return {Array} A new array containing `n` `value`s.
     * @example
     *
     *      R.repeat('hi', 5); //=> ['hi', 'hi', 'hi', 'hi', 'hi']
     *
     *      var obj = {};
     *      var repeatedObjs = R.repeat(obj, 5); //=> [{}, {}, {}, {}, {}]
     *      repeatedObjs[0] === repeatedObjs[1]; //=> true
     */
    var repeat = _curry2(function repeat(value, n) {
        return times(always(value), n);
    });

    /**
     * Returns the elements of the given list or string (or object with a `slice`
     * method) from `fromIndex` (inclusive) to `toIndex` (exclusive).
     *
     * Dispatches to the `slice` method of the third argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.4
     * @category List
     * @sig Number -> Number -> [a] -> [a]
     * @sig Number -> Number -> String -> String
     * @param {Number} fromIndex The start index (inclusive).
     * @param {Number} toIndex The end index (exclusive).
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.slice(1, 3, ['a', 'b', 'c', 'd']);        //=> ['b', 'c']
     *      R.slice(1, Infinity, ['a', 'b', 'c', 'd']); //=> ['b', 'c', 'd']
     *      R.slice(0, -1, ['a', 'b', 'c', 'd']);       //=> ['a', 'b', 'c']
     *      R.slice(-3, -1, ['a', 'b', 'c', 'd']);      //=> ['b', 'c']
     *      R.slice(0, 3, 'ramda');                     //=> 'ram'
     */
    var slice = _curry3(_checkForMethod('slice', function slice(fromIndex, toIndex, list) {
        return Array.prototype.slice.call(list, fromIndex, toIndex);
    }));

    /**
     * Splits a collection into slices of the specified length.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig Number -> [a] -> [[a]]
     * @sig Number -> String -> [String]
     * @param {Number} n
     * @param {Array} list
     * @return {Array}
     * @example
     *
     *      R.splitEvery(3, [1, 2, 3, 4, 5, 6, 7]); //=> [[1, 2, 3], [4, 5, 6], [7]]
     *      R.splitEvery(3, 'foobarbaz'); //=> ['foo', 'bar', 'baz']
     */
    var splitEvery = _curry2(function splitEvery(n, list) {
        if (n <= 0) {
            throw new Error('First argument to splitEvery must be a positive integer');
        }
        var result = [];
        var idx = 0;
        while (idx < list.length) {
            result.push(slice(idx, idx += n, list));
        }
        return result;
    });

    /**
     * Adds together all the elements of a list.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list An array of numbers
     * @return {Number} The sum of all the numbers in the list.
     * @see R.reduce
     * @example
     *
     *      R.sum([2,4,6,8,100,1]); //=> 121
     */
    var sum = reduce(add, 0);

    /**
     * Returns all but the first element of the given list or string (or object
     * with a `tail` method).
     *
     * Dispatches to the `slice` method of the first argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @see R.head, R.init, R.last
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.tail([1, 2, 3]);  //=> [2, 3]
     *      R.tail([1, 2]);     //=> [2]
     *      R.tail([1]);        //=> []
     *      R.tail([]);         //=> []
     *
     *      R.tail('abc');  //=> 'bc'
     *      R.tail('ab');   //=> 'b'
     *      R.tail('a');    //=> ''
     *      R.tail('');     //=> ''
     */
    var tail = _checkForMethod('tail', slice(1, Infinity));

    /**
     * Returns the first `n` elements of the given list, string, or
     * transducer/transformer (or object with a `take` method).
     *
     * Dispatches to the `take` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n
     * @param {*} list
     * @return {*}
     * @see R.drop
     * @example
     *
     *      R.take(1, ['foo', 'bar', 'baz']); //=> ['foo']
     *      R.take(2, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
     *      R.take(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.take(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.take(3, 'ramda');               //=> 'ram'
     *
     *      var personnel = [
     *        'Dave Brubeck',
     *        'Paul Desmond',
     *        'Eugene Wright',
     *        'Joe Morello',
     *        'Gerry Mulligan',
     *        'Bob Bates',
     *        'Joe Dodge',
     *        'Ron Crotty'
     *      ];
     *
     *      var takeFive = R.take(5);
     *      takeFive(personnel);
     *      //=> ['Dave Brubeck', 'Paul Desmond', 'Eugene Wright', 'Joe Morello', 'Gerry Mulligan']
     */
    var take = _curry2(_dispatchable('take', _xtake, function take(n, xs) {
        return slice(0, n < 0 ? Infinity : n, xs);
    }));

    /**
     * Returns a new list containing the first `n` elements of a given list, passing each value
     * to the supplied predicate function, and terminating when the predicate function returns
     * `false`. Excludes the element that caused the predicate function to fail. The predicate
     * function is passed one argument: *(value)*.
     *
     * Dispatches to the `takeWhile` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig (a -> Boolean) -> [a] -> [a]
     * @param {Function} fn The function called per iteration.
     * @param {Array} list The collection to iterate over.
     * @return {Array} A new array.
     * @see R.dropWhile
     * @example
     *
     *      var isNotFour = x => x !== 4;
     *
     *      R.takeWhile(isNotFour, [1, 2, 3, 4]); //=> [1, 2, 3]
     */
    var takeWhile = _curry2(_dispatchable('takeWhile', _xtakeWhile, function takeWhile(fn, list) {
        var idx = 0, len = list.length;
        while (idx < len && fn(list[idx])) {
            idx += 1;
        }
        return _slice(list, 0, idx);
    }));

    /**
     * Initializes a transducer using supplied iterator function. Returns a single item by
     * iterating through the list, successively calling the transformed iterator function and
     * passing it an accumulator value and the current value from the array, and then passing
     * the result to the next call.
     *
     * The iterator function receives two values: *(acc, value)*. It will be wrapped as a
     * transformer to initialize the transducer. A transformer can be passed directly in place
     * of an iterator function.  In both cases, iteration may be stopped early with the
     * `R.reduced` function.
     *
     * A transducer is a function that accepts a transformer and returns a transformer and can
     * be composed directly.
     *
     * A transformer is an an object that provides a 2-arity reducing iterator function, step,
     * 0-arity initial value function, init, and 1-arity result extraction function, result.
     * The step function is used as the iterator function in reduce. The result function is used
     * to convert the final accumulator into the return type and in most cases is R.identity.
     * The init function can be used to provide an initial accumulator, but is ignored by transduce.
     *
     * The iteration is performed with R.reduce after initializing the transducer.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category List
     * @see R.reduce, R.reduced, R.into
     * @sig (c -> c) -> (a,b -> a) -> a -> [b] -> a
     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
     * @param {Function} fn The iterator function. Receives two values, the accumulator and the
     *        current element from the array. Wrapped as transformer, if necessary, and used to
     *        initialize the transducer
     * @param {*} acc The initial accumulator value.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var numbers = [1, 2, 3, 4];
     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
     *
     *      R.transduce(transducer, R.flip(R.append), [], numbers); //=> [2, 3]
     */
    var transduce = curryN(4, function transduce(xf, fn, acc, list) {
        return _reduce(xf(typeof fn === 'function' ? _xwrap(fn) : fn), acc, list);
    });

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the elements of each list.  Duplication is
     * determined according to the value returned by applying the supplied predicate to two list elements.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig (a,a -> Boolean) -> [a] -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @return {Array} The first and second lists concatenated, with
     *         duplicates removed.
     * @see R.union
     * @example
     *
     *      var l1 = [{a: 1}, {a: 2}];
     *      var l2 = [{a: 1}, {a: 4}];
     *      R.unionWith(R.eqBy(R.prop('a')), l1, l2); //=> [{a: 1}, {a: 2}, {a: 4}]
     */
    var unionWith = _curry3(function unionWith(pred, list1, list2) {
        return uniqWith(pred, _concat(list1, list2));
    });

    /**
     * Returns a new list containing only one copy of each element in the original list.
     * `R.equals` is used to determine equality.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a]
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      R.uniq([1, 1, 2, 1]); //=> [1, 2]
     *      R.uniq([1, '1']);     //=> [1, '1']
     *      R.uniq([[42], [42]]); //=> [[42]]
     */
    var uniq = uniqWith(equals);

    /**
     * Accepts a function `fn` and a list of transformer functions and returns a new curried
     * function. When the new function is invoked, it calls the function `fn` with parameters
     * consisting of the result of calling each supplied handler on successive arguments to the
     * new function.
     *
     * If more arguments are passed to the returned function than transformer functions, those
     * arguments are passed directly to `fn` as additional parameters. If you expect additional
     * arguments that don't need to be transformed, although you can ignore them, it's best to
     * pass an identity function so that the new function reports the correct arity.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (x1 -> x2 -> ... -> z) -> [(a -> x1), (b -> x2), ...] -> (a -> b -> ... -> z)
     * @param {Function} fn The function to wrap.
     * @param {Array} transformers A list of transformer functions
     * @return {Function} The wrapped function.
     * @example
     *
     *      R.useWith(Math.pow, [R.identity, R.identity])(3, 4); //=> 81
     *      R.useWith(Math.pow, [R.identity, R.identity])(3)(4); //=> 81
     *      R.useWith(Math.pow, [R.dec, R.inc])(3, 4); //=> 32
     *      R.useWith(Math.pow, [R.dec, R.inc])(3)(4); //=> 32
     */
    var useWith = _curry2(function useWith(fn, transformers) {
        return curry(_arity(transformers.length, function () {
            var args = [], idx = 0;
            while (idx < transformers.length) {
                args.push(transformers[idx].call(this, arguments[idx]));
                idx += 1;
            }
            return fn.apply(this, args.concat(_slice(arguments, transformers.length)));
        }));
    });

    /**
     * Takes a spec object and a test object; returns true if the test satisfies
     * the spec, false otherwise. An object satisfies the spec if, for each of the
     * spec's own properties, accessing that property of the object gives the same
     * value (in `R.equals` terms) as accessing that property of the spec.
     *
     * `whereEq` is a specialization of [`where`](#where).
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category Object
     * @sig {String: *} -> {String: *} -> Boolean
     * @param {Object} spec
     * @param {Object} testObj
     * @return {Boolean}
     * @see R.where
     * @example
     *
     *      // pred :: Object -> Boolean
     *      var pred = R.whereEq({a: 1, b: 2});
     *
     *      pred({a: 1});              //=> false
     *      pred({a: 1, b: 2});        //=> true
     *      pred({a: 1, b: 2, c: 3});  //=> true
     *      pred({a: 1, b: 1});        //=> false
     */
    var whereEq = _curry2(function whereEq(spec, testObj) {
        return where(mapObj(equals, spec), testObj);
    });

    var _flatCat = function () {
        var preservingReduced = function (xf) {
            return {
                '@@transducer/init': _xfBase.init,
                '@@transducer/result': function (result) {
                    return xf['@@transducer/result'](result);
                },
                '@@transducer/step': function (result, input) {
                    var ret = xf['@@transducer/step'](result, input);
                    return ret['@@transducer/reduced'] ? _forceReduced(ret) : ret;
                }
            };
        };
        return function _xcat(xf) {
            var rxf = preservingReduced(xf);
            return {
                '@@transducer/init': _xfBase.init,
                '@@transducer/result': function (result) {
                    return rxf['@@transducer/result'](result);
                },
                '@@transducer/step': function (result, input) {
                    return !isArrayLike(input) ? _reduce(rxf, result, [input]) : _reduce(rxf, result, input);
                }
            };
        };
    }();

    var _indexOf = function _indexOf(list, item, from) {
        var idx = from;
        while (idx < list.length) {
            if (equals(list[idx], item)) {
                return idx;
            }
            idx += 1;
        }
        return -1;
    };

    var _stepCat = function () {
        var _stepCatArray = {
            '@@transducer/init': Array,
            '@@transducer/step': function (xs, x) {
                return _concat(xs, [x]);
            },
            '@@transducer/result': _identity
        };
        var _stepCatString = {
            '@@transducer/init': String,
            '@@transducer/step': function (a, b) {
                return a + b;
            },
            '@@transducer/result': _identity
        };
        var _stepCatObject = {
            '@@transducer/init': Object,
            '@@transducer/step': function (result, input) {
                return merge(result, isArrayLike(input) ? createMapEntry(input[0], input[1]) : input);
            },
            '@@transducer/result': _identity
        };
        return function _stepCat(obj) {
            if (_isTransformer(obj)) {
                return obj;
            }
            if (isArrayLike(obj)) {
                return _stepCatArray;
            }
            if (typeof obj === 'string') {
                return _stepCatString;
            }
            if (typeof obj === 'object') {
                return _stepCatObject;
            }
            throw new Error('Cannot create transformer for ' + obj);
        };
    }();

    var _xchain = _curry2(function _xchain(f, xf) {
        return map(f, _flatCat(xf));
    });

    /**
     * Takes a list of predicates and returns a predicate that returns true
     * for a given list of arguments if every one of the provided predicates
     * is satisfied by those arguments.
     *
     * The function returned is a curried function whose arity matches that of
     * the highest-arity predicate.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Logic
     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
     * @param {Array} preds
     * @return {Function}
     * @see R.anyPass
     * @example
     *
     *      var isQueen = R.propEq('rank', 'Q');
     *      var isSpade = R.propEq('suit', '♠︎');
     *      var isQueenOfSpades = R.allPass([isQueen, isSpade]);
     *
     *      isQueenOfSpades({rank: 'Q', suit: '♣︎'}); //=> false
     *      isQueenOfSpades({rank: 'Q', suit: '♠︎'}); //=> true
     */
    var allPass = _curry1(function allPass(preds) {
        return curryN(reduce(max, 0, pluck('length', preds)), function () {
            var idx = 0;
            var len = preds.length;
            while (idx < len) {
                if (!preds[idx].apply(this, arguments)) {
                    return false;
                }
                idx += 1;
            }
            return true;
        });
    });

    /**
     * Returns `true` if all elements are unique, in `R.equals` terms,
     * otherwise `false`.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category List
     * @sig [a] -> Boolean
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if all elements are unique, else `false`.
     * @example
     *
     *      R.allUniq(['1', 1]); //=> true
     *      R.allUniq([1, 1]);   //=> false
     *      R.allUniq([[42], [42]]); //=> false
     */
    var allUniq = _curry1(function allUniq(list) {
        var len = list.length;
        var idx = 0;
        while (idx < len) {
            if (_indexOf(list, list[idx], idx + 1) >= 0) {
                return false;
            }
            idx += 1;
        }
        return true;
    });

    /**
     * Takes a list of predicates and returns a predicate that returns true for
     * a given list of arguments if at least one of the provided predicates is
     * satisfied by those arguments.
     *
     * The function returned is a curried function whose arity matches that of
     * the highest-arity predicate.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Logic
     * @sig [(*... -> Boolean)] -> (*... -> Boolean)
     * @param {Array} preds
     * @return {Function}
     * @see R.allPass
     * @example
     *
     *      var gte = R.anyPass([R.gt, R.equals]);
     *
     *      gte(3, 2); //=> true
     *      gte(2, 2); //=> true
     *      gte(2, 3); //=> false
     */
    var anyPass = _curry1(function anyPass(preds) {
        return curryN(reduce(max, 0, pluck('length', preds)), function () {
            var idx = 0;
            var len = preds.length;
            while (idx < len) {
                if (preds[idx].apply(this, arguments)) {
                    return true;
                }
                idx += 1;
            }
            return false;
        });
    });

    /**
     * ap applies a list of functions to a list of values.
     *
     * Dispatches to the `ap` method of the second argument, if present. Also treats
     * functions as applicatives.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category Function
     * @sig [f] -> [a] -> [f a]
     * @param {Array} fns An array of functions
     * @param {Array} vs An array of values
     * @return {Array} An array of results of applying each of `fns` to all of `vs` in turn.
     * @example
     *
     *      R.ap([R.multiply(2), R.add(3)], [1,2,3]); //=> [2, 4, 6, 4, 5, 6]
     */
    // else
    var ap = _curry2(function ap(applicative, fn) {
        return typeof applicative.ap === 'function' ? applicative.ap(fn) : typeof applicative === 'function' ? curryN(Math.max(applicative.length, fn.length), function () {
            return applicative.apply(this, arguments)(fn.apply(this, arguments));
        }) : // else
        _reduce(function (acc, f) {
            return _concat(acc, map(f, fn));
        }, [], applicative);
    });

    /**
     * Returns the result of calling its first argument with the remaining
     * arguments. This is occasionally useful as a converging function for
     * `R.converge`: the left branch can produce a function while the right
     * branch produces a value to be passed to that function as an argument.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category Function
     * @sig (*... -> a),*... -> a
     * @param {Function} fn The function to apply to the remaining arguments.
     * @param {...*} args Any number of positional arguments.
     * @return {*}
     * @see R.apply
     * @example
     *
     *      var indentN = R.pipe(R.times(R.always(' ')),
     *                           R.join(''),
     *                           R.replace(/^(?!$)/gm));
     *
     *      var format = R.converge(R.call,
     *                              R.pipe(R.prop('indent'), indentN),
     *                              R.prop('value'));
     *
     *      format({indent: 2, value: 'foo\nbar\nbaz\n'}); //=> '  foo\n  bar\n  baz\n'
     */
    var call = curry(function call(fn) {
        return fn.apply(this, _slice(arguments, 1));
    });

    /**
     * `chain` maps a function over a list and concatenates the results.
     * `chain` is also known as `flatMap` in some libraries
     *
     * Dispatches to the `chain` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category List
     * @sig (a -> [b]) -> [a] -> [b]
     * @param {Function} fn
     * @param {Array} list
     * @return {Array}
     * @example
     *
     *      var duplicate = n => [n, n];
     *      R.chain(duplicate, [1, 2, 3]); //=> [1, 1, 2, 2, 3, 3]
     */
    var chain = _curry2(_dispatchable('chain', _xchain, function chain(fn, monad) {
        if (typeof monad === 'function') {
            return function () {
                return monad.call(this, fn.apply(this, arguments)).apply(this, arguments);
            };
        }
        return _makeFlat(false)(map(fn, monad));
    }));

    /**
     * Turns a list of Functors into a Functor of a list, applying
     * a mapping function to the elements of the list along the way.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category List
     * @see R.commute
     * @sig Functor f => (a -> f b) -> (x -> f x) -> [a] -> f [b]
     * @param {Function} fn The transformation function
     * @param {Function} of A function that returns the data type to return
     * @param {Array} list An array of functors of the same type
     * @return {*}
     * @example
     *
     *      var add10 = R.map(R.add(10));
     *      R.commuteMap(add10, R.of, [[1], [2, 3]]);   //=> [[11, 12], [11, 13]]
     *      R.commuteMap(add10, R.of, [[1, 2], [3]]);   //=> [[11, 13], [12, 13]]
     *      R.commuteMap(add10, R.of, [[1], [2], [3]]); //=> [[11, 12, 13]]
     *      R.commuteMap(add10, Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([11, 12, 13])
     *      R.commuteMap(add10, Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
     *
     *      var fetch = url => Future((rej, res) => http.get(url, res).on('error', rej));
     *      R.commuteMap(fetch, Future.of, [
     *        'http://ramdajs.com',
     *        'http://github.com/ramda'
     *      ]); //=> Future([IncomingMessage, IncomingMessage])
     */
    var commuteMap = _curry3(function commuteMap(fn, of, list) {
        function consF(acc, x) {
            return ap(map(prepend, fn(x)), acc);
        }
        return reduceRight(consF, of([]), list);
    });

    /**
     * Wraps a constructor function inside a curried function that can be called with the same
     * arguments and returns the same type. The arity of the function returned is specified
     * to allow using variadic constructor functions.
     *
     * @func
     * @memberOf R
     * @since v0.4.0
     * @category Function
     * @sig Number -> (* -> {*}) -> (* -> {*})
     * @param {Number} n The arity of the constructor function.
     * @param {Function} Fn The constructor function to wrap.
     * @return {Function} A wrapped, curried constructor function.
     * @example
     *
     *      // Variadic constructor function
     *      var Widget = () => {
     *        this.children = Array.prototype.slice.call(arguments);
     *        // ...
     *      };
     *      Widget.prototype = {
     *        // ...
     *      };
     *      var allConfigs = [
     *        // ...
     *      ];
     *      R.map(R.constructN(1, Widget), allConfigs); // a list of Widgets
     */
    var constructN = _curry2(function constructN(n, Fn) {
        if (n > 10) {
            throw new Error('Constructor with greater than ten arguments');
        }
        if (n === 0) {
            return function () {
                return new Fn();
            };
        }
        return curry(nAry(n, function ($0, $1, $2, $3, $4, $5, $6, $7, $8, $9) {
            switch (arguments.length) {
            case 1:
                return new Fn($0);
            case 2:
                return new Fn($0, $1);
            case 3:
                return new Fn($0, $1, $2);
            case 4:
                return new Fn($0, $1, $2, $3);
            case 5:
                return new Fn($0, $1, $2, $3, $4);
            case 6:
                return new Fn($0, $1, $2, $3, $4, $5);
            case 7:
                return new Fn($0, $1, $2, $3, $4, $5, $6);
            case 8:
                return new Fn($0, $1, $2, $3, $4, $5, $6, $7);
            case 9:
                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8);
            case 10:
                return new Fn($0, $1, $2, $3, $4, $5, $6, $7, $8, $9);
            }
        }));
    });

    /**
     * Accepts a converging function and a list of branching functions and returns a new function.
     * When invoked, this new function is applied to some arguments, each branching
     * function is applied to those same arguments. The results of each branching
     * function are passed as arguments to the converging function to produce the return value.
     *
     * @func
     * @memberOf R
     * @since v0.4.2
     * @category Function
     * @sig (x1 -> x2 -> ... -> z) -> [(a -> b -> ... -> x1), (a -> b -> ... -> x2), ...] -> (a -> b -> ... -> z)
     * @param {Function} after A function. `after` will be invoked with the return values of
     *        `fn1` and `fn2` as its arguments.
     * @param {Array} functions A list of functions.
     * @return {Function} A new function.
     * @example
     *
     *      var add = (a, b) => a + b;
     *      var multiply = (a, b) => a * b;
     *      var subtract = (a, b) => a - b;
     *
     *      //≅ multiply( add(1, 2), subtract(1, 2) );
     *      R.converge(multiply, [add, subtract])(1, 2); //=> -3
     *
     *      var add3 = (a, b, c) => a + b + c;
     *      R.converge(add3, [multiply, add, subtract])(1, 2); //=> 4
     */
    var converge = _curry2(function converge(after, fns) {
        return curryN(Math.max.apply(Math, pluck('length', fns)), function () {
            var args = arguments;
            var context = this;
            return after.apply(context, _map(function (fn) {
                return fn.apply(context, args);
            }, fns));
        });
    });

    /**
     * Returns all but the first `n` elements of the given list, string, or
     * transducer/transformer (or object with a `drop` method).
     *
     * Dispatches to the `drop` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @see R.transduce
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n
     * @param {*} list
     * @return {*}
     * @see R.take
     * @example
     *
     *      R.drop(1, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
     *      R.drop(2, ['foo', 'bar', 'baz']); //=> ['baz']
     *      R.drop(3, ['foo', 'bar', 'baz']); //=> []
     *      R.drop(4, ['foo', 'bar', 'baz']); //=> []
     *      R.drop(3, 'ramda');               //=> 'da'
     */
    var drop = _curry2(_dispatchable('drop', _xdrop, function drop(n, xs) {
        return slice(Math.max(0, n), Infinity, xs);
    }));

    /**
     * Returns a list containing all but the last `n` elements of the given `list`.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n The number of elements of `xs` to skip.
     * @param {Array} xs The collection to consider.
     * @return {Array}
     * @see R.takeLast
     * @example
     *
     *      R.dropLast(1, ['foo', 'bar', 'baz']); //=> ['foo', 'bar']
     *      R.dropLast(2, ['foo', 'bar', 'baz']); //=> ['foo']
     *      R.dropLast(3, ['foo', 'bar', 'baz']); //=> []
     *      R.dropLast(4, ['foo', 'bar', 'baz']); //=> []
     *      R.dropLast(3, 'ramda');               //=> 'ra'
     */
    var dropLast = _curry2(function dropLast(n, xs) {
        return take(n < xs.length ? xs.length - n : 0, xs);
    });

    /**
     * Returns a new list without any consecutively repeating elements. Equality is
     * determined by applying the supplied predicate two consecutive elements.
     * The first element in a series of equal element is the one being preserved.
     *
     * Dispatches to the `dropRepeatsWith` method of the second argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category List
     * @sig (a, a -> Boolean) -> [a] -> [a]
     * @param {Function} pred A predicate used to test whether two items are equal.
     * @param {Array} list The array to consider.
     * @return {Array} `list` without repeating elements.
     * @example
     *
     *      var lengthEq = (x, y) => Math.abs(x) === Math.abs(y);
     *      var l = [1, -1, 1, 3, 4, -4, -4, -5, 5, 3, 3];
     *      R.dropRepeatsWith(R.eqBy(Math.abs), l); //=> [1, 3, 4, -5, 3]
     */
    var dropRepeatsWith = _curry2(_dispatchable('dropRepeatsWith', _xdropRepeatsWith, function dropRepeatsWith(pred, list) {
        var result = [];
        var idx = 1;
        var len = list.length;
        if (len !== 0) {
            result[0] = list[0];
            while (idx < len) {
                if (!pred(last(result), list[idx])) {
                    result[result.length] = list[idx];
                }
                idx += 1;
            }
        }
        return result;
    }));

    /**
     * Takes a function and two values in its domain and returns `true` if
     * the values map to the same value in the codomain; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.18.0
     * @category Relation
     * @sig (a -> b) -> a -> a -> Boolean
     * @param {Function} f
     * @param {*} x
     * @param {*} y
     * @return {Boolean}
     * @example
     *
     *      R.eqBy(Math.abs, 5, -5); //=> true
     */
    var eqBy = _curry3(function eqBy(f, x, y) {
        return equals(f(x), f(y));
    });

    /**
     * Reports whether two objects have the same value, in `R.equals` terms,
     * for the specified property. Useful as a curried predicate.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig k -> {k: v} -> {k: v} -> Boolean
     * @param {String} prop The name of the property to compare
     * @param {Object} obj1
     * @param {Object} obj2
     * @return {Boolean}
     *
     * @example
     *
     *      var o1 = { a: 1, b: 2, c: 3, d: 4 };
     *      var o2 = { a: 10, b: 20, c: 3, d: 40 };
     *      R.eqProps('a', o1, o2); //=> false
     *      R.eqProps('c', o1, o2); //=> true
     */
    var eqProps = _curry3(function eqProps(prop, obj1, obj2) {
        return equals(obj1[prop], obj2[prop]);
    });

    /**
     * Returns the position of the first occurrence of an item in an array,
     * or -1 if the item is not included in the array. `R.equals` is used to
     * determine equality.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig a -> [a] -> Number
     * @param {*} target The item to find.
     * @param {Array} xs The array to search in.
     * @return {Number} the index of the target, or -1 if the target is not found.
     * @see R.lastIndexOf
     * @example
     *
     *      R.indexOf(3, [1,2,3,4]); //=> 2
     *      R.indexOf(10, [1,2,3,4]); //=> -1
     */
    var indexOf = _curry2(function indexOf(target, xs) {
        return typeof xs.indexOf === 'function' && !_isArray(xs) ? xs.indexOf(target) : _indexOf(xs, target, 0);
    });

    /**
     * Returns all but the last element of the given list or string.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category List
     * @see R.last, R.head, R.tail
     * @sig [a] -> [a]
     * @sig String -> String
     * @param {*} list
     * @return {*}
     * @example
     *
     *      R.init([1, 2, 3]);  //=> [1, 2]
     *      R.init([1, 2]);     //=> [1]
     *      R.init([1]);        //=> []
     *      R.init([]);         //=> []
     *
     *      R.init('abc');  //=> 'ab'
     *      R.init('ab');   //=> 'a'
     *      R.init('a');    //=> ''
     *      R.init('');     //=> ''
     */
    var init = slice(0, -1);

    /**
     * Transforms the items of the list with the transducer and appends the transformed items to
     * the accumulator using an appropriate iterator function based on the accumulator type.
     *
     * The accumulator can be an array, string, object or a transformer. Iterated items will
     * be appended to arrays and concatenated to strings. Objects will be merged directly or 2-item
     * arrays will be merged as key, value pairs.
     *
     * The accumulator can also be a transformer object that provides a 2-arity reducing iterator
     * function, step, 0-arity initial value function, init, and 1-arity result extraction function
     * result. The step function is used as the iterator function in reduce. The result function is
     * used to convert the final accumulator into the return type and in most cases is R.identity.
     * The init function is used to provide the initial accumulator.
     *
     * The iteration is performed with R.reduce after initializing the transducer.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category List
     * @sig a -> (b -> b) -> [c] -> a
     * @param {*} acc The initial accumulator value.
     * @param {Function} xf The transducer function. Receives a transformer and returns a transformer.
     * @param {Array} list The list to iterate over.
     * @return {*} The final, accumulated value.
     * @example
     *
     *      var numbers = [1, 2, 3, 4];
     *      var transducer = R.compose(R.map(R.add(1)), R.take(2));
     *
     *      R.into([], transducer, numbers); //=> [2, 3]
     *
     *      var intoArray = R.into([]);
     *      intoArray(transducer, numbers); //=> [2, 3]
     */
    var into = _curry3(function into(acc, xf, list) {
        return _isTransformer(acc) ? _reduce(xf(acc), acc['@@transducer/init'](), list) : _reduce(xf(_stepCat(acc)), acc, list);
    });

    /**
     * Returns `true` if all elements are unique, in `R.equals` terms,
     * otherwise `false`.
     *
     * @func
     * @memberOf R
     * @since v0.1.1
     * @category List
     * @sig [a] -> Boolean
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if all elements are unique, else `false`.
     * @see R.allUniq
     * @deprecated since v0.18.0
     * @example
     *
     *      R.isSet(['1', 1]); //=> true
     *      R.isSet([1, 1]);   //=> false
     *      R.isSet([[42], [42]]); //=> false
     */
    var isSet = allUniq;

    /**
     * Returns a lens for the given getter and setter functions. The getter "gets"
     * the value of the focus; the setter "sets" the value of the focus. The setter
     * should not mutate the data structure.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category Object
     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig (s -> a) -> ((a, s) -> s) -> Lens s a
     * @param {Function} getter
     * @param {Function} setter
     * @return {Lens}
     * @see R.view, R.set, R.over, R.lensIndex, R.lensProp
     * @example
     *
     *      var xLens = R.lens(R.prop('x'), R.assoc('x'));
     *
     *      R.view(xLens, {x: 1, y: 2});            //=> 1
     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
     */
    var lens = _curry2(function lens(getter, setter) {
        return function (f) {
            return function (s) {
                return map(function (v) {
                    return setter(v, s);
                }, f(getter(s)));
            };
        };
    });

    /**
     * Returns a lens whose focus is the specified index.
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category Object
     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig Number -> Lens s a
     * @param {Number} n
     * @return {Lens}
     * @see R.view, R.set, R.over
     * @example
     *
     *      var headLens = R.lensIndex(0);
     *
     *      R.view(headLens, ['a', 'b', 'c']);            //=> 'a'
     *      R.set(headLens, 'x', ['a', 'b', 'c']);        //=> ['x', 'b', 'c']
     *      R.over(headLens, R.toUpper, ['a', 'b', 'c']); //=> ['A', 'b', 'c']
     */
    var lensIndex = _curry1(function lensIndex(n) {
        return lens(nth(n), update(n));
    });

    /**
     * Returns a lens whose focus is the specified property.
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category Object
     * @typedefn Lens s a = Functor f => (a -> f a) -> s -> f s
     * @sig String -> Lens s a
     * @param {String} k
     * @return {Lens}
     * @see R.view, R.set, R.over
     * @example
     *
     *      var xLens = R.lensProp('x');
     *
     *      R.view(xLens, {x: 1, y: 2});            //=> 1
     *      R.set(xLens, 4, {x: 1, y: 2});          //=> {x: 4, y: 2}
     *      R.over(xLens, R.negate, {x: 1, y: 2});  //=> {x: -1, y: 2}
     */
    var lensProp = _curry1(function lensProp(k) {
        return lens(prop(k), assoc(k));
    });

    /**
     * "lifts" a function to be the specified arity, so that it may "map over" that many
     * lists (or other Functors).
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @see R.lift
     * @category Function
     * @sig Number -> (*... -> *) -> ([*]... -> [*])
     * @param {Function} fn The function to lift into higher context
     * @return {Function} The function `fn` applicable to mappable objects.
     * @example
     *
     *      var madd3 = R.liftN(3, R.curryN(3, () => R.reduce(R.add, 0, arguments)));
     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
     */
    var liftN = _curry2(function liftN(arity, fn) {
        var lifted = curryN(arity, fn);
        return curryN(arity, function () {
            return _reduce(ap, map(lifted, arguments[0]), _slice(arguments, 1));
        });
    });

    /**
     * Returns the mean of the given list of numbers.
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list
     * @return {Number}
     * @example
     *
     *      R.mean([2, 7, 9]); //=> 6
     *      R.mean([]); //=> NaN
     */
    var mean = _curry1(function mean(list) {
        return sum(list) / list.length;
    });

    /**
     * Returns the median of the given list of numbers.
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list
     * @return {Number}
     * @example
     *
     *      R.median([2, 9, 7]); //=> 7
     *      R.median([7, 2, 10, 9]); //=> 8
     *      R.median([]); //=> NaN
     */
    var median = _curry1(function median(list) {
        var len = list.length;
        if (len === 0) {
            return NaN;
        }
        var width = 2 - len % 2;
        var idx = (len - width) / 2;
        return mean(_slice(list).sort(function (a, b) {
            return a < b ? -1 : a > b ? 1 : 0;
        }).slice(idx, idx + width));
    });

    /**
     * Merges a list of objects together into one object.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category List
     * @sig [{k: v}] -> {k: v}
     * @param {Array} list An array of objects
     * @return {Object} A merged object.
     * @see R.reduce
     * @example
     *
     *      R.mergeAll([{foo:1},{bar:2},{baz:3}]); //=> {foo:1,bar:2,baz:3}
     *      R.mergeAll([{foo:1},{foo:2},{bar:2}]); //=> {foo:2,bar:2}
     */
    var mergeAll = _curry1(function mergeAll(list) {
        return reduce(merge, {}, list);
    });

    /**
     * Performs left-to-right function composition. The leftmost function may have
     * any arity; the remaining functions must be unary.
     *
     * In some libraries this function is named `sequence`.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (((a, b, ..., n) -> o), (o -> p), ..., (x -> y), (y -> z)) -> ((a, b, ..., n) -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.compose
     * @example
     *
     *      var f = R.pipe(Math.pow, R.negate, R.inc);
     *
     *      f(3, 4); // -(3^4) + 1
     */
    var pipe = function pipe() {
        if (arguments.length === 0) {
            throw new Error('pipe requires at least one argument');
        }
        return _arity(arguments[0].length, reduce(_pipe, arguments[0], tail(arguments)));
    };

    /**
     * Performs left-to-right composition of one or more Promise-returning
     * functions. The leftmost function may have any arity; the remaining
     * functions must be unary.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Function
     * @sig ((a -> Promise b), (b -> Promise c), ..., (y -> Promise z)) -> (a -> Promise z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.composeP
     * @example
     *
     *      //  followersForUser :: String -> Promise [User]
     *      var followersForUser = R.pipeP(db.getUserById, db.getFollowers);
     */
    var pipeP = function pipeP() {
        if (arguments.length === 0) {
            throw new Error('pipeP requires at least one argument');
        }
        return _arity(arguments[0].length, reduce(_pipeP, arguments[0], tail(arguments)));
    };

    /**
     * Multiplies together all the elements of a list.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Math
     * @sig [Number] -> Number
     * @param {Array} list An array of numbers
     * @return {Number} The product of all the numbers in the list.
     * @see R.reduce
     * @example
     *
     *      R.product([2,4,6,8,100,1]); //=> 38400
     */
    var product = reduce(multiply, 1);

    /**
     * Reasonable analog to SQL `select` statement.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @category Relation
     * @sig [k] -> [{k: v}] -> [{k: v}]
     * @param {Array} props The property names to project
     * @param {Array} objs The objects to query
     * @return {Array} An array of objects with just the `props` properties.
     * @example
     *
     *      var abby = {name: 'Abby', age: 7, hair: 'blond', grade: 2};
     *      var fred = {name: 'Fred', age: 12, hair: 'brown', grade: 7};
     *      var kids = [abby, fred];
     *      R.project(['name', 'grade'], kids); //=> [{name: 'Abby', grade: 2}, {name: 'Fred', grade: 7}]
     */
    // passing `identity` gives correct arity
    var project = useWith(_map, [
        pickAll,
        identity
    ]);

    /**
     * Returns a new list containing the last `n` elements of the given list.
     * If `n > list.length`, returns a list of `list.length` elements.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig Number -> [a] -> [a]
     * @sig Number -> String -> String
     * @param {Number} n The number of elements to return.
     * @param {Array} xs The collection to consider.
     * @return {Array}
     * @see R.dropLast
     * @example
     *
     *      R.takeLast(1, ['foo', 'bar', 'baz']); //=> ['baz']
     *      R.takeLast(2, ['foo', 'bar', 'baz']); //=> ['bar', 'baz']
     *      R.takeLast(3, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.takeLast(4, ['foo', 'bar', 'baz']); //=> ['foo', 'bar', 'baz']
     *      R.takeLast(3, 'ramda');               //=> 'mda'
     */
    var takeLast = _curry2(function takeLast(n, xs) {
        return drop(n >= 0 ? xs.length - n : 0, xs);
    });

    /**
     * Shorthand for `R.chain(R.identity)`, which removes one level of nesting
     * from any [Chain](https://github.com/fantasyland/fantasy-land#chain).
     *
     * @func
     * @memberOf R
     * @since v0.3.0
     * @category List
     * @sig Chain c => c (c a) -> c a
     * @param {*} list
     * @return {*}
     * @see R.flatten, R.chain
     * @example
     *
     *      R.unnest([1, [2], [[3]]]); //=> [1, 2, [3]]
     *      R.unnest([[1, 2], [3, 4], [5, 6]]); //=> [1, 2, 3, 4, 5, 6]
     */
    var unnest = chain(_identity);

    var _contains = function _contains(a, list) {
        return _indexOf(list, a, 0) >= 0;
    };

    //  mapPairs :: (Object, [String]) -> [String]
    // Function, RegExp, user-defined types
    var _toString = function _toString(x, seen) {
        var recur = function recur(y) {
            var xs = seen.concat([x]);
            return _contains(y, xs) ? '<Circular>' : _toString(y, xs);
        };
        //  mapPairs :: (Object, [String]) -> [String]
        var mapPairs = function (obj, keys) {
            return _map(function (k) {
                return _quote(k) + ': ' + recur(obj[k]);
            }, keys.slice().sort());
        };
        switch (Object.prototype.toString.call(x)) {
        case '[object Arguments]':
            return '(function() { return arguments; }(' + _map(recur, x).join(', ') + '))';
        case '[object Array]':
            return '[' + _map(recur, x).concat(mapPairs(x, reject(function (k) {
                return /^\d+$/.test(k);
            }, keys(x)))).join(', ') + ']';
        case '[object Boolean]':
            return typeof x === 'object' ? 'new Boolean(' + recur(x.valueOf()) + ')' : x.toString();
        case '[object Date]':
            return 'new Date(' + _quote(_toISOString(x)) + ')';
        case '[object Null]':
            return 'null';
        case '[object Number]':
            return typeof x === 'object' ? 'new Number(' + recur(x.valueOf()) + ')' : 1 / x === -Infinity ? '-0' : x.toString(10);
        case '[object String]':
            return typeof x === 'object' ? 'new String(' + recur(x.valueOf()) + ')' : _quote(x);
        case '[object Undefined]':
            return 'undefined';
        default:
            return typeof x.constructor === 'function' && x.constructor.name !== 'Object' && typeof x.toString === 'function' && x.toString() !== '[object Object]' ? x.toString() : // Function, RegExp, user-defined types
            '{' + mapPairs(x, keys(x)).join(', ') + '}';
        }
    };

    /**
     * Turns a list of Functors into a Functor of a list.
     *
     * @func
     * @memberOf R
     * @since v0.8.0
     * @category List
     * @see R.commuteMap
     * @sig Functor f => (x -> f x) -> [f a] -> f [a]
     * @param {Function} of A function that returns the data type to return
     * @param {Array} list An array of functors of the same type
     * @return {*}
     * @example
     *
     *      R.commute(R.of, [[1], [2, 3]]);   //=> [[1, 2], [1, 3]]
     *      R.commute(R.of, [[1, 2], [3]]);   //=> [[1, 3], [2, 3]]
     *      R.commute(R.of, [[1], [2], [3]]); //=> [[1, 2, 3]]
     *      R.commute(Maybe.of, [Just(1), Just(2), Just(3)]);   //=> Just([1, 2, 3])
     *      R.commute(Maybe.of, [Just(1), Just(2), Nothing()]); //=> Nothing()
     */
    var commute = commuteMap(identity);

    /**
     * Performs right-to-left function composition. The rightmost function may have
     * any arity; the remaining functions must be unary.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig ((y -> z), (x -> y), ..., (o -> p), ((a, b, ..., n) -> o)) -> ((a, b, ..., n) -> z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.pipe
     * @example
     *
     *      var f = R.compose(R.inc, R.negate, Math.pow);
     *
     *      f(3, 4); // -(3^4) + 1
     */
    var compose = function compose() {
        if (arguments.length === 0) {
            throw new Error('compose requires at least one argument');
        }
        return pipe.apply(this, reverse(arguments));
    };

    /**
     * Returns the right-to-left Kleisli composition of the provided functions,
     * each of which must return a value of a type supported by [`chain`](#chain).
     *
     * `R.composeK(h, g, f)` is equivalent to `R.compose(R.chain(h), R.chain(g), R.chain(f))`.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Function
     * @see R.pipeK
     * @sig Chain m => ((y -> m z), (x -> m y), ..., (a -> m b)) -> (m a -> m z)
     * @param {...Function}
     * @return {Function}
     * @example
     *
     *      //  parseJson :: String -> Maybe *
     *      //  get :: String -> Object -> Maybe *
     *
     *      //  getStateCode :: Maybe String -> Maybe String
     *      var getStateCode = R.composeK(
     *        R.compose(Maybe.of, R.toUpper),
     *        get('state'),
     *        get('address'),
     *        get('user'),
     *        parseJson
     *      );
     *
     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
     *      //=> Just('NY')
     *      getStateCode(Maybe.of('[Invalid JSON]'));
     *      //=> Nothing()
     */
    var composeK = function composeK() {
        return compose.apply(this, prepend(identity, map(chain, arguments)));
    };

    /**
     * Performs right-to-left composition of one or more Promise-returning
     * functions. The rightmost function may have any arity; the remaining
     * functions must be unary.
     *
     * @func
     * @memberOf R
     * @since v0.10.0
     * @category Function
     * @sig ((y -> Promise z), (x -> Promise y), ..., (a -> Promise b)) -> (a -> Promise z)
     * @param {...Function} functions
     * @return {Function}
     * @see R.pipeP
     * @example
     *
     *      //  followersForUser :: String -> Promise [User]
     *      var followersForUser = R.composeP(db.getFollowers, db.getUserById);
     */
    var composeP = function composeP() {
        if (arguments.length === 0) {
            throw new Error('composeP requires at least one argument');
        }
        return pipeP.apply(this, reverse(arguments));
    };

    /**
     * Wraps a constructor function inside a curried function that can be called with the same
     * arguments and returns the same type.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (* -> {*}) -> (* -> {*})
     * @param {Function} Fn The constructor function to wrap.
     * @return {Function} A wrapped, curried constructor function.
     * @example
     *
     *      // Constructor function
     *      var Widget = config => {
     *        // ...
     *      };
     *      Widget.prototype = {
     *        // ...
     *      };
     *      var allConfigs = [
     *        // ...
     *      ];
     *      R.map(R.construct(Widget), allConfigs); // a list of Widgets
     */
    var construct = _curry1(function construct(Fn) {
        return constructN(Fn.length, Fn);
    });

    /**
     * Returns `true` if the specified value is equal, in `R.equals` terms,
     * to at least one element of the given list; `false` otherwise.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig a -> [a] -> Boolean
     * @param {Object} a The item to compare against.
     * @param {Array} list The array to consider.
     * @return {Boolean} `true` if the item is in the list, `false` otherwise.
     * @see R.any
     * @example
     *
     *      R.contains(3, [1, 2, 3]); //=> true
     *      R.contains(4, [1, 2, 3]); //=> false
     *      R.contains([42], [[42]]); //=> true
     */
    var contains = _curry2(_contains);

    /**
     * Finds the set (i.e. no duplicates) of all elements in the first list not contained in the second list.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig [a] -> [a] -> [a]
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @return {Array} The elements in `list1` that are not in `list2`.
     * @see R.differenceWith
     * @example
     *
     *      R.difference([1,2,3,4], [7,6,5,4,3]); //=> [1,2]
     *      R.difference([7,6,5,4,3], [1,2,3,4]); //=> [7,6,5]
     */
    var difference = _curry2(function difference(first, second) {
        var out = [];
        var idx = 0;
        var firstLen = first.length;
        while (idx < firstLen) {
            if (!_contains(first[idx], second) && !_contains(first[idx], out)) {
                out[out.length] = first[idx];
            }
            idx += 1;
        }
        return out;
    });

    /**
     * Returns a new list without any consecutively repeating elements.
     * `R.equals` is used to determine equality.
     *
     * Dispatches to the `dropRepeats` method of the first argument, if present.
     *
     * Acts as a transducer if a transformer is given in list position.
     * @see R.transduce
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category List
     * @sig [a] -> [a]
     * @param {Array} list The array to consider.
     * @return {Array} `list` without repeating elements.
     * @example
     *
     *     R.dropRepeats([1, 1, 1, 2, 3, 4, 4, 2, 2]); //=> [1, 2, 3, 4, 2]
     */
    var dropRepeats = _curry1(_dispatchable('dropRepeats', _xdropRepeatsWith(equals), dropRepeatsWith(equals)));

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of those elements common to both lists.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig [a] -> [a] -> [a]
     * @param {Array} list1 The first list.
     * @param {Array} list2 The second list.
     * @see R.intersectionWith
     * @return {Array} The list of elements found in both `list1` and `list2`.
     * @example
     *
     *      R.intersection([1,2,3,4], [7,6,5,4,3]); //=> [4, 3]
     */
    var intersection = _curry2(function intersection(list1, list2) {
        return uniq(_filter(flip(_contains)(list1), list2));
    });

    /**
     * "lifts" a function of arity > 1 so that it may "map over" an Array or
     * other Functor.
     *
     * @func
     * @memberOf R
     * @since v0.7.0
     * @see R.liftN
     * @category Function
     * @sig (*... -> *) -> ([*]... -> [*])
     * @param {Function} fn The function to lift into higher context
     * @return {Function} The function `fn` applicable to mappable objects.
     * @example
     *
     *      var madd3 = R.lift(R.curry((a, b, c) => a + b + c));
     *
     *      madd3([1,2,3], [1,2,3], [1]); //=> [3, 4, 5, 4, 5, 6, 5, 6, 7]
     *
     *      var madd5 = R.lift(R.curry((a, b, c, d, e) => a + b + c + d + e));
     *
     *      madd5([1,2], [3], [4, 5], [6], [7, 8]); //=> [21, 22, 22, 23, 22, 23, 23, 24]
     */
    var lift = _curry1(function lift(fn) {
        return liftN(fn.length, fn);
    });

    /**
     * Returns a partial copy of an object omitting the keys specified.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Object
     * @sig [String] -> {String: *} -> {String: *}
     * @param {Array} names an array of String property names to omit from the new object
     * @param {Object} obj The object to copy from
     * @return {Object} A new object with properties from `names` not on it.
     * @see R.pick
     * @example
     *
     *      R.omit(['a', 'd'], {a: 1, b: 2, c: 3, d: 4}); //=> {b: 2, c: 3}
     */
    var omit = _curry2(function omit(names, obj) {
        var result = {};
        for (var prop in obj) {
            if (!_contains(prop, names)) {
                result[prop] = obj[prop];
            }
        }
        return result;
    });

    /**
     * Returns the left-to-right Kleisli composition of the provided functions,
     * each of which must return a value of a type supported by [`chain`](#chain).
     *
     * `R.pipeK(f, g, h)` is equivalent to `R.pipe(R.chain(f), R.chain(g), R.chain(h))`.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category Function
     * @see R.composeK
     * @sig Chain m => ((a -> m b), (b -> m c), ..., (y -> m z)) -> (m a -> m z)
     * @param {...Function}
     * @return {Function}
     * @example
     *
     *      //  parseJson :: String -> Maybe *
     *      //  get :: String -> Object -> Maybe *
     *
     *      //  getStateCode :: Maybe String -> Maybe String
     *      var getStateCode = R.pipeK(
     *        parseJson,
     *        get('user'),
     *        get('address'),
     *        get('state'),
     *        R.compose(Maybe.of, R.toUpper)
     *      );
     *
     *      getStateCode(Maybe.of('{"user":{"address":{"state":"ny"}}}'));
     *      //=> Just('NY')
     *      getStateCode(Maybe.of('[Invalid JSON]'));
     *      //=> Nothing()
     */
    var pipeK = function pipeK() {
        return composeK.apply(this, reverse(arguments));
    };

    /**
     * Returns the string representation of the given value. `eval`'ing the output
     * should result in a value equivalent to the input value. Many of the built-in
     * `toString` methods do not satisfy this requirement.
     *
     * If the given value is an `[object Object]` with a `toString` method other
     * than `Object.prototype.toString`, this method is invoked with no arguments
     * to produce the return value. This means user-defined constructor functions
     * can provide a suitable `toString` method. For example:
     *
     *     function Point(x, y) {
     *       this.x = x;
     *       this.y = y;
     *     }
     *
     *     Point.prototype.toString = function() {
     *       return 'new Point(' + this.x + ', ' + this.y + ')';
     *     };
     *
     *     R.toString(new Point(1, 2)); //=> 'new Point(1, 2)'
     *
     * @func
     * @memberOf R
     * @since v0.14.0
     * @category String
     * @sig * -> String
     * @param {*} val
     * @return {String}
     * @example
     *
     *      R.toString(42); //=> '42'
     *      R.toString('abc'); //=> '"abc"'
     *      R.toString([1, 2, 3]); //=> '[1, 2, 3]'
     *      R.toString({foo: 1, bar: 2, baz: 3}); //=> '{"bar": 2, "baz": 3, "foo": 1}'
     *      R.toString(new Date('2001-02-03T04:05:06Z')); //=> 'new Date("2001-02-03T04:05:06.000Z")'
     */
    var toString = _curry1(function toString(val) {
        return _toString(val, []);
    });

    /**
     * Combines two lists into a set (i.e. no duplicates) composed of the
     * elements of each list.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Relation
     * @sig [a] -> [a] -> [a]
     * @param {Array} as The first list.
     * @param {Array} bs The second list.
     * @return {Array} The first and second lists concatenated, with
     *         duplicates removed.
     * @example
     *
     *      R.union([1, 2, 3], [2, 3, 4]); //=> [1, 2, 3, 4]
     */
    var union = _curry2(compose(uniq, _concat));

    /**
     * Returns a new list containing only one copy of each element in the
     * original list, based upon the value returned by applying the supplied
     * function to each list element. Prefers the first item if the supplied
     * function produces the same value on two items. `R.equals` is used for
     * comparison.
     *
     * @func
     * @memberOf R
     * @since v0.16.0
     * @category List
     * @sig (a -> b) -> [a] -> [a]
     * @param {Function} fn A function used to produce a value to use during comparisons.
     * @param {Array} list The array to consider.
     * @return {Array} The list of unique items.
     * @example
     *
     *      R.uniqBy(Math.abs, [-1, -5, 2, 10, 1, 2]); //=> [-1, -5, 2, 10]
     */
    var uniqBy = _curry2(function uniqBy(fn, list) {
        var idx = 0, applied = [], result = [], appliedItem, item;
        while (idx < list.length) {
            item = list[idx];
            appliedItem = fn(item);
            if (!_contains(appliedItem, applied)) {
                result.push(item);
                applied.push(appliedItem);
            }
            idx += 1;
        }
        return result;
    });

    /**
     * A function wrapping calls to the two functions in an `&&` operation, returning the result of the first
     * function if it is false-y and the result of the second function otherwise.
     *
     * `R.both` will work on all other applicatives as well.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and `&&`s their outputs together.
     * @see R.and
     * @example
     *
     *      var gt10 = x => x > 10;
     *      var even = x => x % 2 === 0;
     *      var f = R.both(gt10, even);
     *      f(100); //=> true
     *      f(101); //=> false
     */
    var both = lift(and);

    /**
     * Takes a function `f` and returns a function `g` such that:
     *
     *   - applying `g` to zero or more arguments will give __true__ if applying
     *     the same arguments to `f` gives a logical __false__ value; and
     *
     *   - applying `g` to zero or more arguments will give __false__ if applying
     *     the same arguments to `f` gives a logical __true__ value.
     *
     * `R.complement` will work on all other functors as well.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category Logic
     * @sig (*... -> *) -> (*... -> Boolean)
     * @param {Function} f
     * @return {Function}
     * @see R.not
     * @example
     *
     *      var isEven = n => n % 2 === 0;
     *      var isOdd = R.complement(isEven);
     *      isOdd(21); //=> true
     *      isOdd(42); //=> false
     */
    var complement = lift(not);

    /**
     * A function wrapping calls to the two functions in an `||` operation, returning the result of the first
     * function if it is truth-y and the result of the second function otherwise.
     *
     * `R.either` will work on all other applicatives as well.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @category Logic
     * @sig (*... -> Boolean) -> (*... -> Boolean) -> (*... -> Boolean)
     * @param {Function} f a predicate
     * @param {Function} g another predicate
     * @return {Function} a function that applies its arguments to `f` and `g` and `||`s their outputs together.
     * @see R.or
     * @example
     *
     *      var gt10 = x => x > 10;
     *      var even = x => x % 2 === 0;
     *      var f = R.either(gt10, even);
     *      f(101); //=> true
     *      f(8); //=> true
     */
    var either = lift(or);

    /**
     * Turns a named method with a specified arity into a function
     * that can be called directly supplied with arguments and a target object.
     *
     * The returned function is curried and accepts `arity + 1` parameters where
     * the final parameter is the target object.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig Number -> String -> (a -> b -> ... -> n -> Object -> *)
     * @param {Number} arity Number of arguments the returned function should take
     *        before the target object.
     * @param {Function} method Name of the method to call.
     * @return {Function} A new curried function.
     * @example
     *
     *      var sliceFrom = R.invoker(1, 'slice');
     *      sliceFrom(6, 'abcdefghijklm'); //=> 'ghijklm'
     *      var sliceFrom6 = R.invoker(2, 'slice')(6);
     *      sliceFrom6(8, 'abcdefghijklm'); //=> 'gh'
     */
    var invoker = _curry2(function invoker(arity, method) {
        return curryN(arity + 1, function () {
            var target = arguments[arity];
            if (target != null && is(Function, target[method])) {
                return target[method].apply(target, _slice(arguments, 0, arity));
            }
            throw new TypeError(toString(target) + ' does not have a method named "' + method + '"');
        });
    });

    /**
     * Returns a string made by inserting the `separator` between each
     * element and concatenating all the elements into a single string.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig String -> [a] -> String
     * @param {Number|String} separator The string used to separate the elements.
     * @param {Array} xs The elements to join into a string.
     * @return {String} str The string made by concatenating `xs` with `separator`.
     * @see R.split
     * @example
     *
     *      var spacer = R.join(' ');
     *      spacer(['a', 2, 3.4]);   //=> 'a 2 3.4'
     *      R.join('|', [1, 2, 3]);    //=> '1|2|3'
     */
    var join = invoker(1, 'join');

    /**
     * Creates a new function that, when invoked, caches the result of calling `fn` for a given
     * argument set and returns the result. Subsequent calls to the memoized `fn` with the same
     * argument set will not result in an additional call to `fn`; instead, the cached result
     * for that set of arguments will be returned.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category Function
     * @sig (*... -> a) -> (*... -> a)
     * @param {Function} fn The function to memoize.
     * @return {Function} Memoized version of `fn`.
     * @example
     *
     *      var count = 0;
     *      var factorial = R.memoize(n => {
     *        count += 1;
     *        return R.product(R.range(1, n + 1));
     *      });
     *      factorial(5); //=> 120
     *      factorial(5); //=> 120
     *      factorial(5); //=> 120
     *      count; //=> 1
     */
    var memoize = _curry1(function memoize(fn) {
        var cache = {};
        return function () {
            var key = toString(arguments);
            if (!_has(key, cache)) {
                cache[key] = fn.apply(this, arguments);
            }
            return cache[key];
        };
    });

    /**
     * Splits a string into an array of strings based on the given
     * separator.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category String
     * @sig (String | RegExp) -> String -> [String]
     * @param {String|RegExp} sep The pattern.
     * @param {String} str The string to separate into an array.
     * @return {Array} The array of strings from `str` separated by `str`.
     * @see R.join
     * @example
     *
     *      var pathComponents = R.split('/');
     *      R.tail(pathComponents('/usr/local/bin/node')); //=> ['usr', 'local', 'bin', 'node']
     *
     *      R.split('.', 'a.b.c.xyz.d'); //=> ['a', 'b', 'c', 'xyz', 'd']
     */
    var split = invoker(1, 'split');

    /**
     * Determines whether a given string matches a given regular expression.
     *
     * @func
     * @memberOf R
     * @since v0.12.0
     * @see R.match
     * @category String
     * @sig RegExp -> String -> Boolean
     * @param {RegExp} pattern
     * @param {String} str
     * @return {Boolean}
     * @example
     *
     *      R.test(/^x/, 'xyz'); //=> true
     *      R.test(/^y/, 'xyz'); //=> false
     */
    var test = _curry2(function test(pattern, str) {
        if (!_isRegExp(pattern)) {
            throw new TypeError('\u2018test\u2019 requires a value of type RegExp as its first argument; received ' + toString(pattern));
        }
        return _cloneRegExp(pattern).test(str);
    });

    /**
     * The lower case version of a string.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category String
     * @sig String -> String
     * @param {String} str The string to lower case.
     * @return {String} The lower case version of `str`.
     * @see R.toUpper
     * @example
     *
     *      R.toLower('XYZ'); //=> 'xyz'
     */
    var toLower = invoker(0, 'toLowerCase');

    /**
     * The upper case version of a string.
     *
     * @func
     * @memberOf R
     * @since v0.9.0
     * @category String
     * @sig String -> String
     * @param {String} str The string to upper case.
     * @return {String} The upper case version of `str`.
     * @see R.toLower
     * @example
     *
     *      R.toUpper('abc'); //=> 'ABC'
     */
    var toUpper = invoker(0, 'toUpperCase');

    /**
     * Returns the result of concatenating the given lists or strings.
     *
     * Dispatches to the `concat` method of the second argument, if present.
     *
     * @func
     * @memberOf R
     * @since v0.1.0
     * @category List
     * @sig [a] -> [a] -> [a]
     * @sig String -> String -> String
     * @param {Array|String} a
     * @param {Array|String} b
     * @return {Array|String}
     *
     * @example
     *
     *      R.concat([], []); //=> []
     *      R.concat([4, 5, 6], [1, 2, 3]); //=> [4, 5, 6, 1, 2, 3]
     *      R.concat('ABC', 'DEF'); // 'ABCDEF'
     */
    var concat = flip(invoker(1, 'concat'));

    var R = {
        F: F,
        T: T,
        __: __,
        add: add,
        addIndex: addIndex,
        adjust: adjust,
        all: all,
        allPass: allPass,
        allUniq: allUniq,
        always: always,
        and: and,
        any: any,
        anyPass: anyPass,
        ap: ap,
        aperture: aperture,
        append: append,
        apply: apply,
        assoc: assoc,
        assocPath: assocPath,
        binary: binary,
        bind: bind,
        both: both,
        call: call,
        chain: chain,
        clone: clone,
        commute: commute,
        commuteMap: commuteMap,
        comparator: comparator,
        complement: complement,
        compose: compose,
        composeK: composeK,
        composeP: composeP,
        concat: concat,
        cond: cond,
        construct: construct,
        constructN: constructN,
        contains: contains,
        containsWith: containsWith,
        converge: converge,
        countBy: countBy,
        createMapEntry: createMapEntry,
        curry: curry,
        curryN: curryN,
        dec: dec,
        defaultTo: defaultTo,
        difference: difference,
        differenceWith: differenceWith,
        dissoc: dissoc,
        dissocPath: dissocPath,
        divide: divide,
        drop: drop,
        dropLast: dropLast,
        dropLastWhile: dropLastWhile,
        dropRepeats: dropRepeats,
        dropRepeatsWith: dropRepeatsWith,
        dropWhile: dropWhile,
        either: either,
        empty: empty,
        eqBy: eqBy,
        eqProps: eqProps,
        equals: equals,
        evolve: evolve,
        filter: filter,
        find: find,
        findIndex: findIndex,
        findLast: findLast,
        findLastIndex: findLastIndex,
        flatten: flatten,
        flip: flip,
        forEach: forEach,
        fromPairs: fromPairs,
        functions: functions,
        functionsIn: functionsIn,
        groupBy: groupBy,
        gt: gt,
        gte: gte,
        has: has,
        hasIn: hasIn,
        head: head,
        identical: identical,
        identity: identity,
        ifElse: ifElse,
        inc: inc,
        indexOf: indexOf,
        init: init,
        insert: insert,
        insertAll: insertAll,
        intersection: intersection,
        intersectionWith: intersectionWith,
        intersperse: intersperse,
        into: into,
        invert: invert,
        invertObj: invertObj,
        invoker: invoker,
        is: is,
        isArrayLike: isArrayLike,
        isEmpty: isEmpty,
        isNil: isNil,
        isSet: isSet,
        join: join,
        keys: keys,
        keysIn: keysIn,
        last: last,
        lastIndexOf: lastIndexOf,
        length: length,
        lens: lens,
        lensIndex: lensIndex,
        lensProp: lensProp,
        lift: lift,
        liftN: liftN,
        lt: lt,
        lte: lte,
        map: map,
        mapAccum: mapAccum,
        mapAccumRight: mapAccumRight,
        mapObj: mapObj,
        mapObjIndexed: mapObjIndexed,
        match: match,
        mathMod: mathMod,
        max: max,
        maxBy: maxBy,
        mean: mean,
        median: median,
        memoize: memoize,
        merge: merge,
        mergeAll: mergeAll,
        min: min,
        minBy: minBy,
        modulo: modulo,
        multiply: multiply,
        nAry: nAry,
        negate: negate,
        none: none,
        not: not,
        nth: nth,
        nthArg: nthArg,
        objOf: objOf,
        of: of,
        omit: omit,
        once: once,
        or: or,
        over: over,
        pair: pair,
        partial: partial,
        partialRight: partialRight,
        partition: partition,
        path: path,
        pathEq: pathEq,
        pathOr: pathOr,
        pick: pick,
        pickAll: pickAll,
        pickBy: pickBy,
        pipe: pipe,
        pipeK: pipeK,
        pipeP: pipeP,
        pluck: pluck,
        prepend: prepend,
        product: product,
        project: project,
        prop: prop,
        propEq: propEq,
        propIs: propIs,
        propOr: propOr,
        propSatisfies: propSatisfies,
        props: props,
        range: range,
        reduce: reduce,
        reduceRight: reduceRight,
        reduced: reduced,
        reject: reject,
        remove: remove,
        repeat: repeat,
        replace: replace,
        reverse: reverse,
        scan: scan,
        set: set,
        slice: slice,
        sort: sort,
        sortBy: sortBy,
        split: split,
        splitEvery: splitEvery,
        subtract: subtract,
        sum: sum,
        tail: tail,
        take: take,
        takeLast: takeLast,
        takeLastWhile: takeLastWhile,
        takeWhile: takeWhile,
        tap: tap,
        test: test,
        times: times,
        toLower: toLower,
        toPairs: toPairs,
        toPairsIn: toPairsIn,
        toString: toString,
        toUpper: toUpper,
        transduce: transduce,
        trim: trim,
        type: type,
        unapply: unapply,
        unary: unary,
        uncurryN: uncurryN,
        unfold: unfold,
        union: union,
        unionWith: unionWith,
        uniq: uniq,
        uniqBy: uniqBy,
        uniqWith: uniqWith,
        unless: unless,
        unnest: unnest,
        update: update,
        useWith: useWith,
        values: values,
        valuesIn: valuesIn,
        view: view,
        when: when,
        where: where,
        whereEq: whereEq,
        wrap: wrap,
        xprod: xprod,
        zip: zip,
        zipObj: zipObj,
        zipWith: zipWith
    };

  /* TEST_ENTRY_POINT */

  if (typeof exports === 'object') {
    module.exports = R;
  } else if (typeof define === 'function' && define.amd) {
    define(function() { return R; });
  } else {
    this.R = R;
  }

}.call(this));

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _parseLatestObservationData = require("./parse-latest-observation-data");

var _parseLatestObservationData2 = _interopRequireDefault(_parseLatestObservationData);

var _parseRealtimeBuoyData = require("./parse-realtime-buoy-data");

var _parseRealtimeBuoyData2 = _interopRequireDefault(_parseRealtimeBuoyData);

var _parseStationProperties = require("./parse-station-properties");

var _parseStationProperties2 = _interopRequireDefault(_parseStationProperties);

var _tide = require("./tide");

var _tide2 = _interopRequireDefault(_tide);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
	build: "Tue Dec 08 2015 13:40:14 GMT-0800 (PST)",
	Tide: _tide2.default,
	Buoy: {
		realTime: _parseRealtimeBuoyData2.default,
		lastestObservation: _parseLatestObservationData2.default,
		stationProperties: _parseStationProperties2.default
	}
};

},{"./parse-latest-observation-data":4,"./parse-realtime-buoy-data":6,"./parse-station-properties":7,"./tide":9}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (buoy, map, val, index) {
	if (val === "MM") {
		return;
	}

	var propName = map[index];
	if (propName === "STN") {
		buoy.stationID = val;
		return;
	}
	if (_propMap2.default[propName]) {
		propName = _propMap2.default[propName];
	} else {
		return;
	}
	// all values are numbers.
	val = parseFloat(val);
	switch (propName) {
		case "year":
			buoy.date.setUTCFullYear(val);
			break;
		case "month":
			buoy.date.setUTCMonth(val - 1);
			break;
		case "day":
			buoy.date.setUTCDate(val);
			break;
		case "hour":
			buoy.date.setUTCHours(val);
			break;
		case "minute":
			buoy.date.setUTCMinutes(val);
			break;
		case "dominantPeriodWaveDirection":
			buoy[propName] = val;
			buoy.dominantPeriodWaveDirectionCompass = (0, _degreesToDirection2.default)(val);
			break;
		case "windDirection":
			buoy[propName] = val;
			buoy.windDirectionCompass = (0, _degreesToDirection2.default)(val);
			break;
		case "waveHeight":
			buoy[propName] = val;
			break;
		case "longitude":
		case "latitude":
			buoy[propName] = parseFloat(val);
			break;
		default:
			if (!_ramda2.default.isNil(val)) {
				buoy[propName] = val;
			}
			break;
	}
};

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _degreesToDirection = require("./util/degrees-to-direction");

var _degreesToDirection2 = _interopRequireDefault(_degreesToDirection);

var _propMap = require("./prop-map.js");

var _propMap2 = _interopRequireDefault(_propMap);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./prop-map.js":8,"./util/degrees-to-direction":10,"ramda":1}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PARSE_ERROR = undefined;

exports.default = function (list) {
  if (_ramda2.default.is(String, list)) {
    return _funcs2.default.processRecords(list);
  }
  throw PARSE_ERROR;
};

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _parseBuoyProperties = require("./parse-buoy-properties");

var _parseBuoyProperties2 = _interopRequireDefault(_parseBuoyProperties);

var _parseLine = require("./parse-line");

var _parseLine2 = _interopRequireDefault(_parseLine);

var _funcs = require("./util/funcs");

var _funcs2 = _interopRequireDefault(_funcs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PARSE_ERROR = exports.PARSE_ERROR = "Invalid data for parse-data.js";

/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/latest_obs/latest_obs.txt
 * No json was available
 */

},{"./parse-buoy-properties":3,"./parse-line":5,"./util/funcs":11,"ramda":1}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = getArrayFromLine;
function getArrayFromLine(line) {
	return line.replace(/\s{2,}/g, ' ').replace("#", "").split(" ");
}

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.PARSE_ERROR = undefined;

exports.default = function (list) {
	var numberOfRecords = arguments.length <= 1 || arguments[1] === undefined ? 10 : arguments[1];

	if (_ramda2.default.is(String, list)) {
		return _ramda2.default.take(numberOfRecords, _funcs2.default.processRecords(list));
	} else {
		/* istanbul ignore next */
		throw PARSE_ERROR;
	}
};

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _parseBuoyProperties = require("./parse-buoy-properties");

var _parseBuoyProperties2 = _interopRequireDefault(_parseBuoyProperties);

var _funcs = require("./util/funcs");

var _funcs2 = _interopRequireDefault(_funcs);

var _parseLine = require("./parse-line");

var _parseLine2 = _interopRequireDefault(_parseLine);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PARSE_ERROR = exports.PARSE_ERROR = "Invalid data for parse-realtime-buoy-data.js";

/**
 * Data loaded from
 * http://www.ndbc.noaa.gov/data/realtime2/{stationID}.txt
 * No json was available
 * returns an {Array} of records of buoy data
 */

},{"./parse-buoy-properties":3,"./parse-line":5,"./util/funcs":11,"ramda":1}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (stationData) {
	var foundID = idMatch.exec(stationData);
	if (!foundID) {
		throw PARSE_ERROR + " no id";
	}
	var id = foundID[1],
	    result = {
		id: id
	},
	    parse = nameMatch.exec(stationData),
	    coords = coordsMatch.exec(stationData);
	if (!parse || parse.length < 2) {
		result.name = id;
	} else {
		result.name = parse[1];
	}
	if (!coords || coords.length < 2) {
		throw PARSE_ERROR + " no coords";
	} else {
		var latlong = coords[0].split(" "),
		    lat = latlong[0],
		    long = latlong[1];
		result.longitude = long.indexOf("W") === -1 ? parseFloat(long) : -parseFloat(long);
		result.latitude = lat.indexOf("S") === -1 ? parseFloat(lat) : -parseFloat(lat);
	}
	return result;
};

/**
 * Parses station data from http://www.ndbc.noaa.gov/mobile/station.php?station=
 */
var nameMatch = /h1><p>(.*)<br/i,
    coordsMatch = /\d{0,3}\.\d{0,3}(N|S) \d{0,3}.\d{0,3}(W|E)/i,
    idMatch = /title>NDBC\/(.*)<\/title/i;
var PARSE_ERROR = exports.PARSE_ERROR = "Couldn't parse station data";

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.default = {
	STN: "stationID",
	/**
  * Wind direction (the direction the wind is coming from in degrees clockwise from true N) during the same period used for WSPD. See Wind Averaging Methods
  */
	WDIR: "windDirection",
	/**
  * Wind speed (m/s) averaged over an eight-minute period for buoys and a two-minute period for land stations. Reported Hourly. See Wind Averaging Methods.
  */
	WSPD: "windSpeed",
	/**
  * Peak 5 or 8 second gust speed (m/s) measured during the eight-minute or two-minute period. The 5 or 8 second period can be determined by payload, See the Sensor Reporting, Sampling, and Accuracy section.
  */
	GST: "gustSpeed",
	/**
  * Significant wave height (meters) is calculated as the average of the highest one-third of all of the wave heights during the 20-minute sampling period. See the Wave Measurements section.
  */
	WVHT: "waveHeight",
	/**
  * Dominant wave period (seconds) is the period with the maximum wave energy. See the Wave Measurements section.
  */
	DPD: "wavePeriod",
	/**
  * Average wave period (seconds) of all waves during the 20-minute period. See the Wave Measurements section.
  */
	APD: "averageWavePeriod",
	/**
  * The direction from which the waves at the dominant period (DPD) are coming. The units are degrees from true North, increasing clockwise,
  * with North as 0 (zero) degrees and East as 90 degrees. See the Wave Measurements section.
  */
	MWD: "dominantPeriodWaveDirection",
	/**
  * Sea level pressure (hPa). For C-MAN sites and Great Lakes buoys,
  * the recorded pressure is reduced to sea level using the method described in
  * NWS Technical Procedures Bulletin 291 (11/14/80). ( labeled BAR in Historical files)
  */
	PRES: "pressure",
	/**
  * Air temperature (Celsius). For sensor heights on buoys, see Hull Descriptions.
  * For sensor heights at C-MAN stations, see C-MAN Sensor Locations
  */
	ATMP: "airTemp",
	/**
  * Sea surface temperature (Celsius). For sensor depth, see Hull Description.
  */
	WTMP: "waterTemp",
	/**
  * Dewpoint temperature taken at the same height as the air temperature measurement.
  */
	DEWP: "dewpointTemp",
	/**
  * Pressure Tendency is the direction (plus or minus) and the amount of pressure change (hPa)
  * for a three hour period ending at the time of observation. (not in Historical files)
  */
	PTDY: "pressureTendency",
	TIDE: "tide",
	LAT: "latitude",
	LON: "longitude",
	YYYY: "year",
	YY: "year",
	MM: "month",
	DD: "day",
	hh: "hour",
	mm: "minute"
};

},{}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _funcs = require("./util/funcs");

var _funcs2 = _interopRequireDefault(_funcs);

var _getNoaaDate = require("./util/get-noaa-date");

var _getNoaaDate2 = _interopRequireDefault(_getNoaaDate);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var parseTideTableLine = function parseTideTableLine(rawData) {
	if (_ramda2.default.is(String, rawData)) {
		var fields = _funcs2.default.compact(rawData.split("\t"));
		// fields: Date, Day, Time, Ft, cm, High/Low
		if (fields.length === 6) {
			var date = new Date(fields[0] + " " + fields[2] + " GMT+0000");
			if (_ramda2.default.is(Date, date) && _funcs2.default.isFinite(date.getTime())) {
				return {
					date: date,
					tideSize: parseInt(fields[4]) / 100,
					isHighTide: fields[5].indexOf("H") !== -1
				};
			}
		}
	}
};
exports.default = {
	getURL: function getURL(tideStationID) {
		var numberOfHours = arguments.length <= 1 || arguments[1] === undefined ? 48 : arguments[1];

		var range = numberOfHours;
		return "http://tidesandcurrents.noaa.gov/api/datagetter?begin_date=" + (0, _getNoaaDate2.default)() + "&range=" + range + "&station=" + tideStationID + "&product=predictions&datum=MLLW&units=metric&time_zone=gmt&application=ports_screen&format=csv";
	},

	parseTideTableLine: parseTideTableLine,
	/**
  * return an array of {date, tideSize, isHighTide}
  */
	parseTideTable: function parseTideTable(rawData) {
		if (_ramda2.default.is(String, rawData)) {
			var lines = rawData.split("\n");
			return _funcs2.default.compact(_ramda2.default.map(function (line) {
				return parseTideTableLine(line);
			}, lines));
		}
	},
	/**
  * return an array of {date, tideSize}
  */
	parse: function parse(rawData) {
		return _ramda2.default.tail(rawData.split("\n")).map(function (row) {
			var tide = row.split(","),
			   
			// the date is UTC, append GMT+0000 to indicate that
			formattedTime = tide[0].replace(/-/g, "/") + " GMT+0000";
			return {
				date: new Date(formattedTime),
				tideSize: parseFloat(tide[1])
			};
		});
	},
	/**
  * look through an array of {date, tideSize}
  */
	getCurrent: function getCurrent(data, forDate) {
		var matchDate = forDate || new Date(),
		    lastTide = {};
		return _ramda2.default.find(function (tide) {
			var date = tide.date;
			if (_ramda2.default.is(Date, date) && _funcs2.default.isFinite(date.getTime())) {
				if (date.getTime() > matchDate.getTime()) {
					tide.isIncreasing = tide.tideSize > lastTide.tideSize;
					return true;
				}
				if (tide.tideSize !== lastTide.tideSize) {
					lastTide = tide;
				}
			}
		}, data);
	},
	/**
  * look through an array of {date, tideSize}
  */
	getNextHighOrLow: function getNextHighOrLow(data, forDate) {
		var matchDate = forDate || new Date(),
		    foundCurrent = undefined,
		    isIncreasing = undefined,
		    result = undefined,
		    lastTide = {};
		data.some(function (tide) {
			var itemDate = new Date(tide.date);
			if (!_funcs2.default.isFinite(itemDate.getTime())) {
				return false;
			}
			if (foundCurrent) {
				// the tide is increasing
				// the current item is lower than the last
				// the last item was the high tide
				if (isIncreasing && tide.tideSize < lastTide.tideSize) {
					result = lastTide;
				} else if (!isIncreasing && tide.tideSize > lastTide.tideSize) {
					// tide is decreasing
					// the current tide is higher than the last
					// the last item was low tide
					result = lastTide;
				}
				if (result) {
					lastTide.isHighTide = isIncreasing;
					return true;
				}
			}
			if (!foundCurrent && itemDate.getTime() > matchDate.getTime()) {
				// we found the current tide, is it increasing?
				isIncreasing = tide.tideSize > lastTide.tideSize;
				foundCurrent = true;
			}
			if (tide.tideSize !== lastTide.tideSize) {
				lastTide = tide;
			}
		});
		return result;
	}
};

},{"./util/funcs":11,"./util/get-noaa-date":12,"ramda":1}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

exports.default = function (degrees) {
	if (degrees >= 0 && degrees <= 11.25) {
		return "N";
	}
	if (degrees > 348.75 && degrees <= 360) {
		return "N";
	}
	if (degrees > 11.25 && degrees <= 33.75) {
		return "NNE";
	}
	if (degrees > 33.75 && degrees <= 56.25) {
		return "NE";
	}
	if (degrees > 56.25 && degrees <= 78.75) {
		return "ENE";
	}
	if (degrees > 78.75 && degrees <= 101.25) {
		return "E";
	}
	if (degrees > 101.25 && degrees <= 123.75) {
		return "ESE";
	}
	if (degrees > 123.75 && degrees <= 146.25) {
		return "SE";
	}
	if (degrees > 146.25 && degrees <= 168.75) {
		return "SSE";
	}
	if (degrees > 168.75 && degrees <= 191.25) {
		return "S";
	}
	if (degrees > 191.25 && degrees <= 213.75) {
		return "SSW";
	}
	if (degrees > 213.75 && degrees <= 236.25) {
		return "SW";
	}
	if (degrees > 236.25 && degrees <= 258.75) {
		return "WSW";
	}
	if (degrees > 258.75 && degrees <= 281.25) {
		return "W";
	}
	if (degrees > 281.25 && degrees <= 303.75) {
		return "WNW";
	}
	if (degrees > 303.75 && degrees <= 326.25) {
		return "NW";
	}
	if (degrees > 326.25 && degrees <= 348.75) {
		return "NNW";
	}
};

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _ramda = require("ramda");

var _ramda2 = _interopRequireDefault(_ramda);

var _parseLine = require("../parse-line");

var _parseLine2 = _interopRequireDefault(_parseLine);

var _parseBuoyProperties = require("../parse-buoy-properties");

var _parseBuoyProperties2 = _interopRequireDefault(_parseBuoyProperties);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compact = _ramda2.default.compose(_ramda2.default.filter(Boolean), _ramda2.default.reject(_ramda2.default.isNil)),

// get the prop names, and remove STN, which we're using as the ID
firstAsArray = _ramda2.default.compose(_parseLine2.default, _ramda2.default.head),

// pop off the first two lines of text, they're descriptions, not buoy data
cleanBuoyData = _ramda2.default.compose(compact, _ramda2.default.drop(2)),

// Convert the raw date to a buoy object
createBuoyRecord = _ramda2.default.curry(function (propertyNames, values) {
	var buoy = {
		date: new Date()
	};
	// build the object by iterating through each column value
	values.forEach(_ramda2.default.partial(_parseBuoyProperties2.default, [buoy, propertyNames]));
	// seconds and milliseconds don't come from noaa data,
	// so clear them
	buoy.date.setSeconds(0);
	buoy.date.setMilliseconds(0);
	return buoy;
});

var processRecords = function processRecords(list) {
	// create an array from the lines
	list = list.split("\n");
	// The first line is the property names
	var propertyNames = firstAsArray(list),
	   
	// Run this on each record
	processRecord = _ramda2.default.compose(createBuoyRecord(propertyNames), _parseLine2.default),
	   
	// The records list to map
	recordsList = cleanBuoyData(list);
	return recordsList.map(processRecord);
};

exports.default = {
	compact: compact,
	isFinite: (function (_isFinite) {
		function isFinite(_x) {
			return _isFinite.apply(this, arguments);
		}

		isFinite.toString = function () {
			return _isFinite.toString();
		};

		return isFinite;
	})(function (obj) {
		return isFinite(obj) && !isNaN(parseFloat(obj));
	}),
	processRecords: processRecords
};

},{"../parse-buoy-properties":3,"../parse-line":5,"ramda":1}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
   value: true
});

exports.default = function (date) {
   var d = date || new Date(),
       month = (d.getUTCMonth() + 1).toString(),
       day = d.getUTCDate().toString();
   if (month.length === 1) {
      month = "0" + month;
   }
   if (day.length === 1) {
      day = "0" + day;
   }
   return d.getUTCFullYear().toString() + month + day;
};

},{}]},{},[2])(2)
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJub2RlX21vZHVsZXMvcmFtZGEvZGlzdC9yYW1kYS5qcyIsInNyYy9tYWluLmpzIiwic3JjL3BhcnNlLWJ1b3ktcHJvcGVydGllcy5qcyIsInNyYy9wYXJzZS1sYXRlc3Qtb2JzZXJ2YXRpb24tZGF0YS5qcyIsInNyYy9wYXJzZS1saW5lLmpzIiwic3JjL3BhcnNlLXJlYWx0aW1lLWJ1b3ktZGF0YS5qcyIsInNyYy9wYXJzZS1zdGF0aW9uLXByb3BlcnRpZXMuanMiLCJzcmMvcHJvcC1tYXAuanMiLCJzcmMvdGlkZS5qcyIsInNyYy91dGlsL2RlZ3JlZXMtdG8tZGlyZWN0aW9uLmpzIiwic3JjL3V0aWwvZnVuY3MuanMiLCJzcmMvdXRpbC9nZXQtbm9hYS1kYXRlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7a0JDbHdQZTtBQUNkLE1BQUssRUFBRSxZQUFZO0FBQ25CLEtBQUksZ0JBQU07QUFDVixLQUFJLEVBQUU7QUFDTCxVQUFRLGlDQUFXO0FBQ25CLG9CQUFrQixzQ0FBNEI7QUFDOUMsbUJBQWlCLGtDQUFtQjtFQUNwQztDQUNEOzs7Ozs7Ozs7a0JDVGMsVUFBUyxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUU7QUFDOUMsS0FBSSxHQUFHLEtBQUssSUFBSSxFQUFFO0FBQ2pCLFNBQU87RUFDUDs7QUFFRCxLQUFJLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDMUIsS0FBSSxRQUFRLEtBQUssS0FBSyxFQUFFO0FBQ3ZCLE1BQUksQ0FBQyxTQUFTLEdBQUcsR0FBRyxDQUFBO0FBQ3BCLFNBQU07RUFDTjtBQUNELEtBQUksa0JBQVEsUUFBUSxDQUFDLEVBQUU7QUFDdEIsVUFBUSxHQUFHLGtCQUFRLFFBQVEsQ0FBQyxDQUFDO0VBQzdCLE1BQU07QUFDTixTQUFPO0VBQ1A7O0FBQUEsQUFFRCxJQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ3RCLFNBQVEsUUFBUTtBQUNmLE9BQUssTUFBTTtBQUNWLE9BQUksQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLFNBQU07QUFBQSxBQUNQLE9BQUssT0FBTztBQUNYLE9BQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQztBQUMvQixTQUFNO0FBQUEsQUFDUCxPQUFLLEtBQUs7QUFDVCxPQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixTQUFNO0FBQUEsQUFDUCxPQUFLLE1BQU07QUFDVixPQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixTQUFNO0FBQUEsQUFDUCxPQUFLLFFBQVE7QUFDWixPQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixTQUFNO0FBQUEsQUFDUCxPQUFLLDZCQUE2QjtBQUNqQyxPQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0FBQ3JCLE9BQUksQ0FBQyxrQ0FBa0MsR0FBRyxrQ0FBbUIsR0FBRyxDQUFDLENBQUM7QUFDbEUsU0FBTTtBQUFBLEFBQ1AsT0FBSyxlQUFlO0FBQ25CLE9BQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxHQUFHLENBQUM7QUFDckIsT0FBSSxDQUFDLG9CQUFvQixHQUFHLGtDQUFtQixHQUFHLENBQUMsQ0FBQztBQUNwRCxTQUFNO0FBQUEsQUFDUCxPQUFLLFlBQVk7QUFDaEIsT0FBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEdBQUcsQ0FBQztBQUNyQixTQUFNO0FBQUEsQUFDUCxPQUFLLFdBQVcsQ0FBQztBQUNqQixPQUFLLFVBQVU7QUFDZCxPQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2pDLFNBQU07QUFBQSxBQUNQO0FBQ0MsT0FBRyxDQUFDLGdCQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBQztBQUNoQixRQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsR0FBRyxDQUFDO0lBQ3JCO0FBQ0QsU0FBTTtBQUFBLEVBQ1A7Q0FDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2tCQzlDYyxVQUFTLElBQUksRUFBRTtBQUM3QixNQUFJLGdCQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLEVBQUU7QUFDdkIsV0FBTyxnQkFBSyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUE7R0FDaEM7QUFDRCxRQUFNLFdBQVcsQ0FBQztDQUNsQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFaTSxJQUFNLFdBQVcsV0FBWCxXQUFXLEdBQUcsZ0NBQWdDOzs7Ozs7O0FBQUM7Ozs7Ozs7a0JDSnBDLGdCQUFnQjtBQUF6QixTQUFTLGdCQUFnQixDQUFDLElBQUksRUFBRTtBQUM5QyxRQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0NBQ2hFOzs7Ozs7Ozs7O2tCQ1VjLFVBQVMsSUFBSSxFQUF3QjtLQUF0QixlQUFlLHlEQUFHLEVBQUU7O0FBQ2pELEtBQUksZ0JBQUUsRUFBRSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsRUFBRTtBQUN2QixTQUFPLGdCQUFFLElBQUksQ0FBQyxlQUFlLEVBQUUsZ0JBQUssY0FBYyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUE7RUFDekQsTUFBTTs7QUFFTixRQUFNLFdBQVcsQ0FBQztFQUNsQjtDQUNEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWZNLElBQU0sV0FBVyxXQUFYLFdBQVcsR0FBRyw4Q0FBOEM7Ozs7Ozs7O0FBQUM7Ozs7Ozs7O2tCQ0czRCxVQUFTLFdBQVcsRUFBRTtBQUNwQyxLQUFJLE9BQU8sR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO0FBQ3ZDLEtBQUksQ0FBQyxPQUFPLEVBQUU7QUFDYixRQUFNLFdBQVcsR0FBRyxRQUFRLENBQUE7RUFDNUI7QUFDRCxLQUFJLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ2xCLE1BQU0sR0FBRztBQUNSLElBQUUsRUFBRSxFQUFFO0VBQ047S0FDRCxLQUFLLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7S0FDbkMsTUFBTSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUE7QUFDdkMsS0FBSSxDQUFDLEtBQUssSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtBQUMvQixRQUFNLENBQUMsSUFBSSxHQUFHLEVBQUUsQ0FBQztFQUNqQixNQUFNO0FBQ04sUUFBTSxDQUFDLElBQUksR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7RUFDdkI7QUFDRCxLQUFJLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO0FBQ2pDLFFBQU0sV0FBVyxHQUFHLFlBQVksQ0FBQTtFQUNoQyxNQUFNO0FBQ04sTUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7TUFDakMsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUM7TUFDaEIsSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQTtBQUNsQixRQUFNLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xGLFFBQU0sQ0FBQyxRQUFRLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUE7RUFDOUU7QUFDRCxRQUFPLE1BQU0sQ0FBQTtDQUNiOzs7OztBQTlCRCxJQUFJLFNBQVMsR0FBRyxnQkFBZ0I7SUFDL0IsV0FBVyxHQUFHLDZDQUE2QztJQUMzRCxPQUFPLEdBQUcsMkJBQTJCLENBQUE7QUFDL0IsSUFBTSxXQUFXLFdBQVgsV0FBVyxHQUFHLDZCQUE2QixDQUFBOzs7Ozs7OztrQkNOekM7QUFDZCxJQUFHLEVBQUUsV0FBVzs7OztBQUloQixLQUFJLEVBQUUsZUFBZTs7OztBQUlyQixLQUFJLEVBQUUsV0FBVzs7OztBQUlqQixJQUFHLEVBQUUsV0FBVzs7OztBQUloQixLQUFJLEVBQUUsWUFBWTs7OztBQUlsQixJQUFHLEVBQUUsWUFBWTs7OztBQUlqQixJQUFHLEVBQUUsbUJBQW1COzs7OztBQUt4QixJQUFHLEVBQUUsNkJBQTZCOzs7Ozs7QUFNbEMsS0FBSSxFQUFFLFVBQVU7Ozs7O0FBS2hCLEtBQUksRUFBRSxTQUFTOzs7O0FBSWYsS0FBSSxFQUFFLFdBQVc7Ozs7QUFJakIsS0FBSSxFQUFFLGNBQWM7Ozs7O0FBS3BCLEtBQUksRUFBRSxrQkFBa0I7QUFDeEIsS0FBSSxFQUFFLE1BQU07QUFDWixJQUFHLEVBQUUsVUFBVTtBQUNmLElBQUcsRUFBRSxXQUFXO0FBQ2hCLEtBQUksRUFBRSxNQUFNO0FBQ1osR0FBRSxFQUFFLE1BQU07QUFDVixHQUFFLEVBQUUsT0FBTztBQUNYLEdBQUUsRUFBRSxLQUFLO0FBQ1QsR0FBRSxFQUFFLE1BQU07QUFDVixHQUFFLEVBQUUsUUFBUTtDQUNaOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQzdERCxJQUFJLGtCQUFrQixHQUFHLFNBQXJCLGtCQUFrQixDQUFZLE9BQU8sRUFBRTtBQUMxQyxLQUFJLGdCQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7QUFDMUIsTUFBSSxNQUFNLEdBQUcsZ0JBQUssT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7O0FBQUEsQUFFOUMsTUFBSSxNQUFNLENBQUMsTUFBTSxLQUFLLENBQUMsRUFBRTtBQUN4QixPQUFJLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQTtBQUM5RCxPQUFJLGdCQUFFLEVBQUUsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksZ0JBQUssUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFFO0FBQ3RELFdBQU87QUFDTixTQUFJLEVBQUUsSUFBSTtBQUNWLGFBQVEsRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRztBQUNuQyxlQUFVLEVBQUUsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDekMsQ0FBQTtJQUNEO0dBQ0Q7RUFDRDtDQUNELENBQUE7a0JBQ2M7QUFDZCxPQUFNLGtCQUFDLGFBQWEsRUFBcUI7TUFBbkIsYUFBYSx5REFBRyxFQUFFOztBQUN2QyxNQUFJLEtBQUssR0FBRyxhQUFhLENBQUM7QUFDMUIseUVBQXFFLDRCQUFhLGVBQVUsS0FBSyxpQkFBWSxhQUFhLG9HQUFpRztFQUMzTjs7QUFDRCxtQkFBa0IsRUFBRSxrQkFBa0I7Ozs7QUFJdEMsZUFBYyxFQUFFLHdCQUFTLE9BQU8sRUFBRTtBQUNqQyxNQUFJLGdCQUFFLEVBQUUsQ0FBQyxNQUFNLEVBQUUsT0FBTyxDQUFDLEVBQUU7QUFDMUIsT0FBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQTtBQUMvQixVQUFPLGdCQUFLLE9BQU8sQ0FBQyxnQkFBRSxHQUFHLENBQUMsVUFBUyxJQUFJLEVBQUU7QUFDeEMsV0FBTyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUMvQixFQUFFLEtBQUssQ0FBQyxDQUFDLENBQUE7R0FDVjtFQUNEOzs7O0FBSUQsTUFBSyxFQUFFLGVBQVMsT0FBTyxFQUFFO0FBQ3hCLFNBQU8sZ0JBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsVUFBUyxHQUFHLEVBQUU7QUFDcEQsT0FBSSxJQUFJLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7OztBQUV4QixnQkFBYSxHQUFHLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxHQUFHLFdBQVcsQ0FBQztBQUMxRCxVQUFPO0FBQ04sUUFBSSxFQUFFLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQztBQUM3QixZQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUM3QixDQUFDO0dBQ0YsQ0FBQyxDQUFDO0VBQ0g7Ozs7QUFJRCxXQUFVLEVBQUUsb0JBQVMsSUFBSSxFQUFFLE9BQU8sRUFBRTtBQUNuQyxNQUFJLFNBQVMsR0FBRyxPQUFPLElBQUksSUFBSSxJQUFJLEVBQUU7TUFDcEMsUUFBUSxHQUFHLEVBQUUsQ0FBQztBQUNmLFNBQU8sZ0JBQUUsSUFBSSxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQzVCLE9BQUksSUFBSSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUE7QUFDcEIsT0FBRyxnQkFBRSxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLGdCQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBQztBQUNwRCxRQUFJLElBQUksQ0FBQyxPQUFPLEVBQUUsR0FBRyxTQUFTLENBQUMsT0FBTyxFQUFFLEVBQUU7QUFDekMsU0FBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUM7QUFDdEQsWUFBTyxJQUFJLENBQUM7S0FDWjtBQUNELFFBQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ3hDLGFBQVEsR0FBRyxJQUFJLENBQUM7S0FDaEI7SUFDRDtHQUNELEVBQUUsSUFBSSxDQUFDLENBQUM7RUFDVDs7OztBQUlELGlCQUFnQixFQUFFLDBCQUFTLElBQUksRUFBRSxPQUFPLEVBQUU7QUFDekMsTUFBSSxTQUFTLEdBQUcsT0FBTyxJQUFJLElBQUksSUFBSSxFQUFFO01BQ3BDLFlBQVksWUFBQTtNQUNaLFlBQVksWUFBQTtNQUNaLE1BQU0sWUFBQTtNQUNOLFFBQVEsR0FBRyxFQUFFLENBQUM7QUFDZixNQUFJLENBQUMsSUFBSSxDQUFDLFVBQVMsSUFBSSxFQUFFO0FBQ3hCLE9BQUksUUFBUSxHQUFHLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUNuQyxPQUFHLENBQUMsZ0JBQUssUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxFQUFDO0FBQ3JDLFdBQU8sS0FBSyxDQUFDO0lBQ2I7QUFDRCxPQUFHLFlBQVksRUFBQzs7OztBQUlmLFFBQUcsWUFBWSxJQUFJLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsRUFBQztBQUNwRCxXQUFNLEdBQUcsUUFBUSxDQUFDO0tBQ2xCLE1BQUssSUFBRyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUM7Ozs7QUFJM0QsV0FBTSxHQUFHLFFBQVEsQ0FBQztLQUNsQjtBQUNELFFBQUcsTUFBTSxFQUFDO0FBQ1QsYUFBUSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUM7QUFDbkMsWUFBTyxJQUFJLENBQUM7S0FDWjtJQUNEO0FBQ0QsT0FBSSxDQUFDLFlBQVksSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLEdBQUcsU0FBUyxDQUFDLE9BQU8sRUFBRSxFQUFFOztBQUU5RCxnQkFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQztBQUNqRCxnQkFBWSxHQUFHLElBQUksQ0FBQztJQUNwQjtBQUNELE9BQUksSUFBSSxDQUFDLFFBQVEsS0FBSyxRQUFRLENBQUMsUUFBUSxFQUFFO0FBQ3hDLFlBQVEsR0FBRyxJQUFJLENBQUM7SUFDaEI7R0FDRCxDQUFDLENBQUM7QUFDSCxTQUFPLE1BQU0sQ0FBQztFQUNkO0NBQ0Q7Ozs7Ozs7OztrQkMvR2MsVUFBUyxPQUFPLEVBQUU7QUFDaEMsS0FBSSxPQUFPLElBQUksQ0FBQyxJQUFJLE9BQU8sSUFBSSxLQUFLLEVBQUU7QUFDckMsU0FBTyxHQUFHLENBQUM7RUFDWDtBQUNELEtBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksR0FBRyxFQUFFO0FBQ3ZDLFNBQU8sR0FBRyxDQUFDO0VBQ1g7QUFDRCxLQUFJLE9BQU8sR0FBRyxLQUFLLElBQUksT0FBTyxJQUFJLEtBQUssRUFBRTtBQUN4QyxTQUFPLEtBQUssQ0FBQztFQUNiO0FBQ0QsS0FBSSxPQUFPLEdBQUcsS0FBSyxJQUFJLE9BQU8sSUFBSSxLQUFLLEVBQUU7QUFDeEMsU0FBTyxJQUFJLENBQUM7RUFDWjtBQUNELEtBQUksT0FBTyxHQUFHLEtBQUssSUFBSSxPQUFPLElBQUksS0FBSyxFQUFFO0FBQ3hDLFNBQU8sS0FBSyxDQUFDO0VBQ2I7QUFDRCxLQUFJLE9BQU8sR0FBRyxLQUFLLElBQUksT0FBTyxJQUFJLE1BQU0sRUFBRTtBQUN6QyxTQUFPLEdBQUcsQ0FBQztFQUNYO0FBQ0QsS0FBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUU7QUFDMUMsU0FBTyxLQUFLLENBQUM7RUFDYjtBQUNELEtBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO0FBQzFDLFNBQU8sSUFBSSxDQUFDO0VBQ1o7QUFDRCxLQUFJLE9BQU8sR0FBRyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sRUFBRTtBQUMxQyxTQUFPLEtBQUssQ0FBQztFQUNiO0FBQ0QsS0FBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUU7QUFDMUMsU0FBTyxHQUFHLENBQUM7RUFDWDtBQUNELEtBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO0FBQzFDLFNBQU8sS0FBSyxDQUFDO0VBQ2I7QUFDRCxLQUFJLE9BQU8sR0FBRyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sRUFBRTtBQUMxQyxTQUFPLElBQUksQ0FBQztFQUNaO0FBQ0QsS0FBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUU7QUFDMUMsU0FBTyxLQUFLLENBQUM7RUFDYjtBQUNELEtBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO0FBQzFDLFNBQU8sR0FBRyxDQUFDO0VBQ1g7QUFDRCxLQUFJLE9BQU8sR0FBRyxNQUFNLElBQUksT0FBTyxJQUFJLE1BQU0sRUFBRTtBQUMxQyxTQUFPLEtBQUssQ0FBQztFQUNiO0FBQ0QsS0FBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLE9BQU8sSUFBSSxNQUFNLEVBQUU7QUFDMUMsU0FBTyxJQUFJLENBQUM7RUFDWjtBQUNELEtBQUksT0FBTyxHQUFHLE1BQU0sSUFBSSxPQUFPLElBQUksTUFBTSxFQUFFO0FBQzFDLFNBQU8sS0FBSyxDQUFDO0VBQ2I7Q0FDRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoREQsSUFBSSxPQUFPLEdBQUcsZ0JBQUUsT0FBTyxDQUFDLGdCQUFFLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxnQkFBRSxNQUFNLENBQUMsZ0JBQUUsS0FBSyxDQUFDLENBQUM7OztBQUU1RCxZQUFZLEdBQUcsZ0JBQUUsT0FBTyxzQkFBZ0IsZ0JBQUUsSUFBSSxDQUFDOzs7QUFFL0MsYUFBYSxHQUFHLGdCQUFFLE9BQU8sQ0FBQyxPQUFPLEVBQUUsZ0JBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOzs7QUFFN0MsZ0JBQWdCLEdBQUcsZ0JBQUUsS0FBSyxDQUFDLFVBQUMsYUFBYSxFQUFFLE1BQU0sRUFBSztBQUNyRCxLQUFJLElBQUksR0FBRztBQUNWLE1BQUksRUFBRSxJQUFJLElBQUksRUFBRTtFQUNoQjs7QUFBQyxBQUVGLE9BQU0sQ0FBQyxPQUFPLENBQUMsZ0JBQUUsT0FBTyxnQ0FBc0IsQ0FBQyxJQUFJLEVBQUUsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O0FBQUMsQUFHdEUsS0FBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDdkIsS0FBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQyxDQUFDLENBQUE7QUFDNUIsUUFBTyxJQUFJLENBQUM7Q0FDWixDQUFDLENBQUE7O0FBRUgsSUFBSSxjQUFjLEdBQUcsU0FBakIsY0FBYyxDQUFJLElBQUksRUFBSzs7QUFFOUIsS0FBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDOztBQUFDLEFBRXhCLEtBQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUM7OztBQUVyQyxjQUFhLEdBQUcsZ0JBQUUsT0FBTyxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxzQkFBZ0I7OztBQUV6RSxZQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFBO0FBQ2xDLFFBQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQztDQUN0QyxDQUFBOztrQkFFYztBQUNkLFFBQU8sRUFBRSxPQUFPO0FBQ2hCLFNBQVE7Ozs7Ozs7Ozs7SUFBRSxVQUFDLEdBQUcsRUFBSztBQUNmLFNBQU8sUUFBUSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0VBQ2pELENBQUE7QUFDSCxlQUFjLEVBQUUsY0FBYztDQUM5Qjs7Ozs7Ozs7O2tCQ3pDYyxVQUFTLElBQUksRUFBQztBQUMxQixPQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7T0FDdkIsS0FBSyxHQUFHLENBQUMsQ0FBQyxDQUFDLFdBQVcsRUFBRSxHQUFHLENBQUMsQ0FBQSxDQUFFLFFBQVEsRUFBRTtPQUN4QyxHQUFHLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ25DLE9BQUcsS0FBSyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUM7QUFDcEIsV0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7SUFDckI7QUFDRCxPQUFHLEdBQUcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFDO0FBQ2xCLFNBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxDQUFDO0lBQ2pCO0FBQ0QsVUFBTyxDQUFDLENBQUMsY0FBYyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsS0FBSyxHQUFHLEdBQUcsQ0FBQztDQUNyRCIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyAgUmFtZGEgdjAuMTguMFxuLy8gIGh0dHBzOi8vZ2l0aHViLmNvbS9yYW1kYS9yYW1kYVxuLy8gIChjKSAyMDEzLTIwMTUgU2NvdHQgU2F1eWV0LCBNaWNoYWVsIEh1cmxleSwgYW5kIERhdmlkIENoYW1iZXJzXG4vLyAgUmFtZGEgbWF5IGJlIGZyZWVseSBkaXN0cmlidXRlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2UuXG5cbjsoZnVuY3Rpb24oKSB7XG5cbiAgJ3VzZSBzdHJpY3QnO1xuXG4gIC8qKlxuICAgICAqIEEgc3BlY2lhbCBwbGFjZWhvbGRlciB2YWx1ZSB1c2VkIHRvIHNwZWNpZnkgXCJnYXBzXCIgd2l0aGluIGN1cnJpZWQgZnVuY3Rpb25zLFxuICAgICAqIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAgICAgKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy5cbiAgICAgKlxuICAgICAqIElmIGBnYCBpcyBhIGN1cnJpZWQgdGVybmFyeSBmdW5jdGlvbiBhbmQgYF9gIGlzIGBSLl9fYCwgdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAgICAgKlxuICAgICAqICAgLSBgZygxLCAyLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gICAgICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICAgICAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAgICAgKiAgIC0gYGcoXywgMiwgXykoMSwgMylgXG4gICAgICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICAgICAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gICAgICpcbiAgICAgKiBAY29uc3RhbnRcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC42LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3JlZXQgPSBSLnJlcGxhY2UoJ3tuYW1lfScsIFIuX18sICdIZWxsbywge25hbWV9IScpO1xuICAgICAqICAgICAgZ3JlZXQoJ0FsaWNlJyk7IC8vPT4gJ0hlbGxvLCBBbGljZSEnXG4gICAgICovXG4gICAgdmFyIF9fID0geyAnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJzogdHJ1ZSB9O1xuXG4gICAgLy8ganNoaW50IHVudXNlZDp2YXJzXG4gICAgdmFyIF9hcml0eSA9IGZ1bmN0aW9uIF9hcml0eShuLCBmbikge1xuICAgICAgICAvLyBqc2hpbnQgdW51c2VkOnZhcnNcbiAgICAgICAgc3dpdGNoIChuKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDU6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDg6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNykge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRmlyc3QgYXJndW1lbnQgdG8gX2FyaXR5IG11c3QgYmUgYSBub24tbmVnYXRpdmUgaW50ZWdlciBubyBncmVhdGVyIHRoYW4gdGVuJyk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgdmFyIF9hcnJheUZyb21JdGVyYXRvciA9IGZ1bmN0aW9uIF9hcnJheUZyb21JdGVyYXRvcihpdGVyKSB7XG4gICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgIHZhciBuZXh0O1xuICAgICAgICB3aGlsZSAoIShuZXh0ID0gaXRlci5uZXh0KCkpLmRvbmUpIHtcbiAgICAgICAgICAgIGxpc3QucHVzaChuZXh0LnZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9O1xuXG4gICAgdmFyIF9jbG9uZVJlZ0V4cCA9IGZ1bmN0aW9uIF9jbG9uZVJlZ0V4cChwYXR0ZXJuKSB7XG4gICAgICAgIHJldHVybiBuZXcgUmVnRXhwKHBhdHRlcm4uc291cmNlLCAocGF0dGVybi5nbG9iYWwgPyAnZycgOiAnJykgKyAocGF0dGVybi5pZ25vcmVDYXNlID8gJ2knIDogJycpICsgKHBhdHRlcm4ubXVsdGlsaW5lID8gJ20nIDogJycpICsgKHBhdHRlcm4uc3RpY2t5ID8gJ3knIDogJycpICsgKHBhdHRlcm4udW5pY29kZSA/ICd1JyA6ICcnKSk7XG4gICAgfTtcblxuICAgIHZhciBfY29tcGxlbWVudCA9IGZ1bmN0aW9uIF9jb21wbGVtZW50KGYpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAhZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBQcml2YXRlIGBjb25jYXRgIGZ1bmN0aW9uIHRvIG1lcmdlIHR3byBhcnJheS1saWtlIG9iamVjdHMuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl8QXJndW1lbnRzfSBbc2V0MT1bXV0gQW4gYXJyYXktbGlrZSBvYmplY3QuXG4gICAgICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IFtzZXQyPVtdXSBBbiBhcnJheS1saWtlIG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcsIG1lcmdlZCBhcnJheS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBfY29uY2F0KFs0LCA1LCA2XSwgWzEsIDIsIDNdKTsgLy89PiBbNCwgNSwgNiwgMSwgMiwgM11cbiAgICAgKi9cbiAgICB2YXIgX2NvbmNhdCA9IGZ1bmN0aW9uIF9jb25jYXQoc2V0MSwgc2V0Mikge1xuICAgICAgICBzZXQxID0gc2V0MSB8fCBbXTtcbiAgICAgICAgc2V0MiA9IHNldDIgfHwgW107XG4gICAgICAgIHZhciBpZHg7XG4gICAgICAgIHZhciBsZW4xID0gc2V0MS5sZW5ndGg7XG4gICAgICAgIHZhciBsZW4yID0gc2V0Mi5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbjEpIHtcbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHNldDFbaWR4XTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4yKSB7XG4gICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBzZXQyW2lkeF07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH07XG5cbiAgICB2YXIgX2NvbnRhaW5zV2l0aCA9IGZ1bmN0aW9uIF9jb250YWluc1dpdGgocHJlZCwgeCwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChwcmVkKHgsIGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogT3B0aW1pemVkIGludGVybmFsIG9uZS1hcml0eSBjdXJyeSBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGN1cnJ5LlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgY3VycmllZCBmdW5jdGlvbi5cbiAgICAgKi9cbiAgICB2YXIgX2N1cnJ5MSA9IGZ1bmN0aW9uIF9jdXJyeTEoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIGYxKGEpIHtcbiAgICAgICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYxO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjE7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdHdvLWFyaXR5IGN1cnJ5IGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBjdXJyaWVkIGZ1bmN0aW9uLlxuICAgICAqL1xuICAgIHZhciBfY3VycnkyID0gZnVuY3Rpb24gX2N1cnJ5Mihmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gZjIoYSwgYikge1xuICAgICAgICAgICAgdmFyIG4gPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKG4gPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDEgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYyO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAxKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24gKGIpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjI7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24gKGEpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyICYmIGIgIT0gbnVsbCAmJiBiWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIChiKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBPcHRpbWl6ZWQgaW50ZXJuYWwgdGhyZWUtYXJpdHkgY3VycnkgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gVGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gICAgICovXG4gICAgdmFyIF9jdXJyeTMgPSBmdW5jdGlvbiBfY3VycnkzKGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBmMyhhLCBiLCBjKSB7XG4gICAgICAgICAgICB2YXIgbiA9IGFyZ3VtZW50cy5sZW5ndGg7XG4gICAgICAgICAgICBpZiAobiA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMSAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZjM7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiAoYiwgYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlICYmIGIgIT0gbnVsbCAmJiBiWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmMztcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMiAmJiBhICE9IG51bGwgJiYgYVsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiAoYSwgYykge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDIgJiYgYiAhPSBudWxsICYmIGJbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAzICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUgJiYgYyAhPSBudWxsICYmIGNbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGYzO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAzICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDMgJiYgYSAhPSBudWxsICYmIGFbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlICYmIGMgIT0gbnVsbCAmJiBjWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIChhLCBjKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiLCBjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMyAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUgJiYgYyAhPSBudWxsICYmIGNbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gKGIsIGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChuID09PSAzICYmIGEgIT0gbnVsbCAmJiBhWydAQGZ1bmN0aW9uYWwvcGxhY2Vob2xkZXInXSA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY3VycnkxKGZ1bmN0aW9uIChhKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBmbihhLCBiLCBjKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAobiA9PT0gMyAmJiBiICE9IG51bGwgJiYgYlsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbiAoYikge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG4gPT09IDMgJiYgYyAhPSBudWxsICYmIGNbJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9jdXJyeTEoZnVuY3Rpb24gKGMpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZuKGEsIGIsIGMpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oYSwgYiwgYyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIEludGVybmFsIGN1cnJ5TiBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgb2YgdGhlIGN1cnJpZWQgZnVuY3Rpb24uXG4gICAgICogQHJldHVybiB7YXJyYXl9IEFuIGFycmF5IG9mIGFyZ3VtZW50cyByZWNlaXZlZCB0aHVzIGZhci5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gICAgICovXG4gICAgdmFyIF9jdXJyeU4gPSBmdW5jdGlvbiBfY3VycnlOKGxlbmd0aCwgcmVjZWl2ZWQsIGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY29tYmluZWQgPSBbXTtcbiAgICAgICAgICAgIHZhciBhcmdzSWR4ID0gMDtcbiAgICAgICAgICAgIHZhciBsZWZ0ID0gbGVuZ3RoO1xuICAgICAgICAgICAgdmFyIGNvbWJpbmVkSWR4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChjb21iaW5lZElkeCA8IHJlY2VpdmVkLmxlbmd0aCB8fCBhcmdzSWR4IDwgYXJndW1lbnRzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHZhciByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKGNvbWJpbmVkSWR4IDwgcmVjZWl2ZWQubGVuZ3RoICYmIChyZWNlaXZlZFtjb21iaW5lZElkeF0gPT0gbnVsbCB8fCByZWNlaXZlZFtjb21iaW5lZElkeF1bJ0BAZnVuY3Rpb25hbC9wbGFjZWhvbGRlciddICE9PSB0cnVlIHx8IGFyZ3NJZHggPj0gYXJndW1lbnRzLmxlbmd0aCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gcmVjZWl2ZWRbY29tYmluZWRJZHhdO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3VsdCA9IGFyZ3VtZW50c1thcmdzSWR4XTtcbiAgICAgICAgICAgICAgICAgICAgYXJnc0lkeCArPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb21iaW5lZFtjb21iaW5lZElkeF0gPSByZXN1bHQ7XG4gICAgICAgICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsIHx8IHJlc3VsdFsnQEBmdW5jdGlvbmFsL3BsYWNlaG9sZGVyJ10gIT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgbGVmdCAtPSAxO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb21iaW5lZElkeCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGxlZnQgPD0gMCA/IGZuLmFwcGx5KHRoaXMsIGNvbWJpbmVkKSA6IF9hcml0eShsZWZ0LCBfY3VycnlOKGxlbmd0aCwgY29tYmluZWQsIGZuKSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIHZhciBfZmlsdGVyID0gZnVuY3Rpb24gX2ZpbHRlcihmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGgsIHJlc3VsdCA9IFtdO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfTtcblxuICAgIHZhciBfZm9yY2VSZWR1Y2VkID0gZnVuY3Rpb24gX2ZvcmNlUmVkdWNlZCh4KSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL3ZhbHVlJzogeCxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVkdWNlZCc6IHRydWVcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgc3RyYXRlZ3kgZm9yIGV4dHJhY3RpbmcgZnVuY3Rpb24gbmFtZXMgZnJvbSBhbiBvYmplY3RcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHRha2VzIGFuIG9iamVjdCBhbmQgcmV0dXJucyBhbiBhcnJheSBvZiBmdW5jdGlvbiBuYW1lcy5cbiAgICAgKi9cbiAgICB2YXIgX2Z1bmN0aW9uc1dpdGggPSBmdW5jdGlvbiBfZnVuY3Rpb25zV2l0aChmbikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKG9iaikge1xuICAgICAgICAgICAgcmV0dXJuIF9maWx0ZXIoZnVuY3Rpb24gKGtleSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0eXBlb2Ygb2JqW2tleV0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgICAgICB9LCBmbihvYmopKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIF9oYXMgPSBmdW5jdGlvbiBfaGFzKHByb3AsIG9iaikge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCk7XG4gICAgfTtcblxuICAgIHZhciBfaWRlbnRpdHkgPSBmdW5jdGlvbiBfaWRlbnRpdHkoeCkge1xuICAgICAgICByZXR1cm4geDtcbiAgICB9O1xuXG4gICAgdmFyIF9pc0FyZ3VtZW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcbiAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJndW1lbnRzKSA9PT0gJ1tvYmplY3QgQXJndW1lbnRzXScgPyBmdW5jdGlvbiBfaXNBcmd1bWVudHMoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IEFyZ3VtZW50c10nO1xuICAgICAgICB9IDogZnVuY3Rpb24gX2lzQXJndW1lbnRzKHgpIHtcbiAgICAgICAgICAgIHJldHVybiBfaGFzKCdjYWxsZWUnLCB4KTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgYW4gYXJyYXkuXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsIFRoZSBvYmplY3QgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHZhbGAgaXMgYW4gYXJyYXksIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIF9pc0FycmF5KFtdKTsgLy89PiB0cnVlXG4gICAgICogICAgICBfaXNBcnJheShudWxsKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgX2lzQXJyYXkoe30pOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIF9pc0FycmF5ID0gQXJyYXkuaXNBcnJheSB8fCBmdW5jdGlvbiBfaXNBcnJheSh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCAhPSBudWxsICYmIHZhbC5sZW5ndGggPj0gMCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQXJyYXldJztcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSBwYXNzZWQgYXJndW1lbnQgaXMgYW4gaW50ZWdlci5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHsqfSBuXG4gICAgICogQGNhdGVnb3J5IFR5cGVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqL1xuICAgIHZhciBfaXNJbnRlZ2VyID0gTnVtYmVyLmlzSW50ZWdlciB8fCBmdW5jdGlvbiBfaXNJbnRlZ2VyKG4pIHtcbiAgICAgICAgcmV0dXJuIG4gPDwgMCA9PT0gbjtcbiAgICB9O1xuXG4gICAgdmFyIF9pc051bWJlciA9IGZ1bmN0aW9uIF9pc051bWJlcih4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IE51bWJlcl0nO1xuICAgIH07XG5cbiAgICB2YXIgX2lzT2JqZWN0ID0gZnVuY3Rpb24gX2lzT2JqZWN0KHgpIHtcbiAgICAgICAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSA9PT0gJ1tvYmplY3QgT2JqZWN0XSc7XG4gICAgfTtcblxuICAgIHZhciBfaXNSZWdFeHAgPSBmdW5jdGlvbiBfaXNSZWdFeHAoeCkge1xuICAgICAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHgpID09PSAnW29iamVjdCBSZWdFeHBdJztcbiAgICB9O1xuXG4gICAgdmFyIF9pc1N0cmluZyA9IGZ1bmN0aW9uIF9pc1N0cmluZyh4KSB7XG4gICAgICAgIHJldHVybiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwoeCkgPT09ICdbb2JqZWN0IFN0cmluZ10nO1xuICAgIH07XG5cbiAgICB2YXIgX2lzVHJhbnNmb3JtZXIgPSBmdW5jdGlvbiBfaXNUcmFuc2Zvcm1lcihvYmopIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBvYmpbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPT09ICdmdW5jdGlvbic7XG4gICAgfTtcblxuICAgIHZhciBfbWFwID0gZnVuY3Rpb24gX21hcChmbiwgZnVuY3Rvcikge1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgdmFyIGxlbiA9IGZ1bmN0b3IubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzdWx0ID0gQXJyYXkobGVuKTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgcmVzdWx0W2lkeF0gPSBmbihmdW5jdG9yW2lkeF0pO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9O1xuXG4gICAgdmFyIF9vZiA9IGZ1bmN0aW9uIF9vZih4KSB7XG4gICAgICAgIHJldHVybiBbeF07XG4gICAgfTtcblxuICAgIHZhciBfcGlwZSA9IGZ1bmN0aW9uIF9waXBlKGYsIGcpIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBnLmNhbGwodGhpcywgZi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIF9waXBlUCA9IGZ1bmN0aW9uIF9waXBlUChmLCBnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3R4ID0gdGhpcztcbiAgICAgICAgICAgIHJldHVybiBmLmFwcGx5KGN0eCwgYXJndW1lbnRzKS50aGVuKGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGcuY2FsbChjdHgsIHgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgfTtcblxuICAgIC8vIFxcYiBtYXRjaGVzIHdvcmQgYm91bmRhcnk7IFtcXGJdIG1hdGNoZXMgYmFja3NwYWNlXG4gICAgdmFyIF9xdW90ZSA9IGZ1bmN0aW9uIF9xdW90ZShzKSB7XG4gICAgICAgIHZhciBlc2NhcGVkID0gcy5yZXBsYWNlKC9cXFxcL2csICdcXFxcXFxcXCcpLnJlcGxhY2UoL1tcXGJdL2csICdcXFxcYicpICAgIC8vIFxcYiBtYXRjaGVzIHdvcmQgYm91bmRhcnk7IFtcXGJdIG1hdGNoZXMgYmFja3NwYWNlXG4gICAgLnJlcGxhY2UoL1xcZi9nLCAnXFxcXGYnKS5yZXBsYWNlKC9cXG4vZywgJ1xcXFxuJykucmVwbGFjZSgvXFxyL2csICdcXFxccicpLnJlcGxhY2UoL1xcdC9nLCAnXFxcXHQnKS5yZXBsYWNlKC9cXHYvZywgJ1xcXFx2JykucmVwbGFjZSgvXFwwL2csICdcXFxcMCcpO1xuICAgICAgICByZXR1cm4gJ1wiJyArIGVzY2FwZWQucmVwbGFjZSgvXCIvZywgJ1xcXFxcIicpICsgJ1wiJztcbiAgICB9O1xuXG4gICAgdmFyIF9yZWR1Y2VkID0gZnVuY3Rpb24gX3JlZHVjZWQoeCkge1xuICAgICAgICByZXR1cm4geCAmJiB4WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID8geCA6IHtcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvdmFsdWUnOiB4LFxuICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJzogdHJ1ZVxuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBBbiBvcHRpbWl6ZWQsIHByaXZhdGUgYXJyYXkgYHNsaWNlYCBpbXBsZW1lbnRhdGlvbi5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtBcmd1bWVudHN8QXJyYXl9IGFyZ3MgVGhlIGFycmF5IG9yIGFyZ3VtZW50cyBvYmplY3QgdG8gY29uc2lkZXIuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFtmcm9tPTBdIFRoZSBhcnJheSBpbmRleCB0byBzbGljZSBmcm9tLCBpbmNsdXNpdmUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IFt0bz1hcmdzLmxlbmd0aF0gVGhlIGFycmF5IGluZGV4IHRvIHNsaWNlIHRvLCBleGNsdXNpdmUuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3LCBzbGljZWQgYXJyYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgX3NsaWNlKFsxLCAyLCAzLCA0LCA1XSwgMSwgMyk7IC8vPT4gWzIsIDNdXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBmaXJzdFRocmVlQXJncyA9IGZ1bmN0aW9uKGEsIGIsIGMsIGQpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIF9zbGljZShhcmd1bWVudHMsIDAsIDMpO1xuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIGZpcnN0VGhyZWVBcmdzKDEsIDIsIDMsIDQpOyAvLz0+IFsxLCAyLCAzXVxuICAgICAqL1xuICAgIHZhciBfc2xpY2UgPSBmdW5jdGlvbiBfc2xpY2UoYXJncywgZnJvbSwgdG8pIHtcbiAgICAgICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgIHJldHVybiBfc2xpY2UoYXJncywgMCwgYXJncy5sZW5ndGgpO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICByZXR1cm4gX3NsaWNlKGFyZ3MsIGZyb20sIGFyZ3MubGVuZ3RoKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHZhciBsaXN0ID0gW107XG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgICAgIHZhciBsZW4gPSBNYXRoLm1heCgwLCBNYXRoLm1pbihhcmdzLmxlbmd0aCwgdG8pIC0gZnJvbSk7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgbGlzdFtpZHhdID0gYXJnc1tmcm9tICsgaWR4XTtcbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBsaXN0O1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBvbHlmaWxsIGZyb20gPGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0RhdGUvdG9JU09TdHJpbmc+LlxuICAgICAqL1xuICAgIHZhciBfdG9JU09TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYWQgPSBmdW5jdGlvbiBwYWQobikge1xuICAgICAgICAgICAgcmV0dXJuIChuIDwgMTAgPyAnMCcgOiAnJykgKyBuO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gdHlwZW9mIERhdGUucHJvdG90eXBlLnRvSVNPU3RyaW5nID09PSAnZnVuY3Rpb24nID8gZnVuY3Rpb24gX3RvSVNPU3RyaW5nKGQpIHtcbiAgICAgICAgICAgIHJldHVybiBkLnRvSVNPU3RyaW5nKCk7XG4gICAgICAgIH0gOiBmdW5jdGlvbiBfdG9JU09TdHJpbmcoZCkge1xuICAgICAgICAgICAgcmV0dXJuIGQuZ2V0VVRDRnVsbFllYXIoKSArICctJyArIHBhZChkLmdldFVUQ01vbnRoKCkgKyAxKSArICctJyArIHBhZChkLmdldFVUQ0RhdGUoKSkgKyAnVCcgKyBwYWQoZC5nZXRVVENIb3VycygpKSArICc6JyArIHBhZChkLmdldFVUQ01pbnV0ZXMoKSkgKyAnOicgKyBwYWQoZC5nZXRVVENTZWNvbmRzKCkpICsgJy4nICsgKGQuZ2V0VVRDTWlsbGlzZWNvbmRzKCkgLyAxMDAwKS50b0ZpeGVkKDMpLnNsaWNlKDIsIDUpICsgJ1onO1xuICAgICAgICB9O1xuICAgIH0oKTtcblxuICAgIHZhciBfeGRyb3BSZXBlYXRzV2l0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWERyb3BSZXBlYXRzV2l0aChwcmVkLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5wcmVkID0gcHJlZDtcbiAgICAgICAgICAgIHRoaXMubGFzdFZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgdGhpcy5zZWVuRmlyc3RWYWx1ZSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFhEcm9wUmVwZWF0c1dpdGgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9pbml0J10oKTtcbiAgICAgICAgfTtcbiAgICAgICAgWERyb3BSZXBlYXRzV2l0aC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgWERyb3BSZXBlYXRzV2l0aC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgdmFyIHNhbWVBc0xhc3QgPSBmYWxzZTtcbiAgICAgICAgICAgIGlmICghdGhpcy5zZWVuRmlyc3RWYWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuc2VlbkZpcnN0VmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZWQodGhpcy5sYXN0VmFsdWUsIGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHNhbWVBc0xhc3QgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5sYXN0VmFsdWUgPSBpbnB1dDtcbiAgICAgICAgICAgIHJldHVybiBzYW1lQXNMYXN0ID8gcmVzdWx0IDogdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hkcm9wUmVwZWF0c1dpdGgocHJlZCwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERyb3BSZXBlYXRzV2l0aChwcmVkLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGZCYXNlID0ge1xuICAgICAgICBpbml0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL2luaXQnXSgpO1xuICAgICAgICB9LFxuICAgICAgICByZXN1bHQ6IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgfVxuICAgIH07XG5cbiAgICB2YXIgX3hmaWx0ZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhGaWx0ZXIoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgIH1cbiAgICAgICAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhGaWx0ZXIucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWEZpbHRlci5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZihpbnB1dCkgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpIDogcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbHRlcihmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYRmlsdGVyKGYsIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94ZmluZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWEZpbmQoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgICAgICB0aGlzLmZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgWEZpbmQucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYRmluZC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5mb3VuZCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB2b2lkIDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBYRmluZC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZmluZChmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYRmluZChmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGZpbmRJbmRleCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWEZpbmRJbmRleChmLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgICAgIHRoaXMuaWR4ID0gLTE7XG4gICAgICAgICAgICB0aGlzLmZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgWEZpbmRJbmRleC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhGaW5kSW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZm91bmQpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgLTEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHRoaXMueGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgICAgICB9O1xuICAgICAgICBYRmluZEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmlkeCArPSAxO1xuICAgICAgICAgICAgaWYgKHRoaXMuZihpbnB1dCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5pZHgpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94ZmluZEluZGV4KGYsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhGaW5kSW5kZXgoZiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hmaW5kTGFzdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWEZpbmRMYXN0KGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB9XG4gICAgICAgIFhGaW5kTGFzdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhGaW5kTGFzdC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10odGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMubGFzdCkpO1xuICAgICAgICB9O1xuICAgICAgICBYRmluZExhc3QucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5sYXN0ID0gaW5wdXQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGZpbmRMYXN0KGYsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhGaW5kTGFzdChmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGZpbmRMYXN0SW5kZXggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhGaW5kTGFzdEluZGV4KGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICAgICAgdGhpcy5pZHggPSAtMTtcbiAgICAgICAgICAgIHRoaXMubGFzdElkeCA9IC0xO1xuICAgICAgICB9XG4gICAgICAgIFhGaW5kTGFzdEluZGV4LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWEZpbmRMYXN0SW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0aGlzLmxhc3RJZHgpKTtcbiAgICAgICAgfTtcbiAgICAgICAgWEZpbmRMYXN0SW5kZXgucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIHRoaXMuaWR4ICs9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5mKGlucHV0KSkge1xuICAgICAgICAgICAgICAgIHRoaXMubGFzdElkeCA9IHRoaXMuaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hmaW5kTGFzdEluZGV4KGYsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhGaW5kTGFzdEluZGV4KGYsIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94bWFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYTWFwKGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICB9XG4gICAgICAgIFhNYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYTWFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gICAgICAgIFhNYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5mKGlucHV0KSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94bWFwKGYsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhNYXAoZiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3h0YWtlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBYVGFrZShuLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5uID0gbjtcbiAgICAgICAgfVxuICAgICAgICBYVGFrZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhUYWtlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gX3hmQmFzZS5yZXN1bHQ7XG4gICAgICAgIFhUYWtlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5uID09PSAwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9yZWR1Y2VkKHJlc3VsdCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMubiAtPSAxO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeHRha2UobiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWFRha2UobiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3h0YWtlV2hpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhUYWtlV2hpbGUoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgIH1cbiAgICAgICAgWFRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhUYWtlV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWFRha2VXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZihpbnB1dCkgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpIDogX3JlZHVjZWQocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3h0YWtlV2hpbGUoZiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWFRha2VXaGlsZShmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeHdyYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhXcmFwKGZuKSB7XG4gICAgICAgICAgICB0aGlzLmYgPSBmbjtcbiAgICAgICAgfVxuICAgICAgICBYV3JhcC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2luaXQgbm90IGltcGxlbWVudGVkIG9uIFhXcmFwJyk7XG4gICAgICAgIH07XG4gICAgICAgIFhXcmFwLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKGFjYykge1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfTtcbiAgICAgICAgWFdyYXAucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKGFjYywgeCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZihhY2MsIHgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX3h3cmFwKGZuKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhXcmFwKGZuKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIHR3byBudW1iZXJzLiBFcXVpdmFsZW50IHRvIGBhICsgYmAgYnV0IGN1cnJpZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGJcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQHNlZSBSLnN1YnRyYWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hZGQoMiwgMyk7ICAgICAgIC8vPT4gIDVcbiAgICAgKiAgICAgIFIuYWRkKDcpKDEwKTsgICAgICAvLz0+IDE3XG4gICAgICovXG4gICAgdmFyIGFkZCA9IF9jdXJyeTIoZnVuY3Rpb24gYWRkKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBhIGZ1bmN0aW9uIHRvIHRoZSB2YWx1ZSBhdCB0aGUgZ2l2ZW4gaW5kZXggb2YgYW4gYXJyYXksXG4gICAgICogcmV0dXJuaW5nIGEgbmV3IGNvcHkgb2YgdGhlIGFycmF5IHdpdGggdGhlIGVsZW1lbnQgYXQgdGhlIGdpdmVuXG4gICAgICogaW5kZXggcmVwbGFjZWQgd2l0aCB0aGUgcmVzdWx0IG9mIHRoZSBmdW5jdGlvbiBhcHBsaWNhdGlvbi5cbiAgICAgKiBAc2VlIFIudXBkYXRlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE0LjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gYSkgLT4gTnVtYmVyIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYXBwbHkuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgaW5kZXguXG4gICAgICogQHBhcmFtIHtBcnJheXxBcmd1bWVudHN9IGxpc3QgQW4gYXJyYXktbGlrZSBvYmplY3Qgd2hvc2UgdmFsdWVcbiAgICAgKiAgICAgICAgYXQgdGhlIHN1cHBsaWVkIGluZGV4IHdpbGwgYmUgcmVwbGFjZWQuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgY29weSBvZiB0aGUgc3VwcGxpZWQgYXJyYXktbGlrZSBvYmplY3Qgd2l0aFxuICAgICAqICAgICAgICAgdGhlIGVsZW1lbnQgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCB0aGUgdmFsdWVcbiAgICAgKiAgICAgICAgIHJldHVybmVkIGJ5IGFwcGx5aW5nIGBmbmAgdG8gdGhlIGV4aXN0aW5nIGVsZW1lbnQuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hZGp1c3QoUi5hZGQoMTApLCAxLCBbMCwgMSwgMl0pOyAgICAgLy89PiBbMCwgMTEsIDJdXG4gICAgICogICAgICBSLmFkanVzdChSLmFkZCgxMCkpKDEpKFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAgICAgKi9cbiAgICB2YXIgYWRqdXN0ID0gX2N1cnJ5MyhmdW5jdGlvbiBhZGp1c3QoZm4sIGlkeCwgbGlzdCkge1xuICAgICAgICBpZiAoaWR4ID49IGxpc3QubGVuZ3RoIHx8IGlkeCA8IC1saXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHN0YXJ0ID0gaWR4IDwgMCA/IGxpc3QubGVuZ3RoIDogMDtcbiAgICAgICAgdmFyIF9pZHggPSBzdGFydCArIGlkeDtcbiAgICAgICAgdmFyIF9saXN0ID0gX2NvbmNhdChsaXN0KTtcbiAgICAgICAgX2xpc3RbX2lkeF0gPSBmbihsaXN0W19pZHhdKTtcbiAgICAgICAgcmV0dXJuIF9saXN0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHJldHVybnMgdGhlIGdpdmVuIHZhbHVlLiBOb3RlIHRoYXQgZm9yXG4gICAgICogbm9uLXByaW1pdGl2ZXMgdGhlIHZhbHVlIHJldHVybmVkIGlzIGEgcmVmZXJlbmNlIHRvIHRoZSBvcmlnaW5hbCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIFRoaXMgZnVuY3Rpb24gaXMga25vd24gYXMgYGNvbnN0YCwgYGNvbnN0YW50YCwgb3IgYEtgIChmb3IgSyBjb21iaW5hdG9yKVxuICAgICAqIGluIG90aGVyIGxhbmd1YWdlcyBhbmQgbGlicmFyaWVzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIGEgLT4gKCogLT4gYSlcbiAgICAgKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gd3JhcCBpbiBhIGZ1bmN0aW9uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgRnVuY3Rpb24gOjogKiAtPiB2YWwuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHQgPSBSLmFsd2F5cygnVGVlJyk7XG4gICAgICogICAgICB0KCk7IC8vPT4gJ1RlZSdcbiAgICAgKi9cbiAgICB2YXIgYWx3YXlzID0gX2N1cnJ5MShmdW5jdGlvbiBhbHdheXModmFsKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYm90aCBhcmd1bWVudHMgYXJlIGB0cnVlYDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKiAtPiAqIC0+ICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGEgQSBib29sZWFuIHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBiIEEgYm9vbGVhbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBib3RoIGFyZ3VtZW50cyBhcmUgYHRydWVgLCBgZmFsc2VgIG90aGVyd2lzZVxuICAgICAqIEBzZWUgUi5ib3RoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hbmQodHJ1ZSwgdHJ1ZSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5hbmQodHJ1ZSwgZmFsc2UpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmFuZChmYWxzZSwgdHJ1ZSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuYW5kKGZhbHNlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgYW5kID0gX2N1cnJ5MihmdW5jdGlvbiBhbmQoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAmJiBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGNvbnRlbnRzIG9mIHRoZSBnaXZlbiBsaXN0LCBmb2xsb3dlZCBieSB0aGUgZ2l2ZW5cbiAgICAgKiBlbGVtZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgYSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHsqfSBlbCBUaGUgZWxlbWVudCB0byBhZGQgdG8gdGhlIGVuZCBvZiB0aGUgbmV3IGxpc3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB3aG9zZSBjb250ZW50cyB3aWxsIGJlIGFkZGVkIHRvIHRoZSBiZWdpbm5pbmcgb2YgdGhlIG91dHB1dFxuICAgICAqICAgICAgICBsaXN0LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGNvbnRlbnRzIG9mIHRoZSBvbGQgbGlzdCBmb2xsb3dlZCBieSBgZWxgLlxuICAgICAqIEBzZWUgUi5wcmVwZW5kXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hcHBlbmQoJ3Rlc3RzJywgWyd3cml0ZScsICdtb3JlJ10pOyAvLz0+IFsnd3JpdGUnLCAnbW9yZScsICd0ZXN0cyddXG4gICAgICogICAgICBSLmFwcGVuZCgndGVzdHMnLCBbXSk7IC8vPT4gWyd0ZXN0cyddXG4gICAgICogICAgICBSLmFwcGVuZChbJ3Rlc3RzJ10sIFsnd3JpdGUnLCAnbW9yZSddKTsgLy89PiBbJ3dyaXRlJywgJ21vcmUnLCBbJ3Rlc3RzJ11dXG4gICAgICovXG4gICAgdmFyIGFwcGVuZCA9IF9jdXJyeTIoZnVuY3Rpb24gYXBwZW5kKGVsLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfY29uY2F0KGxpc3QsIFtlbF0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQXBwbGllcyBmdW5jdGlvbiBgZm5gIHRvIHRoZSBhcmd1bWVudCBsaXN0IGBhcmdzYC4gVGhpcyBpcyB1c2VmdWwgZm9yXG4gICAgICogY3JlYXRpbmcgYSBmaXhlZC1hcml0eSBmdW5jdGlvbiBmcm9tIGEgdmFyaWFkaWMgZnVuY3Rpb24uIGBmbmAgc2hvdWxkXG4gICAgICogYmUgYSBib3VuZCBmdW5jdGlvbiBpZiBjb250ZXh0IGlzIHNpZ25pZmljYW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC43LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgqLi4uIC0+IGEpIC0+IFsqXSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIuY2FsbCwgUi51bmFwcGx5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG51bXMgPSBbMSwgMiwgMywgLTk5LCA0MiwgNiwgN107XG4gICAgICogICAgICBSLmFwcGx5KE1hdGgubWF4LCBudW1zKTsgLy89PiA0MlxuICAgICAqL1xuICAgIHZhciBhcHBseSA9IF9jdXJyeTIoZnVuY3Rpb24gYXBwbHkoZm4sIGFyZ3MpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgc2V0dGluZyBvciBvdmVycmlkaW5nIHRoZSBzcGVjaWZpZWRcbiAgICAgKiBwcm9wZXJ0eSB3aXRoIHRoZSBnaXZlbiB2YWx1ZS4gIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnNcbiAgICAgKiBwcm90b3R5cGUgcHJvcGVydGllcyBvbnRvIHRoZSBuZXcgb2JqZWN0IGFzIHdlbGwuICBBbGwgbm9uLXByaW1pdGl2ZVxuICAgICAqIHByb3BlcnRpZXMgYXJlIGNvcGllZCBieSByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjguMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBhIC0+IHtrOiB2fSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCB0aGUgcHJvcGVydHkgbmFtZSB0byBzZXRcbiAgICAgKiBAcGFyYW0geyp9IHZhbCB0aGUgbmV3IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiB0aGUgb2JqZWN0IHRvIGNsb25lXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIG5ldyBvYmplY3Qgc2ltaWxhciB0byB0aGUgb3JpZ2luYWwgZXhjZXB0IGZvciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LlxuICAgICAqIEBzZWUgUi5kaXNzb2NcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmFzc29jKCdjJywgMywge2E6IDEsIGI6IDJ9KTsgLy89PiB7YTogMSwgYjogMiwgYzogM31cbiAgICAgKi9cbiAgICB2YXIgYXNzb2MgPSBfY3VycnkzKGZ1bmN0aW9uIGFzc29jKHByb3AsIHZhbCwgb2JqKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcCBpbiBvYmopIHtcbiAgICAgICAgICAgIHJlc3VsdFtwXSA9IG9ialtwXTtcbiAgICAgICAgfVxuICAgICAgICByZXN1bHRbcHJvcF0gPSB2YWw7XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBNYWtlcyBhIHNoYWxsb3cgY2xvbmUgb2YgYW4gb2JqZWN0LCBzZXR0aW5nIG9yIG92ZXJyaWRpbmcgdGhlIG5vZGVzXG4gICAgICogcmVxdWlyZWQgdG8gY3JlYXRlIHRoZSBnaXZlbiBwYXRoLCBhbmQgcGxhY2luZyB0aGUgc3BlY2lmaWMgdmFsdWUgYXQgdGhlXG4gICAgICogdGFpbCBlbmQgb2YgdGhhdCBwYXRoLiAgTm90ZSB0aGF0IHRoaXMgY29waWVzIGFuZCBmbGF0dGVucyBwcm90b3R5cGVcbiAgICAgKiBwcm9wZXJ0aWVzIG9udG8gdGhlIG5ldyBvYmplY3QgYXMgd2VsbC4gIEFsbCBub24tcHJpbWl0aXZlIHByb3BlcnRpZXNcbiAgICAgKiBhcmUgY29waWVkIGJ5IHJlZmVyZW5jZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgW1N0cmluZ10gLT4gYSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0aCB0aGUgcGF0aCB0byBzZXRcbiAgICAgKiBAcGFyYW0geyp9IHZhbCB0aGUgbmV3IHZhbHVlXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiB0aGUgb2JqZWN0IHRvIGNsb25lXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBhIG5ldyBvYmplY3Qgc2ltaWxhciB0byB0aGUgb3JpZ2luYWwgZXhjZXB0IGFsb25nIHRoZSBzcGVjaWZpZWQgcGF0aC5cbiAgICAgKiBAc2VlIFIuZGlzc29jUGF0aFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYXNzb2NQYXRoKFsnYScsICdiJywgJ2MnXSwgNDIsIHthOiB7Yjoge2M6IDB9fX0pOyAvLz0+IHthOiB7Yjoge2M6IDQyfX19XG4gICAgICovXG4gICAgdmFyIGFzc29jUGF0aCA9IF9jdXJyeTMoZnVuY3Rpb24gYXNzb2NQYXRoKHBhdGgsIHZhbCwgb2JqKSB7XG4gICAgICAgIHN3aXRjaCAocGF0aC5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgcmV0dXJuIG9iajtcbiAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgcmV0dXJuIGFzc29jKHBhdGhbMF0sIHZhbCwgb2JqKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBhc3NvYyhwYXRoWzBdLCBhc3NvY1BhdGgoX3NsaWNlKHBhdGgsIDEpLCB2YWwsIE9iamVjdChvYmpbcGF0aFswXV0pKSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgaXMgYm91bmQgdG8gYSBjb250ZXh0LlxuICAgICAqIE5vdGU6IGBSLmJpbmRgIGRvZXMgbm90IHByb3ZpZGUgdGhlIGFkZGl0aW9uYWwgYXJndW1lbnQtYmluZGluZyBjYXBhYmlsaXRpZXMgb2ZcbiAgICAgKiBbRnVuY3Rpb24ucHJvdG90eXBlLmJpbmRdKGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0Z1bmN0aW9uL2JpbmQpLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC42LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNlZSBSLnBhcnRpYWxcbiAgICAgKiBAc2lnICgqIC0+ICopIC0+IHsqfSAtPiAoKiAtPiAqKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiaW5kIHRvIGNvbnRleHRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gdGhpc09iaiBUaGUgY29udGV4dCB0byBiaW5kIGBmbmAgdG9cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IHdpbGwgZXhlY3V0ZSBpbiB0aGUgY29udGV4dCBvZiBgdGhpc09iamAuXG4gICAgICovXG4gICAgdmFyIGJpbmQgPSBfY3VycnkyKGZ1bmN0aW9uIGJpbmQoZm4sIHRoaXNPYmopIHtcbiAgICAgICAgcmV0dXJuIF9hcml0eShmbi5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbi5hcHBseSh0aGlzT2JqLCBhcmd1bWVudHMpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIE1ha2VzIGEgY29tcGFyYXRvciBmdW5jdGlvbiBvdXQgb2YgYSBmdW5jdGlvbiB0aGF0IHJlcG9ydHMgd2hldGhlciB0aGUgZmlyc3QgZWxlbWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoYSwgYiAtPiBCb29sZWFuKSAtPiAoYSwgYiAtPiBOdW1iZXIpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSBmdW5jdGlvbiBvZiBhcml0eSB0d28uXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgRnVuY3Rpb24gOjogYSAtPiBiIC0+IEludCB0aGF0IHJldHVybnMgYC0xYCBpZiBhIDwgYiwgYDFgIGlmIGIgPCBhLCBvdGhlcndpc2UgYDBgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBjbXAgPSBSLmNvbXBhcmF0b3IoKGEsIGIpID0+IGEuYWdlIDwgYi5hZ2UpO1xuICAgICAqICAgICAgdmFyIHBlb3BsZSA9IFtcbiAgICAgKiAgICAgICAgLy8gLi4uXG4gICAgICogICAgICBdO1xuICAgICAqICAgICAgUi5zb3J0KGNtcCwgcGVvcGxlKTtcbiAgICAgKi9cbiAgICB2YXIgY29tcGFyYXRvciA9IF9jdXJyeTEoZnVuY3Rpb24gY29tcGFyYXRvcihwcmVkKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoYSwgYikge1xuICAgICAgICAgICAgcmV0dXJuIHByZWQoYSwgYikgPyAtMSA6IHByZWQoYiwgYSkgPyAxIDogMDtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiwgYGZuYCwgd2hpY2ggZW5jYXBzdWxhdGVzIGlmL2Vsc2UtaWYvZWxzZSBsb2dpYy5cbiAgICAgKiBgUi5jb25kYCB0YWtlcyBhIGxpc3Qgb2YgW3ByZWRpY2F0ZSwgdHJhbnNmb3JtXSBwYWlycy4gQWxsIG9mIHRoZVxuICAgICAqIGFyZ3VtZW50cyB0byBgZm5gIGFyZSBhcHBsaWVkIHRvIGVhY2ggb2YgdGhlIHByZWRpY2F0ZXMgaW4gdHVyblxuICAgICAqIHVudGlsIG9uZSByZXR1cm5zIGEgXCJ0cnV0aHlcIiB2YWx1ZSwgYXQgd2hpY2ggcG9pbnQgYGZuYCByZXR1cm5zIHRoZVxuICAgICAqIHJlc3VsdCBvZiBhcHBseWluZyBpdHMgYXJndW1lbnRzIHRvIHRoZSBjb3JyZXNwb25kaW5nIHRyYW5zZm9ybWVyLlxuICAgICAqIElmIG5vbmUgb2YgdGhlIHByZWRpY2F0ZXMgbWF0Y2hlcywgYGZuYCByZXR1cm5zIHVuZGVmaW5lZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuNi4wXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyBbWygqLi4uIC0+IEJvb2xlYW4pLCgqLi4uIC0+ICopXV0gLT4gKCouLi4gLT4gKilcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwYWlyc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBmbiA9IFIuY29uZChbXG4gICAgICogICAgICAgIFtSLmVxdWFscygwKSwgICBSLmFsd2F5cygnd2F0ZXIgZnJlZXplcyBhdCAwwrBDJyldLFxuICAgICAqICAgICAgICBbUi5lcXVhbHMoMTAwKSwgUi5hbHdheXMoJ3dhdGVyIGJvaWxzIGF0IDEwMMKwQycpXSxcbiAgICAgKiAgICAgICAgW1IuVCwgICAgICAgICAgIHRlbXAgPT4gJ25vdGhpbmcgc3BlY2lhbCBoYXBwZW5zIGF0ICcgKyB0ZW1wICsgJ8KwQyddXG4gICAgICogICAgICBdKTtcbiAgICAgKiAgICAgIGZuKDApOyAvLz0+ICd3YXRlciBmcmVlemVzIGF0IDDCsEMnXG4gICAgICogICAgICBmbig1MCk7IC8vPT4gJ25vdGhpbmcgc3BlY2lhbCBoYXBwZW5zIGF0IDUwwrBDJ1xuICAgICAqICAgICAgZm4oMTAwKTsgLy89PiAnd2F0ZXIgYm9pbHMgYXQgMTAwwrBDJ1xuICAgICAqL1xuICAgIHZhciBjb25kID0gX2N1cnJ5MShmdW5jdGlvbiBjb25kKHBhaXJzKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlIChpZHggPCBwYWlycy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBpZiAocGFpcnNbaWR4XVswXS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBwYWlyc1tpZHhdWzFdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIGB4YCBpcyBmb3VuZCBpbiB0aGUgYGxpc3RgLCB1c2luZyBgcHJlZGAgYXMgYW5cbiAgICAgKiBlcXVhbGl0eSBwcmVkaWNhdGUgZm9yIGB4YC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS41XG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLCBhIC0+IEJvb2xlYW4pIC0+IGEgLT4gW2FdIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gICAgICogQHBhcmFtIHsqfSB4IFRoZSBpdGVtIHRvIGZpbmRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3ZlclxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaXMgaW4gYGxpc3RgLCBlbHNlIGBmYWxzZWAuXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTguMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhYnNFcSA9IChhLCBiKSA9PiBNYXRoLmFicyhhKSA9PT0gTWF0aC5hYnMoYik7XG4gICAgICogICAgICBSLmNvbnRhaW5zV2l0aChhYnNFcSwgNSwgWzEsIDIsIDNdKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5jb250YWluc1dpdGgoYWJzRXEsIDUsIFs0LCA1LCA2XSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5jb250YWluc1dpdGgoYWJzRXEsIDUsIFstMSwgLTIsIC0zXSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuY29udGFpbnNXaXRoKGFic0VxLCA1LCBbLTQsIC01LCAtNl0pOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgY29udGFpbnNXaXRoID0gX2N1cnJ5MyhfY29udGFpbnNXaXRoKTtcblxuICAgIC8qKlxuICAgICAqIENvdW50cyB0aGUgZWxlbWVudHMgb2YgYSBsaXN0IGFjY29yZGluZyB0byBob3cgbWFueSBtYXRjaCBlYWNoIHZhbHVlXG4gICAgICogb2YgYSBrZXkgZ2VuZXJhdGVkIGJ5IHRoZSBzdXBwbGllZCBmdW5jdGlvbi4gUmV0dXJucyBhbiBvYmplY3RcbiAgICAgKiBtYXBwaW5nIHRoZSBrZXlzIHByb2R1Y2VkIGJ5IGBmbmAgdG8gdGhlIG51bWJlciBvZiBvY2N1cnJlbmNlcyBpblxuICAgICAqIHRoZSBsaXN0LiBOb3RlIHRoYXQgYWxsIGtleXMgYXJlIGNvZXJjZWQgdG8gc3RyaW5ncyBiZWNhdXNlIG9mIGhvd1xuICAgICAqIEphdmFTY3JpcHQgb2JqZWN0cyB3b3JrLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIChhIC0+IFN0cmluZykgLT4gW2FdIC0+IHsqfVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIG1hcCB2YWx1ZXMgdG8ga2V5cy5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGNvdW50IGVsZW1lbnRzIGZyb20uXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBbiBvYmplY3QgbWFwcGluZyBrZXlzIHRvIG51bWJlciBvZiBvY2N1cnJlbmNlcyBpbiB0aGUgbGlzdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbnVtYmVycyA9IFsxLjAsIDEuMSwgMS4yLCAyLjAsIDMuMCwgMi4yXTtcbiAgICAgKiAgICAgIHZhciBsZXR0ZXJzID0gUi5zcGxpdCgnJywgJ2FiY0FCQ2FhYUJCYycpO1xuICAgICAqICAgICAgUi5jb3VudEJ5KE1hdGguZmxvb3IpKG51bWJlcnMpOyAgICAvLz0+IHsnMSc6IDMsICcyJzogMiwgJzMnOiAxfVxuICAgICAqICAgICAgUi5jb3VudEJ5KFIudG9Mb3dlcikobGV0dGVycyk7ICAgLy89PiB7J2EnOiA1LCAnYic6IDQsICdjJzogM31cbiAgICAgKi9cbiAgICB2YXIgY291bnRCeSA9IF9jdXJyeTIoZnVuY3Rpb24gY291bnRCeShmbiwgbGlzdCkge1xuICAgICAgICB2YXIgY291bnRzID0ge307XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBmbihsaXN0W2lkeF0pO1xuICAgICAgICAgICAgY291bnRzW2tleV0gPSAoX2hhcyhrZXksIGNvdW50cykgPyBjb3VudHNba2V5XSA6IDApICsgMTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb3VudHM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgY3VycmllZCBlcXVpdmFsZW50IG9mIHRoZSBwcm92aWRlZCBmdW5jdGlvbiwgd2l0aCB0aGVcbiAgICAgKiBzcGVjaWZpZWQgYXJpdHkuIFRoZSBjdXJyaWVkIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuXG4gICAgICogRmlyc3QsIGl0cyBhcmd1bWVudHMgbmVlZG4ndCBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZ2AgaXNcbiAgICAgKiBgUi5jdXJyeU4oMywgZilgLCB0aGUgZm9sbG93aW5nIGFyZSBlcXVpdmFsZW50OlxuICAgICAqXG4gICAgICogICAtIGBnKDEpKDIpKDMpYFxuICAgICAqICAgLSBgZygxKSgyLCAzKWBcbiAgICAgKiAgIC0gYGcoMSwgMikoMylgXG4gICAgICogICAtIGBnKDEsIDIsIDMpYFxuICAgICAqXG4gICAgICogU2Vjb25kbHksIHRoZSBzcGVjaWFsIHBsYWNlaG9sZGVyIHZhbHVlIGBSLl9fYCBtYXkgYmUgdXNlZCB0byBzcGVjaWZ5XG4gICAgICogXCJnYXBzXCIsIGFsbG93aW5nIHBhcnRpYWwgYXBwbGljYXRpb24gb2YgYW55IGNvbWJpbmF0aW9uIG9mIGFyZ3VtZW50cyxcbiAgICAgKiByZWdhcmRsZXNzIG9mIHRoZWlyIHBvc2l0aW9ucy4gSWYgYGdgIGlzIGFzIGFib3ZlIGFuZCBgX2AgaXMgYFIuX19gLFxuICAgICAqIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gICAgICpcbiAgICAgKiAgIC0gYGcoMSwgMiwgMylgXG4gICAgICogICAtIGBnKF8sIDIsIDMpKDEpYFxuICAgICAqICAgLSBgZyhfLCBfLCAzKSgxKSgyKWBcbiAgICAgKiAgIC0gYGcoXywgXywgMykoMSwgMilgXG4gICAgICogICAtIGBnKF8sIDIpKDEpKDMpYFxuICAgICAqICAgLSBgZyhfLCAyKSgxLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMikoXywgMykoMSlgXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjUuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgTnVtYmVyIC0+ICgqIC0+IGEpIC0+ICgqIC0+IGEpXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY3VycnkuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3LCBjdXJyaWVkIGZ1bmN0aW9uLlxuICAgICAqIEBzZWUgUi5jdXJyeVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzdW1BcmdzID0gKC4uLmFyZ3MpID0+IFIuc3VtKGFyZ3MpO1xuICAgICAqXG4gICAgICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeU4oNCwgc3VtQXJncyk7XG4gICAgICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAgICAgKiAgICAgIHZhciBnID0gZigzKTtcbiAgICAgKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAgICAgKi9cbiAgICB2YXIgY3VycnlOID0gX2N1cnJ5MihmdW5jdGlvbiBjdXJyeU4obGVuZ3RoLCBmbikge1xuICAgICAgICBpZiAobGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gX2N1cnJ5MShmbik7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9hcml0eShsZW5ndGgsIF9jdXJyeU4obGVuZ3RoLCBbXSwgZm4pKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIERlY3JlbWVudHMgaXRzIGFyZ3VtZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC45LjBcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICogQHJldHVybiB7TnVtYmVyfVxuICAgICAqIEBzZWUgUi5pbmNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmRlYyg0Mik7IC8vPT4gNDFcbiAgICAgKi9cbiAgICB2YXIgZGVjID0gYWRkKC0xKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHNlY29uZCBhcmd1bWVudCBpZiBpdCBpcyBub3QgYG51bGxgLCBgdW5kZWZpbmVkYCBvciBgTmFOYFxuICAgICAqIG90aGVyd2lzZSB0aGUgZmlyc3QgYXJndW1lbnQgaXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEwLjBcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnIGEgLT4gYiAtPiBhIHwgYlxuICAgICAqIEBwYXJhbSB7YX0gdmFsIFRoZSBkZWZhdWx0IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7Yn0gdmFsIFRoZSB2YWx1ZSB0byByZXR1cm4gaWYgaXQgaXMgbm90IG51bGwgb3IgdW5kZWZpbmVkXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHRoZSBzZWNvbmQgdmFsdWUgb3IgdGhlIGRlZmF1bHQgdmFsdWVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZGVmYXVsdFRvNDIgPSBSLmRlZmF1bHRUbyg0Mik7XG4gICAgICpcbiAgICAgKiAgICAgIGRlZmF1bHRUbzQyKG51bGwpOyAgLy89PiA0MlxuICAgICAqICAgICAgZGVmYXVsdFRvNDIodW5kZWZpbmVkKTsgIC8vPT4gNDJcbiAgICAgKiAgICAgIGRlZmF1bHRUbzQyKCdSYW1kYScpOyAgLy89PiAnUmFtZGEnXG4gICAgICogICAgICBkZWZhdWx0VG80MihwYXJzZUludCgnc3RyaW5nJykpOyAvLz0+IDQyXG4gICAgICovXG4gICAgdmFyIGRlZmF1bHRUbyA9IF9jdXJyeTIoZnVuY3Rpb24gZGVmYXVsdFRvKGQsIHYpIHtcbiAgICAgICAgcmV0dXJuIHYgPT0gbnVsbCB8fCB2ICE9PSB2ID8gZCA6IHY7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgZmlyc3QgbGlzdCBub3QgY29udGFpbmVkIGluIHRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBEdXBsaWNhdGlvbiBpcyBkZXRlcm1pbmVkIGFjY29yZGluZyB0byB0aGUgdmFsdWUgcmV0dXJuZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSB0byB0d28gbGlzdFxuICAgICAqIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIChhLGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBsaXN0LlxuICAgICAqIEBzZWUgUi5kaWZmZXJlbmNlXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBlbGVtZW50cyBpbiBgbGlzdDFgIHRoYXQgYXJlIG5vdCBpbiBgbGlzdDJgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIGZ1bmN0aW9uIGNtcCh4LCB5KSA9PiB4LmEgPT09IHkuYTtcbiAgICAgKiAgICAgIHZhciBsMSA9IFt7YTogMX0sIHthOiAyfSwge2E6IDN9XTtcbiAgICAgKiAgICAgIHZhciBsMiA9IFt7YTogM30sIHthOiA0fV07XG4gICAgICogICAgICBSLmRpZmZlcmVuY2VXaXRoKGNtcCwgbDEsIGwyKTsgLy89PiBbe2E6IDF9LCB7YTogMn1dXG4gICAgICovXG4gICAgdmFyIGRpZmZlcmVuY2VXaXRoID0gX2N1cnJ5MyhmdW5jdGlvbiBkaWZmZXJlbmNlV2l0aChwcmVkLCBmaXJzdCwgc2Vjb25kKSB7XG4gICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBmaXJzdExlbiA9IGZpcnN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGNvbnRhaW5zUHJlZCA9IGNvbnRhaW5zV2l0aChwcmVkKTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGZpcnN0TGVuKSB7XG4gICAgICAgICAgICBpZiAoIWNvbnRhaW5zUHJlZChmaXJzdFtpZHhdLCBzZWNvbmQpICYmICFjb250YWluc1ByZWQoZmlyc3RbaWR4XSwgb3V0KSkge1xuICAgICAgICAgICAgICAgIG91dFtvdXQubGVuZ3RoXSA9IGZpcnN0W2lkeF07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBvYmplY3QgdGhhdCBkb2VzIG5vdCBjb250YWluIGEgYHByb3BgIHByb3BlcnR5LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xMC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgU3RyaW5nIC0+IHtrOiB2fSAtPiB7azogdn1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCB0aGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gZGlzc29jaWF0ZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogdGhlIG9iamVjdCB0byBjbG9uZVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gYSBuZXcgb2JqZWN0IHNpbWlsYXIgdG8gdGhlIG9yaWdpbmFsIGJ1dCB3aXRob3V0IHRoZSBzcGVjaWZpZWQgcHJvcGVydHlcbiAgICAgKiBAc2VlIFIuYXNzb2NcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmRpc3NvYygnYicsIHthOiAxLCBiOiAyLCBjOiAzfSk7IC8vPT4ge2E6IDEsIGM6IDN9XG4gICAgICovXG4gICAgdmFyIGRpc3NvYyA9IF9jdXJyeTIoZnVuY3Rpb24gZGlzc29jKHByb3AsIG9iaikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHAgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAocCAhPT0gcHJvcCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtwXSA9IG9ialtwXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTWFrZXMgYSBzaGFsbG93IGNsb25lIG9mIGFuIG9iamVjdCwgb21pdHRpbmcgdGhlIHByb3BlcnR5IGF0IHRoZVxuICAgICAqIGdpdmVuIHBhdGguIE5vdGUgdGhhdCB0aGlzIGNvcGllcyBhbmQgZmxhdHRlbnMgcHJvdG90eXBlIHByb3BlcnRpZXNcbiAgICAgKiBvbnRvIHRoZSBuZXcgb2JqZWN0IGFzIHdlbGwuICBBbGwgbm9uLXByaW1pdGl2ZSBwcm9wZXJ0aWVzIGFyZSBjb3BpZWRcbiAgICAgKiBieSByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjExLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBbU3RyaW5nXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gcGF0aCB0aGUgcGF0aCB0byBzZXRcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIHRoZSBvYmplY3QgdG8gY2xvbmVcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IGEgbmV3IG9iamVjdCB3aXRob3V0IHRoZSBwcm9wZXJ0eSBhdCBwYXRoXG4gICAgICogQHNlZSBSLmFzc29jUGF0aFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZGlzc29jUGF0aChbJ2EnLCAnYicsICdjJ10sIHthOiB7Yjoge2M6IDQyfX19KTsgLy89PiB7YToge2I6IHt9fX1cbiAgICAgKi9cbiAgICB2YXIgZGlzc29jUGF0aCA9IF9jdXJyeTIoZnVuY3Rpb24gZGlzc29jUGF0aChwYXRoLCBvYmopIHtcbiAgICAgICAgc3dpdGNoIChwYXRoLmxlbmd0aCkge1xuICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICByZXR1cm4gb2JqO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gZGlzc29jKHBhdGhbMF0sIG9iaik7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB2YXIgaGVhZCA9IHBhdGhbMF07XG4gICAgICAgICAgICB2YXIgdGFpbCA9IF9zbGljZShwYXRoLCAxKTtcbiAgICAgICAgICAgIHJldHVybiBvYmpbaGVhZF0gPT0gbnVsbCA/IG9iaiA6IGFzc29jKGhlYWQsIGRpc3NvY1BhdGgodGFpbCwgb2JqW2hlYWRdKSwgb2JqKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogRGl2aWRlcyB0d28gbnVtYmVycy4gRXF1aXZhbGVudCB0byBgYSAvIGJgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgdmFsdWUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgLyBiYC5cbiAgICAgKiBAc2VlIFIubXVsdGlwbHlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmRpdmlkZSg3MSwgMTAwKTsgLy89PiAwLjcxXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBoYWxmID0gUi5kaXZpZGUoUi5fXywgMik7XG4gICAgICogICAgICBoYWxmKDQyKTsgLy89PiAyMVxuICAgICAqXG4gICAgICogICAgICB2YXIgcmVjaXByb2NhbCA9IFIuZGl2aWRlKDEpO1xuICAgICAqICAgICAgcmVjaXByb2NhbCg0KTsgICAvLz0+IDAuMjVcbiAgICAgKi9cbiAgICB2YXIgZGl2aWRlID0gX2N1cnJ5MihmdW5jdGlvbiBkaXZpZGUoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAvIGI7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyBhbGwgYnV0IGxhc3QgdGhlYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCxcbiAgICAgKiBwYXNzaW5nIGVhY2ggdmFsdWUgZnJvbSB0aGUgcmlnaHQgdG8gdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSBmdW5jdGlvbiwgc2tpcHBpbmdcbiAgICAgKiBlbGVtZW50cyB3aGlsZSB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnMgYHRydWVgLiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uXG4gICAgICogaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE2LjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gICAgICogQHNlZSBSLnRha2VMYXN0V2hpbGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbHRlVGhyZWUgPSB4ID0+IHggPD0gMztcbiAgICAgKlxuICAgICAqICAgICAgUi5kcm9wTGFzdFdoaWxlKGx0ZVRocmVlLCBbMSwgMiwgMywgNCwgMywgMiwgMV0pOyAvLz0+IFsxLCAyLCAzLCA0XVxuICAgICAqL1xuICAgIHZhciBkcm9wTGFzdFdoaWxlID0gX2N1cnJ5MihmdW5jdGlvbiBkcm9wTGFzdFdoaWxlKHByZWQsIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGlkeCA+PSAwICYmIHByZWQobGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0LCAwLCBpZHggKyAxKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGVtcHR5IHZhbHVlIG9mIGl0cyBhcmd1bWVudCdzIHR5cGUuIFJhbWRhIGRlZmluZXMgdGhlIGVtcHR5XG4gICAgICogdmFsdWUgb2YgQXJyYXkgKGBbXWApLCBPYmplY3QgKGB7fWApLCBTdHJpbmcgKGAnJ2ApLCBhbmQgQXJndW1lbnRzLlxuICAgICAqIE90aGVyIHR5cGVzIGFyZSBzdXBwb3J0ZWQgaWYgdGhleSBkZWZpbmUgYDxUeXBlPi5lbXB0eWAgYW5kL29yXG4gICAgICogYDxUeXBlPi5wcm90b3R5cGUuZW1wdHlgLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGVtcHR5YCBtZXRob2Qgb2YgdGhlIGZpcnN0IGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4zLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIGEgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5lbXB0eShKdXN0KDQyKSk7ICAgICAgLy89PiBOb3RoaW5nKClcbiAgICAgKiAgICAgIFIuZW1wdHkoWzEsIDIsIDNdKTsgICAgIC8vPT4gW11cbiAgICAgKiAgICAgIFIuZW1wdHkoJ3VuaWNvcm5zJyk7ICAgIC8vPT4gJydcbiAgICAgKiAgICAgIFIuZW1wdHkoe3g6IDEsIHk6IDJ9KTsgIC8vPT4ge31cbiAgICAgKi9cbiAgICAvLyBlbHNlXG4gICAgdmFyIGVtcHR5ID0gX2N1cnJ5MShmdW5jdGlvbiBlbXB0eSh4KSB7XG4gICAgICAgIHJldHVybiB4ICE9IG51bGwgJiYgdHlwZW9mIHguZW1wdHkgPT09ICdmdW5jdGlvbicgPyB4LmVtcHR5KCkgOiB4ICE9IG51bGwgJiYgeC5jb25zdHJ1Y3RvciAhPSBudWxsICYmIHR5cGVvZiB4LmNvbnN0cnVjdG9yLmVtcHR5ID09PSAnZnVuY3Rpb24nID8geC5jb25zdHJ1Y3Rvci5lbXB0eSgpIDogX2lzQXJyYXkoeCkgPyBbXSA6IF9pc1N0cmluZyh4KSA/ICcnIDogX2lzT2JqZWN0KHgpID8ge30gOiBfaXNBcmd1bWVudHMoeCkgPyBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gYXJndW1lbnRzO1xuICAgICAgICB9KCkgOiAvLyBlbHNlXG4gICAgICAgIHZvaWQgMDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgb2JqZWN0IGJ5IHJlY3Vyc2l2ZWx5IGV2b2x2aW5nIGEgc2hhbGxvdyBjb3B5IG9mIGBvYmplY3RgLCBhY2NvcmRpbmcgdG8gdGhlXG4gICAgICogYHRyYW5zZm9ybWF0aW9uYCBmdW5jdGlvbnMuIEFsbCBub24tcHJpbWl0aXZlIHByb3BlcnRpZXMgYXJlIGNvcGllZCBieSByZWZlcmVuY2UuXG4gICAgICpcbiAgICAgKiBBIGB0cmFuc2Zvcm1hdGlvbmAgZnVuY3Rpb24gd2lsbCBub3QgYmUgaW52b2tlZCBpZiBpdHMgY29ycmVzcG9uZGluZyBrZXkgZG9lcyBub3QgZXhpc3QgaW5cbiAgICAgKiB0aGUgZXZvbHZlZCBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtrOiAodiAtPiB2KX0gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSB0cmFuc2Zvcm1hdGlvbnMgVGhlIG9iamVjdCBzcGVjaWZ5aW5nIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9ucyB0byBhcHBseVxuICAgICAqICAgICAgICB0byB0aGUgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmplY3QgVGhlIG9iamVjdCB0byBiZSB0cmFuc2Zvcm1lZC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSB0cmFuc2Zvcm1lZCBvYmplY3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHRvbWF0byAgPSB7Zmlyc3ROYW1lOiAnICBUb21hdG8gJywgZGF0YToge2VsYXBzZWQ6IDEwMCwgcmVtYWluaW5nOiAxNDAwfSwgaWQ6MTIzfTtcbiAgICAgKiAgICAgIHZhciB0cmFuc2Zvcm1hdGlvbnMgPSB7XG4gICAgICogICAgICAgIGZpcnN0TmFtZTogUi50cmltLFxuICAgICAqICAgICAgICBsYXN0TmFtZTogUi50cmltLCAvLyBXaWxsIG5vdCBnZXQgaW52b2tlZC5cbiAgICAgKiAgICAgICAgZGF0YToge2VsYXBzZWQ6IFIuYWRkKDEpLCByZW1haW5pbmc6IFIuYWRkKC0xKX1cbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBSLmV2b2x2ZSh0cmFuc2Zvcm1hdGlvbnMsIHRvbWF0byk7IC8vPT4ge2ZpcnN0TmFtZTogJ1RvbWF0bycsIGRhdGE6IHtlbGFwc2VkOiAxMDEsIHJlbWFpbmluZzogMTM5OX0sIGlkOjEyM31cbiAgICAgKi9cbiAgICB2YXIgZXZvbHZlID0gX2N1cnJ5MihmdW5jdGlvbiBldm9sdmUodHJhbnNmb3JtYXRpb25zLCBvYmplY3QpIHtcbiAgICAgICAgdmFyIHRyYW5zZm9ybWF0aW9uLCBrZXksIHR5cGUsIHJlc3VsdCA9IHt9O1xuICAgICAgICBmb3IgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICAgIHRyYW5zZm9ybWF0aW9uID0gdHJhbnNmb3JtYXRpb25zW2tleV07XG4gICAgICAgICAgICB0eXBlID0gdHlwZW9mIHRyYW5zZm9ybWF0aW9uO1xuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0eXBlID09PSAnZnVuY3Rpb24nID8gdHJhbnNmb3JtYXRpb24ob2JqZWN0W2tleV0pIDogdHlwZSA9PT0gJ29iamVjdCcgPyBldm9sdmUodHJhbnNmb3JtYXRpb25zW2tleV0sIG9iamVjdFtrZXldKSA6IG9iamVjdFtrZXldO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IG9iamVjdCBvdXQgb2YgYSBsaXN0IGtleS12YWx1ZSBwYWlycy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMy4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFtbayx2XV0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gcGFpcnMgQW4gYXJyYXkgb2YgdHdvLWVsZW1lbnQgYXJyYXlzIHRoYXQgd2lsbCBiZSB0aGUga2V5cyBhbmQgdmFsdWVzIG9mIHRoZSBvdXRwdXQgb2JqZWN0LlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gVGhlIG9iamVjdCBtYWRlIGJ5IHBhaXJpbmcgdXAgYGtleXNgIGFuZCBgdmFsdWVzYC5cbiAgICAgKiBAc2VlIFIudG9QYWlycywgUi5wYWlyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5mcm9tUGFpcnMoW1snYScsIDFdLCBbJ2InLCAyXSwgIFsnYycsIDNdXSk7IC8vPT4ge2E6IDEsIGI6IDIsIGM6IDN9XG4gICAgICovXG4gICAgdmFyIGZyb21QYWlycyA9IF9jdXJyeTEoZnVuY3Rpb24gZnJvbVBhaXJzKHBhaXJzKSB7XG4gICAgICAgIHZhciBpZHggPSAwLCBsZW4gPSBwYWlycy5sZW5ndGgsIG91dCA9IHt9O1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoX2lzQXJyYXkocGFpcnNbaWR4XSkgJiYgcGFpcnNbaWR4XS5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICBvdXRbcGFpcnNbaWR4XVswXV0gPSBwYWlyc1tpZHhdWzFdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBncmVhdGVyIHRoYW4gdGhlIHNlY29uZDtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmx0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5ndCgyLCAxKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmd0KDIsIDIpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmd0KDIsIDMpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmd0KCdhJywgJ3onKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5ndCgneicsICdhJyk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBndCA9IF9jdXJyeTIoZnVuY3Rpb24gZ3QoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA+IGI7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgZ3JlYXRlciB0aGFuIG9yIGVxdWFsIHRvIHRoZSBzZWNvbmQ7XG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAc2VlIFIubHRlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5ndGUoMiwgMSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5ndGUoMiwgMik7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5ndGUoMiwgMyk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZ3RlKCdhJywgJ3onKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5ndGUoJ3onLCAnYScpOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgZ3RlID0gX2N1cnJ5MihmdW5jdGlvbiBndGUoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA+PSBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaGFzIGFuIG93biBwcm9wZXJ0eSB3aXRoXG4gICAgICogdGhlIHNwZWNpZmllZCBuYW1lXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjcuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHMgLT4ge3M6IHh9IC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY2hlY2sgZm9yLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBXaGV0aGVyIHRoZSBwcm9wZXJ0eSBleGlzdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGhhc05hbWUgPSBSLmhhcygnbmFtZScpO1xuICAgICAqICAgICAgaGFzTmFtZSh7bmFtZTogJ2FsaWNlJ30pOyAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgaGFzTmFtZSh7bmFtZTogJ2JvYid9KTsgICAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgaGFzTmFtZSh7fSk7ICAgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHBvaW50ID0ge3g6IDAsIHk6IDB9O1xuICAgICAqICAgICAgdmFyIHBvaW50SGFzID0gUi5oYXMoUi5fXywgcG9pbnQpO1xuICAgICAqICAgICAgcG9pbnRIYXMoJ3gnKTsgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcG9pbnRIYXMoJ3knKTsgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcG9pbnRIYXMoJ3onKTsgIC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgaGFzID0gX2N1cnJ5MihfaGFzKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgd2hldGhlciBvciBub3QgYW4gb2JqZWN0IG9yIGl0cyBwcm90b3R5cGUgY2hhaW4gaGFzXG4gICAgICogYSBwcm9wZXJ0eSB3aXRoIHRoZSBzcGVjaWZpZWQgbmFtZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC43LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBzIC0+IHtzOiB4fSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHByb3AgVGhlIG5hbWUgb2YgdGhlIHByb3BlcnR5IHRvIGNoZWNrIGZvci5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnkuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gV2hldGhlciB0aGUgcHJvcGVydHkgZXhpc3RzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIGZ1bmN0aW9uIFJlY3RhbmdsZSh3aWR0aCwgaGVpZ2h0KSB7XG4gICAgICogICAgICAgIHRoaXMud2lkdGggPSB3aWR0aDtcbiAgICAgKiAgICAgICAgdGhpcy5oZWlnaHQgPSBoZWlnaHQ7XG4gICAgICogICAgICB9XG4gICAgICogICAgICBSZWN0YW5nbGUucHJvdG90eXBlLmFyZWEgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIHRoaXMud2lkdGggKiB0aGlzLmhlaWdodDtcbiAgICAgKiAgICAgIH07XG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzcXVhcmUgPSBuZXcgUmVjdGFuZ2xlKDIsIDIpO1xuICAgICAqICAgICAgUi5oYXNJbignd2lkdGgnLCBzcXVhcmUpOyAgLy89PiB0cnVlXG4gICAgICogICAgICBSLmhhc0luKCdhcmVhJywgc3F1YXJlKTsgIC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBoYXNJbiA9IF9jdXJyeTIoZnVuY3Rpb24gaGFzSW4ocHJvcCwgb2JqKSB7XG4gICAgICAgIHJldHVybiBwcm9wIGluIG9iajtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBpdHMgYXJndW1lbnRzIGFyZSBpZGVudGljYWwsIGZhbHNlIG90aGVyd2lzZS4gVmFsdWVzIGFyZVxuICAgICAqIGlkZW50aWNhbCBpZiB0aGV5IHJlZmVyZW5jZSB0aGUgc2FtZSBtZW1vcnkuIGBOYU5gIGlzIGlkZW50aWNhbCB0byBgTmFOYDtcbiAgICAgKiBgMGAgYW5kIGAtMGAgYXJlIG5vdCBpZGVudGljYWwuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE1LjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbyA9IHt9O1xuICAgICAqICAgICAgUi5pZGVudGljYWwobywgbyk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoMSwgMSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoMSwgJzEnKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoW10sIFtdKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pZGVudGljYWwoMCwgLTApOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlkZW50aWNhbChOYU4sIE5hTik7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIC8vIFNhbWVWYWx1ZSBhbGdvcml0aG1cbiAgICAvLyBTdGVwcyAxLTUsIDctMTBcbiAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgIC8vIFN0ZXAgNi5hOiBOYU4gPT0gTmFOXG4gICAgdmFyIGlkZW50aWNhbCA9IF9jdXJyeTIoZnVuY3Rpb24gaWRlbnRpY2FsKGEsIGIpIHtcbiAgICAgICAgLy8gU2FtZVZhbHVlIGFsZ29yaXRobVxuICAgICAgICBpZiAoYSA9PT0gYikge1xuICAgICAgICAgICAgLy8gU3RlcHMgMS01LCA3LTEwXG4gICAgICAgICAgICAvLyBTdGVwcyA2LmItNi5lOiArMCAhPSAtMFxuICAgICAgICAgICAgcmV0dXJuIGEgIT09IDAgfHwgMSAvIGEgPT09IDEgLyBiO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgLy8gU3RlcCA2LmE6IE5hTiA9PSBOYU5cbiAgICAgICAgICAgIHJldHVybiBhICE9PSBhICYmIGIgIT09IGI7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCBkb2VzIG5vdGhpbmcgYnV0IHJldHVybiB0aGUgcGFyYW1ldGVyIHN1cHBsaWVkIHRvIGl0LiBHb29kIGFzIGEgZGVmYXVsdFxuICAgICAqIG9yIHBsYWNlaG9sZGVyIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIGEgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWUgdG8gcmV0dXJuLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSBpbnB1dCB2YWx1ZSwgYHhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaWRlbnRpdHkoMSk7IC8vPT4gMVxuICAgICAqXG4gICAgICogICAgICB2YXIgb2JqID0ge307XG4gICAgICogICAgICBSLmlkZW50aXR5KG9iaikgPT09IG9iajsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGlkZW50aXR5ID0gX2N1cnJ5MShfaWRlbnRpdHkpO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIGZ1bmN0aW9uIHRoYXQgd2lsbCBwcm9jZXNzIGVpdGhlciB0aGUgYG9uVHJ1ZWAgb3IgdGhlIGBvbkZhbHNlYCBmdW5jdGlvbiBkZXBlbmRpbmdcbiAgICAgKiB1cG9uIHRoZSByZXN1bHQgb2YgdGhlIGBjb25kaXRpb25gIHByZWRpY2F0ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOC4wXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNlZSBSLnVubGVzcywgUi53aGVuXG4gICAgICogQHNpZyAoKi4uLiAtPiBCb29sZWFuKSAtPiAoKi4uLiAtPiAqKSAtPiAoKi4uLiAtPiAqKSAtPiAoKi4uLiAtPiAqKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGNvbmRpdGlvbiBBIHByZWRpY2F0ZSBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG9uVHJ1ZSBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYCBldmFsdWF0ZXMgdG8gYSB0cnV0aHkgdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb25GYWxzZSBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYCBldmFsdWF0ZXMgdG8gYSBmYWxzeSB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgdW5hcnkgZnVuY3Rpb24gdGhhdCB3aWxsIHByb2Nlc3MgZWl0aGVyIHRoZSBgb25UcnVlYCBvciB0aGUgYG9uRmFsc2VgXG4gICAgICogICAgICAgICAgICAgICAgICAgIGZ1bmN0aW9uIGRlcGVuZGluZyB1cG9uIHRoZSByZXN1bHQgb2YgdGhlIGBjb25kaXRpb25gIHByZWRpY2F0ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaW5jQ291bnQgPSBSLmlmRWxzZShcbiAgICAgKiAgICAgICAgUi5oYXMoJ2NvdW50JyksXG4gICAgICogICAgICAgIFIub3ZlcihSLmxlbnNQcm9wKCdjb3VudCcpLCBSLmluYyksXG4gICAgICogICAgICAgIFIuYXNzb2MoJ2NvdW50JywgMSlcbiAgICAgKiAgICAgICk7XG4gICAgICogICAgICBpbmNDb3VudCh7fSk7ICAgICAgICAgICAvLz0+IHsgY291bnQ6IDEgfVxuICAgICAqICAgICAgaW5jQ291bnQoeyBjb3VudDogMSB9KTsgLy89PiB7IGNvdW50OiAyIH1cbiAgICAgKi9cbiAgICB2YXIgaWZFbHNlID0gX2N1cnJ5MyhmdW5jdGlvbiBpZkVsc2UoY29uZGl0aW9uLCBvblRydWUsIG9uRmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJ5TihNYXRoLm1heChjb25kaXRpb24ubGVuZ3RoLCBvblRydWUubGVuZ3RoLCBvbkZhbHNlLmxlbmd0aCksIGZ1bmN0aW9uIF9pZkVsc2UoKSB7XG4gICAgICAgICAgICByZXR1cm4gY29uZGl0aW9uLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykgPyBvblRydWUuYXBwbHkodGhpcywgYXJndW1lbnRzKSA6IG9uRmFsc2UuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBJbmNyZW1lbnRzIGl0cyBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOS4wXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gblxuICAgICAqIEByZXR1cm4ge051bWJlcn1cbiAgICAgKiBAc2VlIFIuZGVjXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pbmMoNDIpOyAvLz0+IDQzXG4gICAgICovXG4gICAgdmFyIGluYyA9IGFkZCgxKTtcblxuICAgIC8qKlxuICAgICAqIEluc2VydHMgdGhlIHN1cHBsaWVkIGVsZW1lbnQgaW50byB0aGUgbGlzdCwgYXQgaW5kZXggYGluZGV4YC4gIF9Ob3RlXG4gICAgICogdGhhdCB0aGlzIGlzIG5vdCBkZXN0cnVjdGl2ZV86IGl0IHJldHVybnMgYSBjb3B5IG9mIHRoZSBsaXN0IHdpdGggdGhlIGNoYW5nZXMuXG4gICAgICogPHNtYWxsPk5vIGxpc3RzIGhhdmUgYmVlbiBoYXJtZWQgaW4gdGhlIGFwcGxpY2F0aW9uIG9mIHRoaXMgZnVuY3Rpb24uPC9zbWFsbD5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMi4yXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBhIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgZWxlbWVudFxuICAgICAqIEBwYXJhbSB7Kn0gZWx0IFRoZSBlbGVtZW50IHRvIGluc2VydCBpbnRvIHRoZSBBcnJheVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gaW5zZXJ0IGludG9cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgQXJyYXkgd2l0aCBgZWx0YCBpbnNlcnRlZCBhdCBgaW5kZXhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5zZXJ0KDIsICd4JywgWzEsMiwzLDRdKTsgLy89PiBbMSwyLCd4JywzLDRdXG4gICAgICovXG4gICAgdmFyIGluc2VydCA9IF9jdXJyeTMoZnVuY3Rpb24gaW5zZXJ0KGlkeCwgZWx0LCBsaXN0KSB7XG4gICAgICAgIGlkeCA9IGlkeCA8IGxpc3QubGVuZ3RoICYmIGlkeCA+PSAwID8gaWR4IDogbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBfc2xpY2UobGlzdCk7XG4gICAgICAgIHJlc3VsdC5zcGxpY2UoaWR4LCAwLCBlbHQpO1xuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogSW5zZXJ0cyB0aGUgc3ViLWxpc3QgaW50byB0aGUgbGlzdCwgYXQgaW5kZXggYGluZGV4YC4gIF9Ob3RlICB0aGF0IHRoaXNcbiAgICAgKiBpcyBub3QgZGVzdHJ1Y3RpdmVfOiBpdCByZXR1cm5zIGEgY29weSBvZiB0aGUgbGlzdCB3aXRoIHRoZSBjaGFuZ2VzLlxuICAgICAqIDxzbWFsbD5ObyBsaXN0cyBoYXZlIGJlZW4gaGFybWVkIGluIHRoZSBhcHBsaWNhdGlvbiBvZiB0aGlzIGZ1bmN0aW9uLjwvc21hbGw+XG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gaW5kZXggVGhlIHBvc2l0aW9uIHRvIGluc2VydCB0aGUgc3ViLWxpc3RcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBlbHRzIFRoZSBzdWItbGlzdCB0byBpbnNlcnQgaW50byB0aGUgQXJyYXlcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGluc2VydCB0aGUgc3ViLWxpc3QgaW50b1xuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBBcnJheSB3aXRoIGBlbHRzYCBpbnNlcnRlZCBzdGFydGluZyBhdCBgaW5kZXhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5zZXJ0QWxsKDIsIFsneCcsJ3knLCd6J10sIFsxLDIsMyw0XSk7IC8vPT4gWzEsMiwneCcsJ3knLCd6JywzLDRdXG4gICAgICovXG4gICAgdmFyIGluc2VydEFsbCA9IF9jdXJyeTMoZnVuY3Rpb24gaW5zZXJ0QWxsKGlkeCwgZWx0cywgbGlzdCkge1xuICAgICAgICBpZHggPSBpZHggPCBsaXN0Lmxlbmd0aCAmJiBpZHggPj0gMCA/IGlkeCA6IGxpc3QubGVuZ3RoO1xuICAgICAgICByZXR1cm4gX2NvbmNhdChfY29uY2F0KF9zbGljZShsaXN0LCAwLCBpZHgpLCBlbHRzKSwgX3NsaWNlKGxpc3QsIGlkeCkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU2VlIGlmIGFuIG9iamVjdCAoYHZhbGApIGlzIGFuIGluc3RhbmNlIG9mIHRoZSBzdXBwbGllZCBjb25zdHJ1Y3Rvci5cbiAgICAgKiBUaGlzIGZ1bmN0aW9uIHdpbGwgY2hlY2sgdXAgdGhlIGluaGVyaXRhbmNlIGNoYWluLCBpZiBhbnkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjMuMFxuICAgICAqIEBjYXRlZ29yeSBUeXBlXG4gICAgICogQHNpZyAoKiAtPiB7Kn0pIC0+IGEgLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBjdG9yIEEgY29uc3RydWN0b3JcbiAgICAgKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pcyhPYmplY3QsIHt9KTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzKE51bWJlciwgMSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pcyhPYmplY3QsIDEpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlzKFN0cmluZywgJ3MnKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzKFN0cmluZywgbmV3IFN0cmluZygnJykpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXMoT2JqZWN0LCBuZXcgU3RyaW5nKCcnKSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pcyhPYmplY3QsICdzJyk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuaXMoTnVtYmVyLCB7fSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgaXMgPSBfY3VycnkyKGZ1bmN0aW9uIGlzKEN0b3IsIHZhbCkge1xuICAgICAgICByZXR1cm4gdmFsICE9IG51bGwgJiYgdmFsLmNvbnN0cnVjdG9yID09PSBDdG9yIHx8IHZhbCBpbnN0YW5jZW9mIEN0b3I7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB3aGV0aGVyIG9yIG5vdCBhbiBvYmplY3QgaXMgc2ltaWxhciB0byBhbiBhcnJheS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuNS4wXG4gICAgICogQGNhdGVnb3J5IFR5cGVcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKiAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSB4IFRoZSBvYmplY3QgdG8gdGVzdC5cbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSBgdHJ1ZWAgaWYgYHhgIGhhcyBhIG51bWVyaWMgbGVuZ3RoIHByb3BlcnR5IGFuZCBleHRyZW1lIGluZGljZXMgZGVmaW5lZDsgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZShbXSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZSh0cnVlKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZSh7fSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuaXNBcnJheUxpa2Uoe2xlbmd0aDogMTB9KTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5pc0FycmF5TGlrZSh7MDogJ3plcm8nLCA5OiAnbmluZScsIGxlbmd0aDogMTB9KTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGlzQXJyYXlMaWtlID0gX2N1cnJ5MShmdW5jdGlvbiBpc0FycmF5TGlrZSh4KSB7XG4gICAgICAgIGlmIChfaXNBcnJheSh4KSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCF4KSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGVvZiB4ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4IGluc3RhbmNlb2YgU3RyaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHgubm9kZVR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXgubGVuZ3RoO1xuICAgICAgICB9XG4gICAgICAgIGlmICh4Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHgubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgcmV0dXJuIHguaGFzT3duUHJvcGVydHkoMCkgJiYgeC5oYXNPd25Qcm9wZXJ0eSh4Lmxlbmd0aCAtIDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENoZWNrcyBpZiB0aGUgaW5wdXQgdmFsdWUgaXMgYG51bGxgIG9yIGB1bmRlZmluZWRgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC45LjBcbiAgICAgKiBAY2F0ZWdvcnkgVHlwZVxuICAgICAqIEBzaWcgKiAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfSB4IFRoZSB2YWx1ZSB0byB0ZXN0LlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBgeGAgaXMgYHVuZGVmaW5lZGAgb3IgYG51bGxgLCBvdGhlcndpc2UgYGZhbHNlYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmlzTmlsKG51bGwpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXNOaWwodW5kZWZpbmVkKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzTmlsKDApOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlzTmlsKFtdKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBpc05pbCA9IF9jdXJyeTEoZnVuY3Rpb24gaXNOaWwoeCkge1xuICAgICAgICByZXR1cm4geCA9PSBudWxsO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyB0aGUgbmFtZXMgb2YgYWxsIHRoZSBlbnVtZXJhYmxlIG93blxuICAgICAqIHByb3BlcnRpZXMgb2YgdGhlIHN1cHBsaWVkIG9iamVjdC5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgKiBjb25zaXN0ZW50IGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7azogdn0gLT4gW2tdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgcHJvcGVydGllcyBmcm9tXG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmtleXMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAgICAgKi9cbiAgICAvLyBjb3ZlciBJRSA8IDkga2V5cyBpc3N1ZXNcbiAgICB2YXIga2V5cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gY292ZXIgSUUgPCA5IGtleXMgaXNzdWVzXG4gICAgICAgIHZhciBoYXNFbnVtQnVnID0gIXsgdG9TdHJpbmc6IG51bGwgfS5wcm9wZXJ0eUlzRW51bWVyYWJsZSgndG9TdHJpbmcnKTtcbiAgICAgICAgdmFyIG5vbkVudW1lcmFibGVQcm9wcyA9IFtcbiAgICAgICAgICAgICdjb25zdHJ1Y3RvcicsXG4gICAgICAgICAgICAndmFsdWVPZicsXG4gICAgICAgICAgICAnaXNQcm90b3R5cGVPZicsXG4gICAgICAgICAgICAndG9TdHJpbmcnLFxuICAgICAgICAgICAgJ3Byb3BlcnR5SXNFbnVtZXJhYmxlJyxcbiAgICAgICAgICAgICdoYXNPd25Qcm9wZXJ0eScsXG4gICAgICAgICAgICAndG9Mb2NhbGVTdHJpbmcnXG4gICAgICAgIF07XG4gICAgICAgIHZhciBjb250YWlucyA9IGZ1bmN0aW9uIGNvbnRhaW5zKGxpc3QsIGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgaWYgKGxpc3RbaWR4XSA9PT0gaXRlbSkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiB0eXBlb2YgT2JqZWN0LmtleXMgPT09ICdmdW5jdGlvbicgPyBfY3VycnkxKGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0KG9iaikgIT09IG9iaiA/IFtdIDogT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgfSkgOiBfY3VycnkxKGZ1bmN0aW9uIGtleXMob2JqKSB7XG4gICAgICAgICAgICBpZiAoT2JqZWN0KG9iaikgIT09IG9iaikge1xuICAgICAgICAgICAgICAgIHJldHVybiBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcm9wLCBrcyA9IFtdLCBuSWR4O1xuICAgICAgICAgICAgZm9yIChwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgICAgIGlmIChfaGFzKHByb3AsIG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKGhhc0VudW1CdWcpIHtcbiAgICAgICAgICAgICAgICBuSWR4ID0gbm9uRW51bWVyYWJsZVByb3BzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICAgICAgd2hpbGUgKG5JZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgICBwcm9wID0gbm9uRW51bWVyYWJsZVByb3BzW25JZHhdO1xuICAgICAgICAgICAgICAgICAgICBpZiAoX2hhcyhwcm9wLCBvYmopICYmICFjb250YWlucyhrcywgcHJvcCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGtzW2tzLmxlbmd0aF0gPSBwcm9wO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG5JZHggLT0gMTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ga3M7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IGNvbnRhaW5pbmcgdGhlIG5hbWVzIG9mIGFsbCB0aGVcbiAgICAgKiBwcm9wZXJ0aWVzIG9mIHRoZSBzdXBwbGllZCBvYmplY3QsIGluY2x1ZGluZyBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgKiBjb25zaXN0ZW50IGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7azogdn0gLT4gW2tdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgcHJvcGVydGllcyBmcm9tXG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIHRoZSBvYmplY3QncyBvd24gYW5kIHByb3RvdHlwZSBwcm9wZXJ0aWVzLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBGID0gZnVuY3Rpb24oKSB7IHRoaXMueCA9ICdYJzsgfTtcbiAgICAgKiAgICAgIEYucHJvdG90eXBlLnkgPSAnWSc7XG4gICAgICogICAgICB2YXIgZiA9IG5ldyBGKCk7XG4gICAgICogICAgICBSLmtleXNJbihmKTsgLy89PiBbJ3gnLCAneSddXG4gICAgICovXG4gICAgdmFyIGtleXNJbiA9IF9jdXJyeTEoZnVuY3Rpb24ga2V5c0luKG9iaikge1xuICAgICAgICB2YXIgcHJvcCwga3MgPSBbXTtcbiAgICAgICAgZm9yIChwcm9wIGluIG9iaikge1xuICAgICAgICAgICAga3Nba3MubGVuZ3RoXSA9IHByb3A7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGtzO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBhcnJheSBieSByZXR1cm5pbmcgYGxpc3QubGVuZ3RoYC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMy4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBpbnNwZWN0LlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIGxlbmd0aCBvZiB0aGUgYXJyYXkuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5sZW5ndGgoW10pOyAvLz0+IDBcbiAgICAgKiAgICAgIFIubGVuZ3RoKFsxLCAyLCAzXSk7IC8vPT4gM1xuICAgICAqL1xuICAgIHZhciBsZW5ndGggPSBfY3VycnkxKGZ1bmN0aW9uIGxlbmd0aChsaXN0KSB7XG4gICAgICAgIHJldHVybiBsaXN0ICE9IG51bGwgJiYgaXMoTnVtYmVyLCBsaXN0Lmxlbmd0aCkgPyBsaXN0Lmxlbmd0aCA6IE5hTjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBmaXJzdCBhcmd1bWVudCBpcyBsZXNzIHRoYW4gdGhlIHNlY29uZDtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmd0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5sdCgyLCAxKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5sdCgyLCAyKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5sdCgyLCAzKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmx0KCdhJywgJ3onKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmx0KCd6JywgJ2EnKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBsdCA9IF9jdXJyeTIoZnVuY3Rpb24gbHQoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8IGI7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZmlyc3QgYXJndW1lbnQgaXMgbGVzcyB0aGFuIG9yIGVxdWFsIHRvIHRoZSBzZWNvbmQ7XG4gICAgICogYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgT3JkIGEgPT4gYSAtPiBhIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAc2VlIFIuZ3RlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5sdGUoMiwgMSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIubHRlKDIsIDIpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIubHRlKDIsIDMpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIubHRlKCdhJywgJ3onKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmx0ZSgneicsICdhJyk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgbHRlID0gX2N1cnJ5MihmdW5jdGlvbiBsdGUoYSwgYikge1xuICAgICAgICByZXR1cm4gYSA8PSBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1hcEFjY3VtIGZ1bmN0aW9uIGJlaGF2ZXMgbGlrZSBhIGNvbWJpbmF0aW9uIG9mIG1hcCBhbmQgcmVkdWNlOyBpdCBhcHBsaWVzIGFcbiAgICAgKiBmdW5jdGlvbiB0byBlYWNoIGVsZW1lbnQgb2YgYSBsaXN0LCBwYXNzaW5nIGFuIGFjY3VtdWxhdGluZyBwYXJhbWV0ZXIgZnJvbSBsZWZ0IHRvXG4gICAgICogcmlnaHQsIGFuZCByZXR1cm5pbmcgYSBmaW5hbCB2YWx1ZSBvZiB0aGlzIGFjY3VtdWxhdG9yIHRvZ2V0aGVyIHdpdGggdGhlIG5ldyBsaXN0LlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byBhcmd1bWVudHMsICphY2MqIGFuZCAqdmFsdWUqLCBhbmQgc2hvdWxkIHJldHVyblxuICAgICAqIGEgdHVwbGUgKlthY2MsIHZhbHVlXSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEwLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGFjYyAtPiB4IC0+IChhY2MsIHkpKSAtPiBhY2MgLT4gW3hdIC0+IChhY2MsIFt5XSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gYmUgY2FsbGVkIG9uIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlIGlucHV0IGBsaXN0YC5cbiAgICAgKiBAcGFyYW0geyp9IGFjYyBUaGUgYWNjdW11bGF0b3IgdmFsdWUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7Kn0gVGhlIGZpbmFsLCBhY2N1bXVsYXRlZCB2YWx1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZGlnaXRzID0gWycxJywgJzInLCAnMycsICc0J107XG4gICAgICogICAgICB2YXIgYXBwZW5kID0gKGEsIGIpID0+IFthICsgYiwgYSArIGJdO1xuICAgICAqXG4gICAgICogICAgICBSLm1hcEFjY3VtKGFwcGVuZCwgMCwgZGlnaXRzKTsgLy89PiBbJzAxMjM0JywgWycwMScsICcwMTInLCAnMDEyMycsICcwMTIzNCddXVxuICAgICAqL1xuICAgIHZhciBtYXBBY2N1bSA9IF9jdXJyeTMoZnVuY3Rpb24gbWFwQWNjdW0oZm4sIGFjYywgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGgsIHJlc3VsdCA9IFtdLCB0dXBsZSA9IFthY2NdO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICB0dXBsZSA9IGZuKHR1cGxlWzBdLCBsaXN0W2lkeF0pO1xuICAgICAgICAgICAgcmVzdWx0W2lkeF0gPSB0dXBsZVsxXTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBbXG4gICAgICAgICAgICB0dXBsZVswXSxcbiAgICAgICAgICAgIHJlc3VsdFxuICAgICAgICBdO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGhlIG1hcEFjY3VtUmlnaHQgZnVuY3Rpb24gYmVoYXZlcyBsaWtlIGEgY29tYmluYXRpb24gb2YgbWFwIGFuZCByZWR1Y2U7IGl0IGFwcGxpZXMgYVxuICAgICAqIGZ1bmN0aW9uIHRvIGVhY2ggZWxlbWVudCBvZiBhIGxpc3QsIHBhc3NpbmcgYW4gYWNjdW11bGF0aW5nIHBhcmFtZXRlciBmcm9tIHJpZ2h0XG4gICAgICogdG8gbGVmdCwgYW5kIHJldHVybmluZyBhIGZpbmFsIHZhbHVlIG9mIHRoaXMgYWNjdW11bGF0b3IgdG9nZXRoZXIgd2l0aCB0aGUgbmV3IGxpc3QuXG4gICAgICpcbiAgICAgKiBTaW1pbGFyIHRvIGBtYXBBY2N1bWAsIGV4Y2VwdCBtb3ZlcyB0aHJvdWdoIHRoZSBpbnB1dCBsaXN0IGZyb20gdGhlIHJpZ2h0IHRvIHRoZVxuICAgICAqIGxlZnQuXG4gICAgICpcbiAgICAgKiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24gcmVjZWl2ZXMgdHdvIGFyZ3VtZW50cywgKmFjYyogYW5kICp2YWx1ZSosIGFuZCBzaG91bGQgcmV0dXJuXG4gICAgICogYSB0dXBsZSAqW2FjYywgdmFsdWVdKi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTAuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYWNjIC0+IHggLT4gKGFjYywgeSkpIC0+IGFjYyAtPiBbeF0gLT4gKGFjYywgW3ldKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBkaWdpdHMgPSBbJzEnLCAnMicsICczJywgJzQnXTtcbiAgICAgKiAgICAgIHZhciBhcHBlbmQgPSAoYSwgYikgPT4gW2EgKyBiLCBhICsgYl07XG4gICAgICpcbiAgICAgKiAgICAgIFIubWFwQWNjdW1SaWdodChhcHBlbmQsIDAsIGRpZ2l0cyk7IC8vPT4gWycwNDMyMScsIFsnMDQzMjEnLCAnMDQzMicsICcwNDMnLCAnMDQnXV1cbiAgICAgKi9cbiAgICB2YXIgbWFwQWNjdW1SaWdodCA9IF9jdXJyeTMoZnVuY3Rpb24gbWFwQWNjdW1SaWdodChmbiwgYWNjLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDEsIHJlc3VsdCA9IFtdLCB0dXBsZSA9IFthY2NdO1xuICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHR1cGxlID0gZm4odHVwbGVbMF0sIGxpc3RbaWR4XSk7XG4gICAgICAgICAgICByZXN1bHRbaWR4XSA9IHR1cGxlWzFdO1xuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHR1cGxlWzBdLFxuICAgICAgICAgICAgcmVzdWx0XG4gICAgICAgIF07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyBhIHJlZ3VsYXIgZXhwcmVzc2lvbiBhZ2FpbnN0IGEgU3RyaW5nLiBOb3RlIHRoYXQgdGhpcyBmdW5jdGlvblxuICAgICAqIHdpbGwgcmV0dXJuIGFuIGVtcHR5IGFycmF5IHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoZXMuIFRoaXMgZGlmZmVyc1xuICAgICAqIGZyb20gW2BTdHJpbmcucHJvdG90eXBlLm1hdGNoYF0oaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvU3RyaW5nL21hdGNoKVxuICAgICAqIHdoaWNoIHJldHVybnMgYG51bGxgIHdoZW4gdGhlcmUgYXJlIG5vIG1hdGNoZXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBzZWUgUi50ZXN0XG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgUmVnRXhwIC0+IFN0cmluZyAtPiBbU3RyaW5nIHwgVW5kZWZpbmVkXVxuICAgICAqIEBwYXJhbSB7UmVnRXhwfSByeCBBIHJlZ3VsYXIgZXhwcmVzc2lvbi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbWF0Y2ggYWdhaW5zdFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBtYXRjaGVzIG9yIGVtcHR5IGFycmF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWF0Y2goLyhbYS16XWEpL2csICdiYW5hbmFzJyk7IC8vPT4gWydiYScsICduYScsICduYSddXG4gICAgICogICAgICBSLm1hdGNoKC9hLywgJ2InKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5tYXRjaCgvYS8sIG51bGwpOyAvLz0+IFR5cGVFcnJvcjogbnVsbCBkb2VzIG5vdCBoYXZlIGEgbWV0aG9kIG5hbWVkIFwibWF0Y2hcIlxuICAgICAqL1xuICAgIHZhciBtYXRjaCA9IF9jdXJyeTIoZnVuY3Rpb24gbWF0Y2gocngsIHN0cikge1xuICAgICAgICByZXR1cm4gc3RyLm1hdGNoKHJ4KSB8fCBbXTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIG1hdGhNb2QgYmVoYXZlcyBsaWtlIHRoZSBtb2R1bG8gb3BlcmF0b3Igc2hvdWxkIG1hdGhlbWF0aWNhbGx5LCB1bmxpa2UgdGhlIGAlYFxuICAgICAqIG9wZXJhdG9yIChhbmQgYnkgZXh0ZW5zaW9uLCBSLm1vZHVsbykuIFNvIHdoaWxlIFwiLTE3ICUgNVwiIGlzIC0yLFxuICAgICAqIG1hdGhNb2QoLTE3LCA1KSBpcyAzLiBtYXRoTW9kIHJlcXVpcmVzIEludGVnZXIgYXJndW1lbnRzLCBhbmQgcmV0dXJucyBOYU5cbiAgICAgKiB3aGVuIHRoZSBtb2R1bHVzIGlzIHplcm8gb3IgbmVnYXRpdmUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjMuMFxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBtIFRoZSBkaXZpZGVuZC5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gcCB0aGUgbW9kdWx1cy5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGIgbW9kIGFgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWF0aE1vZCgtMTcsIDUpOyAgLy89PiAzXG4gICAgICogICAgICBSLm1hdGhNb2QoMTcsIDUpOyAgIC8vPT4gMlxuICAgICAqICAgICAgUi5tYXRoTW9kKDE3LCAtNSk7ICAvLz0+IE5hTlxuICAgICAqICAgICAgUi5tYXRoTW9kKDE3LCAwKTsgICAvLz0+IE5hTlxuICAgICAqICAgICAgUi5tYXRoTW9kKDE3LjIsIDUpOyAvLz0+IE5hTlxuICAgICAqICAgICAgUi5tYXRoTW9kKDE3LCA1LjMpOyAvLz0+IE5hTlxuICAgICAqXG4gICAgICogICAgICB2YXIgY2xvY2sgPSBSLm1hdGhNb2QoUi5fXywgMTIpO1xuICAgICAqICAgICAgY2xvY2soMTUpOyAvLz0+IDNcbiAgICAgKiAgICAgIGNsb2NrKDI0KTsgLy89PiAwXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzZXZlbnRlZW5Nb2QgPSBSLm1hdGhNb2QoMTcpO1xuICAgICAqICAgICAgc2V2ZW50ZWVuTW9kKDMpOyAgLy89PiAyXG4gICAgICogICAgICBzZXZlbnRlZW5Nb2QoNCk7ICAvLz0+IDFcbiAgICAgKiAgICAgIHNldmVudGVlbk1vZCgxMCk7IC8vPT4gN1xuICAgICAqL1xuICAgIHZhciBtYXRoTW9kID0gX2N1cnJ5MihmdW5jdGlvbiBtYXRoTW9kKG0sIHApIHtcbiAgICAgICAgaWYgKCFfaXNJbnRlZ2VyKG0pKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIGlmICghX2lzSW50ZWdlcihwKSB8fCBwIDwgMSkge1xuICAgICAgICAgICAgcmV0dXJuIE5hTjtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKG0gJSBwICsgcCkgJSBwO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFyZ2VyIG9mIGl0cyB0d28gYXJndW1lbnRzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBhID0+IGEgLT4gYSAtPiBhXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIubWF4QnksIFIubWluXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tYXgoNzg5LCAxMjMpOyAvLz0+IDc4OVxuICAgICAqICAgICAgUi5tYXgoJ2EnLCAnYicpOyAvLz0+ICdiJ1xuICAgICAqL1xuICAgIHZhciBtYXggPSBfY3VycnkyKGZ1bmN0aW9uIG1heChhLCBiKSB7XG4gICAgICAgIHJldHVybiBiID4gYSA/IGIgOiBhO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBmdW5jdGlvbiBhbmQgdHdvIHZhbHVlcywgYW5kIHJldHVybnMgd2hpY2hldmVyIHZhbHVlIHByb2R1Y2VzXG4gICAgICogdGhlIGxhcmdlciByZXN1bHQgd2hlbiBwYXNzZWQgdG8gdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC44LjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIE9yZCBiID0+IChhIC0+IGIpIC0+IGEgLT4gYSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLm1heCwgUi5taW5CeVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vICBzcXVhcmUgOjogTnVtYmVyIC0+IE51bWJlclxuICAgICAqICAgICAgdmFyIHNxdWFyZSA9IG4gPT4gbiAqIG47XG4gICAgICpcbiAgICAgKiAgICAgIFIubWF4Qnkoc3F1YXJlLCAtMywgMik7IC8vPT4gLTNcbiAgICAgKlxuICAgICAqICAgICAgUi5yZWR1Y2UoUi5tYXhCeShzcXVhcmUpLCAwLCBbMywgLTUsIDQsIDEsIC0yXSk7IC8vPT4gLTVcbiAgICAgKiAgICAgIFIucmVkdWNlKFIubWF4Qnkoc3F1YXJlKSwgMCwgW10pOyAvLz0+IDBcbiAgICAgKi9cbiAgICB2YXIgbWF4QnkgPSBfY3VycnkzKGZ1bmN0aW9uIG1heEJ5KGYsIGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGYoYikgPiBmKGEpID8gYiA6IGE7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgb2JqZWN0IHdpdGggdGhlIG93biBwcm9wZXJ0aWVzIG9mIGBhYFxuICAgICAqIG1lcmdlZCB3aXRoIHRoZSBvd24gcHJvcGVydGllcyBvZiBvYmplY3QgYGJgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7azogdn0gLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBhXG4gICAgICogQHBhcmFtIHtPYmplY3R9IGJcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tZXJnZSh7ICduYW1lJzogJ2ZyZWQnLCAnYWdlJzogMTAgfSwgeyAnYWdlJzogNDAgfSk7XG4gICAgICogICAgICAvLz0+IHsgJ25hbWUnOiAnZnJlZCcsICdhZ2UnOiA0MCB9XG4gICAgICpcbiAgICAgKiAgICAgIHZhciByZXNldFRvRGVmYXVsdCA9IFIubWVyZ2UoUi5fXywge3g6IDB9KTtcbiAgICAgKiAgICAgIHJlc2V0VG9EZWZhdWx0KHt4OiA1LCB5OiAyfSk7IC8vPT4ge3g6IDAsIHk6IDJ9XG4gICAgICovXG4gICAgdmFyIG1lcmdlID0gX2N1cnJ5MihmdW5jdGlvbiBtZXJnZShhLCBiKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgdmFyIGtzID0ga2V5cyhhKTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrc1tpZHhdXSA9IGFba3NbaWR4XV07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICBrcyA9IGtleXMoYik7XG4gICAgICAgIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdFtrc1tpZHhdXSA9IGJba3NbaWR4XV07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgc21hbGxlciBvZiBpdHMgdHdvIGFyZ3VtZW50cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYSA9PiBhIC0+IGEgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0gYVxuICAgICAqIEBwYXJhbSB7Kn0gYlxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLm1pbkJ5LCBSLm1heFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWluKDc4OSwgMTIzKTsgLy89PiAxMjNcbiAgICAgKiAgICAgIFIubWluKCdhJywgJ2InKTsgLy89PiAnYSdcbiAgICAgKi9cbiAgICB2YXIgbWluID0gX2N1cnJ5MihmdW5jdGlvbiBtaW4oYSwgYikge1xuICAgICAgICByZXR1cm4gYiA8IGEgPyBiIDogYTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgZnVuY3Rpb24gYW5kIHR3byB2YWx1ZXMsIGFuZCByZXR1cm5zIHdoaWNoZXZlciB2YWx1ZSBwcm9kdWNlc1xuICAgICAqIHRoZSBzbWFsbGVyIHJlc3VsdCB3aGVuIHBhc3NlZCB0byB0aGUgcHJvdmlkZWQgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjguMFxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgT3JkIGIgPT4gKGEgLT4gYikgLT4gYSAtPiBhIC0+IGFcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gICAgICogQHBhcmFtIHsqfSBhXG4gICAgICogQHBhcmFtIHsqfSBiXG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIubWluLCBSLm1heEJ5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gIHNxdWFyZSA6OiBOdW1iZXIgLT4gTnVtYmVyXG4gICAgICogICAgICB2YXIgc3F1YXJlID0gbiA9PiBuICogbjtcbiAgICAgKlxuICAgICAqICAgICAgUi5taW5CeShzcXVhcmUsIC0zLCAyKTsgLy89PiAyXG4gICAgICpcbiAgICAgKiAgICAgIFIucmVkdWNlKFIubWluQnkoc3F1YXJlKSwgSW5maW5pdHksIFszLCAtNSwgNCwgMSwgLTJdKTsgLy89PiAxXG4gICAgICogICAgICBSLnJlZHVjZShSLm1pbkJ5KHNxdWFyZSksIEluZmluaXR5LCBbXSk7IC8vPT4gSW5maW5pdHlcbiAgICAgKi9cbiAgICB2YXIgbWluQnkgPSBfY3VycnkzKGZ1bmN0aW9uIG1pbkJ5KGYsIGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGYoYikgPCBmKGEpID8gYiA6IGE7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEaXZpZGVzIHRoZSBzZWNvbmQgcGFyYW1ldGVyIGJ5IHRoZSBmaXJzdCBhbmQgcmV0dXJucyB0aGUgcmVtYWluZGVyLlxuICAgICAqIE5vdGUgdGhhdCB0aGlzIGZ1bmN0aW9uIHByZXNlcnZlcyB0aGUgSmF2YVNjcmlwdC1zdHlsZSBiZWhhdmlvciBmb3JcbiAgICAgKiBtb2R1bG8uIEZvciBtYXRoZW1hdGljYWwgbW9kdWxvIHNlZSBgbWF0aE1vZGAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMVxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBhIFRoZSB2YWx1ZSB0byB0aGUgZGl2aWRlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBwc2V1ZG8tbW9kdWx1c1xuICAgICAqIEByZXR1cm4ge051bWJlcn0gVGhlIHJlc3VsdCBvZiBgYiAlIGFgLlxuICAgICAqIEBzZWUgUi5tYXRoTW9kXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tb2R1bG8oMTcsIDMpOyAvLz0+IDJcbiAgICAgKiAgICAgIC8vIEpTIGJlaGF2aW9yOlxuICAgICAqICAgICAgUi5tb2R1bG8oLTE3LCAzKTsgLy89PiAtMlxuICAgICAqICAgICAgUi5tb2R1bG8oMTcsIC0zKTsgLy89PiAyXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBpc09kZCA9IFIubW9kdWxvKFIuX18sIDIpO1xuICAgICAqICAgICAgaXNPZGQoNDIpOyAvLz0+IDBcbiAgICAgKiAgICAgIGlzT2RkKDIxKTsgLy89PiAxXG4gICAgICovXG4gICAgdmFyIG1vZHVsbyA9IF9jdXJyeTIoZnVuY3Rpb24gbW9kdWxvKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgJSBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTXVsdGlwbGllcyB0d28gbnVtYmVycy4gRXF1aXZhbGVudCB0byBgYSAqIGJgIGJ1dCBjdXJyaWVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTWF0aFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYSBUaGUgZmlyc3QgdmFsdWUuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGIgVGhlIHNlY29uZCB2YWx1ZS5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSByZXN1bHQgb2YgYGEgKiBiYC5cbiAgICAgKiBAc2VlIFIuZGl2aWRlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRvdWJsZSA9IFIubXVsdGlwbHkoMik7XG4gICAgICogICAgICB2YXIgdHJpcGxlID0gUi5tdWx0aXBseSgzKTtcbiAgICAgKiAgICAgIGRvdWJsZSgzKTsgICAgICAgLy89PiAgNlxuICAgICAqICAgICAgdHJpcGxlKDQpOyAgICAgICAvLz0+IDEyXG4gICAgICogICAgICBSLm11bHRpcGx5KDIsIDUpOyAgLy89PiAxMFxuICAgICAqL1xuICAgIHZhciBtdWx0aXBseSA9IF9jdXJyeTIoZnVuY3Rpb24gbXVsdGlwbHkoYSwgYikge1xuICAgICAgICByZXR1cm4gYSAqIGI7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhIGZ1bmN0aW9uIG9mIGFueSBhcml0eSAoaW5jbHVkaW5nIG51bGxhcnkpIGluIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGV4YWN0bHkgYG5gXG4gICAgICogcGFyYW1ldGVycy4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBkZXNpcmVkIGFyaXR5IG9mIHRoZSBuZXcgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIGBmbmAuIFRoZSBuZXcgZnVuY3Rpb24gaXMgZ3VhcmFudGVlZCB0byBiZSBvZlxuICAgICAqICAgICAgICAgYXJpdHkgYG5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSAoYSwgYikgPT4gW2EsIGJdO1xuICAgICAqXG4gICAgICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAgICAgKiAgICAgIHRha2VzVHdvQXJncygxLCAyKTsgLy89PiBbMSwgMl1cbiAgICAgKlxuICAgICAqICAgICAgdmFyIHRha2VzT25lQXJnID0gUi5uQXJ5KDEsIHRha2VzVHdvQXJncyk7XG4gICAgICogICAgICB0YWtlc09uZUFyZy5sZW5ndGg7IC8vPT4gMVxuICAgICAqICAgICAgLy8gT25seSBgbmAgYXJndW1lbnRzIGFyZSBwYXNzZWQgdG8gdGhlIHdyYXBwZWQgZnVuY3Rpb25cbiAgICAgKiAgICAgIHRha2VzT25lQXJnKDEsIDIpOyAvLz0+IFsxLCB1bmRlZmluZWRdXG4gICAgICovXG4gICAgdmFyIG5BcnkgPSBfY3VycnkyKGZ1bmN0aW9uIG5BcnkobiwgZm4pIHtcbiAgICAgICAgc3dpdGNoIChuKSB7XG4gICAgICAgIGNhc2UgMDpcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTApO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSAzOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMik7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA1OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA2OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA4OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgY2FzZSA5OlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmNhbGwodGhpcywgYTAsIGExLCBhMiwgYTMsIGE0LCBhNSwgYTYsIGE3LCBhOCk7XG4gICAgICAgICAgICB9O1xuICAgICAgICBjYXNlIDEwOlxuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIChhMCwgYTEsIGEyLCBhMywgYTQsIGE1LCBhNiwgYTcsIGE4LCBhOSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbi5jYWxsKHRoaXMsIGEwLCBhMSwgYTIsIGEzLCBhNCwgYTUsIGE2LCBhNywgYTgsIGE5KTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IHRvIG5BcnkgbXVzdCBiZSBhIG5vbi1uZWdhdGl2ZSBpbnRlZ2VyIG5vIGdyZWF0ZXIgdGhhbiB0ZW4nKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTmVnYXRlcyBpdHMgYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5uZWdhdGUoNDIpOyAvLz0+IC00MlxuICAgICAqL1xuICAgIHZhciBuZWdhdGUgPSBfY3VycnkxKGZ1bmN0aW9uIG5lZ2F0ZShuKSB7XG4gICAgICAgIHJldHVybiAtbjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCByZXR1cm5zIHRoZSBgIWAgb2YgaXRzIGFyZ3VtZW50LiBJdCB3aWxsIHJldHVybiBgdHJ1ZWAgd2hlblxuICAgICAqIHBhc3NlZCBmYWxzZS15IHZhbHVlLCBhbmQgYGZhbHNlYCB3aGVuIHBhc3NlZCBhIHRydXRoLXkgb25lLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTG9naWNcbiAgICAgKiBAc2lnICogLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7Kn0gYSBhbnkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufSB0aGUgbG9naWNhbCBpbnZlcnNlIG9mIHBhc3NlZCBhcmd1bWVudC5cbiAgICAgKiBAc2VlIFIuY29tcGxlbWVudFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubm90KHRydWUpOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLm5vdChmYWxzZSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5ub3QoMCk7ID0+IHRydWVcbiAgICAgKiAgICAgIFIubm90KDEpOyA9PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBub3QgPSBfY3VycnkxKGZ1bmN0aW9uIG5vdChhKSB7XG4gICAgICAgIHJldHVybiAhYTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG50aCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZy5cbiAgICAgKiBJZiBuIGlzIG5lZ2F0aXZlIHRoZSBlbGVtZW50IGF0IGluZGV4IGxlbmd0aCArIG4gaXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAgICAgKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG9mZnNldFxuICAgICAqIEBwYXJhbSB7Kn0gbGlzdFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGxpc3QgPSBbJ2ZvbycsICdiYXInLCAnYmF6JywgJ3F1dXgnXTtcbiAgICAgKiAgICAgIFIubnRoKDEsIGxpc3QpOyAvLz0+ICdiYXInXG4gICAgICogICAgICBSLm50aCgtMSwgbGlzdCk7IC8vPT4gJ3F1dXgnXG4gICAgICogICAgICBSLm50aCgtOTksIGxpc3QpOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogICAgICBSLm50aCgnYWJjJywgMik7IC8vPT4gJ2MnXG4gICAgICogICAgICBSLm50aCgnYWJjJywgMyk7IC8vPT4gJydcbiAgICAgKi9cbiAgICB2YXIgbnRoID0gX2N1cnJ5MihmdW5jdGlvbiBudGgob2Zmc2V0LCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSBvZmZzZXQgPCAwID8gbGlzdC5sZW5ndGggKyBvZmZzZXQgOiBvZmZzZXQ7XG4gICAgICAgIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LmNoYXJBdChpZHgpIDogbGlzdFtpZHhdO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHdoaWNoIHJldHVybnMgaXRzIG50aCBhcmd1bWVudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOS4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyBOdW1iZXIgLT4gKi4uLiAtPiAqXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLm50aEFyZygxKSgnYScsICdiJywgJ2MnKTsgLy89PiAnYidcbiAgICAgKiAgICAgIFIubnRoQXJnKC0xKSgnYScsICdiJywgJ2MnKTsgLy89PiAnYydcbiAgICAgKi9cbiAgICB2YXIgbnRoQXJnID0gX2N1cnJ5MShmdW5jdGlvbiBudGhBcmcobikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIG50aChuLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhbiBvYmplY3QgY29udGFpbmluZyBhIHNpbmdsZSBrZXk6dmFsdWUgcGFpci5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTguMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBhIC0+IHtTdHJpbmc6YX1cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30ga2V5XG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9XG4gICAgICogQHNlZSBSLnBhaXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWF0Y2hQaHJhc2VzID0gUi5jb21wb3NlKFxuICAgICAqICAgICAgICBSLm9iak9mKCdtdXN0JyksXG4gICAgICogICAgICAgIFIubWFwKFIub2JqT2YoJ21hdGNoX3BocmFzZScpKVxuICAgICAqICAgICAgKTtcbiAgICAgKiAgICAgIG1hdGNoUGhyYXNlcyhbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IHttdXN0OiBbe21hdGNoX3BocmFzZTogJ2Zvbyd9LCB7bWF0Y2hfcGhyYXNlOiAnYmFyJ30sIHttYXRjaF9waHJhc2U6ICdiYXonfV19XG4gICAgICovXG4gICAgdmFyIG9iak9mID0gX2N1cnJ5MihmdW5jdGlvbiBvYmpPZihrZXksIHZhbCkge1xuICAgICAgICB2YXIgb2JqID0ge307XG4gICAgICAgIG9ialtrZXldID0gdmFsO1xuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHNpbmdsZXRvbiBhcnJheSBjb250YWluaW5nIHRoZSB2YWx1ZSBwcm92aWRlZC5cbiAgICAgKlxuICAgICAqIE5vdGUgdGhpcyBgb2ZgIGlzIGRpZmZlcmVudCBmcm9tIHRoZSBFUzYgYG9mYDsgU2VlXG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvb2ZcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMy4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyBhIC0+IFthXVxuICAgICAqIEBwYXJhbSB7Kn0geCBhbnkgdmFsdWVcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgd3JhcHBpbmcgYHhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIub2YobnVsbCk7IC8vPT4gW251bGxdXG4gICAgICogICAgICBSLm9mKFs0Ml0pOyAvLz0+IFtbNDJdXVxuICAgICAqL1xuICAgIHZhciBvZiA9IF9jdXJyeTEoX29mKTtcblxuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYSBmdW5jdGlvbiBgZm5gIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBndWFyZHMgaW52b2NhdGlvbiBvZiBgZm5gIHN1Y2ggdGhhdFxuICAgICAqIGBmbmAgY2FuIG9ubHkgZXZlciBiZSBjYWxsZWQgb25jZSwgbm8gbWF0dGVyIGhvdyBtYW55IHRpbWVzIHRoZSByZXR1cm5lZCBmdW5jdGlvbiBpc1xuICAgICAqIGludm9rZWQuIFRoZSBmaXJzdCB2YWx1ZSBjYWxjdWxhdGVkIGlzIHJldHVybmVkIGluIHN1YnNlcXVlbnQgaW52b2NhdGlvbnMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKGEuLi4gLT4gYikgLT4gKGEuLi4gLT4gYilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcCBpbiBhIGNhbGwtb25seS1vbmNlIHdyYXBwZXIuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSB3cmFwcGVkIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhZGRPbmVPbmNlID0gUi5vbmNlKHggPT4geCArIDEpO1xuICAgICAqICAgICAgYWRkT25lT25jZSgxMCk7IC8vPT4gMTFcbiAgICAgKiAgICAgIGFkZE9uZU9uY2UoYWRkT25lT25jZSg1MCkpOyAvLz0+IDExXG4gICAgICovXG4gICAgdmFyIG9uY2UgPSBfY3VycnkxKGZ1bmN0aW9uIG9uY2UoZm4pIHtcbiAgICAgICAgdmFyIGNhbGxlZCA9IGZhbHNlLCByZXN1bHQ7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGVkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNhbGxlZCA9IHRydWU7XG4gICAgICAgICAgICByZXN1bHQgPSBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIG9uZSBvciBib3RoIG9mIGl0cyBhcmd1bWVudHMgYXJlIGB0cnVlYC4gUmV0dXJucyBgZmFsc2VgXG4gICAgICogaWYgYm90aCBhcmd1bWVudHMgYXJlIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKiAtPiAqIC0+ICpcbiAgICAgKiBAcGFyYW0ge0Jvb2xlYW59IGEgQSBib29sZWFuIHZhbHVlXG4gICAgICogQHBhcmFtIHtCb29sZWFufSBiIEEgYm9vbGVhbiB2YWx1ZVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBvbmUgb3IgYm90aCBhcmd1bWVudHMgYXJlIGB0cnVlYCwgYGZhbHNlYCBvdGhlcndpc2VcbiAgICAgKiBAc2VlIFIuZWl0aGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5vcih0cnVlLCB0cnVlKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLm9yKHRydWUsIGZhbHNlKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLm9yKGZhbHNlLCB0cnVlKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLm9yKGZhbHNlLCBmYWxzZSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgb3IgPSBfY3VycnkyKGZ1bmN0aW9uIG9yKGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgfHwgYjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHJlc3VsdCBvZiBcInNldHRpbmdcIiB0aGUgcG9ydGlvbiBvZiB0aGUgZ2l2ZW4gZGF0YSBzdHJ1Y3R1cmVcbiAgICAgKiBmb2N1c2VkIGJ5IHRoZSBnaXZlbiBsZW5zIHRvIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgdGhlIGdpdmVuIGZ1bmN0aW9uIHRvXG4gICAgICogdGhlIGZvY3VzZWQgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE2LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAgICAgKiBAc2lnIExlbnMgcyBhIC0+IChhIC0+IGEpIC0+IHMgLT4gc1xuICAgICAqIEBwYXJhbSB7TGVuc30gbGVuc1xuICAgICAqIEBwYXJhbSB7Kn0gdlxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLnByb3AsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGhlYWRMZW5zID0gUi5sZW5zSW5kZXgoMCk7XG4gICAgICpcbiAgICAgKiAgICAgIFIub3ZlcihoZWFkTGVucywgUi50b1VwcGVyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnRk9PJywgJ2JhcicsICdiYXonXVxuICAgICAqL1xuICAgIHZhciBvdmVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgSWRlbnRpdHkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICB2YWx1ZTogeCxcbiAgICAgICAgICAgICAgICBtYXA6IGZ1bmN0aW9uIChmKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBJZGVudGl0eShmKHgpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MyhmdW5jdGlvbiBvdmVyKGxlbnMsIGYsIHgpIHtcbiAgICAgICAgICAgIHJldHVybiBsZW5zKGZ1bmN0aW9uICh5KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIElkZW50aXR5KGYoeSkpO1xuICAgICAgICAgICAgfSkoeCkudmFsdWU7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIHR3byBhcmd1bWVudHMsIGBmc3RgIGFuZCBgc25kYCwgYW5kIHJldHVybnMgYFtmc3QsIHNuZF1gLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xOC4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gYiAtPiAoYSxiKVxuICAgICAqIEBwYXJhbSB7Kn0gZnN0XG4gICAgICogQHBhcmFtIHsqfSBzbmRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKiBAc2VlIFIuY3JlYXRlTWFwRW50cnksIFIub2ZcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBwYWlyKCdmb28nLCAnYmFyJyk7IC8vPT4gWydmb28nLCAnYmFyJ11cbiAgICAgKi9cbiAgICB2YXIgcGFpciA9IF9jdXJyeTIoZnVuY3Rpb24gcGFpcihmc3QsIHNuZCkge1xuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgICAgZnN0LFxuICAgICAgICAgICAgc25kXG4gICAgICAgIF07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXRyaWV2ZSB0aGUgdmFsdWUgYXQgYSBnaXZlbiBwYXRoLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBbU3RyaW5nXSAtPiB7azogdn0gLT4gdiB8IFVuZGVmaW5lZFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggdG8gdXNlLlxuICAgICAqIEByZXR1cm4geyp9IFRoZSBkYXRhIGF0IGBwYXRoYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnBhdGgoWydhJywgJ2InXSwge2E6IHtiOiAyfX0pOyAvLz0+IDJcbiAgICAgKiAgICAgIFIucGF0aChbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gdW5kZWZpbmVkXG4gICAgICovXG4gICAgdmFyIHBhdGggPSBfY3VycnkyKGZ1bmN0aW9uIHBhdGgocGF0aHMsIG9iaikge1xuICAgICAgICBpZiAob2JqID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmo7XG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgICAgIHdoaWxlICh2YWwgIT0gbnVsbCAmJiBpZHggPCBwYXRocy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSB2YWxbcGF0aHNbaWR4XV07XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICB9XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgZ2l2ZW4sIG5vbi1udWxsIG9iamVjdCBoYXMgYSB2YWx1ZSBhdCB0aGUgZ2l2ZW4gcGF0aCwgcmV0dXJuc1xuICAgICAqIHRoZSB2YWx1ZSBhdCB0aGF0IHBhdGguIE90aGVyd2lzZSByZXR1cm5zIHRoZSBwcm92aWRlZCBkZWZhdWx0IHZhbHVlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xOC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgYSAtPiBbU3RyaW5nXSAtPiBPYmplY3QgLT4gYVxuICAgICAqIEBwYXJhbSB7Kn0gZCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwIFRoZSBwYXRoIHRvIHVzZS5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZGF0YSBhdCBgcGF0aGAgb2YgdGhlIHN1cHBsaWVkIG9iamVjdCBvciB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnBhdGhPcignTi9BJywgWydhJywgJ2InXSwge2E6IHtiOiAyfX0pOyAvLz0+IDJcbiAgICAgKiAgICAgIFIucGF0aE9yKCdOL0EnLCBbJ2EnLCAnYiddLCB7Yzoge2I6IDJ9fSk7IC8vPT4gXCJOL0FcIlxuICAgICAqL1xuICAgIHZhciBwYXRoT3IgPSBfY3VycnkzKGZ1bmN0aW9uIHBhdGhPcihkLCBwLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIGRlZmF1bHRUbyhkLCBwYXRoKHAsIG9iaikpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHBhcnRpYWwgY29weSBvZiBhbiBvYmplY3QgY29udGFpbmluZyBvbmx5IHRoZSBrZXlzIHNwZWNpZmllZC4gIElmIHRoZSBrZXkgZG9lcyBub3QgZXhpc3QsIHRoZVxuICAgICAqIHByb3BlcnR5IGlzIGlnbm9yZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFtrXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gbmFtZXMgYW4gYXJyYXkgb2YgU3RyaW5nIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkgb250byBhIG5ldyBvYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG9uIGl0LlxuICAgICAqIEBzZWUgUi5vbWl0LCBSLnByb3BzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5waWNrKFsnYScsICdkJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2E6IDEsIGQ6IDR9XG4gICAgICogICAgICBSLnBpY2soWydhJywgJ2UnLCAnZiddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxfVxuICAgICAqL1xuICAgIHZhciBwaWNrID0gX2N1cnJ5MihmdW5jdGlvbiBwaWNrKG5hbWVzLCBvYmopIHtcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IG5hbWVzLmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKG5hbWVzW2lkeF0gaW4gb2JqKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W25hbWVzW2lkeF1dID0gb2JqW25hbWVzW2lkeF1dO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gYHBpY2tgIGV4Y2VwdCB0aGF0IHRoaXMgb25lIGluY2x1ZGVzIGEgYGtleTogdW5kZWZpbmVkYCBwYWlyIGZvciBwcm9wZXJ0aWVzIHRoYXQgZG9uJ3QgZXhpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIFtrXSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gbmFtZXMgYW4gYXJyYXkgb2YgU3RyaW5nIHByb3BlcnR5IG5hbWVzIHRvIGNvcHkgb250byBhIG5ldyBvYmplY3RcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgZnJvbSBgbmFtZXNgIG9uIGl0LlxuICAgICAqIEBzZWUgUi5waWNrXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5waWNrQWxsKFsnYScsICdkJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2E6IDEsIGQ6IDR9XG4gICAgICogICAgICBSLnBpY2tBbGwoWydhJywgJ2UnLCAnZiddLCB7YTogMSwgYjogMiwgYzogMywgZDogNH0pOyAvLz0+IHthOiAxLCBlOiB1bmRlZmluZWQsIGY6IHVuZGVmaW5lZH1cbiAgICAgKi9cbiAgICB2YXIgcGlja0FsbCA9IF9jdXJyeTIoZnVuY3Rpb24gcGlja0FsbChuYW1lcywgb2JqKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBsZW4gPSBuYW1lcy5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBuYW1lID0gbmFtZXNbaWR4XTtcbiAgICAgICAgICAgIHJlc3VsdFtuYW1lXSA9IG9ialtuYW1lXTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgcGFydGlhbCBjb3B5IG9mIGFuIG9iamVjdCBjb250YWluaW5nIG9ubHkgdGhlIGtleXMgdGhhdFxuICAgICAqIHNhdGlzZnkgdGhlIHN1cHBsaWVkIHByZWRpY2F0ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgKHYsIGsgLT4gQm9vbGVhbikgLT4ge2s6IHZ9IC0+IHtrOiB2fVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IGEga2V5XG4gICAgICogICAgICAgIHNob3VsZCBiZSBpbmNsdWRlZCBvbiB0aGUgb3V0cHV0IG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY29weSBmcm9tXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIG5ldyBvYmplY3Qgd2l0aCBvbmx5IHByb3BlcnRpZXMgdGhhdCBzYXRpc2Z5IGBwcmVkYFxuICAgICAqICAgICAgICAgb24gaXQuXG4gICAgICogQHNlZSBSLnBpY2tcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNVcHBlckNhc2UgPSAodmFsLCBrZXkpID0+IGtleS50b1VwcGVyQ2FzZSgpID09PSBrZXk7XG4gICAgICogICAgICBSLnBpY2tCeShpc1VwcGVyQ2FzZSwge2E6IDEsIGI6IDIsIEE6IDMsIEI6IDR9KTsgLy89PiB7QTogMywgQjogNH1cbiAgICAgKi9cbiAgICB2YXIgcGlja0J5ID0gX2N1cnJ5MihmdW5jdGlvbiBwaWNrQnkodGVzdCwgb2JqKSB7XG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICAgICAgZm9yICh2YXIgcHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIGlmICh0ZXN0KG9ialtwcm9wXSwgcHJvcCwgb2JqKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdFtwcm9wXSA9IG9ialtwcm9wXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IHdpdGggdGhlIGdpdmVuIGVsZW1lbnQgYXQgdGhlIGZyb250LCBmb2xsb3dlZCBieSB0aGUgY29udGVudHMgb2YgdGhlXG4gICAgICogbGlzdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7Kn0gZWwgVGhlIGl0ZW0gdG8gYWRkIHRvIHRoZSBoZWFkIG9mIHRoZSBvdXRwdXQgbGlzdC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBhZGQgdG8gdGhlIHRhaWwgb2YgdGhlIG91dHB1dCBsaXN0LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheS5cbiAgICAgKiBAc2VlIFIuYXBwZW5kXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wcmVwZW5kKCdmZWUnLCBbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiBbJ2ZlZScsICdmaScsICdmbycsICdmdW0nXVxuICAgICAqL1xuICAgIHZhciBwcmVwZW5kID0gX2N1cnJ5MihmdW5jdGlvbiBwcmVwZW5kKGVsLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfY29uY2F0KFtlbF0sIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZ1bmN0aW9uIHRoYXQgd2hlbiBzdXBwbGllZCBhbiBvYmplY3QgcmV0dXJucyB0aGUgaW5kaWNhdGVkIHByb3BlcnR5IG9mIHRoYXQgb2JqZWN0LCBpZiBpdCBleGlzdHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHMgLT4ge3M6IGF9IC0+IGEgfCBVbmRlZmluZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcCBUaGUgcHJvcGVydHkgbmFtZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeVxuICAgICAqIEByZXR1cm4geyp9IFRoZSB2YWx1ZSBhdCBgb2JqLnBgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucHJvcCgneCcsIHt4OiAxMDB9KTsgLy89PiAxMDBcbiAgICAgKiAgICAgIFIucHJvcCgneCcsIHt9KTsgLy89PiB1bmRlZmluZWRcbiAgICAgKi9cbiAgICB2YXIgcHJvcCA9IF9jdXJyeTIoZnVuY3Rpb24gcHJvcChwLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9ialtwXTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBnaXZlbiwgbm9uLW51bGwgb2JqZWN0IGhhcyBhbiBvd24gcHJvcGVydHkgd2l0aCB0aGUgc3BlY2lmaWVkIG5hbWUsXG4gICAgICogcmV0dXJucyB0aGUgdmFsdWUgb2YgdGhhdCBwcm9wZXJ0eS5cbiAgICAgKiBPdGhlcndpc2UgcmV0dXJucyB0aGUgcHJvdmlkZWQgZGVmYXVsdCB2YWx1ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuNi4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgYSAtPiBTdHJpbmcgLT4gT2JqZWN0IC0+IGFcbiAgICAgKiBAcGFyYW0geyp9IHZhbCBUaGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gcmV0dXJuLlxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBxdWVyeS5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgdmFsdWUgb2YgZ2l2ZW4gcHJvcGVydHkgb2YgdGhlIHN1cHBsaWVkIG9iamVjdCBvciB0aGUgZGVmYXVsdCB2YWx1ZS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYWxpY2UgPSB7XG4gICAgICogICAgICAgIG5hbWU6ICdBTElDRScsXG4gICAgICogICAgICAgIGFnZTogMTAxXG4gICAgICogICAgICB9O1xuICAgICAqICAgICAgdmFyIGZhdm9yaXRlID0gUi5wcm9wKCdmYXZvcml0ZUxpYnJhcnknKTtcbiAgICAgKiAgICAgIHZhciBmYXZvcml0ZVdpdGhEZWZhdWx0ID0gUi5wcm9wT3IoJ1JhbWRhJywgJ2Zhdm9yaXRlTGlicmFyeScpO1xuICAgICAqXG4gICAgICogICAgICBmYXZvcml0ZShhbGljZSk7ICAvLz0+IHVuZGVmaW5lZFxuICAgICAqICAgICAgZmF2b3JpdGVXaXRoRGVmYXVsdChhbGljZSk7ICAvLz0+ICdSYW1kYSdcbiAgICAgKi9cbiAgICB2YXIgcHJvcE9yID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wT3IodmFsLCBwLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIG9iaiAhPSBudWxsICYmIF9oYXMocCwgb2JqKSA/IG9ialtwXSA6IHZhbDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIHRoZSBzcGVjaWZpZWQgb2JqZWN0IHByb3BlcnR5IHNhdGlzZmllcyB0aGUgZ2l2ZW5cbiAgICAgKiBwcmVkaWNhdGU7IGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNi4wXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBTdHJpbmcgLT4ge1N0cmluZzogYX0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWRcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAc2VlIFIucHJvcEVxXG4gICAgICogQHNlZSBSLnByb3BJc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucHJvcFNhdGlzZmllcyh4ID0+IHggPiAwLCAneCcsIHt4OiAxLCB5OiAyfSk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBwcm9wU2F0aXNmaWVzID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wU2F0aXNmaWVzKHByZWQsIG5hbWUsIG9iaikge1xuICAgICAgICByZXR1cm4gcHJlZChvYmpbbmFtZV0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQWN0cyBhcyBtdWx0aXBsZSBgcHJvcGA6IGFycmF5IG9mIGtleXMgaW4sIGFycmF5IG9mIHZhbHVlcyBvdXQuIFByZXNlcnZlcyBvcmRlci5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgW2tdIC0+IHtrOiB2fSAtPiBbdl1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gZmV0Y2hcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gcXVlcnlcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGNvcnJlc3BvbmRpbmcgdmFsdWVzIG9yIHBhcnRpYWxseSBhcHBsaWVkIGZ1bmN0aW9uLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucHJvcHMoWyd4JywgJ3knXSwge3g6IDEsIHk6IDJ9KTsgLy89PiBbMSwgMl1cbiAgICAgKiAgICAgIFIucHJvcHMoWydjJywgJ2EnLCAnYiddLCB7YjogMiwgYTogMX0pOyAvLz0+IFt1bmRlZmluZWQsIDEsIDJdXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBmdWxsTmFtZSA9IFIuY29tcG9zZShSLmpvaW4oJyAnKSwgUi5wcm9wcyhbJ2ZpcnN0JywgJ2xhc3QnXSkpO1xuICAgICAqICAgICAgZnVsbE5hbWUoe2xhc3Q6ICdCdWxsZXQtVG9vdGgnLCBhZ2U6IDMzLCBmaXJzdDogJ1RvbnknfSk7IC8vPT4gJ1RvbnkgQnVsbGV0LVRvb3RoJ1xuICAgICAqL1xuICAgIHZhciBwcm9wcyA9IF9jdXJyeTIoZnVuY3Rpb24gcHJvcHMocHMsIG9iaikge1xuICAgICAgICB2YXIgbGVuID0gcHMubGVuZ3RoO1xuICAgICAgICB2YXIgb3V0ID0gW107XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBvdXRbaWR4XSA9IG9ialtwc1tpZHhdXTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBudW1iZXJzIGZyb20gYGZyb21gIChpbmNsdXNpdmUpIHRvIGB0b2BcbiAgICAgKiAoZXhjbHVzaXZlKS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gW051bWJlcl1cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJvbSBUaGUgZmlyc3QgbnVtYmVyIGluIHRoZSBsaXN0LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSB0byBPbmUgbW9yZSB0aGFuIHRoZSBsYXN0IG51bWJlciBpbiB0aGUgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgbnVtYmVycyBpbiB0dGhlIHNldCBgW2EsIGIpYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJhbmdlKDEsIDUpOyAgICAvLz0+IFsxLCAyLCAzLCA0XVxuICAgICAqICAgICAgUi5yYW5nZSg1MCwgNTMpOyAgLy89PiBbNTAsIDUxLCA1Ml1cbiAgICAgKi9cbiAgICB2YXIgcmFuZ2UgPSBfY3VycnkyKGZ1bmN0aW9uIHJhbmdlKGZyb20sIHRvKSB7XG4gICAgICAgIGlmICghKF9pc051bWJlcihmcm9tKSAmJiBfaXNOdW1iZXIodG8pKSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignQm90aCBhcmd1bWVudHMgdG8gcmFuZ2UgbXVzdCBiZSBudW1iZXJzJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgbiA9IGZyb207XG4gICAgICAgIHdoaWxlIChuIDwgdG8pIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKG4pO1xuICAgICAgICAgICAgbiArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nIHRoZSBpdGVyYXRvclxuICAgICAqIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kXG4gICAgICogdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAgICAgKlxuICAgICAqIFNpbWlsYXIgdG8gYHJlZHVjZWAsIGV4Y2VwdCBtb3ZlcyB0aHJvdWdoIHRoZSBpbnB1dCBsaXN0IGZyb20gdGhlIHJpZ2h0IHRvIHRoZSBsZWZ0LlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIHR3byB2YWx1ZXM6ICooYWNjLCB2YWx1ZSkqXG4gICAgICpcbiAgICAgKiBOb3RlOiBgUi5yZWR1Y2VSaWdodGAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlIGFycmF5cyksIHVubGlrZVxuICAgICAqIHRoZSBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5yZWR1Y2VgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvcmVkdWNlUmlnaHQjRGVzY3JpcHRpb25cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLGIgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAgICAgKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBwYWlycyA9IFsgWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCAzXSBdO1xuICAgICAqICAgICAgdmFyIGZsYXR0ZW5QYWlycyA9IChhY2MsIHBhaXIpID0+IGFjYy5jb25jYXQocGFpcik7XG4gICAgICpcbiAgICAgKiAgICAgIFIucmVkdWNlUmlnaHQoZmxhdHRlblBhaXJzLCBbXSwgcGFpcnMpOyAvLz0+IFsgJ2MnLCAzLCAnYicsIDIsICdhJywgMSBdXG4gICAgICovXG4gICAgdmFyIHJlZHVjZVJpZ2h0ID0gX2N1cnJ5MyhmdW5jdGlvbiByZWR1Y2VSaWdodChmbiwgYWNjLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSBsaXN0Lmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgYWNjID0gZm4oYWNjLCBsaXN0W2lkeF0pO1xuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSB2YWx1ZSB3cmFwcGVkIHRvIGluZGljYXRlIHRoYXQgaXQgaXMgdGhlIGZpbmFsIHZhbHVlIG9mIHRoZVxuICAgICAqIHJlZHVjZSBhbmQgdHJhbnNkdWNlIGZ1bmN0aW9ucy4gIFRoZSByZXR1cm5lZCB2YWx1ZVxuICAgICAqIHNob3VsZCBiZSBjb25zaWRlcmVkIGEgYmxhY2sgYm94OiB0aGUgaW50ZXJuYWwgc3RydWN0dXJlIGlzIG5vdFxuICAgICAqIGd1YXJhbnRlZWQgdG8gYmUgc3RhYmxlLlxuICAgICAqXG4gICAgICogTm90ZTogdGhpcyBvcHRpbWl6YXRpb24gaXMgdW5hdmFpbGFibGUgdG8gZnVuY3Rpb25zIG5vdCBleHBsaWNpdGx5IGxpc3RlZFxuICAgICAqIGFib3ZlLiAgRm9yIGluc3RhbmNlLCBpdCBpcyBub3QgY3VycmVudGx5IHN1cHBvcnRlZCBieSByZWR1Y2VJbmRleGVkLFxuICAgICAqIHJlZHVjZVJpZ2h0LCBvciByZWR1Y2VSaWdodEluZGV4ZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE1LjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi5yZWR1Y2UsIFIudHJhbnNkdWNlXG4gICAgICogQHNpZyBhIC0+ICpcbiAgICAgKiBAcGFyYW0geyp9IHggVGhlIGZpbmFsIHZhbHVlIG9mIHRoZSByZWR1Y2UuXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHdyYXBwZWQgdmFsdWUuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5yZWR1Y2UoXG4gICAgICogICAgICAgIFIucGlwZShSLmFkZCwgUi53aGVuKFIuZ3RlKFIuX18sIDEwKSwgUi5yZWR1Y2VkKSksXG4gICAgICogICAgICAgIDAsXG4gICAgICogICAgICAgIFsxLCAyLCAzLCA0LCA1XSkgLy8gMTBcbiAgICAgKi9cbiAgICB2YXIgcmVkdWNlZCA9IF9jdXJyeTEoX3JlZHVjZWQpO1xuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlcyB0aGUgc3ViLWxpc3Qgb2YgYGxpc3RgIHN0YXJ0aW5nIGF0IGluZGV4IGBzdGFydGAgYW5kIGNvbnRhaW5pbmdcbiAgICAgKiBgY291bnRgIGVsZW1lbnRzLiAgX05vdGUgdGhhdCB0aGlzIGlzIG5vdCBkZXN0cnVjdGl2ZV86IGl0IHJldHVybnMgYVxuICAgICAqIGNvcHkgb2YgdGhlIGxpc3Qgd2l0aCB0aGUgY2hhbmdlcy5cbiAgICAgKiA8c21hbGw+Tm8gbGlzdHMgaGF2ZSBiZWVuIGhhcm1lZCBpbiB0aGUgYXBwbGljYXRpb24gb2YgdGhpcyBmdW5jdGlvbi48L3NtYWxsPlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjJcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IHN0YXJ0IFRoZSBwb3NpdGlvbiB0byBzdGFydCByZW1vdmluZyBlbGVtZW50c1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBjb3VudCBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJlbW92ZVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gcmVtb3ZlIGZyb21cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgQXJyYXkgd2l0aCBgY291bnRgIGVsZW1lbnRzIGZyb20gYHN0YXJ0YCByZW1vdmVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucmVtb3ZlKDIsIDMsIFsxLDIsMyw0LDUsNiw3LDhdKTsgLy89PiBbMSwyLDYsNyw4XVxuICAgICAqL1xuICAgIHZhciByZW1vdmUgPSBfY3VycnkzKGZ1bmN0aW9uIHJlbW92ZShzdGFydCwgY291bnQsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9jb25jYXQoX3NsaWNlKGxpc3QsIDAsIE1hdGgubWluKHN0YXJ0LCBsaXN0Lmxlbmd0aCkpLCBfc2xpY2UobGlzdCwgTWF0aC5taW4obGlzdC5sZW5ndGgsIHN0YXJ0ICsgY291bnQpKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXBsYWNlIGEgc3Vic3RyaW5nIG9yIHJlZ2V4IG1hdGNoIGluIGEgc3RyaW5nIHdpdGggYSByZXBsYWNlbWVudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuNy4wXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgUmVnRXhwfFN0cmluZyAtPiBTdHJpbmcgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7UmVnRXhwfFN0cmluZ30gcGF0dGVybiBBIHJlZ3VsYXIgZXhwcmVzc2lvbiBvciBhIHN1YnN0cmluZyB0byBtYXRjaC5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcmVwbGFjZW1lbnQgVGhlIHN0cmluZyB0byByZXBsYWNlIHRoZSBtYXRjaGVzIHdpdGguXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IHN0ciBUaGUgU3RyaW5nIHRvIGRvIHRoZSBzZWFyY2ggYW5kIHJlcGxhY2VtZW50IGluLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHJlc3VsdC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJlcGxhY2UoJ2ZvbycsICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGZvbyBmb28nXG4gICAgICogICAgICBSLnJlcGxhY2UoL2Zvby8sICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGZvbyBmb28nXG4gICAgICpcbiAgICAgKiAgICAgIC8vIFVzZSB0aGUgXCJnXCIgKGdsb2JhbCkgZmxhZyB0byByZXBsYWNlIGFsbCBvY2N1cnJlbmNlczpcbiAgICAgKiAgICAgIFIucmVwbGFjZSgvZm9vL2csICdiYXInLCAnZm9vIGZvbyBmb28nKTsgLy89PiAnYmFyIGJhciBiYXInXG4gICAgICovXG4gICAgdmFyIHJlcGxhY2UgPSBfY3VycnkzKGZ1bmN0aW9uIHJlcGxhY2UocmVnZXgsIHJlcGxhY2VtZW50LCBzdHIpIHtcbiAgICAgICAgcmV0dXJuIHN0ci5yZXBsYWNlKHJlZ2V4LCByZXBsYWNlbWVudCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3Qgb3Igc3RyaW5nIHdpdGggdGhlIGVsZW1lbnRzIG9yIGNoYXJhY3RlcnMgaW4gcmV2ZXJzZVxuICAgICAqIG9yZGVyLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW2FdIC0+IFthXVxuICAgICAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7QXJyYXl8U3RyaW5nfSBsaXN0XG4gICAgICogQHJldHVybiB7QXJyYXl8U3RyaW5nfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucmV2ZXJzZShbMSwgMiwgM10pOyAgLy89PiBbMywgMiwgMV1cbiAgICAgKiAgICAgIFIucmV2ZXJzZShbMSwgMl0pOyAgICAgLy89PiBbMiwgMV1cbiAgICAgKiAgICAgIFIucmV2ZXJzZShbMV0pOyAgICAgICAgLy89PiBbMV1cbiAgICAgKiAgICAgIFIucmV2ZXJzZShbXSk7ICAgICAgICAgLy89PiBbXVxuICAgICAqXG4gICAgICogICAgICBSLnJldmVyc2UoJ2FiYycpOyAgICAgIC8vPT4gJ2NiYSdcbiAgICAgKiAgICAgIFIucmV2ZXJzZSgnYWInKTsgICAgICAgLy89PiAnYmEnXG4gICAgICogICAgICBSLnJldmVyc2UoJ2EnKTsgICAgICAgIC8vPT4gJ2EnXG4gICAgICogICAgICBSLnJldmVyc2UoJycpOyAgICAgICAgIC8vPT4gJydcbiAgICAgKi9cbiAgICB2YXIgcmV2ZXJzZSA9IF9jdXJyeTEoZnVuY3Rpb24gcmV2ZXJzZShsaXN0KSB7XG4gICAgICAgIHJldHVybiBfaXNTdHJpbmcobGlzdCkgPyBsaXN0LnNwbGl0KCcnKS5yZXZlcnNlKCkuam9pbignJykgOiBfc2xpY2UobGlzdCkucmV2ZXJzZSgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU2NhbiBpcyBzaW1pbGFyIHRvIHJlZHVjZSwgYnV0IHJldHVybnMgYSBsaXN0IG9mIHN1Y2Nlc3NpdmVseSByZWR1Y2VkIHZhbHVlcyBmcm9tIHRoZSBsZWZ0XG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEwLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsYiAtPiBhKSAtPiBhIC0+IFtiXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgaXRlcmF0b3IgZnVuY3Rpb24uIFJlY2VpdmVzIHR3byB2YWx1ZXMsIHRoZSBhY2N1bXVsYXRvciBhbmQgdGhlXG4gICAgICogICAgICAgIGN1cnJlbnQgZWxlbWVudCBmcm9tIHRoZSBhcnJheVxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBsaXN0IG9mIGFsbCBpbnRlcm1lZGlhdGVseSByZWR1Y2VkIHZhbHVlcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbnVtYmVycyA9IFsxLCAyLCAzLCA0XTtcbiAgICAgKiAgICAgIHZhciBmYWN0b3JpYWxzID0gUi5zY2FuKFIubXVsdGlwbHksIDEsIG51bWJlcnMpOyAvLz0+IFsxLCAxLCAyLCA2LCAyNF1cbiAgICAgKi9cbiAgICB2YXIgc2NhbiA9IF9jdXJyeTMoZnVuY3Rpb24gc2NhbihmbiwgYWNjLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSAwLCBsZW4gPSBsaXN0Lmxlbmd0aCwgcmVzdWx0ID0gW2FjY107XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGFjYyA9IGZuKGFjYywgbGlzdFtpZHhdKTtcbiAgICAgICAgICAgIHJlc3VsdFtpZHggKyAxXSA9IGFjYztcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgXCJzZXR0aW5nXCIgdGhlIHBvcnRpb24gb2YgdGhlIGdpdmVuIGRhdGEgc3RydWN0dXJlXG4gICAgICogZm9jdXNlZCBieSB0aGUgZ2l2ZW4gbGVucyB0byB0aGUgZ2l2ZW4gdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE2LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAgICAgKiBAc2lnIExlbnMgcyBhIC0+IGEgLT4gcyAtPiBzXG4gICAgICogQHBhcmFtIHtMZW5zfSBsZW5zXG4gICAgICogQHBhcmFtIHsqfSB2XG4gICAgICogQHBhcmFtIHsqfSB4XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gICAgICpcbiAgICAgKiAgICAgIFIuc2V0KHhMZW5zLCA0LCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogNCwgeTogMn1cbiAgICAgKiAgICAgIFIuc2V0KHhMZW5zLCA4LCB7eDogMSwgeTogMn0pOyAgLy89PiB7eDogOCwgeTogMn1cbiAgICAgKi9cbiAgICB2YXIgc2V0ID0gX2N1cnJ5MyhmdW5jdGlvbiBzZXQobGVucywgdiwgeCkge1xuICAgICAgICByZXR1cm4gb3ZlcihsZW5zLCBhbHdheXModiksIHgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGNvcHkgb2YgdGhlIGxpc3QsIHNvcnRlZCBhY2NvcmRpbmcgdG8gdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24sIHdoaWNoIHNob3VsZCBhY2NlcHQgdHdvIHZhbHVlcyBhdCBhXG4gICAgICogdGltZSBhbmQgcmV0dXJuIGEgbmVnYXRpdmUgbnVtYmVyIGlmIHRoZSBmaXJzdCB2YWx1ZSBpcyBzbWFsbGVyLCBhIHBvc2l0aXZlIG51bWJlciBpZiBpdCdzIGxhcmdlciwgYW5kIHplcm9cbiAgICAgKiBpZiB0aGV5IGFyZSBlcXVhbC4gIFBsZWFzZSBub3RlIHRoYXQgdGhpcyBpcyBhICoqY29weSoqIG9mIHRoZSBsaXN0LiAgSXQgZG9lcyBub3QgbW9kaWZ5IHRoZSBvcmlnaW5hbC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLGEgLT4gTnVtYmVyKSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gY29tcGFyYXRvciBBIHNvcnRpbmcgZnVuY3Rpb24gOjogYSAtPiBiIC0+IEludFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gc29ydFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBhIG5ldyBhcnJheSB3aXRoIGl0cyBlbGVtZW50cyBzb3J0ZWQgYnkgdGhlIGNvbXBhcmF0b3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGRpZmYgPSBmdW5jdGlvbihhLCBiKSB7IHJldHVybiBhIC0gYjsgfTtcbiAgICAgKiAgICAgIFIuc29ydChkaWZmLCBbNCwyLDcsNV0pOyAvLz0+IFsyLCA0LCA1LCA3XVxuICAgICAqL1xuICAgIHZhciBzb3J0ID0gX2N1cnJ5MihmdW5jdGlvbiBzb3J0KGNvbXBhcmF0b3IsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0KS5zb3J0KGNvbXBhcmF0b3IpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogU29ydHMgdGhlIGxpc3QgYWNjb3JkaW5nIHRvIHRoZSBzdXBwbGllZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBPcmQgYiA9PiAoYSAtPiBiKSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIHNvcnQuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGxpc3Qgc29ydGVkIGJ5IHRoZSBrZXlzIGdlbmVyYXRlZCBieSBgZm5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzb3J0QnlGaXJzdEl0ZW0gPSBSLnNvcnRCeShSLnByb3AoMCkpO1xuICAgICAqICAgICAgdmFyIHNvcnRCeU5hbWVDYXNlSW5zZW5zaXRpdmUgPSBSLnNvcnRCeShSLmNvbXBvc2UoUi50b0xvd2VyLCBSLnByb3AoJ25hbWUnKSkpO1xuICAgICAqICAgICAgdmFyIHBhaXJzID0gW1stMSwgMV0sIFstMiwgMl0sIFstMywgM11dO1xuICAgICAqICAgICAgc29ydEJ5Rmlyc3RJdGVtKHBhaXJzKTsgLy89PiBbWy0zLCAzXSwgWy0yLCAyXSwgWy0xLCAxXV1cbiAgICAgKiAgICAgIHZhciBhbGljZSA9IHtcbiAgICAgKiAgICAgICAgbmFtZTogJ0FMSUNFJyxcbiAgICAgKiAgICAgICAgYWdlOiAxMDFcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB2YXIgYm9iID0ge1xuICAgICAqICAgICAgICBuYW1lOiAnQm9iJyxcbiAgICAgKiAgICAgICAgYWdlOiAtMTBcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB2YXIgY2xhcmEgPSB7XG4gICAgICogICAgICAgIG5hbWU6ICdjbGFyYScsXG4gICAgICogICAgICAgIGFnZTogMzE0LjE1OVxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHZhciBwZW9wbGUgPSBbY2xhcmEsIGJvYiwgYWxpY2VdO1xuICAgICAqICAgICAgc29ydEJ5TmFtZUNhc2VJbnNlbnNpdGl2ZShwZW9wbGUpOyAvLz0+IFthbGljZSwgYm9iLCBjbGFyYV1cbiAgICAgKi9cbiAgICB2YXIgc29ydEJ5ID0gX2N1cnJ5MihmdW5jdGlvbiBzb3J0QnkoZm4sIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICB2YXIgYWEgPSBmbihhKTtcbiAgICAgICAgICAgIHZhciBiYiA9IGZuKGIpO1xuICAgICAgICAgICAgcmV0dXJuIGFhIDwgYmIgPyAtMSA6IGFhID4gYmIgPyAxIDogMDtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTdWJ0cmFjdHMgdHdvIG51bWJlcnMuIEVxdWl2YWxlbnQgdG8gYGEgLSBiYCBidXQgY3VycmllZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIE51bWJlciAtPiBOdW1iZXIgLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGEgVGhlIGZpcnN0IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBiIFRoZSBzZWNvbmQgdmFsdWUuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgcmVzdWx0IG9mIGBhIC0gYmAuXG4gICAgICogQHNlZSBSLmFkZFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuc3VidHJhY3QoMTAsIDgpOyAvLz0+IDJcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG1pbnVzNSA9IFIuc3VidHJhY3QoUi5fXywgNSk7XG4gICAgICogICAgICBtaW51czUoMTcpOyAvLz0+IDEyXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBjb21wbGVtZW50YXJ5QW5nbGUgPSBSLnN1YnRyYWN0KDkwKTtcbiAgICAgKiAgICAgIGNvbXBsZW1lbnRhcnlBbmdsZSgzMCk7IC8vPT4gNjBcbiAgICAgKiAgICAgIGNvbXBsZW1lbnRhcnlBbmdsZSg3Mik7IC8vPT4gMThcbiAgICAgKi9cbiAgICB2YXIgc3VidHJhY3QgPSBfY3VycnkyKGZ1bmN0aW9uIHN1YnRyYWN0KGEsIGIpIHtcbiAgICAgICAgcmV0dXJuIGEgLSBiO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGxhc3QgYG5gIGVsZW1lbnRzIG9mIGEgZ2l2ZW4gbGlzdCwgcGFzc2luZyBlYWNoIHZhbHVlXG4gICAgICogdG8gdGhlIHN1cHBsaWVkIHByZWRpY2F0ZSBmdW5jdGlvbiwgYW5kIHRlcm1pbmF0aW5nIHdoZW4gdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiByZXR1cm5zXG4gICAgICogYGZhbHNlYC4gRXhjbHVkZXMgdGhlIGVsZW1lbnQgdGhhdCBjYXVzZWQgdGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB0byBmYWlsLiBUaGUgcHJlZGljYXRlXG4gICAgICogZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogKih2YWx1ZSkqLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNi4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5LlxuICAgICAqIEBzZWUgUi5kcm9wTGFzdFdoaWxlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGlzTm90T25lID0geCA9PiB4ICE9PSAxO1xuICAgICAqXG4gICAgICogICAgICBSLnRha2VMYXN0V2hpbGUoaXNOb3RPbmUsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzIsIDMsIDRdXG4gICAgICovXG4gICAgdmFyIHRha2VMYXN0V2hpbGUgPSBfY3VycnkyKGZ1bmN0aW9uIHRha2VMYXN0V2hpbGUoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGlkeCA+PSAwICYmIGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgIGlkeCAtPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBfc2xpY2UobGlzdCwgaWR4ICsgMSwgSW5maW5pdHkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUnVucyB0aGUgZ2l2ZW4gZnVuY3Rpb24gd2l0aCB0aGUgc3VwcGxpZWQgb2JqZWN0LCB0aGVuIHJldHVybnMgdGhlIG9iamVjdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoYSAtPiAqKSAtPiBhIC0+IGFcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gY2FsbCB3aXRoIGB4YC4gVGhlIHJldHVybiB2YWx1ZSBvZiBgZm5gIHdpbGwgYmUgdGhyb3duIGF3YXkuXG4gICAgICogQHBhcmFtIHsqfSB4XG4gICAgICogQHJldHVybiB7Kn0gYHhgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzYXlYID0geCA9PiBjb25zb2xlLmxvZygneCBpcyAnICsgeCk7XG4gICAgICogICAgICBSLnRhcChzYXlYLCAxMDApOyAvLz0+IDEwMFxuICAgICAqICAgICAgLy8tPiAneCBpcyAxMDAnXG4gICAgICovXG4gICAgdmFyIHRhcCA9IF9jdXJyeTIoZnVuY3Rpb24gdGFwKGZuLCB4KSB7XG4gICAgICAgIGZuKHgpO1xuICAgICAgICByZXR1cm4geDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENhbGxzIGFuIGlucHV0IGZ1bmN0aW9uIGBuYCB0aW1lcywgcmV0dXJuaW5nIGFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJlc3VsdHMgb2YgdGhvc2VcbiAgICAgKiBmdW5jdGlvbiBjYWxscy5cbiAgICAgKlxuICAgICAqIGBmbmAgaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogVGhlIGN1cnJlbnQgdmFsdWUgb2YgYG5gLCB3aGljaCBiZWdpbnMgYXQgYDBgIGFuZCBpc1xuICAgICAqIGdyYWR1YWxseSBpbmNyZW1lbnRlZCB0byBgbiAtIDFgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjNcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGkgLT4gYSkgLT4gaSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLiBQYXNzZWQgb25lIGFyZ3VtZW50LCB0aGUgY3VycmVudCB2YWx1ZSBvZiBgbmAuXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG4gQSB2YWx1ZSBiZXR3ZWVuIGAwYCBhbmQgYG4gLSAxYC4gSW5jcmVtZW50cyBhZnRlciBlYWNoIGZ1bmN0aW9uIGNhbGwuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IGNvbnRhaW5pbmcgdGhlIHJldHVybiB2YWx1ZXMgb2YgYWxsIGNhbGxzIHRvIGBmbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50aW1lcyhSLmlkZW50aXR5LCA1KTsgLy89PiBbMCwgMSwgMiwgMywgNF1cbiAgICAgKi9cbiAgICB2YXIgdGltZXMgPSBfY3VycnkyKGZ1bmN0aW9uIHRpbWVzKGZuLCBuKSB7XG4gICAgICAgIHZhciBsZW4gPSBOdW1iZXIobik7XG4gICAgICAgIHZhciBsaXN0ID0gbmV3IEFycmF5KGxlbik7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBsaXN0W2lkeF0gPSBmbihpZHgpO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGxpc3Q7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cy5cbiAgICAgKiBPbmx5IHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcyBhcmUgdXNlZC5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgKiBjb25zaXN0ZW50IGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC40LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7U3RyaW5nOiAqfSAtPiBbW1N0cmluZywqXV1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gZXh0cmFjdCBmcm9tXG4gICAgICogQHJldHVybiB7QXJyYXl9IEFuIGFycmF5IG9mIGtleSwgdmFsdWUgYXJyYXlzIGZyb20gdGhlIG9iamVjdCdzIG93biBwcm9wZXJ0aWVzLlxuICAgICAqIEBzZWUgUi5mcm9tUGFpcnNcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnRvUGFpcnMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbWydhJywgMV0sIFsnYicsIDJdLCBbJ2MnLCAzXV1cbiAgICAgKi9cbiAgICB2YXIgdG9QYWlycyA9IF9jdXJyeTEoZnVuY3Rpb24gdG9QYWlycyhvYmopIHtcbiAgICAgICAgdmFyIHBhaXJzID0gW107XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoX2hhcyhwcm9wLCBvYmopKSB7XG4gICAgICAgICAgICAgICAgcGFpcnNbcGFpcnMubGVuZ3RoXSA9IFtcbiAgICAgICAgICAgICAgICAgICAgcHJvcCxcbiAgICAgICAgICAgICAgICAgICAgb2JqW3Byb3BdXG4gICAgICAgICAgICAgICAgXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb252ZXJ0cyBhbiBvYmplY3QgaW50byBhbiBhcnJheSBvZiBrZXksIHZhbHVlIGFycmF5cy5cbiAgICAgKiBUaGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMgYW5kIHByb3RvdHlwZSBwcm9wZXJ0aWVzIGFyZSB1c2VkLlxuICAgICAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCB0byBiZVxuICAgICAqIGNvbnNpc3RlbnQgYWNyb3NzIGRpZmZlcmVudCBKUyBwbGF0Zm9ybXMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjQuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtTdHJpbmc6ICp9IC0+IFtbU3RyaW5nLCpdXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdCB0byBleHRyYWN0IGZyb21cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2Yga2V5LCB2YWx1ZSBhcnJheXMgZnJvbSB0aGUgb2JqZWN0J3Mgb3duXG4gICAgICogICAgICAgICBhbmQgcHJvdG90eXBlIHByb3BlcnRpZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gJ1gnOyB9O1xuICAgICAqICAgICAgRi5wcm90b3R5cGUueSA9ICdZJztcbiAgICAgKiAgICAgIHZhciBmID0gbmV3IEYoKTtcbiAgICAgKiAgICAgIFIudG9QYWlyc0luKGYpOyAvLz0+IFtbJ3gnLCdYJ10sIFsneScsJ1knXV1cbiAgICAgKi9cbiAgICB2YXIgdG9QYWlyc0luID0gX2N1cnJ5MShmdW5jdGlvbiB0b1BhaXJzSW4ob2JqKSB7XG4gICAgICAgIHZhciBwYWlycyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIG9iaikge1xuICAgICAgICAgICAgcGFpcnNbcGFpcnMubGVuZ3RoXSA9IFtcbiAgICAgICAgICAgICAgICBwcm9wLFxuICAgICAgICAgICAgICAgIG9ialtwcm9wXVxuICAgICAgICAgICAgXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGFpcnM7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZW1vdmVzIChzdHJpcHMpIHdoaXRlc3BhY2UgZnJvbSBib3RoIGVuZHMgb2YgdGhlIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuNi4wXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byB0cmltLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gVHJpbW1lZCB2ZXJzaW9uIG9mIGBzdHJgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudHJpbSgnICAgeHl6ICAnKTsgLy89PiAneHl6J1xuICAgICAqICAgICAgUi5tYXAoUi50cmltLCBSLnNwbGl0KCcsJywgJ3gsIHksIHonKSk7IC8vPT4gWyd4JywgJ3knLCAneiddXG4gICAgICovXG4gICAgdmFyIHRyaW0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB3cyA9ICdcXHRcXG5cXHgwQlxcZlxcciBcXHhBMFxcdTE2ODBcXHUxODBFXFx1MjAwMFxcdTIwMDFcXHUyMDAyXFx1MjAwMycgKyAnXFx1MjAwNFxcdTIwMDVcXHUyMDA2XFx1MjAwN1xcdTIwMDhcXHUyMDA5XFx1MjAwQVxcdTIwMkZcXHUyMDVGXFx1MzAwMFxcdTIwMjgnICsgJ1xcdTIwMjlcXHVGRUZGJztcbiAgICAgICAgdmFyIHplcm9XaWR0aCA9ICdcXHUyMDBCJztcbiAgICAgICAgdmFyIGhhc1Byb3RvVHJpbSA9IHR5cGVvZiBTdHJpbmcucHJvdG90eXBlLnRyaW0gPT09ICdmdW5jdGlvbic7XG4gICAgICAgIGlmICghaGFzUHJvdG9UcmltIHx8ICh3cy50cmltKCkgfHwgIXplcm9XaWR0aC50cmltKCkpKSB7XG4gICAgICAgICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbiB0cmltKHN0cikge1xuICAgICAgICAgICAgICAgIHZhciBiZWdpblJ4ID0gbmV3IFJlZ0V4cCgnXlsnICsgd3MgKyAnXVsnICsgd3MgKyAnXSonKTtcbiAgICAgICAgICAgICAgICB2YXIgZW5kUnggPSBuZXcgUmVnRXhwKCdbJyArIHdzICsgJ11bJyArIHdzICsgJ10qJCcpO1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIucmVwbGFjZShiZWdpblJ4LCAnJykucmVwbGFjZShlbmRSeCwgJycpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gX2N1cnJ5MShmdW5jdGlvbiB0cmltKHN0cikge1xuICAgICAgICAgICAgICAgIHJldHVybiBzdHIudHJpbSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9KCk7XG5cbiAgICAvKipcbiAgICAgKiBHaXZlcyBhIHNpbmdsZS13b3JkIHN0cmluZyBkZXNjcmlwdGlvbiBvZiB0aGUgKG5hdGl2ZSkgdHlwZSBvZiBhIHZhbHVlLCByZXR1cm5pbmcgc3VjaFxuICAgICAqIGFuc3dlcnMgYXMgJ09iamVjdCcsICdOdW1iZXInLCAnQXJyYXknLCBvciAnTnVsbCcuICBEb2VzIG5vdCBhdHRlbXB0IHRvIGRpc3Rpbmd1aXNoIHVzZXJcbiAgICAgKiBPYmplY3QgdHlwZXMgYW55IGZ1cnRoZXIsIHJlcG9ydGluZyB0aGVtIGFsbCBhcyAnT2JqZWN0Jy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOC4wXG4gICAgICogQGNhdGVnb3J5IFR5cGVcbiAgICAgKiBAc2lnICgqIC0+IHsqfSkgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50eXBlKHt9KTsgLy89PiBcIk9iamVjdFwiXG4gICAgICogICAgICBSLnR5cGUoMSk7IC8vPT4gXCJOdW1iZXJcIlxuICAgICAqICAgICAgUi50eXBlKGZhbHNlKTsgLy89PiBcIkJvb2xlYW5cIlxuICAgICAqICAgICAgUi50eXBlKCdzJyk7IC8vPT4gXCJTdHJpbmdcIlxuICAgICAqICAgICAgUi50eXBlKG51bGwpOyAvLz0+IFwiTnVsbFwiXG4gICAgICogICAgICBSLnR5cGUoW10pOyAvLz0+IFwiQXJyYXlcIlxuICAgICAqICAgICAgUi50eXBlKC9bQS16XS8pOyAvLz0+IFwiUmVnRXhwXCJcbiAgICAgKi9cbiAgICB2YXIgdHlwZSA9IF9jdXJyeTEoZnVuY3Rpb24gdHlwZSh2YWwpIHtcbiAgICAgICAgcmV0dXJuIHZhbCA9PT0gbnVsbCA/ICdOdWxsJyA6IHZhbCA9PT0gdW5kZWZpbmVkID8gJ1VuZGVmaW5lZCcgOiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsKS5zbGljZSg4LCAtMSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGZ1bmN0aW9uIGBmbmAsIHdoaWNoIHRha2VzIGEgc2luZ2xlIGFycmF5IGFyZ3VtZW50LCBhbmQgcmV0dXJuc1xuICAgICAqIGEgZnVuY3Rpb24gd2hpY2g6XG4gICAgICpcbiAgICAgKiAgIC0gdGFrZXMgYW55IG51bWJlciBvZiBwb3NpdGlvbmFsIGFyZ3VtZW50cztcbiAgICAgKiAgIC0gcGFzc2VzIHRoZXNlIGFyZ3VtZW50cyB0byBgZm5gIGFzIGFuIGFycmF5OyBhbmRcbiAgICAgKiAgIC0gcmV0dXJucyB0aGUgcmVzdWx0LlxuICAgICAqXG4gICAgICogSW4gb3RoZXIgd29yZHMsIFIudW5hcHBseSBkZXJpdmVzIGEgdmFyaWFkaWMgZnVuY3Rpb24gZnJvbSBhIGZ1bmN0aW9uXG4gICAgICogd2hpY2ggdGFrZXMgYW4gYXJyYXkuIFIudW5hcHBseSBpcyB0aGUgaW52ZXJzZSBvZiBSLmFwcGx5LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC44LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChbKi4uLl0gLT4gYSkgLT4gKCouLi4gLT4gYSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5hcHBseVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudW5hcHBseShKU09OLnN0cmluZ2lmeSkoMSwgMiwgMyk7IC8vPT4gJ1sxLDIsM10nXG4gICAgICovXG4gICAgdmFyIHVuYXBwbHkgPSBfY3VycnkxKGZ1bmN0aW9uIHVuYXBwbHkoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBmbihfc2xpY2UoYXJndW1lbnRzKSk7XG4gICAgICAgIH07XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBXcmFwcyBhIGZ1bmN0aW9uIG9mIGFueSBhcml0eSAoaW5jbHVkaW5nIG51bGxhcnkpIGluIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGV4YWN0bHkgMVxuICAgICAqIHBhcmFtZXRlci4gQW55IGV4dHJhbmVvdXMgcGFyYW1ldGVycyB3aWxsIG5vdCBiZSBwYXNzZWQgdG8gdGhlIHN1cHBsaWVkIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgqIC0+IGIpIC0+IChhIC0+IGIpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgbmV3IGZ1bmN0aW9uIHdyYXBwaW5nIGBmbmAuIFRoZSBuZXcgZnVuY3Rpb24gaXMgZ3VhcmFudGVlZCB0byBiZSBvZlxuICAgICAqICAgICAgICAgYXJpdHkgMS5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgdGFrZXNUd29BcmdzID0gZnVuY3Rpb24oYSwgYikge1xuICAgICAqICAgICAgICByZXR1cm4gW2EsIGJdO1xuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHRha2VzVHdvQXJncy5sZW5ndGg7IC8vPT4gMlxuICAgICAqICAgICAgdGFrZXNUd29BcmdzKDEsIDIpOyAvLz0+IFsxLCAyXVxuICAgICAqXG4gICAgICogICAgICB2YXIgdGFrZXNPbmVBcmcgPSBSLnVuYXJ5KHRha2VzVHdvQXJncyk7XG4gICAgICogICAgICB0YWtlc09uZUFyZy5sZW5ndGg7IC8vPT4gMVxuICAgICAqICAgICAgLy8gT25seSAxIGFyZ3VtZW50IGlzIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICAgICAqICAgICAgdGFrZXNPbmVBcmcoMSwgMik7IC8vPT4gWzEsIHVuZGVmaW5lZF1cbiAgICAgKi9cbiAgICB2YXIgdW5hcnkgPSBfY3VycnkxKGZ1bmN0aW9uIHVuYXJ5KGZuKSB7XG4gICAgICAgIHJldHVybiBuQXJ5KDEsIGZuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBmdW5jdGlvbiBvZiBhcml0eSBgbmAgZnJvbSBhIChtYW51YWxseSkgY3VycmllZCBmdW5jdGlvbi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTQuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgTnVtYmVyIC0+IChhIC0+IGIpIC0+IChhIC0+IGMpXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGxlbmd0aCBUaGUgYXJpdHkgZm9yIHRoZSByZXR1cm5lZCBmdW5jdGlvbi5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gdW5jdXJyeS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24uXG4gICAgICogQHNlZSBSLmN1cnJ5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGFkZEZvdXIgPSBhID0+IGIgPT4gYyA9PiBkID0+IGEgKyBiICsgYyArIGQ7XG4gICAgICpcbiAgICAgKiAgICAgIHZhciB1bmN1cnJpZWRBZGRGb3VyID0gUi51bmN1cnJ5Tig0LCBhZGRGb3VyKTtcbiAgICAgKiAgICAgIHVuY3VycmllZEFkZEZvdXIoMSwgMiwgMywgNCk7IC8vPT4gMTBcbiAgICAgKi9cbiAgICB2YXIgdW5jdXJyeU4gPSBfY3VycnkyKGZ1bmN0aW9uIHVuY3VycnlOKGRlcHRoLCBmbikge1xuICAgICAgICByZXR1cm4gY3VycnlOKGRlcHRoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgY3VycmVudERlcHRoID0gMTtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZuO1xuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgICAgICB2YXIgZW5kSWR4O1xuICAgICAgICAgICAgd2hpbGUgKGN1cnJlbnREZXB0aCA8PSBkZXB0aCAmJiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBlbmRJZHggPSBjdXJyZW50RGVwdGggPT09IGRlcHRoID8gYXJndW1lbnRzLmxlbmd0aCA6IGlkeCArIHZhbHVlLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB2YWx1ZSA9IHZhbHVlLmFwcGx5KHRoaXMsIF9zbGljZShhcmd1bWVudHMsIGlkeCwgZW5kSWR4KSk7XG4gICAgICAgICAgICAgICAgY3VycmVudERlcHRoICs9IDE7XG4gICAgICAgICAgICAgICAgaWR4ID0gZW5kSWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEJ1aWxkcyBhIGxpc3QgZnJvbSBhIHNlZWQgdmFsdWUuIEFjY2VwdHMgYW4gaXRlcmF0b3IgZnVuY3Rpb24sIHdoaWNoIHJldHVybnMgZWl0aGVyIGZhbHNlXG4gICAgICogdG8gc3RvcCBpdGVyYXRpb24gb3IgYW4gYXJyYXkgb2YgbGVuZ3RoIDIgY29udGFpbmluZyB0aGUgdmFsdWUgdG8gYWRkIHRvIHRoZSByZXN1bHRpbmdcbiAgICAgKiBsaXN0IGFuZCB0aGUgc2VlZCB0byBiZSB1c2VkIGluIHRoZSBuZXh0IGNhbGwgdG8gdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIHJlY2VpdmVzIG9uZSBhcmd1bWVudDogKihzZWVkKSouXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEwLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gW2JdKSAtPiAqIC0+IFtiXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gcmVjZWl2ZXMgb25lIGFyZ3VtZW50LCBgc2VlZGAsIGFuZCByZXR1cm5zXG4gICAgICogICAgICAgIGVpdGhlciBmYWxzZSB0byBxdWl0IGl0ZXJhdGlvbiBvciBhbiBhcnJheSBvZiBsZW5ndGggdHdvIHRvIHByb2NlZWQuIFRoZSBlbGVtZW50XG4gICAgICogICAgICAgIGF0IGluZGV4IDAgb2YgdGhpcyBhcnJheSB3aWxsIGJlIGFkZGVkIHRvIHRoZSByZXN1bHRpbmcgYXJyYXksIGFuZCB0aGUgZWxlbWVudFxuICAgICAqICAgICAgICBhdCBpbmRleCAxIHdpbGwgYmUgcGFzc2VkIHRvIHRoZSBuZXh0IGNhbGwgdG8gYGZuYC5cbiAgICAgKiBAcGFyYW0geyp9IHNlZWQgVGhlIHNlZWQgdmFsdWUuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBmaW5hbCBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBmID0gbiA9PiBuID4gNTAgPyBmYWxzZSA6IFstbiwgbiArIDEwXTtcbiAgICAgKiAgICAgIFIudW5mb2xkKGYsIDEwKTsgLy89PiBbLTEwLCAtMjAsIC0zMCwgLTQwLCAtNTBdXG4gICAgICovXG4gICAgdmFyIHVuZm9sZCA9IF9jdXJyeTIoZnVuY3Rpb24gdW5mb2xkKGZuLCBzZWVkKSB7XG4gICAgICAgIHZhciBwYWlyID0gZm4oc2VlZCk7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgd2hpbGUgKHBhaXIgJiYgcGFpci5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJlc3VsdFtyZXN1bHQubGVuZ3RoXSA9IHBhaXJbMF07XG4gICAgICAgICAgICBwYWlyID0gZm4ocGFpclsxXSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgb25lIGNvcHkgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBsaXN0LCBiYXNlZFxuICAgICAqIHVwb24gdGhlIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3QgZWxlbWVudHMuIFByZWZlcnNcbiAgICAgKiB0aGUgZmlyc3QgaXRlbSBpZiB0d28gaXRlbXMgY29tcGFyZSBlcXVhbCBiYXNlZCBvbiB0aGUgcHJlZGljYXRlLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsIGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHByZWQgQSBwcmVkaWNhdGUgdXNlZCB0byB0ZXN0IHdoZXRoZXIgdHdvIGl0ZW1zIGFyZSBlcXVhbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3Qgb2YgdW5pcXVlIGl0ZW1zLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzdHJFcSA9IFIuZXFCeShTdHJpbmcpO1xuICAgICAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoWzEsICcxJywgMiwgMV0pOyAvLz0+IFsxLCAyXVxuICAgICAqICAgICAgUi51bmlxV2l0aChzdHJFcSkoW3t9LCB7fV0pOyAgICAgICAvLz0+IFt7fV1cbiAgICAgKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsxLCAnMScsIDFdKTsgICAgLy89PiBbMV1cbiAgICAgKiAgICAgIFIudW5pcVdpdGgoc3RyRXEpKFsnMScsIDEsIDFdKTsgICAgLy89PiBbJzEnXVxuICAgICAqL1xuICAgIHZhciB1bmlxV2l0aCA9IF9jdXJyeTIoZnVuY3Rpb24gdW5pcVdpdGgocHJlZCwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXSwgaXRlbTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgaXRlbSA9IGxpc3RbaWR4XTtcbiAgICAgICAgICAgIGlmICghX2NvbnRhaW5zV2l0aChwcmVkLCBpdGVtLCByZXN1bHQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gaXRlbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUZXN0cyB0aGUgZmluYWwgYXJndW1lbnQgYnkgcGFzc2luZyBpdCB0byB0aGUgZ2l2ZW4gcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgICAqIElmIHRoZSBwcmVkaWNhdGUgaXMgbm90IHNhdGlzZmllZCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZVxuICAgICAqIHJlc3VsdCBvZiBjYWxsaW5nIHRoZSBgd2hlbkZhbHNlRm5gIGZ1bmN0aW9uIHdpdGggdGhlIHNhbWUgYXJndW1lbnQuIElmIHRoZVxuICAgICAqIHByZWRpY2F0ZSBpcyBzYXRpc2ZpZWQsIHRoZSBhcmd1bWVudCBpcyByZXR1cm5lZCBhcyBpcy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTguMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzZWUgUi5pZkVsc2UsIFIud2hlblxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gKGEgLT4gYSkgLT4gYSAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCAgICAgICAgQSBwcmVkaWNhdGUgZnVuY3Rpb25cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB3aGVuRmFsc2VGbiBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgcHJlZGAgZXZhbHVhdGVzXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdG8gYSBmYWxzeSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0geyp9ICAgICAgICB4ICAgICAgICAgICBBbiBvYmplY3QgdG8gdGVzdCB3aXRoIHRoZSBgcHJlZGAgZnVuY3Rpb24gYW5kXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzcyB0byBgd2hlbkZhbHNlRm5gIGlmIG5lY2Vzc2FyeS5cbiAgICAgKiBAcmV0dXJuIHsqfSBFaXRoZXIgYHhgIG9yIHRoZSByZXN1bHQgb2YgYXBwbHlpbmcgYHhgIHRvIGB3aGVuRmFsc2VGbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gY29lcmNlQXJyYXkgOjogKGF8W2FdKSAtPiBbYV1cbiAgICAgKiAgICAgIHZhciBjb2VyY2VBcnJheSA9IFIudW5sZXNzKFIuaXNBcnJheUxpa2UsIFIub2YpO1xuICAgICAqICAgICAgY29lcmNlQXJyYXkoWzEsIDIsIDNdKTsgLy89PiBbMSwgMiwgM11cbiAgICAgKiAgICAgIGNvZXJjZUFycmF5KDEpOyAgICAgICAgIC8vPT4gWzFdXG4gICAgICovXG4gICAgdmFyIHVubGVzcyA9IF9jdXJyeTMoZnVuY3Rpb24gdW5sZXNzKHByZWQsIHdoZW5GYWxzZUZuLCB4KSB7XG4gICAgICAgIHJldHVybiBwcmVkKHgpID8geCA6IHdoZW5GYWxzZUZuKHgpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBjb3B5IG9mIHRoZSBhcnJheSB3aXRoIHRoZSBlbGVtZW50IGF0IHRoZVxuICAgICAqIHByb3ZpZGVkIGluZGV4IHJlcGxhY2VkIHdpdGggdGhlIGdpdmVuIHZhbHVlLlxuICAgICAqIEBzZWUgUi5hZGp1c3RcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTQuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gYSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IGlkeCBUaGUgaW5kZXggdG8gdXBkYXRlLlxuICAgICAqIEBwYXJhbSB7Kn0geCBUaGUgdmFsdWUgdG8gZXhpc3QgYXQgdGhlIGdpdmVuIGluZGV4IG9mIHRoZSByZXR1cm5lZCBhcnJheS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fEFyZ3VtZW50c30gbGlzdCBUaGUgc291cmNlIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGJlIHVwZGF0ZWQuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgY29weSBvZiBgbGlzdGAgd2l0aCB0aGUgdmFsdWUgYXQgaW5kZXggYGlkeGAgcmVwbGFjZWQgd2l0aCBgeGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi51cGRhdGUoMSwgMTEsIFswLCAxLCAyXSk7ICAgICAvLz0+IFswLCAxMSwgMl1cbiAgICAgKiAgICAgIFIudXBkYXRlKDEpKDExKShbMCwgMSwgMl0pOyAgICAgLy89PiBbMCwgMTEsIDJdXG4gICAgICovXG4gICAgdmFyIHVwZGF0ZSA9IF9jdXJyeTMoZnVuY3Rpb24gdXBkYXRlKGlkeCwgeCwgbGlzdCkge1xuICAgICAgICByZXR1cm4gYWRqdXN0KGFsd2F5cyh4KSwgaWR4LCBsaXN0KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsaXN0IG9mIGFsbCB0aGUgZW51bWVyYWJsZSBvd24gcHJvcGVydGllcyBvZiB0aGUgc3VwcGxpZWQgb2JqZWN0LlxuICAgICAqIE5vdGUgdGhhdCB0aGUgb3JkZXIgb2YgdGhlIG91dHB1dCBhcnJheSBpcyBub3QgZ3VhcmFudGVlZCBhY3Jvc3NcbiAgICAgKiBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7azogdn0gLT4gW3ZdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgdmFsdWVzIGZyb21cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiB0aGUgb2JqZWN0J3Mgb3duIHByb3BlcnRpZXMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi52YWx1ZXMoe2E6IDEsIGI6IDIsIGM6IDN9KTsgLy89PiBbMSwgMiwgM11cbiAgICAgKi9cbiAgICB2YXIgdmFsdWVzID0gX2N1cnJ5MShmdW5jdGlvbiB2YWx1ZXMob2JqKSB7XG4gICAgICAgIHZhciBwcm9wcyA9IGtleXMob2JqKTtcbiAgICAgICAgdmFyIGxlbiA9IHByb3BzLmxlbmd0aDtcbiAgICAgICAgdmFyIHZhbHMgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIHZhbHNbaWR4XSA9IG9ialtwcm9wc1tpZHhdXTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2YWxzO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgYWxsIHRoZSBwcm9wZXJ0aWVzLCBpbmNsdWRpbmcgcHJvdG90eXBlIHByb3BlcnRpZXMsXG4gICAgICogb2YgdGhlIHN1cHBsaWVkIG9iamVjdC5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIG9yZGVyIG9mIHRoZSBvdXRwdXQgYXJyYXkgaXMgbm90IGd1YXJhbnRlZWQgdG8gYmVcbiAgICAgKiBjb25zaXN0ZW50IGFjcm9zcyBkaWZmZXJlbnQgSlMgcGxhdGZvcm1zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4yLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7azogdn0gLT4gW3ZdXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGV4dHJhY3QgdmFsdWVzIGZyb21cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2YgdGhlIHZhbHVlcyBvZiB0aGUgb2JqZWN0J3Mgb3duIGFuZCBwcm90b3R5cGUgcHJvcGVydGllcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgRiA9IGZ1bmN0aW9uKCkgeyB0aGlzLnggPSAnWCc7IH07XG4gICAgICogICAgICBGLnByb3RvdHlwZS55ID0gJ1knO1xuICAgICAqICAgICAgdmFyIGYgPSBuZXcgRigpO1xuICAgICAqICAgICAgUi52YWx1ZXNJbihmKTsgLy89PiBbJ1gnLCAnWSddXG4gICAgICovXG4gICAgdmFyIHZhbHVlc0luID0gX2N1cnJ5MShmdW5jdGlvbiB2YWx1ZXNJbihvYmopIHtcbiAgICAgICAgdmFyIHByb3AsIHZzID0gW107XG4gICAgICAgIGZvciAocHJvcCBpbiBvYmopIHtcbiAgICAgICAgICAgIHZzW3ZzLmxlbmd0aF0gPSBvYmpbcHJvcF07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZzO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIFwidmlld1wiIG9mIHRoZSBnaXZlbiBkYXRhIHN0cnVjdHVyZSwgZGV0ZXJtaW5lZCBieSB0aGUgZ2l2ZW4gbGVucy5cbiAgICAgKiBUaGUgbGVucydzIGZvY3VzIGRldGVybWluZXMgd2hpY2ggcG9ydGlvbiBvZiB0aGUgZGF0YSBzdHJ1Y3R1cmUgaXMgdmlzaWJsZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTYuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICAgICAqIEBzaWcgTGVucyBzIGEgLT4gcyAtPiBhXG4gICAgICogQHBhcmFtIHtMZW5zfSBsZW5zXG4gICAgICogQHBhcmFtIHsqfSB4XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIucHJvcCwgUi5sZW5zSW5kZXgsIFIubGVuc1Byb3BcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgeExlbnMgPSBSLmxlbnNQcm9wKCd4Jyk7XG4gICAgICpcbiAgICAgKiAgICAgIFIudmlldyh4TGVucywge3g6IDEsIHk6IDJ9KTsgIC8vPT4gMVxuICAgICAqICAgICAgUi52aWV3KHhMZW5zLCB7eDogNCwgeTogMn0pOyAgLy89PiA0XG4gICAgICovXG4gICAgdmFyIHZpZXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBDb25zdCA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHZhbHVlOiB4LFxuICAgICAgICAgICAgICAgIG1hcDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiB2aWV3KGxlbnMsIHgpIHtcbiAgICAgICAgICAgIHJldHVybiBsZW5zKENvbnN0KSh4KS52YWx1ZTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgLyoqXG4gICAgICogVGVzdHMgdGhlIGZpbmFsIGFyZ3VtZW50IGJ5IHBhc3NpbmcgaXQgdG8gdGhlIGdpdmVuIHByZWRpY2F0ZSBmdW5jdGlvbi5cbiAgICAgKiBJZiB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCwgdGhlIGZ1bmN0aW9uIHdpbGwgcmV0dXJuIHRoZSByZXN1bHRcbiAgICAgKiBvZiBjYWxsaW5nIHRoZSBgd2hlblRydWVGbmAgZnVuY3Rpb24gd2l0aCB0aGUgc2FtZSBhcmd1bWVudC4gSWYgdGhlIHByZWRpY2F0ZVxuICAgICAqIGlzIG5vdCBzYXRpc2ZpZWQsIHRoZSBhcmd1bWVudCBpcyByZXR1cm5lZCBhcyBpcy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTguMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzZWUgUi5pZkVsc2UsIFIudW5sZXNzXG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiAoYSAtPiBhKSAtPiBhIC0+IGFcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkICAgICAgIEEgcHJlZGljYXRlIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gd2hlblRydWVGbiBBIGZ1bmN0aW9uIHRvIGludm9rZSB3aGVuIHRoZSBgY29uZGl0aW9uYFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZhbHVhdGVzIHRvIGEgdHJ1dGh5IHZhbHVlLlxuICAgICAqIEBwYXJhbSB7Kn0gICAgICAgIHggICAgICAgICAgQW4gb2JqZWN0IHRvIHRlc3Qgd2l0aCB0aGUgYHByZWRgIGZ1bmN0aW9uIGFuZFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFzcyB0byBgd2hlblRydWVGbmAgaWYgbmVjZXNzYXJ5LlxuICAgICAqIEByZXR1cm4geyp9IEVpdGhlciBgeGAgb3IgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgeGAgdG8gYHdoZW5UcnVlRm5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vIHRydW5jYXRlIDo6IFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiAgICAgIHZhciB0cnVuY2F0ZSA9IFIud2hlbihcbiAgICAgKiAgICAgICAgUi5wcm9wU2F0aXNmaWVzKFIuZ3QoUi5fXywgMTApLCAnbGVuZ3RoJyksXG4gICAgICogICAgICAgIFIucGlwZShSLnRha2UoMTApLCBSLmFwcGVuZCgn4oCmJyksIFIuam9pbignJykpXG4gICAgICogICAgICApO1xuICAgICAqICAgICAgdHJ1bmNhdGUoJzEyMzQ1Jyk7ICAgICAgICAgLy89PiAnMTIzNDUnXG4gICAgICogICAgICB0cnVuY2F0ZSgnMDEyMzQ1Njc4OUFCQycpOyAvLz0+ICcwMTIzNDU2Nzg54oCmJ1xuICAgICAqL1xuICAgIHZhciB3aGVuID0gX2N1cnJ5MyhmdW5jdGlvbiB3aGVuKHByZWQsIHdoZW5UcnVlRm4sIHgpIHtcbiAgICAgICAgcmV0dXJuIHByZWQoeCkgPyB3aGVuVHJ1ZUZuKHgpIDogeDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRha2VzIGEgc3BlYyBvYmplY3QgYW5kIGEgdGVzdCBvYmplY3Q7IHJldHVybnMgdHJ1ZSBpZiB0aGUgdGVzdCBzYXRpc2ZpZXNcbiAgICAgKiB0aGUgc3BlYy4gRWFjaCBvZiB0aGUgc3BlYydzIG93biBwcm9wZXJ0aWVzIG11c3QgYmUgYSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAgICogRWFjaCBwcmVkaWNhdGUgaXMgYXBwbGllZCB0byB0aGUgdmFsdWUgb2YgdGhlIGNvcnJlc3BvbmRpbmcgcHJvcGVydHkgb2ZcbiAgICAgKiB0aGUgdGVzdCBvYmplY3QuIGB3aGVyZWAgcmV0dXJucyB0cnVlIGlmIGFsbCB0aGUgcHJlZGljYXRlcyByZXR1cm4gdHJ1ZSxcbiAgICAgKiBmYWxzZSBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBgd2hlcmVgIGlzIHdlbGwgc3VpdGVkIHRvIGRlY2xhcmF0aXZlbHkgZXhwcmVzc2luZyBjb25zdHJhaW50cyBmb3Igb3RoZXJcbiAgICAgKiBmdW5jdGlvbnMgc3VjaCBhcyBgZmlsdGVyYCBhbmQgYGZpbmRgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjFcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7U3RyaW5nOiAoKiAtPiBCb29sZWFuKX0gLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRlc3RPYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vIHByZWQgOjogT2JqZWN0IC0+IEJvb2xlYW5cbiAgICAgKiAgICAgIHZhciBwcmVkID0gUi53aGVyZSh7XG4gICAgICogICAgICAgIGE6IFIuZXF1YWxzKCdmb28nKSxcbiAgICAgKiAgICAgICAgYjogUi5jb21wbGVtZW50KFIuZXF1YWxzKCdiYXInKSksXG4gICAgICogICAgICAgIHg6IFIuZ3QoXywgMTApLFxuICAgICAqICAgICAgICB5OiBSLmx0KF8sIDIwKVxuICAgICAqICAgICAgfSk7XG4gICAgICpcbiAgICAgKiAgICAgIHByZWQoe2E6ICdmb28nLCBiOiAneHh4JywgeDogMTEsIHk6IDE5fSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcHJlZCh7YTogJ3h4eCcsIGI6ICd4eHgnLCB4OiAxMSwgeTogMTl9KTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICdiYXInLCB4OiAxMSwgeTogMTl9KTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICd4eHgnLCB4OiAxMCwgeTogMTl9KTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgcHJlZCh7YTogJ2ZvbycsIGI6ICd4eHgnLCB4OiAxMSwgeTogMjB9KTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciB3aGVyZSA9IF9jdXJyeTIoZnVuY3Rpb24gd2hlcmUoc3BlYywgdGVzdE9iaikge1xuICAgICAgICBmb3IgKHZhciBwcm9wIGluIHNwZWMpIHtcbiAgICAgICAgICAgIGlmIChfaGFzKHByb3AsIHNwZWMpICYmICFzcGVjW3Byb3BdKHRlc3RPYmpbcHJvcF0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogV3JhcCBhIGZ1bmN0aW9uIGluc2lkZSBhbm90aGVyIHRvIGFsbG93IHlvdSB0byBtYWtlIGFkanVzdG1lbnRzIHRvIHRoZSBwYXJhbWV0ZXJzLCBvciBkb1xuICAgICAqIG90aGVyIHByb2Nlc3NpbmcgZWl0aGVyIGJlZm9yZSB0aGUgaW50ZXJuYWwgZnVuY3Rpb24gaXMgY2FsbGVkIG9yIHdpdGggaXRzIHJlc3VsdHMuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKGEuLi4gLT4gYikgLT4gKChhLi4uIC0+IGIpIC0+IGEuLi4gLT4gYykgLT4gKGEuLi4gLT4gYylcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB3cmFwcGVyIFRoZSB3cmFwcGVyIGZ1bmN0aW9uLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgd3JhcHBlZCBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3JlZXQgPSBuYW1lID0+ICdIZWxsbyAnICsgbmFtZTtcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHNob3V0ZWRHcmVldCA9IFIud3JhcChncmVldCwgKGdyLCBuYW1lKSA9PiBncihuYW1lKS50b1VwcGVyQ2FzZSgpKTtcbiAgICAgKlxuICAgICAqICAgICAgc2hvdXRlZEdyZWV0KFwiS2F0aHlcIik7IC8vPT4gXCJIRUxMTyBLQVRIWVwiXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzaG9ydGVuZWRHcmVldCA9IFIud3JhcChncmVldCwgZnVuY3Rpb24oZ3IsIG5hbWUpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIGdyKG5hbWUuc3Vic3RyaW5nKDAsIDMpKTtcbiAgICAgKiAgICAgIH0pO1xuICAgICAqICAgICAgc2hvcnRlbmVkR3JlZXQoXCJSb2JlcnRcIik7IC8vPT4gXCJIZWxsbyBSb2JcIlxuICAgICAqL1xuICAgIHZhciB3cmFwID0gX2N1cnJ5MihmdW5jdGlvbiB3cmFwKGZuLCB3cmFwcGVyKSB7XG4gICAgICAgIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gd3JhcHBlci5hcHBseSh0aGlzLCBfY29uY2F0KFtmbl0sIGFyZ3VtZW50cykpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbGlzdCBvdXQgb2YgdGhlIHR3byBzdXBwbGllZCBieSBjcmVhdGluZyBlYWNoIHBvc3NpYmxlXG4gICAgICogcGFpciBmcm9tIHRoZSBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBbYl0gLT4gW1thLGJdXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFzIFRoZSBmaXJzdCBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGJzIFRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBjb21iaW5pbmcgZWFjaCBwb3NzaWJsZSBwYWlyIGZyb21cbiAgICAgKiAgICAgICAgIGBhc2AgYW5kIGBic2AgaW50byBwYWlycyAoYFthLCBiXWApLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIueHByb2QoWzEsIDJdLCBbJ2EnLCAnYiddKTsgLy89PiBbWzEsICdhJ10sIFsxLCAnYiddLCBbMiwgJ2EnXSwgWzIsICdiJ11dXG4gICAgICovXG4gICAgLy8gPSB4cHJvZFdpdGgocHJlcGVuZCk7ICh0YWtlcyBhYm91dCAzIHRpbWVzIGFzIGxvbmcuLi4pXG4gICAgdmFyIHhwcm9kID0gX2N1cnJ5MihmdW5jdGlvbiB4cHJvZChhLCBiKSB7XG4gICAgICAgIC8vID0geHByb2RXaXRoKHByZXBlbmQpOyAodGFrZXMgYWJvdXQgMyB0aW1lcyBhcyBsb25nLi4uKVxuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgdmFyIGlsZW4gPSBhLmxlbmd0aDtcbiAgICAgICAgdmFyIGo7XG4gICAgICAgIHZhciBqbGVuID0gYi5sZW5ndGg7XG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGlsZW4pIHtcbiAgICAgICAgICAgIGogPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGogPCBqbGVuKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gW1xuICAgICAgICAgICAgICAgICAgICBhW2lkeF0sXG4gICAgICAgICAgICAgICAgICAgIGJbal1cbiAgICAgICAgICAgICAgICBdO1xuICAgICAgICAgICAgICAgIGogKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGxpc3Qgb3V0IG9mIHRoZSB0d28gc3VwcGxpZWQgYnkgcGFpcmluZyB1cFxuICAgICAqIGVxdWFsbHktcG9zaXRpb25lZCBpdGVtcyBmcm9tIGJvdGggbGlzdHMuICBUaGUgcmV0dXJuZWQgbGlzdCBpc1xuICAgICAqIHRydW5jYXRlZCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBzaG9ydGVyIG9mIHRoZSB0d28gaW5wdXQgbGlzdHMuXG4gICAgICogTm90ZTogYHppcGAgaXMgZXF1aXZhbGVudCB0byBgemlwV2l0aChmdW5jdGlvbihhLCBiKSB7IHJldHVybiBbYSwgYl0gfSlgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW2FdIC0+IFtiXSAtPiBbW2EsYl1dXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG1hZGUgYnkgcGFpcmluZyB1cCBzYW1lLWluZGV4ZWQgZWxlbWVudHMgb2YgYGxpc3QxYCBhbmQgYGxpc3QyYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnppcChbMSwgMiwgM10sIFsnYScsICdiJywgJ2MnXSk7IC8vPT4gW1sxLCAnYSddLCBbMiwgJ2InXSwgWzMsICdjJ11dXG4gICAgICovXG4gICAgdmFyIHppcCA9IF9jdXJyeTIoZnVuY3Rpb24gemlwKGEsIGIpIHtcbiAgICAgICAgdmFyIHJ2ID0gW107XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgcnZbaWR4XSA9IFtcbiAgICAgICAgICAgICAgICBhW2lkeF0sXG4gICAgICAgICAgICAgICAgYltpZHhdXG4gICAgICAgICAgICBdO1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJ2O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBvYmplY3Qgb3V0IG9mIGEgbGlzdCBvZiBrZXlzIGFuZCBhIGxpc3Qgb2YgdmFsdWVzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4zLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW1N0cmluZ10gLT4gWypdIC0+IHtTdHJpbmc6ICp9XG4gICAgICogQHBhcmFtIHtBcnJheX0ga2V5cyBUaGUgYXJyYXkgdGhhdCB3aWxsIGJlIHByb3BlcnRpZXMgb24gdGhlIG91dHB1dCBvYmplY3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gdmFsdWVzIFRoZSBsaXN0IG9mIHZhbHVlcyBvbiB0aGUgb3V0cHV0IG9iamVjdC5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBvYmplY3QgbWFkZSBieSBwYWlyaW5nIHVwIHNhbWUtaW5kZXhlZCBlbGVtZW50cyBvZiBga2V5c2AgYW5kIGB2YWx1ZXNgLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuemlwT2JqKFsnYScsICdiJywgJ2MnXSwgWzEsIDIsIDNdKTsgLy89PiB7YTogMSwgYjogMiwgYzogM31cbiAgICAgKi9cbiAgICB2YXIgemlwT2JqID0gX2N1cnJ5MihmdW5jdGlvbiB6aXBPYmooa2V5cywgdmFsdWVzKSB7XG4gICAgICAgIHZhciBpZHggPSAwLCBsZW4gPSBrZXlzLmxlbmd0aCwgb3V0ID0ge307XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIG91dFtrZXlzW2lkeF1dID0gdmFsdWVzW2lkeF07XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogQ3JlYXRlcyBhIG5ldyBsaXN0IG91dCBvZiB0aGUgdHdvIHN1cHBsaWVkIGJ5IGFwcGx5aW5nIHRoZSBmdW5jdGlvbiB0b1xuICAgICAqIGVhY2ggZXF1YWxseS1wb3NpdGlvbmVkIHBhaXIgaW4gdGhlIGxpc3RzLiBUaGUgcmV0dXJuZWQgbGlzdCBpc1xuICAgICAqIHRydW5jYXRlZCB0byB0aGUgbGVuZ3RoIG9mIHRoZSBzaG9ydGVyIG9mIHRoZSB0d28gaW5wdXQgbGlzdHMuXG4gICAgICpcbiAgICAgKiBAZnVuY3Rpb25cbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEsYiAtPiBjKSAtPiBbYV0gLT4gW2JdIC0+IFtjXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB1c2VkIHRvIGNvbWJpbmUgdGhlIHR3byBlbGVtZW50cyBpbnRvIG9uZSB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBUaGUgZmlyc3QgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGxpc3QgbWFkZSBieSBjb21iaW5pbmcgc2FtZS1pbmRleGVkIGVsZW1lbnRzIG9mIGBsaXN0MWAgYW5kIGBsaXN0MmBcbiAgICAgKiAgICAgICAgIHVzaW5nIGBmbmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGYgPSAoeCwgeSkgPT4ge1xuICAgICAqICAgICAgICAvLyAuLi5cbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBSLnppcFdpdGgoZiwgWzEsIDIsIDNdLCBbJ2EnLCAnYicsICdjJ10pO1xuICAgICAqICAgICAgLy89PiBbZigxLCAnYScpLCBmKDIsICdiJyksIGYoMywgJ2MnKV1cbiAgICAgKi9cbiAgICB2YXIgemlwV2l0aCA9IF9jdXJyeTMoZnVuY3Rpb24gemlwV2l0aChmbiwgYSwgYikge1xuICAgICAgICB2YXIgcnYgPSBbXSwgaWR4ID0gMCwgbGVuID0gTWF0aC5taW4oYS5sZW5ndGgsIGIubGVuZ3RoKTtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgcnZbaWR4XSA9IGZuKGFbaWR4XSwgYltpZHhdKTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBydjtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEEgZnVuY3Rpb24gdGhhdCBhbHdheXMgcmV0dXJucyBgZmFsc2VgLiBBbnkgcGFzc2VkIGluIHBhcmFtZXRlcnMgYXJlIGlnbm9yZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKiAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmFsd2F5cywgUi5UXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5GKCk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgRiA9IGFsd2F5cyhmYWxzZSk7XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHRoYXQgYWx3YXlzIHJldHVybnMgYHRydWVgLiBBbnkgcGFzc2VkIGluIHBhcmFtZXRlcnMgYXJlIGlnbm9yZWQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKiAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHsqfVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmFsd2F5cywgUi5GXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5UKCk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBUID0gYWx3YXlzKHRydWUpO1xuXG4gICAgdmFyIF9hcGVydHVyZSA9IGZ1bmN0aW9uIF9hcGVydHVyZShuLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgbGltaXQgPSBsaXN0Lmxlbmd0aCAtIChuIC0gMSk7XG4gICAgICAgIHZhciBhY2MgPSBuZXcgQXJyYXkobGltaXQgPj0gMCA/IGxpbWl0IDogMCk7XG4gICAgICAgIHdoaWxlIChpZHggPCBsaW1pdCkge1xuICAgICAgICAgICAgYWNjW2lkeF0gPSBfc2xpY2UobGlzdCwgaWR4LCBpZHggKyBuKTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gaGFzTWV0aG9kLCB0aGlzIGNoZWNrcyB3aGV0aGVyIGEgZnVuY3Rpb24gaGFzIGEgW21ldGhvZG5hbWVdXG4gICAgICogZnVuY3Rpb24uIElmIGl0IGlzbid0IGFuIGFycmF5IGl0IHdpbGwgZXhlY3V0ZSB0aGF0IGZ1bmN0aW9uIG90aGVyd2lzZSBpdCB3aWxsXG4gICAgICogZGVmYXVsdCB0byB0aGUgcmFtZGEgaW1wbGVtZW50YXRpb24uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIHJhbWRhIGltcGxlbXRhdGlvblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBtZXRob2RuYW1lIHByb3BlcnR5IHRvIGNoZWNrIGZvciBhIGN1c3RvbSBpbXBsZW1lbnRhdGlvblxuICAgICAqIEByZXR1cm4ge09iamVjdH0gV2hhdGV2ZXIgdGhlIHJldHVybiB2YWx1ZSBvZiB0aGUgbWV0aG9kIGlzLlxuICAgICAqL1xuICAgIHZhciBfY2hlY2tGb3JNZXRob2QgPSBmdW5jdGlvbiBfY2hlY2tGb3JNZXRob2QobWV0aG9kbmFtZSwgZm4pIHtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBsZW5ndGggPSBhcmd1bWVudHMubGVuZ3RoO1xuICAgICAgICAgICAgaWYgKGxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmbigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIG9iaiA9IGFyZ3VtZW50c1tsZW5ndGggLSAxXTtcbiAgICAgICAgICAgIHJldHVybiBfaXNBcnJheShvYmopIHx8IHR5cGVvZiBvYmpbbWV0aG9kbmFtZV0gIT09ICdmdW5jdGlvbicgPyBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpIDogb2JqW21ldGhvZG5hbWVdLmFwcGx5KG9iaiwgX3NsaWNlKGFyZ3VtZW50cywgMCwgbGVuZ3RoIC0gMSkpO1xuICAgICAgICB9O1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBDb3BpZXMgYW4gb2JqZWN0LlxuICAgICAqXG4gICAgICogQHByaXZhdGVcbiAgICAgKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBiZSBjb3BpZWRcbiAgICAgKiBAcGFyYW0ge0FycmF5fSByZWZGcm9tIEFycmF5IGNvbnRhaW5pbmcgdGhlIHNvdXJjZSByZWZlcmVuY2VzXG4gICAgICogQHBhcmFtIHtBcnJheX0gcmVmVG8gQXJyYXkgY29udGFpbmluZyB0aGUgY29waWVkIHNvdXJjZSByZWZlcmVuY2VzXG4gICAgICogQHJldHVybiB7Kn0gVGhlIGNvcGllZCB2YWx1ZS5cbiAgICAgKi9cbiAgICB2YXIgX2Nsb25lID0gZnVuY3Rpb24gX2Nsb25lKHZhbHVlLCByZWZGcm9tLCByZWZUbykge1xuICAgICAgICB2YXIgY29weSA9IGZ1bmN0aW9uIGNvcHkoY29waWVkVmFsdWUpIHtcbiAgICAgICAgICAgIHZhciBsZW4gPSByZWZGcm9tLmxlbmd0aDtcbiAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgICAgIGlmICh2YWx1ZSA9PT0gcmVmRnJvbVtpZHhdKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZWZUb1tpZHhdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlZkZyb21baWR4ICsgMV0gPSB2YWx1ZTtcbiAgICAgICAgICAgIHJlZlRvW2lkeCArIDFdID0gY29waWVkVmFsdWU7XG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcbiAgICAgICAgICAgICAgICBjb3BpZWRWYWx1ZVtrZXldID0gX2Nsb25lKHZhbHVlW2tleV0sIHJlZkZyb20sIHJlZlRvKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBjb3BpZWRWYWx1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgc3dpdGNoICh0eXBlKHZhbHVlKSkge1xuICAgICAgICBjYXNlICdPYmplY3QnOlxuICAgICAgICAgICAgcmV0dXJuIGNvcHkoe30pO1xuICAgICAgICBjYXNlICdBcnJheSc6XG4gICAgICAgICAgICByZXR1cm4gY29weShbXSk7XG4gICAgICAgIGNhc2UgJ0RhdGUnOlxuICAgICAgICAgICAgcmV0dXJuIG5ldyBEYXRlKHZhbHVlKTtcbiAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgIHJldHVybiBfY2xvbmVSZWdFeHAodmFsdWUpO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIHZhciBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IgPSBmdW5jdGlvbiBfY3JlYXRlUGFydGlhbEFwcGxpY2F0b3IoY29uY2F0KSB7XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIChmbiwgYXJncykge1xuICAgICAgICAgICAgcmV0dXJuIF9hcml0eShNYXRoLm1heCgwLCBmbi5sZW5ndGggLSBhcmdzLmxlbmd0aCksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgY29uY2F0KGFyZ3MsIGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgZnVuY3Rpb24gdGhhdCBkaXNwYXRjaGVzIHdpdGggZGlmZmVyZW50IHN0cmF0ZWdpZXMgYmFzZWQgb24gdGhlXG4gICAgICogb2JqZWN0IGluIGxpc3QgcG9zaXRpb24gKGxhc3QgYXJndW1lbnQpLiBJZiBpdCBpcyBhbiBhcnJheSwgZXhlY3V0ZXMgW2ZuXS5cbiAgICAgKiBPdGhlcndpc2UsIGlmIGl0IGhhcyBhICBmdW5jdGlvbiB3aXRoIFttZXRob2RuYW1lXSwgaXQgd2lsbCBleGVjdXRlIHRoYXRcbiAgICAgKiBmdW5jdGlvbiAoZnVuY3RvciBjYXNlKS4gT3RoZXJ3aXNlLCBpZiBpdCBpcyBhIHRyYW5zZm9ybWVyLCB1c2VzIHRyYW5zZHVjZXJcbiAgICAgKiBbeGZdIHRvIHJldHVybiBhIG5ldyB0cmFuc2Zvcm1lciAodHJhbnNkdWNlciBjYXNlKS4gT3RoZXJ3aXNlLCBpdCB3aWxsXG4gICAgICogZGVmYXVsdCB0byBleGVjdXRpbmcgW2ZuXS5cbiAgICAgKlxuICAgICAqIEBwcml2YXRlXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IG1ldGhvZG5hbWUgcHJvcGVydHkgdG8gY2hlY2sgZm9yIGEgY3VzdG9tIGltcGxlbWVudGF0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0geGYgdHJhbnNkdWNlciB0byBpbml0aWFsaXplIGlmIG9iamVjdCBpcyB0cmFuc2Zvcm1lclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIGRlZmF1bHQgcmFtZGEgaW1wbGVtZW50YXRpb25cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBmdW5jdGlvbiB0aGF0IGRpc3BhdGNoZXMgb24gb2JqZWN0IGluIGxpc3QgcG9zaXRpb25cbiAgICAgKi9cbiAgICB2YXIgX2Rpc3BhdGNoYWJsZSA9IGZ1bmN0aW9uIF9kaXNwYXRjaGFibGUobWV0aG9kbmFtZSwgeGYsIGZuKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgbGVuZ3RoID0gYXJndW1lbnRzLmxlbmd0aDtcbiAgICAgICAgICAgIGlmIChsZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBvYmogPSBhcmd1bWVudHNbbGVuZ3RoIC0gMV07XG4gICAgICAgICAgICBpZiAoIV9pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgICAgICB2YXIgYXJncyA9IF9zbGljZShhcmd1bWVudHMsIDAsIGxlbmd0aCAtIDEpO1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2Ygb2JqW21ldGhvZG5hbWVdID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvYmpbbWV0aG9kbmFtZV0uYXBwbHkob2JqLCBhcmdzKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKF9pc1RyYW5zZm9ybWVyKG9iaikpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRyYW5zZHVjZXIgPSB4Zi5hcHBseShudWxsLCBhcmdzKTtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRyYW5zZHVjZXIob2JqKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgLy8gVmFsdWVzIG9mIG90aGVyIHR5cGVzIGFyZSBvbmx5IGVxdWFsIGlmIGlkZW50aWNhbC5cbiAgICB2YXIgX2VxdWFscyA9IGZ1bmN0aW9uIF9lcXVhbHMoYSwgYiwgc3RhY2tBLCBzdGFja0IpIHtcbiAgICAgICAgaWYgKGlkZW50aWNhbChhLCBiKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHR5cGUoYSkgIT09IHR5cGUoYikpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYSA9PSBudWxsIHx8IGIgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlb2YgYS5lcXVhbHMgPT09ICdmdW5jdGlvbicgfHwgdHlwZW9mIGIuZXF1YWxzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIGEuZXF1YWxzID09PSAnZnVuY3Rpb24nICYmIGEuZXF1YWxzKGIpICYmIHR5cGVvZiBiLmVxdWFscyA9PT0gJ2Z1bmN0aW9uJyAmJiBiLmVxdWFscyhhKTtcbiAgICAgICAgfVxuICAgICAgICBzd2l0Y2ggKHR5cGUoYSkpIHtcbiAgICAgICAgY2FzZSAnQXJndW1lbnRzJzpcbiAgICAgICAgY2FzZSAnQXJyYXknOlxuICAgICAgICBjYXNlICdPYmplY3QnOlxuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ0Jvb2xlYW4nOlxuICAgICAgICBjYXNlICdOdW1iZXInOlxuICAgICAgICBjYXNlICdTdHJpbmcnOlxuICAgICAgICAgICAgaWYgKCEodHlwZW9mIGEgPT09IHR5cGVvZiBiICYmIGlkZW50aWNhbChhLnZhbHVlT2YoKSwgYi52YWx1ZU9mKCkpKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdEYXRlJzpcbiAgICAgICAgICAgIGlmICghaWRlbnRpY2FsKGEudmFsdWVPZigpLCBiLnZhbHVlT2YoKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnUmVnRXhwJzpcbiAgICAgICAgICAgIGlmICghKGEuc291cmNlID09PSBiLnNvdXJjZSAmJiBhLmdsb2JhbCA9PT0gYi5nbG9iYWwgJiYgYS5pZ25vcmVDYXNlID09PSBiLmlnbm9yZUNhc2UgJiYgYS5tdWx0aWxpbmUgPT09IGIubXVsdGlsaW5lICYmIGEuc3RpY2t5ID09PSBiLnN0aWNreSAmJiBhLnVuaWNvZGUgPT09IGIudW5pY29kZSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnTWFwJzpcbiAgICAgICAgY2FzZSAnU2V0JzpcbiAgICAgICAgICAgIGlmICghX2VxdWFscyhfYXJyYXlGcm9tSXRlcmF0b3IoYS5lbnRyaWVzKCkpLCBfYXJyYXlGcm9tSXRlcmF0b3IoYi5lbnRyaWVzKCkpLCBzdGFja0EsIHN0YWNrQikpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnSW50OEFycmF5JzpcbiAgICAgICAgY2FzZSAnVWludDhBcnJheSc6XG4gICAgICAgIGNhc2UgJ1VpbnQ4Q2xhbXBlZEFycmF5JzpcbiAgICAgICAgY2FzZSAnSW50MTZBcnJheSc6XG4gICAgICAgIGNhc2UgJ1VpbnQxNkFycmF5JzpcbiAgICAgICAgY2FzZSAnSW50MzJBcnJheSc6XG4gICAgICAgIGNhc2UgJ1VpbnQzMkFycmF5JzpcbiAgICAgICAgY2FzZSAnRmxvYXQzMkFycmF5JzpcbiAgICAgICAgY2FzZSAnRmxvYXQ2NEFycmF5JzpcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdBcnJheUJ1ZmZlcic6XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIC8vIFZhbHVlcyBvZiBvdGhlciB0eXBlcyBhcmUgb25seSBlcXVhbCBpZiBpZGVudGljYWwuXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGtleXNBID0ga2V5cyhhKTtcbiAgICAgICAgaWYgKGtleXNBLmxlbmd0aCAhPT0ga2V5cyhiKS5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgaWR4ID0gc3RhY2tBLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgaWYgKHN0YWNrQVtpZHhdID09PSBhKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHN0YWNrQltpZHhdID09PSBiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgIH1cbiAgICAgICAgc3RhY2tBLnB1c2goYSk7XG4gICAgICAgIHN0YWNrQi5wdXNoKGIpO1xuICAgICAgICBpZHggPSBrZXlzQS5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBrZXlzQVtpZHhdO1xuICAgICAgICAgICAgaWYgKCEoX2hhcyhrZXksIGIpICYmIF9lcXVhbHMoYltrZXldLCBhW2tleV0sIHN0YWNrQSwgc3RhY2tCKSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICBzdGFja0EucG9wKCk7XG4gICAgICAgIHN0YWNrQi5wb3AoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIGBfbWFrZUZsYXRgIGlzIGEgaGVscGVyIGZ1bmN0aW9uIHRoYXQgcmV0dXJucyBhIG9uZS1sZXZlbCBvciBmdWxseSByZWN1cnNpdmUgZnVuY3Rpb25cbiAgICAgKiBiYXNlZCBvbiB0aGUgZmxhZyBwYXNzZWQgaW4uXG4gICAgICpcbiAgICAgKiBAcHJpdmF0ZVxuICAgICAqL1xuICAgIHZhciBfbWFrZUZsYXQgPSBmdW5jdGlvbiBfbWFrZUZsYXQocmVjdXJzaXZlKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBmbGF0dChsaXN0KSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUsIHJlc3VsdCA9IFtdLCBpZHggPSAwLCBqLCBpbGVuID0gbGlzdC5sZW5ndGgsIGpsZW47XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgaWxlbikge1xuICAgICAgICAgICAgICAgIGlmIChpc0FycmF5TGlrZShsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhbHVlID0gcmVjdXJzaXZlID8gZmxhdHQobGlzdFtpZHhdKSA6IGxpc3RbaWR4XTtcbiAgICAgICAgICAgICAgICAgICAgaiA9IDA7XG4gICAgICAgICAgICAgICAgICAgIGpsZW4gPSB2YWx1ZS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIHdoaWxlIChqIDwgamxlbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0W3Jlc3VsdC5sZW5ndGhdID0gdmFsdWVbal07XG4gICAgICAgICAgICAgICAgICAgICAgICBqICs9IDE7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfTtcbiAgICB9O1xuXG4gICAgdmFyIF9yZWR1Y2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIF9hcnJheVJlZHVjZSh4ZiwgYWNjLCBsaXN0KSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgYWNjID0geGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10oYWNjLCBsaXN0W2lkeF0pO1xuICAgICAgICAgICAgICAgIGlmIChhY2MgJiYgYWNjWydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgICAgICAgICAgICAgIGFjYyA9IGFjY1snQEB0cmFuc2R1Y2VyL3ZhbHVlJ107XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX2l0ZXJhYmxlUmVkdWNlKHhmLCBhY2MsIGl0ZXIpIHtcbiAgICAgICAgICAgIHZhciBzdGVwID0gaXRlci5uZXh0KCk7XG4gICAgICAgICAgICB3aGlsZSAoIXN0ZXAuZG9uZSkge1xuICAgICAgICAgICAgICAgIGFjYyA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKGFjYywgc3RlcC52YWx1ZSk7XG4gICAgICAgICAgICAgICAgaWYgKGFjYyAmJiBhY2NbJ0BAdHJhbnNkdWNlci9yZWR1Y2VkJ10pIHtcbiAgICAgICAgICAgICAgICAgICAgYWNjID0gYWNjWydAQHRyYW5zZHVjZXIvdmFsdWUnXTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHN0ZXAgPSBpdGVyLm5leHQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKGFjYyk7XG4gICAgICAgIH1cbiAgICAgICAgZnVuY3Rpb24gX21ldGhvZFJlZHVjZSh4ZiwgYWNjLCBvYmopIHtcbiAgICAgICAgICAgIHJldHVybiB4ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKG9iai5yZWR1Y2UoYmluZCh4ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSwgeGYpLCBhY2MpKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgc3ltSXRlcmF0b3IgPSB0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyA/IFN5bWJvbC5pdGVyYXRvciA6ICdAQGl0ZXJhdG9yJztcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIF9yZWR1Y2UoZm4sIGFjYywgbGlzdCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBmbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIGZuID0gX3h3cmFwKGZuKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChpc0FycmF5TGlrZShsaXN0KSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfYXJyYXlSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3QucmVkdWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9tZXRob2RSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAobGlzdFtzeW1JdGVyYXRvcl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdFtzeW1JdGVyYXRvcl0oKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodHlwZW9mIGxpc3QubmV4dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfaXRlcmFibGVSZWR1Y2UoZm4sIGFjYywgbGlzdCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdyZWR1Y2U6IGxpc3QgbXVzdCBiZSBhcnJheSBvciBpdGVyYWJsZScpO1xuICAgICAgICB9O1xuICAgIH0oKTtcblxuICAgIHZhciBfeGFsbCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gWEFsbChmLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5mID0gZjtcbiAgICAgICAgICAgIHRoaXMuYWxsID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgICBYQWxsLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXSA9IGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmFsbCkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgfTtcbiAgICAgICAgWEFsbC5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbGwgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBfcmVkdWNlZCh0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgZmFsc2UpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94YWxsKGYsIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhBbGwoZiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hhbnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhBbnkoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgICAgICB0aGlzLmFueSA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICAgIFhBbnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYQW55LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmFueSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCBmYWxzZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIFhBbnkucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5hbnkgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJlc3VsdCA9IF9yZWR1Y2VkKHRoaXMueGZbJ0BAdHJhbnNkdWNlci9zdGVwJ10ocmVzdWx0LCB0cnVlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGFueShmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYQW55KGYsIHhmKTtcbiAgICAgICAgfSk7XG4gICAgfSgpO1xuXG4gICAgdmFyIF94YXBlcnR1cmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhBcGVydHVyZShuLCB4Zikge1xuICAgICAgICAgICAgdGhpcy54ZiA9IHhmO1xuICAgICAgICAgICAgdGhpcy5wb3MgPSAwO1xuICAgICAgICAgICAgdGhpcy5mdWxsID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLmFjYyA9IG5ldyBBcnJheShuKTtcbiAgICAgICAgfVxuICAgICAgICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvaW5pdCddID0gX3hmQmFzZS5pbml0O1xuICAgICAgICBYQXBlcnR1cmUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWEFwZXJ0dXJlLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLnN0b3JlKGlucHV0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZ1bGwgPyB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgdGhpcy5nZXRDb3B5KCkpIDogcmVzdWx0O1xuICAgICAgICB9O1xuICAgICAgICBYQXBlcnR1cmUucHJvdG90eXBlLnN0b3JlID0gZnVuY3Rpb24gKGlucHV0KSB7XG4gICAgICAgICAgICB0aGlzLmFjY1t0aGlzLnBvc10gPSBpbnB1dDtcbiAgICAgICAgICAgIHRoaXMucG9zICs9IDE7XG4gICAgICAgICAgICBpZiAodGhpcy5wb3MgPT09IHRoaXMuYWNjLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMucG9zID0gMDtcbiAgICAgICAgICAgICAgICB0aGlzLmZ1bGwgPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBYQXBlcnR1cmUucHJvdG90eXBlLmdldENvcHkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gX2NvbmNhdChfc2xpY2UodGhpcy5hY2MsIHRoaXMucG9zKSwgX3NsaWNlKHRoaXMuYWNjLCAwLCB0aGlzLnBvcykpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGFwZXJ0dXJlKG4sIHhmKSB7XG4gICAgICAgICAgICByZXR1cm4gbmV3IFhBcGVydHVyZShuLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGRyb3AgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhEcm9wKG4sIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLm4gPSBuO1xuICAgICAgICB9XG4gICAgICAgIFhEcm9wLnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL2luaXQnXSA9IF94ZkJhc2UuaW5pdDtcbiAgICAgICAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWERyb3AucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvc3RlcCddID0gZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLm4gPiAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5uIC09IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0aGlzLnhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gX2N1cnJ5MihmdW5jdGlvbiBfeGRyb3AobiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERyb3AobiwgeGYpO1xuICAgICAgICB9KTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hkcm9wV2hpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhEcm9wV2hpbGUoZiwgeGYpIHtcbiAgICAgICAgICAgIHRoaXMueGYgPSB4ZjtcbiAgICAgICAgICAgIHRoaXMuZiA9IGY7XG4gICAgICAgIH1cbiAgICAgICAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhEcm9wV2hpbGUucHJvdG90eXBlWydAQHRyYW5zZHVjZXIvcmVzdWx0J10gPSBfeGZCYXNlLnJlc3VsdDtcbiAgICAgICAgWERyb3BXaGlsZS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9zdGVwJ10gPSBmdW5jdGlvbiAocmVzdWx0LCBpbnB1dCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZikge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLmYoaW5wdXQpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuZiA9IG51bGw7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIGlucHV0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIF9jdXJyeTIoZnVuY3Rpb24gX3hkcm9wV2hpbGUoZiwgeGYpIHtcbiAgICAgICAgICAgIHJldHVybiBuZXcgWERyb3BXaGlsZShmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIHZhciBfeGdyb3VwQnkgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFhHcm91cEJ5KGYsIHhmKSB7XG4gICAgICAgICAgICB0aGlzLnhmID0geGY7XG4gICAgICAgICAgICB0aGlzLmYgPSBmO1xuICAgICAgICAgICAgdGhpcy5pbnB1dHMgPSB7fTtcbiAgICAgICAgfVxuICAgICAgICBYR3JvdXBCeS5wcm90b3R5cGVbJ0BAdHJhbnNkdWNlci9pbml0J10gPSBfeGZCYXNlLmluaXQ7XG4gICAgICAgIFhHcm91cEJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddID0gZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgdmFyIGtleTtcbiAgICAgICAgICAgIGZvciAoa2V5IGluIHRoaXMuaW5wdXRzKSB7XG4gICAgICAgICAgICAgICAgaWYgKF9oYXMoa2V5LCB0aGlzLmlucHV0cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3N0ZXAnXShyZXN1bHQsIHRoaXMuaW5wdXRzW2tleV0pO1xuICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbJ0BAdHJhbnNkdWNlci92YWx1ZSddO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdGhpcy54ZlsnQEB0cmFuc2R1Y2VyL3Jlc3VsdCddKHJlc3VsdCk7XG4gICAgICAgIH07XG4gICAgICAgIFhHcm91cEJ5LnByb3RvdHlwZVsnQEB0cmFuc2R1Y2VyL3N0ZXAnXSA9IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gdGhpcy5mKGlucHV0KTtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRzW2tleV0gPSB0aGlzLmlucHV0c1trZXldIHx8IFtcbiAgICAgICAgICAgICAgICBrZXksXG4gICAgICAgICAgICAgICAgW11cbiAgICAgICAgICAgIF07XG4gICAgICAgICAgICB0aGlzLmlucHV0c1trZXldWzFdID0gYXBwZW5kKGlucHV0LCB0aGlzLmlucHV0c1trZXldWzFdKTtcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBfY3VycnkyKGZ1bmN0aW9uIF94Z3JvdXBCeShmLCB4Zikge1xuICAgICAgICAgICAgcmV0dXJuIG5ldyBYR3JvdXBCeShmLCB4Zik7XG4gICAgICAgIH0pO1xuICAgIH0oKTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbGlzdCBpdGVyYXRpb24gZnVuY3Rpb24gZnJvbSBhbiBleGlzdGluZyBvbmUgYnkgYWRkaW5nIHR3byBuZXcgcGFyYW1ldGVyc1xuICAgICAqIHRvIGl0cyBjYWxsYmFjayBmdW5jdGlvbjogdGhlIGN1cnJlbnQgaW5kZXgsIGFuZCB0aGUgZW50aXJlIGxpc3QuXG4gICAgICpcbiAgICAgKiBUaGlzIHdvdWxkIHR1cm4sIGZvciBpbnN0YW5jZSwgUmFtZGEncyBzaW1wbGUgYG1hcGAgZnVuY3Rpb24gaW50byBvbmUgdGhhdCBtb3JlIGNsb3NlbHlcbiAgICAgKiByZXNlbWJsZXMgYEFycmF5LnByb3RvdHlwZS5tYXBgLiAgTm90ZSB0aGF0IHRoaXMgd2lsbCBvbmx5IHdvcmsgZm9yIGZ1bmN0aW9ucyBpbiB3aGljaFxuICAgICAqIHRoZSBpdGVyYXRpb24gY2FsbGJhY2sgZnVuY3Rpb24gaXMgdGhlIGZpcnN0IHBhcmFtZXRlciwgYW5kIHdoZXJlIHRoZSBsaXN0IGlzIHRoZSBsYXN0XG4gICAgICogcGFyYW1ldGVyLiAgKFRoaXMgbGF0dGVyIG1pZ2h0IGJlIHVuaW1wb3J0YW50IGlmIHRoZSBsaXN0IHBhcmFtZXRlciBpcyBub3QgdXNlZC4pXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE1LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKChhIC4uLiAtPiBiKSAuLi4gLT4gW2FdIC0+ICopIC0+IChhIC4uLiwgSW50LCBbYV0gLT4gYikgLi4uIC0+IFthXSAtPiAqKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEEgbGlzdCBpdGVyYXRpb24gZnVuY3Rpb24gdGhhdCBkb2VzIG5vdCBwYXNzIGluZGV4IG9yIGxpc3QgdG8gaXRzIGNhbGxiYWNrXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEFuIGFsdGVyZWQgbGlzdCBpdGVyYXRpb24gZnVuY3Rpb24gdGhhdCBwYXNzZXMgKGl0ZW0sIGluZGV4LCBsaXN0KSB0byBpdHMgY2FsbGJhY2tcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWFwSW5kZXhlZCA9IFIuYWRkSW5kZXgoUi5tYXApO1xuICAgICAqICAgICAgbWFwSW5kZXhlZCgodmFsLCBpZHgpID0+IGlkeCArICctJyArIHZhbCwgWydmJywgJ28nLCAnbycsICdiJywgJ2EnLCAnciddKTtcbiAgICAgKiAgICAgIC8vPT4gWycwLWYnLCAnMS1vJywgJzItbycsICczLWInLCAnNC1hJywgJzUtciddXG4gICAgICovXG4gICAgdmFyIGFkZEluZGV4ID0gX2N1cnJ5MShmdW5jdGlvbiBhZGRJbmRleChmbikge1xuICAgICAgICByZXR1cm4gY3VycnlOKGZuLmxlbmd0aCwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgICAgICB2YXIgb3JpZ0ZuID0gYXJndW1lbnRzWzBdO1xuICAgICAgICAgICAgdmFyIGxpc3QgPSBhcmd1bWVudHNbYXJndW1lbnRzLmxlbmd0aCAtIDFdO1xuICAgICAgICAgICAgdmFyIGFyZ3MgPSBfc2xpY2UoYXJndW1lbnRzKTtcbiAgICAgICAgICAgIGFyZ3NbMF0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG9yaWdGbi5hcHBseSh0aGlzLCBfY29uY2F0KGFyZ3VtZW50cywgW1xuICAgICAgICAgICAgICAgICAgICBpZHgsXG4gICAgICAgICAgICAgICAgICAgIGxpc3RcbiAgICAgICAgICAgICAgICBdKSk7XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIG9mIHRoZSBsaXN0IG1hdGNoIHRoZSBwcmVkaWNhdGUsIGBmYWxzZWAgaWYgdGhlcmUgYXJlIGFueVxuICAgICAqIHRoYXQgZG9uJ3QuXG4gICAgICpcbiAgICAgKiBEaXNwYXRjaGVzIHRvIHRoZSBgYWxsYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBwcmVkaWNhdGUgaXMgc2F0aXNmaWVkIGJ5IGV2ZXJ5IGVsZW1lbnQsIGBmYWxzZWBcbiAgICAgKiAgICAgICAgIG90aGVyd2lzZS5cbiAgICAgKiBAc2VlIFIuYW55LCBSLm5vbmVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbGVzc1RoYW4yID0gUi5mbGlwKFIubHQpKDIpO1xuICAgICAqICAgICAgdmFyIGxlc3NUaGFuMyA9IFIuZmxpcChSLmx0KSgzKTtcbiAgICAgKiAgICAgIFIuYWxsKGxlc3NUaGFuMikoWzEsIDJdKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5hbGwobGVzc1RoYW4zKShbMSwgMl0pOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgYWxsID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdhbGwnLCBfeGFsbCwgZnVuY3Rpb24gYWxsKGZuLCBsaXN0KSB7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmICghZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGF0IGxlYXN0IG9uZSBvZiBlbGVtZW50cyBvZiB0aGUgbGlzdCBtYXRjaCB0aGUgcHJlZGljYXRlLCBgZmFsc2VgXG4gICAgICogb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGFueWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcHJlZGljYXRlIGlzIHNhdGlzZmllZCBieSBhdCBsZWFzdCBvbmUgZWxlbWVudCwgYGZhbHNlYFxuICAgICAqICAgICAgICAgb3RoZXJ3aXNlLlxuICAgICAqIEBzZWUgUi5hbGwsIFIubm9uZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBsZXNzVGhhbjAgPSBSLmZsaXAoUi5sdCkoMCk7XG4gICAgICogICAgICB2YXIgbGVzc1RoYW4yID0gUi5mbGlwKFIubHQpKDIpO1xuICAgICAqICAgICAgUi5hbnkobGVzc1RoYW4wKShbMSwgMl0pOyAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmFueShsZXNzVGhhbjIpKFsxLCAyXSk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBhbnkgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2FueScsIF94YW55LCBmdW5jdGlvbiBhbnkoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsaXN0Lmxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QsIGNvbXBvc2VkIG9mIG4tdHVwbGVzIG9mIGNvbnNlY3V0aXZlIGVsZW1lbnRzXG4gICAgICogSWYgYG5gIGlzIGdyZWF0ZXIgdGhhbiB0aGUgbGVuZ3RoIG9mIHRoZSBsaXN0LCBhbiBlbXB0eSBsaXN0IGlzIHJldHVybmVkLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGFwZXJ0dXJlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEyLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IFthXSAtPiBbW2FdXVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBzaXplIG9mIHRoZSB0dXBsZXMgdG8gY3JlYXRlXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBzcGxpdCBpbnRvIGBuYC10dXBsZXNcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuYXBlcnR1cmUoMiwgWzEsIDIsIDMsIDQsIDVdKTsgLy89PiBbWzEsIDJdLCBbMiwgM10sIFszLCA0XSwgWzQsIDVdXVxuICAgICAqICAgICAgUi5hcGVydHVyZSgzLCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtbMSwgMiwgM10sIFsyLCAzLCA0XSwgWzMsIDQsIDVdXVxuICAgICAqICAgICAgUi5hcGVydHVyZSg3LCBbMSwgMiwgMywgNCwgNV0pOyAvLz0+IFtdXG4gICAgICovXG4gICAgdmFyIGFwZXJ0dXJlID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdhcGVydHVyZScsIF94YXBlcnR1cmUsIF9hcGVydHVyZSkpO1xuXG4gICAgLyoqXG4gICAgICogV3JhcHMgYSBmdW5jdGlvbiBvZiBhbnkgYXJpdHkgKGluY2x1ZGluZyBudWxsYXJ5KSBpbiBhIGZ1bmN0aW9uIHRoYXQgYWNjZXB0cyBleGFjdGx5IDJcbiAgICAgKiBwYXJhbWV0ZXJzLiBBbnkgZXh0cmFuZW91cyBwYXJhbWV0ZXJzIHdpbGwgbm90IGJlIHBhc3NlZCB0byB0aGUgc3VwcGxpZWQgZnVuY3Rpb24uXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjIuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCogLT4gYykgLT4gKGEsIGIgLT4gYylcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgZnVuY3Rpb24gd3JhcHBpbmcgYGZuYC4gVGhlIG5ldyBmdW5jdGlvbiBpcyBndWFyYW50ZWVkIHRvIGJlIG9mXG4gICAgICogICAgICAgICBhcml0eSAyLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc1RocmVlQXJncyA9IGZ1bmN0aW9uKGEsIGIsIGMpIHtcbiAgICAgKiAgICAgICAgcmV0dXJuIFthLCBiLCBjXTtcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB0YWtlc1RocmVlQXJncy5sZW5ndGg7IC8vPT4gM1xuICAgICAqICAgICAgdGFrZXNUaHJlZUFyZ3MoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB0YWtlc1R3b0FyZ3MgPSBSLmJpbmFyeSh0YWtlc1RocmVlQXJncyk7XG4gICAgICogICAgICB0YWtlc1R3b0FyZ3MubGVuZ3RoOyAvLz0+IDJcbiAgICAgKiAgICAgIC8vIE9ubHkgMiBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgd3JhcHBlZCBmdW5jdGlvblxuICAgICAqICAgICAgdGFrZXNUd29BcmdzKDEsIDIsIDMpOyAvLz0+IFsxLCAyLCB1bmRlZmluZWRdXG4gICAgICovXG4gICAgdmFyIGJpbmFyeSA9IF9jdXJyeTEoZnVuY3Rpb24gYmluYXJ5KGZuKSB7XG4gICAgICAgIHJldHVybiBuQXJ5KDIsIGZuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBkZWVwIGNvcHkgb2YgdGhlIHZhbHVlIHdoaWNoIG1heSBjb250YWluIChuZXN0ZWQpIGBBcnJheWBzIGFuZCBgT2JqZWN0YHMsIGBOdW1iZXJgcyxcbiAgICAgKiBgU3RyaW5nYHMsIGBCb29sZWFuYHMgYW5kIGBEYXRlYHMuIGBGdW5jdGlvbmBzIGFyZSBub3QgY29waWVkLCBidXQgYXNzaWduZWQgYnkgdGhlaXJcbiAgICAgKiByZWZlcmVuY2UuIERpc3BhdGNoZXMgdG8gYSBgY2xvbmVgIG1ldGhvZCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyB7Kn0gLT4geyp9XG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgb2JqZWN0IG9yIGFycmF5IHRvIGNsb25lXG4gICAgICogQHJldHVybiB7Kn0gQSBuZXcgb2JqZWN0IG9yIGFycmF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBvYmplY3RzID0gW3t9LCB7fSwge31dO1xuICAgICAqICAgICAgdmFyIG9iamVjdHNDbG9uZSA9IFIuY2xvbmUob2JqZWN0cyk7XG4gICAgICogICAgICBvYmplY3RzWzBdID09PSBvYmplY3RzQ2xvbmVbMF07IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgY2xvbmUgPSBfY3VycnkxKGZ1bmN0aW9uIGNsb25lKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS5jbG9uZSA9PT0gJ2Z1bmN0aW9uJyA/IHZhbHVlLmNsb25lKCkgOiBfY2xvbmUodmFsdWUsIFtdLCBbXSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIG9iamVjdCBjb250YWluaW5nIGEgc2luZ2xlIGtleTp2YWx1ZSBwYWlyLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC43LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyBTdHJpbmcgLT4gYSAtPiB7U3RyaW5nOmF9XG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtleVxuICAgICAqIEBwYXJhbSB7Kn0gdmFsXG4gICAgICogQHJldHVybiB7T2JqZWN0fVxuICAgICAqIEBzZWUgUi5wYWlyLCBSLm9iak9mXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTguMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBtYXRjaFBocmFzZXMgPSBSLmNvbXBvc2UoXG4gICAgICogICAgICAgIFIuY3JlYXRlTWFwRW50cnkoJ211c3QnKSxcbiAgICAgKiAgICAgICAgUi5tYXAoUi5jcmVhdGVNYXBFbnRyeSgnbWF0Y2hfcGhyYXNlJykpXG4gICAgICogICAgICApO1xuICAgICAqICAgICAgbWF0Y2hQaHJhc2VzKFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4ge211c3Q6IFt7bWF0Y2hfcGhyYXNlOiAnZm9vJ30sIHttYXRjaF9waHJhc2U6ICdiYXInfSwge21hdGNoX3BocmFzZTogJ2Jheid9XX1cbiAgICAgKi9cbiAgICB2YXIgY3JlYXRlTWFwRW50cnkgPSBvYmpPZjtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBjdXJyaWVkIGVxdWl2YWxlbnQgb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9uLiBUaGUgY3VycmllZFxuICAgICAqIGZ1bmN0aW9uIGhhcyB0d28gdW51c3VhbCBjYXBhYmlsaXRpZXMuIEZpcnN0LCBpdHMgYXJndW1lbnRzIG5lZWRuJ3RcbiAgICAgKiBiZSBwcm92aWRlZCBvbmUgYXQgYSB0aW1lLiBJZiBgZmAgaXMgYSB0ZXJuYXJ5IGZ1bmN0aW9uIGFuZCBgZ2AgaXNcbiAgICAgKiBgUi5jdXJyeShmKWAsIHRoZSBmb2xsb3dpbmcgYXJlIGVxdWl2YWxlbnQ6XG4gICAgICpcbiAgICAgKiAgIC0gYGcoMSkoMikoMylgXG4gICAgICogICAtIGBnKDEpKDIsIDMpYFxuICAgICAqICAgLSBgZygxLCAyKSgzKWBcbiAgICAgKiAgIC0gYGcoMSwgMiwgMylgXG4gICAgICpcbiAgICAgKiBTZWNvbmRseSwgdGhlIHNwZWNpYWwgcGxhY2Vob2xkZXIgdmFsdWUgYFIuX19gIG1heSBiZSB1c2VkIHRvIHNwZWNpZnlcbiAgICAgKiBcImdhcHNcIiwgYWxsb3dpbmcgcGFydGlhbCBhcHBsaWNhdGlvbiBvZiBhbnkgY29tYmluYXRpb24gb2YgYXJndW1lbnRzLFxuICAgICAqIHJlZ2FyZGxlc3Mgb2YgdGhlaXIgcG9zaXRpb25zLiBJZiBgZ2AgaXMgYXMgYWJvdmUgYW5kIGBfYCBpcyBgUi5fX2AsXG4gICAgICogdGhlIGZvbGxvd2luZyBhcmUgZXF1aXZhbGVudDpcbiAgICAgKlxuICAgICAqICAgLSBgZygxLCAyLCAzKWBcbiAgICAgKiAgIC0gYGcoXywgMiwgMykoMSlgXG4gICAgICogICAtIGBnKF8sIF8sIDMpKDEpKDIpYFxuICAgICAqICAgLSBgZyhfLCBfLCAzKSgxLCAyKWBcbiAgICAgKiAgIC0gYGcoXywgMikoMSkoMylgXG4gICAgICogICAtIGBnKF8sIDIpKDEsIDMpYFxuICAgICAqICAgLSBgZyhfLCAyKShfLCAzKSgxKWBcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKiAtPiBhKSAtPiAoKiAtPiBhKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjdXJyeS5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcsIGN1cnJpZWQgZnVuY3Rpb24uXG4gICAgICogQHNlZSBSLmN1cnJ5TlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhZGRGb3VyTnVtYmVycyA9IChhLCBiLCBjLCBkKSA9PiBhICsgYiArIGMgKyBkO1xuICAgICAqXG4gICAgICogICAgICB2YXIgY3VycmllZEFkZEZvdXJOdW1iZXJzID0gUi5jdXJyeShhZGRGb3VyTnVtYmVycyk7XG4gICAgICogICAgICB2YXIgZiA9IGN1cnJpZWRBZGRGb3VyTnVtYmVycygxLCAyKTtcbiAgICAgKiAgICAgIHZhciBnID0gZigzKTtcbiAgICAgKiAgICAgIGcoNCk7IC8vPT4gMTBcbiAgICAgKi9cbiAgICB2YXIgY3VycnkgPSBfY3VycnkxKGZ1bmN0aW9uIGN1cnJ5KGZuKSB7XG4gICAgICAgIHJldHVybiBjdXJyeU4oZm4ubGVuZ3RoLCBmbik7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyB0aGUgbGFzdCBgbmAgZWxlbWVudHMgb2YgYSBnaXZlbiBsaXN0LCBwYXNzaW5nIGVhY2ggdmFsdWVcbiAgICAgKiB0byB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIGZ1bmN0aW9uLCBza2lwcGluZyBlbGVtZW50cyB3aGlsZSB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uIHJldHVybnNcbiAgICAgKiBgdHJ1ZWAuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIG9uZSBhcmd1bWVudDogKih2YWx1ZSkqLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGRyb3BXaGlsZWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC45LjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBuZXcgYXJyYXkuXG4gICAgICogQHNlZSBSLnRha2VXaGlsZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBsdGVUd28gPSB4ID0+IHggPD0gMjtcbiAgICAgKlxuICAgICAqICAgICAgUi5kcm9wV2hpbGUobHRlVHdvLCBbMSwgMiwgMywgNCwgMywgMiwgMV0pOyAvLz0+IFszLCA0LCAzLCAyLCAxXVxuICAgICAqL1xuICAgIHZhciBkcm9wV2hpbGUgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2Ryb3BXaGlsZScsIF94ZHJvcFdoaWxlLCBmdW5jdGlvbiBkcm9wV2hpbGUocHJlZCwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4gJiYgcHJlZChsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX3NsaWNlKGxpc3QsIGlkeCk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgaXRzIGFyZ3VtZW50cyBhcmUgZXF1aXZhbGVudCwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogRGlzcGF0Y2hlcyB0byBhbiBgZXF1YWxzYCBtZXRob2QgaWYgcHJlc2VudC4gSGFuZGxlcyBjeWNsaWNhbCBkYXRhXG4gICAgICogc3RydWN0dXJlcy5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGBlcXVhbHNgIG1ldGhvZCBvZiBib3RoIGFyZ3VtZW50cywgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTUuMFxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgYSAtPiBiIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0geyp9IGFcbiAgICAgKiBAcGFyYW0geyp9IGJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZXF1YWxzKDEsIDEpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuZXF1YWxzKDEsICcxJyk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZXF1YWxzKFsxLCAyLCAzXSwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhID0ge307IGEudiA9IGE7XG4gICAgICogICAgICB2YXIgYiA9IHt9OyBiLnYgPSBiO1xuICAgICAqICAgICAgUi5lcXVhbHMoYSwgYik7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBlcXVhbHMgPSBfY3VycnkyKGZ1bmN0aW9uIGVxdWFscyhhLCBiKSB7XG4gICAgICAgIHJldHVybiBfZXF1YWxzKGEsIGIsIFtdLCBbXSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyBvbmx5IHRob3NlIGl0ZW1zIHRoYXQgbWF0Y2ggYSBnaXZlbiBwcmVkaWNhdGUgZnVuY3Rpb24uXG4gICAgICogVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBOb3RlIHRoYXQgYFIuZmlsdGVyYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzLCB1bmxpa2UgdGhlIG5hdGl2ZVxuICAgICAqIGBBcnJheS5wcm90b3R5cGUuZmlsdGVyYCBtZXRob2QuIEZvciBtb3JlIGRldGFpbHMgb24gdGhpcyBiZWhhdmlvciwgc2VlOlxuICAgICAqIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0phdmFTY3JpcHQvUmVmZXJlbmNlL0dsb2JhbF9PYmplY3RzL0FycmF5L2ZpbHRlciNEZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGZpbHRlcmAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAgICAgKiBAc2VlIFIucmVqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGlzRXZlbiA9IG4gPT4gbiAlIDIgPT09IDA7XG4gICAgICpcbiAgICAgKiAgICAgIFIuZmlsdGVyKGlzRXZlbiwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAgICAgKi9cbiAgICB2YXIgZmlsdGVyID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdmaWx0ZXInLCBfeGZpbHRlciwgX2ZpbHRlcikpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yIGB1bmRlZmluZWRgIGlmIG5vXG4gICAgICogZWxlbWVudCBtYXRjaGVzLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGZpbmRgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBhIHwgdW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAgICAgKiAgICAgICAgZGVzaXJlZCBvbmUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBUaGUgZWxlbWVudCBmb3VuZCwgb3IgYHVuZGVmaW5lZGAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhzID0gW3thOiAxfSwge2E6IDJ9LCB7YTogM31dO1xuICAgICAqICAgICAgUi5maW5kKFIucHJvcEVxKCdhJywgMikpKHhzKTsgLy89PiB7YTogMn1cbiAgICAgKiAgICAgIFIuZmluZChSLnByb3BFcSgnYScsIDQpKSh4cyk7IC8vPT4gdW5kZWZpbmVkXG4gICAgICovXG4gICAgdmFyIGZpbmQgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2ZpbmQnLCBfeGZpbmQsIGZ1bmN0aW9uIGZpbmQoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGZuKGxpc3RbaWR4XSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbGlzdFtpZHhdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBpbmRleCBvZiB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yIGAtMWBcbiAgICAgKiBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gICAgICpcbiAgICAgKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmluZEluZGV4YCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMVxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAgICAgKiBkZXNpcmVkIG9uZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBpbmRleCBvZiB0aGUgZWxlbWVudCBmb3VuZCwgb3IgYC0xYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgeHMgPSBbe2E6IDF9LCB7YTogMn0sIHthOiAzfV07XG4gICAgICogICAgICBSLmZpbmRJbmRleChSLnByb3BFcSgnYScsIDIpKSh4cyk7IC8vPT4gMVxuICAgICAqICAgICAgUi5maW5kSW5kZXgoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IC0xXG4gICAgICovXG4gICAgdmFyIGZpbmRJbmRleCA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnZmluZEluZGV4JywgX3hmaW5kSW5kZXgsIGZ1bmN0aW9uIGZpbmRJbmRleChmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBsaXN0IHdoaWNoIG1hdGNoZXMgdGhlIHByZWRpY2F0ZSwgb3IgYHVuZGVmaW5lZGAgaWYgbm9cbiAgICAgKiBlbGVtZW50IG1hdGNoZXMuXG4gICAgICpcbiAgICAgKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmluZExhc3RgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4xXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBhIHwgdW5kZWZpbmVkXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiB1c2VkIHRvIGRldGVybWluZSBpZiB0aGUgZWxlbWVudCBpcyB0aGVcbiAgICAgKiBkZXNpcmVkIG9uZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IFRoZSBlbGVtZW50IGZvdW5kLCBvciBgdW5kZWZpbmVkYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgeHMgPSBbe2E6IDEsIGI6IDB9LCB7YToxLCBiOiAxfV07XG4gICAgICogICAgICBSLmZpbmRMYXN0KFIucHJvcEVxKCdhJywgMSkpKHhzKTsgLy89PiB7YTogMSwgYjogMX1cbiAgICAgKiAgICAgIFIuZmluZExhc3QoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqL1xuICAgIHZhciBmaW5kTGFzdCA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnZmluZExhc3QnLCBfeGZpbmRMYXN0LCBmdW5jdGlvbiBmaW5kTGFzdChmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gbGlzdC5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIGlmIChmbihsaXN0W2lkeF0pKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGxpc3RbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCAtPSAxO1xuICAgICAgICB9XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgaW5kZXggb2YgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgbGlzdCB3aGljaCBtYXRjaGVzIHRoZSBwcmVkaWNhdGUsIG9yXG4gICAgICogYC0xYCBpZiBubyBlbGVtZW50IG1hdGNoZXMuXG4gICAgICpcbiAgICAgKiBEaXNwYXRjaGVzIHRvIHRoZSBgZmluZExhc3RJbmRleGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjFcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gdXNlZCB0byBkZXRlcm1pbmUgaWYgdGhlIGVsZW1lbnQgaXMgdGhlXG4gICAgICogZGVzaXJlZCBvbmUuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7TnVtYmVyfSBUaGUgaW5kZXggb2YgdGhlIGVsZW1lbnQgZm91bmQsIG9yIGAtMWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhzID0gW3thOiAxLCBiOiAwfSwge2E6MSwgYjogMX1dO1xuICAgICAqICAgICAgUi5maW5kTGFzdEluZGV4KFIucHJvcEVxKCdhJywgMSkpKHhzKTsgLy89PiAxXG4gICAgICogICAgICBSLmZpbmRMYXN0SW5kZXgoUi5wcm9wRXEoJ2EnLCA0KSkoeHMpOyAvLz0+IC0xXG4gICAgICovXG4gICAgdmFyIGZpbmRMYXN0SW5kZXggPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2ZpbmRMYXN0SW5kZXgnLCBfeGZpbmRMYXN0SW5kZXgsIGZ1bmN0aW9uIGZpbmRMYXN0SW5kZXgoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IGxpc3QubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICBpZiAoZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggLT0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGJ5IHB1bGxpbmcgZXZlcnkgaXRlbSBvdXQgb2YgaXQgKGFuZCBhbGwgaXRzIHN1Yi1hcnJheXMpIGFuZCBwdXR0aW5nXG4gICAgICogdGhlbSBpbiBhIG5ldyBhcnJheSwgZGVwdGgtZmlyc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gW2JdXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBmbGF0dGVuZWQgbGlzdC5cbiAgICAgKiBAc2VlIFIudW5uZXN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5mbGF0dGVuKFsxLCAyLCBbMywgNF0sIDUsIFs2LCBbNywgOCwgWzksIFsxMCwgMTFdLCAxMl1dXV0pO1xuICAgICAqICAgICAgLy89PiBbMSwgMiwgMywgNCwgNSwgNiwgNywgOCwgOSwgMTAsIDExLCAxMl1cbiAgICAgKi9cbiAgICB2YXIgZmxhdHRlbiA9IF9jdXJyeTEoX21ha2VGbGF0KHRydWUpKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgZnVuY3Rpb24gbXVjaCBsaWtlIHRoZSBzdXBwbGllZCBvbmUsIGV4Y2VwdCB0aGF0IHRoZSBmaXJzdCB0d28gYXJndW1lbnRzJ1xuICAgICAqIG9yZGVyIGlzIHJldmVyc2VkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIChhIC0+IGIgLT4gYyAtPiAuLi4gLT4geikgLT4gKGIgLT4gYSAtPiBjIC0+IC4uLiAtPiB6KVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBpbnZva2Ugd2l0aCBpdHMgZmlyc3QgdHdvIHBhcmFtZXRlcnMgcmV2ZXJzZWQuXG4gICAgICogQHJldHVybiB7Kn0gVGhlIHJlc3VsdCBvZiBpbnZva2luZyBgZm5gIHdpdGggaXRzIGZpcnN0IHR3byBwYXJhbWV0ZXJzJyBvcmRlciByZXZlcnNlZC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWVyZ2VUaHJlZSA9IChhLCBiLCBjKSA9PiBbXS5jb25jYXQoYSwgYiwgYyk7XG4gICAgICpcbiAgICAgKiAgICAgIG1lcmdlVGhyZWUoMSwgMiwgMyk7IC8vPT4gWzEsIDIsIDNdXG4gICAgICpcbiAgICAgKiAgICAgIFIuZmxpcChtZXJnZVRocmVlKSgxLCAyLCAzKTsgLy89PiBbMiwgMSwgM11cbiAgICAgKi9cbiAgICB2YXIgZmxpcCA9IF9jdXJyeTEoZnVuY3Rpb24gZmxpcChmbikge1xuICAgICAgICByZXR1cm4gY3VycnkoZnVuY3Rpb24gKGEsIGIpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gX3NsaWNlKGFyZ3VtZW50cyk7XG4gICAgICAgICAgICBhcmdzWzBdID0gYjtcbiAgICAgICAgICAgIGFyZ3NbMV0gPSBhO1xuICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEl0ZXJhdGUgb3ZlciBhbiBpbnB1dCBgbGlzdGAsIGNhbGxpbmcgYSBwcm92aWRlZCBmdW5jdGlvbiBgZm5gIGZvciBlYWNoIGVsZW1lbnQgaW4gdGhlXG4gICAgICogbGlzdC5cbiAgICAgKlxuICAgICAqIGBmbmAgcmVjZWl2ZXMgb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBOb3RlOiBgUi5mb3JFYWNoYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2UgYXJyYXlzKSwgdW5saWtlXG4gICAgICogdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvZm9yRWFjaCNEZXNjcmlwdGlvblxuICAgICAqXG4gICAgICogQWxzbyBub3RlIHRoYXQsIHVubGlrZSBgQXJyYXkucHJvdG90eXBlLmZvckVhY2hgLCBSYW1kYSdzIGBmb3JFYWNoYCByZXR1cm5zIHRoZSBvcmlnaW5hbFxuICAgICAqIGFycmF5LiBJbiBzb21lIGxpYnJhcmllcyB0aGlzIGZ1bmN0aW9uIGlzIG5hbWVkIGBlYWNoYC5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGBmb3JFYWNoYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4xXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+ICopIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gaW52b2tlLiBSZWNlaXZlcyBvbmUgYXJndW1lbnQsIGB2YWx1ZWAuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBvcmlnaW5hbCBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBwcmludFhQbHVzRml2ZSA9IHggPT4gY29uc29sZS5sb2coeCArIDUpO1xuICAgICAqICAgICAgUi5mb3JFYWNoKHByaW50WFBsdXNGaXZlLCBbMSwgMiwgM10pOyAvLz0+IFsxLCAyLCAzXVxuICAgICAqICAgICAgLy8tPiA2XG4gICAgICogICAgICAvLy0+IDdcbiAgICAgKiAgICAgIC8vLT4gOFxuICAgICAqL1xuICAgIHZhciBmb3JFYWNoID0gX2N1cnJ5MihfY2hlY2tGb3JNZXRob2QoJ2ZvckVhY2gnLCBmdW5jdGlvbiBmb3JFYWNoKGZuLCBsaXN0KSB7XG4gICAgICAgIHZhciBsZW4gPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIGZuKGxpc3RbaWR4XSk7XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbGlzdDtcbiAgICB9KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbGlzdCBvZiBmdW5jdGlvbiBuYW1lcyBvZiBvYmplY3QncyBvd24gZnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjQuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHsqfSAtPiBbU3RyaW5nXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdHMgd2l0aCBmdW5jdGlvbnMgaW4gaXRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBsaXN0IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcyB0aGF0IG1hcCB0byBmdW5jdGlvbnMuXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTguMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZnVuY3Rpb25zKFIpOyAvLyByZXR1cm5zIGxpc3Qgb2YgcmFtZGEncyBvd24gZnVuY3Rpb24gbmFtZXNcbiAgICAgKlxuICAgICAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gZnVuY3Rpb24oKXt9OyB0aGlzLnkgPSAxOyB9XG4gICAgICogICAgICBGLnByb3RvdHlwZS56ID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgKiAgICAgIEYucHJvdG90eXBlLmEgPSAxMDA7XG4gICAgICogICAgICBSLmZ1bmN0aW9ucyhuZXcgRigpKTsgLy89PiBbXCJ4XCJdXG4gICAgICovXG4gICAgdmFyIGZ1bmN0aW9ucyA9IF9jdXJyeTEoX2Z1bmN0aW9uc1dpdGgoa2V5cykpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3Qgb2YgZnVuY3Rpb24gbmFtZXMgb2Ygb2JqZWN0J3Mgb3duIGFuZCBwcm90b3R5cGUgZnVuY3Rpb25zXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjQuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHsqfSAtPiBbU3RyaW5nXVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmogVGhlIG9iamVjdHMgd2l0aCBmdW5jdGlvbnMgaW4gaXRcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQSBsaXN0IG9mIHRoZSBvYmplY3QncyBvd24gcHJvcGVydGllcyBhbmQgcHJvdG90eXBlXG4gICAgICogICAgICAgICBwcm9wZXJ0aWVzIHRoYXQgbWFwIHRvIGZ1bmN0aW9ucy5cbiAgICAgKiBAZGVwcmVjYXRlZCBzaW5jZSB2MC4xOC4wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5mdW5jdGlvbnNJbihSKTsgLy8gcmV0dXJucyBsaXN0IG9mIHJhbWRhJ3Mgb3duIGFuZCBwcm90b3R5cGUgZnVuY3Rpb24gbmFtZXNcbiAgICAgKlxuICAgICAqICAgICAgdmFyIEYgPSBmdW5jdGlvbigpIHsgdGhpcy54ID0gZnVuY3Rpb24oKXt9OyB0aGlzLnkgPSAxOyB9XG4gICAgICogICAgICBGLnByb3RvdHlwZS56ID0gZnVuY3Rpb24oKSB7fTtcbiAgICAgKiAgICAgIEYucHJvdG90eXBlLmEgPSAxMDA7XG4gICAgICogICAgICBSLmZ1bmN0aW9uc0luKG5ldyBGKCkpOyAvLz0+IFtcInhcIiwgXCJ6XCJdXG4gICAgICovXG4gICAgdmFyIGZ1bmN0aW9uc0luID0gX2N1cnJ5MShfZnVuY3Rpb25zV2l0aChrZXlzSW4pKTtcblxuICAgIC8qKlxuICAgICAqIFNwbGl0cyBhIGxpc3QgaW50byBzdWItbGlzdHMgc3RvcmVkIGluIGFuIG9iamVjdCwgYmFzZWQgb24gdGhlIHJlc3VsdCBvZiBjYWxsaW5nIGEgU3RyaW5nLXJldHVybmluZyBmdW5jdGlvblxuICAgICAqIG9uIGVhY2ggZWxlbWVudCwgYW5kIGdyb3VwaW5nIHRoZSByZXN1bHRzIGFjY29yZGluZyB0byB2YWx1ZXMgcmV0dXJuZWQuXG4gICAgICpcbiAgICAgKiBEaXNwYXRjaGVzIHRvIHRoZSBgZ3JvdXBCeWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gU3RyaW5nKSAtPiBbYV0gLT4ge1N0cmluZzogW2FdfVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIEZ1bmN0aW9uIDo6IGEgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gZ3JvdXBcbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEFuIG9iamVjdCB3aXRoIHRoZSBvdXRwdXQgb2YgYGZuYCBmb3Iga2V5cywgbWFwcGVkIHRvIGFycmF5cyBvZiBlbGVtZW50c1xuICAgICAqICAgICAgICAgdGhhdCBwcm9kdWNlZCB0aGF0IGtleSB3aGVuIHBhc3NlZCB0byBgZm5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBieUdyYWRlID0gUi5ncm91cEJ5KGZ1bmN0aW9uKHN0dWRlbnQpIHtcbiAgICAgKiAgICAgICAgdmFyIHNjb3JlID0gc3R1ZGVudC5zY29yZTtcbiAgICAgKiAgICAgICAgcmV0dXJuIHNjb3JlIDwgNjUgPyAnRicgOlxuICAgICAqICAgICAgICAgICAgICAgc2NvcmUgPCA3MCA/ICdEJyA6XG4gICAgICogICAgICAgICAgICAgICBzY29yZSA8IDgwID8gJ0MnIDpcbiAgICAgKiAgICAgICAgICAgICAgIHNjb3JlIDwgOTAgPyAnQicgOiAnQSc7XG4gICAgICogICAgICB9KTtcbiAgICAgKiAgICAgIHZhciBzdHVkZW50cyA9IFt7bmFtZTogJ0FiYnknLCBzY29yZTogODR9LFxuICAgICAqICAgICAgICAgICAgICAgICAgICAgIHtuYW1lOiAnRWRkeScsIHNjb3JlOiA1OH0sXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgLy8gLi4uXG4gICAgICogICAgICAgICAgICAgICAgICAgICAge25hbWU6ICdKYWNrJywgc2NvcmU6IDY5fV07XG4gICAgICogICAgICBieUdyYWRlKHN0dWRlbnRzKTtcbiAgICAgKiAgICAgIC8vIHtcbiAgICAgKiAgICAgIC8vICAgJ0EnOiBbe25hbWU6ICdEaWFubmUnLCBzY29yZTogOTl9XSxcbiAgICAgKiAgICAgIC8vICAgJ0InOiBbe25hbWU6ICdBYmJ5Jywgc2NvcmU6IDg0fV1cbiAgICAgKiAgICAgIC8vICAgLy8gLi4uLFxuICAgICAqICAgICAgLy8gICAnRic6IFt7bmFtZTogJ0VkZHknLCBzY29yZTogNTh9XVxuICAgICAqICAgICAgLy8gfVxuICAgICAqL1xuICAgIHZhciBncm91cEJ5ID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdncm91cEJ5JywgX3hncm91cEJ5LCBmdW5jdGlvbiBncm91cEJ5KGZuLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGVsdCkge1xuICAgICAgICAgICAgdmFyIGtleSA9IGZuKGVsdCk7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IGFwcGVuZChlbHQsIGFjY1trZXldIHx8IChhY2Nba2V5XSA9IFtdKSk7XG4gICAgICAgICAgICByZXR1cm4gYWNjO1xuICAgICAgICB9LCB7fSwgbGlzdCk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuIEluIHNvbWUgbGlicmFyaWVzXG4gICAgICogdGhpcyBmdW5jdGlvbiBpcyBuYW1lZCBgZmlyc3RgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi50YWlsLCBSLmluaXQsIFIubGFzdFxuICAgICAqIEBzaWcgW2FdIC0+IGEgfCBVbmRlZmluZWRcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaGVhZChbJ2ZpJywgJ2ZvJywgJ2Z1bSddKTsgLy89PiAnZmknXG4gICAgICogICAgICBSLmhlYWQoW10pOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogICAgICBSLmhlYWQoJ2FiYycpOyAvLz0+ICdhJ1xuICAgICAqICAgICAgUi5oZWFkKCcnKTsgLy89PiAnJ1xuICAgICAqL1xuICAgIHZhciBoZWFkID0gbnRoKDApO1xuXG4gICAgLyoqXG4gICAgICogQ29tYmluZXMgdHdvIGxpc3RzIGludG8gYSBzZXQgKGkuZS4gbm8gZHVwbGljYXRlcykgY29tcG9zZWQgb2YgdGhvc2VcbiAgICAgKiBlbGVtZW50cyBjb21tb24gdG8gYm90aCBsaXN0cy4gIER1cGxpY2F0aW9uIGlzIGRldGVybWluZWQgYWNjb3JkaW5nXG4gICAgICogdG8gdGhlIHZhbHVlIHJldHVybmVkIGJ5IGFwcGx5aW5nIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgdG8gdHdvIGxpc3RcbiAgICAgKiBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyAoYSxhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSBmdW5jdGlvbiB0aGF0IGRldGVybWluZXMgd2hldGhlclxuICAgICAqICAgICAgICB0aGUgdHdvIHN1cHBsaWVkIGVsZW1lbnRzIGFyZSBlcXVhbC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0MSBPbmUgbGlzdCBvZiBpdGVtcyB0byBjb21wYXJlXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgQSBzZWNvbmQgbGlzdCBvZiBpdGVtcyB0byBjb21wYXJlXG4gICAgICogQHNlZSBSLmludGVyc2VjdGlvblxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhvc2UgZWxlbWVudHMgY29tbW9uIHRvIGJvdGggbGlzdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGJ1ZmZhbG9TcHJpbmdmaWVsZCA9IFtcbiAgICAgKiAgICAgICAge2lkOiA4MjQsIG5hbWU6ICdSaWNoaWUgRnVyYXknfSxcbiAgICAgKiAgICAgICAge2lkOiA5NTYsIG5hbWU6ICdEZXdleSBNYXJ0aW4nfSxcbiAgICAgKiAgICAgICAge2lkOiAzMTMsIG5hbWU6ICdCcnVjZSBQYWxtZXInfSxcbiAgICAgKiAgICAgICAge2lkOiA0NTYsIG5hbWU6ICdTdGVwaGVuIFN0aWxscyd9LFxuICAgICAqICAgICAgICB7aWQ6IDE3NywgbmFtZTogJ05laWwgWW91bmcnfVxuICAgICAqICAgICAgXTtcbiAgICAgKiAgICAgIHZhciBjc255ID0gW1xuICAgICAqICAgICAgICB7aWQ6IDIwNCwgbmFtZTogJ0RhdmlkIENyb3NieSd9LFxuICAgICAqICAgICAgICB7aWQ6IDQ1NiwgbmFtZTogJ1N0ZXBoZW4gU3RpbGxzJ30sXG4gICAgICogICAgICAgIHtpZDogNTM5LCBuYW1lOiAnR3JhaGFtIE5hc2gnfSxcbiAgICAgKiAgICAgICAge2lkOiAxNzcsIG5hbWU6ICdOZWlsIFlvdW5nJ31cbiAgICAgKiAgICAgIF07XG4gICAgICpcbiAgICAgKiAgICAgIFIuaW50ZXJzZWN0aW9uV2l0aChSLmVxQnkoUi5wcm9wKCdpZCcpKSwgYnVmZmFsb1NwcmluZ2ZpZWxkLCBjc255KTtcbiAgICAgKiAgICAgIC8vPT4gW3tpZDogNDU2LCBuYW1lOiAnU3RlcGhlbiBTdGlsbHMnfSwge2lkOiAxNzcsIG5hbWU6ICdOZWlsIFlvdW5nJ31dXG4gICAgICovXG4gICAgdmFyIGludGVyc2VjdGlvbldpdGggPSBfY3VycnkzKGZ1bmN0aW9uIGludGVyc2VjdGlvbldpdGgocHJlZCwgbGlzdDEsIGxpc3QyKSB7XG4gICAgICAgIHZhciByZXN1bHRzID0gW10sIGlkeCA9IDA7XG4gICAgICAgIHdoaWxlIChpZHggPCBsaXN0MS5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChfY29udGFpbnNXaXRoKHByZWQsIGxpc3QxW2lkeF0sIGxpc3QyKSkge1xuICAgICAgICAgICAgICAgIHJlc3VsdHNbcmVzdWx0cy5sZW5ndGhdID0gbGlzdDFbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB1bmlxV2l0aChwcmVkLCByZXN1bHRzKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENyZWF0ZXMgYSBuZXcgbGlzdCB3aXRoIHRoZSBzZXBhcmF0b3IgaW50ZXJwb3NlZCBiZXR3ZWVuIGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGludGVyc3BlcnNlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTQuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0geyp9IHNlcGFyYXRvciBUaGUgZWxlbWVudCB0byBhZGQgdG8gdGhlIGxpc3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgbGlzdCB0byBiZSBpbnRlcnBvc2VkLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbmV3IGxpc3QuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pbnRlcnNwZXJzZSgnbicsIFsnYmEnLCAnYScsICdhJ10pOyAvLz0+IFsnYmEnLCAnbicsICdhJywgJ24nLCAnYSddXG4gICAgICovXG4gICAgdmFyIGludGVyc3BlcnNlID0gX2N1cnJ5MihfY2hlY2tGb3JNZXRob2QoJ2ludGVyc3BlcnNlJywgZnVuY3Rpb24gaW50ZXJzcGVyc2Uoc2VwYXJhdG9yLCBsaXN0KSB7XG4gICAgICAgIHZhciBvdXQgPSBbXTtcbiAgICAgICAgdmFyIGlkeCA9IDA7XG4gICAgICAgIHZhciBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbmd0aCkge1xuICAgICAgICAgICAgaWYgKGlkeCA9PT0gbGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGxpc3RbaWR4XSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIG91dC5wdXNoKGxpc3RbaWR4XSwgc2VwYXJhdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogU2FtZSBhcyBSLmludmVydE9iaiwgaG93ZXZlciB0aGlzIGFjY291bnRzIGZvciBvYmplY3RzXG4gICAgICogd2l0aCBkdXBsaWNhdGUgdmFsdWVzIGJ5IHB1dHRpbmcgdGhlIHZhbHVlcyBpbnRvIGFuXG4gICAgICogYXJyYXkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtzOiB4fSAtPiB7eDogWyBzLCAuLi4gXX1cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaW52ZXJ0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBvdXQgQSBuZXcgb2JqZWN0IHdpdGgga2V5c1xuICAgICAqIGluIGFuIGFycmF5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciByYWNlUmVzdWx0c0J5Rmlyc3ROYW1lID0ge1xuICAgICAqICAgICAgICBmaXJzdDogJ2FsaWNlJyxcbiAgICAgKiAgICAgICAgc2Vjb25kOiAnamFrZScsXG4gICAgICogICAgICAgIHRoaXJkOiAnYWxpY2UnLFxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIFIuaW52ZXJ0KHJhY2VSZXN1bHRzQnlGaXJzdE5hbWUpO1xuICAgICAqICAgICAgLy89PiB7ICdhbGljZSc6IFsnZmlyc3QnLCAndGhpcmQnXSwgJ2pha2UnOlsnc2Vjb25kJ10gfVxuICAgICAqL1xuICAgIHZhciBpbnZlcnQgPSBfY3VycnkxKGZ1bmN0aW9uIGludmVydChvYmopIHtcbiAgICAgICAgdmFyIHByb3BzID0ga2V5cyhvYmopO1xuICAgICAgICB2YXIgbGVuID0gcHJvcHMubGVuZ3RoO1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgdmFyIG91dCA9IHt9O1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICB2YXIga2V5ID0gcHJvcHNbaWR4XTtcbiAgICAgICAgICAgIHZhciB2YWwgPSBvYmpba2V5XTtcbiAgICAgICAgICAgIHZhciBsaXN0ID0gX2hhcyh2YWwsIG91dCkgPyBvdXRbdmFsXSA6IG91dFt2YWxdID0gW107XG4gICAgICAgICAgICBsaXN0W2xpc3QubGVuZ3RoXSA9IGtleTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IG9iamVjdCB3aXRoIHRoZSBrZXlzIG9mIHRoZSBnaXZlbiBvYmplY3RcbiAgICAgKiBhcyB2YWx1ZXMsIGFuZCB0aGUgdmFsdWVzIG9mIHRoZSBnaXZlbiBvYmplY3QsIHdoaWNoIGFyZVxuICAgICAqIGNvZXJjZWQgdG8gc3RyaW5ncywgYXMga2V5cy5cbiAgICAgKiBOb3RlIHRoYXQgdGhlIGxhc3Qga2V5IGZvdW5kIGlzIHByZWZlcnJlZCB3aGVuIGhhbmRsaW5nXG4gICAgICogdGhlIHNhbWUgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAc2lnIHtzOiB4fSAtPiB7eDogc31cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3Qgb3IgYXJyYXkgdG8gaW52ZXJ0XG4gICAgICogQHJldHVybiB7T2JqZWN0fSBvdXQgQSBuZXcgb2JqZWN0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHJhY2VSZXN1bHRzID0ge1xuICAgICAqICAgICAgICBmaXJzdDogJ2FsaWNlJyxcbiAgICAgKiAgICAgICAgc2Vjb25kOiAnamFrZSdcbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBSLmludmVydE9iaihyYWNlUmVzdWx0cyk7XG4gICAgICogICAgICAvLz0+IHsgJ2FsaWNlJzogJ2ZpcnN0JywgJ2pha2UnOidzZWNvbmQnIH1cbiAgICAgKlxuICAgICAqICAgICAgLy8gQWx0ZXJuYXRpdmVseTpcbiAgICAgKiAgICAgIHZhciByYWNlUmVzdWx0cyA9IFsnYWxpY2UnLCAnamFrZSddO1xuICAgICAqICAgICAgUi5pbnZlcnRPYmoocmFjZVJlc3VsdHMpO1xuICAgICAqICAgICAgLy89PiB7ICdhbGljZSc6ICcwJywgJ2pha2UnOicxJyB9XG4gICAgICovXG4gICAgdmFyIGludmVydE9iaiA9IF9jdXJyeTEoZnVuY3Rpb24gaW52ZXJ0T2JqKG9iaikge1xuICAgICAgICB2YXIgcHJvcHMgPSBrZXlzKG9iaik7XG4gICAgICAgIHZhciBsZW4gPSBwcm9wcy5sZW5ndGg7XG4gICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICB2YXIgb3V0ID0ge307XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSBwcm9wc1tpZHhdO1xuICAgICAgICAgICAgb3V0W29ialtrZXldXSA9IGtleTtcbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgaXRzIHR5cGUncyBlbXB0eSB2YWx1ZTsgYGZhbHNlYFxuICAgICAqIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyBhIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0geyp9IHhcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBzZWUgUi5lbXB0eVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaXNFbXB0eShbMSwgMiwgM10pOyAgIC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuaXNFbXB0eShbXSk7ICAgICAgICAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgUi5pc0VtcHR5KCcnKTsgICAgICAgICAgLy89PiB0cnVlXG4gICAgICogICAgICBSLmlzRW1wdHkobnVsbCk7ICAgICAgICAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlzRW1wdHkoe30pOyAgICAgICAgICAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXNFbXB0eSh7bGVuZ3RoOiAwfSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgaXNFbXB0eSA9IF9jdXJyeTEoZnVuY3Rpb24gaXNFbXB0eSh4KSB7XG4gICAgICAgIHJldHVybiB4ICE9IG51bGwgJiYgZXF1YWxzKHgsIGVtcHR5KHgpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxhc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuNFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNlZSBSLmluaXQsIFIuaGVhZCwgUi50YWlsXG4gICAgICogQHNpZyBbYV0gLT4gYSB8IFVuZGVmaW5lZFxuICAgICAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7Kn0gbGlzdFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5sYXN0KFsnZmknLCAnZm8nLCAnZnVtJ10pOyAvLz0+ICdmdW0nXG4gICAgICogICAgICBSLmxhc3QoW10pOyAvLz0+IHVuZGVmaW5lZFxuICAgICAqXG4gICAgICogICAgICBSLmxhc3QoJ2FiYycpOyAvLz0+ICdjJ1xuICAgICAqICAgICAgUi5sYXN0KCcnKTsgLy89PiAnJ1xuICAgICAqL1xuICAgIHZhciBsYXN0ID0gbnRoKC0xKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBsYXN0IG9jY3VycmVuY2Ugb2YgYW4gaXRlbSBpblxuICAgICAqIGFuIGFycmF5LCBvciAtMSBpZiB0aGUgaXRlbSBpcyBub3QgaW5jbHVkZWQgaW4gdGhlIGFycmF5LlxuICAgICAqIGBSLmVxdWFsc2AgaXMgdXNlZCB0byBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IFthXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0geyp9IHRhcmdldCBUaGUgaXRlbSB0byBmaW5kLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBhcnJheSB0byBzZWFyY2ggaW4uXG4gICAgICogQHJldHVybiB7TnVtYmVyfSB0aGUgaW5kZXggb2YgdGhlIHRhcmdldCwgb3IgLTEgaWYgdGhlIHRhcmdldCBpcyBub3QgZm91bmQuXG4gICAgICogQHNlZSBSLmluZGV4T2ZcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmxhc3RJbmRleE9mKDMsIFstMSwzLDMsMCwxLDIsMyw0XSk7IC8vPT4gNlxuICAgICAqICAgICAgUi5sYXN0SW5kZXhPZigxMCwgWzEsMiwzLDRdKTsgLy89PiAtMVxuICAgICAqL1xuICAgIHZhciBsYXN0SW5kZXhPZiA9IF9jdXJyeTIoZnVuY3Rpb24gbGFzdEluZGV4T2YodGFyZ2V0LCB4cykge1xuICAgICAgICBpZiAodHlwZW9mIHhzLmxhc3RJbmRleE9mID09PSAnZnVuY3Rpb24nICYmICFfaXNBcnJheSh4cykpIHtcbiAgICAgICAgICAgIHJldHVybiB4cy5sYXN0SW5kZXhPZih0YXJnZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdmFyIGlkeCA9IHhzLmxlbmd0aCAtIDE7XG4gICAgICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICBpZiAoZXF1YWxzKHhzW2lkeF0sIHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGlkeDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWR4IC09IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCwgY29uc3RydWN0ZWQgYnkgYXBwbHlpbmcgdGhlIHN1cHBsaWVkIGZ1bmN0aW9uIHRvIGV2ZXJ5IGVsZW1lbnQgb2YgdGhlXG4gICAgICogc3VwcGxpZWQgbGlzdC5cbiAgICAgKlxuICAgICAqIE5vdGU6IGBSLm1hcGAgZG9lcyBub3Qgc2tpcCBkZWxldGVkIG9yIHVuYXNzaWduZWQgaW5kaWNlcyAoc3BhcnNlIGFycmF5cyksIHVubGlrZSB0aGVcbiAgICAgKiBuYXRpdmUgYEFycmF5LnByb3RvdHlwZS5tYXBgIG1ldGhvZC4gRm9yIG1vcmUgZGV0YWlscyBvbiB0aGlzIGJlaGF2aW9yLCBzZWU6XG4gICAgICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvSmF2YVNjcmlwdC9SZWZlcmVuY2UvR2xvYmFsX09iamVjdHMvQXJyYXkvbWFwI0Rlc2NyaXB0aW9uXG4gICAgICpcbiAgICAgKiBEaXNwYXRjaGVzIHRvIHRoZSBgbWFwYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBNYXAgdHJlYXRzIGFsc28gdHJlYXRzIGZ1bmN0aW9ucyBhcyBmdW5jdG9ycyBhbmQgd2lsbCBjb21wb3NlIHRoZW0gdG9nZXRoZXIuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBGdW5jdG9yIGYgPT4gKGEgLT4gYikgLT4gZiBhIC0+IGYgYlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBiZSBjYWxsZWQgb24gZXZlcnkgZWxlbWVudCBvZiB0aGUgaW5wdXQgYGxpc3RgLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGxpc3QgdG8gYmUgaXRlcmF0ZWQgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBsaXN0LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBkb3VibGUgPSB4ID0+IHggKiAyO1xuICAgICAqXG4gICAgICogICAgICBSLm1hcChkb3VibGUsIFsxLCAyLCAzXSk7IC8vPT4gWzIsIDQsIDZdXG4gICAgICpcbiAgICAgKiAgICAgIFIubWFwKGRvdWJsZSwge3g6IDEsIHk6IDIsIHo6IDN9KTsgLy89PiB7eDogMiwgeTogNCwgejogNn1cbiAgICAgKi9cbiAgICB2YXIgbWFwID0gX2N1cnJ5MihfZGlzcGF0Y2hhYmxlKCdtYXAnLCBfeG1hcCwgZnVuY3Rpb24gbWFwKGZuLCBmdW5jdG9yKSB7XG4gICAgICAgIHN3aXRjaCAoT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGZ1bmN0b3IpKSB7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgRnVuY3Rpb25dJzpcbiAgICAgICAgICAgIHJldHVybiBjdXJyeU4oZnVuY3Rvci5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm4uY2FsbCh0aGlzLCBmdW5jdG9yLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgT2JqZWN0XSc6XG4gICAgICAgICAgICByZXR1cm4gX3JlZHVjZShmdW5jdGlvbiAoYWNjLCBrZXkpIHtcbiAgICAgICAgICAgICAgICBhY2Nba2V5XSA9IGZuKGZ1bmN0b3Jba2V5XSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgICAgIH0sIHt9LCBrZXlzKGZ1bmN0b3IpKTtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiBfbWFwKGZuLCBmdW5jdG9yKTtcbiAgICAgICAgfVxuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIE1hcCwgYnV0IGZvciBvYmplY3RzLiBDcmVhdGVzIGFuIG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYXMgYG9iamAgYW5kIHZhbHVlc1xuICAgICAqIGdlbmVyYXRlZCBieSBydW5uaW5nIGVhY2ggcHJvcGVydHkgb2YgYG9iamAgdGhyb3VnaCBgZm5gLiBgZm5gIGlzIHBhc3NlZCBvbmUgYXJndW1lbnQ6XG4gICAgICogKih2YWx1ZSkqLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjRcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHNpZyAodiAtPiB2KSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBmdW5jdGlvbiBjYWxsZWQgZm9yIGVhY2ggcHJvcGVydHkgaW4gYG9iamAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgICAqIGJlY29tZSBhIG5ldyBwcm9wZXJ0eSBvbiB0aGUgcmV0dXJuIG9iamVjdC5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gaXRlcmF0ZSBvdmVyLlxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggdGhlIHNhbWUga2V5cyBhcyBgb2JqYCBhbmQgdmFsdWVzIHRoYXQgYXJlIHRoZSByZXN1bHRcbiAgICAgKiAgICAgICAgIG9mIHJ1bm5pbmcgZWFjaCBwcm9wZXJ0eSB0aHJvdWdoIGBmbmAuXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTguMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB2YWx1ZXMgPSB7IHg6IDEsIHk6IDIsIHo6IDMgfTtcbiAgICAgKiAgICAgIHZhciBkb3VibGUgPSBudW0gPT4gbnVtICogMjtcbiAgICAgKlxuICAgICAqICAgICAgUi5tYXBPYmooZG91YmxlLCB2YWx1ZXMpOyAvLz0+IHsgeDogMiwgeTogNCwgejogNiB9XG4gICAgICovXG4gICAgdmFyIG1hcE9iaiA9IF9jdXJyeTIoZnVuY3Rpb24gbWFwT2JqKGZuLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgICAgICBhY2Nba2V5XSA9IGZuKG9ialtrZXldKTtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIHt9LCBrZXlzKG9iaikpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogTGlrZSBgbWFwT2JqYCwgYnV0IHBhc3NlcyBhZGRpdGlvbmFsIGFyZ3VtZW50cyB0byB0aGUgcHJlZGljYXRlIGZ1bmN0aW9uLiBUaGVcbiAgICAgKiBwcmVkaWNhdGUgZnVuY3Rpb24gaXMgcGFzc2VkIHRocmVlIGFyZ3VtZW50czogKih2YWx1ZSwga2V5LCBvYmopKi5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOS4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgKHYsIGssIHtrOiB2fSAtPiB2KSAtPiB7azogdn0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gQSBmdW5jdGlvbiBjYWxsZWQgZm9yIGVhY2ggcHJvcGVydHkgaW4gYG9iamAuIEl0cyByZXR1cm4gdmFsdWUgd2lsbFxuICAgICAqICAgICAgICBiZWNvbWUgYSBuZXcgcHJvcGVydHkgb24gdGhlIHJldHVybiBvYmplY3QuXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtPYmplY3R9IEEgbmV3IG9iamVjdCB3aXRoIHRoZSBzYW1lIGtleXMgYXMgYG9iamAgYW5kIHZhbHVlcyB0aGF0IGFyZSB0aGUgcmVzdWx0XG4gICAgICogICAgICAgICBvZiBydW5uaW5nIGVhY2ggcHJvcGVydHkgdGhyb3VnaCBgZm5gLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciB2YWx1ZXMgPSB7IHg6IDEsIHk6IDIsIHo6IDMgfTtcbiAgICAgKiAgICAgIHZhciBwcmVwZW5kS2V5QW5kRG91YmxlID0gKG51bSwga2V5LCBvYmopID0+IGtleSArIChudW0gKiAyKTtcbiAgICAgKlxuICAgICAqICAgICAgUi5tYXBPYmpJbmRleGVkKHByZXBlbmRLZXlBbmREb3VibGUsIHZhbHVlcyk7IC8vPT4geyB4OiAneDInLCB5OiAneTQnLCB6OiAnejYnIH1cbiAgICAgKi9cbiAgICB2YXIgbWFwT2JqSW5kZXhlZCA9IF9jdXJyeTIoZnVuY3Rpb24gbWFwT2JqSW5kZXhlZChmbiwgb2JqKSB7XG4gICAgICAgIHJldHVybiBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICAgICAgYWNjW2tleV0gPSBmbihvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgICAgICAgcmV0dXJuIGFjYztcbiAgICAgICAgfSwge30sIGtleXMob2JqKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiBubyBlbGVtZW50cyBvZiB0aGUgbGlzdCBtYXRjaCB0aGUgcHJlZGljYXRlLFxuICAgICAqIGBmYWxzZWAgb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGFueWAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEyLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgcHJlZGljYXRlIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgcHJlZGljYXRlIGlzIG5vdCBzYXRpc2ZpZWQgYnkgZXZlcnkgZWxlbWVudCwgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogQHNlZSBSLmFsbCwgUi5hbnlcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLm5vbmUoUi5pc05hTiwgWzEsIDIsIDNdKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLm5vbmUoUi5pc05hTiwgWzEsIDIsIDMsIE5hTl0pOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIG5vbmUgPSBfY3VycnkyKF9jb21wbGVtZW50KF9kaXNwYXRjaGFibGUoJ2FueScsIF94YW55LCBhbnkpKSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgYSBsaXN0IG9mIGFyZ3VtZW50cywgYW5kIHJldHVybnMgYSBmdW5jdGlvbiBgZ2AuXG4gICAgICogV2hlbiBhcHBsaWVkLCBgZ2AgcmV0dXJucyB0aGUgcmVzdWx0IG9mIGFwcGx5aW5nIGBmYCB0byB0aGUgYXJndW1lbnRzXG4gICAgICogcHJvdmlkZWQgaW5pdGlhbGx5IGZvbGxvd2VkIGJ5IHRoZSBhcmd1bWVudHMgcHJvdmlkZWQgdG8gYGdgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xMC4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKGEsIGIsIGMsIC4uLiwgbikgLT4geCkgLT4gW2EsIGIsIGMsIC4uLl0gLT4gKChkLCBlLCBmLCAuLi4sIG4pIC0+IHgpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGFyZ3NcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKiBAc2VlIFIucGFydGlhbFJpZ2h0XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG11bHRpcGx5ID0gKGEsIGIpID0+IGEgKiBiO1xuICAgICAqICAgICAgdmFyIGRvdWJsZSA9IFIucGFydGlhbChtdWx0aXBseSwgWzJdKTtcbiAgICAgKiAgICAgIGRvdWJsZSgyKTsgLy89PiA0XG4gICAgICpcbiAgICAgKiAgICAgIHZhciBncmVldCA9IChzYWx1dGF0aW9uLCB0aXRsZSwgZmlyc3ROYW1lLCBsYXN0TmFtZSkgPT5cbiAgICAgKiAgICAgICAgc2FsdXRhdGlvbiArICcsICcgKyB0aXRsZSArICcgJyArIGZpcnN0TmFtZSArICcgJyArIGxhc3ROYW1lICsgJyEnO1xuICAgICAqXG4gICAgICogICAgICB2YXIgc2F5SGVsbG8gPSBSLnBhcnRpYWwoZ3JlZXQsIFsnSGVsbG8nXSk7XG4gICAgICogICAgICB2YXIgc2F5SGVsbG9Ub01zID0gUi5wYXJ0aWFsKHNheUhlbGxvLCBbJ01zLiddKTtcbiAgICAgKiAgICAgIHNheUhlbGxvVG9NcygnSmFuZScsICdKb25lcycpOyAvLz0+ICdIZWxsbywgTXMuIEphbmUgSm9uZXMhJ1xuICAgICAqL1xuICAgIHZhciBwYXJ0aWFsID0gX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yKF9jb25jYXQpO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBmdW5jdGlvbiBgZmAgYW5kIGEgbGlzdCBvZiBhcmd1bWVudHMsIGFuZCByZXR1cm5zIGEgZnVuY3Rpb24gYGdgLlxuICAgICAqIFdoZW4gYXBwbGllZCwgYGdgIHJldHVybnMgdGhlIHJlc3VsdCBvZiBhcHBseWluZyBgZmAgdG8gdGhlIGFyZ3VtZW50c1xuICAgICAqIHByb3ZpZGVkIHRvIGBnYCBmb2xsb3dlZCBieSB0aGUgYXJndW1lbnRzIHByb3ZpZGVkIGluaXRpYWxseS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTAuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKChhLCBiLCBjLCAuLi4sIG4pIC0+IHgpIC0+IFtkLCBlLCBmLCAuLi4sIG5dIC0+ICgoYSwgYiwgYywgLi4uKSAtPiB4KVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcmdzXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHNlZSBSLnBhcnRpYWxcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3JlZXQgPSAoc2FsdXRhdGlvbiwgdGl0bGUsIGZpcnN0TmFtZSwgbGFzdE5hbWUpID0+XG4gICAgICogICAgICAgIHNhbHV0YXRpb24gKyAnLCAnICsgdGl0bGUgKyAnICcgKyBmaXJzdE5hbWUgKyAnICcgKyBsYXN0TmFtZSArICchJztcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGdyZWV0TXNKYW5lSm9uZXMgPSBSLnBhcnRpYWxSaWdodChncmVldCwgWydNcy4nLCAnSmFuZScsICdKb25lcyddKTtcbiAgICAgKlxuICAgICAqICAgICAgZ3JlZXRNc0phbmVKb25lcygnSGVsbG8nKTsgLy89PiAnSGVsbG8sIE1zLiBKYW5lIEpvbmVzISdcbiAgICAgKi9cbiAgICB2YXIgcGFydGlhbFJpZ2h0ID0gX2NyZWF0ZVBhcnRpYWxBcHBsaWNhdG9yKGZsaXAoX2NvbmNhdCkpO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBwcmVkaWNhdGUgYW5kIGEgbGlzdCBhbmQgcmV0dXJucyB0aGUgcGFpciBvZiBsaXN0cyBvZlxuICAgICAqIGVsZW1lbnRzIHdoaWNoIGRvIGFuZCBkbyBub3Qgc2F0aXNmeSB0aGUgcHJlZGljYXRlLCByZXNwZWN0aXZlbHkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuNFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyAoYSAtPiBCb29sZWFuKSAtPiBbYV0gLT4gW1thXSxbYV1dXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gcHJlZCBBIHByZWRpY2F0ZSB0byBkZXRlcm1pbmUgd2hpY2ggYXJyYXkgdGhlIGVsZW1lbnQgYmVsb25ncyB0by5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBhcnJheSB0byBwYXJ0aXRpb24uXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmVzdGVkIGFycmF5LCBjb250YWluaW5nIGZpcnN0IGFuIGFycmF5IG9mIGVsZW1lbnRzIHRoYXQgc2F0aXNmaWVkIHRoZSBwcmVkaWNhdGUsXG4gICAgICogICAgICAgICBhbmQgc2Vjb25kIGFuIGFycmF5IG9mIGVsZW1lbnRzIHRoYXQgZGlkIG5vdCBzYXRpc2Z5LlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucGFydGl0aW9uKFIuY29udGFpbnMoJ3MnKSwgWydzc3MnLCAndHR0JywgJ2ZvbycsICdiYXJzJ10pO1xuICAgICAqICAgICAgLy89PiBbIFsgJ3NzcycsICdiYXJzJyBdLCAgWyAndHR0JywgJ2ZvbycgXSBdXG4gICAgICovXG4gICAgdmFyIHBhcnRpdGlvbiA9IF9jdXJyeTIoZnVuY3Rpb24gcGFydGl0aW9uKHByZWQsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9yZWR1Y2UoZnVuY3Rpb24gKGFjYywgZWx0KSB7XG4gICAgICAgICAgICB2YXIgeHMgPSBhY2NbcHJlZChlbHQpID8gMCA6IDFdO1xuICAgICAgICAgICAgeHNbeHMubGVuZ3RoXSA9IGVsdDtcbiAgICAgICAgICAgIHJldHVybiBhY2M7XG4gICAgICAgIH0sIFtcbiAgICAgICAgICAgIFtdLFxuICAgICAgICAgICAgW11cbiAgICAgICAgXSwgbGlzdCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmVzIHdoZXRoZXIgYSBuZXN0ZWQgcGF0aCBvbiBhbiBvYmplY3QgaGFzIGEgc3BlY2lmaWMgdmFsdWUsXG4gICAgICogaW4gYFIuZXF1YWxzYCB0ZXJtcy4gTW9zdCBsaWtlbHkgdXNlZCB0byBmaWx0ZXIgYSBsaXN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC43LjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIFtTdHJpbmddIC0+ICogLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHBhdGggVGhlIHBhdGggb2YgdGhlIG5lc3RlZCBwcm9wZXJ0eSB0byB1c2VcbiAgICAgKiBAcGFyYW0geyp9IHZhbCBUaGUgdmFsdWUgdG8gY29tcGFyZSB0aGUgbmVzdGVkIHByb3BlcnR5IHdpdGhcbiAgICAgKiBAcGFyYW0ge09iamVjdH0gb2JqIFRoZSBvYmplY3QgdG8gY2hlY2sgdGhlIG5lc3RlZCBwcm9wZXJ0eSBpblxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiB0aGUgdmFsdWUgZXF1YWxzIHRoZSBuZXN0ZWQgb2JqZWN0IHByb3BlcnR5LFxuICAgICAqICAgICAgICAgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHVzZXIxID0geyBhZGRyZXNzOiB7IHppcENvZGU6IDkwMjEwIH0gfTtcbiAgICAgKiAgICAgIHZhciB1c2VyMiA9IHsgYWRkcmVzczogeyB6aXBDb2RlOiA1NTU1NSB9IH07XG4gICAgICogICAgICB2YXIgdXNlcjMgPSB7IG5hbWU6ICdCb2InIH07XG4gICAgICogICAgICB2YXIgdXNlcnMgPSBbIHVzZXIxLCB1c2VyMiwgdXNlcjMgXTtcbiAgICAgKiAgICAgIHZhciBpc0ZhbW91cyA9IFIucGF0aEVxKFsnYWRkcmVzcycsICd6aXBDb2RlJ10sIDkwMjEwKTtcbiAgICAgKiAgICAgIFIuZmlsdGVyKGlzRmFtb3VzLCB1c2Vycyk7IC8vPT4gWyB1c2VyMSBdXG4gICAgICovXG4gICAgdmFyIHBhdGhFcSA9IF9jdXJyeTMoZnVuY3Rpb24gcGF0aEVxKF9wYXRoLCB2YWwsIG9iaikge1xuICAgICAgICByZXR1cm4gZXF1YWxzKHBhdGgoX3BhdGgsIG9iaiksIHZhbCk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgYnkgcGx1Y2tpbmcgdGhlIHNhbWUgbmFtZWQgcHJvcGVydHkgb2ZmIGFsbCBvYmplY3RzIGluIHRoZSBsaXN0IHN1cHBsaWVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgayAtPiBbe2s6IHZ9XSAtPiBbdl1cbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IGtleSBUaGUga2V5IG5hbWUgdG8gcGx1Y2sgb2ZmIG9mIGVhY2ggb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiB2YWx1ZXMgZm9yIHRoZSBnaXZlbiBrZXkuXG4gICAgICogQHNlZSBSLnByb3BzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wbHVjaygnYScpKFt7YTogMX0sIHthOiAyfV0pOyAvLz0+IFsxLCAyXVxuICAgICAqICAgICAgUi5wbHVjaygwKShbWzEsIDJdLCBbMywgNF1dKTsgICAvLz0+IFsxLCAzXVxuICAgICAqL1xuICAgIHZhciBwbHVjayA9IF9jdXJyeTIoZnVuY3Rpb24gcGx1Y2socCwgbGlzdCkge1xuICAgICAgICByZXR1cm4gbWFwKHByb3AocCksIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgdGhlIHNwZWNpZmllZCBvYmplY3QgcHJvcGVydHkgaXMgZXF1YWwsIGluIGBSLmVxdWFsc2BcbiAgICAgKiB0ZXJtcywgdG8gdGhlIGdpdmVuIHZhbHVlOyBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBTdHJpbmcgLT4gYSAtPiBPYmplY3QgLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBuYW1lXG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKiBAcGFyYW0geyp9IG9ialxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQHNlZSBSLmVxdWFscywgUi5wcm9wU2F0aXNmaWVzXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGFiYnkgPSB7bmFtZTogJ0FiYnknLCBhZ2U6IDcsIGhhaXI6ICdibG9uZCd9O1xuICAgICAqICAgICAgdmFyIGZyZWQgPSB7bmFtZTogJ0ZyZWQnLCBhZ2U6IDEyLCBoYWlyOiAnYnJvd24nfTtcbiAgICAgKiAgICAgIHZhciBydXN0eSA9IHtuYW1lOiAnUnVzdHknLCBhZ2U6IDEwLCBoYWlyOiAnYnJvd24nfTtcbiAgICAgKiAgICAgIHZhciBhbG9pcyA9IHtuYW1lOiAnQWxvaXMnLCBhZ2U6IDE1LCBkaXNwb3NpdGlvbjogJ3N1cmx5J307XG4gICAgICogICAgICB2YXIga2lkcyA9IFthYmJ5LCBmcmVkLCBydXN0eSwgYWxvaXNdO1xuICAgICAqICAgICAgdmFyIGhhc0Jyb3duSGFpciA9IFIucHJvcEVxKCdoYWlyJywgJ2Jyb3duJyk7XG4gICAgICogICAgICBSLmZpbHRlcihoYXNCcm93bkhhaXIsIGtpZHMpOyAvLz0+IFtmcmVkLCBydXN0eV1cbiAgICAgKi9cbiAgICB2YXIgcHJvcEVxID0gX2N1cnJ5MyhmdW5jdGlvbiBwcm9wRXEobmFtZSwgdmFsLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIHByb3BTYXRpc2ZpZXMoZXF1YWxzKHZhbCksIG5hbWUsIG9iaik7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIG9iamVjdCBwcm9wZXJ0eSBpcyBvZiB0aGUgZ2l2ZW4gdHlwZTtcbiAgICAgKiBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTYuMFxuICAgICAqIEBjYXRlZ29yeSBUeXBlXG4gICAgICogQHNpZyBUeXBlIC0+IFN0cmluZyAtPiBPYmplY3QgLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHR5cGVcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICAgICAqIEBwYXJhbSB7Kn0gb2JqXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAc2VlIFIuaXNcbiAgICAgKiBAc2VlIFIucHJvcFNhdGlzZmllc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIucHJvcElzKE51bWJlciwgJ3gnLCB7eDogMSwgeTogMn0pOyAgLy89PiB0cnVlXG4gICAgICogICAgICBSLnByb3BJcyhOdW1iZXIsICd4Jywge3g6ICdmb28nfSk7ICAgIC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIucHJvcElzKE51bWJlciwgJ3gnLCB7fSk7ICAgICAgICAgICAgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBwcm9wSXMgPSBfY3VycnkzKGZ1bmN0aW9uIHByb3BJcyh0eXBlLCBuYW1lLCBvYmopIHtcbiAgICAgICAgcmV0dXJuIHByb3BTYXRpc2ZpZXMoaXModHlwZSksIG5hbWUsIG9iaik7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgc2luZ2xlIGl0ZW0gYnkgaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nIHRoZSBpdGVyYXRvclxuICAgICAqIGZ1bmN0aW9uIGFuZCBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kXG4gICAgICogdGhlbiBwYXNzaW5nIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAgICAgKlxuICAgICAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKi4gIEl0IG1heSB1c2UgYFIucmVkdWNlZGAgdG9cbiAgICAgKiBzaG9ydGN1dCB0aGUgaXRlcmF0aW9uLlxuICAgICAqXG4gICAgICogTm90ZTogYFIucmVkdWNlYCBkb2VzIG5vdCBza2lwIGRlbGV0ZWQgb3IgdW5hc3NpZ25lZCBpbmRpY2VzIChzcGFyc2UgYXJyYXlzKSwgdW5saWtlXG4gICAgICogdGhlIG5hdGl2ZSBgQXJyYXkucHJvdG90eXBlLnJlZHVjZWAgbWV0aG9kLiBGb3IgbW9yZSBkZXRhaWxzIG9uIHRoaXMgYmVoYXZpb3IsIHNlZTpcbiAgICAgKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9KYXZhU2NyaXB0L1JlZmVyZW5jZS9HbG9iYWxfT2JqZWN0cy9BcnJheS9yZWR1Y2UjRGVzY3JpcHRpb25cbiAgICAgKiBAc2VlIFIucmVkdWNlZFxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYHJlZHVjZWAgbWV0aG9kIG9mIHRoZSB0aGlyZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLGIgLT4gYSkgLT4gYSAtPiBbYl0gLT4gYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAgICAgKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5LlxuICAgICAqIEBwYXJhbSB7Kn0gYWNjIFRoZSBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDNdO1xuICAgICAqICAgICAgdmFyIGFkZCA9IChhLCBiKSA9PiBhICsgYjtcbiAgICAgKlxuICAgICAqICAgICAgUi5yZWR1Y2UoYWRkLCAxMCwgbnVtYmVycyk7IC8vPT4gMTZcbiAgICAgKi9cbiAgICB2YXIgcmVkdWNlID0gX2N1cnJ5MyhfcmVkdWNlKTtcblxuICAgIC8qKlxuICAgICAqIFNpbWlsYXIgdG8gYGZpbHRlcmAsIGV4Y2VwdCB0aGF0IGl0IGtlZXBzIG9ubHkgdmFsdWVzIGZvciB3aGljaCB0aGUgZ2l2ZW4gcHJlZGljYXRlXG4gICAgICogZnVuY3Rpb24gcmV0dXJucyBmYWxzeS4gVGhlIHByZWRpY2F0ZSBmdW5jdGlvbiBpcyBwYXNzZWQgb25lIGFyZ3VtZW50OiAqKHZhbHVlKSouXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgKGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiBjYWxsZWQgcGVyIGl0ZXJhdGlvbi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBjb2xsZWN0aW9uIHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIG5ldyBmaWx0ZXJlZCBhcnJheS5cbiAgICAgKiBAc2VlIFIuZmlsdGVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGlzT2RkID0gKG4pID0+IG4gJSAyID09PSAxO1xuICAgICAqXG4gICAgICogICAgICBSLnJlamVjdChpc09kZCwgWzEsIDIsIDMsIDRdKTsgLy89PiBbMiwgNF1cbiAgICAgKi9cbiAgICB2YXIgcmVqZWN0ID0gX2N1cnJ5MihmdW5jdGlvbiByZWplY3QoZm4sIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIGZpbHRlcihfY29tcGxlbWVudChmbiksIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGZpeGVkIGxpc3Qgb2Ygc2l6ZSBgbmAgY29udGFpbmluZyBhIHNwZWNpZmllZCBpZGVudGljYWwgdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMVxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IG4gLT4gW2FdXG4gICAgICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gcmVwZWF0LlxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBkZXNpcmVkIHNpemUgb2YgdGhlIG91dHB1dCBsaXN0LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBBIG5ldyBhcnJheSBjb250YWluaW5nIGBuYCBgdmFsdWVgcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnJlcGVhdCgnaGknLCA1KTsgLy89PiBbJ2hpJywgJ2hpJywgJ2hpJywgJ2hpJywgJ2hpJ11cbiAgICAgKlxuICAgICAqICAgICAgdmFyIG9iaiA9IHt9O1xuICAgICAqICAgICAgdmFyIHJlcGVhdGVkT2JqcyA9IFIucmVwZWF0KG9iaiwgNSk7IC8vPT4gW3t9LCB7fSwge30sIHt9LCB7fV1cbiAgICAgKiAgICAgIHJlcGVhdGVkT2Jqc1swXSA9PT0gcmVwZWF0ZWRPYmpzWzFdOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgcmVwZWF0ID0gX2N1cnJ5MihmdW5jdGlvbiByZXBlYXQodmFsdWUsIG4pIHtcbiAgICAgICAgcmV0dXJuIHRpbWVzKGFsd2F5cyh2YWx1ZSksIG4pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3Qgb3Igc3RyaW5nIChvciBvYmplY3Qgd2l0aCBhIGBzbGljZWBcbiAgICAgKiBtZXRob2QpIGZyb20gYGZyb21JbmRleGAgKGluY2x1c2l2ZSkgdG8gYHRvSW5kZXhgIChleGNsdXNpdmUpLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYHNsaWNlYCBtZXRob2Qgb2YgdGhlIHRoaXJkIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjRcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgTnVtYmVyIC0+IE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBOdW1iZXIgLT4gTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gZnJvbUluZGV4IFRoZSBzdGFydCBpbmRleCAoaW5jbHVzaXZlKS5cbiAgICAgKiBAcGFyYW0ge051bWJlcn0gdG9JbmRleCBUaGUgZW5kIGluZGV4IChleGNsdXNpdmUpLlxuICAgICAqIEBwYXJhbSB7Kn0gbGlzdFxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5zbGljZSgxLCAzLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgICAvLz0+IFsnYicsICdjJ11cbiAgICAgKiAgICAgIFIuc2xpY2UoMSwgSW5maW5pdHksIFsnYScsICdiJywgJ2MnLCAnZCddKTsgLy89PiBbJ2InLCAnYycsICdkJ11cbiAgICAgKiAgICAgIFIuc2xpY2UoMCwgLTEsIFsnYScsICdiJywgJ2MnLCAnZCddKTsgICAgICAgLy89PiBbJ2EnLCAnYicsICdjJ11cbiAgICAgKiAgICAgIFIuc2xpY2UoLTMsIC0xLCBbJ2EnLCAnYicsICdjJywgJ2QnXSk7ICAgICAgLy89PiBbJ2InLCAnYyddXG4gICAgICogICAgICBSLnNsaWNlKDAsIDMsICdyYW1kYScpOyAgICAgICAgICAgICAgICAgICAgIC8vPT4gJ3JhbSdcbiAgICAgKi9cbiAgICB2YXIgc2xpY2UgPSBfY3VycnkzKF9jaGVja0Zvck1ldGhvZCgnc2xpY2UnLCBmdW5jdGlvbiBzbGljZShmcm9tSW5kZXgsIHRvSW5kZXgsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGxpc3QsIGZyb21JbmRleCwgdG9JbmRleCk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogU3BsaXRzIGEgY29sbGVjdGlvbiBpbnRvIHNsaWNlcyBvZiB0aGUgc3BlY2lmaWVkIGxlbmd0aC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTYuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFtbYV1dXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFtTdHJpbmddXG4gICAgICogQHBhcmFtIHtOdW1iZXJ9IG5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0XG4gICAgICogQHJldHVybiB7QXJyYXl9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5zcGxpdEV2ZXJ5KDMsIFsxLCAyLCAzLCA0LCA1LCA2LCA3XSk7IC8vPT4gW1sxLCAyLCAzXSwgWzQsIDUsIDZdLCBbN11dXG4gICAgICogICAgICBSLnNwbGl0RXZlcnkoMywgJ2Zvb2JhcmJheicpOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICAgICAqL1xuICAgIHZhciBzcGxpdEV2ZXJ5ID0gX2N1cnJ5MihmdW5jdGlvbiBzcGxpdEV2ZXJ5KG4sIGxpc3QpIHtcbiAgICAgICAgaWYgKG4gPD0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCB0byBzcGxpdEV2ZXJ5IG11c3QgYmUgYSBwb3NpdGl2ZSBpbnRlZ2VyJyk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxpc3QubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChzbGljZShpZHgsIGlkeCArPSBuLCBsaXN0KSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFkZHMgdG9nZXRoZXIgYWxsIHRoZSBlbGVtZW50cyBvZiBhIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBbTnVtYmVyXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnNcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBzdW0gb2YgYWxsIHRoZSBudW1iZXJzIGluIHRoZSBsaXN0LlxuICAgICAqIEBzZWUgUi5yZWR1Y2VcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnN1bShbMiw0LDYsOCwxMDAsMV0pOyAvLz0+IDEyMVxuICAgICAqL1xuICAgIHZhciBzdW0gPSByZWR1Y2UoYWRkLCAwKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGJ1dCB0aGUgZmlyc3QgZWxlbWVudCBvZiB0aGUgZ2l2ZW4gbGlzdCBvciBzdHJpbmcgKG9yIG9iamVjdFxuICAgICAqIHdpdGggYSBgdGFpbGAgbWV0aG9kKS5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGBzbGljZWAgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2VlIFIuaGVhZCwgUi5pbml0LCBSLmxhc3RcbiAgICAgKiBAc2lnIFthXSAtPiBbYV1cbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudGFpbChbMSwgMiwgM10pOyAgLy89PiBbMiwgM11cbiAgICAgKiAgICAgIFIudGFpbChbMSwgMl0pOyAgICAgLy89PiBbMl1cbiAgICAgKiAgICAgIFIudGFpbChbMV0pOyAgICAgICAgLy89PiBbXVxuICAgICAqICAgICAgUi50YWlsKFtdKTsgICAgICAgICAvLz0+IFtdXG4gICAgICpcbiAgICAgKiAgICAgIFIudGFpbCgnYWJjJyk7ICAvLz0+ICdiYydcbiAgICAgKiAgICAgIFIudGFpbCgnYWInKTsgICAvLz0+ICdiJ1xuICAgICAqICAgICAgUi50YWlsKCdhJyk7ICAgIC8vPT4gJydcbiAgICAgKiAgICAgIFIudGFpbCgnJyk7ICAgICAvLz0+ICcnXG4gICAgICovXG4gICAgdmFyIHRhaWwgPSBfY2hlY2tGb3JNZXRob2QoJ3RhaWwnLCBzbGljZSgxLCBJbmZpbml0eSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgZmlyc3QgYG5gIGVsZW1lbnRzIG9mIHRoZSBnaXZlbiBsaXN0LCBzdHJpbmcsIG9yXG4gICAgICogdHJhbnNkdWNlci90cmFuc2Zvcm1lciAob3Igb2JqZWN0IHdpdGggYSBgdGFrZWAgbWV0aG9kKS5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGB0YWtlYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICogQHBhcmFtIHsqfSBsaXN0XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIuZHJvcFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudGFrZSgxLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJ11cbiAgICAgKiAgICAgIFIudGFrZSgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJywgJ2JhciddXG4gICAgICogICAgICBSLnRha2UoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInLCAnYmF6J11cbiAgICAgKiAgICAgIFIudGFrZSg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJywgJ2JhcicsICdiYXonXVxuICAgICAqICAgICAgUi50YWtlKDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ3JhbSdcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHBlcnNvbm5lbCA9IFtcbiAgICAgKiAgICAgICAgJ0RhdmUgQnJ1YmVjaycsXG4gICAgICogICAgICAgICdQYXVsIERlc21vbmQnLFxuICAgICAqICAgICAgICAnRXVnZW5lIFdyaWdodCcsXG4gICAgICogICAgICAgICdKb2UgTW9yZWxsbycsXG4gICAgICogICAgICAgICdHZXJyeSBNdWxsaWdhbicsXG4gICAgICogICAgICAgICdCb2IgQmF0ZXMnLFxuICAgICAqICAgICAgICAnSm9lIERvZGdlJyxcbiAgICAgKiAgICAgICAgJ1JvbiBDcm90dHknXG4gICAgICogICAgICBdO1xuICAgICAqXG4gICAgICogICAgICB2YXIgdGFrZUZpdmUgPSBSLnRha2UoNSk7XG4gICAgICogICAgICB0YWtlRml2ZShwZXJzb25uZWwpO1xuICAgICAqICAgICAgLy89PiBbJ0RhdmUgQnJ1YmVjaycsICdQYXVsIERlc21vbmQnLCAnRXVnZW5lIFdyaWdodCcsICdKb2UgTW9yZWxsbycsICdHZXJyeSBNdWxsaWdhbiddXG4gICAgICovXG4gICAgdmFyIHRha2UgPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ3Rha2UnLCBfeHRha2UsIGZ1bmN0aW9uIHRha2UobiwgeHMpIHtcbiAgICAgICAgcmV0dXJuIHNsaWNlKDAsIG4gPCAwID8gSW5maW5pdHkgOiBuLCB4cyk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIG5ldyBsaXN0IGNvbnRhaW5pbmcgdGhlIGZpcnN0IGBuYCBlbGVtZW50cyBvZiBhIGdpdmVuIGxpc3QsIHBhc3NpbmcgZWFjaCB2YWx1ZVxuICAgICAqIHRvIHRoZSBzdXBwbGllZCBwcmVkaWNhdGUgZnVuY3Rpb24sIGFuZCB0ZXJtaW5hdGluZyB3aGVuIHRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gcmV0dXJuc1xuICAgICAqIGBmYWxzZWAuIEV4Y2x1ZGVzIHRoZSBlbGVtZW50IHRoYXQgY2F1c2VkIHRoZSBwcmVkaWNhdGUgZnVuY3Rpb24gdG8gZmFpbC4gVGhlIHByZWRpY2F0ZVxuICAgICAqIGZ1bmN0aW9uIGlzIHBhc3NlZCBvbmUgYXJndW1lbnQ6ICoodmFsdWUpKi5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGB0YWtlV2hpbGVgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQWN0cyBhcyBhIHRyYW5zZHVjZXIgaWYgYSB0cmFuc2Zvcm1lciBpcyBnaXZlbiBpbiBsaXN0IHBvc2l0aW9uLlxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gY2FsbGVkIHBlciBpdGVyYXRpb24uXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgY29sbGVjdGlvbiB0byBpdGVyYXRlIG92ZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IEEgbmV3IGFycmF5LlxuICAgICAqIEBzZWUgUi5kcm9wV2hpbGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgaXNOb3RGb3VyID0geCA9PiB4ICE9PSA0O1xuICAgICAqXG4gICAgICogICAgICBSLnRha2VXaGlsZShpc05vdEZvdXIsIFsxLCAyLCAzLCA0XSk7IC8vPT4gWzEsIDIsIDNdXG4gICAgICovXG4gICAgdmFyIHRha2VXaGlsZSA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgndGFrZVdoaWxlJywgX3h0YWtlV2hpbGUsIGZ1bmN0aW9uIHRha2VXaGlsZShmbiwgbGlzdCkge1xuICAgICAgICB2YXIgaWR4ID0gMCwgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIHdoaWxlIChpZHggPCBsZW4gJiYgZm4obGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9zbGljZShsaXN0LCAwLCBpZHgpO1xuICAgIH0pKTtcblxuICAgIC8qKlxuICAgICAqIEluaXRpYWxpemVzIGEgdHJhbnNkdWNlciB1c2luZyBzdXBwbGllZCBpdGVyYXRvciBmdW5jdGlvbi4gUmV0dXJucyBhIHNpbmdsZSBpdGVtIGJ5XG4gICAgICogaXRlcmF0aW5nIHRocm91Z2ggdGhlIGxpc3QsIHN1Y2Nlc3NpdmVseSBjYWxsaW5nIHRoZSB0cmFuc2Zvcm1lZCBpdGVyYXRvciBmdW5jdGlvbiBhbmRcbiAgICAgKiBwYXNzaW5nIGl0IGFuIGFjY3VtdWxhdG9yIHZhbHVlIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBmcm9tIHRoZSBhcnJheSwgYW5kIHRoZW4gcGFzc2luZ1xuICAgICAqIHRoZSByZXN1bHQgdG8gdGhlIG5leHQgY2FsbC5cbiAgICAgKlxuICAgICAqIFRoZSBpdGVyYXRvciBmdW5jdGlvbiByZWNlaXZlcyB0d28gdmFsdWVzOiAqKGFjYywgdmFsdWUpKi4gSXQgd2lsbCBiZSB3cmFwcGVkIGFzIGFcbiAgICAgKiB0cmFuc2Zvcm1lciB0byBpbml0aWFsaXplIHRoZSB0cmFuc2R1Y2VyLiBBIHRyYW5zZm9ybWVyIGNhbiBiZSBwYXNzZWQgZGlyZWN0bHkgaW4gcGxhY2VcbiAgICAgKiBvZiBhbiBpdGVyYXRvciBmdW5jdGlvbi4gIEluIGJvdGggY2FzZXMsIGl0ZXJhdGlvbiBtYXkgYmUgc3RvcHBlZCBlYXJseSB3aXRoIHRoZVxuICAgICAqIGBSLnJlZHVjZWRgIGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogQSB0cmFuc2R1Y2VyIGlzIGEgZnVuY3Rpb24gdGhhdCBhY2NlcHRzIGEgdHJhbnNmb3JtZXIgYW5kIHJldHVybnMgYSB0cmFuc2Zvcm1lciBhbmQgY2FuXG4gICAgICogYmUgY29tcG9zZWQgZGlyZWN0bHkuXG4gICAgICpcbiAgICAgKiBBIHRyYW5zZm9ybWVyIGlzIGFuIGFuIG9iamVjdCB0aGF0IHByb3ZpZGVzIGEgMi1hcml0eSByZWR1Y2luZyBpdGVyYXRvciBmdW5jdGlvbiwgc3RlcCxcbiAgICAgKiAwLWFyaXR5IGluaXRpYWwgdmFsdWUgZnVuY3Rpb24sIGluaXQsIGFuZCAxLWFyaXR5IHJlc3VsdCBleHRyYWN0aW9uIGZ1bmN0aW9uLCByZXN1bHQuXG4gICAgICogVGhlIHN0ZXAgZnVuY3Rpb24gaXMgdXNlZCBhcyB0aGUgaXRlcmF0b3IgZnVuY3Rpb24gaW4gcmVkdWNlLiBUaGUgcmVzdWx0IGZ1bmN0aW9uIGlzIHVzZWRcbiAgICAgKiB0byBjb252ZXJ0IHRoZSBmaW5hbCBhY2N1bXVsYXRvciBpbnRvIHRoZSByZXR1cm4gdHlwZSBhbmQgaW4gbW9zdCBjYXNlcyBpcyBSLmlkZW50aXR5LlxuICAgICAqIFRoZSBpbml0IGZ1bmN0aW9uIGNhbiBiZSB1c2VkIHRvIHByb3ZpZGUgYW4gaW5pdGlhbCBhY2N1bXVsYXRvciwgYnV0IGlzIGlnbm9yZWQgYnkgdHJhbnNkdWNlLlxuICAgICAqXG4gICAgICogVGhlIGl0ZXJhdGlvbiBpcyBwZXJmb3JtZWQgd2l0aCBSLnJlZHVjZSBhZnRlciBpbml0aWFsaXppbmcgdGhlIHRyYW5zZHVjZXIuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEyLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi5yZWR1Y2UsIFIucmVkdWNlZCwgUi5pbnRvXG4gICAgICogQHNpZyAoYyAtPiBjKSAtPiAoYSxiIC0+IGEpIC0+IGEgLT4gW2JdIC0+IGFcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSB4ZiBUaGUgdHJhbnNkdWNlciBmdW5jdGlvbi4gUmVjZWl2ZXMgYSB0cmFuc2Zvcm1lciBhbmQgcmV0dXJucyBhIHRyYW5zZm9ybWVyLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBpdGVyYXRvciBmdW5jdGlvbi4gUmVjZWl2ZXMgdHdvIHZhbHVlcywgdGhlIGFjY3VtdWxhdG9yIGFuZCB0aGVcbiAgICAgKiAgICAgICAgY3VycmVudCBlbGVtZW50IGZyb20gdGhlIGFycmF5LiBXcmFwcGVkIGFzIHRyYW5zZm9ybWVyLCBpZiBuZWNlc3NhcnksIGFuZCB1c2VkIHRvXG4gICAgICogICAgICAgIGluaXRpYWxpemUgdGhlIHRyYW5zZHVjZXJcbiAgICAgKiBAcGFyYW0geyp9IGFjYyBUaGUgaW5pdGlhbCBhY2N1bXVsYXRvciB2YWx1ZS5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDMsIDRdO1xuICAgICAqICAgICAgdmFyIHRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5tYXAoUi5hZGQoMSkpLCBSLnRha2UoMikpO1xuICAgICAqXG4gICAgICogICAgICBSLnRyYW5zZHVjZSh0cmFuc2R1Y2VyLCBSLmZsaXAoUi5hcHBlbmQpLCBbXSwgbnVtYmVycyk7IC8vPT4gWzIsIDNdXG4gICAgICovXG4gICAgdmFyIHRyYW5zZHVjZSA9IGN1cnJ5Tig0LCBmdW5jdGlvbiB0cmFuc2R1Y2UoeGYsIGZuLCBhY2MsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9yZWR1Y2UoeGYodHlwZW9mIGZuID09PSAnZnVuY3Rpb24nID8gX3h3cmFwKGZuKSA6IGZuKSwgYWNjLCBsaXN0KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIENvbWJpbmVzIHR3byBsaXN0cyBpbnRvIGEgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIGNvbXBvc2VkIG9mIHRoZSBlbGVtZW50cyBvZiBlYWNoIGxpc3QuICBEdXBsaWNhdGlvbiBpc1xuICAgICAqIGRldGVybWluZWQgYWNjb3JkaW5nIHRvIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHRvIHR3byBsaXN0IGVsZW1lbnRzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIChhLGEgLT4gQm9vbGVhbikgLT4gW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDEgVGhlIGZpcnN0IGxpc3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdDIgVGhlIHNlY29uZCBsaXN0LlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgZmlyc3QgYW5kIHNlY29uZCBsaXN0cyBjb25jYXRlbmF0ZWQsIHdpdGhcbiAgICAgKiAgICAgICAgIGR1cGxpY2F0ZXMgcmVtb3ZlZC5cbiAgICAgKiBAc2VlIFIudW5pb25cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbDEgPSBbe2E6IDF9LCB7YTogMn1dO1xuICAgICAqICAgICAgdmFyIGwyID0gW3thOiAxfSwge2E6IDR9XTtcbiAgICAgKiAgICAgIFIudW5pb25XaXRoKFIuZXFCeShSLnByb3AoJ2EnKSksIGwxLCBsMik7IC8vPT4gW3thOiAxfSwge2E6IDJ9LCB7YTogNH1dXG4gICAgICovXG4gICAgdmFyIHVuaW9uV2l0aCA9IF9jdXJyeTMoZnVuY3Rpb24gdW5pb25XaXRoKHByZWQsIGxpc3QxLCBsaXN0Mikge1xuICAgICAgICByZXR1cm4gdW5pcVdpdGgocHJlZCwgX2NvbmNhdChsaXN0MSwgbGlzdDIpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIG9ubHkgb25lIGNvcHkgb2YgZWFjaCBlbGVtZW50IGluIHRoZSBvcmlnaW5hbCBsaXN0LlxuICAgICAqIGBSLmVxdWFsc2AgaXMgdXNlZCB0byBkZXRlcm1pbmUgZXF1YWxpdHkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gW2FdXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnVuaXEoWzEsIDEsIDIsIDFdKTsgLy89PiBbMSwgMl1cbiAgICAgKiAgICAgIFIudW5pcShbMSwgJzEnXSk7ICAgICAvLz0+IFsxLCAnMSddXG4gICAgICogICAgICBSLnVuaXEoW1s0Ml0sIFs0Ml1dKTsgLy89PiBbWzQyXV1cbiAgICAgKi9cbiAgICB2YXIgdW5pcSA9IHVuaXFXaXRoKGVxdWFscyk7XG5cbiAgICAvKipcbiAgICAgKiBBY2NlcHRzIGEgZnVuY3Rpb24gYGZuYCBhbmQgYSBsaXN0IG9mIHRyYW5zZm9ybWVyIGZ1bmN0aW9ucyBhbmQgcmV0dXJucyBhIG5ldyBjdXJyaWVkXG4gICAgICogZnVuY3Rpb24uIFdoZW4gdGhlIG5ldyBmdW5jdGlvbiBpcyBpbnZva2VkLCBpdCBjYWxscyB0aGUgZnVuY3Rpb24gYGZuYCB3aXRoIHBhcmFtZXRlcnNcbiAgICAgKiBjb25zaXN0aW5nIG9mIHRoZSByZXN1bHQgb2YgY2FsbGluZyBlYWNoIHN1cHBsaWVkIGhhbmRsZXIgb24gc3VjY2Vzc2l2ZSBhcmd1bWVudHMgdG8gdGhlXG4gICAgICogbmV3IGZ1bmN0aW9uLlxuICAgICAqXG4gICAgICogSWYgbW9yZSBhcmd1bWVudHMgYXJlIHBhc3NlZCB0byB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gdGhhbiB0cmFuc2Zvcm1lciBmdW5jdGlvbnMsIHRob3NlXG4gICAgICogYXJndW1lbnRzIGFyZSBwYXNzZWQgZGlyZWN0bHkgdG8gYGZuYCBhcyBhZGRpdGlvbmFsIHBhcmFtZXRlcnMuIElmIHlvdSBleHBlY3QgYWRkaXRpb25hbFxuICAgICAqIGFyZ3VtZW50cyB0aGF0IGRvbid0IG5lZWQgdG8gYmUgdHJhbnNmb3JtZWQsIGFsdGhvdWdoIHlvdSBjYW4gaWdub3JlIHRoZW0sIGl0J3MgYmVzdCB0b1xuICAgICAqIHBhc3MgYW4gaWRlbnRpdHkgZnVuY3Rpb24gc28gdGhhdCB0aGUgbmV3IGZ1bmN0aW9uIHJlcG9ydHMgdGhlIGNvcnJlY3QgYXJpdHkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKHgxIC0+IHgyIC0+IC4uLiAtPiB6KSAtPiBbKGEgLT4geDEpLCAoYiAtPiB4MiksIC4uLl0gLT4gKGEgLT4gYiAtPiAuLi4gLT4geilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSB0cmFuc2Zvcm1lcnMgQSBsaXN0IG9mIHRyYW5zZm9ybWVyIGZ1bmN0aW9uc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgd3JhcHBlZCBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnVzZVdpdGgoTWF0aC5wb3csIFtSLmlkZW50aXR5LCBSLmlkZW50aXR5XSkoMywgNCk7IC8vPT4gODFcbiAgICAgKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuaWRlbnRpdHksIFIuaWRlbnRpdHldKSgzKSg0KTsgLy89PiA4MVxuICAgICAqICAgICAgUi51c2VXaXRoKE1hdGgucG93LCBbUi5kZWMsIFIuaW5jXSkoMywgNCk7IC8vPT4gMzJcbiAgICAgKiAgICAgIFIudXNlV2l0aChNYXRoLnBvdywgW1IuZGVjLCBSLmluY10pKDMpKDQpOyAvLz0+IDMyXG4gICAgICovXG4gICAgdmFyIHVzZVdpdGggPSBfY3VycnkyKGZ1bmN0aW9uIHVzZVdpdGgoZm4sIHRyYW5zZm9ybWVycykge1xuICAgICAgICByZXR1cm4gY3VycnkoX2FyaXR5KHRyYW5zZm9ybWVycy5sZW5ndGgsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gW10sIGlkeCA9IDA7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgdHJhbnNmb3JtZXJzLmxlbmd0aCkge1xuICAgICAgICAgICAgICAgIGFyZ3MucHVzaCh0cmFuc2Zvcm1lcnNbaWR4XS5jYWxsKHRoaXMsIGFyZ3VtZW50c1tpZHhdKSk7XG4gICAgICAgICAgICAgICAgaWR4ICs9IDE7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZm4uYXBwbHkodGhpcywgYXJncy5jb25jYXQoX3NsaWNlKGFyZ3VtZW50cywgdHJhbnNmb3JtZXJzLmxlbmd0aCkpKTtcbiAgICAgICAgfSkpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBzcGVjIG9iamVjdCBhbmQgYSB0ZXN0IG9iamVjdDsgcmV0dXJucyB0cnVlIGlmIHRoZSB0ZXN0IHNhdGlzZmllc1xuICAgICAqIHRoZSBzcGVjLCBmYWxzZSBvdGhlcndpc2UuIEFuIG9iamVjdCBzYXRpc2ZpZXMgdGhlIHNwZWMgaWYsIGZvciBlYWNoIG9mIHRoZVxuICAgICAqIHNwZWMncyBvd24gcHJvcGVydGllcywgYWNjZXNzaW5nIHRoYXQgcHJvcGVydHkgb2YgdGhlIG9iamVjdCBnaXZlcyB0aGUgc2FtZVxuICAgICAqIHZhbHVlIChpbiBgUi5lcXVhbHNgIHRlcm1zKSBhcyBhY2Nlc3NpbmcgdGhhdCBwcm9wZXJ0eSBvZiB0aGUgc3BlYy5cbiAgICAgKlxuICAgICAqIGB3aGVyZUVxYCBpcyBhIHNwZWNpYWxpemF0aW9uIG9mIFtgd2hlcmVgXSgjd2hlcmUpLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNC4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcge1N0cmluZzogKn0gLT4ge1N0cmluZzogKn0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBzcGVjXG4gICAgICogQHBhcmFtIHtPYmplY3R9IHRlc3RPYmpcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqIEBzZWUgUi53aGVyZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vIHByZWQgOjogT2JqZWN0IC0+IEJvb2xlYW5cbiAgICAgKiAgICAgIHZhciBwcmVkID0gUi53aGVyZUVxKHthOiAxLCBiOiAyfSk7XG4gICAgICpcbiAgICAgKiAgICAgIHByZWQoe2E6IDF9KTsgICAgICAgICAgICAgIC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIHByZWQoe2E6IDEsIGI6IDJ9KTsgICAgICAgIC8vPT4gdHJ1ZVxuICAgICAqICAgICAgcHJlZCh7YTogMSwgYjogMiwgYzogM30pOyAgLy89PiB0cnVlXG4gICAgICogICAgICBwcmVkKHthOiAxLCBiOiAxfSk7ICAgICAgICAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIHdoZXJlRXEgPSBfY3VycnkyKGZ1bmN0aW9uIHdoZXJlRXEoc3BlYywgdGVzdE9iaikge1xuICAgICAgICByZXR1cm4gd2hlcmUobWFwT2JqKGVxdWFscywgc3BlYyksIHRlc3RPYmopO1xuICAgIH0pO1xuXG4gICAgdmFyIF9mbGF0Q2F0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcHJlc2VydmluZ1JlZHVjZWQgPSBmdW5jdGlvbiAoeGYpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4geGZbJ0BAdHJhbnNkdWNlci9yZXN1bHQnXShyZXN1bHQpO1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9zdGVwJzogZnVuY3Rpb24gKHJlc3VsdCwgaW5wdXQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHJldCA9IHhmWydAQHRyYW5zZHVjZXIvc3RlcCddKHJlc3VsdCwgaW5wdXQpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcmV0WydAQHRyYW5zZHVjZXIvcmVkdWNlZCddID8gX2ZvcmNlUmVkdWNlZChyZXQpIDogcmV0O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBmdW5jdGlvbiBfeGNhdCh4Zikge1xuICAgICAgICAgICAgdmFyIHJ4ZiA9IHByZXNlcnZpbmdSZWR1Y2VkKHhmKTtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ0BAdHJhbnNkdWNlci9pbml0JzogX3hmQmFzZS5pbml0LFxuICAgICAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogZnVuY3Rpb24gKHJlc3VsdCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcnhmWydAQHRyYW5zZHVjZXIvcmVzdWx0J10ocmVzdWx0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiAhaXNBcnJheUxpa2UoaW5wdXQpID8gX3JlZHVjZShyeGYsIHJlc3VsdCwgW2lucHV0XSkgOiBfcmVkdWNlKHJ4ZiwgcmVzdWx0LCBpbnB1dCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX2luZGV4T2YgPSBmdW5jdGlvbiBfaW5kZXhPZihsaXN0LCBpdGVtLCBmcm9tKSB7XG4gICAgICAgIHZhciBpZHggPSBmcm9tO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGlmIChlcXVhbHMobGlzdFtpZHhdLCBpdGVtKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gLTE7XG4gICAgfTtcblxuICAgIHZhciBfc3RlcENhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF9zdGVwQ2F0QXJyYXkgPSB7XG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL2luaXQnOiBBcnJheSxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uICh4cywgeCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfY29uY2F0KHhzLCBbeF0pO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG4gICAgICAgIH07XG4gICAgICAgIHZhciBfc3RlcENhdFN0cmluZyA9IHtcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvaW5pdCc6IFN0cmluZyxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGEgKyBiO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvcmVzdWx0JzogX2lkZW50aXR5XG4gICAgICAgIH07XG4gICAgICAgIHZhciBfc3RlcENhdE9iamVjdCA9IHtcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvaW5pdCc6IE9iamVjdCxcbiAgICAgICAgICAgICdAQHRyYW5zZHVjZXIvc3RlcCc6IGZ1bmN0aW9uIChyZXN1bHQsIGlucHV0KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG1lcmdlKHJlc3VsdCwgaXNBcnJheUxpa2UoaW5wdXQpID8gY3JlYXRlTWFwRW50cnkoaW5wdXRbMF0sIGlucHV0WzFdKSA6IGlucHV0KTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAnQEB0cmFuc2R1Y2VyL3Jlc3VsdCc6IF9pZGVudGl0eVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gX3N0ZXBDYXQob2JqKSB7XG4gICAgICAgICAgICBpZiAoX2lzVHJhbnNmb3JtZXIob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYmo7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAoaXNBcnJheUxpa2Uob2JqKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBfc3RlcENhdEFycmF5O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdGVwQ2F0U3RyaW5nO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmogPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9zdGVwQ2F0T2JqZWN0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgY3JlYXRlIHRyYW5zZm9ybWVyIGZvciAnICsgb2JqKTtcbiAgICAgICAgfTtcbiAgICB9KCk7XG5cbiAgICB2YXIgX3hjaGFpbiA9IF9jdXJyeTIoZnVuY3Rpb24gX3hjaGFpbihmLCB4Zikge1xuICAgICAgICByZXR1cm4gbWFwKGYsIF9mbGF0Q2F0KHhmKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGxpc3Qgb2YgcHJlZGljYXRlcyBhbmQgcmV0dXJucyBhIHByZWRpY2F0ZSB0aGF0IHJldHVybnMgdHJ1ZVxuICAgICAqIGZvciBhIGdpdmVuIGxpc3Qgb2YgYXJndW1lbnRzIGlmIGV2ZXJ5IG9uZSBvZiB0aGUgcHJvdmlkZWQgcHJlZGljYXRlc1xuICAgICAqIGlzIHNhdGlzZmllZCBieSB0aG9zZSBhcmd1bWVudHMuXG4gICAgICpcbiAgICAgKiBUaGUgZnVuY3Rpb24gcmV0dXJuZWQgaXMgYSBjdXJyaWVkIGZ1bmN0aW9uIHdob3NlIGFyaXR5IG1hdGNoZXMgdGhhdCBvZlxuICAgICAqIHRoZSBoaWdoZXN0LWFyaXR5IHByZWRpY2F0ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOS4wXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyBbKCouLi4gLT4gQm9vbGVhbildIC0+ICgqLi4uIC0+IEJvb2xlYW4pXG4gICAgICogQHBhcmFtIHtBcnJheX0gcHJlZHNcbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKiBAc2VlIFIuYW55UGFzc1xuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBpc1F1ZWVuID0gUi5wcm9wRXEoJ3JhbmsnLCAnUScpO1xuICAgICAqICAgICAgdmFyIGlzU3BhZGUgPSBSLnByb3BFcSgnc3VpdCcsICfimaDvuI4nKTtcbiAgICAgKiAgICAgIHZhciBpc1F1ZWVuT2ZTcGFkZXMgPSBSLmFsbFBhc3MoW2lzUXVlZW4sIGlzU3BhZGVdKTtcbiAgICAgKlxuICAgICAqICAgICAgaXNRdWVlbk9mU3BhZGVzKHtyYW5rOiAnUScsIHN1aXQ6ICfimaPvuI4nfSk7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIGlzUXVlZW5PZlNwYWRlcyh7cmFuazogJ1EnLCBzdWl0OiAn4pmg77iOJ30pOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgYWxsUGFzcyA9IF9jdXJyeTEoZnVuY3Rpb24gYWxsUGFzcyhwcmVkcykge1xuICAgICAgICByZXR1cm4gY3VycnlOKHJlZHVjZShtYXgsIDAsIHBsdWNrKCdsZW5ndGgnLCBwcmVkcykpLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgICAgIHZhciBsZW4gPSBwcmVkcy5sZW5ndGg7XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmVkc1tpZHhdLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYHRydWVgIGlmIGFsbCBlbGVtZW50cyBhcmUgdW5pcXVlLCBpbiBgUi5lcXVhbHNgIHRlcm1zLFxuICAgICAqIG90aGVyd2lzZSBgZmFsc2VgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xOC4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIFthXSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIGFsbCBlbGVtZW50cyBhcmUgdW5pcXVlLCBlbHNlIGBmYWxzZWAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5hbGxVbmlxKFsnMScsIDFdKTsgLy89PiB0cnVlXG4gICAgICogICAgICBSLmFsbFVuaXEoWzEsIDFdKTsgICAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmFsbFVuaXEoW1s0Ml0sIFs0Ml1dKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBhbGxVbmlxID0gX2N1cnJ5MShmdW5jdGlvbiBhbGxVbmlxKGxpc3QpIHtcbiAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgd2hpbGUgKGlkeCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKF9pbmRleE9mKGxpc3QsIGxpc3RbaWR4XSwgaWR4ICsgMSkgPj0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBsaXN0IG9mIHByZWRpY2F0ZXMgYW5kIHJldHVybnMgYSBwcmVkaWNhdGUgdGhhdCByZXR1cm5zIHRydWUgZm9yXG4gICAgICogYSBnaXZlbiBsaXN0IG9mIGFyZ3VtZW50cyBpZiBhdCBsZWFzdCBvbmUgb2YgdGhlIHByb3ZpZGVkIHByZWRpY2F0ZXMgaXNcbiAgICAgKiBzYXRpc2ZpZWQgYnkgdGhvc2UgYXJndW1lbnRzLlxuICAgICAqXG4gICAgICogVGhlIGZ1bmN0aW9uIHJldHVybmVkIGlzIGEgY3VycmllZCBmdW5jdGlvbiB3aG9zZSBhcml0eSBtYXRjaGVzIHRoYXQgb2ZcbiAgICAgKiB0aGUgaGlnaGVzdC1hcml0eSBwcmVkaWNhdGUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgWygqLi4uIC0+IEJvb2xlYW4pXSAtPiAoKi4uLiAtPiBCb29sZWFuKVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHByZWRzXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHNlZSBSLmFsbFBhc3NcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3RlID0gUi5hbnlQYXNzKFtSLmd0LCBSLmVxdWFsc10pO1xuICAgICAqXG4gICAgICogICAgICBndGUoMywgMik7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgZ3RlKDIsIDIpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIGd0ZSgyLCAzKTsgLy89PiBmYWxzZVxuICAgICAqL1xuICAgIHZhciBhbnlQYXNzID0gX2N1cnJ5MShmdW5jdGlvbiBhbnlQYXNzKHByZWRzKSB7XG4gICAgICAgIHJldHVybiBjdXJyeU4ocmVkdWNlKG1heCwgMCwgcGx1Y2soJ2xlbmd0aCcsIHByZWRzKSksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBpZHggPSAwO1xuICAgICAgICAgICAgdmFyIGxlbiA9IHByZWRzLmxlbmd0aDtcbiAgICAgICAgICAgIHdoaWxlIChpZHggPCBsZW4pIHtcbiAgICAgICAgICAgICAgICBpZiAocHJlZHNbaWR4XS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZHggKz0gMTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBhcCBhcHBsaWVzIGEgbGlzdCBvZiBmdW5jdGlvbnMgdG8gYSBsaXN0IG9mIHZhbHVlcy5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGBhcGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuIEFsc28gdHJlYXRzXG4gICAgICogZnVuY3Rpb25zIGFzIGFwcGxpY2F0aXZlcy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMy4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyBbZl0gLT4gW2FdIC0+IFtmIGFdXG4gICAgICogQHBhcmFtIHtBcnJheX0gZm5zIEFuIGFycmF5IG9mIGZ1bmN0aW9uc1xuICAgICAqIEBwYXJhbSB7QXJyYXl9IHZzIEFuIGFycmF5IG9mIHZhbHVlc1xuICAgICAqIEByZXR1cm4ge0FycmF5fSBBbiBhcnJheSBvZiByZXN1bHRzIG9mIGFwcGx5aW5nIGVhY2ggb2YgYGZuc2AgdG8gYWxsIG9mIGB2c2AgaW4gdHVybi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLmFwKFtSLm11bHRpcGx5KDIpLCBSLmFkZCgzKV0sIFsxLDIsM10pOyAvLz0+IFsyLCA0LCA2LCA0LCA1LCA2XVxuICAgICAqL1xuICAgIC8vIGVsc2VcbiAgICB2YXIgYXAgPSBfY3VycnkyKGZ1bmN0aW9uIGFwKGFwcGxpY2F0aXZlLCBmbikge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGFwcGxpY2F0aXZlLmFwID09PSAnZnVuY3Rpb24nID8gYXBwbGljYXRpdmUuYXAoZm4pIDogdHlwZW9mIGFwcGxpY2F0aXZlID09PSAnZnVuY3Rpb24nID8gY3VycnlOKE1hdGgubWF4KGFwcGxpY2F0aXZlLmxlbmd0aCwgZm4ubGVuZ3RoKSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIGFwcGxpY2F0aXZlLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykoZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gICAgICAgIH0pIDogLy8gZWxzZVxuICAgICAgICBfcmVkdWNlKGZ1bmN0aW9uIChhY2MsIGYpIHtcbiAgICAgICAgICAgIHJldHVybiBfY29uY2F0KGFjYywgbWFwKGYsIGZuKSk7XG4gICAgICAgIH0sIFtdLCBhcHBsaWNhdGl2ZSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY2FsbGluZyBpdHMgZmlyc3QgYXJndW1lbnQgd2l0aCB0aGUgcmVtYWluaW5nXG4gICAgICogYXJndW1lbnRzLiBUaGlzIGlzIG9jY2FzaW9uYWxseSB1c2VmdWwgYXMgYSBjb252ZXJnaW5nIGZ1bmN0aW9uIGZvclxuICAgICAqIGBSLmNvbnZlcmdlYDogdGhlIGxlZnQgYnJhbmNoIGNhbiBwcm9kdWNlIGEgZnVuY3Rpb24gd2hpbGUgdGhlIHJpZ2h0XG4gICAgICogYnJhbmNoIHByb2R1Y2VzIGEgdmFsdWUgdG8gYmUgcGFzc2VkIHRvIHRoYXQgZnVuY3Rpb24gYXMgYW4gYXJndW1lbnQuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCouLi4gLT4gYSksKi4uLiAtPiBhXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGFwcGx5IHRvIHRoZSByZW1haW5pbmcgYXJndW1lbnRzLlxuICAgICAqIEBwYXJhbSB7Li4uKn0gYXJncyBBbnkgbnVtYmVyIG9mIHBvc2l0aW9uYWwgYXJndW1lbnRzLlxuICAgICAqIEByZXR1cm4geyp9XG4gICAgICogQHNlZSBSLmFwcGx5XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGluZGVudE4gPSBSLnBpcGUoUi50aW1lcyhSLmFsd2F5cygnICcpKSxcbiAgICAgKiAgICAgICAgICAgICAgICAgICAgICAgICAgIFIuam9pbignJyksXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICBSLnJlcGxhY2UoL14oPyEkKS9nbSkpO1xuICAgICAqXG4gICAgICogICAgICB2YXIgZm9ybWF0ID0gUi5jb252ZXJnZShSLmNhbGwsXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSLnBpcGUoUi5wcm9wKCdpbmRlbnQnKSwgaW5kZW50TiksXG4gICAgICogICAgICAgICAgICAgICAgICAgICAgICAgICAgICBSLnByb3AoJ3ZhbHVlJykpO1xuICAgICAqXG4gICAgICogICAgICBmb3JtYXQoe2luZGVudDogMiwgdmFsdWU6ICdmb29cXG5iYXJcXG5iYXpcXG4nfSk7IC8vPT4gJyAgZm9vXFxuICBiYXJcXG4gIGJhelxcbidcbiAgICAgKi9cbiAgICB2YXIgY2FsbCA9IGN1cnJ5KGZ1bmN0aW9uIGNhbGwoZm4pIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXMsIF9zbGljZShhcmd1bWVudHMsIDEpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIGBjaGFpbmAgbWFwcyBhIGZ1bmN0aW9uIG92ZXIgYSBsaXN0IGFuZCBjb25jYXRlbmF0ZXMgdGhlIHJlc3VsdHMuXG4gICAgICogYGNoYWluYCBpcyBhbHNvIGtub3duIGFzIGBmbGF0TWFwYCBpbiBzb21lIGxpYnJhcmllc1xuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGNoYWluYCBtZXRob2Qgb2YgdGhlIHNlY29uZCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMy4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IFtiXSkgLT4gW2FdIC0+IFtiXVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdFxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBkdXBsaWNhdGUgPSBuID0+IFtuLCBuXTtcbiAgICAgKiAgICAgIFIuY2hhaW4oZHVwbGljYXRlLCBbMSwgMiwgM10pOyAvLz0+IFsxLCAxLCAyLCAyLCAzLCAzXVxuICAgICAqL1xuICAgIHZhciBjaGFpbiA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnY2hhaW4nLCBfeGNoYWluLCBmdW5jdGlvbiBjaGFpbihmbiwgbW9uYWQpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBtb25hZCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbW9uYWQuY2FsbCh0aGlzLCBmbi5hcHBseSh0aGlzLCBhcmd1bWVudHMpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX21ha2VGbGF0KGZhbHNlKShtYXAoZm4sIG1vbmFkKSk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgYSBsaXN0IG9mIEZ1bmN0b3JzIGludG8gYSBGdW5jdG9yIG9mIGEgbGlzdCwgYXBwbHlpbmdcbiAgICAgKiBhIG1hcHBpbmcgZnVuY3Rpb24gdG8gdGhlIGVsZW1lbnRzIG9mIHRoZSBsaXN0IGFsb25nIHRoZSB3YXkuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjguMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNlZSBSLmNvbW11dGVcbiAgICAgKiBAc2lnIEZ1bmN0b3IgZiA9PiAoYSAtPiBmIGIpIC0+ICh4IC0+IGYgeCkgLT4gW2FdIC0+IGYgW2JdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIHRyYW5zZm9ybWF0aW9uIGZ1bmN0aW9uXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb2YgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGRhdGEgdHlwZSB0byByZXR1cm5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIGZ1bmN0b3JzIG9mIHRoZSBzYW1lIHR5cGVcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBhZGQxMCA9IFIubWFwKFIuYWRkKDEwKSk7XG4gICAgICogICAgICBSLmNvbW11dGVNYXAoYWRkMTAsIFIub2YsIFtbMV0sIFsyLCAzXV0pOyAgIC8vPT4gW1sxMSwgMTJdLCBbMTEsIDEzXV1cbiAgICAgKiAgICAgIFIuY29tbXV0ZU1hcChhZGQxMCwgUi5vZiwgW1sxLCAyXSwgWzNdXSk7ICAgLy89PiBbWzExLCAxM10sIFsxMiwgMTNdXVxuICAgICAqICAgICAgUi5jb21tdXRlTWFwKGFkZDEwLCBSLm9mLCBbWzFdLCBbMl0sIFszXV0pOyAvLz0+IFtbMTEsIDEyLCAxM11dXG4gICAgICogICAgICBSLmNvbW11dGVNYXAoYWRkMTAsIE1heWJlLm9mLCBbSnVzdCgxKSwgSnVzdCgyKSwgSnVzdCgzKV0pOyAgIC8vPT4gSnVzdChbMTEsIDEyLCAxM10pXG4gICAgICogICAgICBSLmNvbW11dGVNYXAoYWRkMTAsIE1heWJlLm9mLCBbSnVzdCgxKSwgSnVzdCgyKSwgTm90aGluZygpXSk7IC8vPT4gTm90aGluZygpXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBmZXRjaCA9IHVybCA9PiBGdXR1cmUoKHJlaiwgcmVzKSA9PiBodHRwLmdldCh1cmwsIHJlcykub24oJ2Vycm9yJywgcmVqKSk7XG4gICAgICogICAgICBSLmNvbW11dGVNYXAoZmV0Y2gsIEZ1dHVyZS5vZiwgW1xuICAgICAqICAgICAgICAnaHR0cDovL3JhbWRhanMuY29tJyxcbiAgICAgKiAgICAgICAgJ2h0dHA6Ly9naXRodWIuY29tL3JhbWRhJ1xuICAgICAqICAgICAgXSk7IC8vPT4gRnV0dXJlKFtJbmNvbWluZ01lc3NhZ2UsIEluY29taW5nTWVzc2FnZV0pXG4gICAgICovXG4gICAgdmFyIGNvbW11dGVNYXAgPSBfY3VycnkzKGZ1bmN0aW9uIGNvbW11dGVNYXAoZm4sIG9mLCBsaXN0KSB7XG4gICAgICAgIGZ1bmN0aW9uIGNvbnNGKGFjYywgeCkge1xuICAgICAgICAgICAgcmV0dXJuIGFwKG1hcChwcmVwZW5kLCBmbih4KSksIGFjYyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlZHVjZVJpZ2h0KGNvbnNGLCBvZihbXSksIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogV3JhcHMgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpbnNpZGUgYSBjdXJyaWVkIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB3aXRoIHRoZSBzYW1lXG4gICAgICogYXJndW1lbnRzIGFuZCByZXR1cm5zIHRoZSBzYW1lIHR5cGUuIFRoZSBhcml0eSBvZiB0aGUgZnVuY3Rpb24gcmV0dXJuZWQgaXMgc3BlY2lmaWVkXG4gICAgICogdG8gYWxsb3cgdXNpbmcgdmFyaWFkaWMgY29uc3RydWN0b3IgZnVuY3Rpb25zLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC40LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiAoKiAtPiB7Kn0pIC0+ICgqIC0+IHsqfSlcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgYXJpdHkgb2YgdGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IEZuIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiB0byB3cmFwLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIHdyYXBwZWQsIGN1cnJpZWQgY29uc3RydWN0b3IgZnVuY3Rpb24uXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gVmFyaWFkaWMgY29uc3RydWN0b3IgZnVuY3Rpb25cbiAgICAgKiAgICAgIHZhciBXaWRnZXQgPSAoKSA9PiB7XG4gICAgICogICAgICAgIHRoaXMuY2hpbGRyZW4gPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAqICAgICAgICAvLyAuLi5cbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICBXaWRnZXQucHJvdG90eXBlID0ge1xuICAgICAqICAgICAgICAvLyAuLi5cbiAgICAgKiAgICAgIH07XG4gICAgICogICAgICB2YXIgYWxsQ29uZmlncyA9IFtcbiAgICAgKiAgICAgICAgLy8gLi4uXG4gICAgICogICAgICBdO1xuICAgICAqICAgICAgUi5tYXAoUi5jb25zdHJ1Y3ROKDEsIFdpZGdldCksIGFsbENvbmZpZ3MpOyAvLyBhIGxpc3Qgb2YgV2lkZ2V0c1xuICAgICAqL1xuICAgIHZhciBjb25zdHJ1Y3ROID0gX2N1cnJ5MihmdW5jdGlvbiBjb25zdHJ1Y3ROKG4sIEZuKSB7XG4gICAgICAgIGlmIChuID4gMTApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ29uc3RydWN0b3Igd2l0aCBncmVhdGVyIHRoYW4gdGVuIGFyZ3VtZW50cycpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChuID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgRm4oKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGN1cnJ5KG5BcnkobiwgZnVuY3Rpb24gKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNywgJDgsICQ5KSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwKTtcbiAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSk7XG4gICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyKTtcbiAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzKTtcbiAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCk7XG4gICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMywgJDQsICQ1KTtcbiAgICAgICAgICAgIGNhc2UgNzpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2KTtcbiAgICAgICAgICAgIGNhc2UgODpcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3IEZuKCQwLCAkMSwgJDIsICQzLCAkNCwgJDUsICQ2LCAkNyk7XG4gICAgICAgICAgICBjYXNlIDk6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4KTtcbiAgICAgICAgICAgIGNhc2UgMTA6XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ldyBGbigkMCwgJDEsICQyLCAkMywgJDQsICQ1LCAkNiwgJDcsICQ4LCAkOSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIEFjY2VwdHMgYSBjb252ZXJnaW5nIGZ1bmN0aW9uIGFuZCBhIGxpc3Qgb2YgYnJhbmNoaW5nIGZ1bmN0aW9ucyBhbmQgcmV0dXJucyBhIG5ldyBmdW5jdGlvbi5cbiAgICAgKiBXaGVuIGludm9rZWQsIHRoaXMgbmV3IGZ1bmN0aW9uIGlzIGFwcGxpZWQgdG8gc29tZSBhcmd1bWVudHMsIGVhY2ggYnJhbmNoaW5nXG4gICAgICogZnVuY3Rpb24gaXMgYXBwbGllZCB0byB0aG9zZSBzYW1lIGFyZ3VtZW50cy4gVGhlIHJlc3VsdHMgb2YgZWFjaCBicmFuY2hpbmdcbiAgICAgKiBmdW5jdGlvbiBhcmUgcGFzc2VkIGFzIGFyZ3VtZW50cyB0byB0aGUgY29udmVyZ2luZyBmdW5jdGlvbiB0byBwcm9kdWNlIHRoZSByZXR1cm4gdmFsdWUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjQuMlxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKHgxIC0+IHgyIC0+IC4uLiAtPiB6KSAtPiBbKGEgLT4gYiAtPiAuLi4gLT4geDEpLCAoYSAtPiBiIC0+IC4uLiAtPiB4MiksIC4uLl0gLT4gKGEgLT4gYiAtPiAuLi4gLT4geilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBhZnRlciBBIGZ1bmN0aW9uLiBgYWZ0ZXJgIHdpbGwgYmUgaW52b2tlZCB3aXRoIHRoZSByZXR1cm4gdmFsdWVzIG9mXG4gICAgICogICAgICAgIGBmbjFgIGFuZCBgZm4yYCBhcyBpdHMgYXJndW1lbnRzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGZ1bmN0aW9ucyBBIGxpc3Qgb2YgZnVuY3Rpb25zLlxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBBIG5ldyBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYWRkID0gKGEsIGIpID0+IGEgKyBiO1xuICAgICAqICAgICAgdmFyIG11bHRpcGx5ID0gKGEsIGIpID0+IGEgKiBiO1xuICAgICAqICAgICAgdmFyIHN1YnRyYWN0ID0gKGEsIGIpID0+IGEgLSBiO1xuICAgICAqXG4gICAgICogICAgICAvL+KJhSBtdWx0aXBseSggYWRkKDEsIDIpLCBzdWJ0cmFjdCgxLCAyKSApO1xuICAgICAqICAgICAgUi5jb252ZXJnZShtdWx0aXBseSwgW2FkZCwgc3VidHJhY3RdKSgxLCAyKTsgLy89PiAtM1xuICAgICAqXG4gICAgICogICAgICB2YXIgYWRkMyA9IChhLCBiLCBjKSA9PiBhICsgYiArIGM7XG4gICAgICogICAgICBSLmNvbnZlcmdlKGFkZDMsIFttdWx0aXBseSwgYWRkLCBzdWJ0cmFjdF0pKDEsIDIpOyAvLz0+IDRcbiAgICAgKi9cbiAgICB2YXIgY29udmVyZ2UgPSBfY3VycnkyKGZ1bmN0aW9uIGNvbnZlcmdlKGFmdGVyLCBmbnMpIHtcbiAgICAgICAgcmV0dXJuIGN1cnJ5TihNYXRoLm1heC5hcHBseShNYXRoLCBwbHVjaygnbGVuZ3RoJywgZm5zKSksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICAgICAgdmFyIGNvbnRleHQgPSB0aGlzO1xuICAgICAgICAgICAgcmV0dXJuIGFmdGVyLmFwcGx5KGNvbnRleHQsIF9tYXAoZnVuY3Rpb24gKGZuKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZuLmFwcGx5KGNvbnRleHQsIGFyZ3MpO1xuICAgICAgICAgICAgfSwgZm5zKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhbGwgYnV0IHRoZSBmaXJzdCBgbmAgZWxlbWVudHMgb2YgdGhlIGdpdmVuIGxpc3QsIHN0cmluZywgb3JcbiAgICAgKiB0cmFuc2R1Y2VyL3RyYW5zZm9ybWVyIChvciBvYmplY3Qgd2l0aCBhIGBkcm9wYCBtZXRob2QpLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGRyb3BgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzZWUgUi50cmFuc2R1Y2VcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICogQHBhcmFtIHsqfSBsaXN0XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIudGFrZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZHJvcCgxLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmFyJywgJ2JheiddXG4gICAgICogICAgICBSLmRyb3AoMiwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2JheiddXG4gICAgICogICAgICBSLmRyb3AoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5kcm9wKDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gW11cbiAgICAgKiAgICAgIFIuZHJvcCgzLCAncmFtZGEnKTsgICAgICAgICAgICAgICAvLz0+ICdkYSdcbiAgICAgKi9cbiAgICB2YXIgZHJvcCA9IF9jdXJyeTIoX2Rpc3BhdGNoYWJsZSgnZHJvcCcsIF94ZHJvcCwgZnVuY3Rpb24gZHJvcChuLCB4cykge1xuICAgICAgICByZXR1cm4gc2xpY2UoTWF0aC5tYXgoMCwgbiksIEluZmluaXR5LCB4cyk7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxpc3QgY29udGFpbmluZyBhbGwgYnV0IHRoZSBsYXN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gYGxpc3RgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNi4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIE51bWJlciAtPiBbYV0gLT4gW2FdXG4gICAgICogQHNpZyBOdW1iZXIgLT4gU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuIFRoZSBudW1iZXIgb2YgZWxlbWVudHMgb2YgYHhzYCB0byBza2lwLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBjb2xsZWN0aW9uIHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fVxuICAgICAqIEBzZWUgUi50YWtlTGFzdFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuZHJvcExhc3QoMSwgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbJ2ZvbycsICdiYXInXVxuICAgICAqICAgICAgUi5kcm9wTGFzdCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnZm9vJ11cbiAgICAgKiAgICAgIFIuZHJvcExhc3QoMywgWydmb28nLCAnYmFyJywgJ2JheiddKTsgLy89PiBbXVxuICAgICAqICAgICAgUi5kcm9wTGFzdCg0LCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFtdXG4gICAgICogICAgICBSLmRyb3BMYXN0KDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ3JhJ1xuICAgICAqL1xuICAgIHZhciBkcm9wTGFzdCA9IF9jdXJyeTIoZnVuY3Rpb24gZHJvcExhc3QobiwgeHMpIHtcbiAgICAgICAgcmV0dXJuIHRha2UobiA8IHhzLmxlbmd0aCA/IHhzLmxlbmd0aCAtIG4gOiAwLCB4cyk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aG91dCBhbnkgY29uc2VjdXRpdmVseSByZXBlYXRpbmcgZWxlbWVudHMuIEVxdWFsaXR5IGlzXG4gICAgICogZGV0ZXJtaW5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWQgcHJlZGljYXRlIHR3byBjb25zZWN1dGl2ZSBlbGVtZW50cy5cbiAgICAgKiBUaGUgZmlyc3QgZWxlbWVudCBpbiBhIHNlcmllcyBvZiBlcXVhbCBlbGVtZW50IGlzIHRoZSBvbmUgYmVpbmcgcHJlc2VydmVkLlxuICAgICAqXG4gICAgICogRGlzcGF0Y2hlcyB0byB0aGUgYGRyb3BSZXBlYXRzV2l0aGAgbWV0aG9kIG9mIHRoZSBzZWNvbmQgYXJndW1lbnQsIGlmIHByZXNlbnQuXG4gICAgICpcbiAgICAgKiBBY3RzIGFzIGEgdHJhbnNkdWNlciBpZiBhIHRyYW5zZm9ybWVyIGlzIGdpdmVuIGluIGxpc3QgcG9zaXRpb24uXG4gICAgICogQHNlZSBSLnRyYW5zZHVjZVxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNC4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhLCBhIC0+IEJvb2xlYW4pIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBwcmVkIEEgcHJlZGljYXRlIHVzZWQgdG8gdGVzdCB3aGV0aGVyIHR3byBpdGVtcyBhcmUgZXF1YWwuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IGBsaXN0YCB3aXRob3V0IHJlcGVhdGluZyBlbGVtZW50cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbGVuZ3RoRXEgPSAoeCwgeSkgPT4gTWF0aC5hYnMoeCkgPT09IE1hdGguYWJzKHkpO1xuICAgICAqICAgICAgdmFyIGwgPSBbMSwgLTEsIDEsIDMsIDQsIC00LCAtNCwgLTUsIDUsIDMsIDNdO1xuICAgICAqICAgICAgUi5kcm9wUmVwZWF0c1dpdGgoUi5lcUJ5KE1hdGguYWJzKSwgbCk7IC8vPT4gWzEsIDMsIDQsIC01LCAzXVxuICAgICAqL1xuICAgIHZhciBkcm9wUmVwZWF0c1dpdGggPSBfY3VycnkyKF9kaXNwYXRjaGFibGUoJ2Ryb3BSZXBlYXRzV2l0aCcsIF94ZHJvcFJlcGVhdHNXaXRoLCBmdW5jdGlvbiBkcm9wUmVwZWF0c1dpdGgocHJlZCwgbGlzdCkge1xuICAgICAgICB2YXIgcmVzdWx0ID0gW107XG4gICAgICAgIHZhciBpZHggPSAxO1xuICAgICAgICB2YXIgbGVuID0gbGlzdC5sZW5ndGg7XG4gICAgICAgIGlmIChsZW4gIT09IDApIHtcbiAgICAgICAgICAgIHJlc3VsdFswXSA9IGxpc3RbMF07XG4gICAgICAgICAgICB3aGlsZSAoaWR4IDwgbGVuKSB7XG4gICAgICAgICAgICAgICAgaWYgKCFwcmVkKGxhc3QocmVzdWx0KSwgbGlzdFtpZHhdKSkge1xuICAgICAgICAgICAgICAgICAgICByZXN1bHRbcmVzdWx0Lmxlbmd0aF0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSkpO1xuXG4gICAgLyoqXG4gICAgICogVGFrZXMgYSBmdW5jdGlvbiBhbmQgdHdvIHZhbHVlcyBpbiBpdHMgZG9tYWluIGFuZCByZXR1cm5zIGB0cnVlYCBpZlxuICAgICAqIHRoZSB2YWx1ZXMgbWFwIHRvIHRoZSBzYW1lIHZhbHVlIGluIHRoZSBjb2RvbWFpbjsgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE4LjBcbiAgICAgKiBAY2F0ZWdvcnkgUmVsYXRpb25cbiAgICAgKiBAc2lnIChhIC0+IGIpIC0+IGEgLT4gYSAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZlxuICAgICAqIEBwYXJhbSB7Kn0geFxuICAgICAqIEBwYXJhbSB7Kn0geVxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5lcUJ5KE1hdGguYWJzLCA1LCAtNSk7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBlcUJ5ID0gX2N1cnJ5MyhmdW5jdGlvbiBlcUJ5KGYsIHgsIHkpIHtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhmKHgpLCBmKHkpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJlcG9ydHMgd2hldGhlciB0d28gb2JqZWN0cyBoYXZlIHRoZSBzYW1lIHZhbHVlLCBpbiBgUi5lcXVhbHNgIHRlcm1zLFxuICAgICAqIGZvciB0aGUgc3BlY2lmaWVkIHByb3BlcnR5LiBVc2VmdWwgYXMgYSBjdXJyaWVkIHByZWRpY2F0ZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgayAtPiB7azogdn0gLT4ge2s6IHZ9IC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gcHJvcCBUaGUgbmFtZSBvZiB0aGUgcHJvcGVydHkgdG8gY29tcGFyZVxuICAgICAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iajJcbiAgICAgKiBAcmV0dXJuIHtCb29sZWFufVxuICAgICAqXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG8xID0geyBhOiAxLCBiOiAyLCBjOiAzLCBkOiA0IH07XG4gICAgICogICAgICB2YXIgbzIgPSB7IGE6IDEwLCBiOiAyMCwgYzogMywgZDogNDAgfTtcbiAgICAgKiAgICAgIFIuZXFQcm9wcygnYScsIG8xLCBvMik7IC8vPT4gZmFsc2VcbiAgICAgKiAgICAgIFIuZXFQcm9wcygnYycsIG8xLCBvMik7IC8vPT4gdHJ1ZVxuICAgICAqL1xuICAgIHZhciBlcVByb3BzID0gX2N1cnJ5MyhmdW5jdGlvbiBlcVByb3BzKHByb3AsIG9iajEsIG9iajIpIHtcbiAgICAgICAgcmV0dXJuIGVxdWFscyhvYmoxW3Byb3BdLCBvYmoyW3Byb3BdKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIHBvc2l0aW9uIG9mIHRoZSBmaXJzdCBvY2N1cnJlbmNlIG9mIGFuIGl0ZW0gaW4gYW4gYXJyYXksXG4gICAgICogb3IgLTEgaWYgdGhlIGl0ZW0gaXMgbm90IGluY2x1ZGVkIGluIHRoZSBhcnJheS4gYFIuZXF1YWxzYCBpcyB1c2VkIHRvXG4gICAgICogZGV0ZXJtaW5lIGVxdWFsaXR5LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgYSAtPiBbYV0gLT4gTnVtYmVyXG4gICAgICogQHBhcmFtIHsqfSB0YXJnZXQgVGhlIGl0ZW0gdG8gZmluZC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgYXJyYXkgdG8gc2VhcmNoIGluLlxuICAgICAqIEByZXR1cm4ge051bWJlcn0gdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQsIG9yIC0xIGlmIHRoZSB0YXJnZXQgaXMgbm90IGZvdW5kLlxuICAgICAqIEBzZWUgUi5sYXN0SW5kZXhPZlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5kZXhPZigzLCBbMSwyLDMsNF0pOyAvLz0+IDJcbiAgICAgKiAgICAgIFIuaW5kZXhPZigxMCwgWzEsMiwzLDRdKTsgLy89PiAtMVxuICAgICAqL1xuICAgIHZhciBpbmRleE9mID0gX2N1cnJ5MihmdW5jdGlvbiBpbmRleE9mKHRhcmdldCwgeHMpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB4cy5pbmRleE9mID09PSAnZnVuY3Rpb24nICYmICFfaXNBcnJheSh4cykgPyB4cy5pbmRleE9mKHRhcmdldCkgOiBfaW5kZXhPZih4cywgdGFyZ2V0LCAwKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYWxsIGJ1dCB0aGUgbGFzdCBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0IG9yIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2VlIFIubGFzdCwgUi5oZWFkLCBSLnRhaWxcbiAgICAgKiBAc2lnIFthXSAtPiBbYV1cbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0geyp9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5pdChbMSwgMiwgM10pOyAgLy89PiBbMSwgMl1cbiAgICAgKiAgICAgIFIuaW5pdChbMSwgMl0pOyAgICAgLy89PiBbMV1cbiAgICAgKiAgICAgIFIuaW5pdChbMV0pOyAgICAgICAgLy89PiBbXVxuICAgICAqICAgICAgUi5pbml0KFtdKTsgICAgICAgICAvLz0+IFtdXG4gICAgICpcbiAgICAgKiAgICAgIFIuaW5pdCgnYWJjJyk7ICAvLz0+ICdhYidcbiAgICAgKiAgICAgIFIuaW5pdCgnYWInKTsgICAvLz0+ICdhJ1xuICAgICAqICAgICAgUi5pbml0KCdhJyk7ICAgIC8vPT4gJydcbiAgICAgKiAgICAgIFIuaW5pdCgnJyk7ICAgICAvLz0+ICcnXG4gICAgICovXG4gICAgdmFyIGluaXQgPSBzbGljZSgwLCAtMSk7XG5cbiAgICAvKipcbiAgICAgKiBUcmFuc2Zvcm1zIHRoZSBpdGVtcyBvZiB0aGUgbGlzdCB3aXRoIHRoZSB0cmFuc2R1Y2VyIGFuZCBhcHBlbmRzIHRoZSB0cmFuc2Zvcm1lZCBpdGVtcyB0b1xuICAgICAqIHRoZSBhY2N1bXVsYXRvciB1c2luZyBhbiBhcHByb3ByaWF0ZSBpdGVyYXRvciBmdW5jdGlvbiBiYXNlZCBvbiB0aGUgYWNjdW11bGF0b3IgdHlwZS5cbiAgICAgKlxuICAgICAqIFRoZSBhY2N1bXVsYXRvciBjYW4gYmUgYW4gYXJyYXksIHN0cmluZywgb2JqZWN0IG9yIGEgdHJhbnNmb3JtZXIuIEl0ZXJhdGVkIGl0ZW1zIHdpbGxcbiAgICAgKiBiZSBhcHBlbmRlZCB0byBhcnJheXMgYW5kIGNvbmNhdGVuYXRlZCB0byBzdHJpbmdzLiBPYmplY3RzIHdpbGwgYmUgbWVyZ2VkIGRpcmVjdGx5IG9yIDItaXRlbVxuICAgICAqIGFycmF5cyB3aWxsIGJlIG1lcmdlZCBhcyBrZXksIHZhbHVlIHBhaXJzLlxuICAgICAqXG4gICAgICogVGhlIGFjY3VtdWxhdG9yIGNhbiBhbHNvIGJlIGEgdHJhbnNmb3JtZXIgb2JqZWN0IHRoYXQgcHJvdmlkZXMgYSAyLWFyaXR5IHJlZHVjaW5nIGl0ZXJhdG9yXG4gICAgICogZnVuY3Rpb24sIHN0ZXAsIDAtYXJpdHkgaW5pdGlhbCB2YWx1ZSBmdW5jdGlvbiwgaW5pdCwgYW5kIDEtYXJpdHkgcmVzdWx0IGV4dHJhY3Rpb24gZnVuY3Rpb25cbiAgICAgKiByZXN1bHQuIFRoZSBzdGVwIGZ1bmN0aW9uIGlzIHVzZWQgYXMgdGhlIGl0ZXJhdG9yIGZ1bmN0aW9uIGluIHJlZHVjZS4gVGhlIHJlc3VsdCBmdW5jdGlvbiBpc1xuICAgICAqIHVzZWQgdG8gY29udmVydCB0aGUgZmluYWwgYWNjdW11bGF0b3IgaW50byB0aGUgcmV0dXJuIHR5cGUgYW5kIGluIG1vc3QgY2FzZXMgaXMgUi5pZGVudGl0eS5cbiAgICAgKiBUaGUgaW5pdCBmdW5jdGlvbiBpcyB1c2VkIHRvIHByb3ZpZGUgdGhlIGluaXRpYWwgYWNjdW11bGF0b3IuXG4gICAgICpcbiAgICAgKiBUaGUgaXRlcmF0aW9uIGlzIHBlcmZvcm1lZCB3aXRoIFIucmVkdWNlIGFmdGVyIGluaXRpYWxpemluZyB0aGUgdHJhbnNkdWNlci5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTIuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBhIC0+IChiIC0+IGIpIC0+IFtjXSAtPiBhXG4gICAgICogQHBhcmFtIHsqfSBhY2MgVGhlIGluaXRpYWwgYWNjdW11bGF0b3IgdmFsdWUuXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0geGYgVGhlIHRyYW5zZHVjZXIgZnVuY3Rpb24uIFJlY2VpdmVzIGEgdHJhbnNmb3JtZXIgYW5kIHJldHVybnMgYSB0cmFuc2Zvcm1lci5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IFRoZSBsaXN0IHRvIGl0ZXJhdGUgb3Zlci5cbiAgICAgKiBAcmV0dXJuIHsqfSBUaGUgZmluYWwsIGFjY3VtdWxhdGVkIHZhbHVlLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBudW1iZXJzID0gWzEsIDIsIDMsIDRdO1xuICAgICAqICAgICAgdmFyIHRyYW5zZHVjZXIgPSBSLmNvbXBvc2UoUi5tYXAoUi5hZGQoMSkpLCBSLnRha2UoMikpO1xuICAgICAqXG4gICAgICogICAgICBSLmludG8oW10sIHRyYW5zZHVjZXIsIG51bWJlcnMpOyAvLz0+IFsyLCAzXVxuICAgICAqXG4gICAgICogICAgICB2YXIgaW50b0FycmF5ID0gUi5pbnRvKFtdKTtcbiAgICAgKiAgICAgIGludG9BcnJheSh0cmFuc2R1Y2VyLCBudW1iZXJzKTsgLy89PiBbMiwgM11cbiAgICAgKi9cbiAgICB2YXIgaW50byA9IF9jdXJyeTMoZnVuY3Rpb24gaW50byhhY2MsIHhmLCBsaXN0KSB7XG4gICAgICAgIHJldHVybiBfaXNUcmFuc2Zvcm1lcihhY2MpID8gX3JlZHVjZSh4ZihhY2MpLCBhY2NbJ0BAdHJhbnNkdWNlci9pbml0J10oKSwgbGlzdCkgOiBfcmVkdWNlKHhmKF9zdGVwQ2F0KGFjYykpLCBhY2MsIGxpc3QpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBgdHJ1ZWAgaWYgYWxsIGVsZW1lbnRzIGFyZSB1bmlxdWUsIGluIGBSLmVxdWFsc2AgdGVybXMsXG4gICAgICogb3RoZXJ3aXNlIGBmYWxzZWAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMVxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBbYV0gLT4gQm9vbGVhblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0Jvb2xlYW59IGB0cnVlYCBpZiBhbGwgZWxlbWVudHMgYXJlIHVuaXF1ZSwgZWxzZSBgZmFsc2VgLlxuICAgICAqIEBzZWUgUi5hbGxVbmlxXG4gICAgICogQGRlcHJlY2F0ZWQgc2luY2UgdjAuMTguMFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuaXNTZXQoWycxJywgMV0pOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuaXNTZXQoWzEsIDFdKTsgICAvLz0+IGZhbHNlXG4gICAgICogICAgICBSLmlzU2V0KFtbNDJdLCBbNDJdXSk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgaXNTZXQgPSBhbGxVbmlxO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxlbnMgZm9yIHRoZSBnaXZlbiBnZXR0ZXIgYW5kIHNldHRlciBmdW5jdGlvbnMuIFRoZSBnZXR0ZXIgXCJnZXRzXCJcbiAgICAgKiB0aGUgdmFsdWUgb2YgdGhlIGZvY3VzOyB0aGUgc2V0dGVyIFwic2V0c1wiIHRoZSB2YWx1ZSBvZiB0aGUgZm9jdXMuIFRoZSBzZXR0ZXJcbiAgICAgKiBzaG91bGQgbm90IG11dGF0ZSB0aGUgZGF0YSBzdHJ1Y3R1cmUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjguMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICAgICAqIEBzaWcgKHMgLT4gYSkgLT4gKChhLCBzKSAtPiBzKSAtPiBMZW5zIHMgYVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGdldHRlclxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IHNldHRlclxuICAgICAqIEByZXR1cm4ge0xlbnN9XG4gICAgICogQHNlZSBSLnZpZXcsIFIuc2V0LCBSLm92ZXIsIFIubGVuc0luZGV4LCBSLmxlbnNQcm9wXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zKFIucHJvcCgneCcpLCBSLmFzc29jKCd4JykpO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gICAgICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAgICAgKiAgICAgIFIub3Zlcih4TGVucywgUi5uZWdhdGUsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt4OiAtMSwgeTogMn1cbiAgICAgKi9cbiAgICB2YXIgbGVucyA9IF9jdXJyeTIoZnVuY3Rpb24gbGVucyhnZXR0ZXIsIHNldHRlcikge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gKGYpIHtcbiAgICAgICAgICAgIHJldHVybiBmdW5jdGlvbiAocykge1xuICAgICAgICAgICAgICAgIHJldHVybiBtYXAoZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHNldHRlcih2LCBzKTtcbiAgICAgICAgICAgICAgICB9LCBmKGdldHRlcihzKSkpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBsZW5zIHdob3NlIGZvY3VzIGlzIHRoZSBzcGVjaWZpZWQgaW5kZXguXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE0LjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQHR5cGVkZWZuIExlbnMgcyBhID0gRnVuY3RvciBmID0+IChhIC0+IGYgYSkgLT4gcyAtPiBmIHNcbiAgICAgKiBAc2lnIE51bWJlciAtPiBMZW5zIHMgYVxuICAgICAqIEBwYXJhbSB7TnVtYmVyfSBuXG4gICAgICogQHJldHVybiB7TGVuc31cbiAgICAgKiBAc2VlIFIudmlldywgUi5zZXQsIFIub3ZlclxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBoZWFkTGVucyA9IFIubGVuc0luZGV4KDApO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoaGVhZExlbnMsIFsnYScsICdiJywgJ2MnXSk7ICAgICAgICAgICAgLy89PiAnYSdcbiAgICAgKiAgICAgIFIuc2V0KGhlYWRMZW5zLCAneCcsIFsnYScsICdiJywgJ2MnXSk7ICAgICAgICAvLz0+IFsneCcsICdiJywgJ2MnXVxuICAgICAqICAgICAgUi5vdmVyKGhlYWRMZW5zLCBSLnRvVXBwZXIsIFsnYScsICdiJywgJ2MnXSk7IC8vPT4gWydBJywgJ2InLCAnYyddXG4gICAgICovXG4gICAgdmFyIGxlbnNJbmRleCA9IF9jdXJyeTEoZnVuY3Rpb24gbGVuc0luZGV4KG4pIHtcbiAgICAgICAgcmV0dXJuIGxlbnMobnRoKG4pLCB1cGRhdGUobikpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIGxlbnMgd2hvc2UgZm9jdXMgaXMgdGhlIHNwZWNpZmllZCBwcm9wZXJ0eS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTQuMFxuICAgICAqIEBjYXRlZ29yeSBPYmplY3RcbiAgICAgKiBAdHlwZWRlZm4gTGVucyBzIGEgPSBGdW5jdG9yIGYgPT4gKGEgLT4gZiBhKSAtPiBzIC0+IGYgc1xuICAgICAqIEBzaWcgU3RyaW5nIC0+IExlbnMgcyBhXG4gICAgICogQHBhcmFtIHtTdHJpbmd9IGtcbiAgICAgKiBAcmV0dXJuIHtMZW5zfVxuICAgICAqIEBzZWUgUi52aWV3LCBSLnNldCwgUi5vdmVyXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIHhMZW5zID0gUi5sZW5zUHJvcCgneCcpO1xuICAgICAqXG4gICAgICogICAgICBSLnZpZXcoeExlbnMsIHt4OiAxLCB5OiAyfSk7ICAgICAgICAgICAgLy89PiAxXG4gICAgICogICAgICBSLnNldCh4TGVucywgNCwge3g6IDEsIHk6IDJ9KTsgICAgICAgICAgLy89PiB7eDogNCwgeTogMn1cbiAgICAgKiAgICAgIFIub3Zlcih4TGVucywgUi5uZWdhdGUsIHt4OiAxLCB5OiAyfSk7ICAvLz0+IHt4OiAtMSwgeTogMn1cbiAgICAgKi9cbiAgICB2YXIgbGVuc1Byb3AgPSBfY3VycnkxKGZ1bmN0aW9uIGxlbnNQcm9wKGspIHtcbiAgICAgICAgcmV0dXJuIGxlbnMocHJvcChrKSwgYXNzb2MoaykpO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogXCJsaWZ0c1wiIGEgZnVuY3Rpb24gdG8gYmUgdGhlIHNwZWNpZmllZCBhcml0eSwgc28gdGhhdCBpdCBtYXkgXCJtYXAgb3ZlclwiIHRoYXQgbWFueVxuICAgICAqIGxpc3RzIChvciBvdGhlciBGdW5jdG9ycykuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjcuMFxuICAgICAqIEBzZWUgUi5saWZ0XG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyBOdW1iZXIgLT4gKCouLi4gLT4gKikgLT4gKFsqXS4uLiAtPiBbKl0pXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIGxpZnQgaW50byBoaWdoZXIgY29udGV4dFxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBUaGUgZnVuY3Rpb24gYGZuYCBhcHBsaWNhYmxlIHRvIG1hcHBhYmxlIG9iamVjdHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIG1hZGQzID0gUi5saWZ0TigzLCBSLmN1cnJ5TigzLCAoKSA9PiBSLnJlZHVjZShSLmFkZCwgMCwgYXJndW1lbnRzKSkpO1xuICAgICAqICAgICAgbWFkZDMoWzEsMiwzXSwgWzEsMiwzXSwgWzFdKTsgLy89PiBbMywgNCwgNSwgNCwgNSwgNiwgNSwgNiwgN11cbiAgICAgKi9cbiAgICB2YXIgbGlmdE4gPSBfY3VycnkyKGZ1bmN0aW9uIGxpZnROKGFyaXR5LCBmbikge1xuICAgICAgICB2YXIgbGlmdGVkID0gY3VycnlOKGFyaXR5LCBmbik7XG4gICAgICAgIHJldHVybiBjdXJyeU4oYXJpdHksIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBfcmVkdWNlKGFwLCBtYXAobGlmdGVkLCBhcmd1bWVudHNbMF0pLCBfc2xpY2UoYXJndW1lbnRzLCAxKSk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyB0aGUgbWVhbiBvZiB0aGUgZ2l2ZW4gbGlzdCBvZiBudW1iZXJzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNC4wXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tZWFuKFsyLCA3LCA5XSk7IC8vPT4gNlxuICAgICAqICAgICAgUi5tZWFuKFtdKTsgLy89PiBOYU5cbiAgICAgKi9cbiAgICB2YXIgbWVhbiA9IF9jdXJyeTEoZnVuY3Rpb24gbWVhbihsaXN0KSB7XG4gICAgICAgIHJldHVybiBzdW0obGlzdCkgLyBsaXN0Lmxlbmd0aDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIG1lZGlhbiBvZiB0aGUgZ2l2ZW4gbGlzdCBvZiBudW1iZXJzLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNC4wXG4gICAgICogQGNhdGVnb3J5IE1hdGhcbiAgICAgKiBAc2lnIFtOdW1iZXJdIC0+IE51bWJlclxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3RcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5tZWRpYW4oWzIsIDksIDddKTsgLy89PiA3XG4gICAgICogICAgICBSLm1lZGlhbihbNywgMiwgMTAsIDldKTsgLy89PiA4XG4gICAgICogICAgICBSLm1lZGlhbihbXSk7IC8vPT4gTmFOXG4gICAgICovXG4gICAgdmFyIG1lZGlhbiA9IF9jdXJyeTEoZnVuY3Rpb24gbWVkaWFuKGxpc3QpIHtcbiAgICAgICAgdmFyIGxlbiA9IGxpc3QubGVuZ3RoO1xuICAgICAgICBpZiAobGVuID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gTmFOO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3aWR0aCA9IDIgLSBsZW4gJSAyO1xuICAgICAgICB2YXIgaWR4ID0gKGxlbiAtIHdpZHRoKSAvIDI7XG4gICAgICAgIHJldHVybiBtZWFuKF9zbGljZShsaXN0KS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XG4gICAgICAgICAgICByZXR1cm4gYSA8IGIgPyAtMSA6IGEgPiBiID8gMSA6IDA7XG4gICAgICAgIH0pLnNsaWNlKGlkeCwgaWR4ICsgd2lkdGgpKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIE1lcmdlcyBhIGxpc3Qgb2Ygb2JqZWN0cyB0b2dldGhlciBpbnRvIG9uZSBvYmplY3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEwLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW3trOiB2fV0gLT4ge2s6IHZ9XG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBBbiBhcnJheSBvZiBvYmplY3RzXG4gICAgICogQHJldHVybiB7T2JqZWN0fSBBIG1lcmdlZCBvYmplY3QuXG4gICAgICogQHNlZSBSLnJlZHVjZVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIubWVyZ2VBbGwoW3tmb286MX0se2JhcjoyfSx7YmF6OjN9XSk7IC8vPT4ge2ZvbzoxLGJhcjoyLGJhejozfVxuICAgICAqICAgICAgUi5tZXJnZUFsbChbe2ZvbzoxfSx7Zm9vOjJ9LHtiYXI6Mn1dKTsgLy89PiB7Zm9vOjIsYmFyOjJ9XG4gICAgICovXG4gICAgdmFyIG1lcmdlQWxsID0gX2N1cnJ5MShmdW5jdGlvbiBtZXJnZUFsbChsaXN0KSB7XG4gICAgICAgIHJldHVybiByZWR1Y2UobWVyZ2UsIHt9LCBsaXN0KTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgZnVuY3Rpb24gY29tcG9zaXRpb24uIFRoZSBsZWZ0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZVxuICAgICAqIGFueSBhcml0eTsgdGhlIHJlbWFpbmluZyBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAgICAgKlxuICAgICAqIEluIHNvbWUgbGlicmFyaWVzIHRoaXMgZnVuY3Rpb24gaXMgbmFtZWQgYHNlcXVlbmNlYC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKChhLCBiLCAuLi4sIG4pIC0+IG8pLCAobyAtPiBwKSwgLi4uLCAoeCAtPiB5KSwgKHkgLT4geikpIC0+ICgoYSwgYiwgLi4uLCBuKSAtPiB6KVxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5jb21wb3NlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGYgPSBSLnBpcGUoTWF0aC5wb3csIFIubmVnYXRlLCBSLmluYyk7XG4gICAgICpcbiAgICAgKiAgICAgIGYoMywgNCk7IC8vIC0oM140KSArIDFcbiAgICAgKi9cbiAgICB2YXIgcGlwZSA9IGZ1bmN0aW9uIHBpcGUoKSB7XG4gICAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BpcGUgcmVxdWlyZXMgYXQgbGVhc3Qgb25lIGFyZ3VtZW50Jyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIF9hcml0eShhcmd1bWVudHNbMF0ubGVuZ3RoLCByZWR1Y2UoX3BpcGUsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm1zIGxlZnQtdG8tcmlnaHQgY29tcG9zaXRpb24gb2Ygb25lIG9yIG1vcmUgUHJvbWlzZS1yZXR1cm5pbmdcbiAgICAgKiBmdW5jdGlvbnMuIFRoZSBsZWZ0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZSBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmdcbiAgICAgKiBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTAuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKChhIC0+IFByb21pc2UgYiksIChiIC0+IFByb21pc2UgYyksIC4uLiwgKHkgLT4gUHJvbWlzZSB6KSkgLT4gKGEgLT4gUHJvbWlzZSB6KVxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5jb21wb3NlUFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vICBmb2xsb3dlcnNGb3JVc2VyIDo6IFN0cmluZyAtPiBQcm9taXNlIFtVc2VyXVxuICAgICAqICAgICAgdmFyIGZvbGxvd2Vyc0ZvclVzZXIgPSBSLnBpcGVQKGRiLmdldFVzZXJCeUlkLCBkYi5nZXRGb2xsb3dlcnMpO1xuICAgICAqL1xuICAgIHZhciBwaXBlUCA9IGZ1bmN0aW9uIHBpcGVQKCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdwaXBlUCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2FyaXR5KGFyZ3VtZW50c1swXS5sZW5ndGgsIHJlZHVjZShfcGlwZVAsIGFyZ3VtZW50c1swXSwgdGFpbChhcmd1bWVudHMpKSk7XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIE11bHRpcGxpZXMgdG9nZXRoZXIgYWxsIHRoZSBlbGVtZW50cyBvZiBhIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBNYXRoXG4gICAgICogQHNpZyBbTnVtYmVyXSAtPiBOdW1iZXJcbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIG51bWJlcnNcbiAgICAgKiBAcmV0dXJuIHtOdW1iZXJ9IFRoZSBwcm9kdWN0IG9mIGFsbCB0aGUgbnVtYmVycyBpbiB0aGUgbGlzdC5cbiAgICAgKiBAc2VlIFIucmVkdWNlXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5wcm9kdWN0KFsyLDQsNiw4LDEwMCwxXSk7IC8vPT4gMzg0MDBcbiAgICAgKi9cbiAgICB2YXIgcHJvZHVjdCA9IHJlZHVjZShtdWx0aXBseSwgMSk7XG5cbiAgICAvKipcbiAgICAgKiBSZWFzb25hYmxlIGFuYWxvZyB0byBTUUwgYHNlbGVjdGAgc3RhdGVtZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgT2JqZWN0XG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBba10gLT4gW3trOiB2fV0gLT4gW3trOiB2fV1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBwcm9wcyBUaGUgcHJvcGVydHkgbmFtZXMgdG8gcHJvamVjdFxuICAgICAqIEBwYXJhbSB7QXJyYXl9IG9ianMgVGhlIG9iamVjdHMgdG8gcXVlcnlcbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gQW4gYXJyYXkgb2Ygb2JqZWN0cyB3aXRoIGp1c3QgdGhlIGBwcm9wc2AgcHJvcGVydGllcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgYWJieSA9IHtuYW1lOiAnQWJieScsIGFnZTogNywgaGFpcjogJ2Jsb25kJywgZ3JhZGU6IDJ9O1xuICAgICAqICAgICAgdmFyIGZyZWQgPSB7bmFtZTogJ0ZyZWQnLCBhZ2U6IDEyLCBoYWlyOiAnYnJvd24nLCBncmFkZTogN307XG4gICAgICogICAgICB2YXIga2lkcyA9IFthYmJ5LCBmcmVkXTtcbiAgICAgKiAgICAgIFIucHJvamVjdChbJ25hbWUnLCAnZ3JhZGUnXSwga2lkcyk7IC8vPT4gW3tuYW1lOiAnQWJieScsIGdyYWRlOiAyfSwge25hbWU6ICdGcmVkJywgZ3JhZGU6IDd9XVxuICAgICAqL1xuICAgIC8vIHBhc3NpbmcgYGlkZW50aXR5YCBnaXZlcyBjb3JyZWN0IGFyaXR5XG4gICAgdmFyIHByb2plY3QgPSB1c2VXaXRoKF9tYXAsIFtcbiAgICAgICAgcGlja0FsbCxcbiAgICAgICAgaWRlbnRpdHlcbiAgICBdKTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBuZXcgbGlzdCBjb250YWluaW5nIHRoZSBsYXN0IGBuYCBlbGVtZW50cyBvZiB0aGUgZ2l2ZW4gbGlzdC5cbiAgICAgKiBJZiBgbiA+IGxpc3QubGVuZ3RoYCwgcmV0dXJucyBhIGxpc3Qgb2YgYGxpc3QubGVuZ3RoYCBlbGVtZW50cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTYuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBOdW1iZXIgLT4gW2FdIC0+IFthXVxuICAgICAqIEBzaWcgTnVtYmVyIC0+IFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gbiBUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIHRvIHJldHVybi5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSB4cyBUaGUgY29sbGVjdGlvbiB0byBjb25zaWRlci5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX1cbiAgICAgKiBAc2VlIFIuZHJvcExhc3RcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnRha2VMYXN0KDEsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydiYXonXVxuICAgICAqICAgICAgUi50YWtlTGFzdCgyLCBbJ2ZvbycsICdiYXInLCAnYmF6J10pOyAvLz0+IFsnYmFyJywgJ2JheiddXG4gICAgICogICAgICBSLnRha2VMYXN0KDMsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gICAgICogICAgICBSLnRha2VMYXN0KDQsIFsnZm9vJywgJ2JhcicsICdiYXonXSk7IC8vPT4gWydmb28nLCAnYmFyJywgJ2JheiddXG4gICAgICogICAgICBSLnRha2VMYXN0KDMsICdyYW1kYScpOyAgICAgICAgICAgICAgIC8vPT4gJ21kYSdcbiAgICAgKi9cbiAgICB2YXIgdGFrZUxhc3QgPSBfY3VycnkyKGZ1bmN0aW9uIHRha2VMYXN0KG4sIHhzKSB7XG4gICAgICAgIHJldHVybiBkcm9wKG4gPj0gMCA/IHhzLmxlbmd0aCAtIG4gOiAwLCB4cyk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBTaG9ydGhhbmQgZm9yIGBSLmNoYWluKFIuaWRlbnRpdHkpYCwgd2hpY2ggcmVtb3ZlcyBvbmUgbGV2ZWwgb2YgbmVzdGluZ1xuICAgICAqIGZyb20gYW55IFtDaGFpbl0oaHR0cHM6Ly9naXRodWIuY29tL2ZhbnRhc3lsYW5kL2ZhbnRhc3ktbGFuZCNjaGFpbikuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjMuMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNpZyBDaGFpbiBjID0+IGMgKGMgYSkgLT4gYyBhXG4gICAgICogQHBhcmFtIHsqfSBsaXN0XG4gICAgICogQHJldHVybiB7Kn1cbiAgICAgKiBAc2VlIFIuZmxhdHRlbiwgUi5jaGFpblxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudW5uZXN0KFsxLCBbMl0sIFtbM11dXSk7IC8vPT4gWzEsIDIsIFszXV1cbiAgICAgKiAgICAgIFIudW5uZXN0KFtbMSwgMl0sIFszLCA0XSwgWzUsIDZdXSk7IC8vPT4gWzEsIDIsIDMsIDQsIDUsIDZdXG4gICAgICovXG4gICAgdmFyIHVubmVzdCA9IGNoYWluKF9pZGVudGl0eSk7XG5cbiAgICB2YXIgX2NvbnRhaW5zID0gZnVuY3Rpb24gX2NvbnRhaW5zKGEsIGxpc3QpIHtcbiAgICAgICAgcmV0dXJuIF9pbmRleE9mKGxpc3QsIGEsIDApID49IDA7XG4gICAgfTtcblxuICAgIC8vICBtYXBQYWlycyA6OiAoT2JqZWN0LCBbU3RyaW5nXSkgLT4gW1N0cmluZ11cbiAgICAvLyBGdW5jdGlvbiwgUmVnRXhwLCB1c2VyLWRlZmluZWQgdHlwZXNcbiAgICB2YXIgX3RvU3RyaW5nID0gZnVuY3Rpb24gX3RvU3RyaW5nKHgsIHNlZW4pIHtcbiAgICAgICAgdmFyIHJlY3VyID0gZnVuY3Rpb24gcmVjdXIoeSkge1xuICAgICAgICAgICAgdmFyIHhzID0gc2Vlbi5jb25jYXQoW3hdKTtcbiAgICAgICAgICAgIHJldHVybiBfY29udGFpbnMoeSwgeHMpID8gJzxDaXJjdWxhcj4nIDogX3RvU3RyaW5nKHksIHhzKTtcbiAgICAgICAgfTtcbiAgICAgICAgLy8gIG1hcFBhaXJzIDo6IChPYmplY3QsIFtTdHJpbmddKSAtPiBbU3RyaW5nXVxuICAgICAgICB2YXIgbWFwUGFpcnMgPSBmdW5jdGlvbiAob2JqLCBrZXlzKSB7XG4gICAgICAgICAgICByZXR1cm4gX21hcChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgIHJldHVybiBfcXVvdGUoaykgKyAnOiAnICsgcmVjdXIob2JqW2tdKTtcbiAgICAgICAgICAgIH0sIGtleXMuc2xpY2UoKS5zb3J0KCkpO1xuICAgICAgICB9O1xuICAgICAgICBzd2l0Y2ggKE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh4KSkge1xuICAgICAgICBjYXNlICdbb2JqZWN0IEFyZ3VtZW50c10nOlxuICAgICAgICAgICAgcmV0dXJuICcoZnVuY3Rpb24oKSB7IHJldHVybiBhcmd1bWVudHM7IH0oJyArIF9tYXAocmVjdXIsIHgpLmpvaW4oJywgJykgKyAnKSknO1xuICAgICAgICBjYXNlICdbb2JqZWN0IEFycmF5XSc6XG4gICAgICAgICAgICByZXR1cm4gJ1snICsgX21hcChyZWN1ciwgeCkuY29uY2F0KG1hcFBhaXJzKHgsIHJlamVjdChmdW5jdGlvbiAoaykge1xuICAgICAgICAgICAgICAgIHJldHVybiAvXlxcZCskLy50ZXN0KGspO1xuICAgICAgICAgICAgfSwga2V5cyh4KSkpKS5qb2luKCcsICcpICsgJ10nO1xuICAgICAgICBjYXNlICdbb2JqZWN0IEJvb2xlYW5dJzpcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgeCA9PT0gJ29iamVjdCcgPyAnbmV3IEJvb2xlYW4oJyArIHJlY3VyKHgudmFsdWVPZigpKSArICcpJyA6IHgudG9TdHJpbmcoKTtcbiAgICAgICAgY2FzZSAnW29iamVjdCBEYXRlXSc6XG4gICAgICAgICAgICByZXR1cm4gJ25ldyBEYXRlKCcgKyBfcXVvdGUoX3RvSVNPU3RyaW5nKHgpKSArICcpJztcbiAgICAgICAgY2FzZSAnW29iamVjdCBOdWxsXSc6XG4gICAgICAgICAgICByZXR1cm4gJ251bGwnO1xuICAgICAgICBjYXNlICdbb2JqZWN0IE51bWJlcl0nOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgTnVtYmVyKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiAxIC8geCA9PT0gLUluZmluaXR5ID8gJy0wJyA6IHgudG9TdHJpbmcoMTApO1xuICAgICAgICBjYXNlICdbb2JqZWN0IFN0cmluZ10nOlxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB4ID09PSAnb2JqZWN0JyA/ICduZXcgU3RyaW5nKCcgKyByZWN1cih4LnZhbHVlT2YoKSkgKyAnKScgOiBfcXVvdGUoeCk7XG4gICAgICAgIGNhc2UgJ1tvYmplY3QgVW5kZWZpbmVkXSc6XG4gICAgICAgICAgICByZXR1cm4gJ3VuZGVmaW5lZCc7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHguY29uc3RydWN0b3IgPT09ICdmdW5jdGlvbicgJiYgeC5jb25zdHJ1Y3Rvci5uYW1lICE9PSAnT2JqZWN0JyAmJiB0eXBlb2YgeC50b1N0cmluZyA9PT0gJ2Z1bmN0aW9uJyAmJiB4LnRvU3RyaW5nKCkgIT09ICdbb2JqZWN0IE9iamVjdF0nID8geC50b1N0cmluZygpIDogLy8gRnVuY3Rpb24sIFJlZ0V4cCwgdXNlci1kZWZpbmVkIHR5cGVzXG4gICAgICAgICAgICAneycgKyBtYXBQYWlycyh4LCBrZXlzKHgpKS5qb2luKCcsICcpICsgJ30nO1xuICAgICAgICB9XG4gICAgfTtcblxuICAgIC8qKlxuICAgICAqIFR1cm5zIGEgbGlzdCBvZiBGdW5jdG9ycyBpbnRvIGEgRnVuY3RvciBvZiBhIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjguMFxuICAgICAqIEBjYXRlZ29yeSBMaXN0XG4gICAgICogQHNlZSBSLmNvbW11dGVNYXBcbiAgICAgKiBAc2lnIEZ1bmN0b3IgZiA9PiAoeCAtPiBmIHgpIC0+IFtmIGFdIC0+IGYgW2FdXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gb2YgQSBmdW5jdGlvbiB0aGF0IHJldHVybnMgdGhlIGRhdGEgdHlwZSB0byByZXR1cm5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBsaXN0IEFuIGFycmF5IG9mIGZ1bmN0b3JzIG9mIHRoZSBzYW1lIHR5cGVcbiAgICAgKiBAcmV0dXJuIHsqfVxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuY29tbXV0ZShSLm9mLCBbWzFdLCBbMiwgM11dKTsgICAvLz0+IFtbMSwgMl0sIFsxLCAzXV1cbiAgICAgKiAgICAgIFIuY29tbXV0ZShSLm9mLCBbWzEsIDJdLCBbM11dKTsgICAvLz0+IFtbMSwgM10sIFsyLCAzXV1cbiAgICAgKiAgICAgIFIuY29tbXV0ZShSLm9mLCBbWzFdLCBbMl0sIFszXV0pOyAvLz0+IFtbMSwgMiwgM11dXG4gICAgICogICAgICBSLmNvbW11dGUoTWF5YmUub2YsIFtKdXN0KDEpLCBKdXN0KDIpLCBKdXN0KDMpXSk7ICAgLy89PiBKdXN0KFsxLCAyLCAzXSlcbiAgICAgKiAgICAgIFIuY29tbXV0ZShNYXliZS5vZiwgW0p1c3QoMSksIEp1c3QoMiksIE5vdGhpbmcoKV0pOyAvLz0+IE5vdGhpbmcoKVxuICAgICAqL1xuICAgIHZhciBjb21tdXRlID0gY29tbXV0ZU1hcChpZGVudGl0eSk7XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtcyByaWdodC10by1sZWZ0IGZ1bmN0aW9uIGNvbXBvc2l0aW9uLiBUaGUgcmlnaHRtb3N0IGZ1bmN0aW9uIG1heSBoYXZlXG4gICAgICogYW55IGFyaXR5OyB0aGUgcmVtYWluaW5nIGZ1bmN0aW9ucyBtdXN0IGJlIHVuYXJ5LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgoeSAtPiB6KSwgKHggLT4geSksIC4uLiwgKG8gLT4gcCksICgoYSwgYiwgLi4uLCBuKSAtPiBvKSkgLT4gKChhLCBiLCAuLi4sIG4pIC0+IHopXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn0gZnVuY3Rpb25zXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHNlZSBSLnBpcGVcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZiA9IFIuY29tcG9zZShSLmluYywgUi5uZWdhdGUsIE1hdGgucG93KTtcbiAgICAgKlxuICAgICAqICAgICAgZigzLCA0KTsgLy8gLSgzXjQpICsgMVxuICAgICAqL1xuICAgIHZhciBjb21wb3NlID0gZnVuY3Rpb24gY29tcG9zZSgpIHtcbiAgICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignY29tcG9zZSByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZS5hcHBseSh0aGlzLCByZXZlcnNlKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByaWdodC10by1sZWZ0IEtsZWlzbGkgY29tcG9zaXRpb24gb2YgdGhlIHByb3ZpZGVkIGZ1bmN0aW9ucyxcbiAgICAgKiBlYWNoIG9mIHdoaWNoIG11c3QgcmV0dXJuIGEgdmFsdWUgb2YgYSB0eXBlIHN1cHBvcnRlZCBieSBbYGNoYWluYF0oI2NoYWluKS5cbiAgICAgKlxuICAgICAqIGBSLmNvbXBvc2VLKGgsIGcsIGYpYCBpcyBlcXVpdmFsZW50IHRvIGBSLmNvbXBvc2UoUi5jaGFpbihoKSwgUi5jaGFpbihnKSwgUi5jaGFpbihmKSlgLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNi4wXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNlZSBSLnBpcGVLXG4gICAgICogQHNpZyBDaGFpbiBtID0+ICgoeSAtPiBtIHopLCAoeCAtPiBtIHkpLCAuLi4sIChhIC0+IG0gYikpIC0+IChtIGEgLT4gbSB6KVxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259XG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgLy8gIHBhcnNlSnNvbiA6OiBTdHJpbmcgLT4gTWF5YmUgKlxuICAgICAqICAgICAgLy8gIGdldCA6OiBTdHJpbmcgLT4gT2JqZWN0IC0+IE1heWJlICpcbiAgICAgKlxuICAgICAqICAgICAgLy8gIGdldFN0YXRlQ29kZSA6OiBNYXliZSBTdHJpbmcgLT4gTWF5YmUgU3RyaW5nXG4gICAgICogICAgICB2YXIgZ2V0U3RhdGVDb2RlID0gUi5jb21wb3NlSyhcbiAgICAgKiAgICAgICAgUi5jb21wb3NlKE1heWJlLm9mLCBSLnRvVXBwZXIpLFxuICAgICAqICAgICAgICBnZXQoJ3N0YXRlJyksXG4gICAgICogICAgICAgIGdldCgnYWRkcmVzcycpLFxuICAgICAqICAgICAgICBnZXQoJ3VzZXInKSxcbiAgICAgKiAgICAgICAgcGFyc2VKc29uXG4gICAgICogICAgICApO1xuICAgICAqXG4gICAgICogICAgICBnZXRTdGF0ZUNvZGUoTWF5YmUub2YoJ3tcInVzZXJcIjp7XCJhZGRyZXNzXCI6e1wic3RhdGVcIjpcIm55XCJ9fX0nKSk7XG4gICAgICogICAgICAvLz0+IEp1c3QoJ05ZJylcbiAgICAgKiAgICAgIGdldFN0YXRlQ29kZShNYXliZS5vZignW0ludmFsaWQgSlNPTl0nKSk7XG4gICAgICogICAgICAvLz0+IE5vdGhpbmcoKVxuICAgICAqL1xuICAgIHZhciBjb21wb3NlSyA9IGZ1bmN0aW9uIGNvbXBvc2VLKCkge1xuICAgICAgICByZXR1cm4gY29tcG9zZS5hcHBseSh0aGlzLCBwcmVwZW5kKGlkZW50aXR5LCBtYXAoY2hhaW4sIGFyZ3VtZW50cykpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybXMgcmlnaHQtdG8tbGVmdCBjb21wb3NpdGlvbiBvZiBvbmUgb3IgbW9yZSBQcm9taXNlLXJldHVybmluZ1xuICAgICAqIGZ1bmN0aW9ucy4gVGhlIHJpZ2h0bW9zdCBmdW5jdGlvbiBtYXkgaGF2ZSBhbnkgYXJpdHk7IHRoZSByZW1haW5pbmdcbiAgICAgKiBmdW5jdGlvbnMgbXVzdCBiZSB1bmFyeS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTAuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCh5IC0+IFByb21pc2UgeiksICh4IC0+IFByb21pc2UgeSksIC4uLiwgKGEgLT4gUHJvbWlzZSBiKSkgLT4gKGEgLT4gUHJvbWlzZSB6KVxuICAgICAqIEBwYXJhbSB7Li4uRnVuY3Rpb259IGZ1bmN0aW9uc1xuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufVxuICAgICAqIEBzZWUgUi5waXBlUFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIC8vICBmb2xsb3dlcnNGb3JVc2VyIDo6IFN0cmluZyAtPiBQcm9taXNlIFtVc2VyXVxuICAgICAqICAgICAgdmFyIGZvbGxvd2Vyc0ZvclVzZXIgPSBSLmNvbXBvc2VQKGRiLmdldEZvbGxvd2VycywgZGIuZ2V0VXNlckJ5SWQpO1xuICAgICAqL1xuICAgIHZhciBjb21wb3NlUCA9IGZ1bmN0aW9uIGNvbXBvc2VQKCkge1xuICAgICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb21wb3NlUCByZXF1aXJlcyBhdCBsZWFzdCBvbmUgYXJndW1lbnQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcGlwZVAuYXBwbHkodGhpcywgcmV2ZXJzZShhcmd1bWVudHMpKTtcbiAgICB9O1xuXG4gICAgLyoqXG4gICAgICogV3JhcHMgYSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBpbnNpZGUgYSBjdXJyaWVkIGZ1bmN0aW9uIHRoYXQgY2FuIGJlIGNhbGxlZCB3aXRoIHRoZSBzYW1lXG4gICAgICogYXJndW1lbnRzIGFuZCByZXR1cm5zIHRoZSBzYW1lIHR5cGUuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBGdW5jdGlvblxuICAgICAqIEBzaWcgKCogLT4geyp9KSAtPiAoKiAtPiB7Kn0pXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gRm4gVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIHRvIHdyYXAuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IEEgd3JhcHBlZCwgY3VycmllZCBjb25zdHJ1Y3RvciBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICAvLyBDb25zdHJ1Y3RvciBmdW5jdGlvblxuICAgICAqICAgICAgdmFyIFdpZGdldCA9IGNvbmZpZyA9PiB7XG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIFdpZGdldC5wcm90b3R5cGUgPSB7XG4gICAgICogICAgICAgIC8vIC4uLlxuICAgICAqICAgICAgfTtcbiAgICAgKiAgICAgIHZhciBhbGxDb25maWdzID0gW1xuICAgICAqICAgICAgICAvLyAuLi5cbiAgICAgKiAgICAgIF07XG4gICAgICogICAgICBSLm1hcChSLmNvbnN0cnVjdChXaWRnZXQpLCBhbGxDb25maWdzKTsgLy8gYSBsaXN0IG9mIFdpZGdldHNcbiAgICAgKi9cbiAgICB2YXIgY29uc3RydWN0ID0gX2N1cnJ5MShmdW5jdGlvbiBjb25zdHJ1Y3QoRm4pIHtcbiAgICAgICAgcmV0dXJuIGNvbnN0cnVjdE4oRm4ubGVuZ3RoLCBGbik7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGB0cnVlYCBpZiB0aGUgc3BlY2lmaWVkIHZhbHVlIGlzIGVxdWFsLCBpbiBgUi5lcXVhbHNgIHRlcm1zLFxuICAgICAqIHRvIGF0IGxlYXN0IG9uZSBlbGVtZW50IG9mIHRoZSBnaXZlbiBsaXN0OyBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIGEgLT4gW2FdIC0+IEJvb2xlYW5cbiAgICAgKiBAcGFyYW0ge09iamVjdH0gYSBUaGUgaXRlbSB0byBjb21wYXJlIGFnYWluc3QuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn0gYHRydWVgIGlmIHRoZSBpdGVtIGlzIGluIHRoZSBsaXN0LCBgZmFsc2VgIG90aGVyd2lzZS5cbiAgICAgKiBAc2VlIFIuYW55XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5jb250YWlucygzLCBbMSwgMiwgM10pOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIuY29udGFpbnMoNCwgWzEsIDIsIDNdKTsgLy89PiBmYWxzZVxuICAgICAqICAgICAgUi5jb250YWlucyhbNDJdLCBbWzQyXV0pOyAvLz0+IHRydWVcbiAgICAgKi9cbiAgICB2YXIgY29udGFpbnMgPSBfY3VycnkyKF9jb250YWlucyk7XG5cbiAgICAvKipcbiAgICAgKiBGaW5kcyB0aGUgc2V0IChpLmUuIG5vIGR1cGxpY2F0ZXMpIG9mIGFsbCBlbGVtZW50cyBpbiB0aGUgZmlyc3QgbGlzdCBub3QgY29udGFpbmVkIGluIHRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBbYV0gLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGVsZW1lbnRzIGluIGBsaXN0MWAgdGhhdCBhcmUgbm90IGluIGBsaXN0MmAuXG4gICAgICogQHNlZSBSLmRpZmZlcmVuY2VXaXRoXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5kaWZmZXJlbmNlKFsxLDIsMyw0XSwgWzcsNiw1LDQsM10pOyAvLz0+IFsxLDJdXG4gICAgICogICAgICBSLmRpZmZlcmVuY2UoWzcsNiw1LDQsM10sIFsxLDIsMyw0XSk7IC8vPT4gWzcsNiw1XVxuICAgICAqL1xuICAgIHZhciBkaWZmZXJlbmNlID0gX2N1cnJ5MihmdW5jdGlvbiBkaWZmZXJlbmNlKGZpcnN0LCBzZWNvbmQpIHtcbiAgICAgICAgdmFyIG91dCA9IFtdO1xuICAgICAgICB2YXIgaWR4ID0gMDtcbiAgICAgICAgdmFyIGZpcnN0TGVuID0gZmlyc3QubGVuZ3RoO1xuICAgICAgICB3aGlsZSAoaWR4IDwgZmlyc3RMZW4pIHtcbiAgICAgICAgICAgIGlmICghX2NvbnRhaW5zKGZpcnN0W2lkeF0sIHNlY29uZCkgJiYgIV9jb250YWlucyhmaXJzdFtpZHhdLCBvdXQpKSB7XG4gICAgICAgICAgICAgICAgb3V0W291dC5sZW5ndGhdID0gZmlyc3RbaWR4XTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3Qgd2l0aG91dCBhbnkgY29uc2VjdXRpdmVseSByZXBlYXRpbmcgZWxlbWVudHMuXG4gICAgICogYFIuZXF1YWxzYCBpcyB1c2VkIHRvIGRldGVybWluZSBlcXVhbGl0eS5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGBkcm9wUmVwZWF0c2AgbWV0aG9kIG9mIHRoZSBmaXJzdCBhcmd1bWVudCwgaWYgcHJlc2VudC5cbiAgICAgKlxuICAgICAqIEFjdHMgYXMgYSB0cmFuc2R1Y2VyIGlmIGEgdHJhbnNmb3JtZXIgaXMgZ2l2ZW4gaW4gbGlzdCBwb3NpdGlvbi5cbiAgICAgKiBAc2VlIFIudHJhbnNkdWNlXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE0LjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QgVGhlIGFycmF5IHRvIGNvbnNpZGVyLlxuICAgICAqIEByZXR1cm4ge0FycmF5fSBgbGlzdGAgd2l0aG91dCByZXBlYXRpbmcgZWxlbWVudHMuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICBSLmRyb3BSZXBlYXRzKFsxLCAxLCAxLCAyLCAzLCA0LCA0LCAyLCAyXSk7IC8vPT4gWzEsIDIsIDMsIDQsIDJdXG4gICAgICovXG4gICAgdmFyIGRyb3BSZXBlYXRzID0gX2N1cnJ5MShfZGlzcGF0Y2hhYmxlKCdkcm9wUmVwZWF0cycsIF94ZHJvcFJlcGVhdHNXaXRoKGVxdWFscyksIGRyb3BSZXBlYXRzV2l0aChlcXVhbHMpKSk7XG5cbiAgICAvKipcbiAgICAgKiBDb21iaW5lcyB0d28gbGlzdHMgaW50byBhIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBjb21wb3NlZCBvZiB0aG9zZSBlbGVtZW50cyBjb21tb24gdG8gYm90aCBsaXN0cy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IFJlbGF0aW9uXG4gICAgICogQHNpZyBbYV0gLT4gW2FdIC0+IFthXVxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QxIFRoZSBmaXJzdCBsaXN0LlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IGxpc3QyIFRoZSBzZWNvbmQgbGlzdC5cbiAgICAgKiBAc2VlIFIuaW50ZXJzZWN0aW9uV2l0aFxuICAgICAqIEByZXR1cm4ge0FycmF5fSBUaGUgbGlzdCBvZiBlbGVtZW50cyBmb3VuZCBpbiBib3RoIGBsaXN0MWAgYW5kIGBsaXN0MmAuXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5pbnRlcnNlY3Rpb24oWzEsMiwzLDRdLCBbNyw2LDUsNCwzXSk7IC8vPT4gWzQsIDNdXG4gICAgICovXG4gICAgdmFyIGludGVyc2VjdGlvbiA9IF9jdXJyeTIoZnVuY3Rpb24gaW50ZXJzZWN0aW9uKGxpc3QxLCBsaXN0Mikge1xuICAgICAgICByZXR1cm4gdW5pcShfZmlsdGVyKGZsaXAoX2NvbnRhaW5zKShsaXN0MSksIGxpc3QyKSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBcImxpZnRzXCIgYSBmdW5jdGlvbiBvZiBhcml0eSA+IDEgc28gdGhhdCBpdCBtYXkgXCJtYXAgb3ZlclwiIGFuIEFycmF5IG9yXG4gICAgICogb3RoZXIgRnVuY3Rvci5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuNy4wXG4gICAgICogQHNlZSBSLmxpZnROXG4gICAgICogQGNhdGVnb3J5IEZ1bmN0aW9uXG4gICAgICogQHNpZyAoKi4uLiAtPiAqKSAtPiAoWypdLi4uIC0+IFsqXSlcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgZnVuY3Rpb24gdG8gbGlmdCBpbnRvIGhpZ2hlciBjb250ZXh0XG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IFRoZSBmdW5jdGlvbiBgZm5gIGFwcGxpY2FibGUgdG8gbWFwcGFibGUgb2JqZWN0cy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgbWFkZDMgPSBSLmxpZnQoUi5jdXJyeSgoYSwgYiwgYykgPT4gYSArIGIgKyBjKSk7XG4gICAgICpcbiAgICAgKiAgICAgIG1hZGQzKFsxLDIsM10sIFsxLDIsM10sIFsxXSk7IC8vPT4gWzMsIDQsIDUsIDQsIDUsIDYsIDUsIDYsIDddXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBtYWRkNSA9IFIubGlmdChSLmN1cnJ5KChhLCBiLCBjLCBkLCBlKSA9PiBhICsgYiArIGMgKyBkICsgZSkpO1xuICAgICAqXG4gICAgICogICAgICBtYWRkNShbMSwyXSwgWzNdLCBbNCwgNV0sIFs2XSwgWzcsIDhdKTsgLy89PiBbMjEsIDIyLCAyMiwgMjMsIDIyLCAyMywgMjMsIDI0XVxuICAgICAqL1xuICAgIHZhciBsaWZ0ID0gX2N1cnJ5MShmdW5jdGlvbiBsaWZ0KGZuKSB7XG4gICAgICAgIHJldHVybiBsaWZ0Tihmbi5sZW5ndGgsIGZuKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgYSBwYXJ0aWFsIGNvcHkgb2YgYW4gb2JqZWN0IG9taXR0aW5nIHRoZSBrZXlzIHNwZWNpZmllZC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMS4wXG4gICAgICogQGNhdGVnb3J5IE9iamVjdFxuICAgICAqIEBzaWcgW1N0cmluZ10gLT4ge1N0cmluZzogKn0gLT4ge1N0cmluZzogKn1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBuYW1lcyBhbiBhcnJheSBvZiBTdHJpbmcgcHJvcGVydHkgbmFtZXMgdG8gb21pdCBmcm9tIHRoZSBuZXcgb2JqZWN0XG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9iaiBUaGUgb2JqZWN0IHRvIGNvcHkgZnJvbVxuICAgICAqIEByZXR1cm4ge09iamVjdH0gQSBuZXcgb2JqZWN0IHdpdGggcHJvcGVydGllcyBmcm9tIGBuYW1lc2Agbm90IG9uIGl0LlxuICAgICAqIEBzZWUgUi5waWNrXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi5vbWl0KFsnYScsICdkJ10sIHthOiAxLCBiOiAyLCBjOiAzLCBkOiA0fSk7IC8vPT4ge2I6IDIsIGM6IDN9XG4gICAgICovXG4gICAgdmFyIG9taXQgPSBfY3VycnkyKGZ1bmN0aW9uIG9taXQobmFtZXMsIG9iaikge1xuICAgICAgICB2YXIgcmVzdWx0ID0ge307XG4gICAgICAgIGZvciAodmFyIHByb3AgaW4gb2JqKSB7XG4gICAgICAgICAgICBpZiAoIV9jb250YWlucyhwcm9wLCBuYW1lcykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHRbcHJvcF0gPSBvYmpbcHJvcF07XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFJldHVybnMgdGhlIGxlZnQtdG8tcmlnaHQgS2xlaXNsaSBjb21wb3NpdGlvbiBvZiB0aGUgcHJvdmlkZWQgZnVuY3Rpb25zLFxuICAgICAqIGVhY2ggb2Ygd2hpY2ggbXVzdCByZXR1cm4gYSB2YWx1ZSBvZiBhIHR5cGUgc3VwcG9ydGVkIGJ5IFtgY2hhaW5gXSgjY2hhaW4pLlxuICAgICAqXG4gICAgICogYFIucGlwZUsoZiwgZywgaClgIGlzIGVxdWl2YWxlbnQgdG8gYFIucGlwZShSLmNoYWluKGYpLCBSLmNoYWluKGcpLCBSLmNoYWluKGgpKWAuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjE2LjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2VlIFIuY29tcG9zZUtcbiAgICAgKiBAc2lnIENoYWluIG0gPT4gKChhIC0+IG0gYiksIChiIC0+IG0gYyksIC4uLiwgKHkgLT4gbSB6KSkgLT4gKG0gYSAtPiBtIHopXG4gICAgICogQHBhcmFtIHsuLi5GdW5jdGlvbn1cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICAvLyAgcGFyc2VKc29uIDo6IFN0cmluZyAtPiBNYXliZSAqXG4gICAgICogICAgICAvLyAgZ2V0IDo6IFN0cmluZyAtPiBPYmplY3QgLT4gTWF5YmUgKlxuICAgICAqXG4gICAgICogICAgICAvLyAgZ2V0U3RhdGVDb2RlIDo6IE1heWJlIFN0cmluZyAtPiBNYXliZSBTdHJpbmdcbiAgICAgKiAgICAgIHZhciBnZXRTdGF0ZUNvZGUgPSBSLnBpcGVLKFxuICAgICAqICAgICAgICBwYXJzZUpzb24sXG4gICAgICogICAgICAgIGdldCgndXNlcicpLFxuICAgICAqICAgICAgICBnZXQoJ2FkZHJlc3MnKSxcbiAgICAgKiAgICAgICAgZ2V0KCdzdGF0ZScpLFxuICAgICAqICAgICAgICBSLmNvbXBvc2UoTWF5YmUub2YsIFIudG9VcHBlcilcbiAgICAgKiAgICAgICk7XG4gICAgICpcbiAgICAgKiAgICAgIGdldFN0YXRlQ29kZShNYXliZS5vZigne1widXNlclwiOntcImFkZHJlc3NcIjp7XCJzdGF0ZVwiOlwibnlcIn19fScpKTtcbiAgICAgKiAgICAgIC8vPT4gSnVzdCgnTlknKVxuICAgICAqICAgICAgZ2V0U3RhdGVDb2RlKE1heWJlLm9mKCdbSW52YWxpZCBKU09OXScpKTtcbiAgICAgKiAgICAgIC8vPT4gTm90aGluZygpXG4gICAgICovXG4gICAgdmFyIHBpcGVLID0gZnVuY3Rpb24gcGlwZUsoKSB7XG4gICAgICAgIHJldHVybiBjb21wb3NlSy5hcHBseSh0aGlzLCByZXZlcnNlKGFyZ3VtZW50cykpO1xuICAgIH07XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSBzdHJpbmcgcmVwcmVzZW50YXRpb24gb2YgdGhlIGdpdmVuIHZhbHVlLiBgZXZhbGAnaW5nIHRoZSBvdXRwdXRcbiAgICAgKiBzaG91bGQgcmVzdWx0IGluIGEgdmFsdWUgZXF1aXZhbGVudCB0byB0aGUgaW5wdXQgdmFsdWUuIE1hbnkgb2YgdGhlIGJ1aWx0LWluXG4gICAgICogYHRvU3RyaW5nYCBtZXRob2RzIGRvIG5vdCBzYXRpc2Z5IHRoaXMgcmVxdWlyZW1lbnQuXG4gICAgICpcbiAgICAgKiBJZiB0aGUgZ2l2ZW4gdmFsdWUgaXMgYW4gYFtvYmplY3QgT2JqZWN0XWAgd2l0aCBhIGB0b1N0cmluZ2AgbWV0aG9kIG90aGVyXG4gICAgICogdGhhbiBgT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZ2AsIHRoaXMgbWV0aG9kIGlzIGludm9rZWQgd2l0aCBubyBhcmd1bWVudHNcbiAgICAgKiB0byBwcm9kdWNlIHRoZSByZXR1cm4gdmFsdWUuIFRoaXMgbWVhbnMgdXNlci1kZWZpbmVkIGNvbnN0cnVjdG9yIGZ1bmN0aW9uc1xuICAgICAqIGNhbiBwcm92aWRlIGEgc3VpdGFibGUgYHRvU3RyaW5nYCBtZXRob2QuIEZvciBleGFtcGxlOlxuICAgICAqXG4gICAgICogICAgIGZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgICAgKiAgICAgICB0aGlzLnggPSB4O1xuICAgICAqICAgICAgIHRoaXMueSA9IHk7XG4gICAgICogICAgIH1cbiAgICAgKlxuICAgICAqICAgICBQb2ludC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgICByZXR1cm4gJ25ldyBQb2ludCgnICsgdGhpcy54ICsgJywgJyArIHRoaXMueSArICcpJztcbiAgICAgKiAgICAgfTtcbiAgICAgKlxuICAgICAqICAgICBSLnRvU3RyaW5nKG5ldyBQb2ludCgxLCAyKSk7IC8vPT4gJ25ldyBQb2ludCgxLCAyKSdcbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTQuMFxuICAgICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICAgKiBAc2lnICogLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHsqfSB2YWxcbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9XG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgUi50b1N0cmluZyg0Mik7IC8vPT4gJzQyJ1xuICAgICAqICAgICAgUi50b1N0cmluZygnYWJjJyk7IC8vPT4gJ1wiYWJjXCInXG4gICAgICogICAgICBSLnRvU3RyaW5nKFsxLCAyLCAzXSk7IC8vPT4gJ1sxLCAyLCAzXSdcbiAgICAgKiAgICAgIFIudG9TdHJpbmcoe2ZvbzogMSwgYmFyOiAyLCBiYXo6IDN9KTsgLy89PiAne1wiYmFyXCI6IDIsIFwiYmF6XCI6IDMsIFwiZm9vXCI6IDF9J1xuICAgICAqICAgICAgUi50b1N0cmluZyhuZXcgRGF0ZSgnMjAwMS0wMi0wM1QwNDowNTowNlonKSk7IC8vPT4gJ25ldyBEYXRlKFwiMjAwMS0wMi0wM1QwNDowNTowNi4wMDBaXCIpJ1xuICAgICAqL1xuICAgIHZhciB0b1N0cmluZyA9IF9jdXJyeTEoZnVuY3Rpb24gdG9TdHJpbmcodmFsKSB7XG4gICAgICAgIHJldHVybiBfdG9TdHJpbmcodmFsLCBbXSk7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBDb21iaW5lcyB0d28gbGlzdHMgaW50byBhIHNldCAoaS5lLiBubyBkdXBsaWNhdGVzKSBjb21wb3NlZCBvZiB0aGVcbiAgICAgKiBlbGVtZW50cyBvZiBlYWNoIGxpc3QuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjEuMFxuICAgICAqIEBjYXRlZ29yeSBSZWxhdGlvblxuICAgICAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBhcyBUaGUgZmlyc3QgbGlzdC5cbiAgICAgKiBAcGFyYW0ge0FycmF5fSBicyBUaGUgc2Vjb25kIGxpc3QuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBmaXJzdCBhbmQgc2Vjb25kIGxpc3RzIGNvbmNhdGVuYXRlZCwgd2l0aFxuICAgICAqICAgICAgICAgZHVwbGljYXRlcyByZW1vdmVkLlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudW5pb24oWzEsIDIsIDNdLCBbMiwgMywgNF0pOyAvLz0+IFsxLCAyLCAzLCA0XVxuICAgICAqL1xuICAgIHZhciB1bmlvbiA9IF9jdXJyeTIoY29tcG9zZSh1bmlxLCBfY29uY2F0KSk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIGEgbmV3IGxpc3QgY29udGFpbmluZyBvbmx5IG9uZSBjb3B5IG9mIGVhY2ggZWxlbWVudCBpbiB0aGVcbiAgICAgKiBvcmlnaW5hbCBsaXN0LCBiYXNlZCB1cG9uIHRoZSB2YWx1ZSByZXR1cm5lZCBieSBhcHBseWluZyB0aGUgc3VwcGxpZWRcbiAgICAgKiBmdW5jdGlvbiB0byBlYWNoIGxpc3QgZWxlbWVudC4gUHJlZmVycyB0aGUgZmlyc3QgaXRlbSBpZiB0aGUgc3VwcGxpZWRcbiAgICAgKiBmdW5jdGlvbiBwcm9kdWNlcyB0aGUgc2FtZSB2YWx1ZSBvbiB0d28gaXRlbXMuIGBSLmVxdWFsc2AgaXMgdXNlZCBmb3JcbiAgICAgKiBjb21wYXJpc29uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xNi4wXG4gICAgICogQGNhdGVnb3J5IExpc3RcbiAgICAgKiBAc2lnIChhIC0+IGIpIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBBIGZ1bmN0aW9uIHVzZWQgdG8gcHJvZHVjZSBhIHZhbHVlIHRvIHVzZSBkdXJpbmcgY29tcGFyaXNvbnMuXG4gICAgICogQHBhcmFtIHtBcnJheX0gbGlzdCBUaGUgYXJyYXkgdG8gY29uc2lkZXIuXG4gICAgICogQHJldHVybiB7QXJyYXl9IFRoZSBsaXN0IG9mIHVuaXF1ZSBpdGVtcy5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnVuaXFCeShNYXRoLmFicywgWy0xLCAtNSwgMiwgMTAsIDEsIDJdKTsgLy89PiBbLTEsIC01LCAyLCAxMF1cbiAgICAgKi9cbiAgICB2YXIgdW5pcUJ5ID0gX2N1cnJ5MihmdW5jdGlvbiB1bmlxQnkoZm4sIGxpc3QpIHtcbiAgICAgICAgdmFyIGlkeCA9IDAsIGFwcGxpZWQgPSBbXSwgcmVzdWx0ID0gW10sIGFwcGxpZWRJdGVtLCBpdGVtO1xuICAgICAgICB3aGlsZSAoaWR4IDwgbGlzdC5sZW5ndGgpIHtcbiAgICAgICAgICAgIGl0ZW0gPSBsaXN0W2lkeF07XG4gICAgICAgICAgICBhcHBsaWVkSXRlbSA9IGZuKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKCFfY29udGFpbnMoYXBwbGllZEl0ZW0sIGFwcGxpZWQpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgYXBwbGllZC5wdXNoKGFwcGxpZWRJdGVtKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCArPSAxO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfSk7XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHdyYXBwaW5nIGNhbGxzIHRvIHRoZSB0d28gZnVuY3Rpb25zIGluIGFuIGAmJmAgb3BlcmF0aW9uLCByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3RcbiAgICAgKiBmdW5jdGlvbiBpZiBpdCBpcyBmYWxzZS15IGFuZCB0aGUgcmVzdWx0IG9mIHRoZSBzZWNvbmQgZnVuY3Rpb24gb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogYFIuYm90aGAgd2lsbCB3b3JrIG9uIGFsbCBvdGhlciBhcHBsaWNhdGl2ZXMgYXMgd2VsbC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTIuMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmIGEgcHJlZGljYXRlXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZyBhbm90aGVyIHByZWRpY2F0ZVxuICAgICAqIEByZXR1cm4ge0Z1bmN0aW9ufSBhIGZ1bmN0aW9uIHRoYXQgYXBwbGllcyBpdHMgYXJndW1lbnRzIHRvIGBmYCBhbmQgYGdgIGFuZCBgJiZgcyB0aGVpciBvdXRwdXRzIHRvZ2V0aGVyLlxuICAgICAqIEBzZWUgUi5hbmRcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgZ3QxMCA9IHggPT4geCA+IDEwO1xuICAgICAqICAgICAgdmFyIGV2ZW4gPSB4ID0+IHggJSAyID09PSAwO1xuICAgICAqICAgICAgdmFyIGYgPSBSLmJvdGgoZ3QxMCwgZXZlbik7XG4gICAgICogICAgICBmKDEwMCk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgZigxMDEpOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGJvdGggPSBsaWZ0KGFuZCk7XG5cbiAgICAvKipcbiAgICAgKiBUYWtlcyBhIGZ1bmN0aW9uIGBmYCBhbmQgcmV0dXJucyBhIGZ1bmN0aW9uIGBnYCBzdWNoIHRoYXQ6XG4gICAgICpcbiAgICAgKiAgIC0gYXBwbHlpbmcgYGdgIHRvIHplcm8gb3IgbW9yZSBhcmd1bWVudHMgd2lsbCBnaXZlIF9fdHJ1ZV9fIGlmIGFwcGx5aW5nXG4gICAgICogICAgIHRoZSBzYW1lIGFyZ3VtZW50cyB0byBgZmAgZ2l2ZXMgYSBsb2dpY2FsIF9fZmFsc2VfXyB2YWx1ZTsgYW5kXG4gICAgICpcbiAgICAgKiAgIC0gYXBwbHlpbmcgYGdgIHRvIHplcm8gb3IgbW9yZSBhcmd1bWVudHMgd2lsbCBnaXZlIF9fZmFsc2VfXyBpZiBhcHBseWluZ1xuICAgICAqICAgICB0aGUgc2FtZSBhcmd1bWVudHMgdG8gYGZgIGdpdmVzIGEgbG9naWNhbCBfX3RydWVfXyB2YWx1ZS5cbiAgICAgKlxuICAgICAqIGBSLmNvbXBsZW1lbnRgIHdpbGwgd29yayBvbiBhbGwgb3RoZXIgZnVuY3RvcnMgYXMgd2VsbC5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuMTIuMFxuICAgICAqIEBjYXRlZ29yeSBMb2dpY1xuICAgICAqIEBzaWcgKCouLi4gLT4gKikgLT4gKCouLi4gLT4gQm9vbGVhbilcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBmXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259XG4gICAgICogQHNlZSBSLm5vdFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBpc0V2ZW4gPSBuID0+IG4gJSAyID09PSAwO1xuICAgICAqICAgICAgdmFyIGlzT2RkID0gUi5jb21wbGVtZW50KGlzRXZlbik7XG4gICAgICogICAgICBpc09kZCgyMSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgaXNPZGQoNDIpOyAvLz0+IGZhbHNlXG4gICAgICovXG4gICAgdmFyIGNvbXBsZW1lbnQgPSBsaWZ0KG5vdCk7XG5cbiAgICAvKipcbiAgICAgKiBBIGZ1bmN0aW9uIHdyYXBwaW5nIGNhbGxzIHRvIHRoZSB0d28gZnVuY3Rpb25zIGluIGFuIGB8fGAgb3BlcmF0aW9uLCByZXR1cm5pbmcgdGhlIHJlc3VsdCBvZiB0aGUgZmlyc3RcbiAgICAgKiBmdW5jdGlvbiBpZiBpdCBpcyB0cnV0aC15IGFuZCB0aGUgcmVzdWx0IG9mIHRoZSBzZWNvbmQgZnVuY3Rpb24gb3RoZXJ3aXNlLlxuICAgICAqXG4gICAgICogYFIuZWl0aGVyYCB3aWxsIHdvcmsgb24gYWxsIG90aGVyIGFwcGxpY2F0aXZlcyBhcyB3ZWxsLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xMi4wXG4gICAgICogQGNhdGVnb3J5IExvZ2ljXG4gICAgICogQHNpZyAoKi4uLiAtPiBCb29sZWFuKSAtPiAoKi4uLiAtPiBCb29sZWFuKSAtPiAoKi4uLiAtPiBCb29sZWFuKVxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IGYgYSBwcmVkaWNhdGVcbiAgICAgKiBAcGFyYW0ge0Z1bmN0aW9ufSBnIGFub3RoZXIgcHJlZGljYXRlXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IGEgZnVuY3Rpb24gdGhhdCBhcHBsaWVzIGl0cyBhcmd1bWVudHMgdG8gYGZgIGFuZCBgZ2AgYW5kIGB8fGBzIHRoZWlyIG91dHB1dHMgdG9nZXRoZXIuXG4gICAgICogQHNlZSBSLm9yXG4gICAgICogQGV4YW1wbGVcbiAgICAgKlxuICAgICAqICAgICAgdmFyIGd0MTAgPSB4ID0+IHggPiAxMDtcbiAgICAgKiAgICAgIHZhciBldmVuID0geCA9PiB4ICUgMiA9PT0gMDtcbiAgICAgKiAgICAgIHZhciBmID0gUi5laXRoZXIoZ3QxMCwgZXZlbik7XG4gICAgICogICAgICBmKDEwMSk7IC8vPT4gdHJ1ZVxuICAgICAqICAgICAgZig4KTsgLy89PiB0cnVlXG4gICAgICovXG4gICAgdmFyIGVpdGhlciA9IGxpZnQob3IpO1xuXG4gICAgLyoqXG4gICAgICogVHVybnMgYSBuYW1lZCBtZXRob2Qgd2l0aCBhIHNwZWNpZmllZCBhcml0eSBpbnRvIGEgZnVuY3Rpb25cbiAgICAgKiB0aGF0IGNhbiBiZSBjYWxsZWQgZGlyZWN0bHkgc3VwcGxpZWQgd2l0aCBhcmd1bWVudHMgYW5kIGEgdGFyZ2V0IG9iamVjdC5cbiAgICAgKlxuICAgICAqIFRoZSByZXR1cm5lZCBmdW5jdGlvbiBpcyBjdXJyaWVkIGFuZCBhY2NlcHRzIGBhcml0eSArIDFgIHBhcmFtZXRlcnMgd2hlcmVcbiAgICAgKiB0aGUgZmluYWwgcGFyYW1ldGVyIGlzIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnIE51bWJlciAtPiBTdHJpbmcgLT4gKGEgLT4gYiAtPiAuLi4gLT4gbiAtPiBPYmplY3QgLT4gKilcbiAgICAgKiBAcGFyYW0ge051bWJlcn0gYXJpdHkgTnVtYmVyIG9mIGFyZ3VtZW50cyB0aGUgcmV0dXJuZWQgZnVuY3Rpb24gc2hvdWxkIHRha2VcbiAgICAgKiAgICAgICAgYmVmb3JlIHRoZSB0YXJnZXQgb2JqZWN0LlxuICAgICAqIEBwYXJhbSB7RnVuY3Rpb259IG1ldGhvZCBOYW1lIG9mIHRoZSBtZXRob2QgdG8gY2FsbC5cbiAgICAgKiBAcmV0dXJuIHtGdW5jdGlvbn0gQSBuZXcgY3VycmllZCBmdW5jdGlvbi5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgc2xpY2VGcm9tID0gUi5pbnZva2VyKDEsICdzbGljZScpO1xuICAgICAqICAgICAgc2xpY2VGcm9tKDYsICdhYmNkZWZnaGlqa2xtJyk7IC8vPT4gJ2doaWprbG0nXG4gICAgICogICAgICB2YXIgc2xpY2VGcm9tNiA9IFIuaW52b2tlcigyLCAnc2xpY2UnKSg2KTtcbiAgICAgKiAgICAgIHNsaWNlRnJvbTYoOCwgJ2FiY2RlZmdoaWprbG0nKTsgLy89PiAnZ2gnXG4gICAgICovXG4gICAgdmFyIGludm9rZXIgPSBfY3VycnkyKGZ1bmN0aW9uIGludm9rZXIoYXJpdHksIG1ldGhvZCkge1xuICAgICAgICByZXR1cm4gY3VycnlOKGFyaXR5ICsgMSwgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IGFyZ3VtZW50c1thcml0eV07XG4gICAgICAgICAgICBpZiAodGFyZ2V0ICE9IG51bGwgJiYgaXMoRnVuY3Rpb24sIHRhcmdldFttZXRob2RdKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXRbbWV0aG9kXS5hcHBseSh0YXJnZXQsIF9zbGljZShhcmd1bWVudHMsIDAsIGFyaXR5KSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKHRvU3RyaW5nKHRhcmdldCkgKyAnIGRvZXMgbm90IGhhdmUgYSBtZXRob2QgbmFtZWQgXCInICsgbWV0aG9kICsgJ1wiJyk7XG4gICAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgLyoqXG4gICAgICogUmV0dXJucyBhIHN0cmluZyBtYWRlIGJ5IGluc2VydGluZyB0aGUgYHNlcGFyYXRvcmAgYmV0d2VlbiBlYWNoXG4gICAgICogZWxlbWVudCBhbmQgY29uY2F0ZW5hdGluZyBhbGwgdGhlIGVsZW1lbnRzIGludG8gYSBzaW5nbGUgc3RyaW5nLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgU3RyaW5nIC0+IFthXSAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge051bWJlcnxTdHJpbmd9IHNlcGFyYXRvciBUaGUgc3RyaW5nIHVzZWQgdG8gc2VwYXJhdGUgdGhlIGVsZW1lbnRzLlxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHhzIFRoZSBlbGVtZW50cyB0byBqb2luIGludG8gYSBzdHJpbmcuXG4gICAgICogQHJldHVybiB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyBtYWRlIGJ5IGNvbmNhdGVuYXRpbmcgYHhzYCB3aXRoIGBzZXBhcmF0b3JgLlxuICAgICAqIEBzZWUgUi5zcGxpdFxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIHZhciBzcGFjZXIgPSBSLmpvaW4oJyAnKTtcbiAgICAgKiAgICAgIHNwYWNlcihbJ2EnLCAyLCAzLjRdKTsgICAvLz0+ICdhIDIgMy40J1xuICAgICAqICAgICAgUi5qb2luKCd8JywgWzEsIDIsIDNdKTsgICAgLy89PiAnMXwyfDMnXG4gICAgICovXG4gICAgdmFyIGpvaW4gPSBpbnZva2VyKDEsICdqb2luJyk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGEgbmV3IGZ1bmN0aW9uIHRoYXQsIHdoZW4gaW52b2tlZCwgY2FjaGVzIHRoZSByZXN1bHQgb2YgY2FsbGluZyBgZm5gIGZvciBhIGdpdmVuXG4gICAgICogYXJndW1lbnQgc2V0IGFuZCByZXR1cm5zIHRoZSByZXN1bHQuIFN1YnNlcXVlbnQgY2FsbHMgdG8gdGhlIG1lbW9pemVkIGBmbmAgd2l0aCB0aGUgc2FtZVxuICAgICAqIGFyZ3VtZW50IHNldCB3aWxsIG5vdCByZXN1bHQgaW4gYW4gYWRkaXRpb25hbCBjYWxsIHRvIGBmbmA7IGluc3RlYWQsIHRoZSBjYWNoZWQgcmVzdWx0XG4gICAgICogZm9yIHRoYXQgc2V0IG9mIGFyZ3VtZW50cyB3aWxsIGJlIHJldHVybmVkLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgRnVuY3Rpb25cbiAgICAgKiBAc2lnICgqLi4uIC0+IGEpIC0+ICgqLi4uIC0+IGEpXG4gICAgICogQHBhcmFtIHtGdW5jdGlvbn0gZm4gVGhlIGZ1bmN0aW9uIHRvIG1lbW9pemUuXG4gICAgICogQHJldHVybiB7RnVuY3Rpb259IE1lbW9pemVkIHZlcnNpb24gb2YgYGZuYC5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgY291bnQgPSAwO1xuICAgICAqICAgICAgdmFyIGZhY3RvcmlhbCA9IFIubWVtb2l6ZShuID0+IHtcbiAgICAgKiAgICAgICAgY291bnQgKz0gMTtcbiAgICAgKiAgICAgICAgcmV0dXJuIFIucHJvZHVjdChSLnJhbmdlKDEsIG4gKyAxKSk7XG4gICAgICogICAgICB9KTtcbiAgICAgKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAgICAgKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAgICAgKiAgICAgIGZhY3RvcmlhbCg1KTsgLy89PiAxMjBcbiAgICAgKiAgICAgIGNvdW50OyAvLz0+IDFcbiAgICAgKi9cbiAgICB2YXIgbWVtb2l6ZSA9IF9jdXJyeTEoZnVuY3Rpb24gbWVtb2l6ZShmbikge1xuICAgICAgICB2YXIgY2FjaGUgPSB7fTtcbiAgICAgICAgcmV0dXJuIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBrZXkgPSB0b1N0cmluZyhhcmd1bWVudHMpO1xuICAgICAgICAgICAgaWYgKCFfaGFzKGtleSwgY2FjaGUpKSB7XG4gICAgICAgICAgICAgICAgY2FjaGVba2V5XSA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVba2V5XTtcbiAgICAgICAgfTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFNwbGl0cyBhIHN0cmluZyBpbnRvIGFuIGFycmF5IG9mIHN0cmluZ3MgYmFzZWQgb24gdGhlIGdpdmVuXG4gICAgICogc2VwYXJhdG9yLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgU3RyaW5nXG4gICAgICogQHNpZyAoU3RyaW5nIHwgUmVnRXhwKSAtPiBTdHJpbmcgLT4gW1N0cmluZ11cbiAgICAgKiBAcGFyYW0ge1N0cmluZ3xSZWdFeHB9IHNlcCBUaGUgcGF0dGVybi5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gc2VwYXJhdGUgaW50byBhbiBhcnJheS5cbiAgICAgKiBAcmV0dXJuIHtBcnJheX0gVGhlIGFycmF5IG9mIHN0cmluZ3MgZnJvbSBgc3RyYCBzZXBhcmF0ZWQgYnkgYHN0cmAuXG4gICAgICogQHNlZSBSLmpvaW5cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICB2YXIgcGF0aENvbXBvbmVudHMgPSBSLnNwbGl0KCcvJyk7XG4gICAgICogICAgICBSLnRhaWwocGF0aENvbXBvbmVudHMoJy91c3IvbG9jYWwvYmluL25vZGUnKSk7IC8vPT4gWyd1c3InLCAnbG9jYWwnLCAnYmluJywgJ25vZGUnXVxuICAgICAqXG4gICAgICogICAgICBSLnNwbGl0KCcuJywgJ2EuYi5jLnh5ei5kJyk7IC8vPT4gWydhJywgJ2InLCAnYycsICd4eXonLCAnZCddXG4gICAgICovXG4gICAgdmFyIHNwbGl0ID0gaW52b2tlcigxLCAnc3BsaXQnKTtcblxuICAgIC8qKlxuICAgICAqIERldGVybWluZXMgd2hldGhlciBhIGdpdmVuIHN0cmluZyBtYXRjaGVzIGEgZ2l2ZW4gcmVndWxhciBleHByZXNzaW9uLlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xMi4wXG4gICAgICogQHNlZSBSLm1hdGNoXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgUmVnRXhwIC0+IFN0cmluZyAtPiBCb29sZWFuXG4gICAgICogQHBhcmFtIHtSZWdFeHB9IHBhdHRlcm5cbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyXG4gICAgICogQHJldHVybiB7Qm9vbGVhbn1cbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnRlc3QoL154LywgJ3h5eicpOyAvLz0+IHRydWVcbiAgICAgKiAgICAgIFIudGVzdCgvXnkvLCAneHl6Jyk7IC8vPT4gZmFsc2VcbiAgICAgKi9cbiAgICB2YXIgdGVzdCA9IF9jdXJyeTIoZnVuY3Rpb24gdGVzdChwYXR0ZXJuLCBzdHIpIHtcbiAgICAgICAgaWYgKCFfaXNSZWdFeHAocGF0dGVybikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1xcdTIwMTh0ZXN0XFx1MjAxOSByZXF1aXJlcyBhIHZhbHVlIG9mIHR5cGUgUmVnRXhwIGFzIGl0cyBmaXJzdCBhcmd1bWVudDsgcmVjZWl2ZWQgJyArIHRvU3RyaW5nKHBhdHRlcm4pKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gX2Nsb25lUmVnRXhwKHBhdHRlcm4pLnRlc3Qoc3RyKTtcbiAgICB9KTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBsb3dlciBjYXNlIHZlcnNpb24gb2YgYSBzdHJpbmcuXG4gICAgICpcbiAgICAgKiBAZnVuY1xuICAgICAqIEBtZW1iZXJPZiBSXG4gICAgICogQHNpbmNlIHYwLjkuMFxuICAgICAqIEBjYXRlZ29yeSBTdHJpbmdcbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmdcbiAgICAgKiBAcGFyYW0ge1N0cmluZ30gc3RyIFRoZSBzdHJpbmcgdG8gbG93ZXIgY2FzZS5cbiAgICAgKiBAcmV0dXJuIHtTdHJpbmd9IFRoZSBsb3dlciBjYXNlIHZlcnNpb24gb2YgYHN0cmAuXG4gICAgICogQHNlZSBSLnRvVXBwZXJcbiAgICAgKiBAZXhhbXBsZVxuICAgICAqXG4gICAgICogICAgICBSLnRvTG93ZXIoJ1hZWicpOyAvLz0+ICd4eXonXG4gICAgICovXG4gICAgdmFyIHRvTG93ZXIgPSBpbnZva2VyKDAsICd0b0xvd2VyQ2FzZScpO1xuXG4gICAgLyoqXG4gICAgICogVGhlIHVwcGVyIGNhc2UgdmVyc2lvbiBvZiBhIHN0cmluZy5cbiAgICAgKlxuICAgICAqIEBmdW5jXG4gICAgICogQG1lbWJlck9mIFJcbiAgICAgKiBAc2luY2UgdjAuOS4wXG4gICAgICogQGNhdGVnb3J5IFN0cmluZ1xuICAgICAqIEBzaWcgU3RyaW5nIC0+IFN0cmluZ1xuICAgICAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIHN0cmluZyB0byB1cHBlciBjYXNlLlxuICAgICAqIEByZXR1cm4ge1N0cmluZ30gVGhlIHVwcGVyIGNhc2UgdmVyc2lvbiBvZiBgc3RyYC5cbiAgICAgKiBAc2VlIFIudG9Mb3dlclxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIudG9VcHBlcignYWJjJyk7IC8vPT4gJ0FCQydcbiAgICAgKi9cbiAgICB2YXIgdG9VcHBlciA9IGludm9rZXIoMCwgJ3RvVXBwZXJDYXNlJyk7XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm5zIHRoZSByZXN1bHQgb2YgY29uY2F0ZW5hdGluZyB0aGUgZ2l2ZW4gbGlzdHMgb3Igc3RyaW5ncy5cbiAgICAgKlxuICAgICAqIERpc3BhdGNoZXMgdG8gdGhlIGBjb25jYXRgIG1ldGhvZCBvZiB0aGUgc2Vjb25kIGFyZ3VtZW50LCBpZiBwcmVzZW50LlxuICAgICAqXG4gICAgICogQGZ1bmNcbiAgICAgKiBAbWVtYmVyT2YgUlxuICAgICAqIEBzaW5jZSB2MC4xLjBcbiAgICAgKiBAY2F0ZWdvcnkgTGlzdFxuICAgICAqIEBzaWcgW2FdIC0+IFthXSAtPiBbYV1cbiAgICAgKiBAc2lnIFN0cmluZyAtPiBTdHJpbmcgLT4gU3RyaW5nXG4gICAgICogQHBhcmFtIHtBcnJheXxTdHJpbmd9IGFcbiAgICAgKiBAcGFyYW0ge0FycmF5fFN0cmluZ30gYlxuICAgICAqIEByZXR1cm4ge0FycmF5fFN0cmluZ31cbiAgICAgKlxuICAgICAqIEBleGFtcGxlXG4gICAgICpcbiAgICAgKiAgICAgIFIuY29uY2F0KFtdLCBbXSk7IC8vPT4gW11cbiAgICAgKiAgICAgIFIuY29uY2F0KFs0LCA1LCA2XSwgWzEsIDIsIDNdKTsgLy89PiBbNCwgNSwgNiwgMSwgMiwgM11cbiAgICAgKiAgICAgIFIuY29uY2F0KCdBQkMnLCAnREVGJyk7IC8vICdBQkNERUYnXG4gICAgICovXG4gICAgdmFyIGNvbmNhdCA9IGZsaXAoaW52b2tlcigxLCAnY29uY2F0JykpO1xuXG4gICAgdmFyIFIgPSB7XG4gICAgICAgIEY6IEYsXG4gICAgICAgIFQ6IFQsXG4gICAgICAgIF9fOiBfXyxcbiAgICAgICAgYWRkOiBhZGQsXG4gICAgICAgIGFkZEluZGV4OiBhZGRJbmRleCxcbiAgICAgICAgYWRqdXN0OiBhZGp1c3QsXG4gICAgICAgIGFsbDogYWxsLFxuICAgICAgICBhbGxQYXNzOiBhbGxQYXNzLFxuICAgICAgICBhbGxVbmlxOiBhbGxVbmlxLFxuICAgICAgICBhbHdheXM6IGFsd2F5cyxcbiAgICAgICAgYW5kOiBhbmQsXG4gICAgICAgIGFueTogYW55LFxuICAgICAgICBhbnlQYXNzOiBhbnlQYXNzLFxuICAgICAgICBhcDogYXAsXG4gICAgICAgIGFwZXJ0dXJlOiBhcGVydHVyZSxcbiAgICAgICAgYXBwZW5kOiBhcHBlbmQsXG4gICAgICAgIGFwcGx5OiBhcHBseSxcbiAgICAgICAgYXNzb2M6IGFzc29jLFxuICAgICAgICBhc3NvY1BhdGg6IGFzc29jUGF0aCxcbiAgICAgICAgYmluYXJ5OiBiaW5hcnksXG4gICAgICAgIGJpbmQ6IGJpbmQsXG4gICAgICAgIGJvdGg6IGJvdGgsXG4gICAgICAgIGNhbGw6IGNhbGwsXG4gICAgICAgIGNoYWluOiBjaGFpbixcbiAgICAgICAgY2xvbmU6IGNsb25lLFxuICAgICAgICBjb21tdXRlOiBjb21tdXRlLFxuICAgICAgICBjb21tdXRlTWFwOiBjb21tdXRlTWFwLFxuICAgICAgICBjb21wYXJhdG9yOiBjb21wYXJhdG9yLFxuICAgICAgICBjb21wbGVtZW50OiBjb21wbGVtZW50LFxuICAgICAgICBjb21wb3NlOiBjb21wb3NlLFxuICAgICAgICBjb21wb3NlSzogY29tcG9zZUssXG4gICAgICAgIGNvbXBvc2VQOiBjb21wb3NlUCxcbiAgICAgICAgY29uY2F0OiBjb25jYXQsXG4gICAgICAgIGNvbmQ6IGNvbmQsXG4gICAgICAgIGNvbnN0cnVjdDogY29uc3RydWN0LFxuICAgICAgICBjb25zdHJ1Y3ROOiBjb25zdHJ1Y3ROLFxuICAgICAgICBjb250YWluczogY29udGFpbnMsXG4gICAgICAgIGNvbnRhaW5zV2l0aDogY29udGFpbnNXaXRoLFxuICAgICAgICBjb252ZXJnZTogY29udmVyZ2UsXG4gICAgICAgIGNvdW50Qnk6IGNvdW50QnksXG4gICAgICAgIGNyZWF0ZU1hcEVudHJ5OiBjcmVhdGVNYXBFbnRyeSxcbiAgICAgICAgY3Vycnk6IGN1cnJ5LFxuICAgICAgICBjdXJyeU46IGN1cnJ5TixcbiAgICAgICAgZGVjOiBkZWMsXG4gICAgICAgIGRlZmF1bHRUbzogZGVmYXVsdFRvLFxuICAgICAgICBkaWZmZXJlbmNlOiBkaWZmZXJlbmNlLFxuICAgICAgICBkaWZmZXJlbmNlV2l0aDogZGlmZmVyZW5jZVdpdGgsXG4gICAgICAgIGRpc3NvYzogZGlzc29jLFxuICAgICAgICBkaXNzb2NQYXRoOiBkaXNzb2NQYXRoLFxuICAgICAgICBkaXZpZGU6IGRpdmlkZSxcbiAgICAgICAgZHJvcDogZHJvcCxcbiAgICAgICAgZHJvcExhc3Q6IGRyb3BMYXN0LFxuICAgICAgICBkcm9wTGFzdFdoaWxlOiBkcm9wTGFzdFdoaWxlLFxuICAgICAgICBkcm9wUmVwZWF0czogZHJvcFJlcGVhdHMsXG4gICAgICAgIGRyb3BSZXBlYXRzV2l0aDogZHJvcFJlcGVhdHNXaXRoLFxuICAgICAgICBkcm9wV2hpbGU6IGRyb3BXaGlsZSxcbiAgICAgICAgZWl0aGVyOiBlaXRoZXIsXG4gICAgICAgIGVtcHR5OiBlbXB0eSxcbiAgICAgICAgZXFCeTogZXFCeSxcbiAgICAgICAgZXFQcm9wczogZXFQcm9wcyxcbiAgICAgICAgZXF1YWxzOiBlcXVhbHMsXG4gICAgICAgIGV2b2x2ZTogZXZvbHZlLFxuICAgICAgICBmaWx0ZXI6IGZpbHRlcixcbiAgICAgICAgZmluZDogZmluZCxcbiAgICAgICAgZmluZEluZGV4OiBmaW5kSW5kZXgsXG4gICAgICAgIGZpbmRMYXN0OiBmaW5kTGFzdCxcbiAgICAgICAgZmluZExhc3RJbmRleDogZmluZExhc3RJbmRleCxcbiAgICAgICAgZmxhdHRlbjogZmxhdHRlbixcbiAgICAgICAgZmxpcDogZmxpcCxcbiAgICAgICAgZm9yRWFjaDogZm9yRWFjaCxcbiAgICAgICAgZnJvbVBhaXJzOiBmcm9tUGFpcnMsXG4gICAgICAgIGZ1bmN0aW9uczogZnVuY3Rpb25zLFxuICAgICAgICBmdW5jdGlvbnNJbjogZnVuY3Rpb25zSW4sXG4gICAgICAgIGdyb3VwQnk6IGdyb3VwQnksXG4gICAgICAgIGd0OiBndCxcbiAgICAgICAgZ3RlOiBndGUsXG4gICAgICAgIGhhczogaGFzLFxuICAgICAgICBoYXNJbjogaGFzSW4sXG4gICAgICAgIGhlYWQ6IGhlYWQsXG4gICAgICAgIGlkZW50aWNhbDogaWRlbnRpY2FsLFxuICAgICAgICBpZGVudGl0eTogaWRlbnRpdHksXG4gICAgICAgIGlmRWxzZTogaWZFbHNlLFxuICAgICAgICBpbmM6IGluYyxcbiAgICAgICAgaW5kZXhPZjogaW5kZXhPZixcbiAgICAgICAgaW5pdDogaW5pdCxcbiAgICAgICAgaW5zZXJ0OiBpbnNlcnQsXG4gICAgICAgIGluc2VydEFsbDogaW5zZXJ0QWxsLFxuICAgICAgICBpbnRlcnNlY3Rpb246IGludGVyc2VjdGlvbixcbiAgICAgICAgaW50ZXJzZWN0aW9uV2l0aDogaW50ZXJzZWN0aW9uV2l0aCxcbiAgICAgICAgaW50ZXJzcGVyc2U6IGludGVyc3BlcnNlLFxuICAgICAgICBpbnRvOiBpbnRvLFxuICAgICAgICBpbnZlcnQ6IGludmVydCxcbiAgICAgICAgaW52ZXJ0T2JqOiBpbnZlcnRPYmosXG4gICAgICAgIGludm9rZXI6IGludm9rZXIsXG4gICAgICAgIGlzOiBpcyxcbiAgICAgICAgaXNBcnJheUxpa2U6IGlzQXJyYXlMaWtlLFxuICAgICAgICBpc0VtcHR5OiBpc0VtcHR5LFxuICAgICAgICBpc05pbDogaXNOaWwsXG4gICAgICAgIGlzU2V0OiBpc1NldCxcbiAgICAgICAgam9pbjogam9pbixcbiAgICAgICAga2V5czoga2V5cyxcbiAgICAgICAga2V5c0luOiBrZXlzSW4sXG4gICAgICAgIGxhc3Q6IGxhc3QsXG4gICAgICAgIGxhc3RJbmRleE9mOiBsYXN0SW5kZXhPZixcbiAgICAgICAgbGVuZ3RoOiBsZW5ndGgsXG4gICAgICAgIGxlbnM6IGxlbnMsXG4gICAgICAgIGxlbnNJbmRleDogbGVuc0luZGV4LFxuICAgICAgICBsZW5zUHJvcDogbGVuc1Byb3AsXG4gICAgICAgIGxpZnQ6IGxpZnQsXG4gICAgICAgIGxpZnROOiBsaWZ0TixcbiAgICAgICAgbHQ6IGx0LFxuICAgICAgICBsdGU6IGx0ZSxcbiAgICAgICAgbWFwOiBtYXAsXG4gICAgICAgIG1hcEFjY3VtOiBtYXBBY2N1bSxcbiAgICAgICAgbWFwQWNjdW1SaWdodDogbWFwQWNjdW1SaWdodCxcbiAgICAgICAgbWFwT2JqOiBtYXBPYmosXG4gICAgICAgIG1hcE9iakluZGV4ZWQ6IG1hcE9iakluZGV4ZWQsXG4gICAgICAgIG1hdGNoOiBtYXRjaCxcbiAgICAgICAgbWF0aE1vZDogbWF0aE1vZCxcbiAgICAgICAgbWF4OiBtYXgsXG4gICAgICAgIG1heEJ5OiBtYXhCeSxcbiAgICAgICAgbWVhbjogbWVhbixcbiAgICAgICAgbWVkaWFuOiBtZWRpYW4sXG4gICAgICAgIG1lbW9pemU6IG1lbW9pemUsXG4gICAgICAgIG1lcmdlOiBtZXJnZSxcbiAgICAgICAgbWVyZ2VBbGw6IG1lcmdlQWxsLFxuICAgICAgICBtaW46IG1pbixcbiAgICAgICAgbWluQnk6IG1pbkJ5LFxuICAgICAgICBtb2R1bG86IG1vZHVsbyxcbiAgICAgICAgbXVsdGlwbHk6IG11bHRpcGx5LFxuICAgICAgICBuQXJ5OiBuQXJ5LFxuICAgICAgICBuZWdhdGU6IG5lZ2F0ZSxcbiAgICAgICAgbm9uZTogbm9uZSxcbiAgICAgICAgbm90OiBub3QsXG4gICAgICAgIG50aDogbnRoLFxuICAgICAgICBudGhBcmc6IG50aEFyZyxcbiAgICAgICAgb2JqT2Y6IG9iak9mLFxuICAgICAgICBvZjogb2YsXG4gICAgICAgIG9taXQ6IG9taXQsXG4gICAgICAgIG9uY2U6IG9uY2UsXG4gICAgICAgIG9yOiBvcixcbiAgICAgICAgb3Zlcjogb3ZlcixcbiAgICAgICAgcGFpcjogcGFpcixcbiAgICAgICAgcGFydGlhbDogcGFydGlhbCxcbiAgICAgICAgcGFydGlhbFJpZ2h0OiBwYXJ0aWFsUmlnaHQsXG4gICAgICAgIHBhcnRpdGlvbjogcGFydGl0aW9uLFxuICAgICAgICBwYXRoOiBwYXRoLFxuICAgICAgICBwYXRoRXE6IHBhdGhFcSxcbiAgICAgICAgcGF0aE9yOiBwYXRoT3IsXG4gICAgICAgIHBpY2s6IHBpY2ssXG4gICAgICAgIHBpY2tBbGw6IHBpY2tBbGwsXG4gICAgICAgIHBpY2tCeTogcGlja0J5LFxuICAgICAgICBwaXBlOiBwaXBlLFxuICAgICAgICBwaXBlSzogcGlwZUssXG4gICAgICAgIHBpcGVQOiBwaXBlUCxcbiAgICAgICAgcGx1Y2s6IHBsdWNrLFxuICAgICAgICBwcmVwZW5kOiBwcmVwZW5kLFxuICAgICAgICBwcm9kdWN0OiBwcm9kdWN0LFxuICAgICAgICBwcm9qZWN0OiBwcm9qZWN0LFxuICAgICAgICBwcm9wOiBwcm9wLFxuICAgICAgICBwcm9wRXE6IHByb3BFcSxcbiAgICAgICAgcHJvcElzOiBwcm9wSXMsXG4gICAgICAgIHByb3BPcjogcHJvcE9yLFxuICAgICAgICBwcm9wU2F0aXNmaWVzOiBwcm9wU2F0aXNmaWVzLFxuICAgICAgICBwcm9wczogcHJvcHMsXG4gICAgICAgIHJhbmdlOiByYW5nZSxcbiAgICAgICAgcmVkdWNlOiByZWR1Y2UsXG4gICAgICAgIHJlZHVjZVJpZ2h0OiByZWR1Y2VSaWdodCxcbiAgICAgICAgcmVkdWNlZDogcmVkdWNlZCxcbiAgICAgICAgcmVqZWN0OiByZWplY3QsXG4gICAgICAgIHJlbW92ZTogcmVtb3ZlLFxuICAgICAgICByZXBlYXQ6IHJlcGVhdCxcbiAgICAgICAgcmVwbGFjZTogcmVwbGFjZSxcbiAgICAgICAgcmV2ZXJzZTogcmV2ZXJzZSxcbiAgICAgICAgc2Nhbjogc2NhbixcbiAgICAgICAgc2V0OiBzZXQsXG4gICAgICAgIHNsaWNlOiBzbGljZSxcbiAgICAgICAgc29ydDogc29ydCxcbiAgICAgICAgc29ydEJ5OiBzb3J0QnksXG4gICAgICAgIHNwbGl0OiBzcGxpdCxcbiAgICAgICAgc3BsaXRFdmVyeTogc3BsaXRFdmVyeSxcbiAgICAgICAgc3VidHJhY3Q6IHN1YnRyYWN0LFxuICAgICAgICBzdW06IHN1bSxcbiAgICAgICAgdGFpbDogdGFpbCxcbiAgICAgICAgdGFrZTogdGFrZSxcbiAgICAgICAgdGFrZUxhc3Q6IHRha2VMYXN0LFxuICAgICAgICB0YWtlTGFzdFdoaWxlOiB0YWtlTGFzdFdoaWxlLFxuICAgICAgICB0YWtlV2hpbGU6IHRha2VXaGlsZSxcbiAgICAgICAgdGFwOiB0YXAsXG4gICAgICAgIHRlc3Q6IHRlc3QsXG4gICAgICAgIHRpbWVzOiB0aW1lcyxcbiAgICAgICAgdG9Mb3dlcjogdG9Mb3dlcixcbiAgICAgICAgdG9QYWlyczogdG9QYWlycyxcbiAgICAgICAgdG9QYWlyc0luOiB0b1BhaXJzSW4sXG4gICAgICAgIHRvU3RyaW5nOiB0b1N0cmluZyxcbiAgICAgICAgdG9VcHBlcjogdG9VcHBlcixcbiAgICAgICAgdHJhbnNkdWNlOiB0cmFuc2R1Y2UsXG4gICAgICAgIHRyaW06IHRyaW0sXG4gICAgICAgIHR5cGU6IHR5cGUsXG4gICAgICAgIHVuYXBwbHk6IHVuYXBwbHksXG4gICAgICAgIHVuYXJ5OiB1bmFyeSxcbiAgICAgICAgdW5jdXJyeU46IHVuY3VycnlOLFxuICAgICAgICB1bmZvbGQ6IHVuZm9sZCxcbiAgICAgICAgdW5pb246IHVuaW9uLFxuICAgICAgICB1bmlvbldpdGg6IHVuaW9uV2l0aCxcbiAgICAgICAgdW5pcTogdW5pcSxcbiAgICAgICAgdW5pcUJ5OiB1bmlxQnksXG4gICAgICAgIHVuaXFXaXRoOiB1bmlxV2l0aCxcbiAgICAgICAgdW5sZXNzOiB1bmxlc3MsXG4gICAgICAgIHVubmVzdDogdW5uZXN0LFxuICAgICAgICB1cGRhdGU6IHVwZGF0ZSxcbiAgICAgICAgdXNlV2l0aDogdXNlV2l0aCxcbiAgICAgICAgdmFsdWVzOiB2YWx1ZXMsXG4gICAgICAgIHZhbHVlc0luOiB2YWx1ZXNJbixcbiAgICAgICAgdmlldzogdmlldyxcbiAgICAgICAgd2hlbjogd2hlbixcbiAgICAgICAgd2hlcmU6IHdoZXJlLFxuICAgICAgICB3aGVyZUVxOiB3aGVyZUVxLFxuICAgICAgICB3cmFwOiB3cmFwLFxuICAgICAgICB4cHJvZDogeHByb2QsXG4gICAgICAgIHppcDogemlwLFxuICAgICAgICB6aXBPYmo6IHppcE9iaixcbiAgICAgICAgemlwV2l0aDogemlwV2l0aFxuICAgIH07XG5cbiAgLyogVEVTVF9FTlRSWV9QT0lOVCAqL1xuXG4gIGlmICh0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IFI7XG4gIH0gZWxzZSBpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG4gICAgZGVmaW5lKGZ1bmN0aW9uKCkgeyByZXR1cm4gUjsgfSk7XG4gIH0gZWxzZSB7XG4gICAgdGhpcy5SID0gUjtcbiAgfVxuXG59LmNhbGwodGhpcykpO1xuIiwiaW1wb3J0IHBhcnNlTGF0ZXN0T2JzZXJ2YXRpb25EYXRhIGZyb20gXCIuL3BhcnNlLWxhdGVzdC1vYnNlcnZhdGlvbi1kYXRhXCI7XG5pbXBvcnQgcGFyc2VCdW95IGZyb20gXCIuL3BhcnNlLXJlYWx0aW1lLWJ1b3ktZGF0YVwiO1xuaW1wb3J0IHN0YXRpb25Qcm9wZXJ0aWVzIGZyb20gXCIuL3BhcnNlLXN0YXRpb24tcHJvcGVydGllc1wiO1xuaW1wb3J0IFRpZGUgZnJvbSBcIi4vdGlkZVwiO1xuZXhwb3J0IGRlZmF1bHQge1xuXHRidWlsZDogXCJAQGNvbXBpbGVkXCIsXG5cdFRpZGU6IFRpZGUsXG5cdEJ1b3k6IHtcblx0XHRyZWFsVGltZTogcGFyc2VCdW95LFxuXHRcdGxhc3Rlc3RPYnNlcnZhdGlvbjogcGFyc2VMYXRlc3RPYnNlcnZhdGlvbkRhdGEsXG5cdFx0c3RhdGlvblByb3BlcnRpZXM6IHN0YXRpb25Qcm9wZXJ0aWVzXG5cdH1cbn07XG4iLCJpbXBvcnQgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBkZWdyZWVzVG9EaXJlY3Rpb24gZnJvbSBcIi4vdXRpbC9kZWdyZWVzLXRvLWRpcmVjdGlvblwiXG5pbXBvcnQgcHJvcE1hcCBmcm9tIFwiLi9wcm9wLW1hcC5qc1wiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihidW95LCBtYXAsIHZhbCwgaW5kZXgpIHtcblx0aWYgKHZhbCA9PT0gXCJNTVwiKSB7XG5cdFx0cmV0dXJuO1xuXHR9XG5cblx0bGV0IHByb3BOYW1lID0gbWFwW2luZGV4XTtcblx0aWYgKHByb3BOYW1lID09PSBcIlNUTlwiKSB7XG5cdFx0YnVveS5zdGF0aW9uSUQgPSB2YWxcblx0XHRyZXR1cm5cblx0fVxuXHRpZiAocHJvcE1hcFtwcm9wTmFtZV0pIHtcblx0XHRwcm9wTmFtZSA9IHByb3BNYXBbcHJvcE5hbWVdO1xuXHR9IGVsc2Uge1xuXHRcdHJldHVybjtcblx0fVxuXHQvLyBhbGwgdmFsdWVzIGFyZSBudW1iZXJzLlxuXHR2YWwgPSBwYXJzZUZsb2F0KHZhbCk7XG5cdHN3aXRjaCAocHJvcE5hbWUpIHtcblx0XHRjYXNlIFwieWVhclwiOlxuXHRcdFx0YnVveS5kYXRlLnNldFVUQ0Z1bGxZZWFyKHZhbCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwibW9udGhcIjpcblx0XHRcdGJ1b3kuZGF0ZS5zZXRVVENNb250aCh2YWwgLSAxKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJkYXlcIjpcblx0XHRcdGJ1b3kuZGF0ZS5zZXRVVENEYXRlKHZhbCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwiaG91clwiOlxuXHRcdFx0YnVveS5kYXRlLnNldFVUQ0hvdXJzKHZhbCk7XG5cdFx0XHRicmVhaztcblx0XHRjYXNlIFwibWludXRlXCI6XG5cdFx0XHRidW95LmRhdGUuc2V0VVRDTWludXRlcyh2YWwpO1xuXHRcdFx0YnJlYWs7XG5cdFx0Y2FzZSBcImRvbWluYW50UGVyaW9kV2F2ZURpcmVjdGlvblwiOlxuXHRcdFx0YnVveVtwcm9wTmFtZV0gPSB2YWw7XG5cdFx0XHRidW95LmRvbWluYW50UGVyaW9kV2F2ZURpcmVjdGlvbkNvbXBhc3MgPSBkZWdyZWVzVG9EaXJlY3Rpb24odmFsKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ3aW5kRGlyZWN0aW9uXCI6XG5cdFx0XHRidW95W3Byb3BOYW1lXSA9IHZhbDtcblx0XHRcdGJ1b3kud2luZERpcmVjdGlvbkNvbXBhc3MgPSBkZWdyZWVzVG9EaXJlY3Rpb24odmFsKTtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJ3YXZlSGVpZ2h0XCI6XG5cdFx0XHRidW95W3Byb3BOYW1lXSA9IHZhbDtcblx0XHRcdGJyZWFrO1xuXHRcdGNhc2UgXCJsb25naXR1ZGVcIjpcblx0XHRjYXNlIFwibGF0aXR1ZGVcIjpcblx0XHRcdGJ1b3lbcHJvcE5hbWVdID0gcGFyc2VGbG9hdCh2YWwpO1xuXHRcdFx0YnJlYWs7XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGlmKCFSLmlzTmlsKHZhbCkpe1xuXHRcdFx0XHRidW95W3Byb3BOYW1lXSA9IHZhbDtcblx0XHRcdH1cblx0XHRcdGJyZWFrO1xuXHR9XG59XG4iLCJpbXBvcnQgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBwYXJzZUJ1b3lQcm9wZXJ0aWVzIGZyb20gXCIuL3BhcnNlLWJ1b3ktcHJvcGVydGllc1wiXG5pbXBvcnQgYXJyYXlGcm9tTGluZSBmcm9tIFwiLi9wYXJzZS1saW5lXCJcbmltcG9ydCB1dGlsIGZyb20gXCIuL3V0aWwvZnVuY3NcIlxuZXhwb3J0IGNvbnN0IFBBUlNFX0VSUk9SID0gXCJJbnZhbGlkIGRhdGEgZm9yIHBhcnNlLWRhdGEuanNcIjtcblxuLyoqXG4gKiBEYXRhIGxvYWRlZCBmcm9tXG4gKiBodHRwOi8vd3d3Lm5kYmMubm9hYS5nb3YvZGF0YS9sYXRlc3Rfb2JzL2xhdGVzdF9vYnMudHh0XG4gKiBObyBqc29uIHdhcyBhdmFpbGFibGVcbiAqL1xuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24obGlzdCkge1xuXHRpZiAoUi5pcyhTdHJpbmcsIGxpc3QpKSB7XG5cdFx0cmV0dXJuIHV0aWwucHJvY2Vzc1JlY29yZHMobGlzdClcblx0fVxuXHR0aHJvdyBQQVJTRV9FUlJPUjtcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEFycmF5RnJvbUxpbmUobGluZSkge1xuXHRyZXR1cm4gbGluZS5yZXBsYWNlKC9cXHN7Mix9L2csICcgJykucmVwbGFjZShcIiNcIiwgXCJcIikuc3BsaXQoXCIgXCIpO1xufVxuIiwiaW1wb3J0IFIgZnJvbSBcInJhbWRhXCI7XG5pbXBvcnQgcGFyc2VCdW95UHJvcGVydGllcyBmcm9tIFwiLi9wYXJzZS1idW95LXByb3BlcnRpZXNcIlxuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC9mdW5jc1wiXG5pbXBvcnQgYXJyYXlGcm9tTGluZSBmcm9tIFwiLi9wYXJzZS1saW5lXCJcbmV4cG9ydCBjb25zdCBQQVJTRV9FUlJPUiA9IFwiSW52YWxpZCBkYXRhIGZvciBwYXJzZS1yZWFsdGltZS1idW95LWRhdGEuanNcIjtcblxuLyoqXG4gKiBEYXRhIGxvYWRlZCBmcm9tXG4gKiBodHRwOi8vd3d3Lm5kYmMubm9hYS5nb3YvZGF0YS9yZWFsdGltZTIve3N0YXRpb25JRH0udHh0XG4gKiBObyBqc29uIHdhcyBhdmFpbGFibGVcbiAqIHJldHVybnMgYW4ge0FycmF5fSBvZiByZWNvcmRzIG9mIGJ1b3kgZGF0YVxuICovXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihsaXN0LCBudW1iZXJPZlJlY29yZHMgPSAxMCkge1xuXHRpZiAoUi5pcyhTdHJpbmcsIGxpc3QpKSB7XG5cdFx0cmV0dXJuIFIudGFrZShudW1iZXJPZlJlY29yZHMsIHV0aWwucHJvY2Vzc1JlY29yZHMobGlzdCkpXG5cdH0gZWxzZSB7XG5cdFx0LyogaXN0YW5idWwgaWdub3JlIG5leHQgKi9cblx0XHR0aHJvdyBQQVJTRV9FUlJPUjtcblx0fVxufVxuIiwiLyoqXG4gKiBQYXJzZXMgc3RhdGlvbiBkYXRhIGZyb20gaHR0cDovL3d3dy5uZGJjLm5vYWEuZ292L21vYmlsZS9zdGF0aW9uLnBocD9zdGF0aW9uPVxuICovXG5sZXQgbmFtZU1hdGNoID0gL2gxPjxwPiguKik8YnIvaSxcblx0Y29vcmRzTWF0Y2ggPSAvXFxkezAsM31cXC5cXGR7MCwzfShOfFMpIFxcZHswLDN9LlxcZHswLDN9KFd8RSkvaSxcblx0aWRNYXRjaCA9IC90aXRsZT5OREJDXFwvKC4qKTxcXC90aXRsZS9pXG5leHBvcnQgY29uc3QgUEFSU0VfRVJST1IgPSBcIkNvdWxkbid0IHBhcnNlIHN0YXRpb24gZGF0YVwiXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbihzdGF0aW9uRGF0YSkge1xuXHRsZXQgZm91bmRJRCA9IGlkTWF0Y2guZXhlYyhzdGF0aW9uRGF0YSlcblx0aWYgKCFmb3VuZElEKSB7XG5cdFx0dGhyb3cgUEFSU0VfRVJST1IgKyBcIiBubyBpZFwiXG5cdH1cblx0bGV0IGlkID0gZm91bmRJRFsxXSxcblx0XHRyZXN1bHQgPSB7XG5cdFx0XHRpZDogaWRcblx0XHR9LFxuXHRcdHBhcnNlID0gbmFtZU1hdGNoLmV4ZWMoc3RhdGlvbkRhdGEpLFxuXHRcdGNvb3JkcyA9IGNvb3Jkc01hdGNoLmV4ZWMoc3RhdGlvbkRhdGEpXG5cdGlmICghcGFyc2UgfHwgcGFyc2UubGVuZ3RoIDwgMikge1xuXHRcdHJlc3VsdC5uYW1lID0gaWQ7XG5cdH0gZWxzZSB7XG5cdFx0cmVzdWx0Lm5hbWUgPSBwYXJzZVsxXTtcblx0fVxuXHRpZiAoIWNvb3JkcyB8fCBjb29yZHMubGVuZ3RoIDwgMikge1xuXHRcdHRocm93IFBBUlNFX0VSUk9SICsgXCIgbm8gY29vcmRzXCJcblx0fSBlbHNlIHtcblx0XHRsZXQgbGF0bG9uZyA9IGNvb3Jkc1swXS5zcGxpdChcIiBcIiksXG5cdFx0XHRsYXQgPSBsYXRsb25nWzBdLFxuXHRcdFx0bG9uZyA9IGxhdGxvbmdbMV1cblx0XHRyZXN1bHQubG9uZ2l0dWRlID0gbG9uZy5pbmRleE9mKFwiV1wiKSA9PT0gLTEgPyBwYXJzZUZsb2F0KGxvbmcpIDogLXBhcnNlRmxvYXQobG9uZylcblx0XHRyZXN1bHQubGF0aXR1ZGUgPSBsYXQuaW5kZXhPZihcIlNcIikgPT09IC0xID8gcGFyc2VGbG9hdChsYXQpIDogLXBhcnNlRmxvYXQobGF0KVxuXHR9XG5cdHJldHVybiByZXN1bHRcbn1cbiIsImV4cG9ydCBkZWZhdWx0IHtcblx0U1ROOiBcInN0YXRpb25JRFwiLFxuXHQvKipcblx0ICogV2luZCBkaXJlY3Rpb24gKHRoZSBkaXJlY3Rpb24gdGhlIHdpbmQgaXMgY29taW5nIGZyb20gaW4gZGVncmVlcyBjbG9ja3dpc2UgZnJvbSB0cnVlIE4pIGR1cmluZyB0aGUgc2FtZSBwZXJpb2QgdXNlZCBmb3IgV1NQRC4gU2VlIFdpbmQgQXZlcmFnaW5nIE1ldGhvZHNcblx0ICovXG5cdFdESVI6IFwid2luZERpcmVjdGlvblwiLFxuXHQvKipcblx0ICogV2luZCBzcGVlZCAobS9zKSBhdmVyYWdlZCBvdmVyIGFuIGVpZ2h0LW1pbnV0ZSBwZXJpb2QgZm9yIGJ1b3lzIGFuZCBhIHR3by1taW51dGUgcGVyaW9kIGZvciBsYW5kIHN0YXRpb25zLiBSZXBvcnRlZCBIb3VybHkuIFNlZSBXaW5kIEF2ZXJhZ2luZyBNZXRob2RzLlxuXHQgKi9cblx0V1NQRDogXCJ3aW5kU3BlZWRcIixcblx0LyoqXG5cdCAqIFBlYWsgNSBvciA4IHNlY29uZCBndXN0IHNwZWVkIChtL3MpIG1lYXN1cmVkIGR1cmluZyB0aGUgZWlnaHQtbWludXRlIG9yIHR3by1taW51dGUgcGVyaW9kLiBUaGUgNSBvciA4IHNlY29uZCBwZXJpb2QgY2FuIGJlIGRldGVybWluZWQgYnkgcGF5bG9hZCwgU2VlIHRoZSBTZW5zb3IgUmVwb3J0aW5nLCBTYW1wbGluZywgYW5kIEFjY3VyYWN5IHNlY3Rpb24uXG5cdCAqL1xuXHRHU1Q6IFwiZ3VzdFNwZWVkXCIsXG5cdC8qKlxuXHQgKiBTaWduaWZpY2FudCB3YXZlIGhlaWdodCAobWV0ZXJzKSBpcyBjYWxjdWxhdGVkIGFzIHRoZSBhdmVyYWdlIG9mIHRoZSBoaWdoZXN0IG9uZS10aGlyZCBvZiBhbGwgb2YgdGhlIHdhdmUgaGVpZ2h0cyBkdXJpbmcgdGhlIDIwLW1pbnV0ZSBzYW1wbGluZyBwZXJpb2QuIFNlZSB0aGUgV2F2ZSBNZWFzdXJlbWVudHMgc2VjdGlvbi5cblx0ICovXG5cdFdWSFQ6IFwid2F2ZUhlaWdodFwiLFxuXHQvKipcblx0ICogRG9taW5hbnQgd2F2ZSBwZXJpb2QgKHNlY29uZHMpIGlzIHRoZSBwZXJpb2Qgd2l0aCB0aGUgbWF4aW11bSB3YXZlIGVuZXJneS4gU2VlIHRoZSBXYXZlIE1lYXN1cmVtZW50cyBzZWN0aW9uLlxuXHQgKi9cblx0RFBEOiBcIndhdmVQZXJpb2RcIixcblx0LyoqXG5cdCAqIEF2ZXJhZ2Ugd2F2ZSBwZXJpb2QgKHNlY29uZHMpIG9mIGFsbCB3YXZlcyBkdXJpbmcgdGhlIDIwLW1pbnV0ZSBwZXJpb2QuIFNlZSB0aGUgV2F2ZSBNZWFzdXJlbWVudHMgc2VjdGlvbi5cblx0ICovXG5cdEFQRDogXCJhdmVyYWdlV2F2ZVBlcmlvZFwiLFxuXHQvKipcblx0ICogVGhlIGRpcmVjdGlvbiBmcm9tIHdoaWNoIHRoZSB3YXZlcyBhdCB0aGUgZG9taW5hbnQgcGVyaW9kIChEUEQpIGFyZSBjb21pbmcuIFRoZSB1bml0cyBhcmUgZGVncmVlcyBmcm9tIHRydWUgTm9ydGgsIGluY3JlYXNpbmcgY2xvY2t3aXNlLFxuXHQgKiB3aXRoIE5vcnRoIGFzIDAgKHplcm8pIGRlZ3JlZXMgYW5kIEVhc3QgYXMgOTAgZGVncmVlcy4gU2VlIHRoZSBXYXZlIE1lYXN1cmVtZW50cyBzZWN0aW9uLlxuXHQgKi9cblx0TVdEOiBcImRvbWluYW50UGVyaW9kV2F2ZURpcmVjdGlvblwiLFxuXHQvKipcblx0ICogU2VhIGxldmVsIHByZXNzdXJlIChoUGEpLiBGb3IgQy1NQU4gc2l0ZXMgYW5kIEdyZWF0IExha2VzIGJ1b3lzLFxuXHQgKiB0aGUgcmVjb3JkZWQgcHJlc3N1cmUgaXMgcmVkdWNlZCB0byBzZWEgbGV2ZWwgdXNpbmcgdGhlIG1ldGhvZCBkZXNjcmliZWQgaW5cblx0ICogTldTIFRlY2huaWNhbCBQcm9jZWR1cmVzIEJ1bGxldGluIDI5MSAoMTEvMTQvODApLiAoIGxhYmVsZWQgQkFSIGluIEhpc3RvcmljYWwgZmlsZXMpXG5cdCAqL1xuXHRQUkVTOiBcInByZXNzdXJlXCIsXG5cdC8qKlxuXHQgKiBBaXIgdGVtcGVyYXR1cmUgKENlbHNpdXMpLiBGb3Igc2Vuc29yIGhlaWdodHMgb24gYnVveXMsIHNlZSBIdWxsIERlc2NyaXB0aW9ucy5cblx0ICogRm9yIHNlbnNvciBoZWlnaHRzIGF0IEMtTUFOIHN0YXRpb25zLCBzZWUgQy1NQU4gU2Vuc29yIExvY2F0aW9uc1xuXHQgKi9cblx0QVRNUDogXCJhaXJUZW1wXCIsXG5cdC8qKlxuXHQgKiBTZWEgc3VyZmFjZSB0ZW1wZXJhdHVyZSAoQ2Vsc2l1cykuIEZvciBzZW5zb3IgZGVwdGgsIHNlZSBIdWxsIERlc2NyaXB0aW9uLlxuXHQgKi9cblx0V1RNUDogXCJ3YXRlclRlbXBcIixcblx0LyoqXG5cdCAqIERld3BvaW50IHRlbXBlcmF0dXJlIHRha2VuIGF0IHRoZSBzYW1lIGhlaWdodCBhcyB0aGUgYWlyIHRlbXBlcmF0dXJlIG1lYXN1cmVtZW50LlxuXHQgKi9cblx0REVXUDogXCJkZXdwb2ludFRlbXBcIixcblx0LyoqXG5cdCAqIFByZXNzdXJlIFRlbmRlbmN5IGlzIHRoZSBkaXJlY3Rpb24gKHBsdXMgb3IgbWludXMpIGFuZCB0aGUgYW1vdW50IG9mIHByZXNzdXJlIGNoYW5nZSAoaFBhKVxuXHQgKiBmb3IgYSB0aHJlZSBob3VyIHBlcmlvZCBlbmRpbmcgYXQgdGhlIHRpbWUgb2Ygb2JzZXJ2YXRpb24uIChub3QgaW4gSGlzdG9yaWNhbCBmaWxlcylcblx0ICovXG5cdFBURFk6IFwicHJlc3N1cmVUZW5kZW5jeVwiLFxuXHRUSURFOiBcInRpZGVcIixcblx0TEFUOiBcImxhdGl0dWRlXCIsXG5cdExPTjogXCJsb25naXR1ZGVcIixcblx0WVlZWTogXCJ5ZWFyXCIsXG5cdFlZOiBcInllYXJcIixcblx0TU06IFwibW9udGhcIixcblx0REQ6IFwiZGF5XCIsXG5cdGhoOiBcImhvdXJcIixcblx0bW06IFwibWludXRlXCJcbn1cbiIsImltcG9ydCBSIGZyb20gXCJyYW1kYVwiO1xuaW1wb3J0IHV0aWwgZnJvbSBcIi4vdXRpbC9mdW5jc1wiXG5pbXBvcnQgZ2V0Tk9BQURhdGUgZnJvbSBcIi4vdXRpbC9nZXQtbm9hYS1kYXRlXCI7XG5sZXQgcGFyc2VUaWRlVGFibGVMaW5lID0gZnVuY3Rpb24ocmF3RGF0YSkge1xuXHRpZiAoUi5pcyhTdHJpbmcsIHJhd0RhdGEpKSB7XG5cdFx0bGV0IGZpZWxkcyA9IHV0aWwuY29tcGFjdChyYXdEYXRhLnNwbGl0KFwiXFx0XCIpKVxuXHRcdC8vIGZpZWxkczogRGF0ZSwgRGF5LCBUaW1lLCBGdCwgY20sIEhpZ2gvTG93XG5cdFx0aWYgKGZpZWxkcy5sZW5ndGggPT09IDYpIHtcblx0XHRcdGxldCBkYXRlID0gbmV3IERhdGUoZmllbGRzWzBdICsgXCIgXCIgKyBmaWVsZHNbMl0gKyBcIiBHTVQrMDAwMFwiKVxuXHRcdFx0aWYgKFIuaXMoRGF0ZSwgZGF0ZSkgJiYgdXRpbC5pc0Zpbml0ZShkYXRlLmdldFRpbWUoKSkpIHtcblx0XHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0XHRkYXRlOiBkYXRlLFxuXHRcdFx0XHRcdHRpZGVTaXplOiBwYXJzZUludChmaWVsZHNbNF0pIC8gMTAwLFxuXHRcdFx0XHRcdGlzSGlnaFRpZGU6IGZpZWxkc1s1XS5pbmRleE9mKFwiSFwiKSAhPT0gLTFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fVxufVxuZXhwb3J0IGRlZmF1bHQge1xuXHRnZXRVUkwodGlkZVN0YXRpb25JRCwgbnVtYmVyT2ZIb3VycyA9IDQ4KXtcblx0XHR2YXIgcmFuZ2UgPSBudW1iZXJPZkhvdXJzO1xuXHRcdHJldHVybiBgaHR0cDovL3RpZGVzYW5kY3VycmVudHMubm9hYS5nb3YvYXBpL2RhdGFnZXR0ZXI/YmVnaW5fZGF0ZT0ke2dldE5PQUFEYXRlKCl9JnJhbmdlPSR7cmFuZ2V9JnN0YXRpb249JHt0aWRlU3RhdGlvbklEfSZwcm9kdWN0PXByZWRpY3Rpb25zJmRhdHVtPU1MTFcmdW5pdHM9bWV0cmljJnRpbWVfem9uZT1nbXQmYXBwbGljYXRpb249cG9ydHNfc2NyZWVuJmZvcm1hdD1jc3ZgO1xuXHR9LFxuXHRwYXJzZVRpZGVUYWJsZUxpbmU6IHBhcnNlVGlkZVRhYmxlTGluZSxcblx0LyoqXG5cdCAqIHJldHVybiBhbiBhcnJheSBvZiB7ZGF0ZSwgdGlkZVNpemUsIGlzSGlnaFRpZGV9XG5cdCAqL1xuXHRwYXJzZVRpZGVUYWJsZTogZnVuY3Rpb24ocmF3RGF0YSkge1xuXHRcdGlmIChSLmlzKFN0cmluZywgcmF3RGF0YSkpIHtcblx0XHRcdGxldCBsaW5lcyA9IHJhd0RhdGEuc3BsaXQoXCJcXG5cIilcblx0XHRcdHJldHVybiB1dGlsLmNvbXBhY3QoUi5tYXAoZnVuY3Rpb24obGluZSkge1xuXHRcdFx0XHRyZXR1cm4gcGFyc2VUaWRlVGFibGVMaW5lKGxpbmUpXG5cdFx0XHR9LCBsaW5lcykpXG5cdFx0fVxuXHR9LFxuXHQvKipcblx0ICogcmV0dXJuIGFuIGFycmF5IG9mIHtkYXRlLCB0aWRlU2l6ZX1cblx0ICovXG5cdHBhcnNlOiBmdW5jdGlvbihyYXdEYXRhKSB7XG5cdFx0cmV0dXJuIFIudGFpbChyYXdEYXRhLnNwbGl0KFwiXFxuXCIpKS5tYXAoZnVuY3Rpb24ocm93KSB7XG5cdFx0XHR2YXIgdGlkZSA9IHJvdy5zcGxpdChcIixcIiksXG5cdFx0XHRcdC8vIHRoZSBkYXRlIGlzIFVUQywgYXBwZW5kIEdNVCswMDAwIHRvIGluZGljYXRlIHRoYXRcblx0XHRcdFx0Zm9ybWF0dGVkVGltZSA9IHRpZGVbMF0ucmVwbGFjZSgvLS9nLCBcIi9cIikgKyBcIiBHTVQrMDAwMFwiO1xuXHRcdFx0cmV0dXJuIHtcblx0XHRcdFx0ZGF0ZTogbmV3IERhdGUoZm9ybWF0dGVkVGltZSksXG5cdFx0XHRcdHRpZGVTaXplOiBwYXJzZUZsb2F0KHRpZGVbMV0pXG5cdFx0XHR9O1xuXHRcdH0pO1xuXHR9LFxuXHQvKipcblx0ICogbG9vayB0aHJvdWdoIGFuIGFycmF5IG9mIHtkYXRlLCB0aWRlU2l6ZX1cblx0ICovXG5cdGdldEN1cnJlbnQ6IGZ1bmN0aW9uKGRhdGEsIGZvckRhdGUpIHtcblx0XHRsZXQgbWF0Y2hEYXRlID0gZm9yRGF0ZSB8fCBuZXcgRGF0ZSgpLFxuXHRcdFx0bGFzdFRpZGUgPSB7fTtcblx0XHRyZXR1cm4gUi5maW5kKGZ1bmN0aW9uKHRpZGUpIHtcblx0XHRcdGxldCBkYXRlID0gdGlkZS5kYXRlXG5cdFx0XHRpZihSLmlzKERhdGUsIGRhdGUpICYmIHV0aWwuaXNGaW5pdGUoZGF0ZS5nZXRUaW1lKCkpKXtcblx0XHRcdFx0aWYgKGRhdGUuZ2V0VGltZSgpID4gbWF0Y2hEYXRlLmdldFRpbWUoKSkge1xuXHRcdFx0XHRcdHRpZGUuaXNJbmNyZWFzaW5nID0gdGlkZS50aWRlU2l6ZSA+IGxhc3RUaWRlLnRpZGVTaXplO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHRcdGlmICh0aWRlLnRpZGVTaXplICE9PSBsYXN0VGlkZS50aWRlU2l6ZSkge1xuXHRcdFx0XHRcdGxhc3RUaWRlID0gdGlkZTtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH0sIGRhdGEpO1xuXHR9LFxuXHQvKipcblx0ICogbG9vayB0aHJvdWdoIGFuIGFycmF5IG9mIHtkYXRlLCB0aWRlU2l6ZX1cblx0ICovXG5cdGdldE5leHRIaWdoT3JMb3c6IGZ1bmN0aW9uKGRhdGEsIGZvckRhdGUpIHtcblx0XHRsZXQgbWF0Y2hEYXRlID0gZm9yRGF0ZSB8fCBuZXcgRGF0ZSgpLFxuXHRcdFx0Zm91bmRDdXJyZW50LFxuXHRcdFx0aXNJbmNyZWFzaW5nLFxuXHRcdFx0cmVzdWx0LFxuXHRcdFx0bGFzdFRpZGUgPSB7fTtcblx0XHRkYXRhLnNvbWUoZnVuY3Rpb24odGlkZSkge1xuXHRcdFx0dmFyIGl0ZW1EYXRlID0gbmV3IERhdGUodGlkZS5kYXRlKTtcblx0XHRcdGlmKCF1dGlsLmlzRmluaXRlKGl0ZW1EYXRlLmdldFRpbWUoKSkpe1xuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHR9XG5cdFx0XHRpZihmb3VuZEN1cnJlbnQpe1xuXHRcdFx0XHQvLyB0aGUgdGlkZSBpcyBpbmNyZWFzaW5nXG5cdFx0XHRcdC8vIHRoZSBjdXJyZW50IGl0ZW0gaXMgbG93ZXIgdGhhbiB0aGUgbGFzdFxuXHRcdFx0XHQvLyB0aGUgbGFzdCBpdGVtIHdhcyB0aGUgaGlnaCB0aWRlXG5cdFx0XHRcdGlmKGlzSW5jcmVhc2luZyAmJiB0aWRlLnRpZGVTaXplIDwgbGFzdFRpZGUudGlkZVNpemUpe1xuXHRcdFx0XHRcdHJlc3VsdCA9IGxhc3RUaWRlO1xuXHRcdFx0XHR9ZWxzZSBpZighaXNJbmNyZWFzaW5nICYmIHRpZGUudGlkZVNpemUgPiBsYXN0VGlkZS50aWRlU2l6ZSl7XG5cdFx0XHRcdFx0Ly8gdGlkZSBpcyBkZWNyZWFzaW5nXG5cdFx0XHRcdFx0Ly8gdGhlIGN1cnJlbnQgdGlkZSBpcyBoaWdoZXIgdGhhbiB0aGUgbGFzdFxuXHRcdFx0XHRcdC8vIHRoZSBsYXN0IGl0ZW0gd2FzIGxvdyB0aWRlXG5cdFx0XHRcdFx0cmVzdWx0ID0gbGFzdFRpZGU7XG5cdFx0XHRcdH1cblx0XHRcdFx0aWYocmVzdWx0KXtcblx0XHRcdFx0XHRsYXN0VGlkZS5pc0hpZ2hUaWRlID0gaXNJbmNyZWFzaW5nO1xuXHRcdFx0XHRcdHJldHVybiB0cnVlO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRpZiAoIWZvdW5kQ3VycmVudCAmJiBpdGVtRGF0ZS5nZXRUaW1lKCkgPiBtYXRjaERhdGUuZ2V0VGltZSgpKSB7XG5cdFx0XHRcdC8vIHdlIGZvdW5kIHRoZSBjdXJyZW50IHRpZGUsIGlzIGl0IGluY3JlYXNpbmc/XG5cdFx0XHRcdGlzSW5jcmVhc2luZyA9IHRpZGUudGlkZVNpemUgPiBsYXN0VGlkZS50aWRlU2l6ZTtcblx0XHRcdFx0Zm91bmRDdXJyZW50ID0gdHJ1ZTtcblx0XHRcdH1cblx0XHRcdGlmICh0aWRlLnRpZGVTaXplICE9PSBsYXN0VGlkZS50aWRlU2l6ZSkge1xuXHRcdFx0XHRsYXN0VGlkZSA9IHRpZGU7XG5cdFx0XHR9XG5cdFx0fSk7XG5cdFx0cmV0dXJuIHJlc3VsdDtcblx0fVxufVxuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24oZGVncmVlcykge1xuXHRpZiAoZGVncmVlcyA+PSAwICYmIGRlZ3JlZXMgPD0gMTEuMjUpIHtcblx0XHRyZXR1cm4gXCJOXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAzNDguNzUgJiYgZGVncmVlcyA8PSAzNjApIHtcblx0XHRyZXR1cm4gXCJOXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAxMS4yNSAmJiBkZWdyZWVzIDw9IDMzLjc1KSB7XG5cdFx0cmV0dXJuIFwiTk5FXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAzMy43NSAmJiBkZWdyZWVzIDw9IDU2LjI1KSB7XG5cdFx0cmV0dXJuIFwiTkVcIjtcblx0fVxuXHRpZiAoZGVncmVlcyA+IDU2LjI1ICYmIGRlZ3JlZXMgPD0gNzguNzUpIHtcblx0XHRyZXR1cm4gXCJFTkVcIjtcblx0fVxuXHRpZiAoZGVncmVlcyA+IDc4Ljc1ICYmIGRlZ3JlZXMgPD0gMTAxLjI1KSB7XG5cdFx0cmV0dXJuIFwiRVwiO1xuXHR9XG5cdGlmIChkZWdyZWVzID4gMTAxLjI1ICYmIGRlZ3JlZXMgPD0gMTIzLjc1KSB7XG5cdFx0cmV0dXJuIFwiRVNFXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAxMjMuNzUgJiYgZGVncmVlcyA8PSAxNDYuMjUpIHtcblx0XHRyZXR1cm4gXCJTRVwiO1xuXHR9XG5cdGlmIChkZWdyZWVzID4gMTQ2LjI1ICYmIGRlZ3JlZXMgPD0gMTY4Ljc1KSB7XG5cdFx0cmV0dXJuIFwiU1NFXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAxNjguNzUgJiYgZGVncmVlcyA8PSAxOTEuMjUpIHtcblx0XHRyZXR1cm4gXCJTXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAxOTEuMjUgJiYgZGVncmVlcyA8PSAyMTMuNzUpIHtcblx0XHRyZXR1cm4gXCJTU1dcIjtcblx0fVxuXHRpZiAoZGVncmVlcyA+IDIxMy43NSAmJiBkZWdyZWVzIDw9IDIzNi4yNSkge1xuXHRcdHJldHVybiBcIlNXXCI7XG5cdH1cblx0aWYgKGRlZ3JlZXMgPiAyMzYuMjUgJiYgZGVncmVlcyA8PSAyNTguNzUpIHtcblx0XHRyZXR1cm4gXCJXU1dcIjtcblx0fVxuXHRpZiAoZGVncmVlcyA+IDI1OC43NSAmJiBkZWdyZWVzIDw9IDI4MS4yNSkge1xuXHRcdHJldHVybiBcIldcIjtcblx0fVxuXHRpZiAoZGVncmVlcyA+IDI4MS4yNSAmJiBkZWdyZWVzIDw9IDMwMy43NSkge1xuXHRcdHJldHVybiBcIldOV1wiO1xuXHR9XG5cdGlmIChkZWdyZWVzID4gMzAzLjc1ICYmIGRlZ3JlZXMgPD0gMzI2LjI1KSB7XG5cdFx0cmV0dXJuIFwiTldcIjtcblx0fVxuXHRpZiAoZGVncmVlcyA+IDMyNi4yNSAmJiBkZWdyZWVzIDw9IDM0OC43NSkge1xuXHRcdHJldHVybiBcIk5OV1wiO1xuXHR9XG59XG4iLCJpbXBvcnQgUiBmcm9tIFwicmFtZGFcIjtcbmltcG9ydCBhcnJheUZyb21MaW5lIGZyb20gXCIuLi9wYXJzZS1saW5lXCJcbmltcG9ydCBwYXJzZUJ1b3lQcm9wZXJ0aWVzIGZyb20gXCIuLi9wYXJzZS1idW95LXByb3BlcnRpZXNcIlxuXG5sZXQgY29tcGFjdCA9IFIuY29tcG9zZShSLmZpbHRlcihCb29sZWFuKSwgUi5yZWplY3QoUi5pc05pbCkpLFxuXHQvLyBnZXQgdGhlIHByb3AgbmFtZXMsIGFuZCByZW1vdmUgU1ROLCB3aGljaCB3ZSdyZSB1c2luZyBhcyB0aGUgSURcblx0Zmlyc3RBc0FycmF5ID0gUi5jb21wb3NlKGFycmF5RnJvbUxpbmUsIFIuaGVhZCksXG5cdC8vIHBvcCBvZmYgdGhlIGZpcnN0IHR3byBsaW5lcyBvZiB0ZXh0LCB0aGV5J3JlIGRlc2NyaXB0aW9ucywgbm90IGJ1b3kgZGF0YVxuXHRjbGVhbkJ1b3lEYXRhID0gUi5jb21wb3NlKGNvbXBhY3QsIFIuZHJvcCgyKSksXG5cdC8vIENvbnZlcnQgdGhlIHJhdyBkYXRlIHRvIGEgYnVveSBvYmplY3Rcblx0Y3JlYXRlQnVveVJlY29yZCA9IFIuY3VycnkoKHByb3BlcnR5TmFtZXMsIHZhbHVlcykgPT4ge1xuXHRcdHZhciBidW95ID0ge1xuXHRcdFx0ZGF0ZTogbmV3IERhdGUoKVxuXHRcdH07XG5cdFx0Ly8gYnVpbGQgdGhlIG9iamVjdCBieSBpdGVyYXRpbmcgdGhyb3VnaCBlYWNoIGNvbHVtbiB2YWx1ZVxuXHRcdHZhbHVlcy5mb3JFYWNoKFIucGFydGlhbChwYXJzZUJ1b3lQcm9wZXJ0aWVzLCBbYnVveSwgcHJvcGVydHlOYW1lc10pKTtcblx0XHQvLyBzZWNvbmRzIGFuZCBtaWxsaXNlY29uZHMgZG9uJ3QgY29tZSBmcm9tIG5vYWEgZGF0YSxcblx0XHQvLyBzbyBjbGVhciB0aGVtXG5cdFx0YnVveS5kYXRlLnNldFNlY29uZHMoMClcblx0XHRidW95LmRhdGUuc2V0TWlsbGlzZWNvbmRzKDApXG5cdFx0cmV0dXJuIGJ1b3k7XG5cdH0pXG5cbmxldCBwcm9jZXNzUmVjb3JkcyA9IChsaXN0KSA9PiB7XG5cdC8vIGNyZWF0ZSBhbiBhcnJheSBmcm9tIHRoZSBsaW5lc1xuXHRsaXN0ID0gbGlzdC5zcGxpdChcIlxcblwiKTtcblx0Ly8gVGhlIGZpcnN0IGxpbmUgaXMgdGhlIHByb3BlcnR5IG5hbWVzXG5cdGxldCBwcm9wZXJ0eU5hbWVzID0gZmlyc3RBc0FycmF5KGxpc3QpLFxuXHRcdC8vIFJ1biB0aGlzIG9uIGVhY2ggcmVjb3JkXG5cdFx0cHJvY2Vzc1JlY29yZCA9IFIuY29tcG9zZShjcmVhdGVCdW95UmVjb3JkKHByb3BlcnR5TmFtZXMpLCBhcnJheUZyb21MaW5lKSxcblx0XHQvLyBUaGUgcmVjb3JkcyBsaXN0IHRvIG1hcFxuXHRcdHJlY29yZHNMaXN0ID0gY2xlYW5CdW95RGF0YShsaXN0KVxuXHRyZXR1cm4gcmVjb3Jkc0xpc3QubWFwKHByb2Nlc3NSZWNvcmQpO1xufVxuXG5leHBvcnQgZGVmYXVsdCB7XG5cdGNvbXBhY3Q6IGNvbXBhY3QsXG5cdGlzRmluaXRlOiAob2JqKSA9PiB7XG4gICAgXHRyZXR1cm4gaXNGaW5pdGUob2JqKSAmJiAhaXNOYU4ocGFyc2VGbG9hdChvYmopKTtcbiAgXHR9LFxuXHRwcm9jZXNzUmVjb3JkczogcHJvY2Vzc1JlY29yZHNcbn1cbiIsImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uKGRhdGUpe1xuICAgdmFyIGQgPSBkYXRlIHx8IG5ldyBEYXRlKCksXG4gICAgICBtb250aCA9IChkLmdldFVUQ01vbnRoKCkgKyAxKS50b1N0cmluZygpLFxuICAgICAgZGF5ID0gZC5nZXRVVENEYXRlKCkudG9TdHJpbmcoKTtcbiAgIGlmKG1vbnRoLmxlbmd0aCA9PT0gMSl7XG4gICBcdFx0bW9udGggPSBcIjBcIiArIG1vbnRoO1xuICAgfVxuICAgaWYoZGF5Lmxlbmd0aCA9PT0gMSl7XG4gICBcdFx0ZGF5ID0gXCIwXCIgKyBkYXk7XG4gICB9XG4gICByZXR1cm4gZC5nZXRVVENGdWxsWWVhcigpLnRvU3RyaW5nKCkgKyBtb250aCArIGRheTtcbn1cbiJdfQ==
