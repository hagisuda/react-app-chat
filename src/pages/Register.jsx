import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from "react"
import { auth, storage, db } from "../firebase";

export default function Register() {
	const [err, setErr] = useState(false);
	const [success, setSuccess] = useState(false);
	const [message, setMessage] = useState('');

	const handleSubmit = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on('state_changed', 
			(snapshot) => {
			}, 
			(error) => {
				setErr(true);
				setMessage('Uploading profile image failed!');
				console.log(error);
			}, 
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
					// Update profile's name and photo url, since we just added email and password while creating authentication
					await updateProfile(res.user, {
						displayName,
						photoURL: downloadURL,
					});
					// Add a new document in collection "users"
					await setDoc(doc(db, "users", res.user.uid), {
						uid: res.user.uid,
						displayName,
						email,
						photoURL: downloadURL,
					});

					//Clear form
					e.target.reset();
					setSuccess(true);
					setMessage('Congrats! Registered successfully!');
				});
			}
			);
		} catch(error) {
			//Email dupliation error
			setErr(true);
			setMessage('Email already in use!');
			console.log(error);
		}
		
	}

	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">Haky Chat</span>
				<h1 className="title">Sign Up</h1>
				<form id="register_form" onSubmit={handleSubmit}>
					<input type="username" placeholder="Enter your username" />
					<input type="email" placeholder="Enter your email" />
					<input type="password" placeholder="Enter your password" />
					<input style={{display:"none"}} type="file" id="fileUpload" />
					<label htmlFor="fileUpload">Upload file</label>
					<button type="submit">Sign Up</button>
					{success && <span>{message}</span>}
				</form>
				<p className="comment">You do have an account? Login</p>
			</div>
		</div>
	)
}
