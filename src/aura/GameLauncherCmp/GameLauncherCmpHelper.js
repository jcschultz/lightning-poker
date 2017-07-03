/**
 * Created by jschultz on 6/7/17.
 */
({
	goToGameBoard : function(component, event, helper) {
		var gameId = component.get('v.recordId');
		var urlEvent = $A.get('e.force:navigateToURL');
		var url = window.location.href.split('/').slice(0, 3).join('/') + '/c/PokerApp.app?id=' + gameId;
		
		component.set('v.url', url);
		
		$A.get('e.force:closeQuickAction').fire();
		
		urlEvent.setParams({
			'url' : url
		});
		urlEvent.fire();
		
	},
	
})