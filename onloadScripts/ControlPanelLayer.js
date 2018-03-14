/*ControlPanelLayer.js
	 * USING THE CONTROLPANELLAYER MODULE

	 * Require the module
	ControlPanelLayer = require "ControlPanelLayer"

	myControlPanel = new ControlPanelLayer
		scaleFactor: <number>
		specs: <object>
		draggable: <boolean>
		textColor: <string> (hex or rgba)
		backgroundColor: <string> (hex or rgba)
		inputTextColor: <string> (hex or rgba)
		inputBackgroundColor: <string> (hex or rgba)
		buttonTextColor: <string> (hex or rgba)
		buttonColor: <string> (hex or rgba)
		commitAction: -> <action>
		closeAction: -> <action>

	 * The specs object

	 * The ControlPanelLayer requires your behavior specifications to be organized in key-value object form. Each item must include a `label` and `value`. Optionally you may include an explanatory `tip`. Additional keys will be ignored.

	 * Specs object values can include strings, numbers and booleans.

	exampleSpecs =
		defaultText:
			label: "Default text"
			value: "hello"
			tip: "Initial text to display."
		animationTime:
			label: "Animation time"
			value: 5
			tip: "How long the animation will run."
		autoplay:
			label: "Should autoplay"
			value: false

	 * Referring to a particular spec using such an object is done with the usual dot notation or bracket notation, e.g. `exampleSpecs.animationTime.value` or `exampleSpecs["animationTime"]["value"]` or `exampleSpecs["animationTime"].value`.

	 * The commit action

	 * The ControlPanelLayer features a Commit button which can be customized to perform any action. You will want to at least overwrite your specs object with any changes effected via the ControlPanelLayer.

	myControlPanel = new ControlPanelLayer
		specs: exampleSpecs
		commitAction: -> exampleSpecs = this.specs

	 * The close action

	 * The panel close button works to hide the panel, but you may supply it with additional functionality.

	myControlPanel = new ControlPanelLayer
		specs: exampleSpecs
		closeAction: -> print "panel closed"

	 * Integration with QueryInterface (https://github.com/marckrenn/framer-QueryInterface/)

	{QueryInterface} = require 'QueryInterface'

	querySpecs = new QueryInterface
		key: "specs"
		default: exampleSpecs

	myControlPanel = new ControlPanelLayer
		specs: querySpecs.value
		commitAction: -> querySpecs.value = this.specs; window.location.reload(false)

	 * Show or hide the ControlPanelLayer
	myControlPanel.show()
	myControlPanel.hide()
	myControlPanel.hidden (<readonly boolean>, returns whether the ControlPanelLayer is currently hidden)

	 * Known issues

	 * Creating multiple ControlPanelLayers with different scale factors will result in unexpected input field effects.
 */
