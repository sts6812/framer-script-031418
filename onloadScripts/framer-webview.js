
/**
 * Web view
 *
 * @class
 * @param {Object} options
 * @param {string} options.url=http://google.com/design
 * @param {number} options.contentHeight=2294 - Height of webpage
 *
 * NOTE: To get the appropriate `contentHeight` for the given `url`
 * open said `url` in Chrome, emulate your target device, and run
 * `document.body.offsetHeight` in the console. The output is your
 * `contentHeight` value.
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"framer-webview":[function(require,module,exports){
module.exports = class WebView extends ScrollComponent {
  constructor(opts={}) {
    opts.url = opts.url || "http://google.com/design"
    opts.backgroundColor = opts.backgroundColor || "#333"
    opts.contentHeight = opts.contentHeight || 2294

    super(_.extend(opts, {
      scrollHorizontal: false
    }))


    this._page = new Layer({
      superLayer: this.content,
      width: this.width,
      height: opts.contentHeight,
      backgroundColor: opts.backgroundColor
    })

    this._page.html = `<iframe
                         src="${opts.url}"
                         width="${this.width}"
                         height="${opts.contentHeight}">
                       </iframe>`

    this._url = opts.url
    this._contentHeight = opts.contentHeight
    this._iframe = this.querySelector('iframe')

    // update _page and _iframe `height` accordingly
    this.on('change:width', () => {
      this._page.width = this.width
      this._iframe.width = this.width
    })
  }

  get url() { return this._url }
  set url(value) {
    this._url = value
    this._iframe.src = value
  }

  get contentHeight() { return this._contentHeight }
  set contentHeight(value) {
    this._contentHeight = value
    this._iframe.height = value
    this._page.height = value
    this.updateContent()
  }
}
 },{}]},{},[])