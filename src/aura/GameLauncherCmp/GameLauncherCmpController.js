/**
 * Created by jschultz on 6/7/17.
 */
({
	handleInit : function(component, event, helper) {
		helper.goToGameBoard(component, event, helper);
	},
	
	handleLinkClick : function(component, event, helper) {
		helper.doRedirect(component, event, helper);
	},
})