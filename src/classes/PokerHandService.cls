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
	
	/**
	* @author: John Schultz
	* @date: 2017-07-04
	* @description: Method for re-sorting the display order of the poker hands (user stories).
	* @param: idToPositionMap - Map<String, Decimal>. Hand record id : position.
	* @return: List<Poker_Hand__c>
	*/
	public static List<Poker_Hand__c> sortHands(Map<String, Decimal> idToPositionMap) {
		List<Poker_Hand__c> hands = new List<Poker_Hand__c>();
		
		for (String handId : idToPositionMap.keySet()) {
			Poker_Hand__c h = new Poker_Hand__c();
			h.Id = handId;
			h.Position__c = idToPositionMap.get(handId);
			
			hands.add(h);
		}
		
		update hands;
		return hands;
	}
	
	
}