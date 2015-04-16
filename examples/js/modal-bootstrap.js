$(document).ready(function(){
	$('#basic-modal').txnModal();
	$('#overflow-modal').txnModal();

	$('#normal-modal').txnModal({ 
		modalCloseHandlers : ['#closeModalBtn'] 
	});

	$('#css-modal').txnModal({ 
		modalCss : { 
			'height' : '450px',
			'width' : '750px',
			'left' : '50%',
			'top' : '50%',
			'margin-left' : '-375px',
			'margin-top' : '-225px'
		}
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

	$('#click-css-btn').click(function(){
		$('#css-modal').showModal();
	});

	$('#click-overflow-btn').click(function(){
		$('#overflow-modal').showModal();
	});

	$('#click-target-1-btn').click(function(){
		$('#target-modal').showModal();
	});

	$('#click-target-2-btn').click(function(){
		$('#target-modal-2').showModal();
	});

	$('#click-basic-modal-btn').click(function(){
		$('#basic-modal').showModal();
	});
});