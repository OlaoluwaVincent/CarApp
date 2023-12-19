const convertBase64 = (file) => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.readAsDataURL(file);

		fileReader.onload = () => {
			resolve(fileReader.result);
		};

		fileReader.onerror = (error) => {
			reject(error);
		};
	});
};

function uploadSingleImage(base64) {
	setLoading(true);
	axios
		.post('http://localhost:5000/uploadImage', { image: base64 })
		.then((res) => {
			setUrl(res.data);
			alert('Image uploaded Succesfully');
		})
		.then(() => setLoading(false))
		.catch(console.log);
}

function uploadMultipleImages(images) {
	setLoading(true);
	axios
		.post('http://localhost:5000/uploadMultipleImages', { images })
		.then((res) => {
			setUrl(res.data);
			alert('Image uploaded Succesfully');
		})
		.then(() => setLoading(false))
		.catch(console.log);
}

const uploadImage = async (event) => {
	const files = event.target.files;
	console.log(files.length);

	if (files.length === 1) {
		const base64 = await convertBase64(files[0]);
		uploadSingleImage(base64);
		return;
	}

	const base64s = [];
	for (var i = 0; i < files.length; i++) {
		var base = await convertBase64(files[i]);
		base64s.push(base);
	}
	uploadMultipleImages(base64s);
};

var cloudinary = require('cloudinary').v2;

const cloud_name = process.env.CLOUD_NAME;
const api_key = process.env.API_KEY;
const api_secret = process.env.API_SECRET;

cloudinary.config({
	cloud_name: cloud_name,
	api_key: api_key,
	api_secret: api_secret,
});

const opts = {
	overwrite: true,
	invalidate: true,
	resource_type: 'auto',
};

module.exports.uploadImage = (image) => {
	//imgage = > base64
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(image, opts, (error, result) => {
			if (result && result.secure_url) {
				console.log(result.secure_url);
				return resolve(result.secure_url);
			}
			console.log(error.message);
			return reject({ message: error.message });
		});
	});
};

module.exports.uploadMultipleImages = (images) => {
	return new Promise((resolve, reject) => {
		const uploads = images.map((base) => uploadImage(base));
		Promise.all(uploads)
			.then((values) => resolve(values))
			.catch((err) => reject(err));
	});
};
