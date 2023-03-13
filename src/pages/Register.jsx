import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore"; 
import { useState } from "react"
import { auth, storage, db } from "../firebase";

export default function Register() {
	const [err, setErr] = useState(false);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const displayName = e.target[0].value;
		const email = e.target[1].value;
		const password = e.target[2].value;
		const file = e.target[3].files[0];

		try {
			const res = await createUserWithEmailAndPassword(auth, email, password);
			console.log(res);
			const storageRef = ref(storage, displayName);

			const uploadTask = uploadBytesResumable(storageRef, file);
			uploadTask.on('state_changed', 
			(error) => {
				setErr(true);
			}, 
			() => {
				// Handle successful uploads on complete
				// For instance, get the download URL: https://firebasestorage.googleapis.com/...
				getDownloadURL(uploadTask.snapshot.ref).then( async (downloadURL) => {
					console.log(downloadURL);
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
				});
			}
			);


		} catch(err) {
			setErr(true);
		}
		
	}
	return (
		<div className="formContainer">
			<div className="formWrapper">
				<span className="logo">Haky Chat</span>
				<h1 className="title">Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<input type="username" placeholder="Enter your username" />
					<input type="email" placeholder="Enter your email" />
					<input type="password" placeholder="Enter your password" />
					<input style={{display:"none"}} type="file" id="fileUpload" />
					<label htmlFor="fileUpload">Upload file</label>
					<button type="submit">Sign Up</button>
					{err && <span>Something went wrong!!</span>}
				</form>
				<p className="comment">You do have an account? Login</p>
			</div>
		</div>
	)
}
