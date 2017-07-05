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
	
	getStories : function(component, event, helper) {
		let action = component.get('c.getHands');
		
		action.setParams({'gameId' : component.get('v.gameId')});
		
		action.setCallback(this, function(res){
			let state = res.getState();
			
			if (state === 'SUCCESS') {
				component.set('v.hands', res.getReturnValue());
			}
			else {
				console.error('Error getting stories.', res.getError(), res);
				helper.fireNotificationEvent(component, event, helper, 'error', 'There was an error getting the user stories.');
			}
		});
		
		$A.enqueueAction(action);
	},
	
	handleScriptsLoaded : function(component, event, helper) {
		let storyList = component.find('storyList').getElement();
		let drake = dragula([storyList], {
			revertOnSpill: true
		});
		
		drake.on('dragend', $A.getCallback(function(){
			helper.sortStories(component, event, helper);
		}));
	},
	
	handleStorySaveEvent : function(component, event, helper) {
		helper.getStories(component, event, helper);
	},
	
	sortStories : function(component, event, helper) {
		let action = component.get('c.sortHands');
		let hands = {};
		let storyList = component.find('storyList').getElement();
		let stories = storyList.childNodes;
		
		if (!stories || stories.length === 0) {
			return;
		}
		
		for (let i = 0; i < stories.length; i++) {
			hands[stories[i].dataset.id] = i;
		}
		
		action.setParams({
			'idToPositionMap' : hands
		});
		
		action.setCallback(this, function(res){
			let state = res.getState();
			
			if (state !== 'SUCCESS') {
				console.error('Error re-sorting stories', res.getError(), res);
				helper.fireNotificationEvent(component, event, helper, 'error', 'There was an error changing the display order of the user stories.');
			}
		});
		
		$A.enqueueAction(action);
	},
	
})