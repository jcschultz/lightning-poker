/**
* @author: John Schultz
* @date: 2017-06-05
* @description: Service layer for Poker_Game__c object
* @log:
* ----------------------------------------------------------------------------
* Developer       Date          Description
* ----------------------------------------------------------------------------
* John Schultz    2017-06-05    Newly created
*/
public class PokerGameService {
	
	public static final String PENDING_STATUS = 'Pending';
	
	/**
	* @author: John Schultz
	* @date: 2017-06-13
	* @description: Creates a new game and returns the newly created record.
	* @param: gameName - String. Name of the new game.
	* @return: Poker_Game__c
	*/
	public static Poker_Game__c createNewGame(String gameName) {
		Poker_Game__c game = new Poker_Game__c(
			Name = gameName
			, Status__c = PENDING_STATUS
		);
		
		insert game;
		
		return getGameById(game.Id);
	}
	
	/**
	* @author: John Schultz
	* @date: 2017-06-13
	* @description: Method for retrieving game and related records.
	* @param: gameId - String
	* @return: Poker_Game__c
	*/
	public static Poker_Game__c getGameById(String gameId) {
		return
			[SELECT
				Id
				, Status__c
				, Name
				, CreatedById
				, (SELECT
					Id
					, Name
					, Active__c
					, Allow_Estimates__c
					, Position__c
					, Calculated_Average_Estimate__c
					, Consensus_Estimate__c
					, Final_Estimate__c
				FROM Poker_Hands__r
				ORDER BY
					Position__c
					, Name
				)
				, (SELECT
					Id
					, User__c
					, User__r.FirstName
					, User__r.LastName
				FROM Poker_Players__r
				ORDER BY
					User__r.FirstName
				)
			FROM Poker_Game__c
			WHERE Id = :gameId
			LIMIT 1];
	}

}