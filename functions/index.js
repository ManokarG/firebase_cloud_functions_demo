const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const adminRef = admin.database().ref();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
exports.createNewUser = functions.auth.user()
	.onCreate( event => {
		const user = event.data;
		const email = user.email || null;
		const uid = user.uid;
		const displayName = user.displayName || null;
		console.log(`User created email ${email} : Name ${displayName}`);
		const newUserRef = adminRef.child("users").child(uid);
		return newUserRef.set({
			email : email,
			displayName : displayName
		});
	});

exports.deleteUser = functions.auth.user()
	.onDelete( event => {
		const user = event.data;
		const uid = user.uid;
		const userRef = adminRef.child("users").child(uid);
		return userRef.update({
			isDeleted: true
		});
	});

	