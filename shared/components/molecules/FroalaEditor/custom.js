$.FroalaEditor.DefineIcon('imageAlignCustom', { NAME: 'align-justify' })
$.FroalaEditor.RegisterCommand('imageAlignCustom', {
	title: 'Align',
	type: 'dropdown',
	focus: true,
	undo: true,
	refreshAfterCallback: true,
	options: {
		left: 'Left',
		center: 'Original',
		medium: 'Medium',
		right: 'Right',
		full: 'Full'
	},
	callback: function(cmd, val) {
		let img = this.image.get()

		if (val === 'left') alignLeft(img)
		else if (val === 'center') alignCenter(img)
		else if (val === 'medium') alignCenterMedium(img)
		else if (val === 'right') alignRight(img)
		else if (val === 'full') alignFull(img)
		this.popups.hide('image.edit')
	},
	refresh: function($btn) {}
})

function alignLeft(img) {
	clearAlign(img)

	img.addClass('fr-image-left')
}

function alignCenter(img) {
	clearAlign(img)

	img.addClass('fr-image-center')
}

function alignCenterMedium(img) {
	clearAlign(img)

	img.addClass('fr-image-center-medium')
}

function alignRight(img) {
	clearAlign(img)

	img.addClass('fr-image-right')
}

function alignFull(img) {
	clearAlign(img)

	img.addClass('fr-image-full')
}

function clearAlign(img) {
	img.removeClass('fr-image-left')
	img.removeClass('fr-image-center')
	img.removeClass('fr-image-right')
	img.removeClass('fr-image-full')
}
