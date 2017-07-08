/**
 * Created by jschultz on 6/7/17.
 */
({
	
	doCountdown : function(component, event, helper) {
		window.setTimeout(
			$A.getCallback(function(){
				let seconds = component.get('v.seconds');
				
				if (seconds > 0) {
					component.set('v.seconds', seconds - 1);
					helper.doCountdown(component, event, helper);
				}
				else if (seconds === 0) {
					helper.doRedirect(component, event, helper);
				}
			}),
			1000
		);
	},
	
	doRedirect : function(component, event, helper) {
		let urlEvent = $A.get('e.force:navigateToURL');
		let url = component.get('v.url');
		
		component.set('v.seconds', -1);
		
		$A.get('e.force:closeQuickAction').fire();
		
		urlEvent.setParams({
			'url' : url
		});
		urlEvent.fire();
	},
	
	goToGameBoard : function(component, event, helper) {
		let gameId = component.get('v.recordId');
		let url = window.location.href.split('/').slice(0, 3).join('/') + '/c/PokerApp.app?id=' + gameId;
		
		component.set('v.url', url);
		
		helper.doCountdown(component, event, helper);
	},
	
})