/**
 * Created by john on 7/3/17.
 */
({
	
	fireNotificationEvent : function(component, event, helper, severity, message) {
		let notificationEvent = component.getEvent('notificationEvent');
		
		notificationEvent.setParams({
			'severity' : severity,
			'message' : message
		});
		
		notificationEvent.fire();
	},
	
	fireSaveEvent : function(component, event, helper, storyId) {
		let saveEvent = component.getEvent('storySaveEvent');
		
		saveEvent.setParams({
			'isComplete' : true,
			'storyId' : storyId
		});
		
		saveEvent.fire();
	},
	
	handleNameChange : function(component, event, helper) {
		let storyNameInput = component.find('nameInput');
		let validity = storyNameInput.get('v.validity');
		
		component.set('v.isSaveDisabled', !validity.valid);
	},
	
	saveUserStory : function(component, event, helper) {
		let action = component.get('c.createNewHand');
		let displayOrder = component.get('v.displayOrder');
		let gameId = component.get('v.gameId');
		let storyName = component.get('v.storyName');
		
		component.set('v.showSpinner', true);
		
		storyName = storyName.trim();
		
		action.setParams({
			'pokerGameId' : gameId,
			'name' : storyName,
			'position' : displayOrder
		});
		
		action.setCallback(this, function(res){
			let state = res.getState();
			let story = res.getReturnValue();
			
			component.set('v.showSpinner', false);
			
			if (state === 'SUCCESS') {
				component.set('v.storyName', '');
				helper.fireSaveEvent(component, event, helper, story.Id);
			}
			else {
				console.error('Error creating new user story', res.getError(), res);
				helper.fireNotificationEvent(component, event, helper, 'error', 'There was an error saving the new user story.');
			}
		});
		
		$A.enqueueAction(action);
	},
	
})