require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"ControlPanelLayer":[function(require,module,exports){
var ControlPanelLayer, defaults,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

defaults = {
  specs: {},
  scaleFactor: 1,
  draggable: true,
  textColor: "white",
  inputBackgroundColor: "rgba(255,255,255,0.8)",
  inputTextColor: "black",
  backgroundColor: "rgba(0,0,0,0.5)",
  buttonTextColor: "black",
  buttonColor: "white",
  width: 350,
  showGuides: false,
  hidden: false,
  commitAction: function() {},
  closeAction: function() {}
};

ControlPanelLayer = (function(superClass) {
  extend(ControlPanelLayer, superClass);

  function ControlPanelLayer(options) {
    var alertString, closeButton, closeButtonGlyphMargin, closeButtonMargin, closeButtonSize, closeButtonStroke1, closeButtonStroke2, closeGlyphHeight, closeGlyphRotationX, closeGlyphRotationY, closeGlyphTop, closeGlyphWidth, codeBodyColor, codeBracketColor, codeVariableColor, commitButton, commitButtonHeight, commitButtonTopMargin, commitString, fn, inputCSS, inputInsetShadowColor, inputTopMargin, inputTopOffet, inputWidth, keyIndex, labelWidth, minimumPanelHeight, panelBottomMargin, panelButtonMargin, panelLabelMargin, panelLabelSize, panelRowHeight, panelSideMargin, panelTipMargin, panelTipSize, panelTopMargin, radioButtonMarkSize, radioButtonSize, radioButtonTopMargin, row, rowCount, rowHeight, rows, svgTopOffset;
    this.options = options != null ? options : {};
    this.show = bind(this.show, this);
    this.hide = bind(this.hide, this);
    this.options = _.assign({}, defaults, this.options);
    ControlPanelLayer.__super__.constructor.call(this, this.options);
    rowHeight = 32 * this.options.scaleFactor;
    panelTopMargin = 15 * this.options.scaleFactor;
    panelBottomMargin = 15 * this.options.scaleFactor;
    panelSideMargin = 30 * this.options.scaleFactor;
    panelButtonMargin = 15 * this.options.scaleFactor;
    panelRowHeight = 34 * this.options.scaleFactor;
    minimumPanelHeight = 2 * panelRowHeight + panelTopMargin + panelBottomMargin;
    panelLabelSize = 16 * this.options.scaleFactor;
    panelLabelMargin = 6 * this.options.scaleFactor;
    panelTipSize = 12 * this.options.scaleFactor;
    panelTipMargin = -10 * this.options.scaleFactor;
    radioButtonSize = 20 * this.options.scaleFactor;
    radioButtonMarkSize = 12 * this.options.scaleFactor;
    radioButtonTopMargin = 6 * this.options.scaleFactor;
    inputWidth = 50 * this.options.scaleFactor;
    inputTopMargin = panelLabelSize / 4;
    inputTopOffet = this.options.scaleFactor === 1 ? -3 : 0;
    svgTopOffset = this.options.scaleFactor === 1 ? 2 : 0;
    commitButtonHeight = 30 * this.options.scaleFactor;
    commitButtonTopMargin = 5 * this.options.scaleFactor;
    codeVariableColor = "#ed6a43";
    codeBracketColor = "#a71d5d";
    codeBodyColor = this.options.buttonTextColor === "black" ? "#24292e" : this.options.buttonTextColor;
    closeButtonSize = 24 * this.options.scaleFactor;
    closeButtonMargin = 8 * this.options.scaleFactor;
    closeButtonGlyphMargin = 4 * this.options.scaleFactor;
    closeGlyphHeight = 2 * this.options.scaleFactor;
    closeGlyphWidth = closeButtonSize - closeButtonGlyphMargin * 2;
    closeGlyphTop = closeButtonSize / 2 - 1 * this.options.scaleFactor;
    closeGlyphRotationX = closeButtonSize / 2;
    closeGlyphRotationY = closeButtonSize / 2;
    inputInsetShadowColor = new Color(this.options.inputBackgroundColor).darken(30);
    alertString = "<p style='font-size:" + panelLabelSize + "px; color:" + this.options.buttonTextColor + "; text-align:center; line-height:" + commitButtonHeight + "px'>Add specs with <code style='color:" + codeBodyColor + "'><span style='color:" + codeVariableColor + "'>specs</span>: <span style='color:" + codeBracketColor + "'>&lt;</span>mySpecs<span style='color:" + codeBracketColor + "'>&gt;</span></code></p>";
    commitString = "<p style='font-size:" + panelLabelSize + "px; color:" + this.options.buttonTextColor + "; text-align:center; line-height:" + commitButtonHeight + "px'>Commit</p>";
    rowCount = Object.keys(this.options.specs).length + 1;
    rows = [];
    this.name = "controlPanel";
    this.width = 270;
    this.clip =true;
    this.scale = 1;
    this.height = panelRowHeight * rowCount + panelTopMargin + panelBottomMargin;
    this.borderRadius = 10 * this.options.scaleFactor;
    this.shadowBlur = 20 * this.options.scaleFactor;
    this.shadowColor = "rgba(0,0,0,0.3)";
    this.backgroundColor = this.options.backgroundColor;
    this.draggable = this.options.draggable;
    this.draggable.momentum = false;
    this.fontFamily = 'Arial'
    inputCSSpanel = 'div[name="controlPanel"] {\n font-family: Arial;}'
    Utils.insertCSS(inputCSSpanel)
    labelWidth = this.width - 125 * this.options.scaleFactor;
    inputCSS = "input[type='text'] {\n  color: " + this.options.inputTextColor + ";\n  background-color: " + this.options.inputBackgroundColor + ";\n  font-family: -apple-system, Helvetica, Arial, sans-serif;\n  font-weight: 500;\n  text-align: left;\n  font-size: " + panelLabelSize + "px;\n  margin-top: " + inputTopMargin + "px;\n  padding: " + (panelLabelSize / 8) + "px;\n  appearance: none;\n  width: " + (inputWidth - panelLabelSize / 8) + "px;\n  box-shadow: inset 0px 1px 2px 0 " + inputInsetShadowColor + ";\n  border-radius: " + (3 * this.options.scaleFactor) + "px;\n  position: relative;\n  top: " + inputTopOffet + "px;\n}";
    Utils.insertCSS(inputCSS);
    keyIndex = 0;
    fn = (function(_this) {
      return function(row) {
        var guide, idString, input, inputMark, label, rowBlock, tip, tipRequired;
        tipRequired = _this.options.specs[row].tip !== "" && _this.options.specs[row].tip !== void 0 ? true : false;
        rowBlock = new Layer({
          name: "row" + keyIndex,
          parent: _this,
          x: panelSideMargin,
          y: keyIndex > 0 ? rows[keyIndex - 1].maxY : panelTopMargin + keyIndex * panelRowHeight,
          height: tipRequired ? panelRowHeight * 1.5 : panelRowHeight,
          width: labelWidth,
          backgroundColor: "clear"
        });
        rows.push(rowBlock);
        label = new Layer({
          name: _.camelCase(_this.options.specs[row].label + "Label"),
          parent: rowBlock,
          height: panelRowHeight,
          width: labelWidth,
          y: panelLabelMargin,
          backgroundColor: "clear",
          html: "<p>" + _this.options.specs[row].label + "</p>",
          style: {
            "font-size": panelLabelSize + "px",
            "font-weight": "500",
            "text-align": "left",
            "color": _this.options.textColor
          }
        });
        _this[label.name] = label;
        if (tipRequired) {
          tip = new Layer({
            name: _.camelCase(_this.options.specs[row].label + "Tip"),
            parent: rowBlock,
            height: panelRowHeight * 0.4,
            width: labelWidth,
            y: label.maxY + panelTipMargin,
            backgroundColor: "clear",
            html: "<p>" + _this.options.specs[row].tip + "</p>",
            style: {
              "font-size": panelTipSize + "px",
              "font-weight": "500",
              "text-align": "left",
              "color": _this.options.textColor
            }
          });
          _this[tip.name] = tip;
        }
        idString = _.camelCase(_this.options.specs[row].label + "Input");
        switch (typeof _this.options.specs[row].value) {
          case "boolean":
            input = new Layer({
              name: idString,
              parent: rowBlock,
              x: Align.right(inputWidth),
              y: Align.top(radioButtonTopMargin),
              height: radioButtonSize,
              width: radioButtonSize,
              borderRadius: radioButtonSize / 2,
              borderColor: _this.options.textColor,
              borderWidth: 1 * _this.options.scaleFactor,
              backgroundColor: "clear"
            });
            inputMark = new Layer({
              name: "mark",
              parent: input,
              width: radioButtonMarkSize,
              height: radioButtonMarkSize,
              x: (radioButtonSize - radioButtonMarkSize) / 2,
              y: (radioButtonSize - radioButtonMarkSize) / 2,
              borderRadius: radioButtonMarkSize / 2,
              backgroundColor: _this.options.textColor,
              visible: _this.options.specs[row].value
            });
            input.mark = inputMark;
            input.row = row;
            input.onClick(function() {
              if (_this.options.specs[input.row].value === true) {
                _this.options.specs[input.row].value = false;
                return input.mark.visible = false;
              } else {
                _this.options.specs[input.row].value = true;
                return input.mark.visible = true;
              }
            });
            break;
          default:
            input = new Layer({
              name: idString,
              parent: rowBlock,
              x: Align.center((_this.width - labelWidth) / 2),
              y: Align.top,
              color: _this.options.textColor,
              html: "<input style='width:187px; margin:left:-47;' id='" + idString + "' type='text' contenteditable='true' value='" + _this.options.specs[row].value + "'>",
              height: panelRowHeight,
              width: 120,
              backgroundColor: "clear"
            });
        }
        _this[input.name] = input;
        if (_this.options.showGuides === true) {
          return guide = new Layer({
            name: "guide",
            parent: rowBlock,
            width: _this.width,
            x: -panelSideMargin,
            backgroundColor: "red",
            height: 1,
            y: panelLabelSize * 1.3,
            opacity: 0.5
          });
        }
      };
    })(this);
    for (row in this.options.specs) {
      fn(row);
      ++keyIndex;
    }
    this.height = Math.max(minimumPanelHeight, this.contentFrame().height + panelTopMargin + panelBottomMargin + commitButtonHeight + commitButtonTopMargin);
    closeButton = new Layer({
      name: "closeButton",
      parent: this,
      width: closeButtonSize,
      height: closeButtonSize,
      borderRadius: closeButtonSize / 2,
      backgroundColor: "rgba(0,0,0,0.15)",
      borderWidth: 1 * this.options.scaleFactor,
      borderColor: "rgba(255,255,255,0.5)",
      x: closeButtonMargin,
      y: closeButtonMargin
    });
    this.closeButton = closeButton;
    closeButton.onClick((function(_this) {
      return function() {
        _this.hide();
        return _this.options.closeAction();
      };
    })(this));
    closeButtonStroke1 = new Layer({
      name: "closeButtonStroke1",
      parent: closeButton,
      width: closeGlyphWidth,
      height: closeGlyphHeight,
      x: (closeButtonSize - closeGlyphWidth) / 2,
      y: (closeButtonSize - closeGlyphHeight) / 2,
      rotation: 45,
      borderRadius: closeGlyphHeight / 2,
      backgroundColor: "white"
    });
    closeButtonStroke2 = new Layer({
      name: "closeButtonStroke2",
      parent: closeButton,
      width: closeGlyphWidth,
      height: closeGlyphHeight,
      x: (closeButtonSize - closeGlyphWidth) / 2,
      y: (closeButtonSize - closeGlyphHeight) / 2,
      rotation: -45,
      borderRadius: closeGlyphHeight / 2,
      backgroundColor: "white"
    });
    commitButton = new Layer({
      name: "commitButton",
      parent: this,
      width: this.width - panelButtonMargin * 2,
      height: commitButtonHeight,
      visible: false,
      x: Align.center,
      y: Align.bottom(-panelBottomMargin),
      backgroundColor: this.options.buttonColor,
      html: Object.keys(this.options.specs).length === 0 ? alertString : commitString,
      borderRadius: 5 * this.options.scaleFactor
    });
    this.commitButton = commitButton;
     
      this.document =  document
      
   document.onkeyup=((function(_this) {
      return function() {
        var fn1;
        fn1 = function(row) {
          var idString, typedValue;
          idString = _.camelCase(_this.options.specs[row].label + "Input");
          switch (typeof _this.options.specs[row].value) {
            case "string":
              typedValue = document.getElementById(idString).value;
              break;
            case "number":
              typedValue = +document.getElementById(idString).value;
              break;
            case "boolean":
              typedValue = _this.options.specs[row].value;
              break;
            default:
              typedValue = document.getElementById(idString).value;
          }
          return _this.options.specs[row].value = typedValue;
        };
        for (row in _this.options.specs) {
          fn1(row);
        }
          //console.log(JSON.stringify(_this.options.specs))
          localStorage.removeItem('specs')
          localStorage.setItem('specs',JSON.stringify(_this.options.specs))
         // console.log(_this.options)
          //location.reload(false);
        return _this.options.commitAction();
      };
    })(this));
      panel =  this
$( document ).click(function( event) {
    //console.log(event.target)
  if ($(event.target).attr('name')=='controlPanel' || $(event.target).attr('name')=='jsonInput'){
      _this = panel
      document.onclick=((function(_this) {
          //console.log(panel)
      return function() {
        var fn1;
        fn1 = function(row) {
          var idString, typedValue;
          idString = _.camelCase(panel.options.specs[row].label + "Input");
          switch (typeof panel.options.specs[row].value) {
            case "string":
              typedValue = document.getElementById(idString).value;
              break;
            case "number":
              typedValue = +document.getElementById(idString).value;
              break;
            case "boolean":
              typedValue = panel.options.specs[row].value;
              break;
            default:
              typedValue = document.getElementById(idString).value;
          }
            //console.log(ControlPanelLayer)
          return panel.options.specs[row].value = typedValue;
        };
        for (row in panel.options.specs) {
          fn1(row);
        }
          //console.log(JSON.stringify(panel.options.specs))
          localStorage.removeItem('specs')
          localStorage.setItem('specs',JSON.stringify(panel.options.specs))
         // console.log(_this.options)
          //location.reload(false);
        return panel.options.commitAction();
      };
    })(this));
  }
});
       this.onClick=((function(_this) {
      return function() {
        var fn1;
        fn1 = function(row) {
          var idString, typedValue;
          idString = _.camelCase(_this.options.specs[row].label + "Input");
          switch (typeof _this.options.specs[row].value) {
            case "string":
              typedValue = document.getElementById(idString).value;
              break;
            case "number":
              typedValue = +document.getElementById(idString).value;
              break;
            case "boolean":
              typedValue = _this.options.specs[row].value;
              break;
            default:
              typedValue = document.getElementById(idString).value;
          }
          return _this.options.specs[row].value = typedValue;
        };
        for (row in _this.options.specs) {
          fn1(row);
        }
          console.log(JSON.stringify(_this.options.specs))
          localStorage.setItem('specs',JSON.stringify(_this.options.specs))
         // console.log(_this.options)
          //location.reload(false);
        return _this.options.commitAction();
      };
    })(this));
      
    if (this.options.hidden === true) {
      this.hide();
    }
  }

  ControlPanelLayer.prototype.hide = function() {
    this.options.hidden = true;
    this.animate({
      properties: {
        opacity: 0
      },
      time: 0.25
    });
    return Utils.delay(0.25, (function(_this) {
      return function() {
        return _this.visible = false;
      };
    })(this));
  };

  ControlPanelLayer.prototype.show = function() {
    this.visible = true;
    this.options.hidden = false;
    return this.animate({
      properties: {
        opacity: 1
      },
      time: 0.25
    });
  };

  ControlPanelLayer.define('specs', {
    get: function() {
      return this.options.specs;
    }
  });

  ControlPanelLayer.define('hidden', {
    get: function() {
      return this.options.hidden;
    }
  });

  return ControlPanelLayer;

})(Layer);

module.exports = ControlPanelLayer;
},{}]},{},[])

// ---
// generated by coffee-script 1.9.2
