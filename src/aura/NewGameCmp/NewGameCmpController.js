/**
 * Created by jschultz on 6/13/17.
 */
({
	
	handleGameNameChange : function(component, event, helper) {
		helper.validateGameName(component, event, helper);
	},
	
	handleNextClick : function(component, event, helper) {
		helper.goToNextStage(component, event, helper);
	},
	
})