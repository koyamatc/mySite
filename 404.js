 	/** display message */
 	$("#tlt").textillate({
 		selecter: '#tlt .texts',
 		loop : true,
 		// in animation settings.
  		in: {
    		effect: 'rotateInDownLeft',
    		delayScale: 1.5,
    		delay: 50,
    		sync: false,
    		shuffle: false,
  		},
 			// out animation settings.
  		out: {
    		effect: 'rotateOutDownRight',
    		delayScale: 1.5,
    		delay: 50,
    		sync: false,
    		shuffle: false,
  		}
 	});