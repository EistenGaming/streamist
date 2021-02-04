const objectToFormData = (obj, form, namespace) => {
	const fd = form || new FormData()
	let formKey

	for (const property in obj) {
		if (obj.hasOwnProperty(property) && obj[property] !== undefined) {
			if (namespace) {
				formKey = namespace + '[' + property + ']'
			} else {
				formKey = property
			}

			// if the property is an object, but not a File,
			// use recursion.
			if (typeof obj[property] === 'object' && !(obj[property] instanceof File)) {
				objectToFormData(obj[property], fd, formKey)
			} else {
				// if it's a string or a File object
				fd.append(formKey, obj[property])
			}
		}
	}

	return fd
}

export default objectToFormData
