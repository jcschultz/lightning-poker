/**
 * Created by jschultz on 6/5/17.
 */
({
	
	closeAlert : function(component, event, helper) {
		component.set('v.showError', false);
		component.set('v.errorMsg', '');
	},
	
	toggleAlert : function(component, event, helper) {
		var params = event.getParam('arguments');
		
		if (params && params.show) {
			component.set('v.showError', true);
			component.set('v.errorMsg', params.error);
		}
		else {
			helper.closeAlert(component, event, helper);
		}
	},
	
})