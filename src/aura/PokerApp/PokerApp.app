<!--
 - Created by jschultz on 6/5/17.
 -->

<aura:application description="PokerApp" access="global" controller="PokerAppController" extends="force:slds">

	<aura:attribute name="id" access="global" type="String" default="" description="Id of the poker game. Retrieved from the URL." />
	<aura:attribute name="sessionId" access="private" type="String" default="" description="User's session id." />
	<aura:attribute name="user" access="private" type="User" default="" description="Current running user." />

	<aura:handler name="init" value="{!this}" action="{!c.doInit}" />

	<div class="slds">

		<c:PokerErrorCmp aura:id="errorCmp" />

	</div><!--.slds-->

</aura:application>