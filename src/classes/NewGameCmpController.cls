/**
* @author: John Schultz
* @date: 2017-06-13
* @description: Controller for NewGameCmp lightning component.
* @log:
* ----------------------------------------------------------------------------
* Developer       Date          Description
* ----------------------------------------------------------------------------
* John Schultz    2017-06-13    Newly created
*/
public class NewGameCmpController {
	
	/**
	* @author: John Schultz
	* @date: 2017-06-13
	* @description: Creates a new game and returns the newly created record.
	* @param: gameName - String. Name of the new game.
	* @return: Poker_Game__c
	*/
	@AuraEnabled
	public static Poker_Game__c createNewGame(String gameName) {
		return PokerGameService.createNewGame(gameName);
	}
	
	/**
	* @author: John Schultz
	* @date: 2017-07-02
	* @description: Creates a new hand and returns the newly created record.
	* @param: pokerGameId - String. ID of the poker game the hand should belong to.
	* @param: name - String. Name of the user story.
	* @param: position - Decimal. Position of the hand in the game.
	* @return: Poker_Hand__c
	*/
	@AuraEnabled
	public static Poker_Hand__c createNewHand(String pokerGameId, String name, Decimal position) {
		return PokerHandService.createNewHand(pokerGameId, name, position);
	}
	
	/**
	* @author: John Schultz
	* @date: 2017-07-03
	* @description: Retrieves the poker hands (user stories) related to the poker game.
	* @param: gameId - String. ID of the poker game record.
	* @return: List<Poker_Hand__c>
	*/
	@AuraEnabled
	public static List<Poker_Hand__c> getHands(String gameId) {
		Poker_Game__c game = PokerGameService.getGameById(gameId);
		return game.Poker_Hands__r;
	}
	
	/**
	* @author: John Schultz
	* @date: 2017-07-04
	* @description: Method for re-sorting the display order of the poker hands (user stories).
	* @param: idToPositionMap - Map<String, Decimal>. Hand record id : position.
	* @return: List<Poker_Hand__c>
	*/
	@AuraEnabled
	public static List<Poker_Hand__c> sortHands(Map<String, Decimal> idToPositionMap) {
		return PokerHandService.sortHands(idToPositionMap);
	}
	
	
	
}