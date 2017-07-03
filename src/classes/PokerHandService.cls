/**
* @author: John Schultz
* @date: 2017-07-02
* @description: Service class for Poker_Hand__c object.
* @log:
* ----------------------------------------------------------------------------
* Developer       Date          Description
* ----------------------------------------------------------------------------
* John Schultz    2017-07-02    Newly created
*/
public class PokerHandService {
	
	
	/**
	* @author: John Schultz
	* @date: 2017-07-02
	* @description: Method for creating a new poker hand
	* @param: pokerGameId - String. ID of the poker game the hand should belong to.
	* @param: name - String. Name of the user story.
	* @param: position - Decimal. Position of the hand in the game.
	* @return: Poker_Hand__c
	*/
	public static Poker_Hand__c createNewHand(String pokerGameId, String name, Decimal position) {
		Poker_Hand__c hand = new Poker_Hand__c(
			Name = name
			, Poker_Game__c = pokerGameId
			, Position__c = position
		);
		
		insert hand;
		
		return hand;
	}
	
	
}