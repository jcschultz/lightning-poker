/**
 * Created by jschultz on 6/5/17.
 */
({
	
	loadGame : function(component, event, helper) {
		var gameId = component.get('v.id');
		var action = component.get('c.getAppDetails');
		
		action.setParams({'gameId' : gameId});
		
		action.setCallback(this, function(a) {
			var state = a.getState();
			var returnValue = a.getReturnValue();
			
			console.log('return value: ', returnValue);
			console.log('gameId', gameId);
			
			if (state === 'SUCCESS') {
				if (returnValue.error) {
					helper.toggleError(component, event, helper, true, 'There was an error retrieving the requested game. ' + returnValue.error);
				}
				else {
					helper.toggleError(component, event, helper, false, null);
					
					component.set('v.sessionId', returnValue.sessionId);
					component.set('v.user', returnValue.user);
				}
				
			}
			else {
				console.error('ERROR RETRIEVING GAME DETAILS', a.getError());
				helper.toggleError(component, event, helper, true, 'There was an error retrieving the requested game. ' + a.getError());
			}
		});
		
		$A.enqueueAction(action);
	},
	
	toggleError : function(component, event, helper, show, errorMsg) {
		var cmp = component.find('errorCmp');
		
		if (cmp) {
			cmp.toggle(show, errorMsg);
		}
	},
	
})