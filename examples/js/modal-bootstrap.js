$(document).ready(function(){
	$('#basic-modal').txnModal();

	$('#normal-modal').txnModal({ 
		modalCloseHandlers : ['#closeModalBtn'] 
	});

	$('#target-modal').txnModal({ 
		modalCloseHandlers : ['#closeModalBtn2'],
		modalTargetContainer : '#temp-parent-container'
	});

	$('#target-modal-2').txnModal({ 
		modalCloseHandlers : ['#closeModalBtn3'],
		modalTargetContainer : '#temp-parent-container-2'
	});

	$('#click-btn').click(function(){
		$('#normal-modal').showModal();
	});

	$('#click-btn-2').click(function(){
		$('#target-modal').showModal();
	});

	$('#click-btn-3').click(function(){
		$('#target-modal-2').showModal();
	});

	$('#click-basic-modal-btn').click(function(){
		$('#basic-modal').showModal();
	});
});