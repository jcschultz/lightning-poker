/**
 * Created by jschultz on 6/13/17.
 */
({
	
	clearNotifications : function(component, event, helper) {
		component.set('v.showNotification', false);
		component.set('v.notificationMessage', '');
		component.set('v.notificationSeverity', '');
	},
	
	completeStage1 : function (component, event, helper) {
		let action = component.get('c.createNewGame');
		let gameNameInput = component.find('gameName').get('v.value').trim();
		let url = window.location.href.split('/').slice(0, 3).join('/') + '/c/PokerApp.app?id=';
		
		helper.spinnerShow(component, event, helper);
		helper.clearNotifications(component, event, helper);
		
		action.setParams({'gameName' : gameNameInput});
		
		action.setCallback(this, function(res) {
			let state = res.getState();
			let response = res.getReturnValue();
			
			if (state === 'SUCCESS') {
				component.set('v.game', response);
				component.set('v.currentStage', 2);
				component.set('v.isNextDisabled', true);
				component.set('v.pageTitle', 'Poker Game: ' + response.Name);
				component.set('v.gameUrl', url + response.Id);
			}
			else {
				console.log('error creating new game', res.getError());
				helper.showNotifications(component, event, helper, 'error', 'There was an error creating a new game. Please try again.');
			}
			
			helper.spinnerHide(component, event, helper);
		});
		
		$A.enqueueAction(action);
	},
	
	completeStage2 : function(component, event, helper) {
		component.set('v.currentStage', 3);
	},
	
	copyUrl : function(component, event, helper) {
		let textArea = component.find('urlTextarea').getElement();
		textArea.select();
		document.execCommand('copy');
	},
	
	goToGameBoard : function(component, event, helper) {
		let url = component.get('v.gameUrl');
		let urlEvent = $A.get('e.force:navigateToURL');
		let relativePath = '';
		
		let idx = url.indexOf('/');
		
		relativePath = url.substring(idx);
		
		urlEvent.setParams({
			'url' : relativePath,
			'isredirect' : true
		});
		urlEvent.fire();
	},
	
	goToNextStage : function(component, event, helper) {
		let currentStage = component.get('v.currentStage');
		
		if (currentStage === 1) {
			helper.completeStage1(component, event, helper);
		}
		else if (currentStage === 2) {
			helper.completeStage2(component, event, helper);
		}
	},
	
	handleGameNotification : function(component, event, helper) {
		let severity = event.getParam('severity');
		let message = event.getParam('message');
		
		helper.showNotifications(component, event, helper, severity, message);
	},
	
	handleRender : function(component, event, helper) {
		let currentStage = component.get('v.currentStage');
		let gameNameInput = component.find('gameName');
		
		if (currentStage === 1 && gameNameInput) {
			gameNameInput.focus();
		}
	},
	
	handleStorySaveEvent : function(component, event, helper) {
		let currentStage = component.get('v.currentStage');
		
		if (currentStage === 2) {
			component.set('v.isNextDisabled', false);
		}
	},
	
	showNotifications : function(component, event, helper, severity, message) {
		component.set('v.notificationSeverity', severity);
		component.set('v.notificationMessage', message);
		component.set('v.showNotification', true);
	},
	
	spinnerHide : function(component, event, helper) {
		component.set('v.showSpinner', false);
	},
	
	spinnerShow : function(component, event, helper) {
		component.set('v.showSpinner', true);
	},
	
	validateGameName : function(component, event, helper) {
		let gameNameInput = component.find('gameName').get('v.value');
		
		gameNameInput = gameNameInput != null ? gameNameInput.trim() : '';
		
		component.set('v.isNextDisabled', (gameNameInput.length === 0));
	},
	
	
})