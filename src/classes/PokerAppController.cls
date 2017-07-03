/**
* @author: John Schultz
* @date: 2017-06-05
* @description: Controller for the poker app.
* @log:
* ----------------------------------------------------------------------------
* Developer       Date          Description
* ----------------------------------------------------------------------------
* John Schultz    2017-06-05    Newly created
*/
public class PokerAppController {
	
	/**
	* @author: John Schultz
	* @date: 2017-06-05
	* @description: Retrieves and returns the game corresponding to the ID param.
	* @param: gameId - String. ID of the poker game record.
	* @return: AppDetails
	*/
	@AuraEnabled
	public static AppDetails getAppDetails(String gameId) {
		AppDetails ad = new AppDetails();
		
		ad.sessionId = UserInfo.getSessionId();
		ad.user = [SELECT Id, FirstName, LastName FROM User WHERE Id = :UserInfo.getUserId()];
		
		try {
			ad.game = PokerGameService.getGameById(gameId);
		}
		catch (Exception e) {
			ad.error = e.getMessage();
		}
		
		return ad;
	}
	
	
	public class AppDetails {
		@AuraEnabled public Poker_Game__c game;
		@AuraEnabled public String sessionId;
		@AuraEnabled public User user;
		@AuraEnabled public String error;
	}
}