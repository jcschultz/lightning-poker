/**
 * Created by jschultz on 6/13/17.
 */
({
	
	clearErrors : function(component, event, helper) {
		component.set('v.showError', false);
		component.set('v.errorMsg', '');
	},
	
	completeStage1 : function (component, event, helper) {
		var action = component.get('c.createNewGame');
		var gameNameInput = component.find('gameName').get('v.value').trim();
		
		helper.spinnerShow(component, event, helper);
		helper.clearErrors(component, event, helper);
		
		action.setParams({'gameName' : gameNameInput});
		
		action.setCallback(this, function(a) {
			var state = a.getState();
			var response = a.getReturnValue();
			
			if (state === 'SUCCESS') {
				component.set('v.game', response);
				component.set('v.currentStage', 2);
				component.set('v.isNextDisabled', true);
				component.set('v.pageTitle', 'Poker Game: ' + response.Name);
			}
			else {
				console.log('error creating new game', a.getError());
				component.set('v.errorMsg', 'There was an error creating a new game. Please try again.');
			}
			
			helper.spinnerHide(component, event, helper);
		});
		
		$A.enqueueAction(action);
	},
	
	goToNextStage : function(component, event, helper) {
		var currentStage = component.get('v.currentStage');
		
		if (currentStage === 1) {
			helper.completeStage1(component, event, helper);
		}
		else if (currentStage === 2) {
		
		}
		else {
		
		}
	},
	
	spinnerHide : function(component, event, helper) {
		component.set('v.showSpinner', false);
	},
	
	spinnerShow : function(component, event, helper) {
		component.set('v.showSpinner', true);
	},
	
	validateGameName : function(component, event, helper) {
		var gameNameInput = component.find('gameName').get('v.value');
		
		gameNameInput = gameNameInput != null ? gameNameInput.trim() : '';
		
		component.set('v.isNextDisabled', (gameNameInput.length === 0));
	},
	
	
})