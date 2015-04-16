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

	$('#auto-modal-1').txnModal({ 
		modalCss : { 
			'height' : '450px',
			'width' : '750px'
		},
		modalAutoCenter: true
	});

	$('#auto-modal-2').txnModal({ 
		modalCss : { 
			'height' : '450px',
			'width' : '750px',
			'top' : '10px'
		},
		modalAutoCenter: true
	});

	$('#auto-modal-3').txnModal({ 
		modalCss : { 
			'height' : '450px',
			'width' : '750px',
			'left' : '10px'
		},
		modalAutoCenter: true
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

	$('#click-auto-1-btn').click(function(){
		$('#auto-modal-1').showModal();
	});

	$('#click-auto-2-btn').click(function(){
		$('#auto-modal-2').showModal();
	});

	$('#click-auto-3-btn').click(function(){
		$('#auto-modal-3').showModal();
	});

	$('#click-basic-modal-btn').click(function(){
		$('#basic-modal').showModal();
	});
});