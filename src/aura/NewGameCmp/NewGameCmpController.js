/**
 * Created by jschultz on 6/13/17.
 */
({
	
	closeNotification : function(component, event, helper) {
		helper.clearNotifications(component, event, helper);
	},
	
	handleGameNameChange : function(component, event, helper) {
		helper.validateGameName(component, event, helper);
	},
	
	handleGameNotification : function(component, event, helper) {
		helper.handleGameNotification(component, event, helper);
	},
	
	handleNextClick : function(component, event, helper) {
		helper.goToNextStage(component, event, helper);
	},
	
	handleRender : function(component, event, helper) {
		helper.handleRender(component, event, helper);
	},
	
	handleStartGameClick : function(component, event, helper) {
		helper.goToGameBoard(component, event, helper);
	},
	
	handleStorySaveEvent : function(component, event, helper) {
		helper.handleStorySaveEvent(component, event, helper);
	},
	
})