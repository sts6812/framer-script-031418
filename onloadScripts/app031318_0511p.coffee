










Utils.domLoadScriptSync('https://raw.githubusercontent.com/sts6812/framer-scripts/master/loadJquery.coffee') 

Utils.domLoadScriptSync('http://127.0.0.1:8887/onloadScripts/ControlPanelLayer.js')  

#Utils.domLoadScriptSync('http://127.0.0.1:8887/onloadScripts/framer-webview.js')
 

psd = Framer.Importer.load('http://127.0.0.1:8887/placeholderTest_/', scale: .5)
json = Framer.Importer.load('http://127.0.0.1:8887/placeholderTest_pos2/', scale: .5)
json.master.visible=false
json.master.x=Align.centervcvc
json.master.y=Align.center
psd.master.scale=1
psd.master.x=Align.center
psd.master.y=Align.center
target=psd.master.subLayers
wdiff = psd.master.width-json.master.width
hdiff =  psd.master.height-json.master.height


window.onload  = ->
	


	PositionAndSizeUtils = require 'PositionAndSizeUtils' 
	ControlPanelLayer = require "ControlPanelLayer"  
	#Webview = require('framer-webview')



	try
		
		ease=JSON.parse(localStorage.getItem('specs'))
		easing='' 
		easing = ease.easing.value.replace(/\s/g,'').replace("curve:'spring-rk4'",'Spring').replace('curveOptions:','(').replace('friction',',friction').replace('velocity',',velocity').replace(')','').replace(/b/g, 'B').replace('cubic-bezier','Bezier').replace(/,,/g,',')+')'
	catch error
		easing = 'Bezier(0.77, 0, 0.175, 1)' 
	
	#console.log easing
	#PositionAndSizeUtils.dragAndLog(ControlPanelLayer)
	exampleSpecs = 
	target:
		label: "target"
		value: 'psd.master.subLayers'
		tip: ""
	time:
		label: 'time'
		value: 1
	delay:
		label: 'delay'
		value: 0
	x:
		label: 'X'
		value: 'this.x'
		tip: ''
	y:
		label: 'Y'
		value: 'this.y'
		tip: ''
	opacity:
		label: 'opacity'
		value: 'this.opacity'
	rotation:
		label: 'rotation'
		value: 'this.rotation'
	scaleX:
		label: 'scalex'
		value: 'this.scaleX'
	scaleY:
		label: 'scaley'
		value: 'this.scaleY'
	width:
		label: 'width'
		value: 'this.width'
	height:
		label: 'height'
		value: 'this.height'
	easing:
		label: 'easing'
		value: easing
	justify:
		label: 'justify'
		value: 'center'
		tip:   'horizontal alignment--left,center,right'
	align:
		label: 'align'
		value: 'middle'
		tip:  'vertical alignment--top,middle,bottom'
	source:
		label: 'json'
		value: true
		tip: 'get destination values from json file'
  
	#console.log exampleSpecs 
	#localStorage.removeItem('specs')
	#options = JSON.parse(localStorage.getItem('specs').replace(/ /g,''))
	#console.log(localStorage.getItem('specs').replace(/\s/g,'').replace(/'\t'/g,'od'))

	#easing = options.easing.value 
	
	
	
	try
		options = JSON.parse(localStorage.getItem('specs')) 
		#console.log options
		options.easing={label:'easing',value:easing}
	catch error
		options = exampleSpecs
	

	
		
		

	#console.log options      

	
	PanelX=localStorage.getItem('panelX')
	PanelY=localStorage.getItem('panelY')
	myControlPanel = new ControlPanelLayer   
		specs: options 
		commitAction: -> exampleSpecs = options
		x: Number(PanelX)
		y: Number(PanelY)
	exampleSpecs = options  
	target = exampleSpecs.target.value 
	time = exampleSpecs.time.value
	delay = exampleSpecs.delay.value
	easing = options.easing.value

	x = exampleSpecs.x.value  
	y = exampleSpecs.y.value
	opacity = exampleSpecs.opacity.value
	rotation = exampleSpecs.rotation.value
	scalex = exampleSpecs.scaleX.value
	scaley = exampleSpecs.scaleY.value 
	width = exampleSpecs.width.value
	height = exampleSpecs.height.value
	
	#console.log easing

	myControlPanel.on Events.DragEnd, ->
		localStorage.setItem('panelX',myControlPanel.x) 
		localStorage.setItem('panelY',myControlPanel.y)
		#$('div[name="controlPanel"]').css('transform',controlPanelpos) 

	#console.log myControlPanel.options	#JSON.parse(localStorage.getItem('specs'))  

	 
	#console.log typeof easing   
		#localStorage.removeItem("layerName");
			#localStorage.removeItem("layerX");
	
	#console.log JSON.parse(localStorage.getItem('specs'))   
	#localStorage.removeItem('specs')
			#localStorage.setItem('layerX', layers.x);
	#QueryInterface.resetAll()	
	###block1 = new Layer(
		width: 100
		height: 100
		x: 50
		y: 50
		style: backgroundColor: Utils.randomColor(0.8))###      
	buttonArray = []   

		



	for layers, i in eval(target)
			#console.log eval(target)
		$(layers._element).children().attr('style',$(layers._element).children().attr('style')+'opacity:0; background-image: url("'+json.master.subLayers[i].image+'");')
		jsonLayer=json.master.subLayers[i] 
		buttonArray.push(layers) 
		if options.source.value==true
			alignment = .5
			valignment = .5
			wdiff = wdiff
			vdiff = vdiff

			Opacity='layers'+opacity.replace('this','')
			Rotation='layers'+rotation.replace('this','')
			scaleX='layers'+scalex.replace('this','')
			scaleY='layers'+scaley.replace('this','')
			Width = jsonLayer.width
			Height = jsonLayer.height
			X = jsonLayer.x
			
			console.log X 
			Y = jsonLayer.y
			if options.justify.value == 'center'
				divisor = 2
			if options.justify.value == 'right'
				divisor = 1
			if options.justify.value == 'left'
				divisor = psd.master.width-json.master.width
			if options.align.value == 'middle'
				vdivisor = 2
			if options.align.value == 'bottom'
				vdivisor = 1
			if options.justify.value == 'top'
				vdivisor = psd.master.width-json.master.width 
			ypin = ''
			
		#console.log psd.master.updateForSizeChange()
		#console.log Utils.hug(psd.master)
		else
			X='layers'+x.replace('this','')
			Y='layers'+y.replace('this','')
			Opacity='layers'+opacity.replace('this','')
			Rotation='layers'+rotation.replace('this','')
			scaleX='layers'+scalex.replace('this','')
			scaleY='layers'+scaley.replace('this','')
			Width = 'layers'+width.replace('this','')
			Height = 'layers'+height.replace('this','')
			
			#console.log false
			wdiff = 0
			vdiff = 1
			divisor = 1
			vdivisor = 1
			if options.justify.value == 'center'
				alignment = .5
			if options.justify.value == 'right'
				alignment = 1
			if options.justify.value == 'left'
				alignment = 0
			if options.align.value == 'middle'
				valignment = .5
			if options.align.value == 'bottom'
				valignment = 1
			if options.align.value == 'top'
				valignment = 0
			ypin = vdiff/vdivisor
		
		#console.log json.master.subLayers
		

		#console.log options


		#console.log Width
		#buttonArray[i].x=50*i
		#console.log psd.master.updateForSizeChange()
		#console.log eval(target).length 
		#if i == eval(target).length-1
			#console.log('done')
		#console.log options.justify.value
		#console.log alignment


		console.log ypin
		#console.log scaleX
		layers.states =
		second:
			scaleX: eval(scaleX)
			scaleY: eval(scaleY)
			width: eval(Width)
			height: eval(Height)
			x:eval(X)+(wdiff/divisor)#+eval 'layers'+x.replace('this','')
			y:eval(Y)+ypin
			originX:alignment
			originY:valignment
			opacity:eval(Opacity)
			rotation:eval(Rotation)
			
	
			#console.log myControlPanel.options.specs.time.value	


	
