window.onload = function () {
	if ('serviceWorker' in navigator) {
		navigator.serviceWorker.register('sw.js').then(function () {
			console.log('Service Worker Registered');
		});
	}
	let deferredPrompt;
	const addBtn = document.getElementById('enable-banner-install');
	const closeAddBtn = document.getElementById('close-banner-install');

	function showInstallPromotion() {
		addBtn.style.display = 'block';
		closeAddBtn.style.display = 'block';
	}

	function hideMyInstallPromotion() {
		addBtn.style.display = 'none';
		closeAddBtn.style.display = 'none';
	}

	closeAddBtn.addEventListener('click', e => {
		hideMyInstallPromotion();
	});

	window.addEventListener('beforeinstallprompt', e => {
		e.preventDefault();
		deferredPrompt = e;
		showInstallPromotion();

		addBtn.addEventListener('click', e => {
			hideMyInstallPromotion();
			deferredPrompt.prompt();

			deferredPrompt.userChoice.then(choiceResult => {
				if (choiceResult.outcome === 'accepted') {
					// console.log('User accepted the install prompt');
				} else {
					// console.log('User dismissed the install prompt');
				}
			});
		});
	});
};