# Create a spring animation
		layers.states.animationOptions =  
			curve: easing 
			time: time
			delay: eval delay



		#console.log(easing)
	# Animate to the next state on click
	myControlPanel.on Events.Click, ->
		#button.animate('second')
		#console.log myControlPanel.options.specs.source.value
		#localStorage.setItem('specs',JSON.stringify(myControlPanel.options.specs))
		return 

	# Animate to the state 
	$('div[name="controlPanel"]').click ->
		#$('div[name="controlPanel"]').css('transform',controlPanelpos)

	$('div[name="controlPanel"]').focusout (event)->
		#console.log $(event.currentTarget).css('transform')
		
	
		#console.log localStorage.getItem('controlPanelpos')
		
		
		#document.getElementById('js-demo-frame').contentWindow.location.reload();
	sTestEventType = 'mousedown'

	handleMouseEvent = (e) ->
		evt = if e == null then event else e
		clickType = 'LEFT'
		if evt.type != sTestEventType
			return true
		if evt.which
			if evt.which == 3
				clickType = 'RIGHT'
				#console.log JSON.stringify(myControlPanel.options.specs)
				#localStorage.setItem('specs',JSON.stringify(myControlPanel.options.specs))

				window.top.location.reload(false);
			if evt.which == 2
				clickType = 'MIDDLE'
		else if evt.button
			if evt.button == 2
			
				
				clickType = 'RIGHT'
			if evt.button == 4
				clickType = 'MIDDLE'
		#alert evt.type + ': ' + clickType + ' button!'
		true

	document.onmousedown = handleMouseEvent
	document.onmouseup = handleMouseEvent
	document.onclick = handleMouseEvent


	document.onmousedown = handleMouseEvent;
	document.onmouseup   = handleMouseEvent;
	document.onclick     = handleMouseEvent;
	


	$(document).keypress (event) -> 
		keycode = if event.keyCode then event.keyCode else event.which     
		if keycode == 13
			delay = options.delay.value
			time = options.time.value
			#console.log buttonArray
			for layer, i in buttonArray
				console.log json.master.subLayers[i].name 
				#console.log $(layer._element).children().attr('style',$(layer._element).children().attr('style') + 'background-image: url("'+json.master.subLayers[i].image+'");')

				#$(layer._element).children('img').parent().append('<img src="'+json.master.subLayers[i].image+'" style="opacity:0;  z-index:2; ">')
				###$($(layer._element).children('img')[0]).delay((eval delay)*1000).animate {
					opacity: 0
				}, time*1000, ->###
				###$($(layer._element).children('img')[1]).delay((eval delay)*1000).animate {
					opacity: 1
				}, time*1000, ->###
				
				layer.stateCycle()
				if  layer.states.current.name == 'default'
					$(layer._element).children().delay((eval delay)*1000).animate {
						opacity: 0
					}, time*1000, ->
				else
					$(layer._element).children().delay((eval delay)*1000).animate {
						opacity: 1
					}, time*1000, ->
				layer.on Events.StateDidSwitch, (previousState, newState) ->
					
				#console.log buttonArray[i]
				#console.log(buttonArray[i].stateCycle().on Event.animationEnd, console.log 'done')
				
				
			return
	#DISABLE RIGHT CLICK IN CHROME
	do ->
		blockContextMenu = undefined
		myElement = undefined

		blockContextMenu = (evt) ->
			evt.preventDefault()
			return

		myElement = document.querySelector('body')
		myElement.addEventListener 'contextmenu', blockContextMenu
		return
	

	#console.log $('#animationlayerInput').val() 
# --- 
# generated by js2coffee 2.2.0